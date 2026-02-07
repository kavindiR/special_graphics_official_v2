'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, ChevronRight, HelpCircle, Book, MessageCircle, Mail, Phone, FileText, Video, Download } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function HelpPage() {
    const [searchQuery, setSearchQuery] = useState('');

    const popularArticles = [
        {
            title: 'How to start a design contest',
            category: 'Getting Started',
            description: 'Learn how to create and launch your first design contest',
            icon: <FileText className="h-5 w-5" />
        },
        {
            title: 'How to submit designs',
            category: 'For Designers',
            description: 'Step-by-step guide to submitting your designs',
            icon: <FileText className="h-5 w-5" />
        },
        {
            title: 'Payment and pricing',
            category: 'Billing',
            description: 'Everything you need to know about payments',
            icon: <FileText className="h-5 w-5" />
        },
        {
            title: 'Account settings',
            category: 'Account',
            description: 'Manage your account preferences and settings',
            icon: <FileText className="h-5 w-5" />
        }
    ];

    const helpCategories = [
        {
            title: 'Getting Started',
            description: 'New to Special Graphics? Start here',
            articles: [
                'How to create an account',
                'How to start a design contest',
                'How to find a designer',
                'How to submit designs'
            ],
            icon: <Book className="h-6 w-6" />
        },
        {
            title: 'For Clients',
            description: 'Everything you need to know as a client',
            articles: [
                'Running a design contest',
                'Working with designers',
                'Reviewing and selecting designs',
                'Payment and refunds'
            ],
            icon: <HelpCircle className="h-6 w-6" />
        },
        {
            title: 'For Designers',
            description: 'Resources for our designer community',
            articles: [
                'How to submit designs',
                'Portfolio tips',
                'Earnings and payouts',
                'Designer levels'
            ],
            icon: <Book className="h-6 w-6" />
        },
        {
            title: 'Account & Billing',
            description: 'Manage your account and payments',
            articles: [
                'Account settings',
                'Payment methods',
                'Billing questions',
                'Subscription management'
            ],
            icon: <FileText className="h-6 w-6" />
        }
    ];

    const contactOptions = [
        {
            title: 'Email Support',
            description: 'Get help via email',
            icon: <Mail className="h-5 w-5" />,
            action: 'support@specialgraphics.com',
            link: 'mailto:support@specialgraphics.com'
        },
        {
            title: 'Live Chat',
            description: 'Chat with our support team',
            icon: <MessageCircle className="h-5 w-5" />,
            action: 'Start chat',
            link: '#'
        },
        {
            title: 'Phone Support',
            description: 'Call us for immediate assistance',
            icon: <Phone className="h-5 w-5" />,
            action: '1-800-513-1675',
            link: 'tel:18005131675'
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="bg-gradient-to-b from-gray-50 to-white py-16 lg:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto">
                        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                            How can we help you?
                        </h1>
                        <p className="text-lg text-gray-600 mb-8">
                            Search our help center or browse popular articles below
                        </p>
                        
                        {/* Search Bar */}
                        <div className="relative max-w-2xl mx-auto">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <Input
                                type="text"
                                placeholder="Search for help articles..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-12 pr-4 py-6 text-lg border-2 border-gray-300 focus:border-gray-900 rounded-lg"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Popular Articles */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {popularArticles.map((article, index) => (
                        <Link
                            key={index}
                            href={`/help/article/${article.title.toLowerCase().replace(/\s+/g, '-')}`}
                            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow group"
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <div className="text-gray-400 group-hover:text-gray-900 transition-colors">
                                    {article.icon}
                                </div>
                                <span className="text-xs font-semibold text-gray-500 uppercase">
                                    {article.category}
                                </span>
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-gray-600 transition-colors">
                                {article.title}
                            </h3>
                            <p className="text-sm text-gray-600">{article.description}</p>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Help Categories */}
            <div className="bg-gray-50 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">Browse by Category</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {helpCategories.map((category, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="bg-gray-100 rounded-lg p-3 text-gray-600">
                                        {category.icon}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                                            {category.title}
                                        </h3>
                                        <p className="text-gray-600 mb-4">{category.description}</p>
                                        <ul className="space-y-2">
                                            {category.articles.map((article, articleIndex) => (
                                                <li key={articleIndex}>
                                                    <Link
                                                        href={`/help/article/${article.toLowerCase().replace(/\s+/g, '-')}`}
                                                        className="text-sm text-gray-700 hover:text-gray-900 flex items-center gap-2 group"
                                                    >
                                                        <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                                                        {article}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Contact Support */}
            <div className="bg-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                        Still need help? Contact our support team
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {contactOptions.map((option, index) => (
                            <Link
                                key={index}
                                href={option.link}
                                className="bg-gray-50 rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow text-center group"
                            >
                                <div className="flex justify-center mb-4">
                                    <div className="bg-white rounded-full p-4 text-gray-600 group-hover:text-gray-900 transition-colors">
                                        {option.icon}
                                    </div>
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-2">{option.title}</h3>
                                <p className="text-sm text-gray-600 mb-4">{option.description}</p>
                                <Button
                                    variant="outline"
                                    className="w-full group-hover:bg-gray-900 group-hover:text-white transition-colors"
                                >
                                    {option.action}
                                </Button>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Resources */}
            <div className="bg-gray-50 py-12 border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Additional Resources</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Link
                            href="/help/video-tutorials"
                            className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                        >
                            <Video className="h-5 w-5 text-gray-600" />
                            <span className="text-gray-900 font-medium">Video Tutorials</span>
                        </Link>
                        <Link
                            href="/help/downloads"
                            className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                        >
                            <Download className="h-5 w-5 text-gray-600" />
                            <span className="text-gray-900 font-medium">Downloads & Resources</span>
                        </Link>
                        <Link
                            href="/help/community"
                            className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                        >
                            <MessageCircle className="h-5 w-5 text-gray-600" />
                            <span className="text-gray-900 font-medium">Community Forum</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

