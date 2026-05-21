'use client';

import React from 'react';
import styles from './TestimonialGrid.module.scss';
import Container from '../../atoms/Container/Container';
import Section from '../../atoms/Section/Section';
import TestimonialCard from '../../molecules/TestimonialCard/TestimonialCard';
import { ALL_REVIEWS } from '@/data/reviews';

const TestimonialGrid: React.FC = () => {
  const displayReviews = ALL_REVIEWS.slice(0, 3);

  return (
    <Section variant="white" padding="xl">
      <Container>
        <div className={styles.header}>
          <span className={styles.subtitle}>Client Experiences</span>
          <h2 className={styles.title}>What Our <em>Clients</em> Say</h2>
        </div>
        <div className={styles.grid}>
          {displayReviews.map((t, index) => (
            <TestimonialCard key={index} {...t} />
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default TestimonialGrid;
