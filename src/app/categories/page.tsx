'use client';

import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'; 
import { Poppins } from 'next/font/google'; 
import { Search, Check, ArrowUp, X, HelpCircle, MessageCircle, Send } from 'lucide-react';

const poppins = Poppins({ 
  subsets: ['latin'], 
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
});

// --- TYPES ---
type CategoryItem = {
  title: string;
  price: number;
  originalPrice?: number;
  desc: string;
  icon: string;
  // Layout Controls
  isHero?: boolean; 
  heroImage?: string;
  colSpan?: string; 
  rowSpan?: string; 
  heroCredit?: string;
};

type Category = {
  id: string;
  label: string;
  color: string;
  activeBg?: string;
  hoverColor: string;
  items: CategoryItem[];
};

// --- FULL DATA STRUCTURE (ALL 90+ ITEMS RESTORED & CORRECT LAYOUTS) ---
const CATEGORIES: Category[] = [
  {
    id: 'logo-identity',
    label: 'Logo & identity',
    color: 'bg-[#00C4CC]', 
    hoverColor: 'hover:bg-[#00b3b9]',
    items: [
      // Rows 1 & 2 (Standard Cards)
      { title: 'Logo design', price: 299, originalPrice: 349, desc: 'An unforgettable logo crafted for your brand', icon: '/images/categories/icons/placeholder.svg' },
      { title: 'Logo & brand guide', price: 429, desc: 'Logo, fonts, color palette and brand rules', icon: '/images/categories/icons/placeholder.svg' },
      { title: 'Brand starter pack', price: 599, desc: 'Logo, business card, letterhead & envelope', icon: '/images/categories/icons/placeholder.svg' },
      { title: 'Brand launch pack', price: 899, desc: 'Logo, brand guide, social media & print', icon: '/images/categories/icons/placeholder.svg' },
      { title: 'Logo & website', price: 1399, desc: 'Logo and custom website design', icon: '/images/categories/icons/placeholder.svg' },
      { title: 'Brand guide', price: 299, desc: 'A comprehensive guide of fonts & colors', icon: '/images/categories/icons/placeholder.svg' },
      { title: 'Business card', price: 169, desc: 'Unique card designed to build connections', icon: '/images/categories/icons/placeholder.svg' },
      { title: 'Stationery', price: 189, desc: 'Letterhead and envelopes', icon: '/images/categories/icons/placeholder.svg' },
      
      // BOTTOM ROW - FIXED LAYOUT
      // 1. The Standard Card (Col 1)
      { title: 'Full-Service Brand Pack', price: 4499, desc: 'A strategically crafted brand identity, guided end-to-end by your personal Brand Manager.', icon: '/images/categories/icons/placeholder.svg' },
      // 2. The Pure Image spanning rest of row (Cols 2-4)
      { 
        isHero: true, title: '', price: 0, desc: '', icon: '', // Empty data for pure image
        heroImage: '/images/categories/hero-logo.jpg', 
        colSpan: 'lg:col-span-3', 
        heroCredit: 'by dulibar_syeh'
      } 
    ]
  },
  {
    id: 'web-app',
    label: 'Web & app design',
    color: 'bg-[#4D53E0]', 
    hoverColor: 'hover:bg-[#3d43cc]',
    items: [
      { title: 'Website Builders', price: 549, desc: 'Easily bring your website to life', icon: '/images/categories/icons/placeholder.svg' },
      { title: 'Web page design', price: 599, desc: 'Engaging custom web design', icon: '/images/categories/icons/placeholder.svg' },
      
      // HERO IMAGE BLOCK (Right Top 2x2)
      { 
        isHero: true, title: '', price: 0, desc: '', icon: '',
        heroImage: '/images/categories/hero-web.jpg', 
        colSpan: 'lg:col-span-2', 
        rowSpan: 'lg:row-span-2',
        heroCredit: 'by Jammie'
      },

      { title: 'Website Redesign', price: 549, desc: 'A refreshed website to showcase you', icon: '/images/categories/icons/placeholder.svg' },
      { title: 'Blog', price: 349, desc: 'Custom blog design to keep them reading', icon: '/images/categories/icons/placeholder.svg' },
      // Rest of items
      { title: 'WordPress theme', price: 599, desc: 'Custom WordPress theme design', icon: '/images/categories/icons/placeholder.svg' },
      { title: 'Landing page', price: 349, desc: 'Landing page that gets clicks', icon: '/images/categories/icons/placeholder.svg' },
      { title: 'Icon or button', price: 199, desc: 'Professionally designed icons', icon: '/images/categories/icons/placeholder.svg' },
      { title: 'App Icon', price: 199, desc: 'A stunning app icon', icon: '/images/categories/icons/placeholder.svg' },
      { title: 'Website Icon', price: 199, desc: 'A website icon users recognize', icon: '/images/categories/icons/placeholder.svg' },
      { title: 'Form', price: 349, desc: 'Forms customized to collect data', icon: '/images/categories/icons/placeholder.svg' },
      { title: 'App design', price: 599, desc: 'User-friendly app that gets downloads', icon: '/images/categories/icons/placeholder.svg' },
      { title: 'iOS App', price: 599, desc: 'iOS app design worthy of Apple', icon: '/images/categories/icons/placeholder.svg' },
      { title: 'Android App', price: 599, desc: 'An app that looks great on Android', icon: '/images/categories/icons/placeholder.svg' },
      { title: 'Facebook cover', price: 79, desc: 'Custom Facebook cover', icon: '/images/categories/icons/placeholder.svg' },
      { title: 'Social media page', price: 79, desc: 'Social media backgrounds', icon: '/images/categories/icons/placeholder.svg' },
      { title: 'Twitter', price: 79, desc: 'Twitter header that compels', icon: '/images/categories/icons/placeholder.svg' },
      { title: 'YouTube', price: 79, desc: 'YouTube channel design', icon: '/images/categories/icons/placeholder.svg' },
      { title: 'Banner ad', price: 49, desc: 'Web ads that drive conversions', icon: '/images/categories/icons/placeholder.svg' },
      { title: 'Other web or app', price: 329, desc: 'Web design not created yet', icon: '/images/categories/icons/placeholder.svg' }
    ]
  },
  {
    id: 'business-advertising',
    label: 'Business & advertising',
    color: 'bg-[#FF5A1F]', 
    hoverColor: 'hover:bg-[#e04815]',
    items: [
      { title: 'Postcard, flyer or print', price: 199, desc: 'Marketing materials', icon: '/images/categories/icons/placeholder.svg' },
      { title: 'Leaflet', price: 199, desc: 'Leaflet designs that stick', icon: '/images/categories/icons/placeholder.svg' },
      { title: 'Direct Mail', price: 199, desc: 'Direct mail designs', icon: '/images/categories/icons/placeholder.svg' },
      { title: 'Flyer', price: 199, desc: 'Flyers that get distributed', icon: '/images/categories/icons/placeholder.svg' },
      { title: 'Poster', price: 199, desc: 'A popping poster', icon: '/images/categories/icons/placeholder.svg' },
      
      // HERO (Middle 2x2)
      { 
        isHero: true, title: '', price: 0, desc: '', icon: '',
        heroImage: '/images/categories/hero-business.jpg', 
        colSpan: 'lg:col-span-2', 
        rowSpan: 'lg:row-span-2',
        heroCredit: 'by OydinLame'
      }, 
      
      { title: 'Album Cover', price: 299, desc: 'An album cover meant for radio', icon: '/images/categories/icons/placeholder.svg' },
      { title: 'Podcast', price: 199, desc: 'Custom podcast art', icon: '/images/categories/icons/placeholder.svg' },
      { title: 'Infographic', price: 599, desc: 'Arranging info fast', icon: '/images/categories/icons/placeholder.svg' },
      { title: 'Brochure', price: 299, desc: 'A paper pamphlet', icon: '/images/categories/icons/placeholder.svg' },
      { title: 'Booklet', price: 299, desc: 'Booklets that guide', icon: '/images/categories/icons/placeholder.svg' },
      { title: 'Pamphlet', price: 199, desc: 'Pamphlets that inform', icon: '/images/categories/icons/placeholder.svg' },
      { title: 'Car, truck or van wrap', price: 349, desc: 'Vehicle graphics', icon: '/images/categories/icons/placeholder.svg' },
      { title: 'Signage', price: 199, desc: 'Signs that point customers', icon: '/images/categories/icons/placeholder.svg' },
      { title: 'Billboard', price: 199, desc: 'Billboard ads', icon: '/images/categories/icons/placeholder.svg' },
      { title: 'Trade Show Banner', price: 199, desc: 'Trade show booth banners', icon: '/images/categories/icons/placeholder.svg' },
      { title: 'Banner', price: 199, desc: 'Banners that promote', icon: '/images/categories/icons/placeholder.svg' },
      { title: 'Email', price: 299, desc: 'Email template that gets clicks', icon: '/images/categories/icons/placeholder.svg' },
      { title: 'Email Newsletter', price: 299, desc: 'Newsletters readers engage with', icon: '/images/categories/icons/placeholder.svg' },
      { title: 'PowerPoint template', price: 199, desc: 'PowerPoints that rock', icon: '/images/categories/icons/placeholder.svg' },
      { title: 'Menu', price: 199, desc: 'Appetizing menus', icon: '/images/categories/icons/placeholder.svg' },
      { title: 'Website header', price: 199, desc: 'Headers that impress', icon: '/images/categories/icons/placeholder.svg' },
      { title: 'Resume', price: 199, desc: 'Resumes that get you hired', icon: '/images/categories/icons/placeholder.svg' },
      { title: 'Word Template', price: 199, desc: 'Templates that make docs easy', icon: '/images/categories/icons/placeholder.svg' },
      { title: 'Trade Show Booth', price: 299, desc: 'Booths that bring in business', icon: '/images/categories/icons/placeholder.svg' },
      { title: 'Other business', price: 199, desc: 'Custom business designs', icon: '/images/categories/icons/placeholder.svg' }
    ]
  },
  {
    id: 'clothing',
    label: 'Clothing & merchandise',
    color: 'bg-[#989898]', 
    activeBg: 'bg-[#888]',
    hoverColor: 'hover:bg-[#777]',
    items: [
      { title: 'T-shirt', price: 199, desc: 'Shirts they will wanna keep', icon: '/images/categories/icons/placeholder.svg' },
      { title: 'Clothing or apparel', price: 199, desc: 'Apparel design that fits', icon: '/images/categories/icons/placeholder.svg' },
      // HERO (Right Top 2x2)
      { 
        isHero: true, title: '', price: 0, desc: '', icon: '',
        heroImage: '/images/categories/hero-clothing.jpg', 
        colSpan: 'lg:col-span-2', 
        rowSpan: 'lg:row-span-2',
        heroCredit: 'by netralica'
      },
      { title: 'Jersey', price: 199, desc: 'Custom jersey design', icon: '/images/categories/icons/placeholder.svg' },
      { title: 'Merchandise', price: 199, desc: 'Merchandise design', icon: '/images/categories/icons/placeholder.svg' },
      { title: 'Bag & Tote', price: 199, desc: 'Custom bag design', icon: '/images/categories/icons/placeholder.svg' },
      { title: 'Hat & Cap', price: 199, desc: 'A custom hat or cap', icon: '/images/categories/icons/placeholder.svg' },
      { title: 'Shopping Bag', price: 199, desc: 'On brand shopping bag', icon: '/images/categories/icons/placeholder.svg' },
      { title: 'Cup or mug', price: 169, desc: 'Cup design', icon: '/images/categories/icons/placeholder.svg' },
      { title: 'Sticker', price: 189, desc: 'A sticker design', icon: '/images/categories/icons/placeholder.svg' },
      { title: 'Other clothing', price: 199, desc: 'Clothing designs not listed', icon: '/images/categories/icons/placeholder.svg' }
    ]
  },
  {
    id: 'art-illustration',
    label: 'Art & illustration',
    color: 'bg-[#D65D7A]', 
    hoverColor: 'hover:bg-[#c24b66]',
    items: [
      { title: 'Illustration or graphics', price: 299, desc: 'Stunning illustrations', icon: '/images/categories/icons/placeholder.svg' },
      { title: 'Business Illustration', price: 299, desc: 'Business illustrations', icon: '/images/categories/icons/placeholder.svg' },
      { title: 'Website Illustration', price: 299, desc: 'Website illustrations', icon: '/images/categories/icons/placeholder.svg' },
      { title: 'Book illustration', price: 299, desc: 'Visuals that capture reader', icon: '/images/categories/icons/placeholder.svg' },
      // HERO (Middle Left 2x2)
      { 
        isHero: true, title: '', price: 0, desc: '', icon: '',
        heroImage: '/images/categories/hero-art.jpg', 
        colSpan: 'lg:col-span-2', 
        rowSpan: 'lg:row-span-2',
        heroCredit: 'by Zomkijime Ranes'
      },
      { title: 'Pattern', price: 199, desc: 'Patterns that make a statement', icon: '/images/categories/icons/placeholder.svg' },
      { title: 'Card or invitation', price: 199, desc: 'Card or invitation designs', icon: '/images/categories/icons/placeholder.svg' },
      { title: 'Invitation', price: 199, desc: 'An invitation that gets RSVPs', icon: '/images/categories/icons/placeholder.svg' },
      { title: 'Greeting Card', price: 199, desc: 'A greeting card that brightens', icon: '/images/categories/icons/placeholder.svg' },
      { title: 'Wedding Invitation', price: 199, desc: 'The perfect wedding invitation', icon: '/images/categories/icons/placeholder.svg' },
      { title: 'Character or mascot', price: 329, desc: 'A character with personality', icon: '/images/categories/icons/placeholder.svg' },
      { title: 'Tattoo', price: 299, desc: 'Tattoo designs', icon: '/images/categories/icons/placeholder.svg' },
      { title: '3D', price: 359, desc: '3D digital design', icon: '/images/categories/icons/placeholder.svg' },
      { title: '3D Architectural', price: 369, desc: '3D architectural rendering', icon: '/images/categories/icons/placeholder.svg' },
      { title: 'Other art', price: 329, desc: 'Art we cannot categorize', icon: '/images/categories/icons/placeholder.svg' }
    ]
  },
  {
    id: 'packaging',
    label: 'Packaging & label',
    color: 'bg-[#6B2C91]', 
    hoverColor: 'hover:bg-[#58207a]',
    items: [
      { title: 'Product packaging', price: 349, desc: 'Packaging that buyers love', icon: '/images/categories/icons/placeholder.svg' },
      { title: 'Food Packaging', price: 349, desc: 'Delicious food packaging', icon: '/images/categories/icons/placeholder.svg' },
      // HERO (Right Top 2x2)
      { 
        isHero: true, title: '', price: 0, desc: '', icon: '',
        heroImage: '/images/categories/hero-packaging.jpg', 
        colSpan: 'lg:col-span-2', 
        rowSpan: 'lg:row-span-2',
        heroCredit: 'by febriana'
      },
      { title: 'Retail Packaging', price: 349, desc: 'Retail packaging that sells', icon: '/images/categories/icons/placeholder.svg' },
      { title: 'Cosmetics Packaging', price: 349, desc: 'Cosmetics packaging', icon: '/images/categories/icons/placeholder.svg' },
      { title: 'Box', price: 349, desc: 'Box design for unboxing', icon: '/images/categories/icons/placeholder.svg' },
      { title: 'Product label', price: 299, desc: 'Product labels that stand out', icon: '/images/categories/icons/placeholder.svg' },
      { title: 'Food Label', price: 299, desc: 'Food labels', icon: '/images/categories/icons/placeholder.svg' },
      { title: 'Beverage Label', price: 299, desc: 'A refreshing beverage label', icon: '/images/categories/icons/placeholder.svg' },
      { title: 'Beer Label', price: 299, desc: 'Beer labels', icon: '/images/categories/icons/placeholder.svg' },
      { title: 'Wine Label', price: 299, desc: 'Wine labels', icon: '/images/categories/icons/placeholder.svg' },
      { title: 'Other packaging', price: 249, desc: 'Packaging outside the box', icon: '/images/categories/icons/placeholder.svg' },
    ]
  },
  {
    id: 'book-magazine',
    label: 'Book & magazine',
    color: 'bg-[#D34040]', 
    hoverColor: 'hover:bg-[#b03030]',
    items: [
      { title: 'Book cover', price: 279, desc: 'A book cover design', icon: '/images/categories/icons/placeholder.svg' },
      { title: 'Interior book design', price: 299, desc: 'Interior book design', icon: '/images/categories/icons/placeholder.svg' },
      { title: 'eBook Cover', price: 199, desc: 'An ebook cover', icon: '/images/categories/icons/placeholder.svg' },
      { title: 'Magazine cover', price: 249, desc: 'A magazine cover', icon: '/images/categories/icons/placeholder.svg' },
      // HERO (Middle 2x2)
      { 
        isHero: true, title: '', price: 0, desc: '', icon: '',
        heroImage: '/images/categories/hero-book.jpg', 
        colSpan: 'lg:col-span-2', 
        rowSpan: 'lg:row-span-2',
        heroCredit: 'by Halvir'
      },
      { title: 'Book Layout', price: 299, desc: 'A book layout', icon: '/images/categories/icons/placeholder.svg' },
      { title: 'Other book', price: 299, desc: 'Book designs not fitting a genre', icon: '/images/categories/icons/placeholder.svg' },
    ]
  }
];

