'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Image,
  Trophy,
  BarChart3,
  Settings,
  FileText,
  Palette,
  Award,
  TrendingUp,
  Menu,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: number;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/adminpanel', icon: LayoutDashboard },
  { label: 'Users', href: '/adminpanel/users', icon: Users, badge: 1247 },
  { label: 'Designs', href: '/adminpanel/designs', icon: Image, badge: 3421 },
  { label: 'Contests', href: '/adminpanel/contests', icon: Trophy, badge: 89 },
  { label: 'Inspirations', href: '/adminpanel/inspirations', icon: Palette },
  { label: 'Categories', href: '/adminpanel/categories', icon: FileText },
  { label: 'Analytics', href: '/adminpanel/analytics', icon: BarChart3 },
  { label: 'Awards', href: '/adminpanel/awards', icon: Award },
  { label: 'Trending', href: '/adminpanel/trending', icon: TrendingUp },
  { label: 'Settings', href: '/adminpanel/settings', icon: Settings },
];

export default function AdminSidebar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors border border-gray-200"
        aria-label="Toggle menu"
        style={{ marginTop: '0' }}
      >
        {isMobileOpen ? (
          <X className="h-6 w-6 text-gray-700" />
        ) : (
          <Menu className="h-6 w-6 text-gray-700" />
        )}
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed lg:static inset-y-0 left-0 z-40 w-72 md:w-80 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-20 px-6 border-b border-gray-200 bg-white">
            <Link href="/adminpanel" className="flex items-center">
              <div>
                <span className="text-2xl md:text-3xl font-bold text-gray-900 whitespace-nowrap">
                  Special Graphics
                </span>
                <span className="text-xs md:text-sm text-gray-500 font-medium uppercase tracking-wider block mt-1">
                  Admin Panel
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-6 px-4">
            <div className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || (item.href !== '/adminpanel' && pathname?.startsWith(item.href));
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileOpen(false)}
                    className={cn(
                      'flex items-center gap-4 px-5 py-3.5 rounded-lg text-base font-medium transition-all duration-200 relative group',
                      isActive
                        ? 'bg-gray-100 text-gray-900 border-l-4 border-gray-900'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    )}
                  >
                    <Icon
                      className={cn(
                        'w-6 h-6 transition-colors',
                        isActive ? 'text-gray-900' : 'text-gray-500 group-hover:text-gray-700'
                      )}
                    />
                    <span className="flex-1">{item.label}</span>
                    {item.badge && (
                      <span className="px-2 py-0.5 text-xs font-semibold bg-gray-200 text-gray-900 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="px-4 py-3 bg-gray-900 rounded-lg text-white shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold">System Status</p>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              </div>
              <p className="text-xs opacity-90">All systems operational</p>
              <p className="text-[10px] opacity-75 mt-1">v1.0.0</p>
            </div>
          </div>
        </div>

        {/* Overlay for mobile */}
        {isMobileOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-30"
            onClick={() => setIsMobileOpen(false)}
          />
        )}
      </aside>
    </>
  );
}

