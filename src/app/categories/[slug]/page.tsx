'use client';

import CategoryLandingPage from '@/components/CategoryLandingPage';
import ClientProtected from '@/components/ClientProtected';

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <ClientProtected>
      <CategoryLandingPage params={params} />
    </ClientProtected>
  );
}

