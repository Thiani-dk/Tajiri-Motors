import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/app/components/Navbar';

// Fetch all cars, newest first
async function getInventory() {
  const { data } = await supabase
    .from('cars')
    .select('*')
    .order('created_at', { ascending: false });
  return data || [];
}

export default async function InventoryPage() {
  const cars = await getInventory();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">Full Inventory</h1>
        
        {/* Car Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map((car) => (
            <Link key={car.id} href={`/inventory/${car.id}`} className="group block bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-blue-500/50 transition-all hover:shadow-2xl hover:shadow-blue-900/20">
              
              {/* Image Card */}
              <div className="relative h-64 overflow-hidden">
                {car.images && car.images[0] ? (
                  <Image 
                    src={car.images[0]} 
                    alt={car.model} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                ) : (
                  <div className="w-full h-full bg-slate-800 flex items-center justify-center text-slate-600">No Image</div>
                )}
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold text-white border border-white/10">
                  {car.year}
                </div>
              </div>

              {/* Details */}
              <div className="p-6">
                <h2 className="text-xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
                  {car.make} {car.model}
                </h2>
                <p className="text-slate-400 text-sm mb-4 line-clamp-2">{car.description}</p>
                
                <div className="flex items-center justify-between border-t border-slate-800 pt-4">
                  <span className="text-emerald-400 font-bold text-lg">
                    Ksh {Number(car.price).toLocaleString()}
                  </span>
                  <span className="text-xs text-slate-500 bg-slate-800 px-2 py-1 rounded">
                    {car.transmission}
                  </span>
                </div>
              </div>
            </Link>
          ))}

          {cars.length === 0 && (
            <div className="col-span-full text-center py-20 text-slate-500">
              <p>No cars in inventory yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}