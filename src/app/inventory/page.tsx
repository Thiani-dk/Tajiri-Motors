import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import { Fuel, Gauge, Settings, ArrowRight } from 'lucide-react';

// Force dynamic rendering so new cars show up immediately
export const revalidate = 0;

async function getCars() {
  const { data } = await supabase
    .from('cars')
    .select('*')
    .order('created_at', { ascending: false });
  return data || [];
}

export default async function InventoryPage() {
  const cars = await getCars();

  return (
    <div className="min-h-screen bg-[#141416] text-white font-sans selection:bg-[#b48e55] selection:text-black pb-20">
      <Navbar />

      {/* Header Section */}
      <div className="pt-32 pb-12 px-6 text-center border-b border-white/5 bg-[#141416]">
        <h1 className="text-4xl md:text-5xl font-serif mb-4 text-white">
          The <span className="text-[#b48e55]">Showroom</span>
        </h1>
        <p className="text-zinc-400 max-w-2xl mx-auto font-light">
          Browse our exclusive collection of premium vehicles. Each car is rigorously inspected and ready for immediate ownership.
        </p>
      </div>

      {/* Inventory Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {cars.length === 0 ? (
          <div className="text-center py-20 bg-[#1e1e24] rounded-2xl border border-dashed border-white/10">
            <h3 className="text-xl text-zinc-500 font-medium">No vehicles currently available.</h3>
            <p className="text-zinc-600 mt-2">Check back soon for new arrivals.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cars.map((car) => (
              <Link 
                key={car.id} 
                href={`/inventory/${car.id}`}
                className="group bg-[#1e1e24] rounded-xl overflow-hidden border border-white/5 hover:border-[#b48e55]/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(180,142,85,0.15)] flex flex-col"
              >
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden bg-black">
                  {car.image_url ? (
                    <Image 
                      src={car.image_url} 
                      alt={car.title} 
                      fill 
                      className="object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-700 bg-[#141416]">
                      No Image
                    </div>
                  )}
                  
                  {/* Status Badge */}
                  {car.status === 'sold' && (
                    <div className="absolute top-4 right-4 bg-red-900/90 text-red-100 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-red-500/30">
                      Sold
                    </div>
                  )}
                  {car.status !== 'sold' && (
                    <div className="absolute top-4 right-4 bg-[#b48e55] text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      Available
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex-grow">
                    <h2 className="text-xl font-medium text-white mb-2 line-clamp-1 group-hover:text-[#b48e55] transition-colors">
                      {car.title}
                    </h2>
                    <p className="text-2xl font-serif text-[#b48e55] mb-6">
                      Ksh {Number(car.price).toLocaleString()}
                    </p>

                    {/* Specs Grid */}
                    <div className="grid grid-cols-3 gap-2 mb-6 border-t border-white/5 pt-4">
                      <div className="flex flex-col items-center justify-center p-2 bg-[#141416] rounded-lg">
                        <Gauge size={16} className="text-zinc-500 mb-1" />
                        <span className="text-[10px] text-zinc-400 uppercase tracking-wider">Mileage</span>
                        <span className="text-xs font-medium text-zinc-200">{car.mileage || '-'}</span>
                      </div>
                      <div className="flex flex-col items-center justify-center p-2 bg-[#141416] rounded-lg">
                        <Settings size={16} className="text-zinc-500 mb-1" />
                        <span className="text-[10px] text-zinc-400 uppercase tracking-wider">Trans</span>
                        <span className="text-xs font-medium text-zinc-200">{car.transmission?.substring(0, 4) || 'Auto'}</span>
                      </div>
                      <div className="flex flex-col items-center justify-center p-2 bg-[#141416] rounded-lg">
                        <Fuel size={16} className="text-zinc-500 mb-1" />
                        <span className="text-[10px] text-zinc-400 uppercase tracking-wider">Fuel</span>
                        <span className="text-xs font-medium text-zinc-200">{car.fuel || 'Petrol'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center text-[#b48e55] font-bold text-sm uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                    View Details <ArrowRight size={16} className="ml-2" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}