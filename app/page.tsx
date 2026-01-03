'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { Search, Car, Fuel, Gauge, ArrowRight, Sparkles, Loader2, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  const [allCars, setAllCars] = useState<any[]>([]) 
  const [filteredCars, setFilteredCars] = useState<any[]>([]) 
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchStatus, setSearchStatus] = useState('idle') 

  // Request Form State
  const [requestData, setRequestData] = useState({ details: '', contact: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [requestSent, setRequestSent] = useState(false)

  // 1. Fetch Inventory
  useEffect(() => {
    async function fetchCars() {
      const { data } = await supabase
        .from('inventory')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (data) {
        setAllCars(data)
        setFilteredCars(data)
      }
      setLoading(false)
    }
    fetchCars()
  }, [])

  // 2. Search Logic
  const handleSearch = (e: any) => {
    const term = e.target.value.toLowerCase()
    setSearchTerm(term)
    setRequestData(prev => ({ ...prev, details: term }))

    if (term === '') {
      setFilteredCars(allCars)
      setSearchStatus('idle')
      return
    }

    const results = allCars.filter(car => 
      car.make.toLowerCase().includes(term) || 
      car.model.toLowerCase().includes(term) ||
      car.year.toString().includes(term) ||
      `${car.make} ${car.model}`.toLowerCase().includes(term)
    )

    setFilteredCars(results)
    setSearchStatus(results.length > 0 ? 'found' : 'empty')
  }

  // 3. Submit Request
  const handleRequestSubmit = async (e: any) => {
    e.preventDefault()
    setIsSubmitting(true)

    const { error } = await supabase
      .from('requests')
      .insert([{ car_details: requestData.details, contact_info: requestData.contact }])

    if (!error) {
      setRequestSent(true)
      setRequestData({ details: '', contact: '' })
    } else {
      alert('Error sending request. Please try again.')
    }
    setIsSubmitting(false)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES' }).format(price)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans transition-colors">
      
      {/* Navbar */}
      <nav className="bg-white dark:bg-gray-800 shadow-sm p-4 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400 font-bold text-xl">
            <Car /> <span>CARTISO</span>
          </div>
          {/* Staff Login Link */}
          <Link href="/admin" className="text-sm font-medium text-gray-400 hover:text-blue-600 dark:hover:text-blue-300">
            Staff Access
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <div className="bg-blue-700 dark:bg-blue-900 text-white py-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Find Your Dream Car in Kenya</h1>
        <p className="text-blue-100 mb-8 text-lg">Search the CARTISO inventory or let us import it for you.</p>
        
        <div className="max-w-2xl mx-auto relative">
          <input 
            type="text" 
            placeholder="What are you looking for? (e.g. Subaru Forester 2018)" 
            className="w-full p-5 pl-12 rounded-full text-gray-900 shadow-xl focus:ring-4 focus:ring-blue-400 outline-none text-lg"
            value={searchTerm}
            onChange={handleSearch}
          />
          <Search className="absolute left-4 top-5 text-gray-400" />
        </div>
      </div>

      {/* Results */}
      <div className="max-w-6xl mx-auto p-6 -mt-10">
        
        {loading && <div className="text-center py-20">Loading inventory...</div>}

        {!loading && searchStatus !== 'empty' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCars.map((car) => (
              <div key={car.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow border border-gray-100 dark:border-gray-700">
                <div className="h-48 bg-gray-200 relative">
                  {car.images && car.images[0] ? (
                    <img src={car.images[0]} alt={car.model} className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">No Image</div>
                  )}
                  <span className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full uppercase font-bold">
                    {car.use_history}
                  </span>
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-bold">{car.make} {car.model}</h3>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">{car.year} • {car.color}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 mb-4 text-xs text-gray-600 dark:text-gray-300">
                    <span className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded"><Gauge size={12}/> {car.transmission}</span>
                    <span className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded"><Fuel size={12}/> {car.fuel}</span>
                  </div>
                  <div className="flex justify-between items-center border-t pt-4 dark:border-gray-700">
                    <span className="text-green-700 dark:text-green-400 font-bold text-lg">{formatPrice(car.price)}</span>
                    <Link href={`/car/${car.id}`} className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full">
                      <ArrowRight size={20} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Request Form */}
        {!loading && searchStatus === 'empty' && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl text-center max-w-2xl mx-auto mt-8 border border-gray-200 dark:border-gray-700">
            {requestSent ? (
              <div className="py-10 animate-in fade-in zoom-in duration-500">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Request Received!</h2>
                <p className="text-gray-500">We will find this car and contact you shortly.</p>
                <button onClick={() => {setRequestSent(false); setSearchTerm(''); setFilteredCars(allCars); setSearchStatus('idle')}} className="mt-6 text-blue-600 hover:underline">
                  Back to Showroom
                </button>
              </div>
            ) : (
              <>
                <div className="flex justify-center mb-4">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-full">
                    <Sparkles className="text-blue-600 dark:text-blue-400 w-8 h-8" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold mb-2">We don't have that in stock.</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">But we can find it for you! Tell us exactly what you want.</p>
                <form onSubmit={handleRequestSubmit} className="space-y-4 text-left">
                  <div>
                    <label className="text-xs font-bold uppercase text-gray-500 dark:text-gray-400">What are you looking for?</label>
                    <input required className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 outline-none focus:ring-2 focus:ring-blue-500" value={requestData.details} onChange={(e) => setRequestData({...requestData, details: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase text-gray-500 dark:text-gray-400">Your Contact</label>
                    <input required placeholder="Phone or Email" className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 outline-none focus:ring-2 focus:ring-blue-500" value={requestData.contact} onChange={(e) => setRequestData({...requestData, contact: e.target.value})} />
                  </div>
                  <button type="submit" disabled={isSubmitting} className="w-full bg-black dark:bg-white dark:text-black text-white p-4 rounded-lg font-bold hover:bg-gray-800 transition flex justify-center">
                    {isSubmitting ? <Loader2 className="animate-spin" /> : 'SEND REQUEST'}
                  </button>
                </form>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}