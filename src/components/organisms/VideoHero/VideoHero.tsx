'use client';

import React, { useRef } from 'react';
import styles from './VideoHero.module.scss';
import { motion, useScroll, useTransform } from 'framer-motion';
import Container from '../../atoms/Container/Container';
import Button from '../../atoms/Button/Button';
import Link from 'next/link';

const VideoHero: React.FC = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <div ref={ref} className={styles.heroWrapper}>
      <motion.div style={{ scale }} className={styles.videoPlaceholder}>
        <div className={styles.overlay} />
        {/* In production, replace with <video src="/hero.mp4" autoPlay muted loop playsInline /> */}
        <div className={styles.tempMedia} />
      </motion.div>

      <Container>
        <motion.div style={{ y, opacity }} className={styles.content}>
          <span className={styles.subtitle}>Luxury Hotel Insider</span>
          <h1 className={styles.title}>
            The New Standard <br />
            <span>of Bespoke Travel</span>
          </h1>
          <p className={styles.description}>
            Unlocking world-class experiences through 6+ years <br />
            of high-end hospitality expertise.
          </p>
          <div className={styles.actions}>
            <Link href="/contact">
              <Button variant="accent" size="lg">Plan Your Journey</Button>
            </Link>
          </div>
        </motion.div>
      </Container>

      <motion.div 
        style={{ opacity }}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className={styles.scrollIndicator}
      >
        <span>Discover More</span>
        <div className={styles.line} />
      </motion.div>
    </div>
  );
};

export default VideoHero;
