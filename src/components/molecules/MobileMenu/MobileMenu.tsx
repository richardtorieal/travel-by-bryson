'use client';

import React from 'react';
import styles from './MobileMenu.module.scss';
import Link from 'next/link';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <button className={styles.close} onClick={onClose}>&times;</button>
      <div className={styles.links}>
        <Link href="/about" onClick={onClose}>About</Link>
        <Link href="/services" onClick={onClose}>Services</Link>
        <Link href="/destinations" onClick={onClose}>Destinations</Link>
        <Link href="/contact" onClick={onClose}>Contact</Link>
      </div>
    </div>
  );
};

export default MobileMenu;
