'use client';

import { Search, Calendar, Settings } from 'lucide-react';
import Image from 'next/image';

export default function Hero() {
  return (
    <div className="relative w-full h-screen bg-slate-900 flex flex-col justify-center items-center pt-20">
      {/* Background Image - Using a reliable placeholder for now */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2800&auto=format&fit=crop"
          alt="Luxury Car Background"
          fill
          className="object-cover opacity-50"
          priority
        />
        {/* Gradient Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/50 to-slate-900" />
      </div>

      {/* Hero Text Content */}
      <div className="relative z-10 text-center max-w-4xl px-4 mb-12 mt-10">
        <span className="inline-block py-1 px-3 rounded-full bg-blue-600/20 text-blue-400 border border-blue-500/30 text-xs md:text-sm font-semibold mb-6 backdrop-blur-sm">
          #1 Trusted Dealership in Mombasa
        </span>
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
          Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Dream Drive</span>
        </h1>
        <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto font-light">
          Quality imports and locally used vehicles. Verified listings, transparent pricing, and instant paperwork.
        </p>
      </div>

      {/* Search Filter Bar */}
      <div className="relative z-20 w-full max-w-5xl px-4">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl ring-1 ring-white/10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            
            {/* Make/Model Search */}
            <div className="relative group">
              <div className="absolute left-3 top-3.5 text-gray-400 group-focus-within:text-blue-400">
                <Search size={18} />
              </div>
              <input 
                type="text" 
                placeholder="Search Make (e.g. Toyota)" 
                className="w-full h-12 pl-10 pr-4 rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm"
              />
            </div>

            {/* Year Dropdown */}
            <div className="relative group">
              <div className="absolute left-3 top-3.5 text-gray-400 group-focus-within:text-blue-400">
                <Calendar size={18} />
              </div>
              <select className="w-full h-12 pl-10 pr-4 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-300 focus:outline-none focus:border-blue-500 transition-all appearance-none cursor-pointer text-sm">
                <option value="">Year (Any)</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2016 - 2022</option>
                <option value="2015">2010 - 2015</option>
              </select>
            </div>

            {/* Price Dropdown */}
            <div className="relative group">
              <div className="absolute left-3 top-3.5 text-gray-400 group-focus-within:text-blue-400">
                <Settings size={18} />
              </div>
              <select className="w-full h-12 pl-10 pr-4 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-300 focus:outline-none focus:border-blue-500 transition-all appearance-none cursor-pointer text-sm">
                <option value="">Max Price (Ksh)</option>
                <option value="1000000">Under 1M</option>
                <option value="2500000">Under 2.5M</option>
                <option value="5000000">Under 5M</option>
                <option value="5000001">5M+</option>
              </select>
            </div>

            {/* Action Button */}
            <button className="h-12 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 text-sm">
              Explore Inventory
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}