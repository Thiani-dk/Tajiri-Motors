import Link from 'next/link';

// Mock Data (Replace with your DB fetch later)
const cars = [
  { id: 1, title: "Toyota Harrier", price: "Ksh 3,100,000", year: 2017, fuel: "Petrol", image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80" },
  { id: 2, title: "Land Cruiser Prado", price: "Ksh 6,200,000", year: 2018, fuel: "Diesel", image: "https://images.unsplash.com/photo-1503376763036-066120622c74?q=80" },
  { id: 3, title: "Mercedes C-Class", price: "Ksh 4,500,000", year: 2016, fuel: "Petrol", image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80" },
  { id: 4, title: "Range Rover Sport", price: "Ksh 10,500,000", year: 2020, fuel: "Diesel", image: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?q=80" },
  { id: 5, title: "Subaru Outback", price: "Ksh 2,800,000", year: 2017, fuel: "Petrol", image: "https://images.unsplash.com/photo-1626077366952-b96b34919532?q=80" },
  { id: 6, title: "Lexus RX 450h", price: "Ksh 5,900,000", year: 2018, fuel: "Hybrid", image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80" },
];

export default function InventoryPage() {
  return (
    <div className="bg-obsidian min-h-screen pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-white/10 pb-6">
          <div>
            <span className="text-gold uppercase tracking-widest text-sm font-bold">Our Collection</span>
            <h1 className="text-4xl md:text-5xl font-serif text-white mt-2">Current Inventory</h1>
          </div>
          <div className="text-zinc-400 mt-4 md:mt-0">
            Showing <span className="text-white font-bold">{cars.length}</span> Premium Vehicles
          </div>
        </div>

        {/* Inventory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map((car) => (
            <Link href={`/inventory/${car.id}`} key={car.id} className="group bg-[#1e1e24] rounded-2xl overflow-hidden hover:-translate-y-2 transition-transform duration-300 border border-white/5 hover:border-gold/30">
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <div className="absolute top-4 left-4 z-10 bg-black/50 backdrop-blur-md px-3 py-1 rounded-lg text-xs text-white border border-white/10">
                  {car.year} • {car.fuel}
                </div>
                <img 
                  src={car.image} 
                  alt={car.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              
              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-serif text-white mb-2 group-hover:text-gold transition-colors">
                  {car.title}
                </h3>
                <p className="text-gold font-bold text-xl mb-4">{car.price}</p>
                <div className="w-full h-[1px] bg-white/10 mb-4" />
                <div className="flex justify-between items-center text-zinc-400 text-sm">
                   <span>Available in Mombasa</span>
                   <span className="group-hover:translate-x-1 transition-transform">View Details &rarr;</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}