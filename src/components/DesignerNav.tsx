'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { 
    ChevronDown, 
    LogOut, 
    User, 
    Settings, 
    Bell, 
    Mail,
    HelpCircle,
    Folder,
    List,
    Users,
    Eye,
    Trophy,
    PiggyBank,
    FileCheck,
    GraduationCap,
    X
} from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function DesignerNav() {
    const { user, logout } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const [showHyperwalletBanner, setShowHyperwalletBanner] = useState(true);
    const [yourWorkOpen, setYourWorkOpen] = useState(false);
    const [communityOpen, setCommunityOpen] = useState(false);
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);

    const handleLogout = async () => {
        await logout();
        router.push('/');
    };

    const isActive = (path: string) => {
        return pathname?.startsWith(path);
    };

    return (
        <>
            {/* Hyperwallet Alert Banner */}
            {showHyperwalletBanner && (
                <div className="bg-orange-500 text-white px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2 max-w-7xl mx-auto w-full">
                        <span className="text-lg">⚠️</span>
                        <p className="text-sm flex-1">
                            Designer payouts are moving to Hyperwallet on January 19, 2026.{' '}
                            <Link href="/designer/settings" className="underline font-semibold">
                                Set up your account now
                            </Link>{' '}
                            to ensure a smooth transition.
                        </p>
                        <button
                            onClick={() => setShowHyperwalletBanner(false)}
                            className="ml-4 hover:bg-orange-600 rounded p-1"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            )}

            {/* Main Navigation Header */}
            <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
                <nav className="w-full px-6 md:px-8 lg:px-10">
                    <div className="flex items-center justify-between h-20 lg:h-24">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <Link href="/" className="block">
                                <span className="text-2xl md:text-3xl text-gray-900 tracking-tight">
                                    <span className="font-normal">Special</span>{' '}
                                    <span className="font-bold">Graphics</span>
                                </span>
                            </Link>
                        </div>

                        {/* Navigation */}
                        <nav className="hidden md:flex items-center gap-6 flex-1 ml-12">
                            <DropdownMenu open={yourWorkOpen} onOpenChange={setYourWorkOpen}>
                                <DropdownMenuTrigger className={`flex items-center gap-1 font-medium transition-colors ${
                                    isActive('/designer/contests') || isActive('/designer/dashboard') || isActive('/designer/portfolio')
                                        ? 'text-gray-900'
                                        : 'text-gray-700 hover:text-gray-900'
                                }`}>
                                    Your work
                                    <ChevronDown className="h-4 w-4" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start" className="w-48">
                                    <DropdownMenuItem asChild>
                                        <Link href="/designer/contests" className="flex items-center gap-2">
                                            <Folder className="h-4 w-4" />
                                            Contests
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href="/designer/dashboard" className="flex items-center gap-2">
                                            <Folder className="h-4 w-4" />
                                            Projects
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href="/designer/contests" className="flex items-center gap-2">
                                            <List className="h-4 w-4" />
                                            Browse contests
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href="/designer/dashboard" className="flex items-center gap-2">
                                            <List className="h-4 w-4" />
                                            Browse projects
                                        </Link>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <Link 
                                href="/designer/clients" 
                                className={`font-medium transition-colors ${
                                    isActive('/designer/clients')
                                        ? 'text-gray-900'
                                        : 'text-gray-700 hover:text-gray-900'
                                }`}
                            >
                                Your clients
                            </Link>

                            <DropdownMenu open={communityOpen} onOpenChange={setCommunityOpen}>
                                <DropdownMenuTrigger className={`flex items-center gap-1 font-medium transition-colors ${
                                    isActive('/designer/resource-center') || isActive('/showcase')
                                        ? 'text-gray-900'
                                        : 'text-gray-700 hover:text-gray-900'
                                }`}>
                                    Community
                                    <ChevronDown className="h-4 w-4" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start" className="w-48">
                                    <DropdownMenuItem asChild>
                                        <Link href="/designer/resource-center" className="flex items-center gap-2">
                                            <Users className="h-4 w-4" />
                                            Forum
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href="/showcase" className="flex items-center gap-2">
                                            <Eye className="h-4 w-4" />
                                            Discover
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href="/showcase" className="flex items-center gap-2">
                                            <Trophy className="h-4 w-4" />
                                            Recent winners
                                        </Link>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </nav>

                        {/* Right Side Icons */}
                        <div className="flex items-center gap-3 md:gap-4">
                            <Link href="/help" className="hidden md:block text-gray-700 hover:text-gray-900 text-sm font-medium">
                                Help Center
                            </Link>
                            <Link href="/designer/messages" className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
                                <Mail className="h-5 w-5" />
                                <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full"></span>
                            </Link>
                            <Link href="/notifications" className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
                                <Bell className="h-5 w-5" />
                                <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full"></span>
                            </Link>
                            <DropdownMenu open={profileMenuOpen} onOpenChange={setProfileMenuOpen}>
                                <DropdownMenuTrigger asChild>
                                    <button className="flex items-center gap-2 p-1.5 rounded-full hover:bg-gray-100 transition-colors focus:outline-none">
                                        <Avatar className="h-8 w-8 border-2 border-gray-200">
                                            <AvatarImage src={user?.avatar} alt={user?.name} />
                                            <AvatarFallback className="bg-gray-800 text-white text-sm font-semibold">
                                                {user?.name?.charAt(0).toUpperCase() || 'D'}
                                            </AvatarFallback>
                                        </Avatar>
                                        <ChevronDown className="h-4 w-4 text-gray-600 hidden sm:block" />
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56">
                                    <DropdownMenuItem asChild>
                                        <Link href="/settings" className="flex items-center gap-2">
                                            <Settings className="h-4 w-4" />
                                            Account settings
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href="/profile" className="flex items-center gap-2">
                                            <User className="h-4 w-4" />
                                            Profile
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href="/designer/earnings" className="flex items-center gap-2">
                                            <PiggyBank className="h-4 w-4" />
                                            Earnings
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href="/ndas" className="flex items-center gap-2">
                                            <FileCheck className="h-4 w-4" />
                                            NDAs
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href="/designer/resource-center" className="flex items-center gap-2">
                                            <GraduationCap className="h-4 w-4" />
                                            Getting started
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer focus:text-red-600">
                                        <LogOut className="h-4 w-4 mr-2" />
                                        Log out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    );
}

