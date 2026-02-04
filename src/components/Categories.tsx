"use client";

import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";

export default function Categories() {
    const categories = [
        { title: "Logo & Branding Design", img: "/cat-logo.avif" },
        { title: "Business & Advertising", img: "/cat-business.avif" },
        { title: "Packaging & Label", img: "/cat-package.avif" },
        { title: "Website & App Design", img: "/cat-web.avif" },
        { title: "Art & Illustration", img: "/cat-art.avif" },
    ];

    return (
        <section className="py-16 md:py-20 bg-white relative z-30">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-700">Design for what you need</h2>

                    <div className="flex-1 max-w-xl w-full">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="what do you need designed?"
                                className="w-full border border-gray-300 py-3 px-4 rounded pr-12 text-sm focus:outline-none focus:border-pink-500"
                            />
                            <button className="absolute right-0 top-0 h-full px-4 border-l border-gray-300 hover:bg-gray-50 cursor-pointer">
                                <Search size={18} className="text-gray-500" />
                            </button>
                        </div>
                    </div>

                    <Link href="/categories" className="text-sm text-gray-500 hover:text-pink-600 whitespace-nowrap">View all design categories</Link>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
                    {categories.map((item, index) => (
                        <div key={index} className="group cursor-pointer">
                            <div className="aspect-square bg-gray-100 overflow-hidden rounded-md mb-3 shadow-sm group-hover:shadow-md transition-all">
                                <Image src={item.img} alt={item.title} width={400} height={400} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                            </div>
                            <h3 className="text-sm font-bold text-center text-gray-800">{item.title}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
