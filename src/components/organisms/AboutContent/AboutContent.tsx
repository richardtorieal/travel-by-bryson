import React from 'react';
import styles from './AboutContent.module.scss';
import Container from '../../atoms/Container/Container';
import Section from '../../atoms/Section/Section';

const AboutContent: React.FC = () => {
  return (
    <Section variant="white" padding="xl">
      <Container>
        <div className={styles.wrapper}>
          <div className={styles.text}>
            <span className={styles.subtitle}>The Insider Story</span>
            <h2 className={styles.title}>From Luxury Hotels to Your <em>Personal Advisor</em></h2>
            <p>
              With over six years of experience working within the world&apos;s most prestigious luxury hotels, 
              I&apos;ve seen the industry from the inside out. I understand the nuances of exceptional service 
              and the &quot;hidden keys&quot; that unlock a truly memorable stay.
            </p>
            <p>
              My transition to a travel advisor was born from a desire to share this insider knowledge 
              with my clients. I don&apos;t just book rooms; I curate experiences by leveraging my 
              relationships with hotel managers and local experts globally.
            </p>
            <p>
              When you work with me, you&apos;re not just getting a travel agent&mdash;you&apos;re getting an 
              insider who knows how to ensure you&apos;re treated like a VIP from the moment you arrive.
            </p>
          </div>
          <div className={styles.imageWrapper}>
            <img src="/assets/london-museums-interactive.jpg" alt="London Experience" className={styles.image} />
            <div className={styles.box}>
              <span>6+ Years in Luxury Hospitality</span>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default AboutContent;
