import axios from 'axios';

// Centralized base URL (uses env variable or defaults to localhost)
const API_BASE_URL = process.env.BACKEND_URL || 'http://localhost:5000';

// Create an Axios instance with the base URL
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Add interceptors for global error handling or token refresh
// Example: Automatically add JWT token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: Handle responses globally (e.g., for 401 errors, logout user)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized (e.g., token expired)
      localStorage.removeItem('token');
      window.location.reload();  // Or redirect to login
    }
    return Promise.reject(error);
  }
);

export default api;