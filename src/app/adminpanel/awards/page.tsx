'use client';

import { Award, Trophy, Star } from 'lucide-react';

export default function AwardsPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Awards Management</h1>
        <p className="text-gray-600 mt-1.5 text-sm">Manage awards and recognitions</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
        <Award className="w-16 h-16 text-gray-900 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Awards System</h3>
        <p className="text-gray-600">Manage designer awards and recognitions</p>
      </div>
    </div>
  );
}

