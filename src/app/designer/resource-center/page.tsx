'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
    BookOpen, 
    TrendingUp, 
    Award, 
    Users, 
    Lightbulb,
    Target,
    CheckCircle2,
    ArrowRight,
    Star,
    Briefcase
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const RESOURCES = [
    {
        id: 1,
        category: 'Contest Strategy',
        title: 'How to Win More Contests',
        description: 'Learn proven strategies for selecting contests, creating winning designs, and building client relationships.',
        icon: Target,
        tips: [
            'Research the client\'s brand and industry before designing',
            'Submit early to get feedback and improve your design',
            'Read the brief carefully and address all requirements',
            'Create multiple concepts to show versatility',
            'Engage with client feedback professionally'
        ]
    },
    {
        id: 2,
        category: 'Portfolio Optimization',
        title: 'Build a Standout Portfolio',
        description: 'Optimize your portfolio to attract more clients and win more projects.',
        icon: Briefcase,
        tips: [
            'Showcase your best work first',
            'Include a variety of styles and categories',
            'Write compelling descriptions for each piece',
            'Update your portfolio regularly',
            'Use high-quality images and mockups',
            'Add case studies explaining your process'
        ]
    },
    {
        id: 3,
        category: 'Client Relationships',
        title: 'Convert Wins into Ongoing Work',
        description: 'Turn contest wins into long-term client relationships and repeat business.',
        icon: Users,
        tips: [
            'Deliver exceptional work on time',
            'Communicate clearly and professionally',
            'Offer additional services when appropriate',
            'Follow up after project completion',
            'Build a reputation for reliability',
            'Ask satisfied clients for testimonials'
        ]
    },
    {
        id: 4,
        category: 'Quality Standards',
        title: 'Maintain Professional Standards',
        description: 'Understand platform quality expectations and community guidelines.',
        icon: Award,
        tips: [
            'Always submit original work',
            'Respect intellectual property rights',
            'Meet or exceed client expectations',
            'Respond to feedback constructively',
            'Maintain professional communication',
            'Deliver files in requested formats'
        ]
    },
    {
        id: 5,
        category: 'Growth & Development',
        title: 'Level Up Your Design Skills',
        description: 'Resources and tips for advancing from Entry to Mid to Top Level designer.',
        icon: TrendingUp,
        tips: [
            'Consistently submit high-quality work',
            'Win contests to build your reputation',
            'Maintain a high client satisfaction rating',
            'Build a strong portfolio across categories',
            'Engage with the design community',
            'Stay updated with design trends'
        ]
    },
    {
        id: 6,
        category: 'Best Practices',
        title: 'Designer Best Practices',
        description: 'Essential tips and best practices for success on the platform.',
        icon: Lightbulb,
        tips: [
            'Set up your payment information early',
            'Keep your profile and portfolio updated',
            'Respond to messages within 24 hours',
            'Be selective about which contests you enter',
            'Focus on quality over quantity',
            'Build relationships, not just transactions'
        ]
    }
];

const TIER_INFO = {
    entry: {
        name: 'Entry Level',
        description: 'Starting your design journey',
        requirements: [
            'Complete profile setup',
            'Add at least 3 portfolio items',
            'Submit to your first contest'
        ],
        benefits: [
            'Access to all open contests',
            'Basic portfolio features',
            'Standard support'
        ]
    },
    mid: {
        name: 'Mid Level',
        description: 'Proven track record of quality work',
        requirements: [
            'Win at least 5 contests',
            'Maintain 4.5+ rating',
            'Complete 20+ successful projects',
            'Build portfolio with 10+ items'
        ],
        benefits: [
            'Priority contest access',
            'Featured portfolio placement',
            'Direct project invitations',
            'Enhanced support'
        ]
    },
    top: {
        name: 'Top Level',
        description: 'Elite designer status',
        requirements: [
            'Win 25+ contests',
            'Maintain 4.8+ rating',
            'Complete 50+ successful projects',
            'Exceptional client feedback'
        ],
        benefits: [
            'Exclusive high-value contests',
            'Premium portfolio features',
            'Priority client matching',
            'VIP support',
            'Designer spotlight opportunities'
        ]
    }
};

