'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { 
    Search, 
    Filter, 
    Briefcase, 
    Clock, 
    DollarSign, 
    Users,
    Award,
    Calendar,
    TrendingUp,
    CheckCircle2,
    Eye,
    ArrowUpDown,
    ArrowUp,
    ArrowDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { contestsApi } from '@/lib/api';

const DESIGN_CATEGORIES = [
    'Logo Design', 'Branding', 'Web Design', 'Packaging', 'Print Design',
    'Social Media', 'Illustration', 'Typography', 'Icon Design', 'App Design'
];

export default function YourContestsPage() {
    const { user, isAuthenticated } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [contests, setContests] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    
    // Get state from URL params
    const state = searchParams.get('state') || 'active';
    const activeState = searchParams.get('active-state') || 'all';
    const order = searchParams.get('order') || 'time-left';
    const dir = searchParams.get('dir') || 'asc';
    
    const [filters, setFilters] = useState({
        search: '',
        category: '',
        status: state === 'active' ? 'open' : state === 'watching' ? 'watching' : 'all',
        minPrize: '',
        maxPrize: ''
    });
    const [mySubmissions, setMySubmissions] = useState<Set<number>>(new Set());
    const [watchingContests, setWatchingContests] = useState<Set<number>>(new Set());

    useEffect(() => {
        if (typeof window !== 'undefined' && (!isAuthenticated || user?.role !== 'designer')) {
            router.push('/auth');
            return;
        }
        loadMySubmissions();
        loadWatchingContests();
    }, [isAuthenticated, user, router]);

    useEffect(() => {
        if (isAuthenticated && user?.role === 'designer') {
            loadContests();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state, activeState, order, dir]);

    // Dummy contests data
    const dummyContests = [
        {
            id: 1,
            title: 'Modern Logo for Tech Startup',
            description: 'Looking for a sleek, modern logo design for our innovative tech startup.',
            category: 'Logo Design',
            prize: 299,
            status: 'open',
            deadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
            client: {
                id: 1,
                name: 'Tech Innovations Inc.',
                avatar: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=100&h=100&fit=crop'
            },
            submissions: [],
            isWatching: true,
            timeLeft: 2
        },
        {
            id: 2,
            title: 'Brand Identity Package',
            description: 'Complete brand identity package including logo, color palette, typography.',
            category: 'Branding',
            prize: 499,
            status: 'qualifying',
            deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
            client: {
                id: 2,
                name: 'Fashion Forward',
                avatar: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop'
            },
            submissions: [],
            isWatching: false,
            timeLeft: 5
        },
        {
            id: 3,
            title: 'Website Redesign',
            description: 'Complete website redesign for a modern, responsive look.',
            category: 'Web Design',
            prize: 799,
            status: 'final_round',
            deadline: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
            client: {
                id: 3,
                name: 'Digital Solutions Co.',
                avatar: 'https://images.unsplash.com/photo-1633409361618-c73427e4e206?w=100&h=100&fit=crop'
            },
            submissions: [],
            isWatching: true,
            timeLeft: 1
        },
        {
            id: 4,
            title: 'Product Packaging Design',
            description: 'Eye-catching packaging design for organic skincare products.',
            category: 'Packaging',
            prize: 349,
            status: 'open',
            deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            client: {
                id: 4,
                name: 'Natural Beauty Co.',
                avatar: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=100&h=100&fit=crop'
            },
            submissions: [],
            isWatching: false,
            timeLeft: 7
        },
        {
            id: 5,
            title: 'Social Media Graphics Package',
            description: 'Complete social media graphics package for Instagram and Facebook.',
            category: 'Social Media',
            prize: 249,
            status: 'open',
            deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
            client: {
                id: 5,
                name: 'Social Media Pro',
                avatar: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=100&h=100&fit=crop'
            },
            submissions: [],
            isWatching: true,
            timeLeft: 3
        },
        {
            id: 6,
            title: 'Illustration for Children\'s Book',
            description: 'Colorful, engaging illustrations for a children\'s book.',
            category: 'Illustration',
            prize: 599,
            status: 'qualifying',
            deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
            client: {
                id: 6,
                name: 'Kids Publishing House',
                avatar: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=100&h=100&fit=crop'
            },
            submissions: [],
            isWatching: false,
            timeLeft: 10
        }
    ];

    const loadContests = async () => {
        try {
            setLoading(true);
            const response = await contestsApi.getAll({
                status: filters.status,
                category: filters.category || undefined,
                search: filters.search || undefined
            });
            
            let filteredContests = dummyContests;
            
            if (response.success && response.data && Array.isArray(response.data) && response.data.length > 0) {
                filteredContests = response.data;
            }
            
            // Apply filters based on URL params
            if (state === 'active') {
                filteredContests = filteredContests.filter(c => 
                    c.status === 'open' || c.status === 'qualifying' || c.status === 'final_round'
                );
                if (activeState === 'watching') {
                    filteredContests = filteredContests.filter(c => watchingContests.has(c.id) || c.isWatching);
                }
            } else if (state === 'watching') {
                filteredContests = filteredContests.filter(c => watchingContests.has(c.id) || c.isWatching);
            }
            
            // Sort contests
            filteredContests = [...filteredContests].sort((a, b) => {
                if (order === 'time-left') {
                    const aTime = new Date(a.deadline).getTime();
                    const bTime = new Date(b.deadline).getTime();
                    return dir === 'asc' ? aTime - bTime : bTime - aTime;
                } else if (order === 'prize') {
                    return dir === 'asc' ? a.prize - b.prize : b.prize - a.prize;
                }
                return 0;
            });
            
            setContests(filteredContests);
        } catch (error) {
            console.error('Error loading contests:', error);
            setContests(dummyContests);
        } finally {
            setLoading(false);
        }
    };

    const loadMySubmissions = async () => {
        try {
            const response = await contestsApi.getMySubmissions();
            if (response.success && response.data && Array.isArray(response.data)) {
                const submissionIds = new Set(response.data.map((s: any) => s.contestId));
                setMySubmissions(submissionIds);
            }
        } catch (error) {
            console.error('Error loading submissions:', error);
        }
    };

    const loadWatchingContests = async () => {
        // TODO: Replace with actual API call
        setWatchingContests(new Set([1, 3, 5]));
    };

    const updateUrlParams = (newParams: Record<string, string>) => {
        const params = new URLSearchParams(searchParams.toString());
        Object.entries(newParams).forEach(([key, value]) => {
            if (value) {
                params.set(key, value);
            } else {
                params.delete(key);
            }
        });
        router.push(`/designer/your-contests?${params.toString()}`);
    };

    const getTimeRemaining = (deadline: string) => {
        const now = new Date();
        const end = new Date(deadline);
        const diff = end.getTime() - now.getTime();
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        
        if (days > 0) return `${days} day${days > 1 ? 's' : ''} left`;
        if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} left`;
        return 'Ending soon';
    };

    const getStatusBadge = (status: string) => {
        const badges: Record<string, { label: string; className: string }> = {
            open: { label: 'Open', className: 'bg-blue-100 text-blue-700' },
            qualifying: { label: 'Qualifying', className: 'bg-purple-100 text-purple-700' },
            final_round: { label: 'Final Round', className: 'bg-green-100 text-green-700' },
            completed: { label: 'Completed', className: 'bg-gray-100 text-gray-700' }
        };
        return badges[status] || badges.open;
    };

    const activeContestsCount = dummyContests.filter(c => 
        c.status === 'open' || c.status === 'qualifying' || c.status === 'final_round'
    ).length;
    const watchingCount = dummyContests.filter(c => watchingContests.has(c.id) || c.isWatching).length;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Your contests</h1>
                            <p className="text-gray-600 mt-1">Manage and track your contest participation</p>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-1 border-b border-gray-200">
                        <button
                            onClick={() => updateUrlParams({ state: 'active', 'active-state': '' })}
                            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                                state === 'active'
                                    ? 'border-black text-black'
                                    : 'border-transparent text-gray-600 hover:text-gray-900'
                            }`}
                        >
                            Active ({activeContestsCount})
                        </button>
                        <button
                            onClick={() => updateUrlParams({ state: 'watching', 'active-state': '' })}
                            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                                state === 'watching'
                                    ? 'border-black text-black'
                                    : 'border-transparent text-gray-600 hover:text-gray-900'
                            }`}
                        >
                            Watching ({watchingCount})
                        </button>
                        <button
                            onClick={() => updateUrlParams({ state: 'all', 'active-state': '' })}
                            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                                state === 'all' || !state
                                    ? 'border-black text-black'
                                    : 'border-transparent text-gray-600 hover:text-gray-900'
                            }`}
                        >
                            All contests
                        </button>
                    </div>

                    {/* Active State Filter (only for active tab) */}
                    {state === 'active' && (
                        <div className="mt-4 flex gap-2">
                            <button
                                onClick={() => updateUrlParams({ 'active-state': 'all' })}
                                className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                                    activeState === 'all' || !activeState
                                        ? 'bg-gray-900 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                All active
                            </button>
                            <button
                                onClick={() => updateUrlParams({ 'active-state': 'watching' })}
                                className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                                    activeState === 'watching'
                                        ? 'bg-gray-900 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                Watching
                            </button>
                        </div>
                    )}

                    {/* Search and Filters */}
                    <div className="mt-6 space-y-4">
                        <div className="flex gap-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search contests..."
                                    value={filters.search}
                                    onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                                />
                            </div>
                            <select
                                value={filters.category}
                                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                                className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-black focus:border-transparent"
                            >
                                <option value="">All Categories</option>
                                {DESIGN_CATEGORIES.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>

                        {/* Sort Options */}
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-600">Sort by:</span>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => updateUrlParams({ order: 'time-left', dir: dir === 'asc' ? 'desc' : 'asc' })}
                                    className={`px-3 py-1.5 text-sm rounded-md flex items-center gap-1 transition-colors ${
                                        order === 'time-left'
                                            ? 'bg-gray-900 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    Time left
                                    {order === 'time-left' && (
                                        dir === 'asc' ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />
                                    )}
                                </button>
                                <button
                                    onClick={() => updateUrlParams({ order: 'prize', dir: dir === 'asc' ? 'desc' : 'asc' })}
                                    className={`px-3 py-1.5 text-sm rounded-md flex items-center gap-1 transition-colors ${
                                        order === 'prize'
                                            ? 'bg-gray-900 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    Prize
                                    {order === 'prize' && (
                                        dir === 'asc' ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contests Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {loading ? (
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                        <p className="mt-4 text-gray-600">Loading contests...</p>
                    </div>
                ) : contests.length === 0 ? (
                    <div className="text-center py-12">
                        <Briefcase className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No contests found</h3>
                        <p className="text-gray-600">Try adjusting your filters or check back later</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {contests.map((contest) => {
                            const badge = getStatusBadge(contest.status);
                            const hasSubmitted = mySubmissions.has(contest.id);
                            const isWatching = watchingContests.has(contest.id) || contest.isWatching;
                            
                            return (
                                <Link
                                    key={contest.id}
                                    href={`/contest?id=${contest.id}`}
                                    className="block bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow overflow-hidden"
                                >
                                    {/* Contest Image */}
                                    <div className="h-48 bg-gray-100 relative overflow-hidden">
                                        <img 
                                            src={contest.category === 'Logo Design' 
                                                ? 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop'
                                                : contest.category === 'Branding'
                                                ? 'https://images.unsplash.com/photo-1633409361618-c73427e4e206?w=600&h=400&fit=crop'
                                                : contest.category === 'Web Design'
                                                ? 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop'
                                                : contest.category === 'Packaging'
                                                ? 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=600&h=400&fit=crop'
                                                : contest.category === 'Social Media'
                                                ? 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=400&fit=crop'
                                                : contest.category === 'Illustration'
                                                ? 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=600&h=400&fit=crop'
                                                : 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop'
                                            }
                                            alt={contest.title}
                                            className="w-full h-full object-cover"
                                        />
                                        {isWatching && (
                                            <div className="absolute top-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                                                <Eye className="h-3 w-3" />
                                                Watching
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex-1">
                                                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                                                    {contest.title}
                                                </h3>
                                                <p className="text-sm text-gray-600 mb-2">{contest.category}</p>
                                            </div>
                                            {hasSubmitted && (
                                                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 ml-2" />
                                            )}
                                        </div>

                                        <div className="space-y-3 mb-4">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2 text-gray-600">
                                                    <DollarSign className="h-4 w-4" />
                                                    <span className="text-lg font-bold text-gray-900">
                                                        ${parseFloat(contest.prize).toFixed(0)}
                                                    </span>
                                                </div>
                                                <span className={`px-2 py-1 rounded text-xs font-medium ${badge.className}`}>
                                                    {badge.label}
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-4 text-sm text-gray-600">
                                                <span className="flex items-center gap-1">
                                                    <Clock className="h-4 w-4" />
                                                    {getTimeRemaining(contest.deadline)}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Users className="h-4 w-4" />
                                                    {contest.submissions?.length || 0} entries
                                                </span>
                                            </div>
                                        </div>

                                        <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                                            {contest.description}
                                        </p>

                                        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                                            <div className="flex items-center gap-2">
                                                {contest.client?.avatar ? (
                                                    <img 
                                                        src={contest.client.avatar} 
                                                        alt={contest.client.name}
                                                        className="h-6 w-6 rounded-full"
                                                    />
                                                ) : (
                                                    <div className="h-6 w-6 rounded-full bg-gray-300"></div>
                                                )}
                                                <span className="text-sm text-gray-600">{contest.client?.name}</span>
                                            </div>
                                            {hasSubmitted ? (
                                                <span className="text-sm text-green-600 font-medium">Submitted</span>
                                            ) : (
                                                <Button 
                                                    size="sm" 
                                                    className="bg-black text-white hover:bg-gray-800"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        router.push(`/contest?id=${contest.id}`);
                                                    }}
                                                >
                                                    View & Submit
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

