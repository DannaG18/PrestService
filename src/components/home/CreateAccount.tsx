import React, { useState, useEffect } from 'react';
import { X, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../api/securityservice/AuthenticationContext';
import { UserDto } from '../../models/security/SecurityModels';
import styles from '../../styles/LoginPopup.module.css';
import { useNavigate } from 'react-router-dom';
import { validatePassword, getPasswordStrength } from '../../api/securityservice/PasswordUtils';

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

  // New states for password validation and visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatedPassword, setShowRepeatedPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<string>('');
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  // Updated input handler with password validation
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'password') {
      const validation = validatePassword(value);
      setPasswordErrors(validation.errors);
      const strength = getPasswordStrength(value);
      setPasswordStrength(strength.feedback);
    }

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

    // Enhanced password validation
    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      setFormError(passwordValidation.errors[0]);
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
      setPasswordErrors([]);
      setPasswordStrength('');
      setFormError(null);
    } catch (err: any) {
      if (err.response && err.response.status === 409) {
        setFormError("This email is already registered"); 
      } else {
        console.error('Registration failed:', err);
      }
    }
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
              <div className={styles.passwordInput}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Password"
                  className={styles.input}
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  minLength={12}
                />
                <button
                  type="button"
                  className={styles.togglePassword}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {/* New password strength and requirements display */}
              {passwordStrength && (
                <div className={`${styles.strengthIndicator} ${styles[passwordStrength.toLowerCase().replace(' ', '')]}`}>
                  {passwordStrength}
                </div>
              )}
              {passwordErrors.length > 0 && (
                <div className={styles.passwordRequirements}>
                  {passwordErrors.map((error, index) => (
                    <div key={index} className={styles.requirement}>
                      {error}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className={styles.inputGroup}>
              <div className={styles.passwordInput}>
                <input
                  type={showRepeatedPassword ? 'text' : 'password'}
                  name="repeatedPassword"
                  placeholder="Confirm Password"
                  className={styles.input}
                  value={formData.repeatedPassword}
                  onChange={handleInputChange}
                  required
                />
                <button
                  type="button"
                  className={styles.togglePassword}
                  onClick={() => setShowRepeatedPassword(!showRepeatedPassword)}
                >
                  {showRepeatedPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
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
              disabled={loading || passwordErrors.length > 0}
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