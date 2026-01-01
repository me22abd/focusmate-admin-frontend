'use client';

import AdminGuard from '@/components/AdminGuard';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminGuard>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto bg-slate-50">
            {children}
          </main>
        </div>
      </div>
    </AdminGuard>
  );
}








