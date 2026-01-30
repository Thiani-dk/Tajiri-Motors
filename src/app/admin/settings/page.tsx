'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Save, Loader2, User, Building, Phone, Lock } from 'lucide-react';

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  
  const [settings, setSettings] = useState({
    contact_phone: '',
    contact_email: '',
    about_us_title: '',
    about_us_content: '',
    ceo_name: '',
    ceo_bio: '',
    ceo_quote: '',
    admin_pin: '' 
  });

  useEffect(() => {
    const fetchSettings = async () => {
      const { data } = await supabase.from('site_settings').select('*');
      if (data) {
        const formattedSettings: any = {};
        data.forEach((item: any) => {
          formattedSettings[item.key] = item.value;
        });
        setSettings(prev => ({ ...prev, ...formattedSettings }));
      }
      setFetching(false);
    };
    fetchSettings();
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const updates = Object.entries(settings).map(([key, value]) => ({
        key,
        value
      }));

      const { error } = await supabase
        .from('site_settings')
        .upsert(updates);

      if (error) throw error;
      alert('Settings updated successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Failed to save settings.');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className="min-h-screen bg-[#141416] flex items-center justify-center text-[#b48e55]">Loading settings...</div>;

  return (
    <div className="min-h-screen bg-[#141416] text-white p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-6">
          <h1 className="text-3xl font-serif">Site Settings</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* SECTION 1: CONTACT INFO */}
          <div className="bg-[#1e1e24] border border-white/10 rounded-2xl p-8 shadow-xl">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-[#b48e55]">
              <Phone size={20} /> Contact Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Phone Number</label>
                <input name="contact_phone" value={settings.contact_phone} onChange={handleChange} className="w-full bg-[#141416] border border-zinc-700 rounded-xl p-4 focus:border-[#b48e55] outline-none text-white placeholder:text-zinc-700 transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Email Address</label>
                <input name="contact_email" value={settings.contact_email} onChange={handleChange} className="w-full bg-[#141416] border border-zinc-700 rounded-xl p-4 focus:border-[#b48e55] outline-none text-white placeholder:text-zinc-700 transition-colors" />
              </div>
            </div>
          </div>

          {/* SECTION 2: COMPANY PROFILE */}
          <div className="bg-[#1e1e24] border border-white/10 rounded-2xl p-8 shadow-xl">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-[#b48e55]">
              <Building size={20} /> Company Profile
            </h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Headline</label>
                <input name="about_us_title" value={settings.about_us_title} onChange={handleChange} className="w-full bg-[#141416] border border-zinc-700 rounded-xl p-4 focus:border-[#b48e55] outline-none text-white transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Main Description</label>
                <textarea name="about_us_content" value={settings.about_us_content} onChange={handleChange} rows={5} className="w-full bg-[#141416] border border-zinc-700 rounded-xl p-4 focus:border-[#b48e55] outline-none text-white transition-colors" />
              </div>
            </div>
          </div>

          {/* SECTION 3: CEO PROFILE */}
          <div className="bg-[#1e1e24] border border-white/10 rounded-2xl p-8 shadow-xl">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-[#b48e55]">
              <User size={20} /> CEO Profile (Brian Bolo)
            </h2>
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">CEO Name</label>
                <input name="ceo_name" value={settings.ceo_name} onChange={handleChange} className="w-full bg-[#141416] border border-zinc-700 rounded-xl p-4 focus:border-[#b48e55] outline-none text-white transition-colors" />
              </div>
               <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">CEO Quote</label>
                <input name="ceo_quote" value={settings.ceo_quote} onChange={handleChange} className="w-full bg-[#141416] border border-zinc-700 rounded-xl p-4 focus:border-[#b48e55] outline-none text-white transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">CEO Bio</label>
                <textarea name="ceo_bio" value={settings.ceo_bio} onChange={handleChange} rows={4} className="w-full bg-[#141416] border border-zinc-700 rounded-xl p-4 focus:border-[#b48e55] outline-none text-white transition-colors" />
              </div>
            </div>
          </div>

          {/* SECTION 4: SECURITY */}
          <div className="bg-red-900/10 border border-red-500/20 rounded-2xl p-8 shadow-xl">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-red-400">
              <Lock size={20} /> Security Settings
            </h2>
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Admin Access PIN</label>
              <input 
                name="admin_pin" 
                value={settings.admin_pin} 
                onChange={handleChange} 
                type="text"
                placeholder="e.g. 4321"
                className="w-full bg-[#141416] border border-zinc-700 rounded-xl p-4 focus:border-red-500 outline-none font-mono text-xl tracking-widest text-white transition-colors" 
              />
              <p className="text-xs text-zinc-500 mt-2">Changing this will require you to login again next time.</p>
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-[#b48e55] hover:bg-[#997641] text-black font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(180,142,85,0.2)] transition-all flex justify-center items-center gap-2">
            {loading ? <Loader2 className="animate-spin" /> : <Save size={20} />}
            Save All Changes
          </button>

        </form>
      </div>
    </div>
  );
}