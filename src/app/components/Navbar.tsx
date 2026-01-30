'use client';

import Link from 'next/link';
import { Phone } from 'lucide-react';
import Logo from './Logo';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-slate-900/50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Logo />

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
            Home
          </Link>
          <Link href="/cars" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
            Inventory
          </Link>
          <Link href="/about" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
            About Us
          </Link>
          <Link href="/contact" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
            Contact
          </Link>
        </div>

        {/* Call to Action Button */}
        <div className="flex items-center gap-4">
          <button className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-white text-slate-900 rounded-full font-bold text-sm hover:bg-slate-200 transition-colors">
            <Phone size={16} className="text-blue-600" />
            <span>0700 123 456</span>
          </button>
        </div>
      </div>
    </nav>
  );
}