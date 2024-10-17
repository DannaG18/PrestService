import React from 'react';
import { Mail, Phone, Facebook, Twitter, Instagram } from 'lucide-react';
import styles from '../styles/Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.contactInfo}>
            <h3>Contact Us</h3>
            <p><Mail size={16} /> info@prestservice.com</p>
            <p><Phone size={16} /> +1 (555) 123-4567</p>
          </div>
          <div className={styles.socialMedia}>
            <h3>Follow Us</h3>
            <div className={styles.socialIcons}>
              <a href="#"><Facebook /></a>
              <a href="#"><Twitter /></a>
              <a href="#"><Instagram /></a>
            </div>
          </div>
          <div className={styles.links}>
            <h3>Quick Links</h3>
            <a href="#">Terms of Service</a>
            <a href="#">Privacy Policy</a>
            <a href="#">FAQ</a>
          </div>
        </div>
        <div className={styles.copyright}>
          © 2023 PrestService. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;