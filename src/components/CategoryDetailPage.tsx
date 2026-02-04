'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Star, Users, Clock, Shield, TrendingUp, Award, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CategoryDetailPageProps {
  category: {
    slug: string;
    title: string;
    subtitle: string;
    description: string;
    heroImage: string;
    features: string[];
    pricing: {
      name: string;
      price: number;
      entries: string;
      features: string[];
      popular?: boolean;
    }[];
    portfolio: {
      id: number;
      title: string;
      designer: string;
      image: string;
      likes: number;
      views: string;
    }[];
  };
}

export default function CategoryDetailPage({ category }: CategoryDetailPageProps) {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        <div className="max-w-[1200px] mx-auto px-4 lg:px-8 relative z-10 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
                <Sparkles className="h-4 w-4 text-[#ff00cc]" />
                <span className="text-sm font-medium">Professional {category.title}</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
                {category.title}
              </h1>
              <p className="text-xl text-gray-200 mb-8 leading-relaxed">
                {category.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/hire-designer">
                  <Button className="bg-[#ff00cc] hover:bg-[#d900ad] text-white font-bold py-4 px-8 text-base shadow-[0_0_20px_rgba(255,0,204,0.3)] transition-all">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="#portfolio">
                  <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 py-4 px-8 text-base">
                    View Portfolio
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="relative aspect-square max-w-lg mx-auto">
                <Image
                  src={category.heroImage}
                  alt={category.title}
                  fill
                  className="object-cover rounded-lg shadow-2xl"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#222] mb-4">
              What You Get
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              {category.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {category.features.map((feature, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow group">
                <div className="w-12 h-12 bg-[#ff00cc]/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#ff00cc]/20 transition-colors">
                  <CheckCircle2 className="h-6 w-6 text-[#ff00cc]" />
                </div>
                <p className="text-gray-800 font-medium leading-relaxed">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-[1200px] mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#222] mb-4">
              Choose Your Package
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Select the package that best fits your needs and budget
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {category.pricing.map((tier, index) => (
              <div
                key={index}
                className={`bg-white rounded-lg shadow-sm border-2 p-6 transition-all hover:shadow-md ${
                  tier.popular ? 'border-[#ff00cc] ring-2 ring-[#ff00cc]/20 relative' : 'border-gray-200'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#ff00cc] text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                    MOST POPULAR
                  </div>
                )}
                
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2 text-gray-800">{tier.name}</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-extrabold text-gray-900">${tier.price}</span>
                    <span className="text-gray-600 text-sm">USD</span>
                  </div>
                </div>
                
                <div className="mb-6 space-y-3">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-gray-600 flex-shrink-0" />
                    <span className="font-semibold text-sm text-gray-800">{tier.entries} design concepts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-gray-600 flex-shrink-0" />
                    <span className="text-sm text-gray-600">7-day contest</span>
                  </div>
                </div>
                
                <ul className="space-y-2 mb-6">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button
                  className={`w-full ${
                    tier.popular
                      ? 'bg-[#ff00cc] hover:bg-[#d900ad] text-white shadow-[0_0_20px_rgba(255,0,204,0.3)]'
                      : 'bg-[#333] hover:bg-black text-white'
                  } transition-all`}
                >
                  Start {tier.name} Package
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-16 md:py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-[#222] mb-4">
                Winning Designs
              </h2>
              <p className="text-gray-600 text-lg">
                See what our designers have created for clients like you
              </p>
            </div>
            <Link href="/showcase">
              <Button variant="outline" className="hidden md:flex">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {category.portfolio.map((item) => (
              <div
                key={item.id}
                className="group cursor-pointer bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all"
              >
                <div className="aspect-square relative overflow-hidden bg-gray-100">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-sm text-gray-900 mb-2 line-clamp-1">{item.title}</h3>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>By {item.designer}</span>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>{item.likes}</span>
                      </div>
                      <span>{item.views}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-[1200px] mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#222] mb-4">
              How It Works
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              A simple process to get the perfect design for your business
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: TrendingUp, title: 'Start Your Project', desc: 'Describe your design needs and set your budget' },
              { icon: Users, title: 'Designers Compete', desc: 'Multiple designers submit concepts for your project' },
              { icon: Award, title: 'Choose Winner', desc: 'Select your favorite design and provide feedback' },
              { icon: CheckCircle2, title: 'Get Final Design', desc: 'Work with the winner to perfect your design' },
            ].map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative inline-flex items-center justify-center mb-6">
                  <div className="absolute inset-0 bg-gray-100 rounded-full group-hover:bg-gray-200 transition-colors"></div>
                  <div className="relative bg-white border-2 border-gray-200 w-20 h-20 rounded-full flex items-center justify-center group-hover:border-[#ff00cc] transition-colors">
                    <step.icon className="h-8 w-8 text-gray-700" />
                  </div>
                </div>
                <h3 className="font-bold text-lg mb-2 text-gray-800">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-[#0a0015] text-white">
        <div className="max-w-[1200px] mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses that have found their perfect design
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/hire-designer">
              <Button className="bg-[#ff00cc] hover:bg-[#d900ad] text-white font-bold py-4 px-8 text-base shadow-[0_0_20px_rgba(255,0,204,0.3)]">
                Hire a Designer
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/categories">
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 py-4 px-8 text-base">
                Browse Categories
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

