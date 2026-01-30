'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Trash2, Save, Eye, CheckCircle, AlertCircle } from 'lucide-react';

export default function EditCarPage() {
  const params = useParams();
  const router = useRouter();
  // Safely handle params.id whether it's a string or array
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [car, setCar] = useState<any>(null);

  useEffect(() => {
    if (!id) return;
    const fetchCar = async () => {
      const { data, error } = await supabase.from('cars').select('*').eq('id', id).single();
      if (error) console.error(error);
      else setCar(data);
      setLoading(false);
    };
    fetchCar();
  }, [id]);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setCar((prev: any) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleUpdate = async () => {
    setSaving(true);
    const { error } = await supabase.from('cars').update({
      title: car.title,
      price: car.price,
      year: car.year,
      mileage: car.mileage,
      status: car.status,
      is_slider: car.is_slider,
      condition: car.condition,
    }).eq('id', id);

    setSaving(false);
    if (error) alert('Error: ' + error.message);
    else {
      // Optional: Show a toast or just redirect
      alert('Car updated successfully');
      router.push('/admin/inventory');
    }
  };

  const handleDelete = async () => {
    if (!confirm('Permanently delete this car? This action cannot be undone.')) return;
    const { error } = await supabase.from('cars').delete().eq('id', id);
    if (!error) router.push('/admin/inventory');
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-[#141416] text-[#c4a484]">Loading Details...</div>;
  if (!car) return <div className="min-h-screen flex items-center justify-center bg-[#141416] text-white">Car not found</div>;

  return (
    <div className="min-h-screen bg-[#141416] text-[#e6e6e6] p-6 md:p-12 pb-32">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <Link href="/admin/inventory" className="flex items-center text-zinc-500 hover:text-[#c4a484] transition-colors">
            <ArrowLeft size={20} className="mr-2" /> Back to Inventory
          </Link>
          
          <div className="flex gap-3 w-full md:w-auto">
            <Link 
              href={`/inventory/${id}`} 
              target="_blank" 
              className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-[#1e1e24] border border-white/10 text-white px-6 py-3 rounded-xl hover:bg-white/5 transition-all"
            >
                <Eye size={18} /> View Live
            </Link>
            <button 
              onClick={handleDelete} 
              className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-red-900/10 text-red-400 border border-red-900/30 px-6 py-3 rounded-xl hover:bg-red-900/20 transition-all"
            >
                <Trash2 size={18} /> Delete
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Image & Toggle Status */}
          <div className="space-y-6">
            <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-white/10 bg-black shadow-2xl">
               {car.image_url ? (
                 <Image src={car.image_url} alt="Preview" fill className="object-cover" />
               ) : (
                 <div className="w-full h-full flex items-center justify-center text-zinc-600">No Image</div>
               )}
               {/* Status Badge Overlay */}
               <div className="absolute top-4 left-4">
                  {car.status === 'sold' ? (
                    <span className="bg-red-900/90 text-red-100 text-xs font-bold px-3 py-1 rounded-full border border-red-500/30">SOLD</span>
                  ) : (
                    <span className="bg-green-900/90 text-green-100 text-xs font-bold px-3 py-1 rounded-full border border-green-500/30">AVAILABLE</span>
                  )}
               </div>
            </div>
            
            <div className="bg-[#1e1e24] p-6 rounded-2xl border border-white/5 space-y-6">
              <h3 className="text-[#c4a484] font-bold text-xs tracking-widest uppercase mb-4">Visibility Settings</h3>
              
              <label className="flex items-center justify-between cursor-pointer group p-3 rounded-lg hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${car.status === 'sold' ? 'bg-red-500/20 text-red-400' : 'bg-zinc-800 text-zinc-500'}`}>
                        <AlertCircle size={18} />
                    </div>
                    <div>
                        <span className="block text-sm font-medium text-white">Mark as Sold</span>
                        <span className="block text-xs text-zinc-500">Hide price on site</span>
                    </div>
                </div>
                <input type="checkbox" name="status" checked={car.status === 'sold'} 
                  onChange={(e) => setCar({...car, status: e.target.checked ? 'sold' : 'available'})}
                  className="w-5 h-5 accent-red-500 bg-[#141416] border-white/20 rounded" 
                />
              </label>

              <div className="h-px bg-white/5"></div>

              <label className="flex items-center justify-between cursor-pointer group p-3 rounded-lg hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${car.is_slider ? 'bg-[#c4a484]/20 text-[#c4a484]' : 'bg-zinc-800 text-zinc-500'}`}>
                        <CheckCircle size={18} />
                    </div>
                    <div>
                        <span className="block text-sm font-medium text-white">Feature on Slider</span>
                        <span className="block text-xs text-zinc-500">Show on homepage hero</span>
                    </div>
                </div>
                <input type="checkbox" name="is_slider" checked={car.is_slider || false} onChange={handleChange} 
                  className="w-5 h-5 accent-[#c4a484] bg-[#141416] border-white/20 rounded" 
                />
              </label>
            </div>
          </div>

          {/* Right: Edit Form */}
          <div className="lg:col-span-2 bg-[#1e1e24] p-8 rounded-2xl border border-white/5">
            <h2 className="text-2xl font-light text-white mb-8 border-b border-white/5 pb-4">Vehicle Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-1 md:col-span-2">
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Vehicle Title</label>
                  <input name="title" value={car.title} onChange={handleChange} 
                    className="w-full bg-[#141416] text-white border border-white/10 p-4 rounded-xl focus:border-[#c4a484] focus:ring-1 focus:ring-[#c4a484] outline-none transition-all placeholder:text-zinc-700" 
                  />
              </div>

              <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Price (Ksh)</label>
                  <input type="number" name="price" value={car.price} onChange={handleChange} 
                    className="w-full bg-[#141416] text-[#c4a484] font-medium border border-white/10 p-4 rounded-xl focus:border-[#c4a484] outline-none transition-all" 
                  />
              </div>

              <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Year of Manuf.</label>
                  <input type="number" name="year" value={car.year} onChange={handleChange} 
                    className="w-full bg-[#141416] text-white border border-white/10 p-4 rounded-xl focus:border-[#c4a484] outline-none transition-all" 
                  />
              </div>

              <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Condition</label>
                  <div className="relative">
                    <select name="condition" value={car.condition} onChange={handleChange} 
                        className="w-full bg-[#141416] text-white border border-white/10 p-4 rounded-xl focus:border-[#c4a484] outline-none appearance-none transition-all"
                    >
                        <option>Foreign Used</option>
                        <option>Locally Used</option>
                        <option>Brand New</option>
                    </select>
                    {/* Custom Arrow */}
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">▼</div>
                  </div>
              </div>

              <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Mileage (km)</label>
                  <input name="mileage" value={car.mileage} onChange={handleChange} 
                    className="w-full bg-[#141416] text-white border border-white/10 p-4 rounded-xl focus:border-[#c4a484] outline-none transition-all" 
                  />
              </div>
            </div>

            <button onClick={handleUpdate} disabled={saving} 
                className="mt-10 w-full bg-[#c4a484] hover:bg-[#b09375] text-black font-bold text-lg py-4 rounded-xl flex items-center justify-center gap-3 transition-all shadow-lg shadow-[#c4a484]/20 active:scale-[0.99]"
            >
              {saving ? 'Saving...' : <><Save size={20} /> Update Vehicle Details</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}