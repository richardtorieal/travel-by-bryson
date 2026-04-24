'use client';

import React from 'react';
import styles from './AllReviewsModal.module.scss';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { ALL_REVIEWS } from '@/data/reviews';
import TestimonialCard from '../../molecules/TestimonialCard/TestimonialCard';

interface AllReviewsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AllReviewsModal: React.FC<AllReviewsModalProps> = ({ isOpen, onClose }) => {
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
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.header}>
              <h2>Client Reviews</h2>
              <button onClick={onClose}><X /></button>
            </div>
            <div className={styles.list}>
              {ALL_REVIEWS.map((review, idx) => (
                <TestimonialCard key={idx} {...review} />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AllReviewsModal;
