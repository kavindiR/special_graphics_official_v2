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

  if (isAdminRoute) {
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

