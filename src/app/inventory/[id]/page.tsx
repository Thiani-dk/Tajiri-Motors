import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Phone, MessageCircle, Calendar, Gauge, Settings, Fuel, CheckCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';

// Force dynamic rendering so users always see the latest status
export const revalidate = 0;

async function getCar(id: string) {
  const { data } = await supabase.from('cars').select('*').eq('id', id).single();
  return data;
}

// Fetch contact phone (defaults to a placeholder if not set)
async function getPhone() {
  const { data } = await supabase.from('site_settings').select('value').eq('key', 'contact_phone').single();
  return data?.value || '0700000000';
}

export default async function CarDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const car = await getCar(id);
  const phoneNumber = await getPhone();
  
  if (!car) return (
    <div className="min-h-screen bg-[#141416] text-[#c4a484] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-zinc-500 mb-6">Car not found in our showroom.</p>
        <Link href="/" className="text-white hover:underline">Back to Home</Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#141416] text-[#e6e6e6] pb-20">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8 pt-24">
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center text-zinc-500 hover:text-[#c4a484] mb-8 transition-colors">
          <ArrowLeft size={18} className="mr-2" /> Back to Showroom
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* LEFT: Main Image */}
          <div className="space-y-4">
            <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden border border-white/5 shadow-2xl bg-black">
              {car.image_url ? (
                <Image src={car.image_url} alt={car.title} fill className="object-cover" priority />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-zinc-600">No Image Available</div>
              )}
              
              {/* Sold Badge Overlay */}
              {car.status === 'sold' && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="bg-red-900/90 text-red-100 text-2xl font-bold px-8 py-3 rounded-full border border-red-500/30 transform -rotate-12 shadow-2xl">
                        SOLD OUT
                    </span>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: Details */}
          <div>
            <div className="flex items-center gap-3 mb-4">
                <span className="inline-block bg-[#232323] text-zinc-300 px-4 py-1.5 rounded-full text-xs font-medium border border-white/10 tracking-wider uppercase">
                {car.condition || 'Pre-Owned'}
                </span>
                {car.is_slider && (
                    <span className="inline-flex items-center gap-1 bg-[#c4a484]/10 text-[#c4a484] px-3 py-1.5 rounded-full text-xs font-bold border border-[#c4a484]/20">
                        <CheckCircle size={12} /> Featured
                    </span>
                )}
            </div>
            
            <h1 className="text-3xl md:text-5xl font-light text-white mb-4 leading-tight">
              {car.title}
            </h1>
            
            <p className="text-3xl font-medium text-[#c4a484] mb-8">
              Ksh {Number(car.price).toLocaleString()}
            </p>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              <div className="bg-[#1e1e24] p-4 rounded-xl border border-white/5 flex items-center gap-4">
                <div className="p-2 bg-[#2a2a30] rounded-lg text-[#c4a484]"><Calendar size={20} /></div>
                <div><p className="text-xs text-zinc-500 uppercase tracking-wider">Year</p><p className="font-medium text-white">{car.year}</p></div>
              </div>
              <div className="bg-[#1e1e24] p-4 rounded-xl border border-white/5 flex items-center gap-4">
                <div className="p-2 bg-[#2a2a30] rounded-lg text-[#c4a484]"><Gauge size={20} /></div>
                <div><p className="text-xs text-zinc-500 uppercase tracking-wider">Mileage</p><p className="font-medium text-white">{car.mileage || 'N/A'}</p></div>
              </div>
              <div className="bg-[#1e1e24] p-4 rounded-xl border border-white/5 flex items-center gap-4">
                <div className="p-2 bg-[#2a2a30] rounded-lg text-[#c4a484]"><Settings size={20} /></div>
                <div><p className="text-xs text-zinc-500 uppercase tracking-wider">Transmission</p><p className="font-medium text-white">{car.transmission || 'Automatic'}</p></div>
              </div>
              <div className="bg-[#1e1e24] p-4 rounded-xl border border-white/5 flex items-center gap-4">
                <div className="p-2 bg-[#2a2a30] rounded-lg text-[#c4a484]"><Fuel size={20} /></div>
                <div><p className="text-xs text-zinc-500 uppercase tracking-wider">Fuel</p><p className="font-medium text-white">{car.fuel || 'Petrol'}</p></div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-10">
              <h3 className="text-lg font-medium text-white mb-4 border-b border-white/5 pb-2">Vehicle Overview</h3>
              <p className="text-zinc-400 leading-relaxed">
                 This {car.year} {car.title} is currently {car.status === 'sold' ? 'SOLD' : 'available'} at Tajiri Motors. 
                 It is a {car.condition} vehicle with a {car.transmission} transmission.
              </p>
            </div>

            {/* Contact Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href={`https://wa.me/254${phoneNumber.substring(1)}?text=I am interested in the ${car.title} (Price: Ksh ${Number(car.price).toLocaleString()})`}
                target="_blank"
                className="flex-1 bg-[#25D366] hover:bg-[#1fb354] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-green-900/20"
              >
                <MessageCircle size={20} /> WhatsApp
              </a>
              <a 
                href={`tel:${phoneNumber}`}
                className="flex-1 bg-[#c4a484] hover:bg-[#a88b6a] text-black py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#c4a484]/20"
              >
                <Phone size={20} /> Call Now
              </a>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}