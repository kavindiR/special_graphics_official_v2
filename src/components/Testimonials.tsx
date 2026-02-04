"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

export default function Testimonials() {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Data for the 3 Testimonial Slides
    // Note: Using existing file names from public folder mapping to the testimonials
    const testimonials = [
        {
            id: 1,
            // productImg: "/product-ethique.avif", // Desired by user, mapping to existing file
            productImg: "/testimonial-slide-1.avif",
            avatarImg: "/avatar-richard.avif",
            name: "Richard Van Balen",
            role: "Founder of Ethique Body, Florida",
            quote: "Special Graphics is a platform with a good name and a very good service..."
        },
        {
            id: 2,
            // productImg: "/product-jedi.avif",
            productImg: "/testimonial-slide-2.avif",
            avatarImg: "/avatar-ryan.avif",
            name: "Ryan Spalding",
            role: "Founder of Jedi Mind Tricks, Texas",
            quote: "Special Graphics is a platform with a good name and a very good service..."
        },
        {
            id: 3,
            // productImg: "/product-diba.avif",
            productImg: "/testimonial-slide-3.avif",
            avatarImg: "/avatar-masoud.avif",
            name: "Masoud Pajouh",
            role: "Founder of Dibaonline.de & Diba Products, Germany",
            quote: "Special Graphics is a platform with a good name and a very good service..."
        }
    ];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    };

    return (
        <section className="py-24 bg-white relative">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center gap-10 min-h-[400px]">

                    {/* Left: Product Image (Changes with slide) */}
                    <div className="lg:w-1/2 flex justify-center relative w-full">
                        {/* Background pattern simulation */}
                        <div className="absolute inset-0 bg-gray-50 rounded-full opacity-50 blur-3xl scale-90"></div>
                        <div className="relative h-[400px] w-full flex items-center justify-center">
                            <Image
                                key={`prod-${currentSlide}`}
                                src={testimonials[currentSlide].productImg}
                                alt="Product"
                                width={500}
                                height={600}
                                className="relative z-10 w-auto h-full max-h-[400px] object-contain animate-in fade-in duration-500"
                            />
                        </div>
                    </div>

                    {/* Right: Quote & Info (Changes with slide) */}
                    <div className="lg:w-1/2 relative w-full">
                        <span className="text-[#e85a4f] text-6xl font-sans absolute -top-8 -left-4">"</span>
                        <h3 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-8 pl-8">
                            {testimonials[currentSlide].quote}
                        </h3>

                        <p className="text-gray-500 text-sm leading-relaxed mb-10 pl-8 border-l-4 border-transparent">
                            where entrepreneurs can easily find the right design for their company. The book cover for us was a very important part of the success of the book. Therefore, we entrusted this to experts and ended up being very happy with the result."
                        </p>

                        <div className="flex items-center gap-4 pl-8">
                            <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-200">
                                <Image
                                    key={`avatar-${currentSlide}`}
                                    src={testimonials[currentSlide].avatarImg}
                                    alt={testimonials[currentSlide].name}
                                    width={48}
                                    height={48}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <div className="animate-in slide-in-from-right-2 duration-300">
                                <p className="font-bold text-gray-800 text-sm">{testimonials[currentSlide].name}</p>
                                <p className="text-gray-400 text-xs italic">{testimonials[currentSlide].role}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation Arrows */}
                <button
                    onClick={prevSlide}
                    className="absolute left-2 md:left-10 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                >
                    <ChevronLeft size={40} className="text-gray-400 font-thin hover:text-gray-800" />
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-2 md:right-10 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                >
                    <ChevronRight size={40} className="text-gray-400 font-thin hover:text-gray-800" />
                </button>

                {/* Dots */}
                <div className="flex justify-center gap-3 mt-12">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${currentSlide === index ? 'bg-black scale-110' : 'bg-transparent border border-black hover:bg-gray-200'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
