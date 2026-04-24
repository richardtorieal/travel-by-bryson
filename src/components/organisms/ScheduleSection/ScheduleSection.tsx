import React from 'react';
import styles from './ScheduleSection.module.scss';
import Container from '../../atoms/Container/Container';
import Section from '../../atoms/Section/Section';
import Button from '../../atoms/Button/Button';
import Link from 'next/link';

const ScheduleSection: React.FC = () => {
  return (
    <Section variant="sand" padding="xl">
      <Container>
        <div className={styles.wrapper}>
          <div className={styles.content}>
            <h2 className={styles.title}>Ready to Begin Your Next Journey?</h2>
            <p className={styles.description}>
              Whether you have a specific destination in mind or need inspiration, 
              let&apos;s connect to discuss how I can help make your vision a reality.
            </p>
            <Link href="/contact">
              <Button variant="primary" size="lg">Schedule a Call</Button>
            </Link>
          </div>
          <div className={styles.ctaCard}>
            <h3>What to Expect</h3>
            <ul>
              <li>15-Minute Discovery Call</li>
              <li>Discussion of Travel Style & Preferences</li>
              <li>Personalized Recommendations</li>
              <li>Zero Planning Fees for Hotel Bookings</li>
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default ScheduleSection;
