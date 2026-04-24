'use client';

import React, { useState } from 'react';
import styles from './ContactForm.module.scss';
import Container from '../../atoms/Container/Container';
import Section from '../../atoms/Section/Section';
import Button from '../../atoms/Button/Button';

const ContactForm: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <Section variant="white" padding="xl">
      <Container>
        <div className={styles.wrapper}>
          <div className={styles.info}>
            <span className={styles.subtitle}>Get In Touch</span>
            <h2 className={styles.title}>Let&apos;s Plan Your Next Vision</h2>
            <p>
              Fill out the form below or schedule a direct discovery call. 
              We look forward to hearing from you.
            </p>
            <div className={styles.contactDetails}>
              <div className={styles.detail}>
                <strong>Email</strong>
                <a href="mailto:hello@brysonadams.travel">hello@brysonadams.travel</a>
              </div>
              <div className={styles.detail}>
                <strong>Instagram</strong>
                <a href="https://instagram.com/brysonadams" target="_blank" rel="noreferrer">@brysonadams</a>
              </div>
            </div>
          </div>
          
          <div className={styles.formWrapper}>
            {isSubmitted ? (
              <div className={styles.success}>
                <h3>Inquiry Sent</h3>
                <p>Thank you for reaching out. We will get back to you within 1-2 business days to begin planning your journey.</p>
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
                <div className={styles.field}>
                  <label>Email Address</label>
                  <input type="email" placeholder="Your email address" required />
                </div>
                <div className={styles.field}>
                  <label>What are you dreaming of?</label>
                  <textarea placeholder="Tell us about your next trip..." rows={5} required></textarea>
                </div>
                <Button type="submit" variant="primary" size="lg" fullWidth>Send Inquiry</Button>
              </form>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default ContactForm;
