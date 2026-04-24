import React from 'react';
import styles from './PerksGrid.module.scss';
import Container from '../../atoms/Container/Container';
import Section from '../../atoms/Section/Section';
import PerkCard from '../../molecules/PerkCard/PerkCard';

const PERKS = [
  {
    title: 'Room Upgrades',
    description: 'Complimentary room upgrades at check-in, subject to availability.',
    icon: '✨'
  },
  {
    title: 'Daily Breakfast',
    description: 'Complimentary daily breakfast for two at over 8,200 luxury hotels.',
    icon: '☕'
  },
  {
    title: '$100 Resort Credit',
    description: 'Special resort or spa credits to enhance your stay.',
    icon: '💎'
  },
  {
    title: 'VIP Status',
    description: 'Early check-in and late check-out to make the most of your trip.',
    icon: '👑'
  }
];

const PerksGrid: React.FC = () => {
  return (
    <Section variant="white" padding="xl">
      <Container>
        <div className={styles.header}>
          <h2 className={styles.title}>The Insider Advantage</h2>
          <p className={styles.subtitle}>
            Booking through a professional advisor unlocks exclusive benefits 
            that you simply can&apos;t find on your own.
          </p>
        </div>
        <div className={styles.grid}>
          {PERKS.map((perk, index) => (
            <PerkCard key={index} {...perk} />
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default PerksGrid;
