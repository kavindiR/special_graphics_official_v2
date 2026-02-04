'use client';

import { Palette, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function InspirationsPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Inspirations Gallery</h1>
        <p className="text-gray-600 mt-1.5 text-sm">Manage inspiration gallery</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="search"
            placeholder="Search inspirations..."
            className="pl-10"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
        <Palette className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Inspirations Gallery</h3>
        <p className="text-gray-600">Manage and curate design inspirations</p>
      </div>
    </div>
  );
}

