'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ArrowLeft, Home } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  // Don't show header on login page
  if (pathname === '/login') {
    return null;
  }

  // Get page title based on pathname
  const getPageTitle = () => {
    if (pathname === '/dashboard') return 'Dashboard';
    if (pathname === '/users') return 'Users Management';
    if (pathname === '/sessions') return 'Sessions Management';
    if (pathname === '/analytics') return 'Analytics';
    if (pathname === '/achievements') return 'Achievements';
    if (pathname === '/notifications') return 'Notifications';
    if (pathname === '/settings') return 'Settings';
    return 'Admin Panel';
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <header className="sticky top-0 z-10 bg-white border-b border-slate-200 shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          {/* Back Button - Icon only */}
          <button
            onClick={handleBack}
            className="flex items-center justify-center w-10 h-10 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 transition-colors"
            title="Go back"
          >
            <ArrowLeft className="h-5 w-5 text-slate-700" />
          </button>
          
          <h1 className="text-2xl font-bold text-slate-900">{getPageTitle()}</h1>
        </div>
        
        {/* Home Button - Icon only */}
        <Link href="/dashboard">
          <button
            className="flex items-center justify-center w-10 h-10 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 transition-colors"
            title="Go to dashboard"
          >
            <Home className="h-5 w-5 text-slate-700" />
          </button>
        </Link>
      </div>
    </header>
  );
}








