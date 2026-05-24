'use client';

import React, { useState, useEffect } from 'react';
import styles from './Navbar.module.scss';
import Container from '../../atoms/Container/Container';
import Button from '../../atoms/Button/Button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import MobileMenu from '../../molecules/MobileMenu/MobileMenu';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navbarClasses = [
    styles.navbar,
    isScrolled ? 'scrolled' : '',
    !isHome ? 'not-home' : '',
    isMobileMenuOpen ? styles.menuOpen : ''
  ].join(' ');

  return (
    <>
      <nav className={navbarClasses}>
        <Container className={styles.container}>
          <div className={styles.logo}>
            <Link href="/" className={styles.logoWrapper}>
              <img src="/assets/logo-mark.svg" alt="Travel by Bryson" className={styles.logoIcon} />
              <div className={styles.logoText}>
                TRAVEL BY <span>BRYSON</span>
              </div>
            </Link>
          </div>
          
          <div className={styles.links}>
            <Link href="/about">About</Link>
            <Link href="/destinations">Destinations</Link>
            <Link href="/travel-ideas">Travel Ideas</Link>
            <Button variant="outline" size="sm" href="/contact">Contact</Button>
          </div>

          <button 
            className={`${styles.mobileToggle} ${isMobileMenuOpen ? styles.isOpen : ''}`} 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </Container>
      </nav>

      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
        key="mobile-menu-drawer"
      />
    </>
  );
};

export default Navbar;
