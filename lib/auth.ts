/**
 * Admin Authentication Utilities
 * Manages admin token in localStorage
 */

import type { Admin, AdminLoginResponse } from '@/types';
import adminApi from './api';

const ADMIN_TOKEN_KEY = 'admin_token';
const ADMIN_USER_KEY = 'admin_user';

export const authService = {
  /**
   * Login with email and password
   */
  async login(email: string, password: string): Promise<AdminLoginResponse> {
    const response = await adminApi.post<AdminLoginResponse>('/auth/login', {
      email,
      password,
    });

    // Store token and admin info
    if (response.data.access_token) {
      localStorage.setItem(ADMIN_TOKEN_KEY, response.data.access_token);
      localStorage.setItem(ADMIN_USER_KEY, JSON.stringify(response.data.admin));
    }

    return response.data;
  },

  /**
   * Logout - clear token and admin info
   */
  logout(): void {
    localStorage.removeItem(ADMIN_TOKEN_KEY);
    localStorage.removeItem(ADMIN_USER_KEY);
  },

  /**
   * Get stored admin token
   */
  getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(ADMIN_TOKEN_KEY);
  },

  /**
   * Get stored admin user
   */
  getAdmin(): Admin | null {
    if (typeof window === 'undefined') return null;
    const adminStr = localStorage.getItem(ADMIN_USER_KEY);
    if (!adminStr) return null;
    try {
      return JSON.parse(adminStr) as Admin;
    } catch {
      return null;
    }
  },

  /**
   * Check if admin is authenticated
   */
  isAuthenticated(): boolean {
    return !!this.getToken();
  },

  /**
   * Verify token by making API call
   */
  async verifyToken(): Promise<boolean> {
    try {
      await adminApi.get('/dashboard');
      return true;
    } catch {
      return false;
    }
  },
};


