'use client';

import DesignerNav from '@/components/DesignerNav';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DesignerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
        // Wait for auth to finish loading before checking
        if (!loading && typeof window !== 'undefined') {
            if (!isAuthenticated) {
                router.push('/auth');
            } else if (user && user.role !== 'designer') {
                router.push('/');
            }
        }
    }, [isAuthenticated, user, loading, router]);

    // Show loading state while checking auth
    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    // Don't render if not authenticated or not a designer (redirect will happen)
    if (!isAuthenticated || (user && user.role !== 'designer')) {
        return null;
    }

    return (
        <div className="min-h-screen bg-white">
            <DesignerNav />
            <main>
                {children}
            </main>
            <Footer />
        </div>
    );
}

