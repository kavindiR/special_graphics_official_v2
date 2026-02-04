"use client";

import { useState, useEffect } from 'react';
import Accordion from '@/components/Accordion';
import { Check, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

export default function HowItWorksPage() {
    // --- SLIDER LOGIC ---
    const [currentSlide, setCurrentSlide] = useState(0);
    
    // --- NAVIGATION STATE ---
    const [activeSection, setActiveSection] = useState('brief');

    // The Data for the slider
    const testimonials = [
        {
            id: 1,
            quote: "Special Graphics is a platform with a good name and a very good service...",
            text: "where entrepreneurs can easily find the right design for their company. The book cover for us was a very important part of the success of the book. Therefore, we entrusted this to experts and ended up being very happy with the result.",
            author: "Ryan Spalding",
            role: "Founder of Jedi Mind Tricks, Texas",
            image: "/testimonial-slide-1.avif",
            avatar: "/avatar-ryan.avif"
        },
        {
            id: 2,
            quote: "The process was incredibly smooth and the results were beyond expectations...",
            text: "We needed a complete rebrand and the variety of submissions we received was staggering. The designer we chose was professional and delivered files perfectly formatted for print and web.",
            author: "Sarah Jenkins",
            role: "CEO of TechStart, New York",
            image: "/testimonial-slide-2.avif",
            avatar: "/avatar-richard.avif"
        },
        {
            id: 3,
            quote: "Highly recommended for anyone looking for high-quality creative work...",
            text: "I was skeptical about running a contest, but the talent pool here is unmatched. We got exactly what we needed in record time.",
            author: "Michael Chang",
            role: "Director at BlueWave, California",
            image: "/testimonial-slide-3.avif",
            avatar: "/avatar-masoud.avif"
        }
    ];

    // 1. Manual Navigation Functions
    const handlePrev = () => {
        setCurrentSlide((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    };

    // 2. Auto-change slide every 4 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % testimonials.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [testimonials.length]);

    // --- SCROLL TO SECTION FUNCTION ---
    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const offset = 100; // Offset for sticky header
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            setActiveSection(sectionId);
        }
    };

    // --- SCROLL OBSERVER TO UPDATE ACTIVE SECTION ---
    useEffect(() => {
        const sections = ['brief', 'connect', 'collaborate'];
        const observerOptions = {
            root: null,
            rootMargin: '-100px 0px -50% 0px',
            threshold: 0
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        sections.forEach((sectionId) => {
            const element = document.getElementById(sectionId);
            if (element) {
                observer.observe(element);
            }
        });

        return () => {
            sections.forEach((sectionId) => {
                const element = document.getElementById(sectionId);
                if (element) {
                    observer.unobserve(element);
                }
            });
        };
    }, []);

    // --- PAGE CONTENT ---
    return (
        <div className="min-h-screen bg-white">
            {/* SECTION 1: HERO */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-16 pb-4 md:pb-6">
                <div className="flex flex-col md:flex-row gap-8 md:gap-12 lg:gap-16 items-center md:items-start">
                    <div className="flex-1 w-full md:max-w-lg">
                        <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-4 md:mb-5 font-sans">
                            Home / How it Works
                        </p>
                        <h1 className="font-sans text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
                            How it works
                        </h1>
                        <p className="text-gray-500 text-sm md:text-base leading-6 md:leading-7 mb-6 md:mb-10 font-sans">
                            We deliver exceptional design solutions through our worldwide network of professional designers. For personalized assistance, <span className="underline text-gray-700 cursor-pointer">connect with one of our design experts today.</span>
                        </p>
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6">
                            <button className="bg-[#222] text-white px-6 md:px-8 py-3 md:py-4 text-xs font-bold rounded-sm hover:bg-black hover:scale-105 active:scale-95 transition-all duration-200 font-sans shadow-lg uppercase">
                                Publish a Contest
                            </button>
                            <button className="text-gray-500 text-xs font-bold hover:text-black transition-colors font-sans underline underline-offset-4 uppercase text-center sm:text-left">
                                Start Your Project Now
                            </button>
                        </div>
                    </div>
                    <div className="flex-1 w-full h-[280px] md:h-[320px] lg:h-[360px] rounded-sm relative shadow-sm overflow-hidden bg-gray-50">
                        <Image
                            src="/feature-energy.avif"
                            alt="How it Works Hero - Design Examples"
                            fill
                            className="object-cover object-center"
                            priority
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>
                </div>
            </div>

            {/* SECTION 2: PROCESS TABS */}
            <div className="border-y border-gray-100 py-4 md:py-6 mb-6 md:mb-8 lg:mb-10 sticky top-0 bg-white/95 backdrop-blur z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-12 text-xs md:text-sm font-bold font-sans items-center flex-wrap">
                    <button
                        onClick={() => scrollToSection('brief')}
                        className={`transition-colors whitespace-nowrap ${
                            activeSection === 'brief'
                                ? 'text-black'
                                : 'text-gray-400 hover:text-black'
                        }`}
                    >
                        1. Brief
                    </button>
                    <button
                        onClick={() => scrollToSection('connect')}
                        className={`transition-colors whitespace-nowrap ${
                            activeSection === 'connect'
                                ? 'text-black'
                                : 'text-gray-400 hover:text-black'
                        }`}
                    >
                        2. Connect
                    </button>
                    <button
                        onClick={() => scrollToSection('collaborate')}
                        className={`transition-colors whitespace-nowrap ${
                            activeSection === 'collaborate'
                                ? 'text-black'
                                : 'text-gray-400 hover:text-black'
                        }`}
                    >
                        3. Collaborate
                    </button>
                    <button className="bg-[#222] text-white px-3 md:px-4 py-1.5 rounded text-[10px] uppercase tracking-wide hover:bg-black transition-colors cursor-pointer font-sans whitespace-nowrap">Get Started</button>
                </div>
            </div>

            {/* SECTION 3: "Let us know what you need" - BRIEF */}
            <div id="brief" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6 lg:py-8 mb-4 md:mb-6 lg:mb-8 scroll-mt-24">
                <div className="flex flex-col md:flex-row gap-8 md:gap-12 lg:gap-16 xl:gap-20 items-center">
                    <div className="flex-1 w-full relative order-2 md:order-1">
                        <div className="w-full h-[350px] sm:h-[400px] md:h-[450px] bg-[#FDFBF7] rounded-lg md:rounded p-6 md:p-8 flex items-center justify-center relative overflow-hidden">
                            <div className="relative w-full h-full max-w-md mx-auto">
                                <Image
                                    src="/cat-package.avif"
                                    alt="Packaging Design Example"
                                    fill
                                    className="object-contain object-center"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 w-full md:max-w-lg order-1 md:order-2">
                        <h2 className="font-sans text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-4 leading-tight">
                            Let us know <br className="hidden md:block" /> what you need <br className="hidden md:block" /> designed.
                        </h2>
                        <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-4 md:mb-6 font-sans">
                            Begin by drafting a creative brief to effectively communicate your unique requirements to our designers.
                        </p>
                        <ul className="space-y-3 md:space-y-4 mb-6 md:mb-8 font-sans text-sm md:text-base text-gray-600">
                            <li className="flex gap-3 items-start"><Check className="w-4 h-4 text-black mt-0.5 flex-shrink-0" /> <span>Secure Payment Release Upon Completion</span></li>
                            <li className="flex gap-3 items-start"><Check className="w-4 h-4 text-black mt-0.5 flex-shrink-0" /> <span>Receive Production-Ready Files for Print and Digital Use</span></li>
                            <li className="flex gap-3 items-start"><Check className="w-4 h-4 text-black mt-0.5 flex-shrink-0" /> <span>Full Copyright and Ownership Transfer</span></li>
                        </ul>
                        <div className="mt-4 md:mt-6 border-t border-gray-200 pt-4 md:pt-6">
                            <Accordion title="What files do I need?" content="You will need vector files (AI, EPS) and raster files (JPG, PNG)." />
                            <Accordion title="Where are my design files stored?" content="Files are stored securely in your project handover area." />
                            <Accordion title="Can I keep working with my designer?" content="Yes, you can start 1-to-1 projects anytime." />
                        </div>
                    </div>
                </div>
            </div>

            {/* SECTION 4: CONNECT SECTION */}
            <div id="connect" className="py-4 md:py-6 lg:py-8 scroll-mt-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-6 md:mb-8 lg:mb-10">
                        <h2 className="font-sans text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
                            Collaborate with Top Designers
                        </h2>
                        <p className="text-gray-500 text-sm md:text-base font-sans max-w-2xl mx-auto">
                            Discover leading agencies & professionals for your project.
                        </p>
                    </div>

                    {/* ROW 1: Find a Designer */}
                    <div className="flex flex-col md:flex-row gap-8 md:gap-12 lg:gap-16 xl:gap-20 items-center mb-8 md:mb-12 lg:mb-16">
                        <div className="flex-1 w-full flex justify-center order-2 md:order-1">
                            <div className="w-full max-w-[300px] sm:max-w-[340px] aspect-square bg-gray-50 relative rounded-lg md:rounded-sm overflow-hidden shadow-md">
                                <Image
                                    src="/feature-podcast.avif"
                                    alt="Designer Portfolio Example"
                                    fill
                                    className="object-cover object-center"
                                    sizes="(max-width: 640px) 300px, 340px"
                                />
                                <div className="absolute -bottom-6 md:-bottom-8 left-4 md:left-6 bg-white p-3 md:p-4 shadow-lg border border-gray-100 rounded-sm w-48 md:w-56 flex gap-3 md:gap-4 items-center z-10">
                                    <div className="w-9 h-9 md:w-10 md:h-10 rounded-full flex-shrink-0 overflow-hidden border-2 border-gray-200">
                                        <Image
                                            src="/avatar-richard.avif"
                                            alt="Designer Avatar"
                                            width={40}
                                            height={40}
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                    <div>
                                        <div className="font-bold text-xs md:text-sm text-gray-900">Jennifer_Artist</div>
                                        <div className="text-[9px] md:text-[10px] text-gray-400 font-sans uppercase tracking-wider">Top Level</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 w-full md:max-w-lg order-1 md:order-2">
                            <h3 className="font-sans text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 md:mb-4">
                                Find a designer
                            </h3>
                            <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-5 md:mb-6 font-sans">
                                Work directly with a specific designer by browsing their portfolios and inviting them to your project.
                            </p>
                            <ul className="space-y-3 md:space-y-4 mb-6 md:mb-8 font-sans text-sm md:text-base text-gray-600">
                                <li className="flex gap-3 items-start"><Check className="w-4 h-4 text-black flex-shrink-0 mt-0.5" /> <span>Experts in Over 90 Design Categories</span></li>
                                <li className="flex gap-3 items-start"><Check className="w-4 h-4 text-black flex-shrink-0 mt-0.5" /> <span>Review Portfolios and Request Quotes</span></li>
                                <li className="flex gap-3 items-start"><Check className="w-4 h-4 text-black flex-shrink-0 mt-0.5" /> <span>Quality Checked Designers</span></li>
                            </ul>
                            <div className="border-t border-gray-200 mt-4 md:mt-6 pt-4 md:pt-6">
                                <Accordion title="How soon can we start?" content="You can start immediately after hiring." />
                                <Accordion title="How are payments handled?" content="Payments are held securely in escrow." />
                                <Accordion title="How do I choose a designer?" content="Browse portfolios and read reviews to decide." />
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* SECTION 5: COLLABORATE - AUTOMATIC TESTIMONIAL SLIDER */}
            <div id="collaborate" className="bg-white py-4 md:py-6 lg:py-8 border-t border-gray-100 overflow-hidden scroll-mt-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative group">

                    {/* 3. ARROWS (Manual Navigation) */}
                    {/* Left Arrow */}
                    <button
                        onClick={handlePrev}
                        className="absolute left-0 md:-left-4 top-1/2 -translate-y-1/2 p-2 md:p-3 hover:bg-gray-50 rounded-full transition-all z-20 hidden md:block"
                        aria-label="Previous testimonial"
                    >
                        <ChevronLeft className="w-10 h-10 md:w-12 md:h-12 text-gray-300 hover:text-black transition-colors font-thin" />
                    </button>

                    {/* Right Arrow */}
                    <button
                        onClick={handleNext}
                        className="absolute right-0 md:-right-4 top-1/2 -translate-y-1/2 p-2 md:p-3 hover:bg-gray-50 rounded-full transition-all z-20 hidden md:block"
                        aria-label="Next testimonial"
                    >
                        <ChevronRight className="w-10 h-10 md:w-12 md:h-12 text-gray-300 hover:text-black transition-colors font-thin" />
                    </button>

                    <div className="max-w-5xl mx-auto">

                        {/* Slider Content */}
                        <div className="flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-10 items-center min-h-[300px] md:min-h-[350px]">

                            {/* Left: Product Image */}
                            <div className="flex-1 w-full max-w-xs mx-auto md:mx-0">
                                <div className="w-full max-w-[256px] h-[320px] md:h-80 mx-auto rounded-lg md:rounded-sm overflow-hidden shadow-xl transition-all duration-500 ease-in-out relative bg-gray-50">
                                    <Image
                                        key={`testimonial-${currentSlide}`}
                                        src={testimonials[currentSlide].image}
                                        alt="Testimonial Product"
                                        fill
                                        className="object-contain object-center"
                                        sizes="(max-width: 768px) 256px, 256px"
                                    />
                                </div>
                            </div>

                            {/* Right: Text Content */}
                            <div className="flex-1 w-full transition-opacity duration-500 ease-in-out">
                                <div className="mb-4 md:mb-5">
                                    <span className="text-5xl md:text-6xl font-sans text-gray-200 leading-none block">"</span>
                                    <h3 className="font-sans text-xl md:text-2xl font-bold text-gray-900 -mt-3 md:-mt-4 mb-2 md:mb-3 leading-tight">
                                        {testimonials[currentSlide].quote}
                                    </h3>
                                    <p className="text-xs md:text-sm text-gray-500 leading-relaxed font-sans">
                                        {testimonials[currentSlide].text}
                                    </p>
                                </div>
                                <div className="flex items-center gap-3 md:gap-4 mt-4 md:mt-6">
                                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-gray-200">
                                        <Image
                                            key={`avatar-${currentSlide}`}
                                            src={testimonials[currentSlide].avatar}
                                            alt={testimonials[currentSlide].author}
                                            width={48}
                                            height={48}
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                    <div>
                                        <div className="text-xs md:text-sm font-bold text-gray-900 font-sans">{testimonials[currentSlide].author}</div>
                                        <div className="text-[10px] md:text-xs text-gray-500 font-sans">{testimonials[currentSlide].role}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 4. The Dots */}
                        <div className="flex justify-center gap-2 mt-4 md:mt-6">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentSlide(index)}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${currentSlide === index ? "bg-black w-4" : "bg-gray-300 hover:bg-gray-400"
                                        }`}
                                    aria-label={`Go to testimonial ${index + 1}`}
                                />
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
