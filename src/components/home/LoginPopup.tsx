import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useAuth } from '../../api/securityservice/AuthenticationContext';
import styles from '../../styles/LoginPopup.module.css';
import SignupPopup from './CreateAccount';
import { AuthenticationRequest } from '../../models/security/SecurityModels';
import { getPasswordStrength } from '../../api/securityservice/PasswordUtils';

interface LoginPopupProps {
  onClose: () => void;
}

const LoginPopup: React.FC<LoginPopupProps> = ({ onClose }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<string>('');
  const { login, error, clearError } = useAuth();

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    if (newPassword) {
      const strength = getPasswordStrength(newPassword);
      setPasswordStrength(strength.feedback);
    } else {
      setPasswordStrength('');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    clearError();

    try {
      const credentials: AuthenticationRequest = {
        username,
        password
      };
      await login(credentials);
      onClose();
    } catch (err) {
      console.error('Login failed:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.popup} onClick={e => e.stopPropagation()}>
        {isSignup ? (
          <SignupPopup onClose={onClose} onBack={() => setIsSignup(false)} />
        ) : (
          <>
            <div className={styles.header}>
              <button onClick={onClose} className={styles.closeButton}>
                <X size={24} />
              </button>
            </div>

            <div className={styles.content}>
              <h2 className={styles.title}>Login or Sign Up</h2>
              
              {error && (
                <div className={styles.error}>
                  {error}
                </div>
              )}
              <form className={styles.form} onSubmit={handleLogin}>
                <input
                  type="email"
                  placeholder="Email"
                  className={styles.input}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  autoComplete="email" // Added autocomplete attribute
                />
                <div className={styles.passwordContainer}>
                  <input
                    type="password"
                    placeholder="Password"
                    className={styles.input}
                    value={password}
                    onChange={handlePasswordChange}
                    required
                    autoComplete="new-password" // Added autocomplete attribute
                  />
                  {passwordStrength && (
                    <div className={`${styles.strengthIndicator} ${styles[passwordStrength.toLowerCase().replace(' ', '')]}`}>
                      {passwordStrength}
                    </div>
                  )}
                </div>
                <button 
                  type="submit" 
                  className={styles.submitButton}
                  disabled={isLoading}
                >
                  {isLoading ? 'Logging in...' : 'Login'}
                </button>
              </form>

              <div className={styles.footer}>
                <a href="#" className={styles.link}>
                  Forgot Password?
                </a>
                <p className={styles.text}>
                  Don't have an account?{' '}
                  <button 
                    onClick={() => setIsSignup(true)} 
                    className={styles.link}
                    type="button"
                  >
                    Create an Account
                  </button>
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginPopup;