'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Trash2, Save, Eye } from 'lucide-react';

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
      alert('Car updated successfully');
      router.push('/admin/inventory');
    }
  };

  const handleDelete = async () => {
    if (!confirm('Permanently delete this car?')) return;
    const { error } = await supabase.from('cars').delete().eq('id', id);
    if (!error) router.push('/admin/inventory');
  };

  if (loading) return <div className="text-center p-20 text-[#c4a484]">Loading...</div>;
  if (!car) return <div className="text-center p-20">Car not found</div>;

  return (
    <div className="min-h-screen p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <Link href="/admin/inventory" className="flex items-center text-zinc-400 hover:text-[#c4a484] transition-colors">
          <ArrowLeft size={18} className="mr-2" /> Back to Inventory
        </Link>
        <div className="flex gap-3">
            <Link href={`/inventory/${id}`} target="_blank" className="flex items-center gap-2 bg-zinc-800 px-4 py-2 rounded-lg hover:bg-zinc-700 transition-all">
                <Eye size={18} /> View Live
            </Link>
            <button onClick={handleDelete} className="flex items-center gap-2 bg-red-900/20 text-red-400 border border-red-900/30 px-4 py-2 rounded-lg hover:bg-red-900/40 transition-all">
                <Trash2 size={18} /> Delete
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Image & Status */}
        <div className="space-y-6">
          <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden border border-white/10 bg-black">
             {car.image_url && <Image src={car.image_url} alt="Preview" fill className="object-cover" />}
          </div>
          
          <div className="bg-[#232323] p-5 rounded-xl border border-white/5 space-y-4">
            <h3 className="text-[#c4a484] font-medium uppercase text-xs tracking-wider">Visibility</h3>
            <label className="flex items-center justify-between cursor-pointer">
              <span>Mark as Sold</span>
              <input type="checkbox" name="status" checked={car.status === 'sold'} 
                onChange={(e) => setCar({...car, status: e.target.checked ? 'sold' : 'available'})}
                className="accent-[#c4a484] w-5 h-5" />
            </label>
            <div className="h-px bg-white/5"></div>
            <label className="flex items-center justify-between cursor-pointer">
              <span>Show on Slider</span>
              <input type="checkbox" name="is_slider" checked={car.is_slider || false} onChange={handleChange} 
                className="accent-[#c4a484] w-5 h-5" />
            </label>
          </div>
        </div>

        {/* Right: Edit Details */}
        <div className="lg:col-span-2 bg-[#232323] p-8 rounded-xl border border-white/5">
          <h2 className="text-2xl font-light text-white mb-6">Vehicle Details</h2>
          <div className="grid grid-cols-2 gap-6">
            <div className="col-span-2">
                <label className="block text-xs text-zinc-500 mb-1">Vehicle Title</label>
                <input name="title" value={car.title} onChange={handleChange} className="w-full bg-[#1c1c1c] border border-white/10 p-3 rounded-lg focus:border-[#c4a484] outline-none transition-colors" />
            </div>
            <div>
                <label className="block text-xs text-zinc-500 mb-1">Price (Ksh)</label>
                <input type="number" name="price" value={car.price} onChange={handleChange} className="w-full bg-[#1c1c1c] border border-white/10 p-3 rounded-lg focus:border-[#c4a484] outline-none transition-colors" />
            </div>
            <div>
                <label className="block text-xs text-zinc-500 mb-1">Year</label>
                <input type="number" name="year" value={car.year} onChange={handleChange} className="w-full bg-[#1c1c1c] border border-white/10 p-3 rounded-lg focus:border-[#c4a484] outline-none transition-colors" />
            </div>
            <div>
                <label className="block text-xs text-zinc-500 mb-1">Condition</label>
                <select name="condition" value={car.condition} onChange={handleChange} className="w-full bg-[#1c1c1c] border border-white/10 p-3 rounded-lg focus:border-[#c4a484] outline-none transition-colors">
                    <option>Foreign Used</option>
                    <option>Locally Used</option>
                    <option>Brand New</option>
                </select>
            </div>
            <div>
                <label className="block text-xs text-zinc-500 mb-1">Mileage</label>
                <input name="mileage" value={car.mileage} onChange={handleChange} className="w-full bg-[#1c1c1c] border border-white/10 p-3 rounded-lg focus:border-[#c4a484] outline-none transition-colors" />
            </div>
          </div>

          <button onClick={handleUpdate} disabled={saving} className="mt-8 w-full bg-[#c4a484] hover:bg-[#a88b6a] text-black font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all">
            {saving ? 'Saving...' : <><Save size={20} /> Update Vehicle</>}
          </button>
        </div>
      </div>
    </div>
  );
}