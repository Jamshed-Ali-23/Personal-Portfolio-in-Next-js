'use client';

import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { LogOut, Menu, User } from 'lucide-react';

interface AdminHeaderProps {
  user: {
    email?: string | null;
    name?: string | null;
  };
}

export default function AdminHeader({ user }: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-stone-950/80 backdrop-blur-lg border-b border-stone-800">
      <div className="flex items-center justify-between h-16 px-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-stone-400 hover:text-stone-100"
            onClick={() => {
              // Dispatch custom event to toggle mobile sidebar
              window.dispatchEvent(new CustomEvent('toggle-mobile-sidebar'));
            }}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h2 className="text-lg font-semibold text-stone-100 hidden sm:block">
            Portfolio CMS
          </h2>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-stone-400">
            <div className="p-1.5 rounded-full bg-stone-800">
              <User className="h-4 w-4" />
            </div>
            <span className="hidden sm:inline">{user.email}</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => signOut({ callbackUrl: '/admin/login' })}
            className="text-stone-400 hover:text-stone-100"
          >
            <LogOut className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
