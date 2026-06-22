'use client';

import React, { useRef, useState, useEffect } from 'react';
import styles from './VideoHero.module.scss';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';
import Container from '../../atoms/Container/Container';
import Button from '../../atoms/Button/Button';

const TOTAL_FRAMES = 144;

const VideoHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
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

  // Preload frames for smooth playback
  useEffect(() => {
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];

    const handleImageLoad = () => {
      loadedCount++;
      if (loadedCount === TOTAL_FRAMES) {
        setImagesLoaded(true);
      }
    };

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.onload = handleImageLoad;
      img.onerror = handleImageLoad; // Avoid blocking the site if a single frame fails to load
      img.src = `/assets/como-frames/frame_${i.toString().padStart(3, '0')}.jpg`;
      loadedImages.push(img);
    }
    imagesRef.current = loadedImages;
  }, []);

  // Draw the current frame onto the canvas
  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[index - 1];
    if (img && img.complete) {
      // Set internal canvas resolution to match image natural size once
      if (canvas.width !== img.naturalWidth || canvas.height !== img.naturalHeight) {
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
  };

  // Re-draw when active frame or load status changes
  useEffect(() => {
    drawFrame(activeFrameIndex);
  }, [activeFrameIndex, imagesLoaded]);

  // Update frame index based on scroll progress
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    const index = Math.min(
      TOTAL_FRAMES,
      Math.max(1, Math.floor(latest * TOTAL_FRAMES) + 1)
    );
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
