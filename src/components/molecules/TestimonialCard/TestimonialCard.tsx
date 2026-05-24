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
  
  // Truncate logic: if quote is longer than 280 chars, show Read More visual
  // Using a lower threshold for initial view to ensure consistency
  const needsTruncation = quote.length > 280;
  const truncatedQuote = quote.substring(0, 270) + '...';

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`${styles.card} ${isExpanded ? styles.expanded : ''}`}>
      <div className={styles.contentInner}>
        <div className={styles.header}>
          <div className={styles.author}>
            <strong>{author}</strong>
          </div>
          <div className={styles.stars}>★★★★★</div>
        </div>

        <div className={styles.quoteContainer}>
          <p className={styles.quote}>
            &ldquo;{needsTruncation && !isExpanded ? truncatedQuote : quote}&rdquo;
          </p>
          
          <AnimatePresence>
            {needsTruncation && !isExpanded && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={styles.fade} 
              />
            )}
          </AnimatePresence>
        </div>

        {needsTruncation && (
          <button 
            className={styles.readMore} 
            onClick={toggleExpand}
          >
            {isExpanded ? 'Read Less' : 'Read More'}
          </button>
        )}
      </div>
    </div>
  );
};

export default TestimonialCard;
