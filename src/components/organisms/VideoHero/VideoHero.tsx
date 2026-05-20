'use client';

import React, { useRef, useState, useEffect } from 'react';
import styles from './VideoHero.module.scss';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';
import Container from '../../atoms/Container/Container';
import Button from '../../atoms/Button/Button';

const TOTAL_FRAMES = 144;

const VideoHero: React.FC = () => {
  const containerRef = useRef(null);
  const [frameIndex, setFrameIndex] = useState(1);
  
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

  // Update frame index based on scroll progress
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    const index = Math.min(
      TOTAL_FRAMES,
      Math.max(1, Math.floor(latest * TOTAL_FRAMES) + 1)
    );
    if (index !== frameIndex) {
      setFrameIndex(index);
    }
  });

  // Preload frames for smooth playback
  useEffect(() => {
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `/assets/como-frames/frame_${i.toString().padStart(3, '0')}.jpg`;
    }
  }, []);

  const currentFramePath = `/assets/como-frames/frame_${frameIndex.toString().padStart(3, '0')}.jpg`;

  return (
    <div ref={containerRef} className={styles.heroWrapper}>
      <motion.div style={{ scale }} className={styles.videoPlaceholder}>
        <div className={styles.overlay} />
        <img 
          src={currentFramePath} 
          alt="Lake Como Dolly Zoom"
          className={styles.video}
          style={{ objectFit: 'cover' }}
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
