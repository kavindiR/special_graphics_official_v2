'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
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
    CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { contestsApi } from '@/lib/api';

const DESIGN_CATEGORIES = [
    'Logo Design', 'Branding', 'Web Design', 'Packaging', 'Print Design',
    'Social Media', 'Illustration', 'Typography', 'Icon Design', 'App Design'
];

export default function DesignerContestsPage() {
    const { user, isAuthenticated } = useAuth();
    const router = useRouter();
    const [contests, setContests] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        search: '',
        category: '',
        status: 'open',
        minPrize: '',
        maxPrize: ''
    });
    const [mySubmissions, setMySubmissions] = useState<Set<number>>(new Set());

    useEffect(() => {
        if (typeof window !== 'undefined' && (!isAuthenticated || user?.role !== 'designer')) {
            router.push('/auth');
            return;
        }
        loadContests();
        loadMySubmissions();
    }, [isAuthenticated, user, router]);

    // Dummy contests data with images
    const dummyContests = [
        {
            id: 1,
            title: 'Modern Logo for Tech Startup',
            description: 'Looking for a sleek, modern logo design for our innovative tech startup. We need something that represents innovation and technology.',
            category: 'Logo Design',
            prize: 299,
            status: 'open',
            deadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
            client: {
                id: 1,
                name: 'Tech Innovations Inc.',
                avatar: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=100&h=100&fit=crop'
            },
            submissions: []
        },
        {
            id: 2,
            title: 'Brand Identity Package',
            description: 'Complete brand identity package including logo, color palette, typography, and brand guidelines for a new fashion brand.',
            category: 'Branding',
            prize: 499,
            status: 'qualifying',
            deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
            client: {
                id: 2,
                name: 'Fashion Forward',
                avatar: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop'
            },
            submissions: []
        },
        {
            id: 3,
            title: 'Website Redesign',
            description: 'Complete website redesign for a modern, responsive look. Need UI/UX design for desktop and mobile platforms.',
            category: 'Web Design',
            prize: 799,
            status: 'final_round',
            deadline: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
            client: {
                id: 3,
                name: 'Digital Solutions Co.',
                avatar: 'https://images.unsplash.com/photo-1633409361618-c73427e4e206?w=100&h=100&fit=crop'
            },
            submissions: []
        },
        {
            id: 4,
            title: 'Product Packaging Design',
            description: 'Eye-catching packaging design for organic skincare products. Need eco-friendly, minimalist design approach.',
            category: 'Packaging',
            prize: 349,
            status: 'open',
            deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            client: {
                id: 4,
                name: 'Natural Beauty Co.',
                avatar: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=100&h=100&fit=crop'
            },
            submissions: []
        },
        {
            id: 5,
            title: 'Social Media Graphics Package',
            description: 'Complete social media graphics package including posts, stories, and banner designs for Instagram and Facebook.',
            category: 'Social Media',
            prize: 249,
            status: 'open',
            deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
            client: {
                id: 5,
                name: 'Social Media Pro',
                avatar: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=100&h=100&fit=crop'
            },
            submissions: []
        },
        {
            id: 6,
            title: 'Illustration for Children\'s Book',
            description: 'Colorful, engaging illustrations for a children\'s book. Need 10-12 illustrations in a consistent style.',
            category: 'Illustration',
            prize: 599,
            status: 'qualifying',
            deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
            client: {
                id: 6,
                name: 'Kids Publishing House',
                avatar: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=100&h=100&fit=crop'
            },
            submissions: []
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
            if (response.success && response.data && response.data.length > 0) {
                setContests(response.data);
            } else {
                // Use dummy data if API returns empty or fails
                const filtered = dummyContests.filter(c => {
                    if (filters.status && c.status !== filters.status) return false;
                    if (filters.category && c.category !== filters.category) return false;
                    if (filters.search && !c.title.toLowerCase().includes(filters.search.toLowerCase())) return false;
                    return true;
                });
                setContests(filtered);
            }
        } catch (error) {
            console.error('Error loading contests:', error);
            // Use dummy data on error
            const filtered = dummyContests.filter(c => {
                if (filters.status && c.status !== filters.status) return false;
                if (filters.category && c.category !== filters.category) return false;
                if (filters.search && !c.title.toLowerCase().includes(filters.search.toLowerCase())) return false;
                return true;
            });
            setContests(filtered);
        } finally {
            setLoading(false);
        }
    };

    const loadMySubmissions = async () => {
        try {
            const response = await contestsApi.getMySubmissions();
            if (response.success && response.data) {
                const submissionIds = new Set(response.data.map((s: any) => s.contestId));
                setMySubmissions(submissionIds);
            }
        } catch (error) {
            console.error('Error loading submissions:', error);
        }
    };

    useEffect(() => {
        loadContests();
    }, [filters.status, filters.category]);

    const handleSearch = () => {
        loadContests();
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

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Browse Contests</h1>
                            <p className="text-gray-600 mt-1">Find contests that match your skills and interests</p>
                        </div>
                        <Link href="/designer/dashboard">
                            <Button variant="outline">Back to Dashboard</Button>
                        </Link>
                    </div>

                    {/* Search and Filters */}
                    <div className="space-y-4">
                        <div className="flex gap-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search contests..."
                                    value={filters.search}
                                    onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                                />
                            </div>
                            <Button onClick={handleSearch} className="bg-black text-white hover:bg-gray-800">
                                Search
                            </Button>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <select
                                value={filters.status}
                                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                                className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-black focus:border-transparent"
                            >
                                <option value="open">Open Contests</option>
                                <option value="qualifying">Qualifying Round</option>
                                <option value="final_round">Final Round</option>
                            </select>

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
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.style.display = 'none';
                                                const parent = target.parentElement!;
                                                parent.className = 'h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center';
                                                parent.innerHTML = '<svg class="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>';
                                            }}
                                        />
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
                                                    <div className="h-6 w-6 rounded-full bg-gray-300 rounded-full"></div>
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

