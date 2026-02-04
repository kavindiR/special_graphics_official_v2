'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
    Briefcase, 
    Users, 
    DollarSign, 
    Clock,
    Plus,
    Search,
    Filter,
    MessageSquare,
    CheckCircle2,
    Star,
    ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ClientDashboard() {
    const { user, isAuthenticated } = useAuth();
    const router = useRouter();

    // Redirect if not authenticated or not a client
    if (typeof window !== 'undefined' && (!isAuthenticated || user?.role !== 'client')) {
        router.push('/auth');
        return null;
    }

    const [activeTab, setActiveTab] = useState<'contests' | 'hired' | 'projects'>('contests');

    // Mock data
    const stats = {
        activeContests: 3,
        hiredDesigners: 2,
        totalSpent: 1249,
        completedProjects: 8
    };

    const activeContests = [
        {
            id: 1,
            title: 'Modern Logo for Tech Startup',
            prize: 299,
            entries: 45,
            timeLeft: '2 days left',
            status: 'Qualifying',
            category: 'Logo Design'
        },
        {
            id: 2,
            title: 'Brand Identity Package',
            prize: 499,
            entries: 32,
            timeLeft: '5 days left',
            status: 'Qualifying',
            category: 'Branding'
        }
    ];

    const hiredDesigners = [
        {
            id: 1,
            name: 'Elena Silva',
            project: 'Logo Design',
            status: 'In Progress',
            progress: 60,
            rate: '$75/hr',
            avatar: '/avatars/elena.jpg'
        },
        {
            id: 2,
            name: 'Marcus Chen',
            project: 'Website Redesign',
            status: 'Review',
            progress: 90,
            rate: '$85/hr',
            avatar: '/avatars/marcus.jpg'
        }
    ];

    const completedProjects = [
        {
            id: 1,
            title: 'Business Card Design',
            designer: 'Sarah Johnson',
            completedDate: '2 weeks ago',
            amount: 149
        },
        {
            id: 2,
            title: 'Logo Design',
            designer: 'David Kim',
            completedDate: '1 month ago',
            amount: 299
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                Welcome back, {user?.name || 'Client'}!
                            </h1>
                            <p className="text-gray-600 mt-1">Manage your contests and projects</p>
                        </div>
                        <div className="flex gap-3">
                            <Link href="/hire-designer">
                                <Button variant="outline">
                                    <Users className="h-4 w-4 mr-2" />
                                    Find Designer
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Active Contests</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.activeContests}</p>
                            </div>
                            <Briefcase className="h-8 w-8 text-blue-500" />
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Hired Designers</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.hiredDesigners}</p>
                            </div>
                            <Users className="h-8 w-8 text-purple-500" />
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Total Spent</p>
                                <p className="text-2xl font-bold text-gray-900">${stats.totalSpent}</p>
                            </div>
                            <DollarSign className="h-8 w-8 text-green-500" />
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Completed</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.completedProjects}</p>
                            </div>
                            <CheckCircle2 className="h-8 w-8 text-green-500" />
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
                    <div className="border-b border-gray-200">
                        <div className="flex">
                            <button
                                onClick={() => setActiveTab('contests')}
                                className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
                                    activeTab === 'contests'
                                        ? 'border-black text-black'
                                        : 'border-transparent text-gray-600 hover:text-gray-900'
                                }`}
                            >
                                My Contests
                            </button>
                            <button
                                onClick={() => setActiveTab('hired')}
                                className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
                                    activeTab === 'hired'
                                        ? 'border-black text-black'
                                        : 'border-transparent text-gray-600 hover:text-gray-900'
                                }`}
                            >
                                Hired Designers
                            </button>
                            <button
                                onClick={() => setActiveTab('projects')}
                                className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
                                    activeTab === 'projects'
                                        ? 'border-black text-black'
                                        : 'border-transparent text-gray-600 hover:text-gray-900'
                                }`}
                            >
                                Completed Projects
                            </button>
                        </div>
                    </div>

                    <div className="p-6">
                        {/* Contests Tab */}
                        {activeTab === 'contests' && (
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-semibold text-gray-900">My Contests</h3>
                                </div>

                                <div className="space-y-4">
                                    {activeContests.map((contest) => (
                                        <Link
                                            key={contest.id}
                                            href={`/contest/${contest.id}`}
                                            className="block bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors border border-gray-200"
                                        >
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <h4 className="font-semibold text-gray-900 mb-1">{contest.title}</h4>
                                                    <p className="text-sm text-gray-600 mb-3">{contest.category}</p>
                                                    <div className="flex items-center gap-4 text-sm text-gray-600">
                                                        <span className="flex items-center gap-1">
                                                            <Clock className="h-4 w-4" />
                                                            {contest.timeLeft}
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <MessageSquare className="h-4 w-4" />
                                                            {contest.entries} entries
                                                        </span>
                                                        <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-700">
                                                            {contest.status}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="text-right ml-6">
                                                    <p className="text-lg font-bold text-gray-900">${contest.prize}</p>
                                                    <p className="text-xs text-gray-500">Prize Pool</p>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Hired Designers Tab */}
                        {activeTab === 'hired' && (
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-semibold text-gray-900">Hired Designers</h3>
                                    <Link href="/hire-designer">
                                        <Button variant="outline">
                                            <Plus className="h-4 w-4 mr-2" />
                                            Find Designer
                                        </Button>
                                    </Link>
                                </div>

                                <div className="space-y-4">
                                    {hiredDesigners.map((designer) => (
                                        <div key={designer.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                                            <div className="flex items-start gap-4">
                                                <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                                                    <span className="text-xl font-bold text-gray-600">
                                                        {designer.name.charAt(0)}
                                                    </span>
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-start justify-between mb-2">
                                                        <div>
                                                            <h4 className="font-semibold text-gray-900">{designer.name}</h4>
                                                            <p className="text-sm text-gray-600">{designer.project}</p>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="font-semibold text-gray-900">{designer.rate}</p>
                                                            <p className="text-xs text-gray-500">Rate</p>
                                                        </div>
                                                    </div>
                                                    <div className="mb-3">
                                                        <div className="flex items-center justify-between text-sm mb-1">
                                                            <span className="text-gray-600">Progress</span>
                                                            <span className="font-medium text-gray-900">{designer.progress}%</span>
                                                        </div>
                                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                                            <div
                                                                className="bg-blue-600 h-2 rounded-full transition-all"
                                                                style={{ width: `${designer.progress}%` }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <span className={`px-3 py-1 rounded text-xs font-medium ${
                                                            designer.status === 'In Progress'
                                                                ? 'bg-blue-100 text-blue-700'
                                                                : 'bg-yellow-100 text-yellow-700'
                                                        }`}>
                                                            {designer.status}
                                                        </span>
                                                        <Button variant="outline" size="sm">
                                                            <MessageSquare className="h-4 w-4 mr-2" />
                                                            Message
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Completed Projects Tab */}
                        {activeTab === 'projects' && (
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-6">Completed Projects</h3>
                                <div className="space-y-3">
                                    {completedProjects.map((project) => (
                                        <div key={project.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                                            <div>
                                                <h4 className="font-semibold text-gray-900">{project.title}</h4>
                                                <p className="text-sm text-gray-600">by {project.designer}</p>
                                                <p className="text-xs text-gray-500 mt-1">{project.completedDate}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold text-gray-900">${project.amount}</p>
                                                <p className="text-xs text-gray-500">Paid</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

