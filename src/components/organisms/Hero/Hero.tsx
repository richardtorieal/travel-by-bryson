import React from 'react';
import styles from './Hero.module.scss';
import Container from '../../atoms/Container/Container';
import Button from '../../atoms/Button/Button';
import Link from 'next/link';

const Hero: React.FC = () => {
  return (
    <div className={styles.hero}>
      <div className={styles.imageOverlay} />
      <Container className={styles.container}>
        <div className={styles.content}>
          <span className={styles.subtitle}>Luxury Travel Curator</span>
          <h1 className={styles.title}>
            The New <em>Standard</em> <br />
            of Bespoke Travel
          </h1>
          <p className={styles.description}>
            Leveraging 6 years in luxury hotels to bring you exclusive perks, 
            insider access, and stress-free planning for your next escape.
          </p>
          <div className={styles.actions}>
            <Link href="/contact">
              <Button variant="primary" size="lg">Book a Discovery Call</Button>
            </Link>
            <Link href="/destinations">
              <Button variant="outline" size="lg">View Destinations</Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Hero;
