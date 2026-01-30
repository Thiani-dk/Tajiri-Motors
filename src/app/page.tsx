'use client';

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero"; // Ensure this matches your filename
import Link from "next/link";
import { ArrowRight, Star, Shield, Zap } from "lucide-react";

export default function Home() {
  return (
    <main className="bg-[#141416] min-h-screen text-white">
      <Navbar />
      
      {/* 1. The Luxury Hero Slider */}
      <Hero />

      {/* 2. Value Proposition Section */}
      <section className="py-20 px-6 border-b border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-[#1e1e24] rounded-2xl border border-white/5 hover:border-[#b48e55]/30 transition-all group">
            <div className="w-14 h-14 bg-[#b48e55]/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#b48e55] transition-colors">
              <Star className="text-[#b48e55] group-hover:text-black" size={24} />
            </div>
            <h3 className="text-xl font-serif mb-2">Premium Selection</h3>
            <p className="text-zinc-400 text-sm">Curated inventory of high-end imports, verified for quality and performance.</p>
          </div>
          <div className="p-6 bg-[#1e1e24] rounded-2xl border border-white/5 hover:border-[#b48e55]/30 transition-all group">
            <div className="w-14 h-14 bg-[#b48e55]/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#b48e55] transition-colors">
              <Shield className="text-[#b48e55] group-hover:text-black" size={24} />
            </div>
            <h3 className="text-xl font-serif mb-2">Trusted Dealership</h3>
            <p className="text-zinc-400 text-sm">Transparent history reports and verified documentation for every vehicle.</p>
          </div>
          <div className="p-6 bg-[#1e1e24] rounded-2xl border border-white/5 hover:border-[#b48e55]/30 transition-all group">
            <div className="w-14 h-14 bg-[#b48e55]/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#b48e55] transition-colors">
              <Zap className="text-[#b48e55] group-hover:text-black" size={24} />
            </div>
            <h3 className="text-xl font-serif mb-2">Fast Financing</h3>
            <p className="text-zinc-400 text-sm">Competitive financing options and quick processing to get you on the road.</p>
          </div>
        </div>
      </section>

      {/* 3. Call to Action / Latest Inventory Preview */}
      <section className="py-24 px-6 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#b48e55]/5 rounded-full blur-[100px]" />
        
        <div className="relative max-w-4xl mx-auto text-center">
          <span className="text-[#b48e55] font-bold tracking-widest uppercase text-sm mb-4 block">
            Discover Excellence
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-8">
            Find Your Next <span className="text-[#b48e55]">Statement</span>
          </h2>
          <p className="text-xl text-zinc-400 mb-10 font-light">
            Explore our complete collection of luxury SUVs, sedans, and performance vehicles available in Mombasa today.
          </p>
          
          <Link 
            href="/inventory"
            className="inline-flex items-center gap-3 bg-white hover:bg-[#b48e55] text-black font-bold px-10 py-4 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(180,142,85,0.4)]"
          >
            View Full Inventory <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </main>
  );
}