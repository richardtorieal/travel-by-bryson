import React from 'react';
import styles from './Section.module.scss';

interface SectionProps {
  children: React.ReactNode;
  variant?: 'light' | 'sand' | 'white';
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

const Section: React.FC<SectionProps> = ({ 
  children, 
  variant = 'light', 
  className = '',
  padding = 'md'
}) => {
  return (
    <section className={`${styles.section} ${styles[variant]} ${styles[`padding-${padding}`]} ${className}`}>
      {children}
    </section>
  );
};

export default Section;
