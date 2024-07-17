import axios from 'axios';
import { getToken } from './services/authService';

export const API_URL = 'http://localhost:5000';

export const instance = axios.create({
  baseURL: `${API_URL}/api`,
});

instance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});
