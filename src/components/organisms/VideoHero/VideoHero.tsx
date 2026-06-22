'use client';

import React, { useRef, useState, useEffect } from 'react';
import styles from './VideoHero.module.scss';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';
import Container from '../../atoms/Container/Container';
import Button from '../../atoms/Button/Button';
import { parseTar } from '../../../utils/tar';

const TOTAL_FRAMES = 144;

const VideoHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<(ImageBitmap | HTMLImageElement)[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [activeFrameIndex, setActiveFrameIndex] = useState(1);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Apply spring smoothing to the raw scroll value
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const y = useTransform(smoothProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(smoothProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(smoothProgress, [0, 1], [1, 1.1]);

  // Preload frames for smooth playback via a single TAR request
  useEffect(() => {
    let active = true;
    const blobUrls: string[] = [];

    const loadTarFrames = async () => {
      try {
        const response = await fetch('/assets/como-frames.tar');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const arrayBuffer = await response.arrayBuffer();
        const tarFiles = parseTar(arrayBuffer);
        
        // Decode all JPEGs into ImageBitmaps asynchronously using createImageBitmap
        // This decodes the bytes directly on a helper thread and keeps them GPU-ready,
        // preventing any lazy decoding during draw and avoiding blob URL network logs.
        const promises = tarFiles.map(async (file) => {
          const blob = new Blob([file.data as any], { type: 'image/jpeg' });
          const bitmap = await createImageBitmap(blob);
          return bitmap;
        });

        const decodedBitmaps = await Promise.all(promises);

        if (active) {
          framesRef.current = decodedBitmaps;
          setImagesLoaded(true);
        }
      } catch (err) {
        console.error('Failed to load tar frames, falling back to individual frame requests:', err);
        // Fallback: Fetch frames individually if TAR load fails
        let loadedCount = 0;
        const loadedImages: HTMLImageElement[] = [];

        const handleImageLoad = () => {
          if (!active) return;
          loadedCount++;
          if (loadedCount === TOTAL_FRAMES) {
            setImagesLoaded(true);
          }
        };

        for (let i = 1; i <= TOTAL_FRAMES; i++) {
          const img = new Image();
          img.onload = handleImageLoad;
          img.onerror = handleImageLoad;
          img.src = `/assets/como-frames/frame_${i.toString().padStart(3, '0')}.jpg`;
          loadedImages.push(img);
        }
        if (active) {
          framesRef.current = loadedImages;
        }
      }
    };

    loadTarFrames();

    return () => {
      active = false;
      // Cleanup Object URLs to avoid memory leaks (in case fallback path was triggered)
      blobUrls.forEach((url) => URL.revokeObjectURL(url));
      // Release ImageBitmap GPU memory resources
      framesRef.current.forEach((frame) => {
        if ('close' in frame) {
          frame.close();
        }
      });
    };
  }, []);

  // Draw the current frame onto the canvas
  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const frame = framesRef.current[index - 1];
    if (frame) {
      const isLoaded = 'naturalWidth' in frame ? frame.complete : true;
      if (isLoaded) {
        const width = 'naturalWidth' in frame ? frame.naturalWidth : frame.width;
        const height = 'naturalHeight' in frame ? frame.naturalHeight : frame.height;

        if (width && height) {
          // Set internal canvas resolution to match image natural size once
          if (canvas.width !== width || canvas.height !== height) {
            canvas.width = width;
            canvas.height = height;
          }

          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(frame, 0, 0, canvas.width, canvas.height);
        }
      }
    }
  };

  // Re-draw when load status changes
  useEffect(() => {
    if (imagesLoaded) {
      drawFrame(activeFrameIndex);
    }
  }, [imagesLoaded]);

  // Update frame index based on scroll progress
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    const index = Math.min(
      TOTAL_FRAMES,
      Math.max(1, Math.floor(latest * TOTAL_FRAMES) + 1)
    );
    
    // Draw canvas frame immediately to avoid asynchronous React render loop lag and flashing
    if (imagesLoaded) {
      drawFrame(index);
    }

    if (index !== activeFrameIndex) {
      setActiveFrameIndex(index);
    }
  });

  return (
    <div ref={containerRef} className={styles.heroWrapper}>
      <motion.div style={{ scale }} className={styles.videoPlaceholder}>
        <div className={styles.overlay} />
        {/* Render a fallback img tag only until the full memory cache is loaded */}
        {!imagesLoaded && (
          <img 
            src={`/assets/como-frames/frame_${activeFrameIndex.toString().padStart(3, '0')}.jpg`} 
            alt="Lake Como Dolly Zoom Preview"
            className={styles.video}
            style={{ objectFit: 'cover' }}
          />
        )}
        <canvas 
          ref={canvasRef}
          className={styles.video}
          style={{ 
            objectFit: 'cover',
            display: imagesLoaded ? 'block' : 'none'
          }}
        />
      </motion.div>

      <Container>
        <motion.div style={{ y, opacity }} className={styles.content}>
          <div className={styles.actions}>
            <Button variant="primary" size="lg" className={styles.heroButton} href="/contact">Plan Your Journey</Button>
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

export default VideoHero;
