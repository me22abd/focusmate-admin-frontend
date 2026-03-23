'use client';

import { useState } from 'react';
import AdminGuard from '@/components/AdminGuard';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AdminGuard>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-blue-50/30">
        <div className="flex min-h-screen">
          {/* Desktop sidebar */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <Sidebar />
          </div>

          <div className="flex-1 flex flex-col overflow-hidden">
            <Header onOpenSidebar={() => setSidebarOpen(true)} />
            <main className="flex-1 overflow-y-auto">{children}</main>
          </div>
        </div>

        {/* Mobile sidebar drawer */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div
              className="absolute inset-0 bg-black/30"
              onClick={() => setSidebarOpen(false)}
              aria-hidden="true"
            />
            <div className="absolute left-0 top-0 h-full">
              <Sidebar onNavigate={() => setSidebarOpen(false)} />
            </div>
          </div>
        )}
      </div>
    </AdminGuard>
  );
}










