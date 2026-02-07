'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
    Plus, 
    Edit, 
    Trash2, 
    Eye, 
    Star, 
    Search,
    Filter,
    Image as ImageIcon,
    Upload
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { portfolioApi } from '@/lib/api';

const DESIGN_CATEGORIES = [
    'Logo Design', 'Branding', 'Web Design', 'Packaging', 'Print Design',
    'Social Media', 'Illustration', 'Typography', 'Icon Design', 'App Design'
];

export default function DesignerPortfolioPage() {
    const { user, isAuthenticated } = useAuth();
    const router = useRouter();
    const [portfolioItems, setPortfolioItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        search: '',
        category: ''
    });
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingItem, setEditingItem] = useState<any>(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        imageUrl: '',
        category: '',
        tags: ''
    });

    useEffect(() => {
        if (typeof window !== 'undefined' && (!isAuthenticated || user?.role !== 'designer')) {
            router.push('/auth');
            return;
        }
        loadPortfolio();
    }, [isAuthenticated, user, router]);

    // Dummy portfolio data with images
    const dummyPortfolio = [
        {
            id: 1,
            title: 'Tech Startup Logo Design',
            description: 'Modern and sleek logo design for a tech startup company. Focus on innovation and technology.',
            imageUrl: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=600&fit=crop',
            category: 'Logo Design',
            tags: ['modern', 'tech', 'minimalist'],
            views: 234,
            likes: 45,
            createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
            id: 2,
            title: 'Fashion Brand Identity',
            description: 'Complete brand identity package including logo, color palette, and typography for a luxury fashion brand.',
            imageUrl: 'https://images.unsplash.com/photo-1633409361618-c73427e4e206?w=600&h=600&fit=crop',
            category: 'Branding',
            tags: ['fashion', 'luxury', 'elegant'],
            views: 189,
            likes: 32,
            createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
            id: 3,
            title: 'E-commerce Website Design',
            description: 'Modern and responsive e-commerce website design with focus on user experience and conversion optimization.',
            imageUrl: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=600&fit=crop',
            category: 'Web Design',
            tags: ['ecommerce', 'responsive', 'ui/ux'],
            views: 312,
            likes: 67,
            createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
            id: 4,
            title: 'Organic Product Packaging',
            description: 'Eco-friendly packaging design for organic skincare products. Minimalist and sustainable approach.',
            imageUrl: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=600&h=600&fit=crop',
            category: 'Packaging',
            tags: ['organic', 'eco-friendly', 'minimalist'],
            views: 156,
            likes: 28,
            createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
            id: 5,
            title: 'Social Media Campaign Graphics',
            description: 'Complete set of social media graphics for Instagram and Facebook campaigns. Consistent brand style.',
            imageUrl: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=600&fit=crop',
            category: 'Social Media',
            tags: ['social media', 'instagram', 'campaign'],
            views: 278,
            likes: 54,
            createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
            id: 6,
            title: 'Children\'s Book Illustration',
            description: 'Colorful and engaging illustrations for a children\'s book. Playful and imaginative style.',
            imageUrl: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=600&h=600&fit=crop',
            category: 'Illustration',
            tags: ['children', 'book', 'colorful'],
            views: 445,
            likes: 89,
            createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
        }
    ];

    const loadPortfolio = async () => {
        try {
            setLoading(true);
            const response = await portfolioApi.getMyPortfolio();
            if (response.success && response.data && response.data.length > 0) {
                setPortfolioItems(response.data);
            } else {
                // Use dummy data if API returns empty
                setPortfolioItems(dummyPortfolio);
            }
        } catch (error) {
            console.error('Error loading portfolio:', error);
            // Use dummy data on error
            setPortfolioItems(dummyPortfolio);
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = () => {
        setEditingItem(null);
        setFormData({
            title: '',
            description: '',
            imageUrl: '',
            category: '',
            tags: ''
        });
        setShowAddModal(true);
    };

    const handleEdit = (item: any) => {
        setEditingItem(item);
        setFormData({
            title: item.title,
            description: item.description,
            imageUrl: item.imageUrl,
            category: item.category,
            tags: item.tags?.join(', ') || ''
        });
        setShowAddModal(true);
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this portfolio item?')) return;
        
        try {
            const response = await portfolioApi.delete(id);
            if (response.success) {
                loadPortfolio();
            }
        } catch (error) {
            console.error('Error deleting portfolio item:', error);
            alert('Failed to delete portfolio item');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            const tagsArray = formData.tags.split(',').map(t => t.trim()).filter(t => t);
            const data = {
                ...formData,
                tags: tagsArray
            };

            let response;
            if (editingItem) {
                response = await portfolioApi.update(editingItem.id, data);
            } else {
                response = await portfolioApi.create(data);
            }

            if (response.success) {
                setShowAddModal(false);
                loadPortfolio();
            } else {
                alert(response.error?.message || 'Failed to save portfolio item');
            }
        } catch (error) {
            console.error('Error saving portfolio item:', error);
            alert('Failed to save portfolio item');
        }
    };

    const filteredItems = portfolioItems.filter(item => {
        const matchesSearch = !filters.search || 
            item.title.toLowerCase().includes(filters.search.toLowerCase()) ||
            item.description.toLowerCase().includes(filters.search.toLowerCase());
        const matchesCategory = !filters.category || item.category === filters.category;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">My Portfolio</h1>
                            <p className="text-gray-600 mt-1">Showcase your best work to attract clients</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Link href="/designer/dashboard">
                                <Button variant="outline">Back to Dashboard</Button>
                            </Link>
                            <Button onClick={handleAdd} className="bg-black text-white hover:bg-gray-800">
                                <Plus className="h-4 w-4 mr-2" />
                                Add Work
                            </Button>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="flex gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search portfolio..."
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
                </div>
            </div>

            {/* Portfolio Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {loading ? (
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                        <p className="mt-4 text-gray-600">Loading portfolio...</p>
                    </div>
                ) : filteredItems.length === 0 ? (
                    <div className="text-center py-12">
                        <ImageIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No portfolio items yet</h3>
                        <p className="text-gray-600 mb-4">Start building your portfolio to showcase your work</p>
                        <Button onClick={handleAdd} className="bg-black text-white hover:bg-gray-800">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Your First Work
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredItems.map((item) => (
                            <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                                <div className="aspect-square bg-gray-100 relative">
                                    {item.imageUrl ? (
                                        <img 
                                            src={item.imageUrl} 
                                            alt={item.title}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <ImageIcon className="h-12 w-12 text-gray-400" />
                                        </div>
                                    )}
                                </div>
                                <div className="p-4">
                                    <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">{item.title}</h3>
                                    <p className="text-xs text-gray-600 mb-2">{item.category}</p>
                                    <p className="text-sm text-gray-600 line-clamp-2 mb-4">{item.description}</p>
                                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                                        <span className="flex items-center gap-1">
                                            <Eye className="h-3 w-3" />
                                            {item.views || 0} views
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Star className="h-3 w-3" />
                                            {item.likes || 0} likes
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => handleEdit(item)}
                                            className="flex-1"
                                        >
                                            <Edit className="h-3 w-3 mr-1" />
                                            Edit
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => handleDelete(item.id)}
                                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                        >
                                            <Trash2 className="h-3 w-3" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Add/Edit Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                {editingItem ? 'Edit Portfolio Item' : 'Add Portfolio Item'}
                            </h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Title *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Description *
                                    </label>
                                    <textarea
                                        required
                                        rows={4}
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Image URL *
                                    </label>
                                    <input
                                        type="url"
                                        required
                                        value={formData.imageUrl}
                                        onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                        placeholder="https://example.com/image.jpg"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Category *
                                    </label>
                                    <select
                                        required
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                                    >
                                        <option value="">Select category</option>
                                        {DESIGN_CATEGORIES.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Tags (comma-separated)
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.tags}
                                        onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                        placeholder="modern, minimalist, professional"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                                    />
                                </div>

                                <div className="flex items-center gap-3 pt-4">
                                    <Button
                                        type="submit"
                                        className="flex-1 bg-black text-white hover:bg-gray-800"
                                    >
                                        {editingItem ? 'Update' : 'Add'} Portfolio Item
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setShowAddModal(false)}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

