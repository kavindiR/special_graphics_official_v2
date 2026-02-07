'use client';

import { usePathname } from 'next/navigation';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthProviderWrapper from "@/providers/AuthProvider";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/adminpanel');
  const isDesignerRoute = pathname?.startsWith('/designer');

  if (isAdminRoute) {
    return (
      <AuthProviderWrapper>
        {children}
      </AuthProviderWrapper>
    );
  }

  // Designer routes don't use the global Header/Footer - they have their own navigation
  if (isDesignerRoute) {
    return (
      <AuthProviderWrapper>
        {children}
      </AuthProviderWrapper>
    );
  }

  return (
    <AuthProviderWrapper>
      <Header />
      {children}
      <Footer />
    </AuthProviderWrapper>
  );
}

