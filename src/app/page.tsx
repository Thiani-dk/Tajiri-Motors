import Navbar from "../components/Navbar";
import HeroSlider from "../components/HeroSlider";
import { Search } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-900 text-slate-200">
      <Navbar />
      
      {/* 1. The New Dynamic Slider (Displays cars from Database) */}
      <HeroSlider />

      {/* 2. Search Section (Floats slightly over the slider bottom or sits below) */}
      <div className="relative z-30 -mt-20 px-4 mb-20">
        <div className="max-w-6xl mx-auto bg-slate-800/90 backdrop-blur-xl border border-slate-700 p-6 rounded-2xl shadow-2xl">
           <h3 className="text-white mb-4 font-semibold flex items-center gap-2">
             <Search size={18} className="text-blue-400" /> 
             Find Your Dream Car
           </h3>
           
           <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
             {/* Search Inputs */}
             <div className="relative group">
               <input 
                 type="text" 
                 placeholder="Make (e.g. Toyota)" 
                 className="w-full bg-slate-900 border border-slate-700 p-3 pl-4 rounded-xl text-white focus:border-blue-500 focus:outline-none transition-colors" 
               />
             </div>
             
             <div className="relative group">
               <input 
                 type="text" 
                 placeholder="Model (e.g. Harrier)" 
                 className="w-full bg-slate-900 border border-slate-700 p-3 pl-4 rounded-xl text-white focus:border-blue-500 focus:outline-none transition-colors" 
               />
             </div>
             
             <div className="relative group">
               <select className="w-full bg-slate-900 border border-slate-700 p-3 pl-4 rounded-xl text-slate-300 focus:border-blue-500 focus:outline-none transition-colors appearance-none cursor-pointer">
                 <option value="">Max Price</option>
                 <option value="1500000">Under 1.5M</option>
                 <option value="2500000">Under 2.5M</option>
                 <option value="4000000">Under 4M</option>
                 <option value="5000001">Above 5M</option>
               </select>
             </div>

             <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-600/20 active:scale-95">
               Search Inventory
             </button>
           </div>
        </div>
      </div>
      
      {/* Spacer / Content Placeholder */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="text-center py-20 border-t border-slate-800">
           <h3 className="text-2xl font-bold text-white mb-4">Latest Arrivals</h3>
           <p className="text-slate-400">Full inventory grid coming soon...</p>
        </div>
      </div>
    </main>
  );
}