/**
 * Admin API Client
 * Standalone axios instance for admin frontend
 * Uses Authorization header (not cookies)
 */

import axios from 'axios';

/**
 * Get Backend API URL
 * Priority:
 * 1. NEXT_PUBLIC_API_URL environment variable (for production/Vercel)
 * 2. window.location.hostname:3001 (for local network access)
 * 3. localhost:3001 (fallback)
 */
function getBackendUrl(): string {
  // 1. Check environment variable first (for production/deployment)
  // This should be set in Vercel: API_BASE_URL or NEXT_PUBLIC_API_URL
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }

  // 2. For browser/client-side: use window.location.hostname for network access
  // This allows mobile devices on the same network to connect
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    // Backend always runs on port 3001
    return `http://${hostname}:3001`;
  }

  // 3. Fallback for server-side rendering
  return 'http://localhost:3001';
}

const API_URL = getBackendUrl();

// Log API URL in development for debugging
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  console.log('🔵 Admin API Configuration:');
  console.log('  Base URL:', API_URL);
  console.log('  Admin Endpoint:', `${API_URL}/admin`);
  console.log('  Frontend Origin:', window.location.origin);
}

// Create axios instance for admin API
// CRITICAL: Admin frontend uses /admin/* endpoints, completely separate from user /auth/* endpoints
const adminApi = axios.create({
  baseURL: `${API_URL}/admin`, // Admin endpoints: /admin/auth/login, /admin/dashboard, etc.
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Important for CORS
});

// Request interceptor: Add Authorization header from localStorage
adminApi.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('admin_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: Handle 401 errors
adminApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token and redirect to login
      if (typeof window !== 'undefined') {
        localStorage.removeItem('admin_token');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default adminApi;

