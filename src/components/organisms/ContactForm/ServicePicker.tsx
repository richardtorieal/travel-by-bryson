'use client';

import React from 'react';
import styles from './ServicePicker.module.scss';
import PackageCard, { PackageData, ServiceTier } from '../../molecules/PackageCard/PackageCard';
import { Star, Zap, ShieldCheck } from 'lucide-react';

interface ServicePickerProps {
  selectedTier: ServiceTier | null;
  onSelect: (tier: ServiceTier) => void;
}

const ServicePicker: React.FC<ServicePickerProps> = ({ selectedTier, onSelect }) => {
  const tiers: (PackageData & { id: ServiceTier })[] = [
    {
      id: 'essentials',
      name: 'Essentials',
      price: 'Complimentary',
      description: 'Stress-free bookings with exclusive VIP perks.',
      icon: <ShieldCheck size={32} />,
      features: [
        'Curated hotel & resort recommendations',
        'Exclusive VIP perks (free breakfast, $100 credits)',
        'Room upgrades (subject to availability)',
        'Cruise & luxury rail bookings',
        'Direct relationship management with property staff'
      ],
      cta: 'Start Booking',
      featured: false
    },
    {
      id: 'elevated',
      name: 'Elevated',
      price: '$65',
      description: 'Personalized adventure roadmap for the curious traveler.',
      icon: <Star size={32} />,
      features: [
        'Everything in Essentials',
        'Custom roadmap of suggested daily adventures',
        'Curation of the best local dining spots',
        "Personal 'must-do' list tailored to your style",
        'One round of itinerary adjustments'
      ],
      cta: 'Go Elevated',
      featured: true
    },
    {
      id: 'immersive',
      name: 'Immersive',
      price: '$165',
      description: 'The ultimate hands-free, high-touch travel experience.',
      icon: <Zap size={32} />,
      features: [
        'Everything in Elevated',
        'Full logistical management (transport & transfers)',
        'Confirmed dining & experience reservations',
        'Private tour & excursion coordination',
        'Daily concierge-level support during travel',
        'Unlimited itinerary adjustments'
      ],
      cta: 'Go Immersive',
      featured: false
    }
  ];

  return (
    <div className={styles.container}>
      <h3 className={styles.sectionTitle}>1. Select Your Service Package</h3>
      <div className={styles.grid}>
        {tiers.map((tier) => (
          <PackageCard 
            key={tier.id}
            packageData={tier}
            isSelected={selectedTier === tier.id}
            onSelect={() => onSelect(tier.id)}
            hideFooter={true}
            showSelectionIndicator={true}
          />
        ))}
      </div>
    </div>
  );
};

export default ServicePicker;
