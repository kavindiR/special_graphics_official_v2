'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
    MessageSquare, 
    Send, 
    Search,
    Filter,
    Clock,
    CheckCircle2,
    User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { messagesApi } from '@/lib/api';

export default function DesignerMessagesPage() {
    const { user, isAuthenticated } = useAuth();
    const router = useRouter();
    const [messages, setMessages] = useState<any[]>([]);
    const [conversations, setConversations] = useState<Map<number, any[]>>(new Map());
    const [selectedConversation, setSelectedConversation] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);
    const [newMessage, setNewMessage] = useState('');
    const [filters, setFilters] = useState({
        search: '',
        isRead: ''
    });

    useEffect(() => {
        if (typeof window !== 'undefined' && (!isAuthenticated || user?.role !== 'designer')) {
            router.push('/auth');
            return;
        }
        loadMessages();
    }, [isAuthenticated, user, router]);

    // Dummy messages data
    const dummyMessages = [
        {
            id: 1,
            senderId: 10,
            receiverId: user?.id ? parseInt(user.id.toString()) : 1,
            sender: {
                id: 10,
                name: 'Tech Innovations Inc.',
                email: 'client@techinnovations.com',
                avatar: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=100&h=100&fit=crop'
            },
            receiver: {
                id: user?.id ? parseInt(user.id.toString()) : 1,
                name: user?.name || 'Designer',
                email: user?.email || 'designer@example.com',
                avatar: user?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
            },
            content: 'Hi! I really love your logo design submission. Could you make a few adjustments to the color scheme?',
            isRead: false,
            createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            contest: { id: 1, title: 'Modern Logo for Tech Startup', category: 'Logo Design' }
        },
        {
            id: 2,
            senderId: user?.id ? parseInt(user.id.toString()) : 1,
            receiverId: 10,
            sender: {
                id: user?.id ? parseInt(user.id.toString()) : 1,
                name: user?.name || 'Designer',
                email: user?.email || 'designer@example.com',
                avatar: user?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
            },
            receiver: {
                id: 10,
                name: 'Tech Innovations Inc.',
                email: 'client@techinnovations.com',
                avatar: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=100&h=100&fit=crop'
            },
            content: 'Of course! I\'d be happy to adjust the colors. What specific changes would you like?',
            isRead: true,
            createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
            contest: { id: 1, title: 'Modern Logo for Tech Startup', category: 'Logo Design' }
        },
        {
            id: 3,
            senderId: 11,
            receiverId: user?.id ? parseInt(user.id.toString()) : 1,
            sender: {
                id: 11,
                name: 'Fashion Forward',
                email: 'contact@fashionforward.com',
                avatar: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop'
            },
            receiver: {
                id: user?.id ? parseInt(user.id.toString()) : 1,
                name: user?.name || 'Designer',
                email: user?.email || 'designer@example.com',
                avatar: user?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
            },
            content: 'Congratulations! Your design has been selected as a finalist. We\'ll be making a decision soon.',
            isRead: false,
            createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
            contest: { id: 2, title: 'Brand Identity Package', category: 'Branding' }
        },
        {
            id: 4,
            senderId: 12,
            receiverId: user?.id ? parseInt(user.id.toString()) : 1,
            sender: {
                id: 12,
                name: 'Digital Solutions Co.',
                email: 'hello@digitalsolutions.com',
                avatar: 'https://images.unsplash.com/photo-1633409361618-c73427e4e206?w=100&h=100&fit=crop'
            },
            receiver: {
                id: user?.id ? parseInt(user.id.toString()) : 1,
                name: user?.name || 'Designer',
                email: user?.email || 'designer@example.com',
                avatar: user?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
            },
            content: 'We\'re interested in hiring you for a direct project. Would you be available for a 1-to-1 project?',
            isRead: true,
            createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
            contest: null
        }
    ];

    const loadMessages = async () => {
        try {
            setLoading(true);
            const response = await messagesApi.getMyMessages({
                isRead: filters.isRead !== '' ? filters.isRead === 'true' : undefined
            });
            if (response.success && response.data && response.data.length > 0) {
                setMessages(response.data);
                organizeConversations(response.data);
            } else {
                // Use dummy data if API returns empty
                let filtered = dummyMessages;
                if (filters.isRead !== '') {
                    const isRead = filters.isRead === 'true';
                    filtered = filtered.filter(m => {
                        const userId = user?.id ? parseInt(user.id.toString()) : 1;
                        return m.receiverId === userId ? m.isRead === isRead : true;
                    });
                }
                setMessages(filtered);
                organizeConversations(filtered);
            }
        } catch (error) {
            console.error('Error loading messages:', error);
            // Use dummy data on error
            let filtered = dummyMessages;
            if (filters.isRead !== '') {
                const isRead = filters.isRead === 'true';
                filtered = filtered.filter(m => {
                    const userId = user?.id ? parseInt(user.id.toString()) : 1;
                    return m.receiverId === userId ? m.isRead === isRead : true;
                });
            }
            setMessages(filtered);
            organizeConversations(filtered);
        } finally {
            setLoading(false);
        }
    };

    const organizeConversations = (msgs: any[]) => {
        const convMap = new Map<number, any[]>();
        const userId = user?.id ? parseInt(user.id.toString()) : 0;

        msgs.forEach(msg => {
            const otherUserId = msg.senderId === userId ? msg.receiverId : msg.senderId;
            if (!convMap.has(otherUserId)) {
                convMap.set(otherUserId, []);
            }
            convMap.get(otherUserId)!.push(msg);
        });

        // Sort each conversation by date
        convMap.forEach((msgs, userId) => {
            msgs.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        });

        setConversations(convMap);
    };

    useEffect(() => {
        loadMessages();
    }, [filters.isRead]);

    const loadConversation = async (otherUserId: number) => {
        try {
            const response = await messagesApi.getConversation(otherUserId);
            if (response.success && response.data) {
                const convMap = new Map(conversations);
                convMap.set(otherUserId, response.data);
                setConversations(convMap);
                setSelectedConversation(otherUserId);
            }
        } catch (error) {
            console.error('Error loading conversation:', error);
        }
    };

    const handleSendMessage = async (receiverId: number) => {
        if (!newMessage.trim()) return;

        try {
            setSending(true);
            const response = await messagesApi.send({
                receiverId,
                content: newMessage
            });

            if (response.success && response.data) {
                setNewMessage('');
                loadConversation(receiverId);
                loadMessages(); // Refresh to update unread counts
            } else {
                alert(response.error?.message || 'Failed to send message');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            alert('Failed to send message');
        } finally {
            setSending(false);
        }
    };

    const getOtherUser = (message: any) => {
        const userId = user?.id ? parseInt(user.id.toString()) : 0;
        return message.senderId === userId ? message.receiver : message.sender;
    };

    const getUnreadCount = (userId: number) => {
        const userIdNum = user?.id ? parseInt(user.id.toString()) : 0;
        return conversations.get(userId)?.filter(msg => 
            msg.receiverId === userIdNum && !msg.isRead
        ).length || 0;
    };

    const formatDate = (date: string) => {
        const msgDate = new Date(date);
        const now = new Date();
        const diff = now.getTime() - msgDate.getTime();
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

        if (days === 0) {
            return msgDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        } else if (days === 1) {
            return 'Yesterday';
        } else if (days < 7) {
            return msgDate.toLocaleDateString('en-US', { weekday: 'short' });
        } else {
            return msgDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        }
    };

    const conversationList = Array.from(conversations.entries()).map(([userId, msgs]) => {
        const lastMessage = msgs[msgs.length - 1];
        const otherUser = getOtherUser(lastMessage);
        return { userId, otherUser, lastMessage, unreadCount: getUnreadCount(userId) };
    }).sort((a, b) => 
        new Date(b.lastMessage.createdAt).getTime() - new Date(a.lastMessage.createdAt).getTime()
    );

    const currentConversation = selectedConversation ? conversations.get(selectedConversation) : null;
    const currentOtherUser = currentConversation && currentConversation.length > 0 
        ? getOtherUser(currentConversation[0]) 
        : null;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
                            <p className="text-gray-600 mt-1">Communicate with clients about contests and projects</p>
                        </div>
                        <Link href="/designer/dashboard">
                            <Button variant="outline">Back to Dashboard</Button>
                        </Link>
                    </div>

                    {/* Filters */}
                    <div className="flex gap-3">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search messages..."
                                value={filters.search}
                                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                            />
                        </div>
                        <select
                            value={filters.isRead}
                            onChange={(e) => setFilters({ ...filters, isRead: e.target.value })}
                            className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-black focus:border-transparent"
                        >
                            <option value="">All Messages</option>
                            <option value="false">Unread Only</option>
                            <option value="true">Read Only</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {loading ? (
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                        <p className="mt-4 text-gray-600">Loading messages...</p>
                    </div>
                ) : conversationList.length === 0 ? (
                    <div className="text-center py-12">
                        <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No messages yet</h3>
                        <p className="text-gray-600">Start communicating with clients about your work</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Conversations List */}
                        <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
                                {conversationList.map((conv) => (
                                    <button
                                        key={conv.userId}
                                        onClick={() => loadConversation(conv.userId)}
                                        className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
                                            selectedConversation === conv.userId ? 'bg-gray-50' : ''
                                        }`}
                                    >
                                        <div className="flex items-start gap-3">
                                            {conv.otherUser?.avatar ? (
                                                <img 
                                                    src={conv.otherUser.avatar} 
                                                    alt={conv.otherUser.name}
                                                    className="h-10 w-10 rounded-full"
                                                />
                                            ) : (
                                                <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                                                    <User className="h-5 w-5 text-gray-600" />
                                                </div>
                                            )}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between mb-1">
                                                    <p className="font-semibold text-gray-900 truncate">
                                                        {conv.otherUser?.name || 'Unknown User'}
                                                    </p>
                                                    {conv.unreadCount > 0 && (
                                                        <span className="bg-blue-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0">
                                                            {conv.unreadCount}
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-sm text-gray-600 truncate">
                                                    {conv.lastMessage.content}
                                                </p>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    {formatDate(conv.lastMessage.createdAt)}
                                                </p>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Message Thread */}
                        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col">
                            {currentConversation && currentOtherUser ? (
                                <>
                                    {/* Header */}
                                    <div className="p-4 border-b border-gray-200">
                                        <div className="flex items-center gap-3">
                                            {currentOtherUser.avatar ? (
                                                <img 
                                                    src={currentOtherUser.avatar} 
                                                    alt={currentOtherUser.name}
                                                    className="h-10 w-10 rounded-full"
                                                />
                                            ) : (
                                                <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                                                    <User className="h-5 w-5 text-gray-600" />
                                                </div>
                                            )}
                                            <div>
                                                <p className="font-semibold text-gray-900">{currentOtherUser.name}</p>
                                                <p className="text-sm text-gray-600">{currentOtherUser.email}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Messages */}
                                    <div className="flex-1 p-4 overflow-y-auto max-h-[500px] space-y-4">
                                        {currentConversation.map((msg: any) => {
                                            const isSender = msg.senderId === (user?.id ? parseInt(user.id.toString()) : 0);
                                            return (
                                                <div
                                                    key={msg.id}
                                                    className={`flex ${isSender ? 'justify-end' : 'justify-start'}`}
                                                >
                                                    <div className={`max-w-[70%] rounded-lg p-3 ${
                                                        isSender 
                                                            ? 'bg-black text-white' 
                                                            : 'bg-gray-100 text-gray-900'
                                                    }`}>
                                                        <p className="text-sm">{msg.content}</p>
                                                        <p className={`text-xs mt-1 ${
                                                            isSender ? 'text-gray-300' : 'text-gray-500'
                                                        }`}>
                                                            {formatDate(msg.createdAt)}
                                                        </p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* Input */}
                                    <div className="p-4 border-t border-gray-200">
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={newMessage}
                                                onChange={(e) => setNewMessage(e.target.value)}
                                                onKeyPress={(e) => {
                                                    if (e.key === 'Enter' && !e.shiftKey) {
                                                        e.preventDefault();
                                                        handleSendMessage(selectedConversation!);
                                                    }
                                                }}
                                                placeholder="Type a message..."
                                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                                            />
                                            <Button
                                                onClick={() => handleSendMessage(selectedConversation!)}
                                                disabled={!newMessage.trim() || sending}
                                                className="bg-black text-white hover:bg-gray-800"
                                            >
                                                <Send className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="flex-1 flex items-center justify-center p-8">
                                    <div className="text-center">
                                        <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                                        <p className="text-gray-600">Select a conversation to start messaging</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

