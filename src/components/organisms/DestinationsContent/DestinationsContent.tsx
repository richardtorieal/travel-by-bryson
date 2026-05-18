'use client';

import React from 'react';
import styles from './DestinationsContent.module.scss';
import Container from '../../atoms/Container/Container';
import Section from '../../atoms/Section/Section';
import Link from 'next/link';
import { DESTINATIONS } from '@/data/destinations';

const DestinationsContent = () => {
  return (
    <Section variant="white" padding="xl">
      <Container>
        <div className={styles.header}>
          <span className={styles.subtitle}>Our Portfolio</span>
          <h2 className={styles.title}>Curated <em>Destinations</em></h2>
          <p className={styles.desc}>
            While we plan trips globally, these are a few of our most requested and 
            expertly vetted locations where our insider connections truly shine.
          </p>
        </div>
        
        <div className={styles.gallery}>
          {DESTINATIONS.map((dest: any) => (
            <Link 
              href={`/destinations/${dest.slug}`} 
              key={dest.slug} 
              className={styles.item}
            >
              <div className={styles.imageWrapper}>
                <img 
                  src={dest.image} 
                  alt={dest.name} 
                  className={styles.image} 
                />
                <div className={styles.overlay}>
                  <span>Read Full Guide</span>
                </div>
              </div>
              <div className={styles.info}>
                <h3>{dest.name}</h3>
                <p>{dest.region}</p>
              </div>
            </Link>
          ))}
        </div>

        {DESTINATIONS.length === 0 && (
          <div className={styles.empty}>
            <p>Admin is currently updating our luxury destination portfolio.</p>
          </div>
        )}
      </Container>
    </Section>
  );
};

export default DestinationsContent;
