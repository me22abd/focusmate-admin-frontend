'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Calendar,
  BarChart3,
  Award,
  Bell,
  LogOut,
  Shield,
  Settings,
} from 'lucide-react';
import { authService } from '@/lib/auth';
import { clsx } from 'clsx';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Users', href: '/users', icon: Users },
  { name: 'Sessions', href: '/sessions', icon: Calendar },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Achievements', href: '/achievements', icon: Award },
  { name: 'Notifications', href: '/notifications', icon: Bell },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const admin = authService.getAdmin();

  const handleLogout = () => {
    authService.logout();
    router.push('/login');
  };

  return (
    <div className="flex flex-col h-screen w-64 bg-slate-900 text-white">
      <div className="flex items-center gap-2 p-6 border-b border-slate-800">
        <Shield className="h-6 w-6" />
        <h1 className="text-xl font-bold">FocusMate Admin</h1>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={clsx(
                'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="px-4 py-2 mb-2">
          <p className="text-sm font-medium">{admin?.name || 'Admin'}</p>
          <p className="text-xs text-slate-400">{admin?.email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}








