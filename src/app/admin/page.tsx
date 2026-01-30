'use client';

import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Upload, CheckCircle, Loader2, Car, Plus } from 'lucide-react';

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
  const [bodyType, setBodyType] = useState('SUV'); // New field for Pickup/Van/SUV
  const [condition, setCondition] = useState('Foreign Used'); // New field for Local/Import
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
      // 1. Upload Image to Supabase Storage
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const { data: imageData, error: imageError } = await supabase.storage
        .from('car-images')
        .upload(fileName, imageFile);

      if (imageError) throw imageError;

      // 2. Get the Public URL
      const { data: { publicUrl } } = supabase.storage
        .from('car-images')
        .getPublicUrl(fileName);

      setStatus('Step 2/3: Saving car details...');

      // 3. Save Data to Database
      const { error: dbError } = await supabase
        .from('cars')
        .insert([
          {
            title,
            price,
            mileage,
            fuel,
            transmission,
            year,
            image_url: publicUrl,
            // We will add the description/body type logic in the next DB update
          },
        ]);

      if (dbError) throw dbError;

      setStatus('Success! Car added to inventory.');
      // Reset Form
      setTitle('');
      setPrice('');
      setMileage('');
      setImageFile(null);
      
    } catch (error: any) {
      console.error('Error:', error);
      setStatus(`Error: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 md:p-12 pt-24">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Car className="text-blue-500" />
              Dealer Dashboard
            </h1>
            <p className="text-slate-400 mt-2">Manage your inventory and website content.</p>
          </div>
        </div>

        {/* Tabs - We will activate 'Site Settings' next */}
        <div className="flex gap-4 mb-8 border-b border-slate-800">
          <button className="px-4 py-2 text-blue-400 border-b-2 border-blue-400 font-medium">
            Add Inventory
          </button>
          <button className="px-4 py-2 text-slate-500 hover:text-slate-300 transition-colors cursor-not-allowed" title="Coming next step">
            Site Settings (Coming Next)
          </button>
        </div>

        {/* Upload Form */}
        <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-xl">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Plus size={20} className="text-blue-500" />
            Add New Vehicle
          </h2>

          <form onSubmit={handleUpload} className="space-y-6">
            
            {/* Image Upload Area */}
            <div className="border-2 border-dashed border-slate-700 rounded-xl p-8 text-center hover:border-blue-500 hover:bg-slate-800/50 transition-all cursor-pointer relative group">
               <input 
                type="file" 
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="flex flex-col items-center group-hover:scale-105 transition-transform">
                <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4 text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Upload size={28} />
                </div>
                <p className="text-lg font-medium text-white mb-1">
                  {imageFile ? imageFile.name : 'Click to Upload Car Image'}
                </p>
                <p className="text-sm text-slate-400">
                  {imageFile ? 'Click to change' : 'JPG, PNG or WEBP'}
                </p>
              </div>
            </div>

            {/* Car Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Title */}
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-slate-400 mb-2">Car Title</label>
                <input 
                  value={title} 
                  onChange={e => setTitle(e.target.value)} 
                  required 
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" 
                  placeholder="e.g. 2018 Toyota Hilux Vigo Single Cab" 
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Price (Ksh)</label>
                <input 
                  value={price} 
                  onChange={e => setPrice(e.target.value)} 
                  required 
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 focus:border-blue-500 outline-none" 
                  placeholder="e.g. 4,550,000" 
                />
              </div>

              {/* Year */}
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Year of Manufacture</label>
                <input 
                  value={year} 
                  onChange={e => setYear(e.target.value)} 
                  required 
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 focus:border-blue-500 outline-none" 
                  placeholder="e.g. 2019" 
                />
              </div>

              {/* Mileage */}
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Mileage</label>
                <input 
                  value={mileage} 
                  onChange={e => setMileage(e.target.value)} 
                  required 
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 focus:border-blue-500 outline-none" 
                  placeholder="e.g. 96,000 KM" 
                />
              </div>

              {/* Fuel */}
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Fuel Type</label>
                <select value={fuel} onChange={e => setFuel(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 outline-none cursor-pointer">
                  <option>Petrol</option>
                  <option>Diesel</option>
                  <option>Hybrid</option>
                  <option>Electric</option>
                </select>
              </div>

              {/* Transmission */}
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Transmission</label>
                <select value={transmission} onChange={e => setTransmission(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 outline-none cursor-pointer">
                  <option>Automatic</option>
                  <option>Manual</option>
                  <option>CVT</option>
                </select>
              </div>

              {/* Body Type (Visual Selector) */}
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Body Type</label>
                <select value={bodyType} onChange={e => setBodyType(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 outline-none cursor-pointer">
                  <option>SUV</option>
                  <option>Pickup</option>
                  <option>Sedan</option>
                  <option>Van</option>
                  <option>Hatchback</option>
                </select>
              </div>

            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={uploading}
              className="w-full py-4 mt-4 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold text-lg text-white shadow-lg shadow-blue-900/20 transition-all flex justify-center items-center gap-2 active:scale-95"
            >
              {uploading ? (
                <> <Loader2 className="animate-spin" /> Uploading Vehicle... </>
              ) : (
                <> <CheckCircle size={20} /> Publish to Website </>
              )}
            </button>

            {status && (
              <div className={`p-4 rounded-xl text-center font-medium ${status.includes('Error') ? 'bg-red-500/10 text-red-400' : 'bg-green-500/10 text-green-400'}`}>
                {status}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}