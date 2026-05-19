'use client';

import Navbar from '@/components/organisms/Navbar/Navbar';
import Footer from '@/components/organisms/Footer/Footer';
import DestinationsContent from '@/components/organisms/DestinationsContent/DestinationsContent';
import ScheduleSection from '@/components/organisms/ScheduleSection/ScheduleSection';
import Button from '@/components/atoms/Button/Button';
import { notFound } from 'next/navigation';
import { DESTINATIONS } from '@/data/destinations';
import { use, useEffect } from 'react';
import Link from 'next/link';
import styles from './DestinationBlog.module.scss';

export default function DestinationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const destination = DESTINATIONS.find(d => d.slug === slug);

  useEffect(() => {
    // Body scroll logic: only lock on desktop where it's a modal
    const isMobile = window.innerWidth <= 992;
    if (!isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!destination) {
    notFound();
  }

  return (
    <div className={styles.pageContainer}>
      <Navbar />

      {/* 1. Backdrop (Hidden on Mobile via CSS) */}
      <div className={styles.backgroundContent} aria-hidden="true">
        <DestinationsContent />
        <ScheduleSection />
      </div>

      {/* 2. Main Content Area */}
      <div className={styles.overlay}>
        {/* Transparent link to close (Desktop only) */}
        <Link href="/destinations" className={styles.desktopCloseLink} />
        
        <div className={styles.modalCard}>
          {/* Close button (Hidden on Mobile via CSS) */}
          <Link href="/destinations" className={styles.closeButton}>
            ✕
          </Link>

          <div className={styles.imageSection}>
            <img 
              src={destination.image} 
              alt={destination.name}
              className={styles.image}
            />
            <div className={styles.badge}>{destination.type}</div>
          </div>

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

      {/* 3. Global Footer (Always visible at bottom) */}
      <Footer />
    </div>
  );
}
