'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
    DollarSign, 
    TrendingUp, 
    Clock, 
    CheckCircle2, 
    XCircle,
    ArrowDown,
    Filter,
    Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { earningsApi } from '@/lib/api';

export default function DesignerEarningsPage() {
    const { user, isAuthenticated } = useAuth();
    const router = useRouter();
    const [earnings, setEarnings] = useState<any[]>([]);
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [withdrawAmount, setWithdrawAmount] = useState('');
    const [showWithdrawModal, setShowWithdrawModal] = useState(false);
    const [filters, setFilters] = useState({
        status: '',
        type: ''
    });

    useEffect(() => {
        if (typeof window !== 'undefined' && (!isAuthenticated || user?.role !== 'designer')) {
            router.push('/auth');
            return;
        }
        loadEarnings();
        loadStats();
    }, [isAuthenticated, user, router]);

    // Dummy earnings data
    const dummyEarnings = [
        {
            id: 1,
            amount: 299,
            type: 'contest_win',
            status: 'completed',
            description: 'Won Logo Design Contest',
            contest: { id: 1, title: 'Modern Logo for Tech Startup', category: 'Logo Design' },
            createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            paidAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
            id: 2,
            amount: 499,
            type: 'contest_win',
            status: 'completed',
            description: 'Won Brand Identity Package Contest',
            contest: { id: 2, title: 'Brand Identity Package', category: 'Branding' },
            createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            paidAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
            id: 3,
            amount: 799,
            type: 'project_payment',
            status: 'completed',
            description: 'Website Redesign Project',
            contest: null,
            createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
            paidAt: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
            id: 4,
            amount: 349,
            type: 'contest_win',
            status: 'pending',
            description: 'Won Packaging Design Contest',
            contest: { id: 4, title: 'Product Packaging Design', category: 'Packaging' },
            createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            paidAt: null
        },
        {
            id: 5,
            amount: 249,
            type: 'contest_win',
            status: 'processing',
            description: 'Won Social Media Graphics Contest',
            contest: { id: 5, title: 'Social Media Graphics Package', category: 'Social Media' },
            createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
            paidAt: null
        },
        {
            id: 6,
            amount: 150,
            type: 'bonus',
            status: 'completed',
            description: 'Quality Bonus',
            contest: null,
            createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
            paidAt: new Date(Date.now() - 19 * 24 * 60 * 60 * 1000).toISOString()
        }
    ];

    const dummyStats = {
        totalEarnings: 2346,
        pendingEarnings: 349,
        processingEarnings: 249,
        totalContestWins: 4,
        totalProjects: 1
    };

    const loadEarnings = async () => {
        try {
            setLoading(true);
            const response = await earningsApi.getMyEarnings({
                status: filters.status || undefined,
                type: filters.type || undefined
            });
            if (response.success && response.data && response.data.earnings && response.data.earnings.length > 0) {
                setEarnings(response.data.earnings);
            } else {
                // Use dummy data if API returns empty
                let filtered = dummyEarnings;
                if (filters.status) {
                    filtered = filtered.filter(e => e.status === filters.status);
                }
                if (filters.type) {
                    filtered = filtered.filter(e => e.type === filters.type);
                }
                setEarnings(filtered);
            }
        } catch (error) {
            console.error('Error loading earnings:', error);
            // Use dummy data on error
            let filtered = dummyEarnings;
            if (filters.status) {
                filtered = filtered.filter(e => e.status === filters.status);
            }
            if (filters.type) {
                filtered = filtered.filter(e => e.type === filters.type);
            }
            setEarnings(filtered);
        } finally {
            setLoading(false);
        }
    };

    const loadStats = async () => {
        try {
            const response = await earningsApi.getStats();
            if (response.success && response.data) {
                setStats(response.data);
            } else {
                // Use dummy stats if API returns empty
                setStats(dummyStats);
            }
        } catch (error) {
            console.error('Error loading stats:', error);
            // Use dummy stats on error
            setStats(dummyStats);
        }
    };

    useEffect(() => {
        loadEarnings();
    }, [filters.status, filters.type]);

    const handleWithdraw = async () => {
        const amount = parseFloat(withdrawAmount);
        if (!amount || amount <= 0) {
            alert('Please enter a valid amount');
            return;
        }

        if (stats && amount > stats.pendingEarnings) {
            alert('Insufficient pending earnings');
            return;
        }

        try {
            const response = await earningsApi.requestWithdrawal(amount);
            if (response.success) {
                alert('Withdrawal request submitted successfully!');
                setShowWithdrawModal(false);
                setWithdrawAmount('');
                loadEarnings();
                loadStats();
            } else {
                alert(response.error?.message || 'Failed to submit withdrawal request');
            }
        } catch (error) {
            console.error('Error requesting withdrawal:', error);
            alert('Failed to submit withdrawal request');
        }
    };

    const getStatusBadge = (status: string) => {
        const badges: Record<string, { label: string; className: string; icon: any }> = {
            pending: { label: 'Pending', className: 'bg-yellow-100 text-yellow-700', icon: Clock },
            processing: { label: 'Processing', className: 'bg-blue-100 text-blue-700', icon: Clock },
            completed: { label: 'Completed', className: 'bg-green-100 text-green-700', icon: CheckCircle2 },
            failed: { label: 'Failed', className: 'bg-red-100 text-red-700', icon: XCircle }
        };
        return badges[status] || badges.pending;
    };

    const getTypeLabel = (type: string) => {
        const types: Record<string, string> = {
            contest_win: 'Contest Win',
            project_payment: 'Project Payment',
            bonus: 'Bonus',
            refund: 'Refund'
        };
        return types[type] || type;
    };

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Earnings</h1>
                            <p className="text-gray-600 mt-1">Track your earnings and request withdrawals</p>
                        </div>
                        <Link href="/designer/dashboard">
                            <Button variant="outline">Back to Dashboard</Button>
                        </Link>
                    </div>

                    {/* Stats Cards */}
                    {stats && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
                                <p className="text-sm mb-1 opacity-90">Total Earnings</p>
                                <p className="text-3xl font-bold">${parseFloat(stats.totalEarnings || 0).toFixed(2)}</p>
                            </div>
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                                <p className="text-sm text-gray-600 mb-1">Pending</p>
                                <p className="text-3xl font-bold text-gray-900">${parseFloat(stats.pendingEarnings || 0).toFixed(2)}</p>
                            </div>
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                                <p className="text-sm text-gray-600 mb-1">Processing</p>
                                <p className="text-3xl font-bold text-gray-900">${parseFloat(stats.processingEarnings || 0).toFixed(2)}</p>
                            </div>
                        </div>
                    )}

                    {/* Filters and Withdraw Button */}
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex gap-3">
                            <select
                                value={filters.status}
                                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                                className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-black focus:border-transparent"
                            >
                                <option value="">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="processing">Processing</option>
                                <option value="completed">Completed</option>
                                <option value="failed">Failed</option>
                            </select>

                            <select
                                value={filters.type}
                                onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                                className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-black focus:border-transparent"
                            >
                                <option value="">All Types</option>
                                <option value="contest_win">Contest Win</option>
                                <option value="project_payment">Project Payment</option>
                                <option value="bonus">Bonus</option>
                                <option value="refund">Refund</option>
                            </select>
                        </div>

                        {stats && stats.pendingEarnings > 0 && (
                            <Button 
                                onClick={() => setShowWithdrawModal(true)}
                                className="bg-black text-white hover:bg-gray-800"
                            >
                                <ArrowDown className="h-4 w-4 mr-2" />
                                Request Withdrawal
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            {/* Earnings List */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {loading ? (
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                        <p className="mt-4 text-gray-600">Loading earnings...</p>
                    </div>
                ) : earnings.length === 0 ? (
                    <div className="text-center py-12">
                        <DollarSign className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No earnings yet</h3>
                        <p className="text-gray-600">Start winning contests or completing projects to earn money</p>
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="divide-y divide-gray-200">
                            {earnings.map((earning) => {
                                const badge = getStatusBadge(earning.status);
                                const StatusIcon = badge.icon;
                                
                                return (
                                    <div key={earning.id} className="p-6 hover:bg-gray-50 transition-colors">
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h3 className="font-semibold text-gray-900">
                                                        {getTypeLabel(earning.type)}
                                                    </h3>
                                                    <span className={`px-2 py-1 rounded text-xs font-medium flex items-center gap-1 ${badge.className}`}>
                                                        <StatusIcon className="h-3 w-3" />
                                                        {badge.label}
                                                    </span>
                                                </div>
                                                {earning.contest && (
                                                    <p className="text-sm text-gray-600 mb-1">
                                                        Contest: {earning.contest.title}
                                                    </p>
                                                )}
                                                {earning.description && (
                                                    <p className="text-sm text-gray-600">{earning.description}</p>
                                                )}
                                                <p className="text-xs text-gray-500 mt-2">
                                                    {formatDate(earning.createdAt)}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-2xl font-bold text-gray-900">
                                                    ${parseFloat(earning.amount).toFixed(2)}
                                                </p>
                                                {earning.paidAt && (
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        Paid: {formatDate(earning.paidAt)}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>

            {/* Withdraw Modal */}
            {showWithdrawModal && stats && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl max-w-md w-full">
                        <div className="p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Request Withdrawal</h2>
                            <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                                <p className="text-sm text-gray-600 mb-1">Available for withdrawal</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    ${parseFloat(stats.pendingEarnings).toFixed(2)}
                                </p>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Withdrawal Amount ($)
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    max={stats.pendingEarnings}
                                    step="0.01"
                                    value={withdrawAmount}
                                    onChange={(e) => setWithdrawAmount(e.target.value)}
                                    placeholder="0.00"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    Minimum withdrawal: $10.00
                                </p>
                            </div>
                            <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                                <p className="text-sm text-yellow-800">
                                    <strong>Note:</strong> Withdrawals are processed via Hyperwallet. 
                                    Please ensure your payment details are up to date in your profile settings.
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Button
                                    onClick={handleWithdraw}
                                    className="flex-1 bg-black text-white hover:bg-gray-800"
                                    disabled={!withdrawAmount || parseFloat(withdrawAmount) < 10}
                                >
                                    Request Withdrawal
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setShowWithdrawModal(false);
                                        setWithdrawAmount('');
                                    }}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

