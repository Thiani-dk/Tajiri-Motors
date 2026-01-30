"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-slate-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-blue-500">
            Tajiri<span className="text-white">Motors</span>
          </Link>

          {/* Desktop Menu (Hidden on Mobile) */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link href="/" className="hover:text-blue-400 transition">Home</Link>
            <Link href="/#inventory" className="hover:text-blue-400 transition">Inventory</Link>
            <Link href="/admin/login" className="text-gray-400 hover:text-white text-sm">Admin</Link>
            <Link href="tel:+254700000000" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md font-semibold transition">
              Call Us
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              {isOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-slate-800 pb-4">
          <div className="flex flex-col px-4 pt-2 space-y-2">
            <Link 
              href="/" 
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-700"
            >
              Home
            </Link>
            <Link 
              href="/#inventory" 
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-700"
            >
              Inventory
            </Link>
             <Link 
              href="/admin/login" 
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-slate-700"
            >
              Admin Login
            </Link>
            <Link 
              href="tel:+254700000000" 
              className="block text-center mt-4 bg-blue-600 px-3 py-2 rounded-md font-bold"
            >
              Call Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}