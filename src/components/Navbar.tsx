'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Bell, Mail, HelpCircle, ChevronDown, Menu, X } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <nav className="bg-white border-b border-gray-200">
            <div className="w-full px-4 sm:px-6 lg:px-10">
                <div className="flex items-center justify-between h-16 py-2">
                    <div className="flex items-center space-x-4 sm:space-x-8">
                        <div className="flex items-center">
                            <Link href="/">
                                <span className="text-xl font-bold font-sans tracking-tighter">SPECIAL GRAPHICS</span>
                            </Link>
                        </div>

                        <div className="hidden lg:flex items-center space-x-6">
                            <DropdownMenu>
                                <DropdownMenuTrigger className="flex items-center space-x-1 text-sm font-bold text-gray-700 hover:text-gray-900 focus:outline-none">
                                    <span>My Business</span>
                                    <ChevronDown className="h-4 w-4 font-bold" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem>Projects</DropdownMenuItem>
                                    <DropdownMenuItem>Analytics</DropdownMenuItem>
                                    <DropdownMenuItem>Settings</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <Link href="#" className="text-sm font-bold text-gray-700 hover:text-gray-900">
                                Clients
                            </Link>

                            <Link href="#" className="text-sm font-bold text-gray-700 hover:text-gray-900">
                                Blog
                            </Link>

                            <DropdownMenu>
                                <DropdownMenuTrigger className="flex items-center space-x-1 text-sm font-bold text-gray-700 hover:text-gray-900 focus:outline-none">
                                    <span>Community</span>
                                    <ChevronDown className="h-4 w-4 font-bold" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem>Forum</DropdownMenuItem>
                                    <DropdownMenuItem>Events</DropdownMenuItem>
                                    <DropdownMenuItem>Resources</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <Link href="/how-it-works" className="text-sm font-bold text-gray-700 hover:text-gray-900">
                                How It Works
                            </Link>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2 sm:space-x-4">
                        <button
                            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full relative"
                            onClick={() => alert('Notifications')}
                        >
                            <Bell className="h-5 w-5" />
                            <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full"></span>
                        </button>
                        <button
                            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full"
                            onClick={() => alert('Messages')}
                        >
                            <Mail className="h-5 w-5" />
                        </button>
                        <button
                            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full"
                            onClick={() => alert('Help')}
                        >
                            <HelpCircle className="h-5 w-5" />
                        </button>
                        <Avatar className="h-8 w-8 bg-black cursor-pointer" onClick={() => alert('Profile')}>
                            <AvatarFallback className="bg-black text-white text-xs">P</AvatarFallback>
                        </Avatar>
                        <button
                            className="lg:hidden p-2 text-gray-600 hover:text-gray-900"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="lg:hidden border-t border-gray-200 py-4">
                        <div className="flex flex-col space-y-4">
                            <DropdownMenu>
                                <DropdownMenuTrigger className="flex items-center justify-between w-full text-sm font-bold text-gray-700 hover:text-gray-900 px-4 py-2">
                                    <span>My Business</span>
                                    <ChevronDown className="h-4 w-4" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem>My Earnings</DropdownMenuItem>
                                    <DropdownMenuItem>Analytics</DropdownMenuItem>
                                    <DropdownMenuItem>Settings</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <Link href="#" className="text-sm font-bold text-gray-700 hover:text-gray-900 px-4 py-2">
                                Clients
                            </Link>
                            <Link href="#" className="text-sm font-bold text-gray-700 hover:text-gray-900 px-4 py-2">
                                Blog
                            </Link>
                            <DropdownMenu>
                                <DropdownMenuTrigger className="flex items-center justify-between w-full text-sm font-bold text-gray-700 hover:text-gray-900 px-4 py-2">
                                    <span>Community</span>
                                    <ChevronDown className="h-4 w-4" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem>Forum</DropdownMenuItem>
                                    <DropdownMenuItem>Events</DropdownMenuItem>
                                    <DropdownMenuItem>Resources</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <Link href="/how-it-works" className="text-sm font-bold text-gray-700 hover:text-gray-900 px-4 py-2">
                                How It Works
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
