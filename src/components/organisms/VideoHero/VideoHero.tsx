'use client';

import React, { useRef } from 'react';
import styles from './VideoHero.module.scss';
import { motion, useScroll, useTransform, useMotionValueEvent, useSpring } from 'framer-motion';
import Container from '../../atoms/Container/Container';
import Button from '../../atoms/Button/Button';
import Link from 'next/link';

const VideoHero: React.FC = () => {
  const containerRef = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Apply spring smoothing to the raw scroll value to fix "chunky" mouse wheel scrolls
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const y = useTransform(smoothProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(smoothProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(smoothProgress, [0, 1], [1, 1.1]);

  // Sync video frame with smoothed scroll position
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    if (videoRef.current && videoRef.current.duration) {
      // Ensure we don't try to seek past the video duration
      const targetTime = Math.min(latest * videoRef.current.duration, videoRef.current.duration - 0.1);
      videoRef.current.currentTime = targetTime;
    }
  });

  return (
    <div ref={containerRef} className={styles.heroWrapper}>
      <motion.div style={{ scale }} className={styles.videoPlaceholder}>
        <div className={styles.overlay} />
        <video 
          ref={videoRef}
          src="/assets/Santorini_boat_scrub.mp4" 
          muted 
          playsInline 
          preload="auto"
          className={styles.video}
        />
      </motion.div>

      <Container>
        <motion.div style={{ y, opacity }} className={styles.content}>
          <div className={styles.actions}>
            <Link href="/contact">
              <Button variant="primary" size="lg" className={styles.heroButton}>Plan Your Journey</Button>
            </Link>
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

export default VideoHero;
