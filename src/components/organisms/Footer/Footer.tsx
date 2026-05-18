import React from 'react';
import styles from './Footer.module.scss';
import Container from '../../atoms/Container/Container';
import Link from 'next/link';
import { Camera, Mail } from 'lucide-react';

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
            <Link href="/packages">Service Packages</Link>
            <Link href="/destinations">Destinations</Link>
          </div>
          <div className={styles.column}>
            <h3>Connect <em>Directly</em></h3>
            <a href="mailto:bryson.adams@fora.travel" className={styles.socialLink}>
              <Mail size={16} />
              <span>Email</span>
            </a>
            <a href="https://www.instagram.com/travel.by.bryson/" target="_blank" rel="noreferrer" className={styles.socialLink}>
              <Camera size={16} />
              <span>Instagram</span>
            </a>
            <Link href="/contact" className={styles.socialLink}>Contact Us</Link>
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
