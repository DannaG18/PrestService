import axios, { AxiosError, AxiosInstance } from 'axios';
import { ApiError } from '../../models/security/SecurityModels';

export const createApiInstance = (): AxiosInstance => {
  const api = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  // Request interceptor for JWT
  api.interceptors.request.use(
    (config) => {
      const encryptedToken = localStorage.getItem('jwt');
      if (encryptedToken) {
        const token = decryptToken(encryptedToken);
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor for error handling
  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<ApiError>) => {
      if (error.response?.status === 401) {
        localStorage.removeItem('jwt');
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );

  return api;
};

// Updated token encryption/decryption functions using browser-compatible methods
export const encryptToken = (token: string): string => {
  // Using btoa for base64 encoding in the browser
  try {
    return btoa(token);
  } catch (error) {
    // Handle non-ASCII characters if present
    return btoa(encodeURIComponent(token));
  }
};

export const decryptToken = (encryptedToken: string): string => {
  try {
    // Using atob for base64 decoding in the browser
    return atob(encryptedToken);
  } catch (error) {
    // Handle non-ASCII characters if present
    return decodeURIComponent(atob(encryptedToken));
  }
};

export const api = createApiInstance();