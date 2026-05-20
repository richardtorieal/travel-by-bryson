import React from 'react';
import styles from './Packages.module.scss';
import Section from '@/components/atoms/Section/Section';
import Container from '@/components/atoms/Container/Container';
import Navbar from '@/components/organisms/Navbar/Navbar';
import Footer from '@/components/organisms/Footer/Footer';
import PackageCard, { PackageData } from '@/components/molecules/PackageCard/PackageCard';
import { Star, Zap, ShieldCheck } from 'lucide-react';

const PackagesPage = () => {
  const packages: PackageData[] = [
    {
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
    <main className={styles.main}>
      <Navbar />
      <Section variant="white" padding="section-compact" className={styles.hero}>
        <Container>
          <div className={styles.heroContent}>
            <span className={styles.subtitle}>Our Services</span>
            <h1 className={styles.title}>Planning Fees & <em>Packages</em></h1>
            <p className={styles.description}>
              Whether you just need a perfect hotel booking with perks or a fully managed 
              logistical masterpiece, we have a tier designed for your vision.
            </p>
          </div>
        </Container>
      </Section>

      <Section variant="light" padding="section-std">
        <Container>
          <div className={styles.grid}>
            {packages.map((pkg, index) => (
              <PackageCard key={index} packageData={pkg} />
            ))}
          </div>
        </Container>
      </Section>

      <Section variant="white" padding="section-std">
        <Container>
          <div className={styles.faqWrapper}>
            <h2 className={styles.faqTitle}>Common <em>Questions</em></h2>
            <div className={styles.faqGrid}>
              <div className={styles.faqItem}>
                <h3>Why is Essentials free?</h3>
                <p>I am compensated by my hotel and cruise partners, allowing me to provide these bookings at no cost to you while still securing you exclusive VIP benefits.</p>
              </div>
              <div className={styles.faqItem}>
                <h3>When is the fee paid?</h3>
                <p>Planning fees for Elevated and Immersive tiers are paid upfront before the detailed planning process begins.</p>
              </div>
              <div className={styles.faqItem}>
                <h3>Do you book airfare?</h3>
                <p>I focus on &quot;land and sea&quot; logistics. While I don&apos;t book commercial airfare directly, I can coordinate with your flight schedule or recommend private aviation partners.</p>
              </div>
              <div className={styles.faqItem}>
                <h3>What if I have a group?</h3>
                <p>For groups of 10 or more, please contact me directly for a custom quote as the logistical needs often scale differently.</p>
              </div>
            </div>
          </div>
        </Container>
      </Section>
      <Footer />
    </main>
  );
};

export default PackagesPage;
