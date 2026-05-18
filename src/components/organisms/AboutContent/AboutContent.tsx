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
            <span className={styles.subtitle}>Our Story</span>
            <h2 className={styles.title}>Turning Stays into <em>Masterpieces</em></h2>
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
              <strong>My Travel Style:</strong> A blend of high-energy city wandering and grounding natural beauty. 
              I value balance&mdash;mixing iconic attractions with local hidden gems and leaving room for unplanned moments.
            </p>
            <div className={styles.affiliation}>
              <p>Powered by <strong>Fora Travel, Inc.</strong></p>
            </div>
          </div>
          <div className={styles.imageWrapper}>
            <img 
              src="https://images.squarespace-cdn.com/content/v1/69f6ab8d7a94a05173559ac8/1e0ffb22-627d-4660-9620-c12b6e05eb7f/C505E04B-2D3D-47AE-9D30-6859F1FFA9B0.jpeg" 
              alt="Bryson Adams at Tower Bridge" 
              className={styles.image} 
            />
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
