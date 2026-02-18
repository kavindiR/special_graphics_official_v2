'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
    Search, 
    Filter, 
    Mail, 
    User, 
    Heart, 
    Users, 
    Folder,
    Calendar,
    MessageSquare,
    Star,
    Award,
    DollarSign
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

export default function DesignerClientsPage() {
    const { user, isAuthenticated } = useAuth();
    const router = useRouter();
    const [clients, setClients] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');

    useEffect(() => {
        if (typeof window !== 'undefined' && (!isAuthenticated || user?.role !== 'designer')) {
            router.push('/auth');
            return;
        }
        loadClients();
    }, [isAuthenticated, user, router]);

    const loadClients = async () => {
        try {
            setLoading(true);
            // TODO: Replace with actual API call
            // const response = await clientApi.getMyClients();
            // setClients(response.data);
            
            // Using dummy data for now
            setTimeout(() => {
                setClients(dummyClients);
                setLoading(false);
            }, 500);
        } catch (error) {
            console.error('Error loading clients:', error);
            setClients(dummyClients);
            setLoading(false);
        }
    };

    // Dummy clients data
    const dummyClients = [
        {
            id: 1,
            name: 'Tech Innovations Inc.',
            email: 'contact@techinnovations.com',
            avatar: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=100&h=100&fit=crop',
            status: 'active',
            isFavorite: true,
            activeContests: 2,
            activeProjects: 1,
            totalSpent: 1248,
            projectsCompleted: 5,
            rating: 4.8,
            lastActivity: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            workedTogether: true
        },
        {
            id: 2,
            name: 'Fashion Forward',
            email: 'hello@fashionforward.com',
            avatar: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop',
            status: 'active',
            isFavorite: false,
            activeContests: 1,
            activeProjects: 0,
            totalSpent: 899,
            projectsCompleted: 3,
            rating: 4.9,
            lastActivity: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
            workedTogether: true
        },
        {
            id: 3,
            name: 'Green Earth Organics',
            email: 'info@greenearth.com',
            avatar: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=100&h=100&fit=crop',
            status: 'active',
            isFavorite: true,
            activeContests: 0,
            activeProjects: 2,
            totalSpent: 2346,
            projectsCompleted: 8,
            rating: 5.0,
            lastActivity: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            workedTogether: true
        },
        {
            id: 4,
            name: 'Digital Solutions Pro',
            email: 'contact@digitalsolutions.com',
            avatar: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=100&h=100&fit=crop',
            status: 'active',
            isFavorite: false,
            activeContests: 3,
            activeProjects: 0,
            totalSpent: 567,
            projectsCompleted: 2,
            rating: 4.7,
            lastActivity: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
            workedTogether: false
        }
    ];

    const filteredClients = clients.filter(client => {
        const matchesSearch = client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            client.email.toLowerCase().includes(searchQuery.toLowerCase());
        
        let matchesFilter = true;
        if (activeFilter === 'favorites') {
            matchesFilter = client.isFavorite;
        } else if (activeFilter === 'worked_together') {
            matchesFilter = client.workedTogether;
        } else if (activeFilter === 'active_contests') {
            matchesFilter = client.activeContests > 0;
        } else if (activeFilter === 'active_projects') {
            matchesFilter = client.activeProjects > 0;
        }

        return matchesSearch && matchesFilter;
    });

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 60) {
            return `${diffMins} minutes ago`;
        } else if (diffHours < 24) {
            return `${diffHours} hours ago`;
        } else if (diffDays < 7) {
            return `${diffDays} days ago`;
        } else {
            return date.toLocaleDateString();
        }
    };

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-3xl font-bold text-gray-900">Your clients</h1>
                        <Button className="bg-black text-white hover:bg-gray-800">
                            Invite by email
                        </Button>
                    </div>
                    <p className="text-gray-600 text-sm">
                        Manage your client relationships and track your work history
                    </p>
                </div>

                <div className="flex gap-6">
                    {/* Sidebar Filters */}
                    <div className="w-64 flex-shrink-0">
                        <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-1">
                            <button
                                onClick={() => setActiveFilter('all')}
                                className={`w-full text-left px-3 py-2 rounded-md flex items-center gap-2 transition-colors ${
                                    activeFilter === 'all'
                                        ? 'bg-gray-900 text-white font-medium'
                                        : 'text-gray-700 hover:bg-gray-50'
                                }`}
                            >
                                <Users className="h-4 w-4" />
                                All contacts ({clients.length})
                            </button>
                            <button
                                onClick={() => setActiveFilter('favorites')}
                                className={`w-full text-left px-3 py-2 rounded-md flex items-center gap-2 transition-colors ${
                                    activeFilter === 'favorites'
                                        ? 'bg-gray-900 text-white font-medium'
                                        : 'text-gray-700 hover:bg-gray-50'
                                }`}
                            >
                                <Heart className="h-4 w-4" />
                                Favorites ({clients.filter(c => c.isFavorite).length})
                            </button>
                            <button
                                onClick={() => setActiveFilter('worked_together')}
                                className={`w-full text-left px-3 py-2 rounded-md flex items-center gap-2 transition-colors ${
                                    activeFilter === 'worked_together'
                                        ? 'bg-gray-900 text-white font-medium'
                                        : 'text-gray-700 hover:bg-gray-50'
                                }`}
                            >
                                <Users className="h-4 w-4" />
                                Worked together ({clients.filter(c => c.workedTogether).length})
                            </button>
                            <button
                                onClick={() => setActiveFilter('active_contests')}
                                className={`w-full text-left px-3 py-2 rounded-md flex items-center gap-2 transition-colors ${
                                    activeFilter === 'active_contests'
                                        ? 'bg-gray-900 text-white font-medium'
                                        : 'text-gray-700 hover:bg-gray-50'
                                }`}
                            >
                                <Folder className="h-4 w-4" />
                                Active contests ({clients.filter(c => c.activeContests > 0).length})
                            </button>
                            <button
                                onClick={() => setActiveFilter('active_projects')}
                                className={`w-full text-left px-3 py-2 rounded-md flex items-center gap-2 transition-colors ${
                                    activeFilter === 'active_projects'
                                        ? 'bg-gray-900 text-white font-medium'
                                        : 'text-gray-700 hover:bg-gray-50'
                                }`}
                            >
                                <Folder className="h-4 w-4" />
                                Active projects ({clients.filter(c => c.activeProjects > 0).length})
                            </button>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Search and Sort */}
                        <div className="mb-6 flex items-center gap-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Filter by name"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                                />
                            </div>
                            <select className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent">
                                <option>Sort by last activity</option>
                                <option>Sort by name</option>
                                <option>Sort by total spent</option>
                            </select>
                        </div>

                        {/* Clients List */}
                        {loading ? (
                            <div className="text-center py-12">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
                                <p className="mt-4 text-gray-600">Loading clients...</p>
                            </div>
                        ) : filteredClients.length === 0 ? (
                            <div className="text-center py-12 bg-gray-50 rounded-lg">
                                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    You don't have any contacts yet
                                </h3>
                                <p className="text-gray-600">
                                    The best way to find new clients is to win a contest.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {filteredClients.map((client) => (
                                    <div
                                        key={client.id}
                                        className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-start gap-4 flex-1">
                                                <Avatar className="h-12 w-12">
                                                    <AvatarImage src={client.avatar} alt={client.name} />
                                                    <AvatarFallback className="bg-gray-200">
                                                        {client.name.charAt(0)}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <h3 className="text-lg font-semibold text-gray-900">
                                                            {client.name}
                                                        </h3>
                                                        {client.isFavorite && (
                                                            <Heart className="h-4 w-4 text-red-500 fill-red-500" />
                                                        )}
                                                        {client.workedTogether && (
                                                            <Badge variant="outline" className="text-xs">
                                                                Worked together
                                                            </Badge>
                                                        )}
                                                    </div>
                                                    <p className="text-sm text-gray-600 mb-3">{client.email}</p>
                                                    <div className="flex items-center gap-6 text-sm text-gray-600">
                                                        <div className="flex items-center gap-1">
                                                            <Folder className="h-4 w-4" />
                                                            <span>{client.activeContests} active contests</span>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <Folder className="h-4 w-4" />
                                                            <span>{client.activeProjects} active projects</span>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <DollarSign className="h-4 w-4" />
                                                            <span>${client.totalSpent} total spent</span>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <Award className="h-4 w-4" />
                                                            <span>{client.projectsCompleted} completed</span>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                                            <span>{client.rating}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    asChild
                                                >
                                                    <Link href={`/designer/messages?client=${client.id}`}>
                                                        <MessageSquare className="h-4 w-4 mr-2" />
                                                        Message
                                                    </Link>
                                                </Button>
                                                <span className="text-xs text-gray-500">
                                                    {formatDate(client.lastActivity)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

