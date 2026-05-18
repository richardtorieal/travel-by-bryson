'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState, use } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/atoms/Button/Button';
import { DESTINATIONS } from '@/data/destinations';
import ReactMarkdown from 'react-markdown';
import styles from '../../[slug]/DestinationBlog.module.scss';

export default function InterceptedDestinationModal({ params }: { params: Promise<{ slug: string }> }) {
  const router = useRouter();
  const { slug } = use(params);
  const [isClosing, setIsClosing] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Instant data lookup
  const destination = DESTINATIONS.find(d => d.slug === slug);

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    // Let Framer Motion exit animation play fully
    setTimeout(() => {
      router.back();
    }, 400); 
  };

  if (!destination || !mounted) return null;

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
