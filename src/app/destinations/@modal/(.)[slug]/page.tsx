'use client';

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/atoms/Button/Button';
import { DESTINATIONS } from '@/data/destinations';
import Navbar from '@/components/organisms/Navbar/Navbar';
import Footer from '@/components/organisms/Footer/Footer';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import styles from './InterceptedModal.module.scss';

export default function InterceptedDestinationModal() {
  const router = useRouter();
  const params = useParams();
  const slug = params?.slug as string;
  const [isClosing, setIsClosing] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Instant data lookup
  const destination = DESTINATIONS.find(d => d.slug === slug);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth <= 992);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Only lock scroll on desktop modal
    if (window.innerWidth > 992) {
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      router.back();
    }, 400); 
  };

  if (!destination || !mounted) return null;

  // ON MOBILE: Render as a regular page, not a modal
  if (isMobile) {
    return (
      <div className={styles.pageContainer}>
        <Navbar />
        <div className={styles.overlay}>
          <Link href="/destinations" className={styles.backButton}>
            <ArrowLeft size={18} />
            <span>Back to Destinations</span>
          </Link>
          <div className={styles.modalCard}>
            <div className={styles.imageSection}>
              <img src={destination.image} alt={destination.name} className={styles.image} />
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
                <Button variant="primary" fullWidth href="/contact">Inquire About This Destination</Button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // ON DESKTOP: Render as the luxurious intercepted modal
  return (
    <AnimatePresence mode="wait">
      {!isClosing && (
        <motion.div 
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={handleClose}
          key="overlay"
        >
          <motion.div 
            className={styles.modalCard}
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.4, ease: [0.17, 0.89, 0.32, 1.1] }}
            onClick={(e) => e.stopPropagation()}
            key="modal"
          >
            <button onClick={handleClose} className={styles.closeButton} style={{ border: 'none', cursor: 'pointer' }}>
              ✕
            </button>

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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
