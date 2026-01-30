import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import { Search, ArrowRight, Star, Calendar, Gauge, Settings } from 'lucide-react';

// Force the page to fetch fresh data on every visit
export const revalidate = 0;

export default async function Home() {
  // 1. Fetch Slider Car (The one you toggled 'is_slider' ON for)
  const { data: sliderCars } = await supabase
    .from('cars')
    .select('*')
    .eq('is_slider', true)
    .limit(1);

  const heroCar = sliderCars && sliderCars.length > 0 ? sliderCars[0] : null;

  // 2. Fetch Latest Inventory (Everything else, newest first)
  const { data: recentCars } = await supabase
    .from('cars')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(8);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-200">
      <Navbar />
      
      {/* --- 1. DYNAMIC HERO SECTION (Replaces <HeroSlider/>) --- */}
      <div className="relative h-[85vh] w-full overflow-hidden flex items-center justify-center bg-black">
        {heroCar ? (
          <>
            {/* Background Image */}
            <div className="absolute inset-0 opacity-70">
               <Image 
                 src={heroCar.image_url} 
                 alt={heroCar.title} 
                 fill 
                 className="object-cover"
                 priority
               />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />
            </div>

            {/* Hero Content */}
            <div className="relative z-10 text-center max-w-5xl px-4 mt-10">
              <div className="animate-fade-in-up">
                <span className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-bold mb-6 shadow-lg shadow-blue-900/50">
                  <Star size={14} fill="currentColor" /> Featured Vehicle
                </span>
                <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight leading-tight drop-shadow-2xl text-white">
                  {heroCar.title}
                </h1>
                <p className="text-xl md:text-2xl text-slate-200 mb-8 font-light flex items-center justify-center gap-4">
                  <span>{heroCar.year}</span> • <span>{heroCar.transmission}</span> • <span>{heroCar.fuel}</span>
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link 
                    href={`/inventory/${heroCar.id}`}
                    className="bg-white text-slate-950 px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition-colors"
                  >
                    View Details
                  </Link>
                  <Link 
                    href="/inventory"
                    className="backdrop-blur-md bg-white/10 border-2 border-white/30 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-colors"
                  >
                    Browse All Cars
                  </Link>
                </div>
              </div>
            </div>
          </>
        ) : (
          // Fallback if no car is toggled as "Slider"
          <div className="relative z-10 text-center">
            <h1 className="text-5xl font-bold text-slate-800 mb-4">Tajiree Motors</h1>
            <p className="text-slate-500">Go to Admin and toggle "Show on Slider" to feature a car here.</p>
          </div>
        )}
      </div>

      {/* --- 2. SEARCH SECTION --- */}
      <div className="relative z-30 -mt-24 px-4 mb-20">
        <div className="max-w-6xl mx-auto bg-slate-900/90 backdrop-blur-xl border border-slate-700 p-8 rounded-2xl shadow-2xl shadow-black/50">
           <h3 className="text-white mb-6 font-semibold flex items-center gap-2 text-lg">
             <Search size={20} className="text-blue-500" /> 
             Find Your Dream Car
           </h3>
           
           <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
             <div className="relative group">
               <input type="text" placeholder="Make (e.g. Toyota)" className="w-full bg-slate-950 border border-slate-700 p-4 rounded-xl text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600" />
             </div>
             
             <div className="relative group">
               <input type="text" placeholder="Model (e.g. Harrier)" className="w-full bg-slate-950 border border-slate-700 p-4 rounded-xl text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600" />
             </div>
             
             <div className="relative group">
               <select className="w-full bg-slate-950 border border-slate-700 p-4 rounded-xl text-slate-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all appearance-none cursor-pointer">
                 <option value="">Max Price</option>
                 <option value="1500000">Under 1.5M</option>
                 <option value="2500000">Under 2.5M</option>
                 <option value="4000000">Under 4M</option>
                 <option value="5000001">Above 5M</option>
               </select>
             </div>

             <Link href="/inventory" className="bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-900/30 flex items-center justify-center active:scale-95">
               Search Inventory
             </Link>
           </div>
        </div>
      </div>
      
      {/* --- 3. LATEST ARRIVALS GRID --- */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
           <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">Latest Arrivals</h2>
              <p className="text-slate-400 mt-2">Freshly imported and locally used vehicles</p>
           </div>
           <Link href="/inventory" className="text-blue-400 hover:text-blue-300 flex items-center gap-2 font-semibold transition-colors">
             View Full Inventory <ArrowRight size={18} />
           </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
           {recentCars?.map((car) => (
             <Link key={car.id} href={`/inventory/${car.id}`} className="group block bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-900/20 transition-all duration-300">
               {/* Image */}
               <div className="relative h-48 overflow-hidden">
                 <Image 
                   src={car.image_url} 
                   alt={car.title} 
                   fill 
                   className="object-cover group-hover:scale-110 transition-transform duration-700" 
                 />
                 <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-xs font-bold text-white border border-white/10">
                   {car.year}
                 </div>
               </div>

               {/* Content */}
               <div className="p-5">
                 <h3 className="text-white font-bold text-lg mb-1 truncate group-hover:text-blue-400 transition-colors">{car.title}</h3>
                 <p className="text-emerald-400 font-bold text-lg mb-4">Ksh {Number(car.price).toLocaleString()}</p>
                 
                 <div className="flex items-center justify-between text-xs text-slate-500 border-t border-slate-800 pt-3">
                   <div className="flex items-center gap-1">
                      <Gauge size={14} /> {car.mileage || 'N/A'}
                   </div>
                   <div className="flex items-center gap-1">
                      <Settings size={14} /> {car.transmission}
                   </div>
                   <div className="flex items-center gap-1">
                      <Calendar size={14} /> {car.condition || 'Used'}
                   </div>
                 </div>
               </div>
             </Link>
           ))}

           {(!recentCars || recentCars.length === 0) && (
              <div className="col-span-full py-20 text-center text-slate-500 bg-slate-900/50 rounded-2xl border border-dashed border-slate-800">
                <p>No cars found in database.</p>
                <Link href="/admin" className="text-blue-500 hover:underline mt-2 inline-block">Add your first car</Link>
              </div>
           )}
        </div>
      </div>
    </main>
  );
}