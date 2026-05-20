import React from 'react';
import styles from './Section.module.scss';

interface SectionProps {
  children: React.ReactNode;
  variant?: 'light' | 'sand' | 'white' | 'transparent' | 'dark';
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'section-std' | 'section-compact';
}

const Section: React.FC<SectionProps> = ({ 
  children, 
  variant = 'light', 
  className = '',
  padding = 'md'
}) => {
  return (
    <section className={`${styles.section} ${styles[variant]} ${styles[padding]} ${className}`}>
      {children}
    </section>
  );
};

export default Section;
