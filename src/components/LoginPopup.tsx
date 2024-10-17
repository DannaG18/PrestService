import React from 'react';
import { X, Facebook, Apple, Mail } from 'lucide-react';
import styles from '../styles/LoginPopup.module.css';

interface LoginPopupProps {
  onClose: () => void;
}

const LoginPopup: React.FC<LoginPopupProps> = ({ onClose }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <div className="flex justify-end p-2">
          <button
            onClick={onClose}
            className={styles.closeButton}
          >
            <X size={24} />
          </button>
        </div>
        <div className={styles.content}>
          <h2 className={styles.title}>Login or Sign Up</h2>
          <div className={styles.buttonContainer}>
            <button className={`${styles.button} ${styles.facebookButton}`}>
              <Facebook size={20} />
              Continue with Facebook
            </button>
            <button className={`${styles.button} ${styles.appleButton}`}>
              <Apple size={20} />
              Continue with Apple
            </button>
            <button className={`${styles.button} ${styles.googleButton}`}>
              <Mail size={20} />
              Continue with Google
            </button>
          </div>
          <div className={styles.divider}>
            <div className={styles.dividerLine}></div>
            <span className={styles.dividerText}>or</span>
            <div className={styles.dividerLine}></div>
          </div>
          <form className={styles.form}>
            <input
              type="email"
              placeholder="Email"
              className={styles.input}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className={styles.input}
              required
            />
            <button
              type="submit"
              className={styles.submitButton}
            >
              Login
            </button>
          </form>
          <div className={styles.footer}>
            <a href="#" className={styles.link}>
              Forgot Password?
            </a>
            <p className={styles.text}>
              Don't have an account?{' '}
              <a href="#" className={styles.link}>
                Create an Account
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPopup;