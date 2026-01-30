'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, ChevronRight, ChevronLeft } from 'lucide-react';

const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1920&auto=format&fit=crop",
    title: "Toyota Harrier",
    subtitle: "2017 · Automatic · Petrol",
    price: "Ksh 3,100,000"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1503376763036-066120622c74?q=80&w=1920&auto=format&fit=crop",
    title: "Land Cruiser V8",
    subtitle: "2019 · Automatic · Diesel",
    price: "Ksh 12,500,000"
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // 1. AUTO SLIDER FUNCTIONALITY
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Changes every 5 seconds
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative h-[85vh] w-full overflow-hidden bg-obsidian">
      {/* Background Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Dark Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#141416] via-black/40 to-black/30 z-10" />
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 mt-10">
            <span className="bg-gold text-black px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 animate-fade-in-up">
              Featured Vehicle
            </span>
            <h1 className="text-5xl md:text-7xl font-serif text-white mb-4 animate-fade-in-up delay-100">
              {slide.title}
            </h1>
            <p className="text-xl text-zinc-300 mb-8 font-light animate-fade-in-up delay-200">
              {slide.subtitle}
            </p>
            <div className="flex gap-4 animate-fade-in-up delay-300">
              <Link href={`/inventory/${slide.id}`} className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-zinc-200 transition-colors">
                View Details
              </Link>
              <Link href="/inventory" className="border border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white/10 transition-colors">
                Browse All Cars
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* 2. LUXURY SEARCH BAR (Floating at bottom) */}
      <div className="absolute bottom-0 left-0 right-0 z-30 transform translate-y-1/2 px-4">
        <div className="max-w-5xl mx-auto bg-obsidian-light border border-white/10 rounded-2xl p-6 shadow-2xl shadow-black/50 backdrop-blur-md">
          <div className="flex items-center gap-2 mb-4">
             <Search className="text-gold" size={20} />
             <span className="text-white font-serif text-lg">Find Your Dream Car</span>
          </div>
          
          <form className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input 
              type="text" 
              placeholder="Make (e.g. Toyota)" 
              className="bg-[#141416] border border-zinc-800 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-gold transition-colors"
            />
             <input 
              type="text" 
              placeholder="Model (e.g. Harrier)" 
              className="bg-[#141416] border border-zinc-800 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-gold transition-colors"
            />
             <select className="bg-[#141416] border border-zinc-800 text-zinc-400 px-4 py-3 rounded-xl focus:outline-none focus:border-gold transition-colors appearance-none">
                <option>Max Price</option>
                <option>3M - 5M</option>
                <option>5M - 10M</option>
                <option>10M+</option>
             </select>
             
             {/* THE GOLD BUTTON */}
             <button type="submit" className="bg-gold hover:bg-gold-hover text-black font-bold py-3 rounded-xl transition-all shadow-[0_0_15px_rgba(180,142,85,0.3)] hover:shadow-[0_0_25px_rgba(180,142,85,0.5)]">
               Search Inventory
             </button>
          </form>
        </div>
      </div>
    </div>
  );
}