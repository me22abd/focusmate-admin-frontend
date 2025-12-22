/**
 * Admin API Service
 * All admin API endpoints
 */

import adminApi from './api';
import type {
  DashboardStats,
  SystemHealth,
  User,
  Admin,
  AdminLog,
  Session,
  Notification,
  Achievement,
} from '@/types';

export const adminApiService = {
  // Dashboard
  async getDashboardStats(): Promise<DashboardStats> {
    const response = await adminApi.get<DashboardStats>('/dashboard');
    return response.data;
  },

  async getSystemHealth(): Promise<SystemHealth> {
    const response = await adminApi.get<SystemHealth>('/system-health');
    return response.data;
  },

  // Users
  async getAllUsers(): Promise<User[]> {
    const response = await adminApi.get<User[]>('/users');
    return response.data;
  },

  async getUserDetails(userId: string): Promise<User> {
    const response = await adminApi.get<User>(`/users/${userId}/details`);
    return response.data;
  },

  async suspendUser(userId: string, adminId: string): Promise<{ message: string }> {
    const response = await adminApi.patch<{ message: string }>(
      `/users/${userId}/suspend`,
      { adminId }
    );
    return response.data;
  },

  async deleteUser(userId: string, adminId: string): Promise<{ message: string }> {
    const response = await adminApi.delete<{ message: string }>(`/users/${userId}`, {
      data: { adminId },
    });
    return response.data;
  },

  // Analytics
  async getAnalytics(): Promise<any> {
    const response = await adminApi.get('/analytics');
    return response.data;
  },

  // Sessions
  async getAllSessions(limit = 100, status?: string): Promise<Session[]> {
    const params = new URLSearchParams();
    if (limit) params.append('limit', limit.toString());
    if (status) params.append('status', status);
    const query = params.toString();
    const response = await adminApi.get<Session[]>(`/sessions${query ? `?${query}` : ''}`);
    return response.data;
  },

  // Admins
  async getAllAdmins(): Promise<Admin[]> {
    const response = await adminApi.get<Admin[]>('/admins');
    return response.data;
  },

  // Logs
  async getAdminLogs(limit = 20): Promise<{ success: boolean; count: number; logs: AdminLog[] }> {
    const response = await adminApi.get<{ success: boolean; count: number; logs: AdminLog[] }>(
      `/logs?limit=${limit}`
    );
    return response.data;
  },

  // Notifications
  async getAllNotifications(): Promise<Notification[]> {
    const response = await adminApi.get<Notification[]>('/notifications');
    return response.data;
  },

  // Achievements
  async getAllAchievements(): Promise<Achievement[]> {
    const response = await adminApi.get<Achievement[]>('/achievements');
    return response.data;
  },
};

