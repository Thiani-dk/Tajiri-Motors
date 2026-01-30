'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';

export default function AdminLogin() {
  const [pin, setPin] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === '1234') { // Replace with real auth later
      document.cookie = "admin-token=secret; path=/";
      router.push('/admin');
    } else {
      alert('Invalid PIN');
    }
  };

  return (
    <div className="min-h-screen bg-obsidian flex items-center justify-center p-4 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#2a2a2e] to-[#141416]">
      <div className="max-w-md w-full bg-[#1e1e24] p-8 rounded-2xl border border-white/10 shadow-2xl">
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center">
            <Lock className="text-gold" size={32} />
          </div>
        </div>
        
        <h1 className="text-3xl font-serif text-center text-white mb-2">Admin Access</h1>
        <p className="text-center text-zinc-400 mb-8">Enter your secure PIN to continue</p>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">Security PIN</label>
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-full bg-black/50 border border-zinc-700 text-white text-center text-2xl tracking-[0.5em] rounded-xl px-4 py-4 focus:outline-none focus:border-gold transition-colors"
              placeholder="••••"
              maxLength={4}
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-gold hover:bg-gold-hover text-black font-bold py-4 rounded-xl transition-all hover:scale-[1.02] shadow-[0_0_20px_rgba(180,142,85,0.2)]"
          >
            Access Dashboard
          </button>
        </form>
        
        <div className="mt-8 text-center">
          <a href="/" className="text-sm text-zinc-500 hover:text-white transition-colors">
            &larr; Return to Website
          </a>
        </div>
      </div>
    </div>
  );
}