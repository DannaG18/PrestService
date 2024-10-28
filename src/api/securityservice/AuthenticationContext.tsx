import React, { createContext, useContext, ReactNode, useState, useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { User, AuthenticationRequest, UserDto } from '../../models/security/SecurityModels';
import { authService } from './AuthenticationService';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  passwordErrors: string[];
  login: (credentials: AuthenticationRequest) => Promise<void>;
  logout: () => Promise<void>;
  register: (userData: UserDto) => Promise<void>;
  clearError: () => void;
  checkPasswordExpiration: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const ROLE_ROUTES = {
  ADMIN: {
    routes: [ "/approval-status-form", "/approval-status-view", "/branch-form", "/branch-view", "/city-form", "/city-view", "/company-form", "/company-view", "/company-service-form", "/company-service-view", "/company-type-form", "/company-type-view", "/country-form", "/country-view", "/document-type-form", "/document-type-view", "/email-person-form", "/email-person-view", "/email-type-form", "/email-type-view", "/order-detail-form", "/order-detail-view", '/supply-form', "/supply-view", '/admin-dashboard', '/person-form', "/person-view", "/person-supply-form", "/person-supply-view", "/person-type-form", "/person-type-view", "/phone-person-form", "/phone-person-view", "/phone-type-form", "/phone-type-view", "/region-form", "/region-view", "/service-approval-form", "/service-approval-view", "/service-order-form", "/service-order-view", "/service-service-form", "/service-service-view", "/service-supply-form", "/service-supply-view", "/status-order-form", "/status-order-view", "/status-service-order-form", "/status-service-order-view", "/supply-service-form", "/supply-service-view", "/work-order-detail-form", "/work-order-detail-view", "/work-order-form", "/work-order-view", ],
    default: '/admin-dashboard'
  },
  CUSTOMER: {
    routes: ['/','/customer-profile', '/change-password'],
    default: '/'
  },
  WAREHOUSE_MANAGER: {
    routes: ['/supply-view', '/supply-form', '/change-password', ],
    default: '/supply-form'
  },
  DEFAULT: {
    routes: ['/', '/change-password'],
    default: '/'
  }
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  const clearError = useCallback(() => {
    setError(null);
    setPasswordErrors([]);
  }, []);

  const redirectBasedOnRole = useCallback((user: User) => {
    const role = user.role?.name?.toUpperCase() || 'DEFAULT';
    const roleConfig = ROLE_ROUTES[role as keyof typeof ROLE_ROUTES] || ROLE_ROUTES.DEFAULT;
    
    const currentPath = location.pathname;
    const isAllowedPath = roleConfig.routes.includes(currentPath);
    
    if (!isAllowedPath) {
      navigate(roleConfig.default);
    }
  }, [navigate, location]);

  const checkAuth = useCallback(async () => {
    const token = localStorage.getItem('jwt');
    if (token) {
      try {
        const isValid = await authService.validateToken(token);
        if (isValid) {
          const profile = await authService.getProfile();
          setUser(profile);
          
          // Check password expiration
          const isExpired = await authService.checkPasswordExpiration();
          if (isExpired && location.pathname !== '/change-password') {
            navigate('/change-password');
          } else {
            redirectBasedOnRole(profile);
          }
        } else {
          localStorage.removeItem('jwt');
          navigate('/');
        }
      } catch (err) {
        localStorage.removeItem('jwt');
        setError('Session expired');
        navigate('/');
      }
    }
    setLoading(false);
  }, [navigate, redirectBasedOnRole, location.pathname]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (user && !loading) {
      redirectBasedOnRole(user);
    }
  }, [location.pathname, user, loading, redirectBasedOnRole]);

  const login = useCallback(async (credentials: AuthenticationRequest) => {
    setLoading(true);
    clearError();

    try {
      await authService.login(credentials);
      const profile = await authService.getProfile();
      setUser(profile);
      redirectBasedOnRole(profile);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [clearError, redirectBasedOnRole]);

  const logout = useCallback(async () => {
    setLoading(true);
    clearError();
    try {
      await authService.logout();
      setUser(null);
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Logout failed');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [clearError, navigate]);

  const register = useCallback(async (userData: UserDto) => {
    setLoading(true);
    clearError();
    try {
      await authService.registerCustomer(userData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [clearError]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        passwordErrors,
        login,
        logout,
        register,
        clearError,
        checkPasswordExpiration: authService.checkPasswordExpiration
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};