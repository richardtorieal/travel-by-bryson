import React from 'react';
import styles from './PerksGrid.module.scss';
import Container from '../../atoms/Container/Container';
import Section from '../../atoms/Section/Section';

const STATS = [
  {
    value: '98%',
    label: 'Travelers trust Bryson to curate their perfect escape.'
  },
  {
    value: '200+',
    label: 'Custom travel plans created for solo, couple, and group adventures.'
  },
  {
    value: '150+',
    label: 'Certified luxury hotel partners ready to assist your journey.'
  },
  {
    value: '4.9★',
    label: 'Average rating from travelers worldwide.'
  }
];

const PerksGrid: React.FC = () => {
  return (
    <Section variant="white" padding="xl">
      <Container>
        <div className={styles.intro}>
          <h2 className={styles.introTitle}>
            The New <em>Standard</em> <br />
            of Bespoke Travel
          </h2>
          <p className={styles.introSubtitle}>
            Save hours with our local experts and curated plans.
          </p>
        </div>
        <div className={styles.grid}>
          {STATS.map((stat, index) => (
            <div key={index} className={styles.statItem}>
              <span className={styles.value}>{stat.value}</span>
              <p className={styles.label}>{stat.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default PerksGrid;
