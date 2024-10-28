import React, { useState } from 'react';
import { X, Facebook, Apple, Mail } from 'lucide-react';
import { useAuth } from '../../api/securityservice/AuthenticationContext';
import styles from '../../styles/LoginPopup.module.css';
import SignupPopup from './CreateAccount';
import { AuthenticationRequest } from '../../models/security/SecurityModels';

interface LoginPopupProps {
  onClose: () => void;
}

const LoginPopup: React.FC<LoginPopupProps> = ({ onClose }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, error, clearError } = useAuth();

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

  const handleSocialLogin = (provider: string) => {
    console.log(`${provider} login clicked`);
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

              <div className={styles.buttonContainer}>
                {/* Social login buttons remain the same */}
                <button 
                  className={`${styles.button} ${styles.facebookButton}`}
                  onClick={() => handleSocialLogin('Facebook')}
                  type="button"
                >
                  <Facebook size={20} />
                  Continue with Facebook
                </button>
                <button 
                  className={`${styles.button} ${styles.appleButton}`}
                  onClick={() => handleSocialLogin('Apple')}
                  type="button"
                >
                  <Apple size={20} />
                  Continue with Apple
                </button>
                <button 
                  className={`${styles.button} ${styles.googleButton}`}
                  onClick={() => handleSocialLogin('Google')}
                  type="button"
                >
                  <Mail size={20} />
                  Continue with Google
                </button>
              </div>

              <div className={styles.divider}>
                <div className={styles.dividerLine}></div>
                <span className={styles.dividerText}>or</span>
                <div className={styles.dividerLine}></div>
              </div>

              <form className={styles.form} onSubmit={handleLogin}>
                <input
                  type="email"
                  placeholder="Email"
                  className={styles.input}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  className={styles.input}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
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