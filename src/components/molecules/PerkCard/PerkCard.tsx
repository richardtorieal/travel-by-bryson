import React from 'react';
import styles from './PerkCard.module.scss';

interface PerkCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

const PerkCard: React.FC<PerkCardProps> = ({ title, description, icon }) => {
  return (
    <div className={styles.card}>
      {icon && <div className={styles.icon}>{icon}</div>}
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </div>
  );
};

export default PerkCard;
