import React, { createContext, useContext, ReactNode, useState, useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { User, AuthenticationRequest, UserDto } from '../../models/security/SecurityModels';
import { authService } from './AuthenticationService';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (credentials: AuthenticationRequest) => Promise<void>;
  logout: () => Promise<void>;
  register: (userData: UserDto) => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define role-based routes with default routes for each role
export const ROLE_ROUTES = {
  ADMIN: {
    routes: ['/supply-form', '/admin-dashboard', '/users-management'],
    default: '/admin-dashboard'
  },
  CUSTOMER: {
    routes: ['/supply-form', '/supply-view', '/customer-profile'],
    default: '/supply-form'
  },
  MANAGER: {
    routes: ['/manager-dashboard', '/reports', '/team-management'],
    default: '/manager-dashboard'
  },
  DEFAULT: {
    routes: ['/home'],
    default: '/home'
  }
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const clearError = useCallback(() => setError(null), []);

  const redirectBasedOnRole = useCallback((user: User) => {
    const role = user.role?.name?.toUpperCase() || 'DEFAULT';
    const roleConfig = ROLE_ROUTES[role as keyof typeof ROLE_ROUTES] || ROLE_ROUTES.DEFAULT;
    
    // Check if current path is allowed for user's role
    const currentPath = location.pathname;
    const isAllowedPath = roleConfig.routes.includes(currentPath);
    
    // If current path is not allowed, redirect to role's default route
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
          redirectBasedOnRole(profile);
        } else {
          localStorage.removeItem('jwt');
          navigate('/login');
        }
      } catch (err) {
        localStorage.removeItem('jwt');
        setError('Session expired');
        navigate('/login');
      }
    }
    setLoading(false);
  }, [navigate, redirectBasedOnRole]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Effect to verify route access when location changes
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
      setError(err instanceof Error ? err.message : 'Login failed');
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
        login,
        logout,
        register,
        clearError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};