'use client';

import React, { useState } from 'react';
import styles from './TestimonialGrid.module.scss';
import Container from '../../atoms/Container/Container';
import Section from '../../atoms/Section/Section';
import TestimonialCard from '../../molecules/TestimonialCard/TestimonialCard';
import Button from '../../atoms/Button/Button';
import AllReviewsModal from '../AllReviewsModal/AllReviewsModal';
import { ALL_REVIEWS } from '@/data/reviews';

const TestimonialGrid: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const displayReviews = ALL_REVIEWS.slice(0, 3);

  return (
    <Section variant="light" padding="xl">
      <Container>
        <div className={styles.header}>
          <h2 className={styles.title}>What Our Clients Say</h2>
        </div>
        <div className={styles.grid}>
          {displayReviews.map((t, index) => (
            <TestimonialCard key={index} {...t} />
          ))}
        </div>
        <div className={styles.actions}>
          <Button variant="outline" onClick={() => setIsModalOpen(true)}>
            See All Reviews
          </Button>
        </div>

        <AllReviewsModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
        />
      </Container>
    </Section>
  );
};

export default TestimonialGrid;
