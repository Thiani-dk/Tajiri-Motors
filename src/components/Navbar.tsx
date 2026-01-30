'use client';
import Link from 'next/link';
import { Phone, Car } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-obsidian/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* LOGO - Now using the Serif Font and Gold Accent */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-gold rounded-lg flex items-center justify-center text-black font-bold transform group-hover:rotate-3 transition-transform">
            TM
          </div>
          <span className="text-2xl font-serif font-bold text-white tracking-wide">
            Tajiree<span className="text-gold">Motors</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-medium hover:text-gold transition-colors uppercase tracking-widest">
            Home
          </Link>
          <Link href="/inventory" className="text-sm font-medium hover:text-gold transition-colors uppercase tracking-widest">
            Inventory
          </Link>
          {isAdmin && (
            <Link href="/admin/inventory" className="text-sm font-medium text-gold hover:text-white transition-colors uppercase tracking-widest">
              Dashboard
            </Link>
          )}
        </div>

        {/* ACTION BUTTON - Replaced Blue with Gold */}
        <div className="flex items-center gap-4">
           {/* 'View Admin' hidden link for you to easily access login */}
           {!isAdmin && (
             <Link href="/admin/login" className="hidden lg:block text-xs text-zinc-600 hover:text-zinc-400">
               Admin
             </Link>
           )}

          <a 
            href="tel:+254700000000" 
            className="flex items-center gap-2 bg-gold hover:bg-gold-hover text-black px-6 py-3 rounded-full font-bold transition-all shadow-[0_0_20px_rgba(180,142,85,0.3)] hover:shadow-[0_0_30px_rgba(180,142,85,0.5)] active:scale-95"
          >
            <Phone size={18} />
            <span>Call Us</span>
          </a>
        </div>
      </div>
    </nav>
  );
}