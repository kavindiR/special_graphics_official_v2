'use client';

import { useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

interface ClientProtectedProps {
  children: ReactNode;
}

export default function ClientProtected({ children }: ClientProtectedProps) {
  const router = useRouter();
  const { user, loading, isAuthenticated } = useAuth();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (!loading) {
      // Check if user is authenticated and has client role
      if (!isAuthenticated || !user) {
        router.push('/auth');
        return;
      }
      if (user.role !== 'client') {
        router.push('/');
        return;
      }
      setIsAuthorized(true);
    }
  }, [loading, isAuthenticated, user, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-gray-900 animate-spin" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return null;
  }

  return <>{children}</>;
}

