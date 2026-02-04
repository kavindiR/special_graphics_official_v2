'use client';

import { useState } from 'react';
import { Poppins } from 'next/font/google'; 
import { Heart, Search, X, ChevronLeft, ChevronRight, ThumbsUp, Maximize2, ZoomIn } from 'lucide-react';

const poppins = Poppins({ 
  subsets: ['latin'], 
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
});

// --- MOCK DATA (8 Items) ---
interface Design {
  id: number;
  title: string;
  designer: string;
  likes: number;
  description: string;
  tags: string[];
  tools: string;
  image: string;
  isLiked: boolean;
}

const initialDesigns: Design[] = [
  {
    id: 1,
    title: 'Creative Logo Design',
    designer: 'Red_Dragon',
    likes: 14,
    description: "Gift Box for realtors in collaboration with Finchberry products.",
    tags: ['Logo', 'Branding'],
    tools: 'Illustrator',
    image: '/inspiration/1.jpeg', 
    isLiked: false
  },
  { 
    id: 2, title: 'Modern Coffee Brand', designer: 'Studio_K', likes: 45, 
    description: "Modern minimalist branding.", tags: ['Branding'], tools: 'Photoshop',
    image: '/inspiration/2.jpeg', isLiked: true 
  },
  { 
    id: 3, title: 'Neon Cyberpunk', designer: 'Neon_Arts', likes: 32, 
    description: "Futuristic poster design.", tags: ['Poster'], tools: 'Procreate',
    image: '/inspiration/3.jpeg', isLiked: false 
  },
  { 
    id: 4, title: 'Eco Packaging', designer: 'Pack_Master', likes: 89, 
    description: "Sustainable packaging.", tags: ['Packaging'], tools: 'Blender',
    image: '/inspiration/4.jpeg', isLiked: false 
  },
  { 
    id: 5, title: 'Corporate Web UI', designer: 'UI_Ninja', likes: 12, 
    description: "Clean website layout.", tags: ['Web Design'], tools: 'Figma',
    image: '/inspiration/5.png', isLiked: false 
  },
  { 
    id: 6, title: 'Fitness App', designer: 'App_Wiz', likes: 67, 
    description: "Dark mode mobile interface.", tags: ['App'], tools: 'Figma',
    image: '/inspiration/6.jpg', isLiked: true 
  },
  { 
    id: 7, title: 'Vintage Label', designer: 'Old_School', likes: 55, 
    description: "Hand-drawn vintage label.", tags: ['Label'], tools: 'Illustrator',
    image: '/inspiration/7.jpg', isLiked: false 
  },
  { 
    id: 8, title: 'Abstract Album Art', designer: 'Music_Visuals', likes: 102, 
    description: "Abstract 3D render.", tags: ['Album Art'], tools: 'Cinema 4D',
    image: '/inspiration/8.png', isLiked: true 
  }
];

