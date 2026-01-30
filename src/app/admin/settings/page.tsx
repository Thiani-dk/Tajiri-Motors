'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Save, Loader2, User, Building, Phone, Lock } from 'lucide-react';

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  
  // This state holds all the editable text
  const [settings, setSettings] = useState({
    contact_phone: '',
    contact_email: '',
    about_us_title: '',
    about_us_content: '',
    ceo_name: '',
    ceo_bio: '',
    ceo_quote: '',
    admin_pin: '' // Added admin_pin here
  });

  // 1. Fetch current settings when page loads
  useEffect(() => {
    const fetchSettings = async () => {
      const { data, error } = await supabase.from('site_settings').select('*');
      
      if (data) {
        // Convert the database array [{key: 'contact_phone', value: '...'}] 
        // into a simple object { contact_phone: '...' }
        const formattedSettings: any = {};
        data.forEach((item: any) => {
          formattedSettings[item.key] = item.value;
        });
        
        // Merge with defaults to prevent errors if keys are missing
        setSettings(prev => ({ ...prev, ...formattedSettings }));
      }
      setFetching(false);
    };

    fetchSettings();
  }, []);

  // 2. Handle text changes
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  // 3. Save changes back to Supabase
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      // We have to save each field individually as a Key/Value pair
      const updates = Object.entries(settings).map(([key, value]) => ({
        key,
        value
      }));

      const { error } = await supabase
        .from('site_settings')
        .upsert(updates);

      if (error) throw error;
      alert('Website settings updated successfully!');

    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Failed to save settings.');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className="p-10 text-white">Loading settings...</div>;

  return (
    <div className="max-w-4xl mx-auto text-white pb-20">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Site Settings</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* SECTION 1: CONTACT INFO */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-blue-400">
            <Phone size={20} /> Contact Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm text-slate-400">Phone Number</label>
              <input name="contact_phone" value={settings.contact_phone} onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 focus:border-blue-500 outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-slate-400">Email Address</label>
              <input name="contact_email" value={settings.contact_email} onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 focus:border-blue-500 outline-none" />
            </div>
          </div>
        </div>

        {/* SECTION 2: COMPANY PROFILE */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-emerald-400">
            <Building size={20} /> Company Profile (About Us)
          </h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-slate-400">Headline</label>
              <input name="about_us_title" value={settings.about_us_title} onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 focus:border-blue-500 outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-slate-400">Main Description</label>
              <textarea name="about_us_content" value={settings.about_us_content} onChange={handleChange} rows={5} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 focus:border-blue-500 outline-none" />
            </div>
          </div>
        </div>

        {/* SECTION 3: CEO PROFILE */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-purple-400">
            <User size={20} /> CEO Profile (Brian Bolo)
          </h2>
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <label className="text-sm text-slate-400">CEO Name</label>
              <input name="ceo_name" value={settings.ceo_name} onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 focus:border-blue-500 outline-none" />
            </div>
             <div className="space-y-2">
              <label className="text-sm text-slate-400">CEO Quote</label>
              <input name="ceo_quote" value={settings.ceo_quote} onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 focus:border-blue-500 outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-slate-400">CEO Bio</label>
              <textarea name="ceo_bio" value={settings.ceo_bio} onChange={handleChange} rows={4} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 focus:border-blue-500 outline-none" />
            </div>
          </div>
        </div>

        {/* SECTION 4: SECURITY */}
        <div className="bg-red-900/10 border border-red-500/20 rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-red-400">
            <Lock size={20} /> Security Settings
          </h2>
          <div className="space-y-2">
            <label className="text-sm text-slate-400">Admin Access PIN</label>
            <input 
              name="admin_pin" 
              value={settings.admin_pin} 
              onChange={handleChange} 
              type="text"
              placeholder="e.g. 4321"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 focus:border-red-500 outline-none font-mono" 
            />
            <p className="text-xs text-slate-500">Changing this will require you to login again next time.</p>
          </div>
        </div>

        <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all flex justify-center items-center gap-2">
          {loading ? <Loader2 className="animate-spin" /> : <Save size={20} />}
          Save Changes
        </button>

      </form>
    </div>
  );
}