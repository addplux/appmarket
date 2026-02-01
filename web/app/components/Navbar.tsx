'use client';

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

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
              <Link href="/login" className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors">
                Sign In
              </Link>
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
            <Link href="/login" className="block mt-4 bg-violet-600 text-center px-4 py-2 rounded-md font-medium">Sign In</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