export default function ShowcasePage() {
  const [designs, setDesigns] = useState<Design[]>(initialDesigns);
  const [selectedDesign, setSelectedDesign] = useState<Design | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showLikedOnly, setShowLikedOnly] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  // --- FILTER LOGIC ---
  const filteredDesigns = designs.filter(design => {
    const matchesSearch = design.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          design.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFilter = showLikedOnly ? design.isLiked : true;
    return matchesSearch && matchesFilter;
  });

  const openDetail = (design: Design) => { 
    setSelectedDesign(design); 
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  };
  
  const closeDetail = () => { 
    setSelectedDesign(null); 
    setIsFullScreen(false); 
  };
  
  const toggleLike = (id: number) => {
    setDesigns(prev => prev.map(d => 
        d.id === id ? { ...d, isLiked: !d.isLiked, likes: d.isLiked ? d.likes - 1 : d.likes + 1 } : d
    ));
    if (selectedDesign && selectedDesign.id === id) {
        setSelectedDesign(prev => prev ? ({ ...prev, isLiked: !prev.isLiked, likes: !prev.isLiked ? prev.likes + 1 : prev.likes - 1 }) : null);
    }
  };

  return (
    <main 
      className={`min-h-screen bg-white ${poppins.variable}`}
      style={{
          '--font-body': 'var(--font-poppins)',
          '--font-heading': 'var(--font-poppins)',
          fontFamily: 'var(--font-poppins)'
      } as React.CSSProperties}
    >
      
      {/* FULL SCREEN MODAL */}
      {isFullScreen && selectedDesign && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
            <button onClick={() => setIsFullScreen(false)} className="absolute top-6 right-6 text-white hover:text-gray-300">
                <X className="w-10 h-10" />
            </button>
            <div className="relative max-w-7xl max-h-[90vh]">
                 <img src={selectedDesign.image} alt={selectedDesign.title} className="max-w-full max-h-[90vh] object-contain" />
            </div>
        </div>
      )}

      {/* CONTAINER */}
      <div className="max-w-[1400px] mx-auto px-6 py-10">

        {/* --- VIEW 1: GALLERY LIST --- */}
        {!selectedDesign && (
          <>
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-10 border-b border-gray-100 pb-6">
                <div>
                    <h1 className="font-heading text-3xl font-bold text-gray-900 mb-4">Discover graphic design ideas & inspiration</h1>
                    <div className="flex items-center gap-2">
                         <div className="relative">
                            <input 
                                type="text" 
                                placeholder="Search logos, branding..." 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-sm text-sm w-80 focus:outline-none focus:border-black transition-all"
                            />
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                         </div>
                         <button className="border border-gray-300 px-4 py-2 text-sm rounded-sm hover:bg-gray-50 transition-colors">Filters</button>
                    </div>
                </div>
                <div className="flex items-center gap-3 mb-1 md:mb-0 cursor-pointer" onClick={() => setShowLikedOnly(!showLikedOnly)}>
                    <span className={`text-sm font-bold ${showLikedOnly ? 'text-black' : 'text-gray-500'} transition-colors`}>Filter your liked designs</span>
                    <div className={`w-10 h-5 rounded-full relative transition-colors duration-300 ${showLikedOnly ? 'bg-black' : 'bg-gray-300'}`}>
                        <div className={`w-4 h-4 bg-white rounded-full shadow-sm absolute top-0.5 transition-transform duration-300 ${showLikedOnly ? 'left-5' : 'left-0.5'}`}></div>
                    </div>
                </div>
            </div>

            {/* GRID LAYOUT - 4 COLUMNS */}
            {filteredDesigns.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredDesigns.map((design) => (
                        <div key={design.id} className="relative group cursor-pointer" onClick={() => openDetail(design)}>
                            
                            {/* --- IMAGE FIX IS HERE --- */}
                            <div className="w-full h-72 bg-gray-100 rounded-sm relative overflow-hidden shadow-sm hover:shadow-md transition-all">
                                {design.image ? (
                                    // object-cover: Fills the box completely, cropping edges if needed
                                    // w-full h-full: Ensures it takes 100% of the container size
                                    <img 
                                        src={design.image} 
                                        alt={design.title} 
                                        className="w-full h-full object-cover" 
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-xs">[Image Placeholder]</div>
                                )}
                                
                                {/* HOVER OVERLAY */}
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center">
                                    <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm mb-2 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                                        <ZoomIn className="w-6 h-6 text-white" />
                                    </div>
                                    <span className="text-white font-bold tracking-wide text-sm">View Design</span>
                                </div>

                                {/* Bottom Info */}
                                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-between items-end">
                                    <div className="text-white">
                                        <h3 className="font-bold text-sm">{design.title}</h3>
                                        <p className="text-xs opacity-90">by {design.designer}</p>
                                    </div>
                                    {design.isLiked && <Heart className="w-4 h-4 text-red-500 fill-red-500" />}
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 text-gray-400"><p>No designs found.</p></div>
            )}
          </>
        )}

        {/* --- VIEW 2: DETAIL VIEW --- */}
        {selectedDesign && (
           <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
               <div className="flex justify-between items-center mb-6">
                   <div className="text-sm text-gray-500">
                       <span className="cursor-pointer hover:text-black transition-colors" onClick={closeDetail}>Showcase</span> / Detail
                   </div>
                   <div className="flex items-center gap-4 text-sm font-medium text-gray-600">
                       <ChevronLeft className="w-4 h-4 cursor-pointer hover:text-black" />
                       <span> {selectedDesign.id} / {designs.length} </span>
                       <ChevronRight className="w-4 h-4 cursor-pointer hover:text-black" />
                       <X className="w-5 h-5 ml-4 cursor-pointer hover:text-red-500 transition-colors" onClick={closeDetail} />
                   </div>
               </div>

               <div className="bg-white border border-gray-100 shadow-lg rounded-sm flex flex-col md:flex-row min-h-[600px]">
                   <div className="w-full md:w-[350px] border-r border-gray-100 p-8 flex flex-col flex-shrink-0">
                       <h2 className="font-heading text-2xl font-bold text-gray-900 mb-6">{selectedDesign.title}</h2>
                       <div className="flex items-center justify-between mb-2">
                           <div className="flex items-center gap-3">
                               <div className="w-10 h-10 bg-black rounded-sm flex items-center justify-center text-white text-xs font-bold">
                                   {selectedDesign.designer.substring(0, 2).toUpperCase()}
                               </div>
                               <div className="text-xs">
                                   <span className="text-gray-400 block">by</span>
                                   <span className="font-bold text-gray-900">{selectedDesign.designer}</span>
                               </div>
                           </div>
                           <button onClick={() => toggleLike(selectedDesign.id)} className={`flex items-center gap-1.5 text-xs border px-3 py-1.5 rounded-full transition-all ${selectedDesign.isLiked ? 'border-red-500 text-red-500 bg-red-50' : 'border-gray-200 text-gray-500 hover:border-black hover:text-black'}`}>
                               <span>{selectedDesign.likes}</span>
                               <ThumbsUp className={`w-3 h-3 ${selectedDesign.isLiked ? 'fill-current' : ''}`} />
                           </button>
                       </div>
                       <div className="text-[10px] text-gray-400 underline mb-8 cursor-pointer hover:text-black">Logo Design Contest</div>
                       <p className="text-sm text-gray-500 leading-relaxed mb-8 font-body">{selectedDesign.description}</p>
                       <div className="flex flex-wrap gap-2 mb-8">
                           {selectedDesign.tags?.map((tag, i) => (
                               <span key={i} className="bg-gray-50 text-gray-600 px-3 py-1 text-[11px] font-medium rounded-full">{tag}</span>
                           ))}
                       </div>
                       <div className="mt-auto pt-6 border-t border-gray-100">
                           <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Tools Used</p>
                           <p className="text-xs text-gray-600 font-medium">{selectedDesign.tools}</p>
                       </div>
                       <div className="mt-4 text-[10px] text-gray-400 flex items-center gap-1">Designed on Special Graphics <span className="text-green-500 font-bold">✓</span></div>
                   </div>

                   <div className="flex-1 bg-white p-8 md:p-12 flex items-center justify-center relative group bg-[radial-gradient(#f1f1f1_1px,transparent_1px)] [background-size:16px_16px]">
                        <div className="relative cursor-zoom-in shadow-2xl transition-transform duration-300 hover:scale-[1.01]" onClick={() => setIsFullScreen(true)}>
                            {selectedDesign.image ? (
                                 <img src={selectedDesign.image} alt={selectedDesign.title} className="max-w-full max-h-[600px] object-contain block" />
                            ) : (
                                 <div className="w-[500px] h-[400px] bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-300 text-sm">[Large Design Preview]</div>
                            )}
                            <div className="absolute bottom-4 right-4 bg-black/70 text-white text-xs px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 pointer-events-none">
                                <Maximize2 className="w-3 h-3" /> Full Screen
                            </div>
                        </div>
                   </div>
               </div>
           </div>
        )}
      </div>
    </main>
  );
}

