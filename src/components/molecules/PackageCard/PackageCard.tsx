'use client';

import React from 'react';
import styles from './PackageCard.module.scss';
import { Check } from 'lucide-react';
import Button from '../../atoms/Button/Button';
import Link from 'next/link';

export type ServiceTier = 'essentials' | 'elevated' | 'immersive';

export interface PackageData {
  name: string;
  price: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  cta: string;
  featured: boolean;
}

interface PackageCardProps {
  packageData: PackageData;
  isSelected?: boolean;
  onSelect?: () => void;
  hideFooter?: boolean;
  showSelectionIndicator?: boolean;
}

const PackageCard: React.FC<PackageCardProps> = ({ 
  packageData, 
  isSelected = false, 
  onSelect, 
  hideFooter = false,
  showSelectionIndicator = false
}) => {
  const { name, price, description, icon, features, cta, featured } = packageData;

  return (
    <div 
      className={`
        ${styles.card} 
        ${featured ? styles.featured : ''} 
        ${isSelected ? styles.selected : ''}
      `}
      onClick={onSelect}
    >
      {featured && <div className={styles.badge}>Most Popular</div>}
      
      {showSelectionIndicator && (
        <div className={styles.selectionIndicator}>
          {isSelected && <Check size={16} />}
        </div>
      )}

      <div className={styles.cardHeader}>
        <div className={styles.icon}>{icon}</div>
        <h2 className={styles.packageName}>{name}</h2>
        <div className={styles.price}>{price}</div>
        <p className={styles.packageDesc}>{description}</p>
      </div>
      
      <ul className={styles.featureList}>
        {features.map((feature, fIndex) => (
          <li key={fIndex}>
            <Check size={18} className={styles.check} />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {!hideFooter && (
        <div className={styles.cardFooter}>
          <Button 
            variant={featured ? 'primary' : 'outline'} 
            fullWidth
            href="/contact"
          >
            {cta}
          </Button>
        </div>
      )}
    </div>
  );
};

export default PackageCard;
