import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Phone, MessageCircle, Calendar, Gauge, Settings, Fuel, CheckCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';

// Fetch the car using the ID
async function getCar(id: string) {
  const { data } = await supabase.from('cars').select('*').eq('id', id).single();
  return data;
}

// Fetch contact phone (optional, defaults provided)
async function getPhone() {
  const { data } = await supabase.from('site_settings').select('value').eq('key', 'contact_phone').single();
  return data?.value || '0700000000';
}

export default async function CarDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const car = await getCar(id);
  const phoneNumber = await getPhone();
  
  if (!car) return <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">Car not found.</div>;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 pb-20">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8 pt-24">
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center text-slate-400 hover:text-white mb-6 transition-colors">
          <ArrowLeft size={18} className="mr-2" /> Back to Showroom
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* LEFT: Main Image */}
          <div className="space-y-4">
            <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden border border-slate-700 shadow-2xl bg-slate-900">
              {/* FIX: Use 'image_url' (singular) matching your DB */}
              {car.image_url ? (
                <Image src={car.image_url} alt={car.title} fill className="object-cover" priority />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-500">No Image Available</div>
              )}
            </div>
            
            {/* Note: If you add multiple images later, put thumbnails here */}
          </div>

          {/* RIGHT: Details */}
          <div>
            <div className="flex items-center gap-3 mb-4">
                <span className="inline-block bg-blue-900/30 text-blue-400 px-3 py-1 rounded-md text-sm font-semibold border border-blue-500/20">
                {car.condition || 'Foreign Used'}
                </span>
                {car.is_slider && (
                    <span className="inline-flex items-center gap-1 bg-yellow-900/30 text-yellow-400 px-3 py-1 rounded-md text-sm font-semibold border border-yellow-500/20">
                        <CheckCircle size={14} /> Featured
                    </span>
                )}
            </div>
            
            {/* FIX: Use 'title' instead of make/model */}
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 leading-tight">
              {car.title}
            </h1>
            
            <p className="text-3xl font-bold text-emerald-400 mb-8">
              Ksh {Number(car.price).toLocaleString()}
            </p>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex items-center gap-3">
                <Calendar className="text-slate-500" />
                <div><p className="text-xs text-slate-500">Year</p><p className="font-semibold">{car.year}</p></div>
              </div>
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex items-center gap-3">
                <Gauge className="text-slate-500" />
                <div><p className="text-xs text-slate-500">Mileage</p><p className="font-semibold">{car.mileage || 'N/A'}</p></div>
              </div>
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex items-center gap-3">
                <Settings className="text-slate-500" />
                <div><p className="text-xs text-slate-500">Transmission</p><p className="font-semibold">{car.transmission}</p></div>
              </div>
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex items-center gap-3">
                <Fuel className="text-slate-500" />
                {/* FIX: Use 'fuel' instead of 'fuel_type' */}
                <div><p className="text-xs text-slate-500">Fuel</p><p className="font-semibold">{car.fuel}</p></div>
              </div>
            </div>

            {/* Description (Static placeholder if you haven't added description column yet) */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-white mb-3">Vehicle Overview</h3>
              <p className="text-slate-400 leading-relaxed">
                 This {car.year} {car.title} is available now. It features a {car.transmission} transmission and runs on {car.fuel}. 
                 Condition: {car.condition}.
              </p>
            </div>

            {/* Contact Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href={`https://wa.me/254${phoneNumber.substring(1)}?text=I am interested in the ${car.title} (Price: ${car.price})`}
                target="_blank"
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
              >
                <MessageCircle size={20} /> WhatsApp Seller
              </a>
              <a 
                href={`tel:${phoneNumber}`}
                className="flex-1 bg-slate-800 hover:bg-slate-700 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all border border-slate-700"
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