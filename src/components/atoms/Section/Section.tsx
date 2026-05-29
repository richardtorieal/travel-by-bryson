'use client';

import React from 'react';
import styles from './Section.module.scss';
import { motion } from 'framer-motion';

interface SectionProps {
  children: React.ReactNode;
  variant?: 'light' | 'sand' | 'white' | 'transparent' | 'dark';
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'section-std' | 'section-compact';
  animated?: boolean;
}

const Section: React.FC<SectionProps> = ({ 
  children, 
  variant = 'light', 
  className = '',
  padding = 'md',
  animated = false
}) => {
  const combinedClassName = `${styles.section} ${styles[variant]} ${styles[padding]} ${className}`;

  if (animated) {
    return (
      <motion.section 
        layout 
        transition={{
          layout: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
        }}
        className={combinedClassName}
      >
        {children}
      </motion.section>
    );
  }

  return (
    <section className={combinedClassName}>
      {children}
    </section>
  );
};

export default Section;
