import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-1 group">
      <div className="flex flex-col leading-none">
        <span className="text-2xl md:text-3xl font-extrabold tracking-tighter text-white">
          TAJI<span className="text-blue-500">REE</span>
        </span>
        <span className="text-[10px] md:text-xs font-medium text-slate-400 uppercase tracking-[0.2em] group-hover:text-blue-400 transition-colors">
          Motors
        </span>
      </div>
    </Link>
  );
}