'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Menu, X, ChevronDown, LogOut, User, Settings, LayoutDashboard, Bell, MessageSquare } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
    DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Navigation items configuration
interface NavItem {
    label: string;
    href?: string;
    badge?: string;
    dropdown?: { label: string; href: string }[];
    roles?: string[]; // Show only for specific roles (if undefined, show for all)
}

const getNavItems = (userRole?: string): NavItem[] => {
    const baseItems: NavItem[] = [
        { label: 'How it works', href: '/how-it-works' },
        { label: 'Categories', href: '/categories' },
    ];

    // Role-specific items
    if (userRole === 'designer') {
        return [
            ...baseItems,
            { 
                label: 'Showcase', 
                dropdown: [
                    { label: 'Inspiration', href: '/inspirations' },
                    { label: 'Contest', href: '/contest' }
                ]
            },
            { label: 'Browse Contests', href: '/contest' },
            { label: 'Find Work', href: '/find-designer' },
        ];
    } else if (userRole === 'client') {
        return [
            ...baseItems,
            { 
                label: 'Showcase', 
                dropdown: [
                    { label: 'Inspiration', href: '/inspirations' },
                    { label: 'Contest', href: '/contest' }
                ]
            },
            { label: 'Find a Designer', href: '/hire-designer' },
        ];
    } else {
        // Not logged in - show all public items
        return [
            ...baseItems,
            { label: 'Special Studio', href: '/studio', badge: 'NEW' },
            { label: 'Find a Designer', href: '/hire-designer' },
            { 
                label: 'Showcase', 
                dropdown: [
                    { label: 'Inspiration', href: '/inspirations' },
                    { label: 'Contest', href: '/contest' }
                ]
            },
        ];
    }
};

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { user, isAuthenticated, logout, loading } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        await logout();
        router.push('/');
        setMobileMenuOpen(false);
    };

    // Role-specific navigation items
    const getRoleNavItems = () => {
        if (user?.role === 'designer') {
            return [
                { label: 'Dashboard', href: '/designer/dashboard' },
                { label: 'Active Contests', href: '/designer/dashboard?tab=contests' },
                { label: 'My Portfolio', href: '/designer/dashboard?tab=portfolio' },
                { label: 'Earnings', href: '/designer/dashboard?tab=earnings' },
            ];
        } else if (user?.role === 'client') {
            return [
                { label: 'Dashboard', href: '/client/dashboard' },
                { label: 'My Contests', href: '/client/dashboard?tab=contests' },
                { label: 'Hired Designers', href: '/client/dashboard?tab=hired' },
            ];
        }
        return [];
    };

    return (
        <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
            <nav className="w-full px-6 md:px-8 lg:px-10">
                <div className="flex items-center justify-between h-20 lg:h-24">

                    {/* Logo (Left Side) */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="block">
                            <span className="text-2xl md:text-3xl text-gray-900 tracking-tight">
                                <span className="font-normal">Special</span>{' '}
                                <span className="font-bold">Graphics</span>
                            </span>
                        </Link>
                    </div>

                    {/* Navigation Menu (Left-aligned near logo) - Hidden on mobile */}
                    <div className="hidden lg:flex items-center flex-1 ml-12">
                        <div className="flex items-center gap-6 xl:gap-8">
                            {getNavItems(user?.role).map((item) => (
                                <div key={item.label} className="relative">
                                    {item.dropdown ? (
                                        <DropdownMenu>
                                            <DropdownMenuTrigger className="relative text-sm font-medium text-gray-800 hover:text-gray-900 transition-colors duration-200 whitespace-nowrap pt-1 flex items-center gap-1 outline-none">
                                                {item.label}
                                                <ChevronDown className="w-4 h-4" />
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="start" className="min-w-[160px]">
                                                {item.dropdown.map((subItem) => (
                                                    <DropdownMenuItem key={subItem.label} asChild>
                                                        <Link href={subItem.href} className="cursor-pointer">
                                                            {subItem.label}
                                                        </Link>
                                                    </DropdownMenuItem>
                                                ))}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    ) : (
                                        <Link
                                            href={item.href || '#'}
                                            className="relative text-sm font-medium text-gray-800 hover:text-gray-900 transition-colors duration-200 whitespace-nowrap pt-1"
                                        >
                                            {/* NEW Badge */}
                                            {item.badge && (
                                                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-black text-white text-[9px] font-semibold px-1.5 py-0.5 rounded-sm uppercase tracking-wide">
                                                    {item.badge}
                                                </span>
                                            )}
                                            {item.label}
                                        </Link>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Action Buttons (Right Side) */}
                    <div className="flex items-center gap-3 md:gap-4">
                        {!loading && isAuthenticated && user ? (
                            <>
                                {/* Notifications */}
                                <button
                                    className="hidden sm:flex p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors relative"
                                    aria-label="Notifications"
                                >
                                    <Bell className="h-5 w-5" />
                                    <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full"></span>
                                </button>

                                {/* Messages */}
                                <button
                                    className="hidden sm:flex p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
                                    aria-label="Messages"
                                >
                                    <MessageSquare className="h-5 w-5" />
                                </button>

                                {/* User Menu */}
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <button className="flex items-center gap-2 p-1.5 rounded-full hover:bg-gray-100 transition-colors focus:outline-none">
                                            <Avatar className="h-8 w-8 border-2 border-gray-200">
                                                <AvatarImage src={user.avatar} alt={user.name} />
                                                <AvatarFallback className="bg-gray-800 text-white text-sm font-semibold">
                                                    {user.name?.charAt(0).toUpperCase() || 'U'}
                                                </AvatarFallback>
                                            </Avatar>
                                            <ChevronDown className="h-4 w-4 text-gray-600 hidden sm:block" />
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-56">
                                        <DropdownMenuLabel>
                                            <div className="flex flex-col space-y-1">
                                                <p className="text-sm font-medium leading-none">{user.name}</p>
                                                <p className="text-xs leading-none text-gray-500">{user.email}</p>
                                                <span className="text-xs text-gray-400 capitalize mt-1">
                                                    {user.role === 'designer' ? 'Designer' : user.role === 'client' ? 'Client' : user.role}
                                                </span>
                                            </div>
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        
                                        {/* Role-specific dashboard link */}
                                        {user.role === 'designer' && (
                                            <DropdownMenuItem asChild>
                                                <Link href="/designer/dashboard" className="cursor-pointer">
                                                    <LayoutDashboard className="mr-2 h-4 w-4" />
                                                    Designer Dashboard
                                                </Link>
                                            </DropdownMenuItem>
                                        )}
                                        {user.role === 'client' && (
                                            <DropdownMenuItem asChild>
                                                <Link href="/client/dashboard" className="cursor-pointer">
                                                    <LayoutDashboard className="mr-2 h-4 w-4" />
                                                    Client Dashboard
                                                </Link>
                                            </DropdownMenuItem>
                                        )}
                                        
                                        <DropdownMenuItem asChild>
                                            <Link href="/profile" className="cursor-pointer">
                                                <User className="mr-2 h-4 w-4" />
                                                Profile
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link href="/settings" className="cursor-pointer">
                                                <Settings className="mr-2 h-4 w-4" />
                                                Settings
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem 
                                            onClick={handleLogout}
                                            className="cursor-pointer text-red-600 focus:text-red-600"
                                        >
                                            <LogOut className="mr-2 h-4 w-4" />
                                            Log out
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </>
                        ) : !loading ? (
                            <>
                                {/* Sign In - Hidden on mobile */}
                                <Link
                                    href="/auth"
                                    className="hidden sm:block text-sm font-medium text-gray-800 hover:text-gray-900 transition-colors duration-200"
                                >
                                    Sign In
                                </Link>

                                {/* Join Button - Hidden on mobile */}
                                <Link
                                    href="/onboarding"
                                    className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-black bg-transparent border border-black rounded-md hover:bg-black hover:text-white transition-all duration-200"
                                >
                                    Join
                                </Link>
                            </>
                        ) : null}

                        {/* Mobile Menu Toggle */}
                        <button
                            className="lg:hidden p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle mobile menu"
                            aria-expanded={mobileMenuOpen}
                        >
                            {mobileMenuOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                        }`}
                >
                    <div className="border-t border-gray-100 py-4 space-y-1">
                        {getNavItems(user?.role).map((item) => (
                            <div key={item.label}>
                                {item.dropdown ? (
                                    <div className="px-4 py-3">
                                        <div className="text-sm font-medium text-gray-700 mb-2">{item.label}</div>
                                        <div className="pl-4 space-y-1">
                                            {item.dropdown.map((subItem) => (
                                                <Link
                                                    key={subItem.label}
                                                    href={subItem.href}
                                                    className="block px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                                                    onClick={() => setMobileMenuOpen(false)}
                                                >
                                                    {subItem.label}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <Link
                                        href={item.href || '#'}
                                        className="flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        <span>{item.label}</span>
                                        {item.badge && (
                                            <span className="bg-black text-white text-[9px] font-semibold px-1.5 py-0.5 rounded-sm uppercase tracking-wide">
                                                {item.badge}
                                            </span>
                                        )}
                                    </Link>
                                )}
                            </div>
                        ))}

                        {/* Mobile Auth Links */}
                        {!loading && isAuthenticated && user ? (
                            <div className="pt-4 mt-4 border-t border-gray-100 space-y-2 px-4">
                                <div className="px-4 py-3 bg-gray-50 rounded-lg mb-3">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage src={user.avatar} alt={user.name} />
                                            <AvatarFallback className="bg-gray-800 text-white">
                                                {user.name?.charAt(0).toUpperCase() || 'U'}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{user.name}</p>
                                            <p className="text-xs text-gray-500">{user.email}</p>
                                        </div>
                                    </div>
                                </div>
                                
                                {user.role === 'designer' && (
                                    <Link
                                        href="/designer/dashboard"
                                        className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Dashboard
                                    </Link>
                                )}
                                {user.role === 'client' && (
                                    <Link
                                        href="/client/dashboard"
                                        className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Dashboard
                                    </Link>
                                )}
                                
                                <Link
                                    href="/profile"
                                    className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Profile
                                </Link>
                                <Link
                                    href="/settings"
                                    className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Settings
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-left px-4 py-2.5 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
                                >
                                    Log out
                                </button>
                            </div>
                        ) : !loading ? (
                            <div className="pt-4 mt-4 border-t border-gray-100 space-y-2 px-4">
                                <Link
                                    href="/auth"
                                    className="block w-full text-center py-2.5 text-sm font-medium text-gray-800 hover:text-gray-900"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Sign In
                                </Link>
                                <Link
                                    href="/onboarding"
                                    className="block w-full text-center py-2.5 text-sm font-medium text-black bg-transparent border border-black rounded-md hover:bg-black hover:text-white transition-all duration-200"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Join
                                </Link>
                            </div>
                        ) : null}
                    </div>
                </div>
            </nav>
        </header>
    );
}
