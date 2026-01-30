'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function HeroSlider() {
  const [featuredCars, setFeaturedCars] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 1. Fetch "Featured" Cars from Supabase
  useEffect(() => {
    const fetchCars = async () => {
      const { data } = await supabase
        .from('cars')
        .select('*')
        .eq('is_featured', true) // Only get the ones you toggled "Spotlight" on
        .limit(5); // Limit to top 5

      if (data && data.length > 0) {
        setFeaturedCars(data);
      }
    };

    fetchCars();
  }, []);

  // Auto-scroll every 5 seconds
  useEffect(() => {
    if (featuredCars.length === 0) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex, featuredCars.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === featuredCars.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? featuredCars.length - 1 : prev - 1));
  };

  // If no featured cars are found, return null (or you could return a fallback static hero)
  if (featuredCars.length === 0) return null;

  return (
    <div className="relative w-full h-[600px] md:h-[700px] overflow-hidden bg-slate-900 group">
      
      {/* Background Image & Content */}
      <div 
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {featuredCars.map((car) => (
          <div key={car.id} className="min-w-full relative h-full">
            {/* The Image */}
            <div className="absolute inset-0">
               {car.images && car.images[0] && (
                 <Image 
                   src={car.images[0]} 
                   alt={car.model} 
                   fill 
                   className="object-cover opacity-60"
                   priority
                 />
               )}
               {/* Gradient Overlay */}
               <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
            </div>

            {/* The Details (Price & Name) */}
            <div className="absolute bottom-0 left-0 w-full p-6 md:p-16 pb-24 md:pb-32 flex flex-col items-start justify-end h-full z-10">
              <span className="bg-blue-600 text-white px-3 py-1 text-sm font-bold uppercase tracking-wider rounded-md mb-4 shadow-lg shadow-blue-900/50">
                Featured Deal
              </span>
              <h2 className="text-4xl md:text-7xl font-bold text-white mb-2 tracking-tight">
                {car.year} {car.make} <span className="text-blue-400">{car.model}</span>
              </h2>
              <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-xl line-clamp-2 font-light">
                {car.description}
              </p>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="text-3xl md:text-4xl font-bold text-emerald-400">
                  Ksh {Number(car.price).toLocaleString()}
                </div>
                <Link 
                  href={`/inventory/${car.id}`}
                  className="bg-white text-slate-900 px-8 py-3 rounded-full font-bold hover:bg-blue-50 transition-colors shadow-lg"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all z-20"
      >
        <ChevronLeft size={30} />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all z-20"
      >
        <ChevronRight size={30} />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 right-8 flex gap-2 z-20">
        {featuredCars.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentIndex === idx ? 'bg-blue-500 w-8' : 'bg-white/50 w-2 hover:bg-white'
            }`}
          />
        ))}
      </div>
    </div>
  );
}