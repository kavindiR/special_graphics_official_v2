'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
    Trophy, 
    DollarSign, 
    Briefcase, 
    TrendingUp, 
    Clock, 
    Star,
    Plus,
    Filter,
    Search,
    Award,
    Eye,
    MessageSquare,
    Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function DesignerDashboard() {
    const { user, isAuthenticated } = useAuth();
    const router = useRouter();

    // Redirect if not authenticated or not a designer
    if (typeof window !== 'undefined' && (!isAuthenticated || user?.role !== 'designer')) {
        router.push('/auth');
        return null;
    }

    const [activeTab, setActiveTab] = useState<'contests' | 'portfolio' | 'earnings'>('contests');

    // Mock data
    const stats = {
        contestsWon: 15,
        totalEarnings: 2450,
        activeContests: 8,
        rating: 4.9,
        totalSubmissions: 127
    };

    const activeContests = [
        {
            id: 1,
            title: 'Modern Logo for Tech Startup',
            prize: 299,
            entries: 45,
            timeLeft: '2 days left',
            status: 'Qualifying',
            category: 'Logo Design',
            thumbnail: '/portfolio/1.jpg'
        },
        {
            id: 2,
            title: 'Brand Identity Package',
            prize: 499,
            entries: 32,
            timeLeft: '5 days left',
            status: 'Qualifying',
            category: 'Branding',
            thumbnail: '/portfolio/2.jpg'
        },
        {
            id: 3,
            title: 'Website Redesign',
            prize: 799,
            entries: 28,
            timeLeft: '1 day left',
            status: 'Final Round',
            category: 'Web Design',
            thumbnail: '/portfolio/3.jpg'
        }
    ];

    const recentWins = [
        {
            id: 1,
            title: 'Logo Design Contest',
            prize: 299,
            wonDate: '2 days ago',
            thumbnail: '/portfolio/1.jpg'
        },
        {
            id: 2,
            title: 'Business Card Design',
            prize: 149,
            wonDate: '1 week ago',
            thumbnail: '/portfolio/2.jpg'
        }
    ];

    const portfolioItems = [
        { id: 1, title: 'Tech Logo Design', category: 'Logo', thumbnail: '/portfolio/1.jpg', views: 234, likes: 45 },
        { id: 2, title: 'Brand Identity', category: 'Branding', thumbnail: '/portfolio/2.jpg', views: 189, likes: 32 },
        { id: 3, title: 'Web Design', category: 'Web', thumbnail: '/portfolio/3.jpg', views: 312, likes: 67 },
        { id: 4, title: 'Packaging Design', category: 'Packaging', thumbnail: '/portfolio/4.jpg', views: 156, likes: 28 }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                Welcome back, {user?.name || 'Designer'}!
                            </h1>
                            <p className="text-gray-600 mt-1">Here's what's happening with your contests</p>
                        </div>
                        <Button className="bg-black text-white hover:bg-gray-800">
                            <Plus className="h-4 w-4 mr-2" />
                            Submit Design
                        </Button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Contests Won</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.contestsWon}</p>
                            </div>
                            <Trophy className="h-8 w-8 text-yellow-500" />
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Total Earnings</p>
                                <p className="text-2xl font-bold text-gray-900">${stats.totalEarnings}</p>
                            </div>
                            <DollarSign className="h-8 w-8 text-green-500" />
                        </div>
                    </div>

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
                                <p className="text-sm text-gray-600 mb-1">Rating</p>
                                <div className="flex items-center gap-1">
                                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                                    <p className="text-2xl font-bold text-gray-900">{stats.rating}</p>
                                </div>
                            </div>
                            <TrendingUp className="h-8 w-8 text-purple-500" />
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
                                Active Contests
                            </button>
                            <button
                                onClick={() => setActiveTab('portfolio')}
                                className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
                                    activeTab === 'portfolio'
                                        ? 'border-black text-black'
                                        : 'border-transparent text-gray-600 hover:text-gray-900'
                                }`}
                            >
                                Portfolio
                            </button>
                            <button
                                onClick={() => setActiveTab('earnings')}
                                className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
                                    activeTab === 'earnings'
                                        ? 'border-black text-black'
                                        : 'border-transparent text-gray-600 hover:text-gray-900'
                                }`}
                            >
                                Earnings
                            </button>
                        </div>
                    </div>

                    <div className="p-6">
                        {/* Active Contests Tab */}
                        {activeTab === 'contests' && (
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-semibold text-gray-900">Active Contests</h3>
                                    <div className="flex items-center gap-3">
                                        <div className="relative">
                                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                            <input
                                                type="text"
                                                placeholder="Search contests..."
                                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm"
                                            />
                                        </div>
                                        <Button variant="outline" size="sm">
                                            <Filter className="h-4 w-4 mr-2" />
                                            Filter
                                        </Button>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {activeContests.map((contest) => (
                                        <Link
                                            key={contest.id}
                                            href={`/contest/${contest.id}`}
                                            className="block bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors border border-gray-200"
                                        >
                                            <div className="flex items-start gap-6">
                                                <div className="w-24 h-24 bg-gray-200 rounded-lg flex-shrink-0 flex items-center justify-center">
                                                    <Briefcase className="h-8 w-8 text-gray-400" />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-start justify-between mb-2">
                                                        <div>
                                                            <h4 className="font-semibold text-gray-900 mb-1">{contest.title}</h4>
                                                            <p className="text-sm text-gray-600">{contest.category}</p>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="text-lg font-bold text-gray-900">${contest.prize}</p>
                                                            <p className="text-xs text-gray-500">Prize</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-4 text-sm text-gray-600">
                                                        <span className="flex items-center gap-1">
                                                            <Clock className="h-4 w-4" />
                                                            {contest.timeLeft}
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <MessageSquare className="h-4 w-4" />
                                                            {contest.entries} entries
                                                        </span>
                                                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                                                            contest.status === 'Final Round' 
                                                                ? 'bg-green-100 text-green-700' 
                                                                : 'bg-blue-100 text-blue-700'
                                                        }`}>
                                                            {contest.status}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Portfolio Tab */}
                        {activeTab === 'portfolio' && (
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-semibold text-gray-900">My Portfolio</h3>
                                    <Button className="bg-black text-white hover:bg-gray-800">
                                        <Plus className="h-4 w-4 mr-2" />
                                        Add Work
                                    </Button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {portfolioItems.map((item) => (
                                        <div key={item.id} className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
                                            <div className="aspect-square bg-gray-200 flex items-center justify-center">
                                                <Briefcase className="h-12 w-12 text-gray-400" />
                                            </div>
                                            <div className="p-4">
                                                <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                                                <p className="text-xs text-gray-600 mb-3">{item.category}</p>
                                                <div className="flex items-center justify-between text-xs text-gray-500">
                                                    <span className="flex items-center gap-1">
                                                        <Eye className="h-3 w-3" />
                                                        {item.views}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Star className="h-3 w-3" />
                                                        {item.likes}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Earnings Tab */}
                        {activeTab === 'earnings' && (
                            <div>
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Earnings Overview</h3>
                                    <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
                                        <p className="text-sm mb-1">Total Earnings</p>
                                        <p className="text-4xl font-bold">${stats.totalEarnings}</p>
                                        <p className="text-sm mt-2 opacity-90">Available for withdrawal</p>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <h4 className="font-semibold text-gray-900 mb-4">Recent Wins</h4>
                                    <div className="space-y-3">
                                        {recentWins.map((win) => (
                                            <div key={win.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                                                <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                                                    <Award className="h-6 w-6 text-gray-400" />
                                                </div>
                                                <div className="flex-1">
                                                    <h5 className="font-semibold text-gray-900">{win.title}</h5>
                                                    <p className="text-sm text-gray-600">{win.wonDate}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-bold text-gray-900">+${win.prize}</p>
                                                    <p className="text-xs text-gray-500">Prize</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <Button className="w-full bg-black text-white hover:bg-gray-800">
                                    Request Withdrawal
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

