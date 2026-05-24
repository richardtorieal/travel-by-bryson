'use client';

import React from 'react';
import styles from './DestinationModal.module.scss';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../atoms/Button/Button';
import { X } from 'lucide-react';

interface DestinationModalProps {
  isOpen: boolean;
  onClose: () => void;
  destination: {
    name: string;
    region: string;
    type: string;
    image: string;
    insiderTip: string;
    description: string;
  } | null;
}

const DestinationModal: React.FC<DestinationModalProps> = ({ isOpen, onClose, destination }) => {
  if (!destination) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div 
            className={styles.modal}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.close} onClick={onClose}>
              <X size={24} />
            </button>
            
            <div className={styles.imageWrapper}>
              <img src={destination.image} alt={destination.name} className={styles.image} />
              <div className={styles.badge}>{destination.type}</div>
            </div>

            <div className={styles.content}>
              <span className={styles.region}>{destination.region}</span>
              <h2 className={styles.title}>{destination.name}</h2>
              
              <div className={styles.description}>
                <p>{destination.description}</p>
              </div>

              <div className={styles.insiderSection}>
                <h3>The Insider Take</h3>
                <p>{destination.insiderTip}</p>
              </div>

              <div className={styles.actions}>
                <Button variant="primary" fullWidth onClick={() => window.location.href='/contact'}>
                  Inquire About This Destination
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DestinationModal;
