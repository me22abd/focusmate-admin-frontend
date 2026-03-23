'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { authService } from '@/lib/auth';

interface AdminGuardProps {
  children: React.ReactNode;
}

/**
 * AdminGuard - Protects admin routes
 * Redirects to login if not authenticated
 */
export default function AdminGuard({ children }: AdminGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      // Allow access to login page
      if (pathname === '/login') {
        setIsLoading(false);
        return;
      }

      // Check if token exists
      if (!authService.isAuthenticated()) {
        router.push('/login');
        return;
      }

      // Verify token is valid
      const isValid = await authService.verifyToken();
      if (!isValid) {
        authService.logout();
        router.push('/login');
        return;
      }

      setIsAuthenticated(true);
      setIsLoading(false);
    };

    checkAuth();
  }, [pathname, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (pathname === '/login') {
    return <>{children}</>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}










