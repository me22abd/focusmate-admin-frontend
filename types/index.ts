export interface Admin {
  id: string;
  name: string;
  email: string;
  role: 'admin';
  createdAt: string;
  updatedAt: string;
}

export interface AdminLoginResponse {
  access_token: string;
  admin: Admin;
}

export interface DashboardStats {
  totalUsers: number;
  activeUsersToday: number;
  sessionsToday: number;
  totalSessions: number;
  newUsersThisWeek: number;
  userRetentionRate?: number;
}

export interface AnalyticsData {
  success: boolean;
  summary: {
    totalUsers: number;
    active: number;
    suspended: number;
    recentLogins: number;
  };
  weeklySignups: Array<{ date: string; count: number }>;
  roleDistribution: Array<{ role: string; count: number }>;
}

export interface SystemHealth {
  server: string;
  database: string;
  uptime: number;
  version: string;
  dbStatus?: string;
  timestamp?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  avatarUrl?: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  role: string;
  suspended: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Session {
  id: string;
  userId: string;
  partnerId?: string;
  status: string;
  duration?: number;
  startedAt: string;
  endedAt?: string;
  createdAt: string;
}

export interface AdminLog {
  id: string;
  adminId: string;
  action: string;
  targetType: string;
  targetId: string;
  details: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon?: string;
  condition: Record<string, any>;
  points: number;
}


