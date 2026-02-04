'use client';

import { Trophy, Search, Plus, Calendar, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

export default function ContestsPage() {
  const contests = [
    {
      id: 1,
      title: 'Logo Design Contest',
      status: 'active',
      participants: 45,
      submissions: 120,
      endDate: '2024-02-15',
    },
    {
      id: 2,
      title: 'Brand Identity Contest',
      status: 'active',
      participants: 32,
      submissions: 89,
      endDate: '2024-02-20',
    },
    {
      id: 3,
      title: 'Packaging Design',
      status: 'completed',
      participants: 28,
      submissions: 76,
      endDate: '2024-01-30',
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Contests Management</h1>
          <p className="text-gray-600 mt-1.5 text-sm">Manage design contests</p>
        </div>
        <Button className="bg-gray-900 hover:bg-gray-800 text-white gap-2">
          <Plus className="w-4 h-4" />
          Create Contest
        </Button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="search"
            placeholder="Search contests..."
            className="pl-10"
          />
        </div>
      </div>

      {/* Contests List */}
      <div className="space-y-4">
        {contests.map((contest) => (
          <div
            key={contest.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Trophy className="w-5 h-5 text-gray-900" />
                  <h3 className="text-lg font-bold text-gray-900">{contest.title}</h3>
                  <Badge
                    variant={contest.status === 'active' ? 'default' : 'secondary'}
                    className={contest.status === 'active' ? 'bg-green-100 text-green-700' : ''}
                  >
                    {contest.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-6 mt-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    {contest.participants} participants
                  </div>
                  <div className="text-sm text-gray-600">
                    {contest.submissions} submissions
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    Ends: {contest.endDate}
                  </div>
                </div>
              </div>
              <Button variant="outline">Manage</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

