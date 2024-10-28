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
      const token = localStorage.getItem('jwt');
      if (token) {
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
        // You might want to trigger a logout action or redirect here
      }
      return Promise.reject(error);
    }
  );

  return api;
};

export const api = createApiInstance();