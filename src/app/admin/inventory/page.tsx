import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Search, Edit3, CheckCircle, XCircle, Star } from 'lucide-react';
import Navbar from '@/components/Navbar';

// Force dynamic rendering so admin always sees fresh data
export const revalidate = 0;

async function getInventory() {
  const { data } = await supabase
    .from('cars')
    .select('*')
    .order('created_at', { ascending: false });
  return data || [];
}

export default async function AdminInventoryPage() {
  const cars = await getInventory();

  return (
    <div className="min-h-screen bg-[#141416] text-[#e6e6e6]">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 py-12 pt-24">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-light text-white mb-2">
              Showroom Management
            </h1>
            <p className="text-zinc-500 text-sm">Manage inventory, update prices, and track sales.</p>
          </div>
          
          <Link 
            href="/admin/add" 
            className="flex items-center gap-2 bg-[#c4a484] hover:bg-[#a88b6a] text-black font-bold px-6 py-3 rounded-xl transition-all shadow-lg shadow-[#c4a484]/20 active:scale-95"
          >
            <Plus size={20} /> Add New Vehicle
          </Link>
        </div>

        {/* Inventory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car) => (
            <Link 
              key={car.id} 
              href={`/admin/inventory/${car.id}`} 
              className="group relative block bg-[#1e1e24] rounded-xl overflow-hidden border border-white/5 hover:border-[#c4a484]/50 transition-all hover:shadow-2xl hover:shadow-black/50"
            >
              
              {/* Image Section */}
              <div className="relative h-56 overflow-hidden bg-black">
                {car.image_url ? (
                  <Image 
                    src={car.image_url} 
                    alt={car.title} 
                    fill 
                    className={`object-cover transition-transform duration-700 group-hover:scale-105 ${car.status === 'sold' ? 'grayscale opacity-50' : ''}`} 
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-zinc-600 bg-[#141416]">
                    No Image
                  </div>
                )}

                {/* Status Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {car.status === 'sold' && (
                        <span className="bg-red-900/80 backdrop-blur-md text-red-200 text-xs font-bold px-3 py-1 rounded-full border border-red-500/20 shadow-lg">
                            SOLD
                        </span>
                    )}
                    {car.is_slider && (
                        <span className="flex items-center gap-1 bg-yellow-900/80 backdrop-blur-md text-yellow-200 text-xs font-bold px-3 py-1 rounded-full border border-yellow-500/20 shadow-lg">
                            <Star size={10} fill="currentColor" /> FEATURED
                        </span>
                    )}
                </div>

                {/* Edit Overlay Icon */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                   <span className="bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-full font-medium border border-white/20 flex items-center gap-2">
                     <Edit3 size={16} /> Edit Details
                   </span>
                </div>
              </div>

              {/* Card Details */}
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                    <h2 className="text-lg font-medium text-white group-hover:text-[#c4a484] transition-colors line-clamp-1">
                      {car.title}
                    </h2>
                </div>
                
                <p className="text-[#c4a484] font-medium text-xl mb-4">
                  Ksh {Number(car.price).toLocaleString()}
                </p>
                
                <div className="flex items-center justify-between text-xs text-zinc-500 border-t border-white/5 pt-3">
                  <span className="flex items-center gap-1">
                     {car.year} Model
                  </span>
                  <span className={`flex items-center gap-1 px-2 py-1 rounded ${car.status === 'sold' ? 'bg-red-900/20 text-red-400' : 'bg-green-900/20 text-green-400'}`}>
                    {car.status === 'sold' ? <XCircle size={12} /> : <CheckCircle size={12} />}
                    {car.status === 'sold' ? 'Sold' : 'Available'}
                  </span>
                </div>
              </div>
            </Link>
          ))}

          {/* Empty State */}
          {cars.length === 0 && (
            <div className="col-span-full py-32 text-center border-2 border-dashed border-zinc-800 rounded-2xl bg-[#1e1e24]/50">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-zinc-800 text-zinc-500 mb-4">
                <Search size={32} />
              </div>
              <h3 className="text-xl font-medium text-white mb-2">No cars in inventory</h3>
              <p className="text-zinc-500 mb-6">Get started by adding your first vehicle to the showroom.</p>
              <Link href="/admin/add" className="text-[#c4a484] hover:underline">
                Add Vehicle Now &rarr;
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}