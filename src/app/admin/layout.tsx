"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LayoutDashboard, Package, Settings, Menu, X, Globe } from "lucide-react"; // Added icons for better visuals

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", href: "/admin", icon: <LayoutDashboard size={20} /> },
    { name: "Inventory & Upload", href: "/admin/inventory", icon: <Package size={20} /> },
    { name: "Site Settings", href: "/admin/settings", icon: <Settings size={20} /> },
  ];

  return (
    // UPDATED: Main background to Obsidian (#141416)
    <div className="min-h-screen bg-[#141416] flex flex-col md:flex-row text-[#e6e6e6]">
      
      {/* Mobile Header */}
      <div className="md:hidden bg-[#1e1e24] p-4 flex justify-between items-center border-b border-white/5">
        <h1 className="text-xl font-light text-white tracking-wider">
          TAJIRI <span className="text-[#c4a484] font-bold">ADMIN</span>
        </h1>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-white p-2 hover:text-[#c4a484]"
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:block w-full md:w-64 bg-[#1e1e24] border-r border-white/5 flex-shrink-0`}>
        <div className="p-8 hidden md:block">
          <h1 className="text-2xl font-light text-white tracking-tighter">
            TAJIRI <span className="text-[#c4a484] font-bold">ADMIN</span>
          </h1>
        </div>
        
        <nav className="px-4 pb-4 md:py-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? "bg-[#c4a484] text-black font-bold shadow-lg shadow-[#c4a484]/20" // Active: Bronze
                    : "text-zinc-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            );
          })}

          <div className="pt-8 mt-8 border-t border-white/5">
            <Link href="/" target="_blank" className="flex items-center space-x-3 px-4 py-3 text-zinc-500 hover:text-[#c4a484] transition-colors">
                <Globe size={20} />
                <span>View Live Site</span>
            </Link>
          </div>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto bg-[#141416]">
        <div className="max-w-6xl mx-auto">
            {children}
        </div>
      </main>
    </div>
  );
}