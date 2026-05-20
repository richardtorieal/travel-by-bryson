'use client';

import React, { useState } from 'react';
import styles from './ContactForm.module.scss';
import Container from '../../atoms/Container/Container';
import Section from '../../atoms/Section/Section';
import Button from '../../atoms/Button/Button';
import { Mail, Camera, Calendar } from 'lucide-react';
import ServicePicker from './ServicePicker';
import { ServiceTier } from '../../molecules/PackageCard/PackageCard';

const ContactForm: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedTier, setSelectedTier] = useState<ServiceTier | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTier) {
      alert('Please select a service package first.');
      return;
    }
    setIsSubmitted(true);
  };

  return (
    <Section variant="transparent" padding="section-std">
      <Container>
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <span className={styles.subtitle}>Get In Touch</span>
            <h2 className={styles.title}>Let&apos;s Plan Your Next <em>Vision</em></h2>
            <p>
              Select a service tier to begin, then fill out the details below. 
              We look forward to crafting your perfect journey.
            </p>
          </div>
          
          <ServicePicker selectedTier={selectedTier} onSelect={setSelectedTier} />

          <div className={styles.formWrapper}>
            <h3 className={styles.sectionTitle}>2. Tell Us About Your Journey</h3>
            {isSubmitted ? (
              <div className={styles.success}>
                <h3>Inquiry Sent</h3>
                <p>Thank you for reaching out. Bryson will get back to you within 1-2 business days to begin planning your {selectedTier} experience.</p>
                <Button variant="outline" onClick={() => setIsSubmitted(false)}>Send Another Message</Button>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label>First Name</label>
                    <input type="text" placeholder="Your first name" required />
                  </div>
                  <div className={styles.field}>
                    <label>Last Name</label>
                    <input type="text" placeholder="Your last name" required />
                  </div>
                </div>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label>Email Address</label>
                    <input type="email" placeholder="Your email address" required />
                  </div>
                  <div className={styles.field}>
                    <label>Phone Number</label>
                    <input type="tel" placeholder="Your phone number" />
                  </div>
                </div>

                <div className={styles.field}>
                  <label>Preferred Contact Method</label>
                  <div className={styles.radioGroup}>
                    <label className={styles.radio}>
                      <input type="radio" name="contactMethod" value="email" defaultChecked />
                      <span>Email</span>
                    </label>
                    <label className={styles.radio}>
                      <input type="radio" name="contactMethod" value="phone" />
                      <span>Phone</span>
                    </label>
                    <label className={styles.radio}>
                      <input type="radio" name="contactMethod" value="instagram" />
                      <span>Instagram</span>
                    </label>
                  </div>
                </div>
                
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label>Where would you like to go?</label>
                    <input type="text" placeholder="Destination or region" required />
                  </div>
                </div>

                <div className={styles.field}>
                  <label>What can I book for you?</label>
                  <div className={styles.checkboxGroup}>
                    <label className={styles.checkbox}>
                      <input type="checkbox" name="interest" value="hotels" />
                      <span>Hotels & Resorts</span>
                    </label>
                    <label className={styles.checkbox}>
                      <input type="checkbox" name="interest" value="cruises" />
                      <span>Cruises</span>
                    </label>
                    <label className={styles.checkbox}>
                      <input type="checkbox" name="interest" value="tours" />
                      <span>Tours & Experiences</span>
                    </label>
                    <label className={styles.checkbox}>
                      <input type="checkbox" name="interest" value="transport" />
                      <span>Transportation</span>
                    </label>
                  </div>
                </div>

                <div className={styles.field}>
                  <label>Dream Details</label>
                  <textarea placeholder="Tell us more about your travel style, preferred dates, or specific vision..." rows={5} required></textarea>
                </div>
                
                <div className={styles.actions}>
                  <Button type="submit" variant="primary" size="lg" fullWidth disabled={!selectedTier}>
                    {selectedTier ? `Book ${selectedTier.charAt(0).toUpperCase() + selectedTier.slice(1)} Inquiry` : 'Select a Tier Above'}
                  </Button>
                </div>
              </form>
            )}
          </div>

          <div className={styles.contactDetails}>
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
              <div className={styles.contactCard}>
                <Calendar className={styles.icon} />
                <div className={styles.cardContent}>
                  <strong>Discovery Call</strong>
                  <span>Schedule via Calendly</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default ContactForm;
