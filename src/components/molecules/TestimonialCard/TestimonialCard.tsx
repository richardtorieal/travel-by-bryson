'use client';

import React, { useState } from 'react';
import styles from './TestimonialCard.module.scss';
import { motion, AnimatePresence } from 'framer-motion';

interface TestimonialCardProps {
  quote: string;
  author: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, author }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Logic to determine if we need the Read More button
  const needsTruncation = quote.length > 280;

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <motion.div 
      layout
      transition={{
        layout: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
      }}
      className={`${styles.card} ${isExpanded ? styles.expanded : ''}`}
    >
      <motion.div layout="position" className={styles.contentInner}>
        <div className={styles.header}>
          <div className={styles.author}>
            <strong>{author}</strong>
          </div>
          <div className={styles.stars}>★★★★★</div>
        </div>

        <motion.div 
          layout
          className={styles.quoteContainer}
          initial={false}
          animate={{ 
            height: isExpanded ? 'auto' : (needsTruncation ? 120 : 'auto') 
          }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <p className={styles.quote}>
            &ldquo;{quote}&rdquo;
          </p>
          
          <AnimatePresence>
            {needsTruncation && !isExpanded && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className={styles.fade} 
              />
            )}
          </AnimatePresence>
        </motion.div>

        {needsTruncation && (
          <button 
            className={styles.readMore} 
            onClick={toggleExpand}
          >
            {isExpanded ? 'Read Less' : 'Read More'}
          </button>
        )}
      </motion.div>
    </motion.div>
  );
};

export default TestimonialCard;
