'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
    User, 
    Mail, 
    Calendar, 
    Award, 
    Briefcase,
    MapPin,
    Globe,
    Edit,
    ArrowLeft,
    Star,
    Trophy,
    TrendingUp,
    Eye,
    Heart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { authApi, portfolioApi, designerApi } from '@/lib/api';

export default function ProfilePage() {
    const { user, isAuthenticated, refreshUser } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [profileData, setProfileData] = useState<any>(null);
    const [portfolioItems, setPortfolioItems] = useState<any[]>([]);
    const [stats, setStats] = useState<any>(null);

    useEffect(() => {
        if (typeof window !== 'undefined' && !isAuthenticated) {
            router.push('/auth');
            return;
        }
        loadProfile();
    }, [isAuthenticated, user, router]);

    const loadProfile = async () => {
        try {
            setLoading(true);
            const response = await authApi.getCurrentUser();
            if (response.success && response.data) {
                setProfileData(response.data);
                
                // Load additional data based on role
                if (response.data.role === 'designer') {
                    // Load portfolio
                    const portfolioRes = await portfolioApi.getMyPortfolio();
                    if (portfolioRes.success && portfolioRes.data && Array.isArray(portfolioRes.data)) {
                        setPortfolioItems(portfolioRes.data.slice(0, 6) || []);
                    }
                    
                    // Load stats
                    const statsRes = await designerApi.getMyStats();
                    if (statsRes.success && statsRes.data) {
                        setStats(statsRes.data);
                    }
                }
            } else {
                // Use user from context if API fails
                if (user) {
                    setProfileData(user);
                }
            }
        } catch (error) {
            console.error('Error loading profile:', error);
            // Use user from context on error
            if (user) {
                setProfileData(user);
            }
        } finally {
            setLoading(false);
        }
    };

    const getTierBadge = (level?: string) => {
        const badges: Record<string, { label: string; className: string }> = {
            entry: { label: 'Entry Level', className: 'bg-blue-100 text-blue-700' },
            mid: { label: 'Mid Level', className: 'bg-purple-100 text-purple-700' },
            top: { label: 'Top Level', className: 'bg-yellow-100 text-yellow-700' }
        };
        return badges[level || 'entry'] || badges.entry;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                    <p className="mt-4 text-gray-600">Loading profile...</p>
                </div>
            </div>
        );
    }

    if (!profileData) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <User className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Profile not found</h3>
                    <p className="text-gray-600 mb-4">Please log in to view your profile</p>
                    <Link href="/auth">
                        <Button className="bg-black text-white hover:bg-gray-800">
                            Go to Login
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    const tierBadge = profileData.role === 'designer' ? getTierBadge(profileData.designerLevel) : null;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link href="/">
                                <Button variant="outline" size="sm">
                                    <ArrowLeft className="h-4 w-4 mr-2" />
                                    Back
                                </Button>
                            </Link>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
                                <p className="text-gray-600 mt-1">View and manage your profile information</p>
                            </div>
                        </div>
                        <Link href="/settings">
                            <Button className="bg-black text-white hover:bg-gray-800">
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Profile
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Profile Header */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-6">
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Avatar */}
                        <div className="flex-shrink-0">
                            {profileData.avatar ? (
                                <img 
                                    src={profileData.avatar} 
                                    alt={profileData.name}
                                    className="h-32 w-32 rounded-full object-cover border-4 border-gray-200"
                                />
                            ) : (
                                <div className="h-32 w-32 rounded-full bg-gray-200 flex items-center justify-center border-4 border-gray-200">
                                    <span className="text-4xl font-bold text-gray-400">
                                        {profileData.name?.charAt(0).toUpperCase() || 'U'}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Info */}
                        <div className="flex-1">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <h2 className="text-3xl font-bold text-gray-900">{profileData.name}</h2>
                                        {tierBadge && (
                                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${tierBadge.className}`}>
                                                {tierBadge.label}
                                            </span>
                                        )}
                                        {profileData.role && (
                                            <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700 capitalize">
                                                {profileData.role}
                                            </span>
                                        )}
                                    </div>
                                    {profileData.bio && (
                                        <p className="text-gray-600 mb-4">{profileData.bio}</p>
                                    )}
                                </div>
                            </div>

                            {/* Stats - Designer specific */}
                            {profileData.role === 'designer' && stats && (
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                    <div className="flex items-center gap-2">
                                        <Trophy className="h-5 w-5 text-yellow-500" />
                                        <div>
                                            <p className="text-2xl font-bold text-gray-900">{stats.contestsWon || 0}</p>
                                            <p className="text-xs text-gray-600">Contests Won</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Briefcase className="h-5 w-5 text-blue-500" />
                                        <div>
                                            <p className="text-2xl font-bold text-gray-900">{stats.portfolioItems || 0}</p>
                                            <p className="text-xs text-gray-600">Portfolio Items</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                                        <div>
                                            <p className="text-2xl font-bold text-gray-900">
                                                {parseFloat(stats.rating || 0).toFixed(1)}
                                            </p>
                                            <p className="text-xs text-gray-600">Rating</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <TrendingUp className="h-5 w-5 text-green-500" />
                                        <div>
                                            <p className="text-2xl font-bold text-gray-900">{stats.totalSubmissions || 0}</p>
                                            <p className="text-xs text-gray-600">Submissions</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Details */}
                            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                <div className="flex items-center gap-1">
                                    <Mail className="h-4 w-4" />
                                    {profileData.email}
                                </div>
                                {profileData.location && (
                                    <div className="flex items-center gap-1">
                                        <MapPin className="h-4 w-4" />
                                        {profileData.location}
                                    </div>
                                )}
                                {profileData.website && (
                                    <a 
                                        href={profileData.website} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1 hover:text-gray-900"
                                    >
                                        <Globe className="h-4 w-4" />
                                        Website
                                    </a>
                                )}
                                {profileData.createdAt && (
                                    <div className="flex items-center gap-1">
                                        <Calendar className="h-4 w-4" />
                                        Joined {new Date(profileData.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                    </div>
                                )}
                            </div>

                            {/* Skills - Designer specific */}
                            {profileData.role === 'designer' && profileData.skills && profileData.skills.length > 0 && (
                                <div className="mt-4">
                                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Skills</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {profileData.skills.map((skill: string, idx: number) => (
                                            <span
                                                key={idx}
                                                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Portfolio - Designer only */}
                {profileData.role === 'designer' && portfolioItems.length > 0 && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-gray-900">Portfolio</h2>
                            <Link href="/designer/portfolio">
                                <Button variant="outline" size="sm">
                                    View All
                                </Button>
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {portfolioItems.map((item) => (
                                <div key={item.id} className="group cursor-pointer">
                                    <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-3">
                                        {item.imageUrl ? (
                                            <img 
                                                src={item.imageUrl} 
                                                alt={item.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <Briefcase className="h-12 w-12 text-gray-400" />
                                            </div>
                                        )}
                                    </div>
                                    <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                                    <p className="text-sm text-gray-600 mb-2">{item.category}</p>
                                    <div className="flex items-center gap-4 text-xs text-gray-500">
                                        <span className="flex items-center gap-1">
                                            <Eye className="h-3 w-3" />
                                            {item.views || 0}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Heart className="h-3 w-3" />
                                            {item.likes || 0}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Quick Actions */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {profileData.role === 'designer' && (
                            <>
                                <Link href="/designer/dashboard">
                                    <Button variant="outline" className="w-full justify-start">
                                        <Briefcase className="h-4 w-4 mr-2" />
                                        Designer Dashboard
                                    </Button>
                                </Link>
                                <Link href="/designer/portfolio">
                                    <Button variant="outline" className="w-full justify-start">
                                        <Eye className="h-4 w-4 mr-2" />
                                        My Portfolio
                                    </Button>
                                </Link>
                                <Link href="/designer/earnings">
                                    <Button variant="outline" className="w-full justify-start">
                                        <TrendingUp className="h-4 w-4 mr-2" />
                                        Earnings
                                    </Button>
                                </Link>
                            </>
                        )}
                        {profileData.role === 'client' && (
                            <>
                                <Link href="/client/dashboard">
                                    <Button variant="outline" className="w-full justify-start">
                                        <Briefcase className="h-4 w-4 mr-2" />
                                        Client Dashboard
                                    </Button>
                                </Link>
                                <Link href="/start-contest">
                                    <Button variant="outline" className="w-full justify-start">
                                        <Award className="h-4 w-4 mr-2" />
                                        Start a Contest
                                    </Button>
                                </Link>
                                <Link href="/find-designer">
                                    <Button variant="outline" className="w-full justify-start">
                                        <User className="h-4 w-4 mr-2" />
                                        Find a Designer
                                    </Button>
                                </Link>
                            </>
                        )}
                        <Link href="/settings">
                            <Button variant="outline" className="w-full justify-start">
                                <Edit className="h-4 w-4 mr-2" />
                                Settings
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

