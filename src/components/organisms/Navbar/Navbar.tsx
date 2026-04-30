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
    !isHome ? 'not-home' : ''
  ].join(' ');

  return (
    <nav className={navbarClasses}>
      <Container className={styles.container}>
        <div className={styles.logo}>
          <Link href="/">
            BRYSON <span>ADAMS</span>
          </Link>
        </div>
        
        <div className={styles.links}>
          <Link href="/about">About</Link>
          <Link href="/services">Services</Link>
          <Link href="/destinations">Destinations</Link>
          <Link href="/contact">
            <Button variant="outline" size="sm">Book Now</Button>
          </Link>
        </div>

        <button 
          className={styles.mobileToggle} 
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <MobileMenu 
          isOpen={isMobileMenuOpen} 
          onClose={() => setIsMobileMenuOpen(false)} 
        />
      </Container>
    </nav>
  );
};

export default Navbar;
