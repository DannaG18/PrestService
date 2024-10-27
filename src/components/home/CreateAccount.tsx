import React, { useState, useEffect } from 'react';
import { X, Facebook, Apple, Mail, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../api/securityservice/AuthenticationContext';
import { UserDto } from '../../models/security/SecurityModels';
import styles from '../../styles/LoginPopup.module.css';
import { useNavigate } from 'react-router-dom';

interface SignupPopupProps {
  onBack: () => void;
  onClose: () => void;
}
const SignupPopup: React.FC<SignupPopupProps> = ({ onClose, onBack }) => {
  const navigate = useNavigate();
  const { register, loading, error, clearError, user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    repeatedPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) clearError();
    if (formError) setFormError(null);
  };

  const validateForm = (): boolean => {
    if (!formData.name || formData.name.length < 4) {
      setFormError('Name must be at least 4 characters long');
      return false;
    }
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setFormError('Please enter a valid email address');
      return false;
    }
    if (!formData.password || formData.password.length < 8) {
      setFormError('Password must be at least 8 characters long');
      return false;
    }
    if (formData.password !== formData.repeatedPassword) {
      setFormError('Passwords do not match');
      return false;
    }
    if (!termsAccepted) {
      setFormError('Please accept the Terms of Service and Privacy Policy');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      const userData: UserDto = {
        name: formData.name,
        username: formData.email,
        password: formData.password,
        repeatedPassword: formData.repeatedPassword
      };

      await register(userData);

      setFormData({
        name: '',
        email: '',
        password: '',
        repeatedPassword: ''
      });

      setTermsAccepted(false);  
      setFormError(null);       // Clear any remaining form errors
    } catch (err: any) {
      if (err.response && err.response.status === 409) {
        setFormError("This email is already registered"); 
      } else {
        console.error('Registration failed:', err);
      }
    }
  };


  const handleSocialSignup = (provider: 'facebook' | 'apple' | 'google') => {
    console.log(`${provider} signup clicked`);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
      <div className={styles.header}>
        <button onClick={onBack} className={styles.backButton}>
          <ArrowLeft size={24} />
        </button>
        <button onClick={onClose} className={styles.closeButton}>
            <X size={24} />
          </button>
      </div>
        
        <div className={styles.content}>
          <h2 className={styles.title}>Create Account</h2>
          
          <div className={styles.buttonContainer}>
            <button 
              className={`${styles.button} ${styles.facebookButton}`}
              onClick={() => handleSocialSignup('facebook')}
            >
              <Facebook size={20} />
              Sign up with Facebook
            </button>
            <button 
              className={`${styles.button} ${styles.appleButton}`}
              onClick={() => handleSocialSignup('apple')}
            >
              <Apple size={20} />
              Sign up with Apple
            </button>
            <button 
              className={`${styles.button} ${styles.googleButton}`}
              onClick={() => handleSocialSignup('google')}
            >
              <Mail size={20} />
              Sign up with Google
            </button>
          </div>

          <div className={styles.divider}>
            <span className={styles.dividerText}>or sign up with email</span>
          </div>

          {(error || formError) && (
            <div className={styles.errorMessage}>
              {error || formError}
            </div>
          )}

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className={styles.input}
                value={formData.name}
                onChange={handleInputChange}
                required
                minLength={4}
              />
            </div>
            <div className={styles.inputGroup}>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                className={styles.input}
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className={styles.input}
                value={formData.password}
                onChange={handleInputChange}
                required
                minLength={8}
              />
            </div>
            <div className={styles.inputGroup}>
              <input
                type="password"
                name="repeatedPassword"
                placeholder="Confirm Password"
                className={styles.input}
                value={formData.repeatedPassword}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={styles.terms}>
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  required
                />
                <span>I agree to the Terms of Service and Privacy Policy</span>
              </label>
            </div>
            <button
              type="submit"
              className={`${styles.submitButton} ${loading ? styles.loading : ''}`}
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPopup;