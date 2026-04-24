'use client';

import React, { useState } from 'react';
import styles from './DestinationsContent.module.scss';
import Container from '../../atoms/Container/Container';
import Section from '../../atoms/Section/Section';
import DestinationModal from '../../molecules/DestinationModal/DestinationModal';

const DESTINATIONS = [
  { 
    name: 'Amalfi Coast', 
    region: 'Italy', 
    type: 'Coastal Luxury',
    description: 'The Amalfi Coast is a 50-kilometer stretch of coastline along the southern edge of Italy’s Sorrentine Peninsula, in the Campania region.',
    insiderTip: 'Most tourists head to Positano, but for a true insider experience, I recommend staying in Ravello. The views from the villas are peerless and the atmosphere is far more exclusive.',
    perk: 'Complimentary private boat excursion along the coast for sunset, exclusively for my clients.'
  },
  { 
    name: 'St. Barts', 
    region: 'Caribbean', 
    type: 'Tropical Escape',
    description: 'A tiny, French-speaking island in the Caribbean known for its white-sand beaches, designer boutiques, and sophisticated dining.',
    insiderTip: 'Avoid the main port for lunch; let me book you a table at Shellona at sunset. The vibe is electric and the service is some of the best on the island.',
    perk: 'VIP airport assistance and fast-track customs clearance upon arrival.'
  },
  { 
    name: 'St. Moritz', 
    region: 'Switzerland', 
    type: 'Alpine Retreat',
    description: 'A luxury alpine resort town in Switzerland’s Engadin valley, St. Moritz has hosted the Winter Olympics twice.',
    insiderTip: 'The "after-ski" at Badrutt’s Palace is legendary. I can ensure you have the best table in the room even during peak season.',
    perk: 'Daily complimentary ski pass for two and equipment fitting in your suite.'
  },
  { 
    name: 'Kyoto', 
    region: 'Japan', 
    type: 'Cultural Heritage',
    description: 'Once the capital of Japan, Kyoto is a city on the island of Honshu. It’s famous for its numerous classical Buddhist temples, gardens, and imperial palaces.',
    insiderTip: 'Skip the crowded Arashiyama Bamboo Grove at midday. I’ll arrange a private early morning tea ceremony in a hidden temple garden instead.',
    perk: 'Private guided tour of a "closed-to-public" Zen temple and meditation session.'
  },
  { 
    name: 'Provence', 
    region: 'France', 
    type: 'Rustic Elegance',
    description: 'A geographical region and historical province of southeastern France, spanning from the left bank of the lower Rhône to the border of Italy.',
    insiderTip: 'The lavender fields are beautiful, but the true soul of Provence is in the local markets. I’ll provide my personal map of the best hidden antiques dealers.',
    perk: 'Personalized wine tasting session with a master sommelier in the hotel’s private cellar.'
  },
  { 
    name: 'Maldives', 
    region: 'Indian Ocean', 
    type: 'Ultimate Seclusion',
    description: 'A tropical nation in the Indian Ocean composed of 26 ring-shaped atolls, which are made up of more than 1,000 coral islands.',
    insiderTip: 'Choosing the right atoll is key for marine life. I recommend the Baa Atoll for Manta Ray encounters—I know exactly which villas offer the best direct reef access.',
    perk: '$200 additional spa credit per stay and a private sandbank dinner for two.'
  }
];

const DestinationsContent: React.FC = () => {
  const [selectedDest, setSelectedDest] = useState<typeof DESTINATIONS[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (dest: typeof DESTINATIONS[0]) => {
    setSelectedDest(dest);
    setIsModalOpen(true);
  };

  return (
    <Section variant="white" padding="xl">
      <Container>
        <div className={styles.header}>
          <span className={styles.subtitle}>Our Portfolio</span>
          <h2 className={styles.title}>Curated Destinations</h2>
          <p className={styles.desc}>
            While we plan trips globally, these are a few of our most requested and 
            expertly vetted locations where our insider connections truly shine.
          </p>
        </div>
        
        <div className={styles.gallery}>
          {DESTINATIONS.map((dest, index) => (
            <div key={index} className={styles.item} onClick={() => handleOpenModal(dest)}>
              <div className={styles.imagePlaceholder}>
                <div className={styles.overlay}>
                  <span>Explore Insider Take</span>
                </div>
              </div>
              <div className={styles.info}>
                <h3>{dest.name}</h3>
                <p>{dest.region}</p>
              </div>
            </div>
          ))}
        </div>

        <DestinationModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          destination={selectedDest} 
        />
      </Container>
    </Section>
  );
};

export default DestinationsContent;
