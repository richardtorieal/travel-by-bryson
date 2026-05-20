import React from 'react';
import styles from './Hero.module.scss';
import Container from '../../atoms/Container/Container';
import Button from '../../atoms/Button/Button';

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
            <Button variant="primary" size="lg" href="/contact">Book a Discovery Call</Button>
            <Button variant="outline" size="lg" href="/destinations">View Destinations</Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Hero;