export default function DesignerResourceCenterPage() {
    const { user } = useAuth();
    const [expandedResource, setExpandedResource] = useState<number | null>(null);
    const currentLevel = (user as any)?.designerLevel || 'entry';
    const tierInfo = TIER_INFO[currentLevel as keyof typeof TIER_INFO] || TIER_INFO.entry;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Resource Center</h1>
                            <p className="text-gray-600 mt-1">Grow your design business with expert tips and resources</p>
                        </div>
                        <Link href="/designer/dashboard">
                            <Button variant="outline">Back to Dashboard</Button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Current Tier Status */}
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm opacity-90 mb-1">Your Current Level</p>
                            <h2 className="text-3xl font-bold mb-2">{tierInfo.name}</h2>
                            <p className="text-sm opacity-90">{tierInfo.description}</p>
                        </div>
                        <Award className="h-16 w-16 opacity-80" />
                    </div>
                </div>

                {/* Tier Progression */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {Object.entries(TIER_INFO).map(([level, info]) => {
                        const isCurrent = level === currentLevel;
                        const isUnlocked = 
                            level === 'entry' || 
                            (level === 'mid' && ['mid', 'top'].includes(currentLevel)) ||
                            (level === 'top' && currentLevel === 'top');

                        return (
                            <div
                                key={level}
                                className={`bg-white rounded-xl shadow-sm border-2 p-6 ${
                                    isCurrent 
                                        ? 'border-purple-500' 
                                        : isUnlocked 
                                            ? 'border-green-500' 
                                            : 'border-gray-200'
                                }`}
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-xl font-bold text-gray-900">{info.name}</h3>
                                    {isCurrent && (
                                        <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded">
                                            Current
                                        </span>
                                    )}
                                    {!isCurrent && isUnlocked && (
                                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                                    )}
                                </div>
                                <p className="text-sm text-gray-600 mb-4">{info.description}</p>
                                <div className="space-y-2">
                                    <p className="text-xs font-semibold text-gray-700 mb-2">Requirements:</p>
                                    {info.requirements.map((req, idx) => (
                                        <div key={idx} className="flex items-start gap-2">
                                            <CheckCircle2 className={`h-4 w-4 mt-0.5 flex-shrink-0 ${
                                                isUnlocked ? 'text-green-500' : 'text-gray-300'
                                            }`} />
                                            <p className={`text-xs ${
                                                isUnlocked ? 'text-gray-700' : 'text-gray-400'
                                            }`}>{req}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Resources */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Learning Resources</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {RESOURCES.map((resource) => {
                            const Icon = resource.icon;
                            const isExpanded = expandedResource === resource.id;

                            return (
                                <div
                                    key={resource.id}
                                    className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
                                >
                                    <div className="p-6">
                                        <div className="flex items-start gap-4 mb-4">
                                            <div className="p-3 bg-purple-100 rounded-lg">
                                                <Icon className="h-6 w-6 text-purple-600" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-xs font-semibold text-purple-600 mb-1">
                                                    {resource.category}
                                                </p>
                                                <h3 className="text-lg font-bold text-gray-900 mb-2">
                                                    {resource.title}
                                                </h3>
                                                <p className="text-sm text-gray-600">
                                                    {resource.description}
                                                </p>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => setExpandedResource(isExpanded ? null : resource.id)}
                                            className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                                        >
                                            {isExpanded ? 'Hide Tips' : 'View Tips'}
                                            <ArrowRight className={`h-4 w-4 transition-transform ${
                                                isExpanded ? 'rotate-90' : ''
                                            }`} />
                                        </button>

                                        {isExpanded && (
                                            <div className="mt-4 pt-4 border-t border-gray-200">
                                                <ul className="space-y-3">
                                                    {resource.tips.map((tip, idx) => (
                                                        <li key={idx} className="flex items-start gap-3">
                                                            <Star className="h-5 w-5 text-yellow-500 fill-yellow-500 flex-shrink-0 mt-0.5" />
                                                            <p className="text-sm text-gray-700">{tip}</p>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Quick Links */}
                <div className="mt-12 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Links</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Link href="/designer/contests" className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                            <Briefcase className="h-6 w-6 text-gray-900 mb-2" />
                            <p className="font-semibold text-gray-900">Browse Contests</p>
                            <p className="text-sm text-gray-600">Find new opportunities</p>
                        </Link>
                        <Link href="/designer/portfolio" className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                            <BookOpen className="h-6 w-6 text-gray-900 mb-2" />
                            <p className="font-semibold text-gray-900">My Portfolio</p>
                            <p className="text-sm text-gray-600">Showcase your work</p>
                        </Link>
                        <Link href="/designer/earnings" className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                            <TrendingUp className="h-6 w-6 text-gray-900 mb-2" />
                            <p className="font-semibold text-gray-900">Earnings</p>
                            <p className="text-sm text-gray-600">Track your income</p>
                        </Link>
                        <Link href="/designer/messages" className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                            <Users className="h-6 w-6 text-gray-900 mb-2" />
                            <p className="font-semibold text-gray-900">Messages</p>
                            <p className="text-sm text-gray-600">Connect with clients</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

