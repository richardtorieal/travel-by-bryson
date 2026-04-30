import React from 'react';
import styles from './Footer.module.scss';
import Container from '../../atoms/Container/Container';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <div className={styles.logo}>
              BRYSON <span>ADAMS</span>
            </div>
            <p className={styles.description}>
              Your luxury hotel insider, providing bespoke travel 
              planning and exclusive perks worldwide.
            </p>
          </div>
          <div className={styles.column}>
            <h3>Explore <em>Collection</em></h3>
            <Link href="/about">About Bryson</Link>
            <Link href="/services">Our Services</Link>
            <Link href="/destinations">Destinations</Link>
          </div>
          <div className={styles.column}>
            <h3>Connect <em>Directly</em></h3>
            <a href="mailto:hello@brysonadams.travel">hello@brysonadams.travel</a>
            <a href="https://instagram.com/brysonadams" target="_blank" rel="noreferrer">Instagram</a>
            <Link href="/contact">Contact Us</Link>
          </div>
        </div>
        <div className={styles.bottom}>
          <p>&copy; {new Date().getFullYear()} Bryson Adams Travel. All rights reserved.</p>
          <div className={styles.legal}>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
