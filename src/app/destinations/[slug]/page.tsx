'use client';

import Navbar from '@/components/organisms/Navbar/Navbar';
import Footer from '@/components/organisms/Footer/Footer';
import Button from '@/components/atoms/Button/Button';
import { notFound, useParams } from 'next/navigation';
import { DESTINATIONS } from '@/data/destinations';
import Link from 'next/link';
import styles from './DestinationBlog.module.scss';

export default function DestinationPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const destination = DESTINATIONS.find(d => d.slug === slug);

  if (!destination) {
    notFound();
  }

  return (
    <div className={styles.pageContainer}>
      <Navbar />

      <div className={styles.overlay}>
        <div className={styles.modalCard}>
          <div className={styles.imageSection}>
            <img 
              src={destination.image} 
              alt={destination.name}
              className={styles.image}
            />
            <div className={styles.badge}>{destination.type}</div>
          </div>

          <Link href="/destinations" className={styles.backButton}>
            Back to Destinations
          </Link>

          <div className={styles.contentSection}>
            <span className={styles.region}>{destination.region}</span>
            <h1 className={styles.title}>{destination.name}</h1>
            
            <p className={styles.description}>{destination.description}</p>

            <div className={styles.insiderSection}>
              <h3>The Insider Take</h3>
              <p>{destination.insiderTip}</p>
            </div>

            <div className={styles.perkSection}>
              <h3>Exclusive Perk</h3>
              <p>{destination.perk}</p>
            </div>

            <div className={styles.actions}>
              <Button variant="primary" fullWidth href="/contact">
                Inquire About This Destination
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
