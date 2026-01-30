'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';

export default function HeroSlider() {
  const [featuredCars, setFeaturedCars] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 1. Fetch "Featured" Cars from Supabase
  useEffect(() => {
    const fetchCars = async () => {
      const { data } = await supabase
        .from('cars')
        .select('*')
        .eq('is_featured', true)
        .limit(5);

      if (data && data.length > 0) {
        setFeaturedCars(data);
      }
    };

    fetchCars();
  }, []);

  // 2. Auto-scroll Logic
  useEffect(() => {
    if (featuredCars.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === featuredCars.length - 1 ? 0 : prev + 1));
    }, 6000); // 6 seconds for better readability
    return () => clearInterval(timer);
  }, [currentIndex, featuredCars.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === featuredCars.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? featuredCars.length - 1 : prev - 1));
  };

  // Fallback while loading
  if (featuredCars.length === 0) {
    return <div className="h-[85vh] w-full bg-[#141416] animate-pulse" />;
  }

  return (
    <div className="relative w-full h-[85vh] overflow-hidden bg-[#141416] group">
      
      {/* BACKGROUND SLIDER */}
      <div 
        className="flex transition-transform duration-1000 ease-in-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {featuredCars.map((car) => (
          <div key={car.id} className="min-w-full relative h-full">
            {/* Image */}
            <div className="absolute inset-0">
               {car.images && car.images[0] && (
                 <Image 
                   src={car.images[0]} 
                   alt={car.model} 
                   fill 
                   className="object-cover"
                   priority
                 />
               )}
               {/* Luxury Dark Gradient Overlay */}
               <div className="absolute inset-0 bg-gradient-to-t from-[#141416] via-black/50 to-transparent" />
               <div className="absolute inset-0 bg-black/20" /> {/* General dimmer */}
            </div>

            {/* TEXT CONTENT */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pb-20 z-10">
              <span className="bg-[#b48e55] text-black px-5 py-1 text-xs font-bold uppercase tracking-[0.2em] rounded-full mb-6 animate-fade-in-up">
                Featured Collection
              </span>
              
              <h1 className="text-5xl md:text-7xl font-serif text-white mb-4 drop-shadow-lg">
                {car.year} {car.make} <span className="text-[#b48e55]">{car.model}</span>
              </h1>
              
              <p className="text-xl text-zinc-200 mb-8 max-w-2xl font-light drop-shadow-md">
                {car.description ? car.description.substring(0, 100) + "..." : "Experience premium luxury and performance."}
              </p>

              <div className="flex items-center gap-6">
                 <div className="text-3xl font-bold text-white border-r border-white/20 pr-6">
                    Ksh {Number(car.price).toLocaleString()}
                 </div>
                 <Link 
                   href={`/inventory/${car.id}`}
                   className="bg-white hover:bg-[#b48e55] text-black font-bold px-8 py-3 rounded-full transition-all duration-300"
                 >
                   View Details
                 </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* NAVIGATION ARROWS (Hidden on mobile, visible on hover desktop) */}
      <button 
        onClick={prevSlide}
        className="hidden md:block absolute left-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-[#b48e55] transition-colors z-20"
      >
        <ChevronLeft size={48} strokeWidth={1} />
      </button>
      <button 
        onClick={nextSlide}
        className="hidden md:block absolute right-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-[#b48e55] transition-colors z-20"
      >
        <ChevronRight size={48} strokeWidth={1} />
      </button>

      {/* SEARCH BAR (Floating at Bottom) */}
      <div className="absolute bottom-12 left-0 right-0 z-30 px-4">
        <div className="max-w-5xl mx-auto bg-[#1e1e24]/90 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-2xl shadow-black/50">
          <div className="flex items-center gap-2 mb-4">
             <Search className="text-[#b48e55]" size={20} />
             <span className="text-white font-serif text-lg">Find Your Dream Car</span>
          </div>
          
          <form className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input 
              type="text" 
              placeholder="Make (e.g. Toyota)" 
              className="bg-[#141416] border border-zinc-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-[#b48e55] transition-colors"
            />
             <input 
              type="text" 
              placeholder="Model (e.g. Harrier)" 
              className="bg-[#141416] border border-zinc-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-[#b48e55] transition-colors"
            />
             <select className="bg-[#141416] border border-zinc-700 text-zinc-400 px-4 py-3 rounded-xl focus:outline-none focus:border-[#b48e55] transition-colors appearance-none">
                <option>Max Price</option>
                <option>3M - 5M</option>
                <option>5M - 10M</option>
                <option>10M+</option>
             </select>
             
             <button type="submit" className="bg-[#b48e55] hover:bg-[#997641] text-black font-bold py-3 rounded-xl transition-all shadow-lg shadow-[#b48e55]/20">
               Search
             </button>
          </form>
        </div>
      </div>

    </div>
  );
}