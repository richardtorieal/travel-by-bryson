'use client';

import React from 'react';
import styles from './AboutMe.module.scss';
import Container from '../../atoms/Container/Container';
import Section from '../../atoms/Section/Section';
import { motion } from 'framer-motion';

const AboutMe: React.FC = () => {
  return (
    <Section variant="white" padding="xl">
      <Container>
        <div className={styles.grid}>
          <div className={styles.imageSide}>
            <motion.div 
              className={styles.imageWrapper}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <img 
                src="/assets/Bryson adams fora profile picture.webp" 
                alt="Bryson Adams" 
                className={styles.image}
              />
              <div className={styles.infoBox}>
                <div className={styles.infoItem}>
                  <span className={styles.label}>Based in</span>
                  <span className={styles.value}>Fort Myers, Florida</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.label}>Language</span>
                  <span className={styles.value}>English</span>
                </div>
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
