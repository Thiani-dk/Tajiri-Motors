'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, ArrowRight, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin }),
      });

      const data = await res.json();

      if (data.success) {
        router.push('/admin/inventory'); // Redirect to dashboard
        router.refresh(); // Refresh to ensure middleware recognizes the new cookie
      } else {
        setError('Incorrect Access PIN');
      }
    } catch (err) {
      setError('Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="bg-blue-600/20 p-4 rounded-full">
            <Lock className="text-blue-500 w-8 h-8" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-white text-center mb-2">Admin Access</h1>
        <p className="text-slate-400 text-center mb-8">Enter your security PIN to continue.</p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 text-center text-2xl tracking-[0.5em] text-white p-4 rounded-xl focus:border-blue-500 outline-none transition-all placeholder:tracking-normal"
              placeholder="••••"
              maxLength={8}
              autoFocus
            />
          </div>

          {error && <p className="text-red-400 text-sm text-center bg-red-400/10 p-2 rounded-lg">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all flex justify-center items-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" /> : <>Access Dashboard <ArrowRight size={18} /></>}
          </button>
        </form>
      </div>
    </div>
  );
}