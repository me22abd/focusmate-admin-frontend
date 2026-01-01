'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/lib/auth';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to dashboard if authenticated, otherwise to login
    if (authService.isAuthenticated()) {
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">Redirecting...</div>
    </div>
  );
}








