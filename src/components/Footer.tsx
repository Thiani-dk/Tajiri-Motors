export default function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-400 py-8 mt-auto border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="mb-2 text-lg font-semibold text-white">Tajiri Motors</p>
        <p className="text-sm">Premium Car Dealership in Mombasa</p>
        <p className="text-xs mt-8 opacity-50">
          &copy; {new Date().getFullYear()} Tajiri Motors. All rights reserved.
        </p>
      </div>
    </footer>
  );
}