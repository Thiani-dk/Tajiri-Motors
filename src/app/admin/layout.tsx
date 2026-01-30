'use client';
import Link from 'next/link';
import { LayoutDashboard, Car, Settings, LogOut } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-900 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-950 border-r border-slate-800 hidden md:flex flex-col">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
            Tajiree Admin
          </h2>
        </div>
        
        <nav className="flex-1 px-4 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-blue-600/10 hover:text-blue-400 rounded-xl transition-all">
            <LayoutDashboard size={20} />
            Dashboard
          </Link>
          <Link href="/admin/inventory" className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-blue-600/10 hover:text-blue-400 rounded-xl transition-all">
            <Car size={20} />
            Inventory & Upload
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-blue-600/10 hover:text-blue-400 rounded-xl transition-all">
            <Settings size={20} />
            Site Settings
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button className="flex items-center gap-3 px-4 py-3 w-full text-left text-red-400 hover:bg-red-500/10 rounded-xl transition-all">
            <LogOut size={20} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}