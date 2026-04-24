import React from 'react';
import styles from './ServicesContent.module.scss';
import Container from '../../atoms/Container/Container';
import Section from '../../atoms/Section/Section';
import Button from '../../atoms/Button/Button';

const ServicesContent: React.FC = () => {
  return (
    <Section variant="white" padding="xl">
      <Container>
        <div className={styles.header}>
          <span className={styles.subtitle}>Our Services</span>
          <h2 className={styles.title}>Tailored Travel Planning</h2>
        </div>
        
        <div className={styles.grid}>
          <div className={styles.card}>
            <h3>The Quick Booking</h3>
            <p className={styles.price}>No Planning Fee</p>
            <p className={styles.desc}>Perfect for when you know where you want to stay.</p>
            <ul>
              <li>Access to exclusive Fora perks</li>
              <li>Room upgrades (subject to availability)</li>
              <li>Daily breakfast for two</li>
              <li>$100 resort or spa credit</li>
              <li>VIP status and personal welcome</li>
            </ul>
            <Button variant="outline" fullWidth>Select This Tier</Button>
          </div>

          <div className={`${styles.card} ${styles.featured}`}>
            <div className={styles.badge}>Most Popular</div>
            <h3>Bespoke Itinerary</h3>
            <p className={styles.price}>Starting at $250</p>
            <p className={styles.desc}>Full planning for complex, multi-stop journeys.</p>
            <ul>
              <li>Custom end-to-end itinerary design</li>
              <li>Vetted hotel and dining recommendations</li>
              <li>Private transport and transfer logistics</li>
              <li>Unique tours and local experiences</li>
              <li>24/7 support while traveling</li>
            </ul>
            <Button variant="accent" fullWidth>Select This Tier</Button>
          </div>

          <div className={styles.card}>
            <h3>Group & Corporate</h3>
            <p className={styles.price}>Custom Quote</p>
            <p className={styles.desc}>Expert coordination for groups of 10 or more.</p>
            <ul>
              <li>Room block management</li>
              <li>Event and meeting coordination</li>
              <li>Group activity planning</li>
              <li>Centralized billing support</li>
              <li>Dedicated on-site assistance options</li>
            </ul>
            <Button variant="outline" fullWidth>Select This Tier</Button>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default ServicesContent;
