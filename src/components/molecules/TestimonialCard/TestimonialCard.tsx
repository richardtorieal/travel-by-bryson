'use client';

import React from 'react';
import styles from './TestimonialCard.module.scss';

interface TestimonialCardProps {
  quote: string;
  author: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, author }) => {
  // Truncate logic: if quote is longer than 450 chars, show Read More visual
  const shouldTruncate = quote.length > 450;
  const displayQuote = shouldTruncate ? quote.substring(0, 440) + '...' : quote;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.author}>
          <strong>{author}</strong>
        </div>
        <div className={styles.stars}>★★★★★</div>
      </div>

      <div className={`${styles.quoteWrapper} ${shouldTruncate ? styles.truncated : ''}`}>
        <p className={styles.quote}>&ldquo;{displayQuote}&rdquo;</p>
        {shouldTruncate && <div className={styles.fade} />}
      </div>

      {shouldTruncate && (
        <button className={styles.readMore}>
          Read More
        </button>
      )}
    </div>
  );
};

export default TestimonialCard;
