'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
    ChevronRight,
    ChevronLeft,
    CheckCircle2,
    Plus,
    X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function DesignerDashboard() {
    const { user, isAuthenticated, loading } = useAuth();
    const router = useRouter();
    const [testimonialIndex, setTestimonialIndex] = useState(0);
    const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

    useEffect(() => {
        // Wait for auth to finish loading before checking
        if (!loading && typeof window !== 'undefined') {
            if (!isAuthenticated || (user && user.role !== 'designer')) {
                if (!isAuthenticated) {
        router.push('/auth');
                } else if (user && user.role !== 'designer') {
                    router.push('/');
                }
            }
        }
    }, [isAuthenticated, user, loading, router]);

    const testimonials = [
        {
            quote: "99designs enables me to work on what I love... with a creative freedom that I never had while working for agencies.",
            author: "Shelly",
            role: "Brand Designer",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
            designs: [
                { image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=300&h=400&fit=crop", title: "CUSTOM MADE TRAVEL BINGO" },
                { image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=300&h=400&fit=crop", title: "PERKS OF BEING A MEMBER" }
            ]
        },
        {
            quote: "Special Graphics gives me the flexibility to work on projects I'm passionate about while building my portfolio.",
            author: "Michael",
            role: "Logo Designer",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
            designs: [
                { image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=300&h=400&fit=crop", title: "Tech Startup Logo" },
                { image: "https://images.unsplash.com/photo-1633409361618-c73427e4e206?w=300&h=400&fit=crop", title: "Brand Identity" }
            ]
        }
    ];

    const faqs = [
        { question: "What kind of work is available?", answer: "We offer a wide range of design projects including logos, branding, web design, packaging, and more." },
        { question: "How much can I earn?", answer: "Designers can earn anywhere from $299 to $5,000+ per project depending on the scope and their level." },
        { question: "Do you charge fees?", answer: "We charge a small platform fee on completed projects to maintain and improve our services." },
        { question: "How do you curate designers?", answer: "We review portfolios and work quality to ensure only talented designers join our platform." },
        { question: "Can I create my own designer profile?", answer: "Yes! You can create a comprehensive profile showcasing your work and skills." },
        { question: "How can I find clients to work with?", answer: "Browse available contests and projects, or get matched with clients through our 1-to-1 Projects feature." },
        { question: "How do I get paid?", answer: "We use secure payment methods including Hyperwallet for fast, reliable payouts." },
        { question: "Why should I bring my existing clients?", answer: "Bringing existing clients helps you grow your business and provides access to our platform tools." },
        { question: "Why should I enter a Contest?", answer: "Contests help you build your portfolio, gain exposure, and win prizes while showcasing your skills." },
        { question: "How can I find the right Contest?", answer: "Use our search and filter tools to find contests that match your skills and interests." },
        { question: "What happens if I don't win?", answer: "Even if you don't win, you can build your portfolio and potentially get hired for future projects." }
    ];

    const nextTestimonial = () => {
        setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const toggleFaq = (index: number) => {
        setExpandedFaq(expandedFaq === index ? null : index);
    };

    // Show loading state while checking auth
    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    // Don't render if not authenticated or not a designer (redirect will happen)
    if (!isAuthenticated || (user && user.role !== 'designer')) {
        return null;
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Breadcrumbs */}
            <div className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                    <nav className="text-sm text-gray-600">
                        <Link href="/" className="hover:text-gray-900">Home</Link>
                        <span className="mx-2">/</span>
                        <span className="text-gray-900 font-medium">Designers</span>
                    </nav>
                </div>
            </div>

            {/* Hero Section: "Fire up your freelance career" */}
            <section className="bg-white relative overflow-hidden py-8 lg:py-12">
                {/* Cloud background shapes */}
                <div className="absolute inset-0 opacity-[0.03]">
                    <div className="absolute top-20 left-10 w-64 h-32 bg-gray-400 rounded-full blur-3xl"></div>
                    <div className="absolute top-40 right-20 w-80 h-40 bg-gray-400 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 left-1/3 w-72 h-36 bg-gray-400 rounded-full blur-3xl"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left Side - Illustration */}
                        <div className="relative h-96 lg:h-[600px] order-2 lg:order-1">
                            <div className="absolute inset-0 bg-white">
                                {/* Illustration placeholder - using a professional illustration-style image */}
                                <div className="relative w-full h-full flex items-center justify-center">
                                    <Image
                                        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=800&fit=crop"
                                        alt="Designer illustration"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                {/* Signature */}
                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-gray-400">
                                    Illustration by Wiell
                                </div>
                            </div>
                            {/* Small profile images at bottom right */}
                            <div className="absolute bottom-4 right-4 flex gap-2">
                                <Avatar className="h-10 w-10 border-2 border-white">
                                    <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" />
                                    <AvatarFallback>U</AvatarFallback>
                                </Avatar>
                                <Avatar className="h-10 w-10 border-2 border-white">
                                    <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" />
                                    <AvatarFallback>U</AvatarFallback>
                                </Avatar>
                                <Avatar className="h-10 w-10 border-2 border-white">
                                    <AvatarImage src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop" />
                                    <AvatarFallback>U</AvatarFallback>
                                </Avatar>
                            </div>
                        </div>

                        {/* Right Side - Content */}
                        <div className="lg:pl-8 order-1 lg:order-2">
                            <h1 className="text-5xl lg:text-6xl font-bold text-red-600 mb-6 leading-tight">
                                Fire up your freelance career
                            </h1>
                            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                                You design. We'll handle the rest. Do what you love, and get paid for it on Special Graphics. 
                                Find amazing clients and become a part of our global community of talented designers—all in a safe, secure workplace.
                            </p>
                            <Link href="/designer/contests">
                                <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-lg font-semibold">
                                    Apply now
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
            </section>

            {/* The design community you've always wanted */}
            <section className="bg-white py-8 lg:py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl lg:text-5xl font-bold text-green-600 mb-3">
                        The design community you've always wanted
                    </h2>
                    <p className="text-lg text-gray-700 mb-8 max-w-3xl">
                        Special Graphics gives you everything you need to grow your clientele and expand your skills.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                        {/* Find opportunity */}
                            <div>
                            <div className="mb-6 relative h-64 rounded-lg overflow-hidden">
                                <Image
                                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop"
                                    alt="Find opportunity"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Find opportunity</h3>
                            <p className="text-gray-700 mb-4">
                                Work on what you want, when you want, where you want. All with great projects from reliable clients all over the world.
                            </p>
                    </div>

                        {/* Be inspired */}
                            <div>
                            <div className="mb-6 relative h-64 rounded-lg overflow-hidden">
                                <Image
                                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop&grayscale"
                                    alt="Be inspired"
                                    fill
                                    className="object-cover grayscale"
                                />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Be inspired</h3>
                            <p className="text-gray-700 mb-4">
                                Push your creative limits by competing in Design Contests with other designers in our community who challenge you.
                            </p>
                    </div>

                        {/* Feel supported */}
                            <div>
                            <div className="mb-6 relative h-64 rounded-lg overflow-hidden">
                                <Image
                                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=400&fit=crop&grayscale"
                                    alt="Feel supported"
                                    fill
                                    className="object-cover grayscale"
                                />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Feel supported</h3>
                            <p className="text-gray-700 mb-4">
                                Your work matters. From Designer Support to regular platform updates, we make sure Special Graphics is the best place for you to do work.
                            </p>
                        </div>
                    </div>

                    {/* FAQ Accordion */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className="border border-gray-200 rounded-lg overflow-hidden"
                            >
                                <button
                                    onClick={() => toggleFaq(index)}
                                    className="w-full text-left flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                                >
                                    <span className="text-sm font-medium text-gray-900">{faq.question}</span>
                                    {expandedFaq === index ? (
                                        <X className="h-5 w-5 text-gray-400 flex-shrink-0" />
                                    ) : (
                                        <Plus className="h-5 w-5 text-gray-400 flex-shrink-0" />
                                    )}
                                </button>
                                {expandedFaq === index && (
                                    <div className="px-4 pb-4 text-sm text-gray-600">
                                        {faq.answer}
                                </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Two ways to work */}
            <section className="bg-white py-8 lg:py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-3">
                        Two ways to work
                    </h2>
                    <p className="text-lg text-gray-700 text-center mb-8 max-w-2xl mx-auto">
                        Clients are waiting for you. And we've got multiple options to help you get creative.
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Work directly with clients */}
                        <div className="bg-white rounded-xl border border-gray-200 p-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Work directly with clients</h3>
                            <p className="text-gray-700 mb-4">Get hired by businesses and individuals with a 1-to-1 Project.</p>
                            
                            {/* Example project card */}
                            <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-200">
                                <div className="flex items-start gap-3 mb-3">
                                    <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-blue-200 flex items-center justify-center">
                                        <span className="text-2xl">👤</span>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-xs font-semibold bg-yellow-100 text-yellow-700 px-2 py-1 rounded">Top Level</span>
                                            <div className="flex items-center gap-1">
                                                <span className="text-xs text-gray-600">⭐ 4.9</span>
                        </div>
                    </div>
                                        <div className="relative h-32 rounded overflow-hidden mt-2">
                                            <Image
                                                src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&h=200&fit=crop"
                                                alt="Tools of Titans"
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <p className="text-xs text-gray-600 mt-2">Tools of Titans</p>
                                    </div>
                                </div>
                            </div>

                            <ul className="space-y-3">
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-700">Set your own prices</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-700">Match with clients who fit your style</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-700">Get paid up-front</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-700">Simple file management & communication tools</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-700">Secure payment</span>
                                </li>
                            </ul>
                        </div>

                        {/* Compete with the community */}
                        <div className="bg-white rounded-xl border border-gray-200 p-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Compete with the community</h3>
                            <p className="text-gray-700 mb-4">Submit your concepts to a Design Contest and earn big bucks.</p>
                            
                            {/* Example contest card */}
                            <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-200">
                                <div className="flex items-start gap-3 mb-3">
                                    <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-orange-200 flex items-center justify-center">
                                        <span className="text-2xl">🐕</span>
                                                </div>
                                                <div className="flex-1">
                                        <span className="text-xs font-semibold text-gray-600">UI Designer</span>
                                        <div className="relative h-32 rounded overflow-hidden mt-2">
                                            <Image
                                                src="https://images.unsplash.com/photo-1511920170033-f8396924c348?w=200&h=200&fit=crop"
                                                alt="HAYWIRE COFFEE ROASTERS"
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <p className="text-xs text-gray-600 mt-2">HAYWIRE COFFEE ROASTERS</p>
                                                        </div>
                                                        </div>
                                                    </div>

                            <ul className="space-y-3">
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-700">Choose work that inspires you</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-700">Work with global businesses</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-700">Build your professional design portfolio</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-700">Explore new design categories & build skills</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-700">Win a contest and build your client base</span>
                                </li>
                            </ul>
                                                    </div>
                                                </div>
                                            </div>
            </section>

            {/* Start your dream job now */}
            <section className="bg-white py-8 lg:py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left - Illustration */}
                        <div className="relative h-96 lg:h-[500px]">
                            <div className="absolute inset-0 bg-white">
                                <div className="relative w-full h-full">
                                    <Image
                                        src="https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=800&fit=crop"
                                        alt="Dream job illustration"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Right - Content */}
                        <div>
                    <h2 className="text-4xl lg:text-5xl font-bold text-red-600 mb-4">
                        Start your dream job now. It's simple.
                    </h2>
                    <div className="space-y-4 mb-6">
                            <div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Do it</h3>
                                    <p className="text-gray-700">Bring your A-game. Get verified. Apply to join our global design community today.</p>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Work it</h3>
                                    <p className="text-gray-700">Show yourself into the Contest ring or get matched up 1-to-1 with quality clients that fit your skill set.</p>
                                            </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Earn it</h3>
                                    <p className="text-gray-700">Get some serious pineapple! We've paid out more than $250 million to our designers to date.</p>
                                </div>
                            </div>
                            <Link href="/designer/contests">
                                <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-lg font-semibold">
                                    Sign me up
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonial and Design Showcase */}
            <section className="bg-white py-8 lg:py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left - Testimonial */}
                        <div className="relative">
                            <button
                                onClick={prevTestimonial}
                                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 p-2 bg-green-600 text-white rounded-full shadow-md hover:bg-green-700 transition-colors z-10"
                            >
                                <ChevronLeft className="h-6 w-6" />
                            </button>
                            <div>
                                <p className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8 leading-relaxed">
                                    "{testimonials[testimonialIndex].quote}"
                                </p>
                                <div className="flex items-center gap-4">
                                    <Avatar className="h-12 w-12">
                                        <AvatarImage src={testimonials[testimonialIndex].avatar} />
                                        <AvatarFallback>{testimonials[testimonialIndex].author[0]}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-semibold text-gray-900">{testimonials[testimonialIndex].author}</p>
                                        <p className="text-sm text-gray-600">{testimonials[testimonialIndex].role}</p>
                                    </div>
                                </div>
                            </div>
                                                </div>

                        {/* Right - Design Examples */}
                        <div className="relative">
                            <button
                                onClick={nextTestimonial}
                                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 p-2 bg-green-600 text-white rounded-full shadow-md hover:bg-green-700 transition-colors z-10"
                            >
                                <ChevronRight className="h-6 w-6" />
                            </button>
                            <div className="grid grid-cols-2 gap-4">
                                {testimonials[testimonialIndex].designs.map((design, index) => (
                                    <div key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                                        <div className="relative h-64">
                                            <Image
                                                src={design.image}
                                                alt={design.title}
                                                fill
                                                className="object-cover"
                                            />
                                                </div>
                                        <div className="p-3">
                                            <p className="text-xs font-semibold text-gray-900">{design.title}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                    </div>
                </div>
            </section>

            {/* Ready to start freelancing */}
            <section className="bg-white py-8 lg:py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left - Illustration */}
                        <div className="relative h-96 lg:h-[500px]">
                            <div className="absolute inset-0 bg-white">
                                <div className="relative w-full h-full">
                                    <Image
                                        src="https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=800&fit=crop"
                                        alt="Freelancing illustration"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Right - Content */}
                        <div>
                            <h2 className="text-4xl lg:text-5xl font-bold text-red-600 mb-4">
                                Ready to start freelancing?
                            </h2>
                            <Link href="/designer/contests">
                                <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-lg font-semibold">
                                    Join the Special Graphics community
                                </Button>
                            </Link>
                            <p className="text-xs text-gray-500 mt-4">by Special Graphics</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured In */}
            <section className="bg-white py-6 lg:py-8 border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <p className="text-sm text-gray-600 mb-6">Featured In</p>
                            <div className="flex flex-wrap items-center gap-8">
                                <div className="text-xl font-serif text-gray-600 font-bold">WALL STREET JOURNAL</div>
                                <div className="text-xl font-serif text-gray-600 font-bold">TechCrunch</div>
                                <div className="text-xl font-serif text-gray-600 font-bold">Entrepreneur</div>
                                <div className="text-xl font-serif text-gray-600 font-bold">The New York Times</div>
                                <div className="text-xl font-serif text-gray-600 font-bold">Forbes</div>
                            </div>
                        </div>
                        <div className="relative h-64 rounded-lg overflow-hidden">
                            <Image
                                src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=500&fit=crop"
                                alt="Featured design"
                                fill
                                className="object-cover"
                            />
                    </div>
                </div>
            </div>
            </section>
        </div>
    );
}

