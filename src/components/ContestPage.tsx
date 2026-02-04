'use client';

import { Poppins } from 'next/font/google'; 
import { Clock, ShieldCheck, EyeOff } from 'lucide-react';
import DesignCard from '@/components/DesignCard'; 

// --- TYPES ---
interface Contest {
  title: string;
  price: number;
  status: string;
  isGuaranteed: boolean;
  isBlind: boolean;
  timeLeft: string;
  entries: number;
}

interface Design {
  id: number;
  designer: string;
  rating: number;
  logoIndex: number;
  image?: string;
}

// --- FONT ---
const poppins = Poppins({ 
  subsets: ['latin'], 
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
});

// --- COMPONENT ---
export default function ContestPage() {
  const contest: Contest = {
    title: "Slice of life Country Love Body Cream Rendering",
    price: 30,
    status: "Qualifying",
    isGuaranteed: true,
    isBlind: true,
    timeLeft: "1 day, 15 hours",
    entries: 65
  };

  // Helper function to generate unique image URLs
  const getImageUrl = (id: number, designer: string) => {
    return `https://picsum.photos/seed/contest-${designer}-${id}/600/600`;
  };

  const designs: Design[] = [
    { id: 25, designer: "Raj", rating: 4, logoIndex: 0, image: getImageUrl(25, 'Raj') },
    { id: 24, designer: "Palak", rating: 5, logoIndex: 1, image: getImageUrl(24, 'Palak') },
    { id: 22, designer: "Ramesh", rating: 0, logoIndex: 2, image: getImageUrl(22, 'Ramesh') },
    { id: 21, designer: "Jen", rating: 3, logoIndex: 3, image: getImageUrl(21, 'Jen') },
    { id: 16, designer: "James", rating: 0, logoIndex: 0, image: getImageUrl(16, 'James') },
    { id: 15, designer: "Robin", rating: 0, logoIndex: 1, image: getImageUrl(15, 'Robin') },
    { id: 13, designer: "Kali", rating: 2, logoIndex: 2, image: getImageUrl(13, 'Kali') },
    { id: 20, designer: "Polo986", rating: 0, logoIndex: 3, image: getImageUrl(20, 'Polo986') }, 
  ];

  // Fallback logo renderer - creates placeholder SVGs if image fails
  const renderLogo = (logoIndex: number) => {
    const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];
    const color = colors[logoIndex % colors.length];
    
    return (
      <svg viewBox="0 0 200 200" className="w-full h-full" aria-hidden="true">
        <rect width="200" height="200" fill="#f9fafb" />
        <circle cx="100" cy="100" r="60" fill="none" stroke={color} strokeWidth="4" />
        <text x="100" y="110" textAnchor="middle" fontFamily="var(--font-poppins), Poppins, sans-serif" fontSize="24" fontWeight="700" fill={color}>
          DESIGN
        </text>
      </svg>
    );
  };

  return (
    <main 
      className={`min-h-screen bg-[#F9FAFB] pb-20 ${poppins.variable}`}
      style={{
          '--font-body': 'var(--font-poppins)',
          '--font-heading': 'var(--font-poppins)',
          fontFamily: 'var(--font-poppins)'
      } as React.CSSProperties}
    >
      
      {/* HEADER SECTION */}
      <div className="bg-white border-b border-gray-200 pt-8 pb-0">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-6">
            <div>
                <h1 className="font-heading text-2xl font-bold text-gray-900 mb-3">{contest.title}</h1>
                <div className="flex flex-wrap gap-2 text-[11px] font-bold tracking-wide uppercase font-body">
                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full border border-gray-200">{contest.status}</span>
                    {contest.isGuaranteed && (<span className="flex items-center gap-1 text-black px-2 py-1"><ShieldCheck className="w-3 h-3" /> Guaranteed</span>)}
                    {contest.isBlind && (<span className="flex items-center gap-1 text-black px-2 py-1"><EyeOff className="w-3 h-3" /> Blind</span>)}
                </div>
            </div>
            <div className="flex flex-col items-end gap-2">
                <button className="bg-[#111] text-white px-8 py-3 text-xs font-bold uppercase tracking-wider rounded-md hover:bg-black transition-colors shadow-sm font-body">Submit Design</button>
                <div className="text-xl font-heading font-bold text-gray-900">{contest.price} USD</div>
            </div>
          </div>
          <div className="bg-[#1A1A1A] text-white px-4 py-3 rounded-md flex items-center gap-3 text-sm mb-8 shadow-md font-body">
             <Clock className="w-4 h-4 text-white" />
             <p>You have <span className="font-bold">{contest.timeLeft}</span> left to <span className="underline cursor-pointer">submit design concepts.</span></p>
          </div>
          <div className="flex gap-8 text-sm font-bold border-b border-gray-200 font-body">
             <button className="pb-4 text-gray-500 hover:text-black transition-colors">Brief</button>
             <button className="pb-4 border-b-2 border-black text-black">Designs <span className="ml-1 text-gray-400 font-normal">({contest.entries})</span></button>
          </div>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="max-w-7xl mx-auto px-8 py-6 flex gap-6 text-sm text-gray-500 border-b border-gray-200 font-body">
         <button className="text-black font-bold">All ({contest.entries})</button>
         <button className="hover:text-black">Active (11)</button>
         <button className="hover:text-black">Rated (2)</button>
         <button className="hover:text-black">Withdrawn (2)</button>
      </div>

      {/* DESIGN GRID */}
      <div className="max-w-7xl mx-auto px-8 py-8">
         <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {designs.map((design) => (
              <DesignCard key={design.id} design={design} renderLogo={renderLogo} image={design.image} />
            ))}
         </div>
      </div>

    </main>
  );
}
