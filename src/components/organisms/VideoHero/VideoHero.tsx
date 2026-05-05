'use client';

import React, { useRef } from 'react';
import styles from './VideoHero.module.scss';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
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

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  // Sync video frame with scroll position
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (videoRef.current && videoRef.current.duration) {
      videoRef.current.currentTime = latest * videoRef.current.duration;
    }
  });

  return (
    <div ref={containerRef} className={styles.heroWrapper}>
      <motion.div style={{ scale }} className={styles.videoPlaceholder}>
        <div className={styles.overlay} />
        <video 
          ref={videoRef}
          src="/assets/Santorini boat movie trimmed.mp4" 
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
