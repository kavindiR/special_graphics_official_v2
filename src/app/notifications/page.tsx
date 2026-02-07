'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
    Bell, 
    CheckCircle2, 
    XCircle, 
    AlertCircle, 
    Info, 
    Trophy,
    MessageSquare,
    DollarSign,
    Clock,
    Filter,
    Check,
    X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Notification {
    id: number;
    type: 'success' | 'info' | 'warning' | 'error';
    title: string;
    message: string;
    timestamp: Date;
    isRead: boolean;
    link?: string;
    category: 'contest' | 'payment' | 'message' | 'system' | 'achievement';
}

export default function NotificationsPage() {
    const { user, isAuthenticated } = useAuth();
    const router = useRouter();
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
    const [categoryFilter, setCategoryFilter] = useState<string>('all');

    useEffect(() => {
        if (typeof window !== 'undefined' && !isAuthenticated) {
            router.push('/auth');
            return;
        }
        loadNotifications();
    }, [isAuthenticated, router]);

    const loadNotifications = () => {
        // Dummy notifications data
        const dummyNotifications: Notification[] = [
            {
                id: 1,
                type: 'success',
                title: 'Contest Win!',
                message: 'Congratulations! Your design won the "Modern Logo for Tech Startup" contest.',
                timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
                isRead: false,
                link: '/designer/contests',
                category: 'contest'
            },
            {
                id: 2,
                type: 'info',
                title: 'New Message',
                message: 'You have a new message from Tech Innovations Inc.',
                timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
                isRead: false,
                link: '/designer/messages',
                category: 'message'
            },
            {
                id: 3,
                type: 'success',
                title: 'Payment Received',
                message: 'Your payment of $299 has been processed and is now available for withdrawal.',
                timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
                isRead: true,
                link: '/designer/earnings',
                category: 'payment'
            },
            {
                id: 4,
                type: 'info',
                title: 'New Contest Available',
                message: 'A new contest matching your skills has been posted: "Brand Identity Package".',
                timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
                isRead: false,
                link: '/designer/contests',
                category: 'contest'
            },
            {
                id: 5,
                type: 'success',
                title: 'Achievement Unlocked',
                message: 'You\'ve reached Top Level Designer! Unlock new opportunities.',
                timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
                isRead: true,
                link: '/designer/profile',
                category: 'achievement'
            },
            {
                id: 6,
                type: 'warning',
                title: 'Deadline Reminder',
                message: 'Your submission for "Website Redesign" contest is due in 24 hours.',
                timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
                isRead: false,
                link: '/designer/contests',
                category: 'contest'
            },
            {
                id: 7,
                type: 'info',
                title: 'Profile Update',
                message: 'Your profile has been viewed 50 times this week!',
                timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
                isRead: true,
                link: '/designer/profile',
                category: 'system'
            },
            {
                id: 8,
                type: 'success',
                title: 'Withdrawal Processed',
                message: 'Your withdrawal request of $500 has been processed successfully.',
                timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
                isRead: true,
                link: '/designer/earnings',
                category: 'payment'
            }
        ];
        setNotifications(dummyNotifications);
    };

    const getNotificationIcon = (type: string, category: string) => {
        if (category === 'achievement') return <Trophy className="h-5 w-5" />;
        if (category === 'message') return <MessageSquare className="h-5 w-5" />;
        if (category === 'payment') return <DollarSign className="h-5 w-5" />;
        if (category === 'contest') return <Bell className="h-5 w-5" />;
        
        switch (type) {
            case 'success':
                return <CheckCircle2 className="h-5 w-5" />;
            case 'error':
                return <XCircle className="h-5 w-5" />;
            case 'warning':
                return <AlertCircle className="h-5 w-5" />;
            default:
                return <Info className="h-5 w-5" />;
        }
    };

    const getNotificationColor = (type: string) => {
        switch (type) {
            case 'success':
                return 'text-green-600 bg-green-50 border-green-200';
            case 'error':
                return 'text-red-600 bg-red-50 border-red-200';
            case 'warning':
                return 'text-yellow-600 bg-yellow-50 border-yellow-200';
            default:
                return 'text-blue-600 bg-blue-50 border-blue-200';
        }
    };

    const markAsRead = (id: number) => {
        setNotifications(prev =>
            prev.map(notif => notif.id === id ? { ...notif, isRead: true } : notif)
        );
    };

    const markAllAsRead = () => {
        setNotifications(prev =>
            prev.map(notif => ({ ...notif, isRead: true }))
        );
    };

    const deleteNotification = (id: number) => {
        setNotifications(prev => prev.filter(notif => notif.id !== id));
    };

    const formatTimestamp = (date: Date) => {
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (minutes < 60) {
            return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
        } else if (hours < 24) {
            return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
        } else if (days < 7) {
            return `${days} day${days !== 1 ? 's' : ''} ago`;
        } else {
            return date.toLocaleDateString();
        }
    };

    const filteredNotifications = notifications.filter(notif => {
        const matchesFilter = filter === 'all' || 
            (filter === 'unread' && !notif.isRead) || 
            (filter === 'read' && notif.isRead);
        const matchesCategory = categoryFilter === 'all' || notif.category === categoryFilter;
        return matchesFilter && matchesCategory;
    });

    const unreadCount = notifications.filter(n => !n.isRead).length;

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
                        <p className="text-gray-600 mt-1">
                            {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}` : 'All caught up!'}
                        </p>
                    </div>
                    {unreadCount > 0 && (
                        <Button onClick={markAllAsRead} variant="outline" size="sm">
                            <Check className="h-4 w-4 mr-2" />
                            Mark all as read
                        </Button>
                    )}
                </div>

                {/* Filters */}
                <div className="flex flex-wrap items-center gap-4 mb-6">
                    <div className="flex items-center gap-2">
                        <Filter className="h-4 w-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">Filter:</span>
                    </div>
                    <div className="flex gap-2">
                        {(['all', 'unread', 'read'] as const).map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                    filter === f
                                        ? 'bg-gray-900 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                {f.charAt(0).toUpperCase() + f.slice(1)}
                            </button>
                        ))}
                    </div>
                    <div className="flex gap-2 ml-auto">
                        {(['all', 'contest', 'payment', 'message', 'achievement', 'system'] as const).map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setCategoryFilter(cat)}
                                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                                    categoryFilter === cat
                                        ? 'bg-gray-900 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                {cat.charAt(0).toUpperCase() + cat.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Notifications List */}
                {filteredNotifications.length === 0 ? (
                    <div className="text-center py-16 bg-gray-50 rounded-lg">
                        <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No notifications</h3>
                        <p className="text-gray-600">
                            {filter === 'unread' 
                                ? "You're all caught up! No unread notifications."
                                : "No notifications match your filters."}
                        </p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {filteredNotifications.map((notification) => (
                            <div
                                key={notification.id}
                                className={`border rounded-lg p-4 transition-all ${
                                    notification.isRead
                                        ? 'bg-white border-gray-200'
                                        : 'bg-blue-50 border-blue-200'
                                } ${getNotificationColor(notification.type)}`}
                            >
                                <div className="flex items-start gap-4">
                                    <div className={`flex-shrink-0 mt-0.5 ${getNotificationColor(notification.type).split(' ')[0]}`}>
                                        {getNotificationIcon(notification.type, notification.category)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h3 className="font-semibold text-gray-900">
                                                        {notification.title}
                                                    </h3>
                                                    {!notification.isRead && (
                                                        <Badge variant="default" className="bg-blue-600 text-white text-xs">
                                                            New
                                                        </Badge>
                                                    )}
                                                </div>
                                                <p className="text-sm text-gray-700 mb-2">
                                                    {notification.message}
                                                </p>
                                                <div className="flex items-center gap-4">
                                                    <span className="text-xs text-gray-500 flex items-center gap-1">
                                                        <Clock className="h-3 w-3" />
                                                        {formatTimestamp(notification.timestamp)}
                                                    </span>
                                                    {notification.link && (
                                                        <Link
                                                            href={notification.link}
                                                            className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                                                            onClick={() => markAsRead(notification.id)}
                                                        >
                                                            View details →
                                                        </Link>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {!notification.isRead && (
                                                    <button
                                                        onClick={() => markAsRead(notification.id)}
                                                        className="p-1 hover:bg-white rounded transition-colors"
                                                        title="Mark as read"
                                                    >
                                                        <Check className="h-4 w-4 text-gray-600" />
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => deleteNotification(notification.id)}
                                                    className="p-1 hover:bg-white rounded transition-colors"
                                                    title="Delete"
                                                >
                                                    <X className="h-4 w-4 text-gray-600" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

