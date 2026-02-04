'use client';

import { FileText, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function CategoriesPage() {
  const categories = [
    { id: 1, name: 'Logo & Branding', designs: 1245, active: true },
    { id: 2, name: 'Web & App Design', designs: 892, active: true },
    { id: 3, name: 'Business & Advertising', designs: 567, active: true },
    { id: 4, name: 'Packaging & Label', designs: 423, active: true },
    { id: 5, name: 'Art & Illustration', designs: 312, active: false },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Categories Management</h1>
          <p className="text-gray-600 mt-1.5 text-sm">Manage design categories</p>
        </div>
        <Button className="bg-gray-900 hover:bg-gray-800 text-white gap-2">
          <Plus className="w-4 h-4" />
          Add Category
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <FileText className="w-8 h-8 text-gray-900" />
              <Badge variant={category.active ? 'default' : 'secondary'}>
                {category.active ? 'Active' : 'Inactive'}
              </Badge>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">{category.name}</h3>
            <p className="text-sm text-gray-600">{category.designs} designs</p>
          </div>
        ))}
      </div>
    </div>
  );
}

