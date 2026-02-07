'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
    Award, 
    Star, 
    Briefcase, 
    MapPin, 
    Globe, 
    Trophy,
    Eye,
    Heart,
    ArrowLeft,
    Mail,
    Calendar,
    TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { designerApi } from '@/lib/api';

export default function DesignerProfilePage() {
    const params = useParams();
    const router = useRouter();
    const [designer, setDesigner] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDesignerProfile();
    }, [params.id]);

    // Dummy designer profile data
    const dummyDesigner = {
        id: parseInt(params.id as string),
        name: 'Elena Silva',
        bio: 'Award-winning designer with 10+ years of experience in branding and logo design. Passionate about creating memorable visual identities that tell compelling stories.',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face',
        designerLevel: 'top',
        rating: 4.9,
        contestsWon: 15,
        portfolioCount: 24,
        totalSubmissions: 127,
        location: 'San Francisco, CA',
        website: 'https://elenadesign.com',
        skills: ['Logo Design', 'Branding', 'Illustration', 'Typography', 'Web Design'],
        portfolioItems: [
            {
                id: 1,
                title: 'Tech Startup Logo Design',
                category: 'Logo Design',
                imageUrl: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=600&fit=crop',
                views: 234,
                likes: 45
            },
            {
                id: 2,
                title: 'Fashion Brand Identity',
                category: 'Branding',
                imageUrl: 'https://images.unsplash.com/photo-1633409361618-c73427e4e206?w=600&h=600&fit=crop',
                views: 189,
                likes: 32
            },
            {
                id: 3,
                title: 'E-commerce Website Design',
                category: 'Web Design',
                imageUrl: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=600&fit=crop',
                views: 312,
                likes: 67
            },
            {
                id: 4,
                title: 'Organic Product Packaging',
                category: 'Packaging',
                imageUrl: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=600&h=600&fit=crop',
                views: 156,
                likes: 28
            },
            {
                id: 5,
                title: 'Social Media Campaign Graphics',
                category: 'Social Media',
                imageUrl: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=600&fit=crop',
                views: 278,
                likes: 54
            },
            {
                id: 6,
                title: 'Children\'s Book Illustration',
                category: 'Illustration',
                imageUrl: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=600&h=600&fit=crop',
                views: 445,
                likes: 89
            }
        ],
        recentWins: [
            {
                id: 1,
                contest: {
                    id: 1,
                    title: 'Modern Logo for Tech Startup',
                    category: 'Logo Design',
                    prize: 299
                }
            },
            {
                id: 2,
                contest: {
                    id: 2,
                    title: 'Brand Identity Package',
                    category: 'Branding',
                    prize: 499
                }
            },
            {
                id: 3,
                contest: {
                    id: 3,
                    title: 'Website Redesign',
                    category: 'Web Design',
                    prize: 799
                }
            }
        ]
    };

    const loadDesignerProfile = async () => {
        try {
            setLoading(true);
            const response = await designerApi.getProfile(parseInt(params.id as string));
            if (response.success && response.data) {
                setDesigner(response.data);
            } else {
                // Use dummy data if API fails
                setDesigner(dummyDesigner);
            }
        } catch (error) {
            console.error('Error loading designer profile:', error);
            // Use dummy data on error
            setDesigner(dummyDesigner);
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

    if (!designer) {
        return null;
    }

    const tierBadge = getTierBadge(designer.designerLevel);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <Link href="/find-designer">
                        <Button variant="outline" size="sm" className="mb-4">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Designers
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Profile Header */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-6">
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Avatar */}
                        <div className="flex-shrink-0">
                            {designer.avatar ? (
                                <img 
                                    src={designer.avatar} 
                                    alt={designer.name}
                                    className="h-32 w-32 rounded-full object-cover border-4 border-gray-200"
                                />
                            ) : (
                                <div className="h-32 w-32 rounded-full bg-gray-200 flex items-center justify-center border-4 border-gray-200">
                                    <span className="text-4xl font-bold text-gray-400">
                                        {designer.name?.charAt(0).toUpperCase() || 'D'}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Info */}
                        <div className="flex-1">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <h1 className="text-3xl font-bold text-gray-900">{designer.name}</h1>
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${tierBadge.className}`}>
                                            {tierBadge.label}
                                        </span>
                                    </div>
                                    {designer.bio && (
                                        <p className="text-gray-600 mb-4">{designer.bio}</p>
                                    )}
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                <div className="flex items-center gap-2">
                                    <Trophy className="h-5 w-5 text-yellow-500" />
                                    <div>
                                        <p className="text-2xl font-bold text-gray-900">{designer.winsCount || 0}</p>
                                        <p className="text-xs text-gray-600">Contests Won</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Briefcase className="h-5 w-5 text-blue-500" />
                                    <div>
                                        <p className="text-2xl font-bold text-gray-900">{designer.portfolioCount || 0}</p>
                                        <p className="text-xs text-gray-600">Portfolio Items</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                                    <div>
                                        <p className="text-2xl font-bold text-gray-900">
                                            {parseFloat(designer.rating || 0).toFixed(1)}
                                        </p>
                                        <p className="text-xs text-gray-600">Rating</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <TrendingUp className="h-5 w-5 text-green-500" />
                                    <div>
                                        <p className="text-2xl font-bold text-gray-900">{designer.totalSubmissions || 0}</p>
                                        <p className="text-xs text-gray-600">Submissions</p>
                                    </div>
                                </div>
                            </div>

                            {/* Details */}
                            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                {designer.location && (
                                    <div className="flex items-center gap-1">
                                        <MapPin className="h-4 w-4" />
                                        {designer.location}
                                    </div>
                                )}
                                {designer.website && (
                                    <a 
                                        href={designer.website} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1 hover:text-gray-900"
                                    >
                                        <Globe className="h-4 w-4" />
                                        Website
                                    </a>
                                )}
                                {designer.skills && designer.skills.length > 0 && (
                                    <div className="flex items-center gap-1">
                                        <Briefcase className="h-4 w-4" />
                                        {designer.skills.length} Skills
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Skills */}
                {designer.skills && designer.skills.length > 0 && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Skills</h2>
                        <div className="flex flex-wrap gap-2">
                            {designer.skills.map((skill: string, idx: number) => (
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

                {/* Recent Wins */}
                {designer.recentWins && designer.recentWins.length > 0 && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Wins</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {designer.recentWins.map((win: any) => (
                                <div key={win.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Award className="h-5 w-5 text-yellow-500" />
                                        <h3 className="font-semibold text-gray-900">{win.contest?.title}</h3>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-2">{win.contest?.category}</p>
                                    <p className="text-lg font-bold text-gray-900">${parseFloat(win.contest?.prize || 0).toFixed(0)}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Portfolio */}
                {designer.portfolioItems && designer.portfolioItems.length > 0 && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Portfolio</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {designer.portfolioItems.map((item: any) => (
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
            </div>
        </div>
    );
}

