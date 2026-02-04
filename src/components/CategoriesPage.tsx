'use client';

import { useState } from 'react';
import { Search, ThumbsUp, Eye, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import Link from 'next/link';

export default function CategoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState('Logo & Branding');

  const categories = [
    { name: 'Logo & Branding', slug: 'logo-branding' },
    { name: 'Web & App Design', slug: 'web-app-design' },
    { name: 'Business & Advertising', slug: 'business-advertising' },
    { name: 'Clothing & Merchandising', slug: 'clothing-merchandising' },
    { name: 'Art & Illustration', slug: 'art-illustration' },
    { name: 'Packaging & Label', slug: 'packaging-label' },
    { name: 'Book', slug: 'book' },
  ];

  const winningLogos = [
    {
      id: 1,
      title: 'SOUTHERN STYLE CUISINE',
      designer: 'Palak999',
      likes: 43,
      views: '1.5K',
      comments: 11,
    },
    {
      id: 2,
      title: 'WONDER FARM WINE-YARD',
      designer: 'Abishek89',
      likes: 43,
      views: '1.5K',
      comments: 11,
    },
    {
      id: 3,
      title: 'SOUTHERN STYLE CUISINE',
      designer: 'Shehani9',
      likes: 43,
      views: '1.5K',
      comments: 11,
    },
    {
      id: 4,
      title: 'PASO PIZZA WOOD EST. 2023',
      designer: 'Rox009',
      likes: 43,
      views: '1.5K',
      comments: 11,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Breadcrumbs */}
        <div className="mb-4 sm:mb-6">
          <nav className="text-xs sm:text-sm text-gray-600">
            <span className="hover:text-gray-900 cursor-pointer">Home</span>
            <span className="mx-2">/</span>
            <span className="text-gray-900">Categories</span>
          </nav>
        </div>

        {/* Category Selection Section */}
        <div className="mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight">Select the Category</h1>
            <div className="relative w-full sm:w-auto sm:min-w-[280px] lg:min-w-[300px]">
              <Input
                type="text"
                placeholder="Ex. Logo Design"
                className="pl-4 pr-10 h-11 sm:h-10 w-full border-gray-300 rounded-md text-sm sm:text-base"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4">
            {categories.map((category) => (
              selectedCategory === category.name || selectedCategory === category.slug ? (
                <Link
                  key={category.slug}
                  href={`/categories/${category.slug}`}
                  className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium bg-white text-gray-900 shadow-md min-h-[44px] touch-manipulation rounded-md hover:shadow-lg transition-all"
                  style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}
                >
                  {category.name}
                </Link>
              ) : (
                <Link
                  key={category.slug}
                  href={`/categories/${category.slug}`}
                  className="px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium text-gray-900 hover:text-gray-700 transition-colors min-h-[44px] touch-manipulation rounded-md hover:bg-gray-50"
                >
                  {category.name}
                </Link>
              )
            ))}
          </div>
        </div>

        {/* Custom Logo Design Promotional Section */}
        <div className="mb-12 sm:mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start">
            <div className="order-2 lg:order-1">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
                Custom logo design made for your business
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                Grow your business with a professional, custom logo designed by our freelance creative experts. Because good design makes great business.
              </p>

              <div className="mb-6 sm:mb-8">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">What you get</h3>
                <ul className="space-y-2 sm:space-y-3 text-gray-700 text-sm sm:text-base">
                  <li className="flex items-start">
                    <span className="mr-2 text-gray-900 flex-shrink-0">•</span>
                    <span>Fun and easy process – dozens of options to choose from</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-gray-900 flex-shrink-0">•</span>
                    <span>Work with the best – all designers vetted for quality</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-gray-900 flex-shrink-0">•</span>
                    <span>Full ownership – digital and print-ready files</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-gray-900 flex-shrink-0">•</span>
                    <span>100% money-back guarantee for contests. T&Cs apply</span>
                  </li>
                </ul>
              </div>

              <div className="mb-4 sm:mb-6">
                <p className="text-xl sm:text-2xl font-bold text-gray-900">Starting from $299</p>
              </div>

              <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 items-stretch sm:items-center">
                <Button className="bg-gray-800 hover:bg-gray-900 text-white rounded-none px-5 sm:px-6 py-3 sm:py-2 h-auto font-medium min-h-[44px] touch-manipulation w-full sm:w-auto">
                  View All Categories
                </Button>
                <a href="#" className="text-gray-900 font-medium hover:underline text-sm sm:text-base text-center sm:text-left py-2 min-h-[44px] flex items-center justify-center sm:justify-start touch-manipulation">
                  Start Your Project Now
                </a>
              </div>
            </div>

            {/* Animated Logo Collage - Right Side */}
            <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center lg:items-start lg:justify-end order-1 lg:order-2">
              <div className="relative w-full h-full max-w-full lg:max-w-xl">
                {/* Animated Logo Cards */}
                <div className="relative w-full h-full">
                  {/* Card 1 - Top Left (Smallest) */}
                  <div className="absolute top-0 left-0 w-32 sm:w-40 md:w-48 lg:w-56 h-40 sm:h-48 md:h-56 lg:h-64 bg-white shadow-lg rounded-sm transform rotate-[-8deg] hover:rotate-[-5deg] hover:scale-105 hover:z-20 transition-all duration-300 cursor-pointer animate-fade-in-up overflow-hidden"
                    style={{ animationDelay: '0s' }}>
                    <div className="w-full h-full relative">
                      <Image
                        src="/cat-art.avif"
                        alt="THE SALTED COD ARTHOUSE"
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, (max-width: 1024px) 192px, 224px"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-2">
                        <div className="text-[10px] sm:text-xs font-bold text-white mb-0.5 text-center">THE SALTED COD</div>
                        <div className="text-[8px] sm:text-[10px] font-bold text-white mb-1 text-center">ARTHOUSE</div>
                        <div className="text-[7px] sm:text-[8px] text-white/80 text-center">2022</div>
                      </div>
                    </div>
                  </div>

                  {/* Card 2 - Top Right (Medium) */}
                  <div className="absolute top-4 sm:top-8 right-0 sm:right-4 w-36 sm:w-44 md:w-52 lg:w-60 h-44 sm:h-52 md:h-60 lg:h-68 bg-white shadow-lg rounded-sm transform rotate-[6deg] hover:rotate-[4deg] hover:scale-105 hover:z-20 transition-all duration-300 cursor-pointer animate-fade-in-up overflow-hidden"
                    style={{ animationDelay: '0.2s' }}>
                    <div className="w-full h-full relative">
                      <Image
                        src="/cat-business.avif"
                        alt="CARRIAGE HOUSE INN"
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 144px, (max-width: 768px) 176px, (max-width: 1024px) 208px, 240px"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-2">
                        <div className="text-[10px] sm:text-xs font-bold text-white mb-0.5 text-center">CARRIAGE</div>
                        <div className="text-[10px] sm:text-xs font-bold text-white mb-1 text-center">HOUSE INN</div>
                        <div className="flex gap-2 justify-center text-[7px] sm:text-[8px] text-white/80">
                          <span>ESTO</span>
                          <span>2022</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card 3 - Bottom Left (Largest) */}
                  <div className="absolute bottom-0 sm:bottom-4 left-4 sm:left-8 w-40 sm:w-48 md:w-56 lg:w-64 h-48 sm:h-56 md:h-64 lg:h-72 bg-white shadow-xl rounded-sm transform rotate-[-4deg] hover:rotate-[-2deg] hover:scale-105 hover:z-20 transition-all duration-300 cursor-pointer animate-fade-in-up overflow-hidden"
                    style={{ animationDelay: '0.4s' }}>
                    <div className="w-full h-full relative">
                      <Image
                        src="/cat-logo.avif"
                        alt="QUALITY LANDSCAPING"
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 160px, (max-width: 768px) 192px, (max-width: 1024px) 224px, 256px"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/85 via-black/60 to-transparent p-3">
                        <div className="text-xs sm:text-sm md:text-base font-bold text-white mb-1 text-center">QUALITY</div>
                        <div className="text-[10px] sm:text-xs md:text-sm font-bold text-white mb-1 text-center">LANDSCAPING</div>
                        <div className="text-[8px] sm:text-[10px] text-white/90 font-bold text-center">-EST- 1986</div>
                      </div>
                    </div>
                  </div>

                  {/* Card 4 - Bottom Right (Small) */}
                  <div className="absolute bottom-8 sm:bottom-12 right-8 sm:right-12 w-32 sm:w-36 md:w-40 lg:w-44 h-36 sm:h-40 md:h-44 lg:h-48 bg-white shadow-lg rounded-full transform rotate-[8deg] hover:rotate-[6deg] hover:scale-105 hover:z-20 transition-all duration-300 cursor-pointer animate-fade-in-up overflow-hidden"
                    style={{ animationDelay: '0.6s' }}>
                    <div className="w-full h-full relative">
                      <Image
                        src="/cat-package.avif"
                        alt="STONE VENEER DIRECT"
                        fill
                        className="object-cover rounded-full"
                        sizes="(max-width: 640px) 128px, (max-width: 768px) 144px, (max-width: 1024px) 160px, 176px"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent rounded-b-full p-2">
                        <div className="text-[8px] sm:text-[10px] font-bold text-white text-center leading-tight">
                          STONE VENEER<br/>DIRECT
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Logo Winning Contests Section */}
        <div className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 md:mb-8">
            Logo Winning Contests
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
            {winningLogos.map((logo, index) => (
              <div
                key={logo.id}
                className="bg-white overflow-hidden hover:shadow-lg active:scale-[0.98] transition-all duration-200 cursor-pointer rounded-none touch-manipulation"
              >
                <div className="aspect-square bg-white border border-gray-200 relative overflow-hidden">
                  <Image
                    src={index === 0 ? "/feature-logos-hex-1.avif" : index === 1 ? "/feature-logos-hex-2.avif" : index === 2 ? "/feature-logos-hex-3.avif" : "/feature-logos-hex-4.avif"}
                    alt={logo.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                  />
                </div>
                <div className="p-3 sm:p-4 bg-white">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
                    <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-wrap">
                      <div className="flex items-center gap-1 sm:gap-1.5">
                        <ThumbsUp className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-600 fill-gray-600" strokeWidth={0} />
                        <span className="text-[10px] sm:text-xs text-gray-500">{logo.likes}</span>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-1.5">
                        <Eye className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-600 fill-gray-600" strokeWidth={0} />
                        <span className="text-[10px] sm:text-xs text-gray-500">{logo.views}</span>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-1.5">
                        <MessageCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-600 fill-gray-600" strokeWidth={0} />
                        <span className="text-[10px] sm:text-xs text-gray-500">{logo.comments}</span>
                      </div>
                    </div>
                    <span className="text-[10px] sm:text-xs text-gray-500">By {logo.designer}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a href="#" className="text-gray-900 font-bold text-base sm:text-lg hover:underline inline-block py-2 min-h-[44px] flex items-center justify-center touch-manipulation">
              See all Winning Contests
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
