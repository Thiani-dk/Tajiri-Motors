'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient'; 
import { Upload, CheckCircle, Loader2, Car, Plus, Star } from 'lucide-react';

export default function AdminPage() {
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState('');

  // Form States
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [mileage, setMileage] = useState('');
  const [fuel, setFuel] = useState('Petrol');
  const [transmission, setTransmission] = useState('Automatic');
  const [year, setYear] = useState('');
  const [bodyType, setBodyType] = useState('SUV');
  const [condition, setCondition] = useState('Foreign Used');
  const [isSlider, setIsSlider] = useState(false); 
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) {
      alert('Please select an image!');
      return;
    }

    setUploading(true);
    setStatus('Step 1/3: Uploading image...');

    try {
      // 1. Upload Image
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const { data: imageData, error: imageError } = await supabase.storage
        .from('car-images')
        .upload(fileName, imageFile);

      if (imageError) throw imageError;

      const { data: { publicUrl } } = supabase.storage
        .from('car-images')
        .getPublicUrl(fileName);

      setStatus('Step 2/3: Saving details...');

      // 2. Save Data
      const { error: dbError } = await supabase
        .from('cars')
        .insert([{
            title,
            price: price.replace(/,/g, ''), // Ensure number format
            mileage,
            fuel,
            transmission,
            year,
            body_type: bodyType,
            condition,          
            image_url: publicUrl,
            images: [publicUrl], // Store in array for gallery support
            is_featured: isSlider, // Matches standard naming
          },
        ]);

      if (dbError) throw dbError;

      setStatus('Success! Car added to inventory.');
      
      // Reset Form
      setTitle(''); setPrice(''); setMileage(''); setYear('');
      setImageFile(null); setIsSlider(false);
      
    } catch (error: any) {
      console.error('Error:', error);
      setStatus(`Error: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#141416] text-white p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-6">
          <div>
            <h1 className="text-3xl font-serif text-white flex items-center gap-3">
              <span className="bg-[#b48e55]/10 p-2 rounded-lg text-[#b48e55]">
                <Car size={32} />
              </span>
              Dealer Dashboard
            </h1>
            <p className="text-zinc-400 mt-2">Manage your inventory and website content.</p>
          </div>
        </div>

        {/* Upload Form */}
        <div className="bg-[#1e1e24] p-8 rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden">
          {/* Subtle Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#b48e55]/5 rounded-full blur-3xl pointer-events-none" />

          <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-[#b48e55]">
            <Plus size={20} /> Add New Vehicle
          </h2>

          <form onSubmit={handleUpload} className="space-y-6 relative z-10">
            
            {/* Image Upload Area */}
            <div className="border-2 border-dashed border-zinc-700 rounded-xl p-8 text-center hover:border-[#b48e55] hover:bg-[#b48e55]/5 transition-all cursor-pointer relative group">
               <input 
                type="file" 
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="flex flex-col items-center group-hover:scale-105 transition-transform">
                <div className="w-16 h-16 bg-[#141416] rounded-full flex items-center justify-center mb-4 text-zinc-500 group-hover:text-[#b48e55] transition-colors border border-zinc-700 group-hover:border-[#b48e55]">
                  <Upload size={28} />
                </div>
                <p className="text-lg font-medium text-white mb-1">
                  {imageFile ? <span className="text-[#b48e55]">{imageFile.name}</span> : 'Click to Upload Car Image'}
                </p>
                <p className="text-sm text-zinc-500">
                  {imageFile ? 'Click to change' : 'JPG, PNG or WEBP'}
                </p>
              </div>
            </div>

            {/* Car Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="col-span-1 md:col-span-2">
                <label className="block text-xs font-bold text-[#b48e55] uppercase tracking-widest mb-2">Car Title</label>
                <input 
                  value={title} 
                  onChange={e => setTitle(e.target.value)} 
                  required 
                  className="w-full bg-[#141416] border border-zinc-700 text-white rounded-xl p-4 focus:border-[#b48e55] outline-none transition-colors placeholder:text-zinc-700" 
                  placeholder="e.g. 2018 Toyota Hilux Vigo" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#b48e55] uppercase tracking-widest mb-2">Price (Ksh)</label>
                <input 
                  value={price} 
                  onChange={e => setPrice(e.target.value)} 
                  required 
                  className="w-full bg-[#141416] border border-zinc-700 text-white rounded-xl p-4 focus:border-[#b48e55] outline-none transition-colors placeholder:text-zinc-700" 
                  placeholder="e.g. 4,500,000" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#b48e55] uppercase tracking-widest mb-2">Year</label>
                <input 
                  value={year} 
                  onChange={e => setYear(e.target.value)} 
                  required 
                  className="w-full bg-[#141416] border border-zinc-700 text-white rounded-xl p-4 focus:border-[#b48e55] outline-none transition-colors placeholder:text-zinc-700" 
                  placeholder="e.g. 2019" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#b48e55] uppercase tracking-widest mb-2">Mileage</label>
                <input 
                  value={mileage} 
                  onChange={e => setMileage(e.target.value)} 
                  required 
                  className="w-full bg-[#141416] border border-zinc-700 text-white rounded-xl p-4 focus:border-[#b48e55] outline-none transition-colors placeholder:text-zinc-700" 
                  placeholder="e.g. 96,000 KM" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#b48e55] uppercase tracking-widest mb-2">Fuel Type</label>
                <select value={fuel} onChange={e => setFuel(e.target.value)} className="w-full bg-[#141416] border border-zinc-700 text-white rounded-xl p-4 outline-none cursor-pointer focus:border-[#b48e55]">
                  <option>Petrol</option>
                  <option>Diesel</option>
                  <option>Hybrid</option>
                  <option>Electric</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#b48e55] uppercase tracking-widest mb-2">Transmission</label>
                <select value={transmission} onChange={e => setTransmission(e.target.value)} className="w-full bg-[#141416] border border-zinc-700 text-white rounded-xl p-4 outline-none cursor-pointer focus:border-[#b48e55]">
                  <option>Automatic</option>
                  <option>Manual</option>
                  <option>CVT</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#b48e55] uppercase tracking-widest mb-2">Body Type</label>
                <select value={bodyType} onChange={e => setBodyType(e.target.value)} className="w-full bg-[#141416] border border-zinc-700 text-white rounded-xl p-4 outline-none cursor-pointer focus:border-[#b48e55]">
                  <option>SUV</option>
                  <option>Pickup</option>
                  <option>Sedan</option>
                  <option>Van</option>
                  <option>Hatchback</option>
                </select>
              </div>

               <div>
                <label className="block text-xs font-bold text-[#b48e55] uppercase tracking-widest mb-2">Condition</label>
                <select value={condition} onChange={e => setCondition(e.target.value)} className="w-full bg-[#141416] border border-zinc-700 text-white rounded-xl p-4 outline-none cursor-pointer focus:border-[#b48e55]">
                  <option>Foreign Used</option>
                  <option>Locally Used</option>
                  <option>Brand New</option>
                </select>
              </div>
            </div>

            {/* FEATURED TOGGLE */}
            <div 
                onClick={() => setIsSlider(!isSlider)}
                className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${isSlider ? 'bg-[#b48e55]/10 border-[#b48e55]' : 'bg-[#141416] border-zinc-700'}`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${isSlider ? 'text-[#b48e55]' : 'text-zinc-600'}`}>
                  <Star size={24} fill={isSlider ? "currentColor" : "none"} />
                </div>
                <div>
                  <h3 className={`font-semibold ${isSlider ? 'text-[#b48e55]' : 'text-zinc-400'}`}>Feature on Homepage Slider?</h3>
                  <p className="text-xs text-zinc-500">Show this vehicle in the main hero slideshow.</p>
                </div>
              </div>
              
              <div className={`w-12 h-6 rounded-full relative transition-colors ${isSlider ? 'bg-[#b48e55]' : 'bg-zinc-700'}`}>
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-black transition-all ${isSlider ? 'left-7' : 'left-1'}`} />
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={uploading}
              className="w-full py-4 mt-4 bg-[#b48e55] hover:bg-[#997641] disabled:bg-zinc-700 text-black font-bold rounded-xl text-lg shadow-[0_0_20px_rgba(180,142,85,0.2)] transition-all flex justify-center items-center gap-2"
            >
              {uploading ? (
                <> <Loader2 className="animate-spin" /> Uploading... </>
              ) : (
                <> <CheckCircle size={20} /> Publish Inventory </>
              )}
            </button>

            {status && (
              <div className={`p-4 rounded-xl text-center font-medium ${status.includes('Error') ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-green-500/10 text-[#b48e55] border border-[#b48e55]/20'}`}>
                {status}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}