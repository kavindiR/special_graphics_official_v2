'use client';

import { useState } from 'react';
import { ArrowRight, CheckCircle2, Users, Clock, Trophy, DollarSign, Shield, Sparkles, Zap, Award, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import Image from 'next/image';

export default function StartContestPage() {
    const { isAuthenticated } = useAuth();
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [contestTitle, setContestTitle] = useState('');
    const [budget, setBudget] = useState('');
    const [description, setDescription] = useState('');

    const categories = [
        { id: 'logo', label: 'Logo & Brand Identity', icon: '🎨', color: 'from-purple-500 to-pink-500' },
        { id: 'web', label: 'Web & App Design', icon: '💻', color: 'from-blue-500 to-cyan-500' },
        { id: 'business', label: 'Business & Advertising', icon: '📊', color: 'from-green-500 to-emerald-500' },
        { id: 'clothing', label: 'Clothing & Merchandise', icon: '👕', color: 'from-orange-500 to-red-500' },
        { id: 'art', label: 'Art & Illustration', icon: '🖼️', color: 'from-pink-500 to-rose-500' },
        { id: 'packaging', label: 'Packaging & Label', icon: '📦', color: 'from-indigo-500 to-purple-500' },
        { id: 'book', label: 'Book & Magazine', icon: '📚', color: 'from-amber-500 to-yellow-500' },
    ];

    const pricingTiers = [
        {
            name: 'Bronze',
            price: 299,
            entries: '30+',
            guaranteed: false,
            features: ['30+ design concepts', '7-day contest', 'Money-back guarantee'],
            popular: false,
            color: 'border-gray-300'
        },
        {
            name: 'Silver',
            price: 499,
            entries: '60+',
            guaranteed: true,
            features: ['60+ design concepts', '7-day contest', 'Guaranteed prize', 'Money-back guarantee'],
            popular: false,
            color: 'border-gray-300'
        },
        {
            name: 'Gold',
            price: 799,
            entries: '90+',
            guaranteed: true,
            features: ['90+ design concepts', '7-day contest', 'Guaranteed prize', 'Top-level designers', 'Money-back guarantee'],
            popular: true,
            color: 'border-[#ff00cc] ring-2 ring-[#ff00cc]/20'
        },
        {
            name: 'Platinum',
            price: 1299,
            entries: '120+',
            guaranteed: true,
            features: ['120+ design concepts', '7-day contest', 'Guaranteed prize', 'Top-level designers only', 'Priority support', 'Money-back guarantee'],
            popular: false,
            color: 'border-gray-300'
        }
    ];

    const handleStartContest = () => {
        if (!isAuthenticated) {
            window.location.href = '/auth';
            return;
        }
        // Show success message and navigate
        alert('Contest creation feature coming soon! For now, you can browse existing contests.');
    };

    return (
        <div className="min-h-screen bg-white font-sans text-slate-800">
            {/* Hero Section */}
            <section className="relative bg-[#0a0015] text-white overflow-hidden min-h-[500px] md:min-h-[600px] flex items-center z-10">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
                        backgroundSize: '40px 40px'
                    }}></div>
                </div>
                
                <div className="max-w-[1200px] mx-auto px-4 lg:px-8 relative z-10 w-full py-20">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
                            <Sparkles className="h-4 w-4 text-[#ff00cc]" />
                            <span className="text-sm font-medium">Get Multiple Design Concepts</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight drop-shadow-lg">
                            Start Your Design Contest
                        </h1>
                        <p className="text-gray-200 mb-8 max-w-2xl text-base md:text-lg leading-relaxed drop-shadow-md">
                            Get dozens of unique design concepts from talented designers around the world. Choose your favorite and work with the designer to perfect it.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={handleStartContest}
                                className="bg-[#ff00cc] hover:bg-[#e600b8] text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors shadow-lg flex items-center justify-center gap-2"
                            >
                                Start Your Contest
                                <ArrowRight className="w-5 h-5" />
                            </button>
                            <Link href="/contest">
                                <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors">
                                    Browse Contests
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Decorative Wave Bottom */}
                <div className="absolute bottom-0 w-full h-16 z-20">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-full absolute bottom-0 translate-y-1/2">
                        <path fill="#ffffff" fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,250.7C960,235,1056,181,1152,165.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                    </svg>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-16 md:py-20 bg-white">
                <div className="max-w-[1200px] mx-auto px-4 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-[#222] leading-tight mb-4">
                            How It Works
                        </h2>
                        <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
                            A simple process to get the perfect design for your business
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6">
                        <div className="text-center group">
                            <div className="relative inline-flex items-center justify-center mb-6">
                                <div className="absolute inset-0 bg-gray-100 rounded-full group-hover:bg-gray-200 transition-colors"></div>
                                <div className="relative bg-white border-2 border-gray-200 w-20 h-20 rounded-full flex items-center justify-center group-hover:border-[#ff00cc] transition-colors">
                                    <span className="text-2xl font-bold text-gray-800">1</span>
                                </div>
                            </div>
                            <h3 className="font-bold text-lg mb-2 text-gray-800">Start Your Contest</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">Describe your design needs and set your budget</p>
                        </div>
                        
                        <div className="text-center group">
                            <div className="relative inline-flex items-center justify-center mb-6">
                                <div className="absolute inset-0 bg-gray-100 rounded-full group-hover:bg-gray-200 transition-colors"></div>
                                <div className="relative bg-white border-2 border-gray-200 w-20 h-20 rounded-full flex items-center justify-center group-hover:border-[#ff00cc] transition-colors">
                                    <Users className="h-8 w-8 text-gray-700" />
                                </div>
                            </div>
                            <h3 className="font-bold text-lg mb-2 text-gray-800">Designers Compete</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">Multiple designers submit concepts for your project</p>
                        </div>
                        
                        <div className="text-center group">
                            <div className="relative inline-flex items-center justify-center mb-6">
                                <div className="absolute inset-0 bg-gray-100 rounded-full group-hover:bg-gray-200 transition-colors"></div>
                                <div className="relative bg-white border-2 border-gray-200 w-20 h-20 rounded-full flex items-center justify-center group-hover:border-[#ff00cc] transition-colors">
                                    <Trophy className="h-8 w-8 text-gray-700" />
                                </div>
                            </div>
                            <h3 className="font-bold text-lg mb-2 text-gray-800">Choose Winner</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">Select your favorite design and provide feedback</p>
                        </div>
                        
                        <div className="text-center group">
                            <div className="relative inline-flex items-center justify-center mb-6">
                                <div className="absolute inset-0 bg-gray-100 rounded-full group-hover:bg-gray-200 transition-colors"></div>
                                <div className="relative bg-white border-2 border-gray-200 w-20 h-20 rounded-full flex items-center justify-center group-hover:border-[#ff00cc] transition-colors">
                                    <CheckCircle2 className="h-8 w-8 text-gray-700" />
                                </div>
                            </div>
                            <h3 className="font-bold text-lg mb-2 text-gray-800">Get Final Design</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">Work with the winner to perfect your design</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Tiers */}
            <section className="py-16 md:py-20 bg-gray-50">
                <div className="max-w-[1200px] mx-auto px-4 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-[#222] leading-tight mb-4">
                            Choose Your Package
                        </h2>
                        <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
                            Select the package that best fits your needs and budget
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {pricingTiers.map((tier) => (
                            <div 
                                key={tier.name} 
                                className={`bg-white rounded-lg shadow-sm border-2 p-6 transition-all hover:shadow-md ${tier.color} ${
                                    tier.popular ? 'relative' : ''
                                }`}
                            >
                                {tier.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#ff00cc] text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                                        MOST POPULAR
                                    </div>
                                )}
                                
                                <div className="mb-6">
                                    <h3 className="text-2xl font-bold mb-2 text-gray-800">{tier.name}</h3>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-4xl font-extrabold text-gray-900">${tier.price}</span>
                                        <span className="text-gray-600 text-sm">USD</span>
                                    </div>
                                </div>
                                
                                <div className="mb-6 space-y-3">
                                    <div className="flex items-center gap-2">
                                        <Users className="h-5 w-5 text-gray-600 flex-shrink-0" />
                                        <span className="font-semibold text-sm text-gray-800">{tier.entries} design concepts</span>
                                    </div>
                                    {tier.guaranteed && (
                                        <div className="flex items-center gap-2">
                                            <Shield className="h-5 w-5 text-green-600 flex-shrink-0" />
                                            <span className="text-sm text-gray-600">Guaranteed prize</span>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-5 w-5 text-gray-600 flex-shrink-0" />
                                        <span className="text-sm text-gray-600">7-day contest</span>
                                    </div>
                                </div>
                                
                                <ul className="space-y-2 mb-6">
                                    {tier.features.map((feature, index) => (
                                        <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                                            <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                
                                <Button 
                                    className={`w-full ${
                                        tier.popular 
                                            ? 'bg-[#ff00cc] hover:bg-[#d900ad] text-white shadow-[0_0_20px_rgba(255,0,204,0.3)]' 
                                            : 'bg-[#333] hover:bg-black text-white'
                                    } transition-all`}
                                    onClick={handleStartContest}
                                >
                                    Start {tier.name} Contest
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Quick Start Form */}
            <section className="py-16 md:py-20 bg-white">
                <div className="max-w-4xl mx-auto px-4 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-[#222] leading-tight mb-4">
                            Quick Start Your Contest
                        </h2>
                        <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
                            Fill out the form below to get started on your design journey
                        </p>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-8 md:p-10 border border-gray-200">
                        <div className="space-y-8">
                            <div>
                                <label className="block text-sm font-semibold text-gray-800 mb-4">
                                    What do you need designed?
                                </label>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {categories.map((category) => (
                                        <button
                                            key={category.id}
                                            type="button"
                                            onClick={() => setSelectedCategory(category.id)}
                                            className={`group relative p-5 rounded-lg border-2 transition-all overflow-hidden ${
                                                selectedCategory === category.id
                                                    ? 'border-[#ff00cc] bg-white shadow-md'
                                                    : 'border-gray-200 hover:border-gray-300 bg-white'
                                            }`}
                                        >
                                            {selectedCategory === category.id && (
                                                <div className="absolute inset-0 bg-gradient-to-br from-[#ff00cc]/5 to-transparent"></div>
                                            )}
                                            <div className="text-3xl mb-2 relative z-10">{category.icon}</div>
                                            <div className={`text-sm font-medium relative z-10 ${
                                                selectedCategory === category.id ? 'text-gray-900' : 'text-gray-700'
                                            }`}>
                                                {category.label}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-800 mb-2">
                                    Contest Title
                                </label>
                                <Input
                                    placeholder="e.g., Modern Logo for Tech Startup"
                                    value={contestTitle}
                                    onChange={(e) => setContestTitle(e.target.value)}
                                    className="w-full border-gray-300 focus:border-[#ff00cc] focus:ring-[#ff00cc]"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-800 mb-2">
                                    Budget (USD)
                                </label>
                                <div className="relative">
                                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <Input
                                        type="number"
                                        placeholder="299"
                                        value={budget}
                                        onChange={(e) => setBudget(e.target.value)}
                                        className="w-full pl-10 border-gray-300 focus:border-[#ff00cc] focus:ring-[#ff00cc]"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-800 mb-2">
                                    Description
                                </label>
                                <textarea
                                    placeholder="Describe your design needs, style preferences, and any specific requirements..."
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff00cc] focus:border-[#ff00cc] min-h-[140px] resize-none"
                                />
                            </div>

                            <Button
                                className="w-full bg-[#ff00cc] hover:bg-[#d900ad] text-white font-bold py-4 text-base shadow-[0_0_20px_rgba(255,0,204,0.3)] transition-all"
                                onClick={handleStartContest}
                                disabled={!selectedCategory || !contestTitle || !budget}
                            >
                                Continue to Contest Details
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-16 md:py-20 bg-gray-50">
                <div className="max-w-[1200px] mx-auto px-4 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-[#222] leading-tight mb-4">
                            Why Start a Contest?
                        </h2>
                        <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
                            Discover the advantages of running a design contest
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow group">
                            <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#ff00cc]/10 transition-colors">
                                <Users className="h-7 w-7 text-gray-700 group-hover:text-[#ff00cc] transition-colors" />
                            </div>
                            <h3 className="font-bold text-xl mb-3 text-gray-800">Multiple Options</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Receive dozens of unique design concepts from talented designers around the world. Compare and choose the perfect match for your brand.
                            </p>
                        </div>
                        
                        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow group">
                            <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#ff00cc]/10 transition-colors">
                                <Award className="h-7 w-7 text-gray-700 group-hover:text-[#ff00cc] transition-colors" />
                            </div>
                            <h3 className="font-bold text-xl mb-3 text-gray-800">You Choose</h3>
                            <p className="text-gray-600 leading-relaxed">
                                You have full control to select the design that best matches your vision and brand. Provide feedback and refine until it's perfect.
                            </p>
                        </div>
                        
                        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow group">
                            <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#ff00cc]/10 transition-colors">
                                <Shield className="h-7 w-7 text-gray-700 group-hover:text-[#ff00cc] transition-colors" />
                            </div>
                            <h3 className="font-bold text-xl mb-3 text-gray-800">Money-Back Guarantee</h3>
                            <p className="text-gray-600 leading-relaxed">
                                If you're not satisfied with the designs, we offer a full money-back guarantee. Your satisfaction is our priority.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
