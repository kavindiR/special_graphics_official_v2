"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import {
    Search,
    ChevronRight,
    ChevronLeft,
} from "lucide-react";
import Hero from "@/components/Hero";

export default function HomePage() {
    const { user, isAuthenticated, loading } = useAuth();
    const router = useRouter();

    // Redirect authenticated users to their dashboards
    useEffect(() => {
        if (!loading && isAuthenticated && user) {
            if (user.role === 'designer') {
                router.push('/designer/dashboard');
            } else if (user.role === 'client') {
                router.push('/client/dashboard');
            } else if (user.role === 'admin' || user.role === 'moderator') {
                router.push('/adminpanel');
            }
        }
    }, [user, isAuthenticated, loading, router]);
    // Carousel State
    const [currentSlide, setCurrentSlide] = useState(0);

    // Data for the 3 Testimonial Slides
    const testimonials = [
        {
            id: 1,
            productImg: "/testimonial-slide-1.avif",
            avatarImg: "/avatar-richard.avif",
            name: "Richard Van Balen",
            role: "Founder of Ethique Body, Florida",
            quote:
                "Special Graphics is a platform with a good name and a very good service...",
        },
        {
            id: 2,
            productImg: "/testimonial-slide-2.avif",
            avatarImg: "/avatar-ryan.avif",
            name: "Ryan Spalding",
            role: "Founder of Jedi Mind Tricks, Texas",
            quote:
                "Special Graphics is a platform with a good name and a very good service...",
        },
        {
            id: 3,
            productImg: "/testimonial-slide-3.avif",
            avatarImg: "/avatar-masoud.avif",
            name: "Masoud Pajouh",
            role: "Founder of Dibaonline.de & Diba Products, Germany",
            quote:
                "Special Graphics is a platform with a good name and a very good service...",
        },
    ];

    const nextSlide = () => {
        setCurrentSlide((prev) =>
            prev === testimonials.length - 1 ? 0 : prev + 1
        );
    };

    const prevSlide = () => {
        setCurrentSlide((prev) =>
            prev === 0 ? testimonials.length - 1 : prev - 1
        );
    };

    const hexImages = [
        "/feature-logos-hex-1.avif",
        "/feature-logos-hex-2.avif",
        "/feature-logos-hex-3.avif",
        "/feature-logos-hex-4.avif",
        "/feature-logos-hex-5.avif",
        "/feature-logos-hex-6.avif",
        "/feature-logos-hex-7.avif",
        "/feature-logos-hex-8.avif",
    ];
    const offsetIndexes = [1, 4, 7];

    return (
        <main className="font-sans text-slate-800 bg-white">
            {/* ================= HERO SECTION ================= */}

            <Hero />

            {/* ================= CATEGORIES SECTION ================= */}
            <section className="py-12 sm:py-16 md:py-20 bg-white relative z-30">
                <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-8 sm:mb-10 gap-4 sm:gap-6">
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-700 text-center md:text-left w-full md:w-auto">
                            Design for what you need
                        </h2>

                        <div className="flex-1 max-w-xl w-full md:mx-auto order-3 md:order-2">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="what do you need designed?"
                                    className="w-full border border-gray-300 py-3 sm:py-3.5 px-4 rounded-md pr-12 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 min-h-[44px] touch-manipulation"
                                />
                                <button className="absolute right-0 top-0 h-full px-4 border-l border-gray-300 hover:bg-gray-50 active:bg-gray-100 transition-colors min-w-[44px] flex items-center justify-center touch-manipulation">
                                    <Search size={18} className="text-gray-500" />
                                </button>
                            </div>
                        </div>

                        <Link
                            href="/categories"
                            className="text-xs sm:text-sm text-gray-500 hover:text-pink-600 whitespace-nowrap order-2 md:order-3 text-center md:text-left min-h-[44px] flex items-center justify-center md:justify-start touch-manipulation"
                        >
                            View all design categories
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
                        {[
                            { title: "Logo & Branding Design", img: "/cat-logo.avif", slug: "logo-branding" },
                            { title: "Business & Advertising", img: "/cat-business.avif", slug: "business-advertising" },
                            { title: "Packaging & Label", img: "/cat-package.avif", slug: "packaging-label" },
                            { title: "Website & App Design", img: "/cat-web.avif", slug: "web-app-design" },
                            { title: "Art & Illustration", img: "/cat-art.avif", slug: "art-illustration" },
                        ].map((item, index) => (
                            <Link key={index} href={`/categories/${item.slug}`} className="group cursor-pointer touch-manipulation active:scale-[0.98] transition-transform">
                                <div className="aspect-square bg-gray-100 overflow-hidden rounded-md mb-2 sm:mb-3 shadow-sm group-hover:shadow-md group-active:shadow-lg transition-all">
                                    <Image
                                        src={item.img}
                                        alt={item.title}
                                        width={400}
                                        height={400}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                                    />
                                </div>
                                <h3 className="text-xs sm:text-sm font-bold text-center text-gray-800 group-hover:text-[#ff00cc] transition-colors px-1 leading-tight">
                                    {item.title}
                                </h3>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================= FEATURE 1 ================= */}
            <section className="py-12 sm:py-16 md:py-20 bg-white overflow-hidden">
                <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-8 sm:gap-10 md:gap-12">
                    <div className="md:w-1/2 space-y-4 sm:space-y-6 text-center md:text-left w-full">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-[#222] leading-tight">
                            Work with <br className="hidden sm:block md:hidden" /><br className="hidden md:block" /> creative experts <br className="hidden md:block" /> you can trust
                        </h2>
                        <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed max-w-md mx-auto md:mx-0 px-2 sm:px-0">
                            Feel confident working with our designer community. All our
                            designers are vetted creative experts who&apos;ve worked with
                            hundreds of businesses to bring their designs to life.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3 sm:gap-4 md:gap-6 pt-2 sm:pt-4">
                            <Link href="/hire-designer" className="w-full sm:w-auto">
                                <button className="bg-[#333] hover:bg-black active:bg-[#222] text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-md text-sm sm:text-base font-medium transition-colors min-h-[44px] w-full sm:w-auto touch-manipulation">
                                    Find a Designer
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className="md:w-1/2 relative w-full">
                        <div className="relative z-10 flex justify-center">
                            <Image
                                src="/feature-energy.avif"
                                alt="Energy Drink Design"
                                width={600}
                                height={500}
                                className="w-full max-w-sm sm:max-w-md md:max-w-lg h-auto object-contain"
                                sizes="(max-width: 640px) 100vw, (max-width: 768px) 90vw, (max-width: 1024px) 50vw, 600px"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= FEATURE 2: HEX LOGOS ================= */}
            <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
                <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse md:flex-row items-center gap-8 sm:gap-10 md:gap-12">
                    {/* Hex grid */}
                    <div className="md:w-1/2 flex justify-center items-center w-full py-4 sm:py-6 md:py-0 order-1">
                        <div className="flex justify-center items-start scale-75 sm:scale-90 md:scale-100">
                            {/* Column 1 (3 items) */}
                            <div className="flex flex-col -space-y-4 sm:-space-y-5 md:-space-y-6">
                                {[0, 3, 6].map((i) => hexImages[i] && (
                                    <div key={i} className="group relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 z-10 hover:z-20">
                                        <div
                                            className="w-full h-full overflow-hidden shadow-sm filter drop-shadow-md bg-white"
                                            style={{
                                                clipPath: "polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%)",
                                            }}
                                        >
                                            <Image
                                                src={hexImages[i]}
                                                alt={`Logo hex ${i + 1}`}
                                                width={400}
                                                height={400}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, (max-width: 1024px) 192px, 224px"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Column 2 (2 items, Staggered Down) */}
                            <div className="flex flex-col -space-y-4 sm:-space-y-5 md:-space-y-6 mt-12 sm:mt-16 md:mt-20 lg:mt-24 -ml-3 sm:-ml-4 md:-ml-6 lg:-ml-8">
                                {[1, 4].map((i) => hexImages[i] && (
                                    <div key={i} className="group relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 z-10 hover:z-20">
                                        <div
                                            className="w-full h-full overflow-hidden shadow-sm filter drop-shadow-md bg-white"
                                            style={{
                                                clipPath: "polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%)",
                                            }}
                                        >
                                            <Image
                                                src={hexImages[i]}
                                                alt={`Logo hex ${i + 1}`}
                                                width={400}
                                                height={400}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, (max-width: 1024px) 192px, 224px"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Column 3 (3 items) */}
                            <div className="flex flex-col -space-y-4 sm:-space-y-5 md:-space-y-6 -ml-3 sm:-ml-4 md:-ml-6 lg:-ml-8">
                                {[2, 5, 7].map((i) => hexImages[i] && (
                                    <div key={i} className="group relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 z-10 hover:z-20">
                                        <div
                                            className="w-full h-full overflow-hidden shadow-sm filter drop-shadow-md bg-white"
                                            style={{
                                                clipPath: "polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%)",
                                            }}
                                        >
                                            <Image
                                                src={hexImages[i]}
                                                alt={`Logo hex ${i + 1}`}
                                                width={400}
                                                height={400}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, (max-width: 1024px) 192px, 224px"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Text */}
                    <div className="md:w-1/2 space-y-4 sm:space-y-6 text-center md:text-left w-full order-2 md:order-1">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-[#a35d8d] leading-tight">
                            Work with <br className="hidden sm:block md:hidden" /><br className="hidden md:block" /> creative experts <br className="hidden md:block" /> you can trust
                        </h2>
                        <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed max-w-md mx-auto md:mx-0 px-2 sm:px-0">
                            Feel confident working with our designer community. All our
                            designers are vetted creative experts who&apos;ve worked with
                            hundreds of businesses to bring their designs to life.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3 sm:gap-4 md:gap-6 pt-2 sm:pt-4">
                            <Link href="/hire-designer" className="w-full sm:w-auto">
                                <button className="bg-[#a35d8d] hover:bg-[#8e4a7a] active:bg-[#7a3d66] text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-md text-sm sm:text-base font-medium transition-colors min-h-[44px] w-full sm:w-auto touch-manipulation">
                                    Find a Designer
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= FEATURE 3 ================= */}
            <section className="py-12 sm:py-16 md:py-20 bg-white">
                <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-8 sm:gap-10 md:gap-12">
                    <div className="md:w-1/2 space-y-4 sm:space-y-6 text-center md:text-left w-full">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-[#4285f4] leading-tight">
                            Your business <br className="hidden sm:block md:hidden" /><br className="hidden md:block" /> deserves great <br className="hidden md:block" /> design!
                        </h2>
                        <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed max-w-md mx-auto md:mx-0 px-2 sm:px-0">
                            Logos, websites, packaging design and more. Our trusted designer
                            community has helped thousands of businesses launch, grow, expand
                            and rebrand with custom, professional design.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3 sm:gap-4 md:gap-6 pt-2 sm:pt-4">
                            <Link href="/hire-designer" className="w-full sm:w-auto">
                                <button className="bg-[#4285f4] hover:bg-[#3367d6] active:bg-[#2b5bc4] text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-md text-sm sm:text-base font-medium transition-colors min-h-[44px] w-full sm:w-auto touch-manipulation">
                                    Find a Designer
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className="md:w-1/2 relative flex justify-center w-full">
                        <Image
                            src="/feature-podcast.avif"
                            alt="Podcast Design"
                            width={500}
                            height={500}
                            className="w-full max-w-xs sm:max-w-sm md:max-w-md h-auto shadow-xl rounded-sm"
                            sizes="(max-width: 640px) 100vw, (max-width: 768px) 90vw, (max-width: 1024px) 50vw, 500px"
                        />
                    </div>
                </div>
            </section>

            {/* ================= TESTIMONIAL CAROUSEL ================= */}
            <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white relative overflow-hidden">
                <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-8 lg:gap-10 min-h-[300px] sm:min-h-[350px] md:min-h-[400px]">
                        {/* Left: Product Image */}
                        <div className="lg:w-1/2 flex justify-center relative w-full order-2 lg:order-1">
                            <div className="absolute inset-0 bg-gray-50 rounded-full opacity-50 blur-3xl scale-90"></div>
                            <div className="relative h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] w-full flex items-center justify-center">
                                <Image
                                    key={`prod-${currentSlide}`}
                                    src={testimonials[currentSlide].productImg}
                                    alt="Product"
                                    width={500}
                                    height={600}
                                    className="relative z-10 w-auto h-full max-h-[250px] sm:max-h-[300px] md:max-h-[350px] lg:max-h-[400px] object-contain animate-in fade-in duration-500"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 500px"
                                />
                            </div>
                        </div>

                        {/* Right: Quote & Info */}
                        <div className="lg:w-1/2 relative w-full text-center lg:text-left order-1 lg:order-2">
                            <span className="text-[#e85a4f] text-4xl sm:text-5xl md:text-6xl font-sans absolute -top-4 sm:-top-6 md:-top-8 left-1/2 -translate-x-1/2 lg:left-0 lg:translate-x-0">
                                "
                            </span>
                            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4 sm:mb-6 md:mb-8 pl-0 lg:pl-8 px-2 sm:px-0">
                                {testimonials[currentSlide].quote}
                            </h3>

                            <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mb-6 sm:mb-8 md:mb-10 pl-0 lg:pl-8 border-l-0 lg:border-l-4 border-transparent px-2 sm:px-0">
                                where entrepreneurs can easily find the right design for their
                                company. The book cover for us was a very important part of the
                                success of the book. Therefore, we entrusted this to experts and
                                ended up being very happy with the result."
                            </p>

                            <div className="flex items-center justify-center lg:justify-start gap-3 sm:gap-4 pl-0 lg:pl-8">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border border-gray-200 flex-shrink-0">
                                    <Image
                                        key={`avatar-${currentSlide}`}
                                        src={testimonials[currentSlide].avatarImg}
                                        alt={testimonials[currentSlide].name}
                                        width={48}
                                        height={48}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                                <div className="animate-in slide-in-from-right-2 duration-300 text-left">
                                    <p className="font-bold text-gray-800 text-xs sm:text-sm">
                                        {testimonials[currentSlide].name}
                                    </p>
                                    <p className="text-gray-400 text-[10px] sm:text-xs italic">
                                        {testimonials[currentSlide].role}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Arrows */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-2 sm:left-4 md:left-6 lg:left-10 top-1/2 -translate-y-1/2 p-2 sm:p-2.5 hover:bg-gray-100 active:bg-gray-200 rounded-full transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation z-10"
                        aria-label="Previous testimonial"
                    >
                        <ChevronLeft
                            size={32}
                            className="sm:w-10 sm:h-10 text-gray-400 font-thin hover:text-gray-800"
                        />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-2 sm:right-4 md:right-6 lg:right-10 top-1/2 -translate-y-1/2 p-2 sm:p-2.5 hover:bg-gray-100 active:bg-gray-200 rounded-full transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation z-10"
                        aria-label="Next testimonial"
                    >
                        <ChevronRight
                            size={32}
                            className="sm:w-10 sm:h-10 text-gray-400 font-thin hover:text-gray-800"
                        />
                    </button>

                    {/* Dots */}
                    <div className="flex justify-center gap-2 sm:gap-3 mt-8 sm:mt-10 md:mt-12">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 touch-manipulation min-w-[20px] min-h-[20px] flex items-center justify-center ${currentSlide === index
                                    ? "bg-black scale-110"
                                    : "bg-transparent border border-black hover:bg-gray-200 active:bg-gray-300"
                                    }`}
                                aria-label={`Go to testimonial ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </section>

        </main>
    );
}
