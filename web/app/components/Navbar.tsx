'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, X, User, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getStoredUser, logout, isAuthenticated } from '../lib/auth';
import type { User as UserType } from '../lib/auth';

export default function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    if (isAuthenticated()) {
      setUser(getStoredUser());
    }
  }, []);

  const handleLogout = async () => {
    await logout();
    setUser(null);
    setShowUserMenu(false);
    router.push('/');
  };

  return (
    <nav className="fixed w-full z-50 glass-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold gradient-text">
              App Market
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/" className="hover:text-violet-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Home
              </Link>
              <Link href="/explore" className="hover:text-violet-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Explore
              </Link>
              <Link href="/invest" className="hover:text-violet-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Invest
              </Link>

              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 bg-violet-600/20 hover:bg-violet-600/30 border border-violet-500/50 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
                  >
                    <User className="w-4 h-4" />
                    {user.username}
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-800 rounded-lg shadow-xl py-2">
                      <div className="px-4 py-2 border-b border-slate-800">
                        <p className="text-sm font-medium text-slate-300">{user.username}</p>
                        <p className="text-xs text-slate-500">{user.email}</p>
                      </div>
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 transition-colors"
                        onClick={() => setShowUserMenu(false)}
                      >
                        Profile
                      </Link>
                      <Link
                        href="/my-investments"
                        className="block px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 transition-colors"
                        onClick={() => setShowUserMenu(false)}
                      >
                        My Investments
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-slate-800 transition-colors flex items-center gap-2"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link href="/login" className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors">
                  Sign In
                </Link>
              )}
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-slate-900 border-b border-gray-800">
            <Link href="/" className="block hover:bg-gray-800 px-3 py-2 rounded-md text-base font-medium">Home</Link>
            <Link href="/explore" className="block hover:bg-gray-800 px-3 py-2 rounded-md text-base font-medium">Explore</Link>
            <Link href="/invest" className="block hover:bg-gray-800 px-3 py-2 rounded-md text-base font-medium">Invest</Link>

            {user ? (
              <>
                <div className="px-3 py-2 border-t border-slate-800 mt-2">
                  <p className="text-sm font-medium text-slate-300">{user.username}</p>
                  <p className="text-xs text-slate-500">{user.email}</p>
                </div>
                <Link href="/profile" className="block hover:bg-gray-800 px-3 py-2 rounded-md text-base font-medium">Profile</Link>
                <Link href="/my-investments" className="block hover:bg-gray-800 px-3 py-2 rounded-md text-base font-medium">My Investments</Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left block hover:bg-gray-800 px-3 py-2 rounded-md text-base font-medium text-red-400"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link href="/login" className="block mt-4 bg-violet-600 text-center px-4 py-2 rounded-md font-medium">Sign In</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
