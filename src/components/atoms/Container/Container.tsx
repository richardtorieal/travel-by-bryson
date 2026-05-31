'use client';

import React from 'react';
import styles from './Container.module.scss';
import { motion } from 'framer-motion';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  animated?: boolean;
}

const Container: React.FC<ContainerProps> = ({ children, className = '', animated = false }) => {
  const combinedClassName = `${styles.container} ${className}`;
  
  if (animated) {
    return (
      <motion.div 
        layout 
        transition={{
          layout: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
        }}
        className={combinedClassName}
      >
        {children}
      </motion.div>
    );
  }

  return <div className={combinedClassName}>{children}</div>;
};

export default Container;
