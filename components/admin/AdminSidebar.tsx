'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  FolderKanban,
  Award,
  Briefcase,
  Brain,
  User,
  Home,
  X,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/profile', label: 'Profile', icon: User },
  { href: '/admin/projects', label: 'Projects', icon: FolderKanban },
  { href: '/admin/skills', label: 'Skills', icon: Brain },
  { href: '/admin/certificates', label: 'Certificates', icon: Award },
  { href: '/admin/experience', label: 'Experience', icon: Briefcase },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  const SidebarContent = () => (
    <>
      <div className="p-6 border-b border-stone-800">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500">
            <LayoutDashboard className="h-5 w-5 text-stone-900" />
          </div>
          <span className="text-xl font-bold text-stone-100">Admin Panel</span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || 
            (item.href !== '/admin' && pathname.startsWith(item.href));
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-amber-500/10 text-amber-500'
                  : 'text-stone-400 hover:text-stone-100 hover:bg-stone-800/50'
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-stone-800">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-stone-400 hover:text-stone-100 hover:bg-stone-800/50 transition-colors"
        >
          <Home className="h-5 w-5" />
          View Portfolio
        </Link>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:w-64 bg-stone-900/50 border-r border-stone-800">
        <SidebarContent />
      </aside>

      {/* Mobile Toggle Button (controlled by AdminHeader) */}
      <div id="mobile-sidebar-portal" />

      {/* Mobile Sidebar Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={cn(
          'lg:hidden fixed inset-y-0 left-0 w-64 bg-stone-900 border-r border-stone-800 z-50 transform transition-transform duration-200 ease-in-out flex flex-col',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 text-stone-400 hover:text-stone-100"
          onClick={() => setIsMobileOpen(false)}
        >
          <X className="h-5 w-5" />
        </Button>
        <SidebarContent />
      </aside>
    </>
  );
}
