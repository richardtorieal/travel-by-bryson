'use client';

import React from 'react';
import styles from './AboutMe.module.scss';
import Container from '../../atoms/Container/Container';
import Section from '../../atoms/Section/Section';
import { motion } from 'framer-motion';
import Image from 'next/image';

const AboutMe: React.FC = () => {
  const stats = [
    { label: 'Experience', value: '6 Years' },
    { label: 'Based in', value: 'Fort Myers, Florida' },
    { label: 'Pronouns', value: 'He / Him' },
    { label: 'Status', value: 'Advanced Fora Advisor' }
  ];

  return (
    <Section variant="white" className={styles.aboutSection}>
      <Container>
        <div className={styles.grid}>
          <div className={styles.imageSide}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={styles.imageWrapper}
            >
              <div className={styles.frame}>
                <Image
                  src="/assets/Bryson adams fora profile picture.webp"
                  alt="Bryson Adams"
                  width={3024}
                  height={4032}
                  quality={100}
                  className={styles.image}
                  priority
                  sizes="(max-width: 768px) 100vw, 500px"
                />
              </div>

              {/* Advisor Stats Section */}
              <div className={styles.advisorStats}>
                {stats.map((stat, index) => (
                  <div key={index} className={styles.statLine}>
                    <span className={styles.statLabel}>{stat.label}</span>
                    <span className={styles.statValue}>{stat.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className={styles.contentSide}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className={styles.subtitle}>Our Story</span>
              <h2 className={styles.title}>Meet <em>Bryson Adams</em></h2>

              <div className={styles.story}>
                <p>
                  With six years of experience working in luxury hotels, I bring an insider’s understanding of what it takes to turn a stay into a lifelong memory. While I love exploring new cultures and cuisines, my true passion lies in celebrating life’s biggest chapters. I believe the most important milestones—honeymoons, milestone birthdays, anniversaries, and graduations—deserve more than just a standard itinerary—they deserve a masterpiece. I specialize in translating your personal milestones into thoughtfully crafted journeys, whether that’s a high-end luxury escape or a hidden-gem adventure.
                </p>
                <p>
                  By combining my professional background in service with a constant hunger for fresh destinations, I ensure your celebration is seamless, personalized, and truly unforgettable. You bring the reason to celebrate; I’ll bring the fresh ideas and meticulous planning to make it feel truly yours.
                </p>
              </div>

              <div className={styles.travelStyle}>
                <h3 className={styles.sectionHeading}>Travel Style</h3>
                <p>
                  My travel style is a blend of city energy and natural beauty—I’m just as excited wandering through vibrant neighborhoods as I am hiking to take in sweeping views. I love exploring cities with a balanced approach: mixing iconic attractions with hidden gems, local experiences, and plenty of unplanned moments to simply soak in the atmosphere. Whether it’s an interactive activity, a scenic trail, or tasting my way through different cuisines, I’m always looking for ways to connect more deeply with a destination.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default AboutMe;
