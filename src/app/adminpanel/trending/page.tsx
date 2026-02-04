'use client';

import { TrendingUp, Flame } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function TrendingPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Trending Designs</h1>
        <p className="text-gray-600 mt-1.5 text-sm">View trending and popular designs</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
        <TrendingUp className="w-16 h-16 text-gray-900 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Trending Content</h3>
        <p className="text-gray-600">View what's trending on the platform</p>
      </div>
    </div>
  );
}

