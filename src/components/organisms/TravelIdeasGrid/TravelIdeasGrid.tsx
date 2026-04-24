import React from 'react';
import styles from './TravelIdeasGrid.module.scss';
import Container from '../../atoms/Container/Container';
import Section from '../../atoms/Section/Section';
import { TRAVEL_IDEAS } from '@/data/travelIdeas';
import Link from 'next/link';

const TravelIdeasGrid: React.FC = () => {
  return (
    <Section variant="light" padding="xl">
      <Container>
        <div className={styles.header}>
          <span className={styles.subtitle}>Insider Journal</span>
          <h2 className={styles.title}>Travel Ideas</h2>
        </div>
        
        <div className={styles.grid}>
          {TRAVEL_IDEAS.map((post) => (
            <Link key={post.slug} href={`/travel-ideas/${post.slug}`} className={styles.card}>
              <div className={styles.imagePlaceholder}>
                <div className={styles.category}>{post.category}</div>
              </div>
              <div className={styles.content}>
                <span className={styles.date}>{post.date}</span>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <span className={styles.readMore}>Read the Guide</span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default TravelIdeasGrid;
