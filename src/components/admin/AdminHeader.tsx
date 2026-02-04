'use client';

import { Bell, Search, User, LogOut, Settings as SettingsIcon } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function AdminHeader() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
      <div className="h-full pl-14 lg:pl-6 pr-4 sm:pr-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Search - Hidden on mobile, visible on desktop */}
        <div className="flex-1 max-w-xl hidden lg:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="search"
              placeholder="Search users, designs, contests..."
              className="pl-10 pr-4 py-2 w-full bg-gray-50 border-gray-200 rounded-lg focus:bg-white focus:border-gray-900 focus:ring-2 focus:ring-gray-900/20 transition-all"
            />
          </div>
        </div>

        {/* Mobile Search Button - Visible only on mobile/tablet */}
        <div className="lg:hidden flex-1 flex justify-start ml-2">
          <button className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
            <Search className="w-4 h-4" />
            <span className="text-sm hidden sm:inline">Search</span>
          </button>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          {/* Notifications */}
          <button className="relative p-2 sm:p-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors group">
            <Bell className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse" />
          </button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 sm:gap-3 p-1.5 hover:bg-gray-50 rounded-lg transition-colors outline-none focus:ring-2 focus:ring-gray-900/20">
              <Avatar className="w-8 h-8 sm:w-9 sm:h-9 ring-2 ring-gray-900/20">
                <AvatarFallback className="bg-gray-900 text-white text-xs sm:text-sm font-semibold shadow-sm">
                  {user ? getInitials(user.name) : 'AD'}
                </AvatarFallback>
              </Avatar>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-semibold text-gray-900">{user?.name || 'Admin User'}</p>
                <p className="text-xs text-gray-500 hidden md:block">{user?.email || 'admin@specialgraphics.com'}</p>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="font-semibold">My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <SettingsIcon className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600 cursor-pointer focus:text-red-600" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}