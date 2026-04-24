import React from 'react';
import styles from './TestimonialCard.module.scss';

interface TestimonialCardProps {
  quote: string;
  author: string;
  location?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, author, location }) => {
  return (
    <div className={styles.card}>
      <div className={styles.stars}>★★★★★</div>
      <p className={styles.quote}>&ldquo;{quote}&rdquo;</p>
      <div className={styles.author}>
        <strong>{author}</strong>
        {location && <span>{location}</span>}
      </div>
    </div>
  );
};

export default TestimonialCard;
