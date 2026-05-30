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

  // Using 'as any' for the transition ease to satisfy TypeScript with custom cubic-bezier arrays
  const sharedTransition = { duration: 0.6, ease: [0.4, 0, 0.2, 1] as any };

  return (
    <motion.div 
      layout
      transition={{
        layout: sharedTransition
      }}
      className={`${styles.card} ${isExpanded ? styles.expanded : ''}`}
    >
      <motion.div layout className={styles.contentInner} transition={{ layout: sharedTransition }}>
        <motion.div layout className={styles.header} transition={{ layout: sharedTransition }}>
          <motion.div layout className={styles.author} transition={{ layout: sharedTransition }}>
            <strong>{author}</strong>
          </motion.div>
          <motion.div layout className={styles.stars} transition={{ layout: sharedTransition }}>
            ★★★★★
          </motion.div>
        </motion.div>

        <motion.div 
          layout
          className={styles.quoteContainer}
          initial={false}
          animate={{ 
            height: isExpanded ? 'auto' : (needsTruncation ? 120 : 'auto') 
          }}
          transition={sharedTransition}
        >
          <motion.p layout className={styles.quote} transition={{ layout: sharedTransition }}>
            &ldquo;{quote}&rdquo;
          </motion.p>
          
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
          <motion.button 
            layout
            className={styles.readMore} 
            onClick={toggleExpand}
            transition={{ layout: sharedTransition }}
          >
            {isExpanded ? 'Read Less' : 'Read More'}
          </motion.button>
        )}
      </motion.div>
    </motion.div>
  );
};

export default TestimonialCard;
