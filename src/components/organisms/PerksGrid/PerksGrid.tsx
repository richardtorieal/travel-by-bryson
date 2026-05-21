'use client';

import React from 'react';
import styles from './PerksGrid.module.scss';
import Container from '../../atoms/Container/Container';
import Section from '../../atoms/Section/Section';
import { motion } from 'framer-motion';

const STATS = [
  {
    value: '100%',
    label: '5 Star reviews'
  },
  {
    value: '40',
    label: 'Trips Planned'
  },
  {
    value: '4,500+',
    label: 'Partners offering VIP treatment and perks'
  }
];

const PerksGrid: React.FC = () => {
  return (
    <Section variant="sand" padding="xl">
      <Container>
        <motion.div 
          className={styles.intro}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className={styles.introTitle}>
            The New <em>Standard</em> <br />
            of Bespoke Travel
          </h2>
          <p className={styles.introSubtitle}>
            Save hours with our local experts and curated plans.
          </p>
        </motion.div>
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
