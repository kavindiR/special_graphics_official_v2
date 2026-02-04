'use client';

import { useState } from 'react';
import { Search, ChevronDown, Filter, Star, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Image from 'next/image';

export default function FindDesignerPage() {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    const categories = [
        { id: 'logo-brand', label: 'Logo & Brand Identity' },
        { id: 'web-app', label: 'Web & App Design' },
        { id: 'business', label: 'Business & Advertising' },
        { id: 'clothing', label: 'Clothing & Merchandise' },
        { id: 'art', label: 'Art & Illustration' },
        { id: 'packaging', label: 'Packaging & Label' },
        { id: 'book', label: 'Book & Magazine' },
    ];

    const levels = [
        { id: 'top', label: 'Top Level Designer' },
        { id: 'mid', label: 'Mid Level Designer' },
        { id: 'entry', label: 'Entry Level Designer' },
    ];

    const designers = [
        {
            id: 1,
            name: 'Elena Silva',
            handle: '@elenadesign',
            level: 'Top Level',
            rating: 4.9,
            reviews: 124,
            contestsWon: 15,
            skills: ['Logo Design', 'Branding', 'Illustration'],
            avatar: '/avatars/elena.jpg', // Placeholder
            portfolio: ['/portfolio/1.jpg', '/portfolio/2.jpg', '/portfolio/3.jpg']
        },
        {
            id: 2,
            name: 'Marcus Chen',
            handle: '@marcus_c',
            level: 'Top Level',
            rating: 4.8,
            reviews: 98,
            contestsWon: 12,
            skills: ['Web Design', 'UI/UX', 'Mobile Apps'],
            avatar: '/avatars/marcus.jpg',
            portfolio: ['/portfolio/4.jpg', '/portfolio/5.jpg', '/portfolio/6.jpg']
        },
        {
            id: 3,
            name: 'Sarah Johnson',
            handle: '@sara_j',
            level: 'Mid Level',
            rating: 4.7,
            reviews: 45,
            contestsWon: 5,
            skills: ['Packaging', 'Label Design'],
            avatar: '/avatars/sarah.jpg',
            portfolio: ['/portfolio/7.jpg', '/portfolio/8.jpg', '/portfolio/9.jpg']
        },
        {
            id: 4,
            name: 'David Kim',
            handle: '@davidk',
            level: 'Mid Level',
            rating: 4.6,
            reviews: 32,
            contestsWon: 3,
            skills: ['Illustration', 'Character Design'],
            avatar: '/avatars/david.jpg',
            portfolio: ['/portfolio/10.jpg', '/portfolio/11.jpg', '/portfolio/12.jpg']
        },
        {
            id: 5,
            name: 'Jessica Lee',
            handle: '@jesslee',
            level: 'Entry Level',
            rating: 4.5,
            reviews: 15,
            contestsWon: 1,
            skills: ['Logo Design', 'Business Cards'],
            avatar: '/avatars/jessica.jpg',
            portfolio: ['/portfolio/13.jpg', '/portfolio/14.jpg', '/portfolio/15.jpg']
        },
        {
            id: 6,
            name: 'Tom Wilson',
            handle: '@tomw_design',
            level: 'Entry Level',
            rating: 4.4,
            reviews: 10,
            contestsWon: 0,
            skills: ['T-Shirt Design', 'Merchandise'],
            avatar: '/avatars/tom.jpg',
            portfolio: ['/portfolio/16.jpg', '/portfolio/17.jpg', '/portfolio/18.jpg']
        }
    ];

    const toggleCategory = (id: string) => {
        setSelectedCategories(prev =>
            prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
        );
    };

    const toggleLevel = (id: string) => {
        setSelectedLevels(prev =>
            prev.includes(id) ? prev.filter(l => l !== id) : [...prev, id]
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-slate-800">


            {/* Header / Sub-nav Area */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Find a Designer</h1>
                    <p className="text-gray-600 max-w-2xl">
                        Browse our community of talented designers. Filter by category, skill level, and more to find the perfect match for your project.
                    </p>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Filters Sidebar */}
                    <aside className={`lg:w-64 flex-shrink-0 ${mobileFiltersOpen ? 'block' : 'hidden lg:block'}`}>
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 sticky top-24">
                            <div className="mb-8">
                                <div className="relative">
                                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                    <Input placeholder="Search designers..." className="pl-9" />
                                </div>
                            </div>

                            <div className="mb-8">
                                <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
                                <div className="space-y-3">
                                    {categories.map((category) => (
                                        <div key={category.id} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={category.id}
                                                checked={selectedCategories.includes(category.id)}
                                                onCheckedChange={() => toggleCategory(category.id)}
                                            />
                                            <label
                                                htmlFor={category.id}
                                                className="text-sm text-gray-600 hover:text-gray-900 cursor-pointer"
                                            >
                                                {category.label}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-8">
                                <h3 className="font-semibold text-gray-900 mb-4">Designer Level</h3>
                                <div className="space-y-3">
                                    {levels.map((level) => (
                                        <div key={level.id} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={level.id}
                                                checked={selectedLevels.includes(level.id)}
                                                onCheckedChange={() => toggleLevel(level.id)}
                                            />
                                            <label
                                                htmlFor={level.id}
                                                className="text-sm text-gray-600 hover:text-gray-900 cursor-pointer"
                                            >
                                                {level.label}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Mobile Filter Toggle */}
                    <div className="lg:hidden mb-4">
                        <Button
                            variant="outline"
                            className="w-full flex items-center justify-between"
                            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                        >
                            <span>Filters</span>
                            <Filter className="h-4 w-4" />
                        </Button>
                    </div>

                    {/* Grid of Designers */}
                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-6">
                            <span className="text-gray-600 font-medium">{designers.length} Designers found</span>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600">Sort by:</span>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" size="sm" className="gap-2">
                                            Recommended <ChevronDown className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem>Recommended</DropdownMenuItem>
                                        <DropdownMenuItem>Highest Rated</DropdownMenuItem>
                                        <DropdownMenuItem>Most Reviews</DropdownMenuItem>
                                        <DropdownMenuItem>Newest</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {designers.map((designer) => (
                                <div key={designer.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                                    {/* Portfolio Preview - Mock Images */}
                                    <div className="h-32 bg-gray-100 flex items-center justify-center relative overflow-hidden">
                                        {/* We will just use colored blocks for now as we don't have real images */}
                                        <div className="grid grid-cols-3 w-full h-full">
                                            <div className="bg-blue-100"></div>
                                            <div className="bg-pink-100"></div>
                                            <div className="bg-yellow-100"></div>
                                        </div>
                                        <div className="absolute inset-0 bg-black/5 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <Button variant="secondary" size="sm">View Portfolio</Button>
                                        </div>
                                    </div>

                                    <div className="p-4 relative">
                                        <div className="absolute -top-10 left-4">
                                            <Avatar className="h-16 w-16 border-4 border-white shadow-sm">
                                                <AvatarFallback className="bg-black text-white">{designer.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                        </div>

                                        <div className="mt-8">
                                            <div className="flex justify-between items-start mb-1">
                                                <div>
                                                    <h3 className="font-bold text-gray-900">{designer.name}</h3>
                                                    <p className="text-sm text-gray-500">{designer.handle}</p>
                                                </div>
                                                <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded">
                                                    <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                                                    <span className="text-xs font-bold text-yellow-700">{designer.rating}</span>
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {designer.skills.slice(0, 3).map((skill, index) => (
                                                    <Badge key={index} variant="secondary" className="text-[10px] px-1.5 py-0 h-5 font-normal">
                                                        {skill}
                                                    </Badge>
                                                ))}
                                            </div>

                                            <div className="flex items-center justify-between text-xs text-gray-500 border-t border-gray-100 pt-3">
                                                <div className="flex items-center gap-1">
                                                    <Trophy className="h-3 w-3" />
                                                    <span>{designer.contestsWon} wins</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <span>{designer.level}</span>
                                                </div>
                                            </div>

                                            <Button className="w-full mt-4 bg-white text-black border border-gray-300 hover:bg-gray-50">
                                                Invite to Work
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-10 flex justify-center">
                            <Button variant="outline" className="w-full max-w-xs">Load More Designers</Button>
                        </div>
                    </div>
                </div>
            </main>


        </div>
    );
}
