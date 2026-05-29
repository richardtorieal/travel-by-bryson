'use client';

import React, { useState } from 'react';
import styles from './TestimonialCarousel.module.scss';
import Container from '../../atoms/Container/Container';
import Section from '../../atoms/Section/Section';
import TestimonialCard from '../../molecules/TestimonialCard/TestimonialCard';
import { ALL_REVIEWS } from '@/data/reviews';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const TestimonialCarousel: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const reviews = ALL_REVIEWS.slice(0, 3);

  const nextStep = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevStep = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleDragEnd = (event: any, info: PanInfo) => {
    const swipeThreshold = 50;
    const velocityThreshold = 500;

    if (info.offset.x < -swipeThreshold || info.velocity.x < -velocityThreshold) {
      nextStep();
    } else if (info.offset.x > swipeThreshold || info.velocity.x > velocityThreshold) {
      prevStep();
    }
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 250 : -250,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 500 : -500,
      opacity: 0,
      scale: 0.95
    })
  };

  return (
    <Section variant="white" padding="xl" animated={true}>
      <Container>
        <div className={styles.header}>
          <span className={styles.subtitle}>Client Experiences</span>
          <h2 className={styles.title}>What Our <em>Clients</em> Say</h2>
        </div>

        <div className={styles.carouselContainer}>
          <button 
            className={`${styles.navButton} ${styles.prev}`} 
            onClick={prevStep} 
            aria-label="Previous review"
          >
            <ChevronLeft size={24} />
          </button>

          <div className={styles.stage}>
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={index}
                layout
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={handleDragEnd}
                transition={{
                  x: { type: "spring", stiffness: 250, damping: 30, mass: 0.8 },
                  opacity: { duration: 0.3 },
                  layout: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
                }}
                className={styles.cardWrapper}
                style={{ cursor: 'grab', touchAction: 'none' }}
                whileTap={{ cursor: 'grabbing' }}
              >
                <TestimonialCard {...reviews[index]} />
              </motion.div>
            </AnimatePresence>
          </div>
          <button 
            className={`${styles.navButton} ${styles.next}`} 
            onClick={nextStep} 
            aria-label="Next review"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div className={styles.dots}>
          {reviews.map((_, i) => (
            <button 
              key={i} 
              className={`${styles.dot} ${i === index ? styles.active : ''}`}
              onClick={() => {
                setDirection(i > index ? 1 : -1);
                setIndex(i);
              }}
              aria-label={`Go to review ${i + 1}`}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default TestimonialCarousel;
