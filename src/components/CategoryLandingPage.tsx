'use client';

import { use, useState, useRef } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { categoriesData } from '@/lib/categories';
import { Star, Check, PlayCircle, Users, ArrowRight, ThumbsUp, Phone, Plus, Trophy, ChevronLeft, ChevronRight } from 'lucide-react';

const AccordionItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-200">
      <button className="flex justify-between items-start w-full py-4 text-left focus:outline-none group" onClick={() => setIsOpen(!isOpen)}>
        <h4 className="text-[15px] font-bold text-[#2d2926] group-hover:text-gray-600 pr-4">{question}</h4>
        <Plus className={`w-4 h-4 text-gray-400 flex-shrink-0 mt-1 transition-transform ${isOpen ? 'transform rotate-45' : ''}`} />
      </button>
      {isOpen && <div className="pb-4 text-sm text-gray-600 leading-relaxed">{answer}</div>}
    </div>
  );
};

export default function CategoryLandingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const data = categoriesData[slug];

  // --- STATE FOR INTERACTIVITY ---
  const [activeInspirationTab, setActiveInspirationTab] = useState("Latest");
  const [activeResourceTab, setActiveResourceTab] = useState("Great reading");
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  
  // --- REFS FOR SCROLLING ---
  const howItWorksRef = useRef<HTMLDivElement>(null);

  if (!data) return notFound();

  // Scroll Handler
  const scrollToHowItWorks = () => {
    howItWorksRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Filter Logic
  const filteredImages = activeInspirationTab === "Latest" 
    ? data.showcaseImages 
    : data.showcaseImages.filter((img: any) => img.tag === activeInspirationTab);

  const filteredResources = activeResourceTab === "Great reading" // Default shows all or specific logic? 
    ? data.resources // Show all for demo if "Great reading" is selected, or filter strictly
    : data.resources.filter((res: any) => res.category === activeResourceTab);

  // Testimonial Slider Logic
  const nextTestimonial = () => {
    if (testimonialIndex < data.testimonials.length - 3) {
        setTestimonialIndex(prev => prev + 1);
    }
  };
  const prevTestimonial = () => {
    if (testimonialIndex > 0) {
        setTestimonialIndex(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-[#383331]">
      
      {/* --- 1. HERO SECTION --- */}
      <div className="bg-white relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 py-16 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6 z-10">
            <h1 className="text-5xl md:text-[56px] font-extrabold tracking-tight leading-[1.1] text-[#2d2926]">
              {data.heroTitle}
            </h1>
            <p className="text-[18px] text-[#57514d] leading-relaxed max-w-lg">
              {data.heroSubtitle}
            </p>

            <ul className="space-y-2 text-sm text-[#57514d] mt-2 mb-6">
                <li className="flex gap-2 items-center"><Check size={16} strokeWidth={3}/> Fun and easy process</li>
                <li className="flex gap-2 items-center"><Check size={16} strokeWidth={3}/> Work with the best designers</li>
                <li className="flex gap-2 items-center"><Check size={16} strokeWidth={3}/> Full ownership of files</li>
                <li className="flex gap-2 items-center"><Check size={16} strokeWidth={3}/> 100% money-back guarantee</li>
            </ul>

            <div className="pt-2">
                <p className="font-bold text-lg mb-3">Starting from {data.avgPrice}</p>
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                    {/* BUTTON: Get started -> Launch Page */}
                    <Link href={`/launch/${slug}`} className="bg-[#4D28FF] hover:bg-[#3b1ec4] text-white text-[16px] font-bold px-8 py-3.5 rounded-full transition-all text-center min-w-[140px]">
                        Get started
                    </Link>
                    {/* BUTTON: How it works -> Scroll Down */}
                    <button onClick={scrollToHowItWorks} className="flex items-center gap-2 font-bold text-[#2d2926] hover:bg-gray-100 px-6 py-3.5 border border-gray-300 rounded-full transition-colors text-[15px]">
                        How it works <ArrowRight size={16} />
                    </button>
                </div>
            </div>
          </div>
          
          <div className="flex-1 relative w-full">
             <div className="relative z-10">
                <Image src={data.heroImage} alt="Hero" width={600} height={450} className="w-full h-auto object-contain" />
             </div>
          </div>
        </div>
      </div>

      {/* --- 2. STATS BAR --- */}
      <div className="bg-white py-16 border-t border-gray-100">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row gap-16 items-center">
            <div className="w-full md:w-1/3 bg-[#f3f0ea] rounded-lg overflow-hidden relative aspect-square">
                 <Image src={data.statsImage} alt="Feature" fill className="object-cover p-8" />
            </div>
            <div className="w-full md:w-2/3">
                <h2 className="text-[28px] font-bold mb-4 text-[#2d2926]">So, why Special Graphics for {data.title}?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                    <div className="flex gap-4 items-start">
                        <Star className="w-6 h-6 flex-shrink-0 fill-current text-[#2d2926]" />
                        <div>
                            <div className="font-bold text-lg text-[#2d2926]">{data.stats?.rating.score} {data.stats?.rating.text}</div>
                            <div className="text-sm text-gray-500 mt-1 leading-relaxed">{data.stats?.rating.subtext}</div>
                        </div>
                    </div>
                    {/* ... other stats ... */}
                    <div className="flex gap-4 items-start">
                        <ThumbsUp className="w-6 h-6 flex-shrink-0 text-[#2d2926]" />
                        <div>
                            <div className="font-bold text-lg text-[#2d2926]">{data.stats?.guarantee.title}</div>
                            <div className="text-sm text-gray-500 mt-1 leading-relaxed">{data.stats?.guarantee.subtext}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* --- 3. HOW IT WORKS --- */}
      <div ref={howItWorksRef} className="bg-[#f9f8f3] py-24">
        <div className="max-w-[1200px] mx-auto px-6">
           <h2 className="text-[32px] font-bold text-[#2d2926] mb-4">How to get a logo on Special Graphics</h2>
           
           <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="flex-1 space-y-12">
                 {data.howItWorks?.map((step: any, i: number) => (
                    <div key={i} className="flex gap-6">
                       <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#ffdede] text-[#e04f4f] flex items-center justify-center font-bold text-xl">
                          {step.step}
                       </div>
                       <div>
                          <h3 className="font-bold text-xl mb-2 text-[#2d2926]">{step.title}</h3>
                          <p className="text-[15px] text-gray-600 leading-relaxed">{step.desc}</p>
                          {/* DYNAMIC LINKS FROM DATA */}
                          <Link href={step.linkUrl} className="text-blue-600 font-bold text-sm mt-2 inline-block underline decoration-1 underline-offset-4">
                              {step.linkText}
                          </Link>
                       </div>
                    </div>
                 ))}
              </div>
              <div className="flex-1 w-full">
                 <div className="relative aspect-video bg-white rounded-xl shadow-lg overflow-hidden flex items-center justify-center group cursor-pointer">
                    <PlayCircle className="w-20 h-20 text-[#2d2926] opacity-90 group-hover:scale-105 transition" />
                    <div className="absolute right-8 top-8 font-extrabold text-4xl text-[#ff5a5f] leading-tight">Two<br/>ways of<br/>working</div>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* --- 4. GET INSPIRED (With Filtering) --- */}
      <div className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-[32px] font-bold mb-8 text-[#2d2926]">Get inspired by these logo design ideas</h2>
          
          {/* FILTER TABS */}
          <div className="flex flex-wrap gap-8 border-b border-gray-200 mb-8">
             {data.inspirationTags?.map((tag: string, i: number) => (
                 <button 
                    key={i} 
                    onClick={() => setActiveInspirationTab(tag)}
                    className={`pb-3 font-bold text-sm transition-colors ${activeInspirationTab === tag ? 'border-b-2 border-black text-black' : 'text-gray-500 hover:text-black'}`}
                 >
                     {tag}
                 </button>
             ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
             {filteredImages.length > 0 ? filteredImages.map((img: any, i: number) => (
                <div key={i} className="group aspect-square bg-gray-50 rounded-lg overflow-hidden relative cursor-pointer hover:shadow-lg transition">
                   <Image src={img.src} alt="Showcase" width={300} height={300} className="w-full h-full object-cover" />
                </div>
             )) : <div className="col-span-4 text-center text-gray-400 py-10">No images found for this category.</div>}
          </div>
          
          <div className="text-center">
             <Link href={`/launch/${slug}`} className="bg-[#4D28FF] hover:bg-[#3b1ec4] text-white text-[16px] font-bold px-8 py-3 rounded-full inline-block">
                Get started
             </Link>
          </div>
        </div>
      </div>

      {/* --- 5. BUNDLES (Clickable Cards) --- */}
      <div className="py-24 bg-[#f9f8f3]">
        <div className="max-w-[1200px] mx-auto px-6">
           <div className="flex justify-between items-baseline mb-8">
               <h2 className="text-[28px] font-bold text-[#2d2926]">Explore our logo & identity packages</h2>
               {/* LINK: See all services -> Categories */}
               <Link href="/categories" className="font-bold text-sm text-[#2d2926] hover:underline flex items-center gap-1">
                   See all design services <ArrowRight size={14}/>
               </Link>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {data.bundles?.map((pkg: any, idx: number) => (
                 <Link href={pkg.link || '#'} key={idx} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition cursor-pointer flex flex-col h-full">
                    <div className="h-48 bg-gray-200 w-full relative">
                        <Image src={pkg.img} alt={pkg.title} fill className="object-cover" />
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                        <h3 className="text-lg font-bold mb-2 text-[#2d2926]">{pkg.title}</h3>
                        <p className="text-sm text-gray-500 mb-6 flex-grow">{pkg.desc}</p>
                        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center gap-3">
                            <span className="font-bold text-[#2d2926]">from ${pkg.price}</span>
                            {pkg.save && <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600 font-medium">{pkg.save}</span>}
                        </div>
                    </div>
                 </Link>
              ))}
           </div>
        </div>
      </div>

      {/* --- 6. TESTIMONIALS (With Slider) --- */}
      <div className="py-24 bg-white">
          <div className="max-w-[1200px] mx-auto px-6">
              <div className="flex flex-col lg:flex-row gap-16">
                  
                  {/* LEFT SIDE (Static Stats) */}
                  <div className="lg:w-1/3 space-y-8">
                      <h2 className="text-[32px] font-bold text-[#2d2926] leading-tight">Our clients love us</h2>
                      <p className="text-sm text-gray-600">We&apos;ve been the leader in logo design since 2008...</p>
                      
                      <div>
                          <div className="flex items-center gap-2 font-bold text-lg text-[#2d2926]">
                              <Star size={20} fill="black" /> {data.testimonialStats.rating}
                          </div>
                          <div className="text-sm text-gray-500 mt-1">That&apos;s our average customer rating...</div>
                      </div>
                      
                      {/* SLIDER CONTROLS */}
                      <div className="flex gap-4 pt-4">
                          <button onClick={prevTestimonial} disabled={testimonialIndex === 0} className="p-2 border rounded-full hover:bg-gray-100 disabled:opacity-30"><ChevronLeft/></button>
                          <button onClick={nextTestimonial} disabled={testimonialIndex >= data.testimonials.length - 3} className="p-2 border rounded-full hover:bg-gray-100 disabled:opacity-30"><ChevronRight/></button>
                      </div>
                  </div>

                  {/* RIGHT SIDE (Slider Window) */}
                  <div className="lg:w-2/3 overflow-hidden">
                      <div 
                        className="flex gap-6 transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateX(-${testimonialIndex * 33.33}%)` }} // Simple slide logic
                      >
                          {data.testimonials?.map((item: any, i: number) => (
                              <div key={i} className="min-w-[300px] md:min-w-[320px] border border-gray-200 rounded-lg overflow-hidden flex flex-col hover:shadow-md transition">
                                  <div className="h-32 bg-gray-100 relative">
                                       <Image src={item.designImg} alt="Design" fill className="object-cover" />
                                  </div>
                                  <div className="p-6 flex-grow flex flex-col bg-white">
                                      <div className="flex gap-0.5 mb-3 text-[#ff5a5f]">
                                          {[1,2,3,4,5].map(s => <Star key={s} size={14} fill="currentColor" stroke="none"/>)}
                                      </div>
                                      <p className="text-sm text-[#2d2926] leading-relaxed mb-6 font-medium">"{item.text}"</p>
                                      <div className="mt-auto flex items-center gap-3">
                                          <div className="w-8 h-8 rounded-full overflow-hidden relative bg-gray-200">
                                              <Image src={item.clientImg} alt={item.client} fill className="object-cover" />
                                          </div>
                                          <div className="text-xs font-bold text-gray-600">{item.client}</div>
                                      </div>
                                  </div>
                              </div>
                          ))}
                      </div>
                  </div>
              </div>
          </div>
      </div>

      {/* --- 7. FAQ (Unchanged) --- */}
      <div className="py-24 bg-white border-t border-gray-100">
          <div className="max-w-[1200px] mx-auto px-6">
              <h2 className="text-[28px] font-bold mb-12 text-[#2d2926]">Your logo design FAQs, answered.</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-4">
                  <div className="space-y-2">
                      {data.faqs?.map((faq: any, i: number) => (
                          <AccordionItem key={i} question={faq.question} answer={faq.answer} />
                      ))}
                  </div>
                  <div className="space-y-2">
                      {data.faqsRight?.map((faq: any, i: number) => (
                          <AccordionItem key={i} question={faq.question} answer={faq.answer} />
                      ))}
                  </div>
              </div>
          </div>
      </div>

      {/* --- 8. RESOURCES (With Filtering) --- */}
      <div className="py-24 bg-[#f9f8f3]">
          <div className="max-w-[1200px] mx-auto px-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
                   <div>
                       <h2 className="text-[32px] font-bold text-[#2d2926] mb-4">Logo design resources</h2>
                       <div className="flex gap-6">
                          {data.resourceTabs?.map((tab: string, i: number) => (
                              <button 
                                key={i} 
                                onClick={() => setActiveResourceTab(tab)}
                                className={`pb-1 font-bold text-sm ${activeResourceTab === tab ? 'border-b-2 border-black text-black' : 'text-gray-500 hover:text-black'}`}
                              >
                                  {tab}
                              </button>
                          ))}
                       </div>
                   </div>
                   {/* LINK: See more -> Blog/Resources */}
                   <Link href="/resources" className="font-bold text-sm text-[#2d2926] hover:underline flex items-center gap-1">
                       See more logo and branding ideas <ArrowRight size={14}/>
                   </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                  {filteredResources.length > 0 ? filteredResources.map((item: any, i: number) => (
                      <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer group hover:shadow-md transition">
                          <div className="h-48 overflow-hidden bg-gray-200 relative">
                              <Image src={item.img} alt={item.title} fill className="object-cover transition duration-500 group-hover:scale-105" />
                          </div>
                          <div className="p-6">
                              <div className="text-[10px] font-bold text-gray-500 uppercase mb-3 border border-gray-200 inline-block px-2 py-0.5 rounded bg-gray-50">{item.tag}</div>
                              <h3 className="font-bold text-[18px] text-[#2d2926] mb-2 leading-tight group-hover:underline decoration-2">{item.title}</h3>
                              <span className="text-gray-400 text-xs">{item.time}</span>
                          </div>
                      </div>
                  )) : <div className="col-span-3 text-center text-gray-400">No resources found for this category.</div>}
              </div>
              
              <div className="text-center">
                 <Link href={`/launch/${slug}`} className="bg-[#4D28FF] hover:bg-[#3b1ec4] text-white text-[16px] font-bold px-10 py-3.5 rounded-full transition-all shadow-lg inline-block">
                    Get started
                 </Link>
              </div>
          </div>
      </div>

    </div>
  );
}

