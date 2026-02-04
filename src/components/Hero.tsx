'use client';

import { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const images = [
        { src: "/hero-left.avif", position: "object-center" },
        { src: "/hero-right.avif", position: "object-right" }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative bg-[#0a0015] text-white overflow-hidden min-h-[500px] md:min-h-[600px] flex items-center z-10">

            {/* Background Slideshow */}
            <div className="absolute inset-0 w-full h-full z-0">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentIndex ? "opacity-100" : "opacity-0"
                            }`}
                    >
                        <Image
                            src={image.src}
                            alt="Hero Background"
                            fill
                            className={`object-cover ${image.position}`}
                            priority={index === 0}
                            sizes="100vw"
                        />
                        {/* Gradient Mask to fade into center (optional, but keep for style consistency if desired, or just dark overlay) */}
                        <div className="absolute inset-0 bg-black/40"></div>
                    </div>
                ))}
            </div>

            {/* Dark overlay for mobile readability */}
            <div className="absolute inset-0 bg-[#0a0015]/20 md:bg-transparent z-0 pointer-events-none"></div>

            {/* Content */}
            <div className="container mx-auto px-4 relative z-10 text-center flex flex-col items-center pt-10 pb-32">
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight drop-shadow-lg">
                    Start Your Dream Business with <br className="hidden md:block" />
                    <span className="text-white">World Class</span> <br className="hidden md:block" />
                    <span className="text-white">Designs</span>
                </h1>

                <p className="text-gray-200 mb-8 max-w-2xl text-base md:text-lg drop-shadow-md">
                    No matter what your business needs, we can connect you with a creative expert. What do you need to design?
                </p>

                <div className="flex flex-wrap justify-center gap-3 md:gap-5 mb-10 text-base md:text-lg lg:text-xl text-gray-200">
                    <span className="py-2 font-semibold">Popular :</span>
                    <span className="bg-white/10 backdrop-blur-sm px-4 py-2 md:px-5 md:py-2.5 rounded text-yellow-100 border border-yellow-500/30 text-sm md:text-base lg:text-lg font-medium">Package Design</span>
                    <span className="bg-white/10 backdrop-blur-sm px-4 py-2 md:px-5 md:py-2.5 rounded text-yellow-100 border border-yellow-500/30 text-sm md:text-base lg:text-lg font-medium">Logo Design</span>
                    <span className="bg-white/10 backdrop-blur-sm px-4 py-2 md:px-5 md:py-2.5 rounded text-yellow-100 border border-yellow-500/30 text-sm md:text-base lg:text-lg font-medium">UI/UX Design</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/hire-designer">
                        <button className="bg-[#ff00cc] hover:bg-[#d900ad] text-white font-bold py-3 px-8 md:py-4 md:px-10 rounded shadow-[0_0_20px_rgba(255,0,204,0.4)] transition-all cursor-pointer">
                            Hire a Designer
                        </button>
                    </Link>
                    <Link href="/start-contest">
                        <button className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-bold py-3 px-8 md:py-4 md:px-10 rounded border border-white/30 transition-all cursor-pointer">
                            Start a Contest
                        </button>
                    </Link>
                </div>
            </div>

            {/* Decorative Wave Bottom */}
            <div className="absolute bottom-0 w-full h-16 z-20">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-full absolute bottom-0 translate-y-1/2">
                    <path fill="#ffffff" fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,250.7C960,235,1056,181,1152,165.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>
            </div>
        </section>
    );
}
