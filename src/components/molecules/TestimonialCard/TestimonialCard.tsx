import React from 'react';
import styles from './TestimonialCard.module.scss';

interface TestimonialCardProps {
  quote: string;
  author: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, author }) => {
  return (
    <div className={styles.card}>
      <div className={styles.stars}>★★★★★</div>
      <p className={styles.quote}>&ldquo;{quote}&rdquo;</p>
      <div className={styles.author}>
        <strong>{author}</strong>
      </div>
    </div>
  );
};

export default TestimonialCard;
