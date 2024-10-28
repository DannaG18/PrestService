export interface PasswordValidationResult {
    isValid: boolean;
    errors: string[];
  }
  
  export interface PasswordStrength {
    score: number; // 0-4
    feedback: string;
  }
  
  export const validatePassword = (password: string): PasswordValidationResult => {
    const errors: string[] = [];
    const MIN_PASSWORD_LENGTH = 8;
  
    if (password.length < MIN_PASSWORD_LENGTH) {
      errors.push(`Password must be at least ${MIN_PASSWORD_LENGTH} characters long`);
    }
  
    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }
  
    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }
  
    if (!/\d/.test(password)) {
      errors.push('Password must contain at least one number');
    }
  
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('Password must contain at least one special character');
    }
  
    // Check for common patterns
    const commonPatterns = [
      '123456', 'password', 'qwerty', 'admin123',
      new Date().getFullYear().toString()
    ];
    
    if (commonPatterns.some(pattern => password.toLowerCase().includes(pattern))) {
      errors.push('Password contains common patterns that are easily guessable');
    }
  
    return {
      isValid: errors.length === 0,
      errors
    };
  };
  
  export const getPasswordStrength = (password: string): PasswordStrength => {
    let score = 0;
    let feedback = 'Very Weak';
  
    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;
  
    switch (score) {
      case 1:
        feedback = 'Weak';
        break;
      case 2:
        feedback = 'Fair';
        break;
      case 3:
        feedback = 'Good';
        break;
      case 4:
        feedback = 'Strong';
        break;
      case 5:
        feedback = 'Very Strong';
        break;
    }
  
    return { score, feedback };
  };