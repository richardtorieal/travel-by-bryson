'use client';

import React, { useState, useRef, useEffect, Suspense } from 'react';
import styles from './ContactForm.module.scss';
import Container from '../../atoms/Container/Container';
import Section from '../../atoms/Section/Section';
import Button from '../../atoms/Button/Button';
import { Mail, Camera } from 'lucide-react';
import ServicePicker from './ServicePicker';
import { ServiceTier } from '../../molecules/PackageCard/PackageCard';
import { useSearchParams } from 'next/navigation';

const ContactFormContent: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedTier, setSelectedTier] = useState<ServiceTier | null>(null);
  const [destinationValue, setDestinationValue] = useState('');
  const journeySectionRef = useRef<HTMLDivElement>(null);
  const successMessageRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const dest = searchParams.get('destination');
    if (dest) {
      setDestinationValue(dest);
    }
  }, [searchParams]);

  const handleSelectTier = (tier: ServiceTier) => {
    setSelectedTier(tier);
    // Auto scroll to journey section after a brief delay to allow selection animation
    setTimeout(() => {
      journeySectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 300);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTier) return;
    setIsSubmitted(true);
    
    // Auto scroll to the success message after the form disappears
    setTimeout(() => {
      successMessageRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  return (
    <div className={styles.wrapper}>
      <Section variant="white" padding="section-std">
        <Container>
          <div className={styles.header}>
            <span className={styles.subtitle}>Get In Touch</span>
            <h2 className={styles.title}>Let&apos;s Plan Your Next <em>Vision</em></h2>
            <p>
              Select a service tier to begin, then fill out the details below. 
              We look forward to crafting your perfect journey.
            </p>
          </div>
        </Container>
      </Section>

      <div className={styles.packageSection}>
        <Container>
          <ServicePicker selectedTier={selectedTier} onSelect={handleSelectTier} />
        </Container>
      </div>

      <div 
        ref={journeySectionRef}
        className={`${styles.journeySection} ${!selectedTier ? styles.disabled : ''}`}
      >
        <Container>
          <div className={styles.formWrapper}>
            {!isSubmitted && <h3 className={styles.sectionTitle}>2. Tell Us About Your Journey</h3>}
            {isSubmitted ? (
              <div ref={successMessageRef} className={styles.success}>
                <h3>Thank you for sharing your vision</h3>
                <p>Your inquiry has been received. Bryson will personally review your details and reach out within 1-2 business days to begin crafting your {selectedTier} experience.</p>
                <div className={styles.actions}>
                  <Button variant="outline" onClick={() => setIsSubmitted(false)}>Submit Another Inquiry</Button>
                </div>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label>First Name</label>
                    <input type="text" placeholder="Your first name" required disabled={!selectedTier} />
                  </div>
                  <div className={styles.field}>
                    <label>Last Name</label>
                    <input type="text" placeholder="Your last name" required disabled={!selectedTier} />
                  </div>
                </div>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label>Email Address</label>
                    <input type="email" placeholder="Your email address" required disabled={!selectedTier} />
                  </div>
                  <div className={styles.field}>
                    <label>Phone Number</label>
                    <input type="tel" placeholder="Your phone number" disabled={!selectedTier} />
                  </div>
                </div>

                <div className={styles.field}>
                  <label>Preferred Contact Method</label>
                  <div className={styles.radioGroup}>
                    <label className={styles.radio}>
                      <input type="radio" name="contactMethod" value="email" defaultChecked disabled={!selectedTier} />
                      <span>Email</span>
                    </label>
                    <label className={styles.radio}>
                      <input type="radio" name="contactMethod" value="phone" disabled={!selectedTier} />
                      <span>Phone</span>
                    </label>
                    <label className={styles.radio}>
                      <input type="radio" name="contactMethod" value="instagram" disabled={!selectedTier} />
                      <span>Instagram</span>
                    </label>
                  </div>
                </div>
                
                <div className={styles.field}>
                  <label>Where would you like to go?</label>
                  <input 
                    type="text" 
                    placeholder="Destination or region" 
                    required 
                    disabled={!selectedTier}
                    value={destinationValue}
                    onChange={(e) => setDestinationValue(e.target.value)}
                  />
                </div>

                <div className={styles.field}>
                  <label>What can I book for you?</label>
                  <div className={styles.checkboxGroup}>
                    <label className={styles.checkbox}>
                      <input type="checkbox" name="interest" value="hotels" disabled={!selectedTier} />
                      <span>Hotels & Resorts</span>
                    </label>
                    <label className={styles.checkbox}>
                      <input type="checkbox" name="interest" value="cruises" disabled={!selectedTier} />
                      <span>Cruises</span>
                    </label>
                    <label className={styles.checkbox}>
                      <input type="checkbox" name="interest" value="tours" disabled={!selectedTier} />
                      <span>Tours & Experiences</span>
                    </label>
                    <label className={styles.checkbox}>
                      <input type="checkbox" name="interest" value="transport" disabled={!selectedTier} />
                      <span>Transportation</span>
                    </label>
                  </div>
                </div>

                <div className={styles.field}>
                  <label>Dream Details</label>
                  <textarea 
                    placeholder="Tell us more about your travel style, preferred dates, or specific vision..." 
                    rows={5} 
                    required 
                    disabled={!selectedTier}
                  ></textarea>
                </div>
                
                <div className={styles.actions}>
                  <Button type="submit" variant="primary" size="lg" fullWidth disabled={!selectedTier}>
                    SEND INQUIRY
                  </Button>
                </div>
              </form>
            )}
          </div>
        </Container>
      </div>

      <div className={styles.contactDetails}>
        <Container>
          <div className={styles.detailsHeader}>
            <h3>Prefer a direct conversation?</h3>
            <p>Connect with Bryson through your preferred platform.</p>
          </div>
          <div className={styles.detailsGrid}>
            <a href="mailto:bryson.adams@fora.travel" className={styles.contactCard}>
              <Mail className={styles.icon} />
              <div className={styles.cardContent}>
                <strong>Email</strong>
                <span>bryson.adams@fora.travel</span>
              </div>
            </a>
            <a href="https://www.instagram.com/travel.by.bryson/" target="_blank" rel="noreferrer" className={styles.contactCard}>
              <Camera className={styles.icon} />
              <div className={styles.cardContent}>
                <strong>Instagram</strong>
                <span>Instagram</span>
              </div>
            </a>
          </div>
        </Container>
      </div>
    </div>
  );
};

const ContactForm: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading form...</div>}>
      <ContactFormContent />
    </Suspense>
  );
};

export default ContactForm;
