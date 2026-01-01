'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/Card';
import { adminApiService } from '@/lib/admin-api';
import { authService } from '@/lib/auth';
import type { SystemHealth, Admin } from '@/types';
import { Settings, Mail, Server, User, Bell, Shield, CheckCircle2, XCircle } from 'lucide-react';

export default function SettingsPage() {
  const [health, setHealth] = useState<SystemHealth | null>(null);
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [healthData, adminData] = await Promise.all([
          adminApiService.getSystemHealth(),
          Promise.resolve(authService.getAdmin()),
        ]);
        setHealth(healthData);
        setAdmin(adminData);
      } catch (error) {
        console.error('Failed to load settings data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="p-8">
        <div className="text-center">Loading settings...</div>
      </div>
    );
  }

  const isDbHealthy = health?.dbStatus === 'connected' || health?.database === 'ok';

  return (
    <div className="p-8 space-y-6">
      <div className="mb-6">
        <p className="text-muted-foreground">Manage app configuration and system settings</p>
      </div>

      {/* Admin Profile */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <User className="h-5 w-5" />
            <CardTitle>Admin Profile</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">Name</label>
            <p className="text-sm text-muted-foreground mt-1">{admin?.name || 'N/A'}</p>
          </div>
          <div>
            <label className="text-sm font-medium">Email</label>
            <p className="text-sm text-muted-foreground mt-1">{admin?.email || 'N/A'}</p>
          </div>
          <div>
            <label className="text-sm font-medium">Role</label>
            <p className="text-sm text-muted-foreground mt-1">
              <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs">
                {admin?.role || 'admin'}
              </span>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* System Health */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Server className="h-5 w-5" />
            <CardTitle>System Health</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Server Status</span>
            <div className="flex items-center gap-2">
              {health?.server === 'ok' ? (
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
              <span className="text-sm">{health?.server || 'unknown'}</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Database Status</span>
            <div className="flex items-center gap-2">
              {isDbHealthy ? (
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
              <span className="text-sm">{health?.database || health?.dbStatus || 'unknown'}</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Uptime</span>
            <span className="text-sm">
              {health?.uptime ? `${Math.floor(health.uptime / 60)} minutes` : 'N/A'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Version</span>
            <span className="text-sm">{health?.version || 'N/A'}</span>
          </div>
        </CardContent>
      </Card>

      {/* Email Service */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            <CardTitle>Email Service</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Status</span>
            <span className="text-sm text-muted-foreground">Configured</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Provider</span>
            <span className="text-sm text-muted-foreground">SMTP (Gmail)</span>
          </div>
          <div className="pt-2">
            <p className="text-xs text-muted-foreground">
              Email service is configured via environment variables. Check backend .env for EMAIL_* settings.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* App Configuration */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            <CardTitle>App Configuration</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">API URL</span>
            <span className="text-sm font-mono text-muted-foreground">
              {process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Environment</span>
            <span className="text-sm text-muted-foreground">Development</span>
          </div>
        </CardContent>
      </Card>

      {/* Notifications Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            <CardTitle>Notifications Settings</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Email Notifications</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">System Alerts</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}








