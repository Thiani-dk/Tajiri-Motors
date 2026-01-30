'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Image from 'next/image';
import Link from 'next/link';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Hero() {
  const [featuredCars, setFeaturedCars] = useState<any[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

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

  // 2. Auto Slider Functionality
  useEffect(() => {
    if (featuredCars.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredCars.length);
    }, 6000); // Changes every 6 seconds
    return () => clearInterval(timer);
  }, [featuredCars.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % featuredCars.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + featuredCars.length) % featuredCars.length);

  // Fallback UI if no data loads (or while loading)
  if (featuredCars.length === 0) {
    return (
        <div className="h-[85vh] w-full bg-[#141416] flex flex-col items-center justify-center text-[#b48e55]">
            <div className="animate-pulse flex flex-col items-center">
                <span className="text-2xl font-serif">TAJIREE MOTORS</span>
                <span className="text-sm tracking-widest mt-2 uppercase">Loading Luxury...</span>
            </div>
        </div>
    );
  }

  return (
    <div className="relative h-[85vh] w-full overflow-hidden bg-[#141416] text-white group">
      
      {/* BACKGROUND SLIDES */}
      {featuredCars.map((car, index) => (
        <div
          key={car.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Dark Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#141416] via-black/40 to-black/30 z-10" />
          
          {/* Image */}
          {car.images && car.images[0] && (
            <Image
              src={car.images[0]}
              alt={car.title || car.model}
              fill
              className="object-cover"
              priority={index === 0}
            />
          )}

          {/* CENTERED CONTENT */}
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 mt-10">
            <span className="bg-[#b48e55] text-black px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 animate-fade-in-up">
              Featured Vehicle
            </span>
            
            <h1 className="text-5xl md:text-7xl font-serif text-white mb-4 animate-fade-in-up delay-100 drop-shadow-xl">
              {car.year} {car.make} <span className="text-[#b48e55]">{car.model}</span>
            </h1>
            
            <p className="text-xl text-zinc-300 mb-8 font-light animate-fade-in-up delay-200 max-w-2xl drop-shadow-md">
              {car.condition || 'Premium Used'} · {car.transmission} · {car.fuel_type || 'Petrol'}
            </p>
            
            <div className="flex gap-4 animate-fade-in-up delay-300">
              <Link 
                href={`/inventory/${car.id}`} 
                className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-zinc-200 transition-colors"
              >
                View Details
              </Link>
              <Link 
                href="/inventory" 
                className="border border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white/10 transition-colors"
              >
                Browse All Cars
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* NAVIGATION ARROWS (Hidden on mobile) */}
      <button 
        onClick={prevSlide} 
        className="absolute left-4 top-1/2 z-30 text-white/50 hover:text-[#b48e55] transition-colors hidden md:block"
      >
        <ChevronLeft size={48} strokeWidth={1} />
      </button>
      <button 
        onClick={nextSlide} 
        className="absolute right-4 top-1/2 z-30 text-white/50 hover:text-[#b48e55] transition-colors hidden md:block"
      >
        <ChevronRight size={48} strokeWidth={1} />
      </button>

      {/* 3. LUXURY SEARCH BAR (Floating at bottom) */}
      <div className="absolute bottom-0 left-0 right-0 z-30 transform translate-y-1/2 px-4 pb-12 md:pb-0">
        <div className="max-w-5xl mx-auto bg-[#1e1e24]/90 border border-white/10 rounded-2xl p-6 shadow-2xl shadow-black/50 backdrop-blur-md">
          <div className="flex items-center gap-2 mb-4">
             <Search className="text-[#b48e55]" size={20} />
             <span className="text-white font-serif text-lg">Find Your Dream Car</span>
          </div>
          
          <form className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input 
              type="text" 
              placeholder="Make (e.g. Toyota)" 
              className="bg-[#141416] border border-zinc-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-[#b48e55] transition-colors placeholder:text-zinc-600"
            />
             <input 
              type="text" 
              placeholder="Model (e.g. Harrier)" 
              className="bg-[#141416] border border-zinc-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-[#b48e55] transition-colors placeholder:text-zinc-600"
            />
             <select className="bg-[#141416] border border-zinc-700 text-zinc-400 px-4 py-3 rounded-xl focus:outline-none focus:border-[#b48e55] transition-colors appearance-none cursor-pointer">
                <option>Max Price</option>
                <option>3M - 5M</option>
                <option>5M - 10M</option>
                <option>10M+</option>
             </select>
             
             {/* THE GOLD BUTTON */}
             <button type="submit" className="bg-[#b48e55] hover:bg-[#997641] text-black font-bold py-3 rounded-xl transition-all shadow-[0_0_15px_rgba(180,142,85,0.3)] hover:shadow-[0_0_25px_rgba(180,142,85,0.5)]">
               Search Inventory
             </button>
          </form>
        </div>
      </div>
    </div>
  );
}