export default function CategoriesPage() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  const scrollDirection = useRef<'left' | 'right' | null>(null);
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    if (!role) router.push('/login');
  }, [router]);

  // --- FILTER LOGIC ---
  const filteredItems = useMemo(() => {
    if (!searchQuery) return activeCategory.items;
    // Filter all items that have titles (excludes pure image blocks)
    const allItems = CATEGORIES.flatMap(cat => cat.items).filter(item => item.title); 
    return allItems.filter(item => 
      item.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.desc?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, activeCategory]);

  // --- AUTO SCROLL LOGIC ---
  const scroll = useCallback(() => {
    if (!scrollContainerRef.current || !scrollDirection.current) return;
    const scrollAmount = 8;
    if (scrollDirection.current === 'left') {
        scrollContainerRef.current.scrollBy({ left: -scrollAmount, behavior: 'auto' });
    } else {
        scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'auto' });
    }
    animationFrameId.current = requestAnimationFrame(scroll);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    const { left, width } = scrollContainerRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const zoneWidth = 100;

    let newDirection: 'left' | 'right' | null = null;
    if (x < zoneWidth) newDirection = 'left';
    else if (x > width - zoneWidth) newDirection = 'right';

    if (newDirection !== scrollDirection.current) {
        scrollDirection.current = newDirection;
        if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
        if (newDirection) animationFrameId.current = requestAnimationFrame(scroll);
    }
  }, [scroll]);

  const handleMouseLeave = useCallback(() => {
      scrollDirection.current = null;
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
  }, []);

  const handleSearchFocus = () => {
      setIsSearchExpanded(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => {
          if (searchInputRef.current) searchInputRef.current.focus();
      }, 400); 
  };

  // --- HELPER: Render Price with Discount Logic ---
  const renderPrice = (price: number, originalPrice?: number) => {
      if (originalPrice && originalPrice > price) {
          return (
              <div className="flex items-center gap-2">
                  <span className="text-gray-400 line-through text-xs">US${originalPrice}</span>
                  <span className="text-red-600 font-bold">from US${price}</span>
              </div>
          );
      }
      return <span className="text-gray-500">from US${price}</span>;
  };

  return (
    <main className={`min-h-screen bg-[#F4F4F4] ${poppins.variable}`} style={{ fontFamily: 'var(--font-poppins)' }}>
      
      {/* 1. HEADER */}
      <div className="bg-white pt-12 pb-8 px-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Home / Categories</div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">What do you need designed?</h1>
        </div>
      </div>

      {/* 2. STICKY NAV (SIZE h-20) */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm">
        <div className="max-w-[1200px] mx-auto px-8 flex items-center h-20" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
            
            {/* SEARCH (Fixed Left) */}
            <div className={`relative transition-all duration-300 ease-in-out z-20 ${isSearchExpanded ? 'w-72 mr-6' : 'w-14 mr-4'}`}>
                {isSearchExpanded ? (
                    <div className="relative w-full">
                        <input 
                            ref={searchInputRef}
                            type="text" 
                            placeholder="Search..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onBlur={() => !searchQuery && setIsSearchExpanded(false)}
                            className="w-full bg-[#F3F3F3] h-12 pl-12 pr-10 text-[15px] rounded-sm focus:outline-none focus:ring-2 focus:ring-gray-900 font-medium"
                        />
                         <Search className="w-5 h-5 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2" />
                         {searchQuery && (
                             <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2">
                                 <X className="w-4 h-4 text-gray-400 hover:text-black" />
                             </button>
                         )}
                    </div>
                ) : (
                    <button onClick={handleSearchFocus} className="w-14 h-12 bg-[#F3F3F3] hover:bg-[#EBEBEB] flex items-center justify-center rounded-sm transition-colors">
                        <Search className="w-6 h-6 text-gray-600" />
                    </button>
                )}
            </div>

            {/* CATEGORIES SCROLL */}
            <div ref={scrollContainerRef} className="flex-1 overflow-x-auto flex gap-2 no-scrollbar h-full items-center scroll-smooth pl-2">
                {CATEGORIES.map((cat) => (
                    <button 
                        key={cat.id}
                        onClick={() => { setActiveCategory(cat); setSearchQuery(''); }}
                        className={`whitespace-nowrap px-6 py-4 text-[16px] font-bold rounded-sm transition-all duration-200 ${
                            activeCategory.id === cat.id && !searchQuery
                            ? `${cat.activeBg || cat.color} text-white shadow-md` 
                            : 'bg-transparent text-gray-600 hover:bg-gray-100 hover:text-black'
                        }`}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>
        </div>
      </div>

      {/* 3. MAIN GRID CONTENT */}
      <div className="max-w-[1200px] mx-auto px-8 py-16">
        
        {searchQuery && (
            <div className="mb-8 text-xl font-bold text-gray-900">
                Showing results for "{searchQuery}"
            </div>
        )}

        {/* GRID WITH DIVIDERS */}
        <div className="bg-gray-200 border border-gray-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px overflow-hidden rounded-sm shadow-sm">
            
            {filteredItems.map((item, index) => {
                // CASE 1: PURE IMAGE BLOCK (No Title)
                if (!item.title && item.isHero && !searchQuery) {
                    return (
                        <div key={index} className={`hidden lg:flex ${item.colSpan} ${item.rowSpan} bg-white items-center justify-center relative overflow-hidden group p-8`}>
                            <img src={item.heroImage} alt="Category Hero" className="w-full h-full object-contain transform hover:scale-105 transition-transform duration-500 drop-shadow-lg" />
                            <span className="absolute bottom-6 right-6 text-xs text-gray-400 italic opacity-0 group-hover:opacity-100 transition-opacity">{item.heroCredit}</span>
                        </div>
                    );
                }

                // CASE 2: STANDARD CARD (Has Title)
                if (item.title) {
                     return (
                        <Link 
                            href={`/categories/${item.title?.toLowerCase().replace(/\s+/g, '-')}`}
                            key={index} 
                            // LARGE PADDING (p-10) & HEIGHT (min-h-[420px])
                            className={`group bg-white p-10 hover:z-10 hover:-translate-y-1 transition-all duration-300 flex flex-col min-h-[420px] ${item.colSpan || ''}`}
                        >
                            {/* Icon */}
                            <div className="mb-8 h-12 flex items-end">
                                <img 
                                    src={item.icon} 
                                    alt={item.title} 
                                    className="w-12 h-12 object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                                    onError={(e) => (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><circle cx="20" cy="20" r="20" fill="%23eee"/></svg>'} 
                                />
                            </div>

                            {/* Title (Larger Font) */}
                            <h3 className="text-[20px] font-extrabold text-gray-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors">
                                {item.title}
                            </h3>

                            {/* Price with Discount Logic */}
                            <div className="text-[13px] font-bold uppercase tracking-wide mb-5">
                                {renderPrice(item.price, item.originalPrice)}
                            </div>

                            {/* Description */}
                            <p className="text-[15px] text-gray-600 leading-relaxed mb-8 flex-grow">
                                {item.desc}
                            </p>

                            {/* Divider & Features */}
                            <div className="mt-auto pt-5 border-t border-gray-100">
                                <div className="flex flex-col gap-3">
                                    <div className="flex gap-3 items-center text-[12px] text-gray-500 font-medium">
                                        <Check className="w-4 h-4 text-green-500" /> Expert Designers
                                    </div>
                                    <div className="flex gap-3 items-center text-[12px] text-gray-500 font-medium">
                                        <Check className="w-4 h-4 text-green-500" /> 100% Money Back
                                    </div>
                                </div>
                            </div>
                        </Link>
                    );
                }
                return null;
            })}
        </div>

        {/* BOTTOM CTA */}
        {!searchQuery && (
            <div className="mt-24 mb-10 text-center">
                <button onClick={handleSearchFocus} className="group flex items-center justify-center gap-3 mx-auto text-blue-600 font-bold text-[15px] transition-all hover:text-blue-800 cursor-pointer">
                    <span>Still haven't found what you're looking for? Search and ye shall find</span>
                    <ArrowUp className="w-5 h-5 transition-transform group-hover:-translate-y-1" />
                </button>
            </div>
        )}
      </div>

      {/* FLOATING HELP BUTTON & CHAT */}
      <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-4">
          {isChatOpen && (
              <div className="bg-white w-80 h-96 rounded-lg shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 duration-300">
                  <div className="bg-black text-white p-4 flex justify-between items-center font-bold">
                      <div className="flex items-center gap-2"><MessageCircle className="w-5 h-5" /> Design Expert</div>
                      <button onClick={() => setIsChatOpen(false)}><X className="w-5 h-5" /></button>
                  </div>
                  <div className="flex-1 p-4 bg-gray-50 overflow-y-auto text-sm text-gray-600">
                      <div className="bg-white p-3 rounded-br-lg rounded-tl-lg rounded-tr-lg shadow-sm mb-4 max-w-[80%]">
                          Hello! How can I help you today?
                      </div>
                  </div>
                  <div className="p-3 bg-white border-t border-gray-100 flex gap-2">
                      <input type="text" placeholder="Type a message..." className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none" />
                      <button className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700"><Send className="w-4 h-4" /></button>
                  </div>
              </div>
          )}
          <button 
            onClick={() => setIsChatOpen(!isChatOpen)}
            className="bg-[#333] text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-3 text-[15px] font-bold hover:bg-black transition-all hover:scale-105 active:scale-95"
          >
              <HelpCircle className="w-5 h-5" /> Help
          </button>
      </div>

    </main>
  );
}
