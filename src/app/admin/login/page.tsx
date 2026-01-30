'use client';

import { useState } from 'react';
import { Lock, Loader2 } from 'lucide-react'; // Added Loader icon

export default function AdminLogin() {
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // SIMULATED AUTH DELAY FOR REALISM
    await new Promise(resolve => setTimeout(resolve, 800));

    if (pin === '1234') {
      // 1. Set the cookie with proper attributes (expires in 1 day)
      document.cookie = "admin-token=secret; path=/; max-age=86400; SameSite=Lax";
      
      // 2. FORCE REFRESH to /admin
      // (Using window.location instead of router.push ensures the middleware sees the new cookie)
      window.location.href = "/admin";
    } else {
      setError('Access Denied: Incorrect PIN');
      setLoading(false);
      setPin(''); // Clear input on error
    }
  };

  return (
    <div className="min-h-screen bg-[#141416] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#1e1e24] p-8 rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden">
        
        {/* Luxury Gold Glow Effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-[#b48e55] shadow-[0_0_20px_rgba(180,142,85,0.6)]" />

        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-[#b48e55]/10 rounded-full flex items-center justify-center border border-[#b48e55]/20">
            <Lock className="text-[#b48e55]" size={32} />
          </div>
        </div>
        
        <h1 className="text-3xl font-serif text-center text-white mb-2">Tajiri Admin</h1>
        <p className="text-center text-zinc-400 mb-8">Restricted Access Portal</p>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-[#b48e55] uppercase tracking-widest mb-2 text-center">
              Security PIN
            </label>
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-full bg-[#141416] border border-zinc-700 text-white text-center text-3xl tracking-[0.5em] rounded-xl px-4 py-5 focus:outline-none focus:border-[#b48e55] transition-all placeholder:text-zinc-800"
              placeholder="••••"
              maxLength={4}
              autoFocus
            />
          </div>

          {error && (
            <div className="text-red-400 text-sm text-center bg-red-400/10 py-2 rounded-lg border border-red-400/20 animate-pulse">
              {error}
            </div>
          )}
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#b48e55] hover:bg-[#997641] disabled:bg-zinc-700 disabled:cursor-not-allowed text-black font-bold py-4 rounded-xl transition-all hover:scale-[1.02] shadow-[0_0_20px_rgba(180,142,85,0.2)] flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Verifying...
              </>
            ) : (
              "Access Dashboard"
            )}
          </button>
        </form>
        
        <div className="mt-8 text-center">
          <a href="/" className="text-xs uppercase tracking-widest text-zinc-600 hover:text-[#b48e55] transition-colors">
            Return to Website
          </a>
        </div>
      </div>
    </div>
  );
}