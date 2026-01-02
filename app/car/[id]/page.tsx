'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation' // To read the ID from the URL
import { supabase } from '@/lib/supabaseClient'
import { ArrowLeft, MessageCircle, Phone, Calendar, Gauge, Fuel, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function CarDetails() {
  const { id } = useParams()
  const [car, setCar] = useState<any>(null)
  const [selectedImage, setSelectedImage] = useState('')
  const [loading, setLoading] = useState(true)

  // Dealership Phone Number (Change this to yours!)
  const DEALERSHIP_PHONE = '0706701130' 

  useEffect(() => {
    async function fetchCar() {
      const { data, error } = await supabase
        .from('inventory')
        .select('*')
        .eq('id', id)
        .single() // We expect only one car

      if (data) {
        setCar(data)
        // Set the first image as the main one initially
        if (data.images && data.images.length > 0) {
          setSelectedImage(data.images[0])
        }
      }
      setLoading(false)
    }
    fetchCar()
  }, [id])

  if (loading) return <div className="p-10 text-center">Loading car details...</div>
  if (!car) return <div className="p-10 text-center">Car not found.</div>

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES' }).format(price)
  }

  // Create the WhatsApp Link
  const whatsappUrl = `https://wa.me/${DEALERSHIP_PHONE}?text=Hi, I am interested in the ${car.year} ${car.make} ${car.model} listed for ${formatPrice(car.price)}`

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans pb-10">
      
      {/* Top Navigation */}
      <div className="bg-white dark:bg-gray-800 p-4 shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 text-gray-500 hover:text-blue-600">
            <ArrowLeft size={20} /> <span className="font-bold">Back to Showroom</span>
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 md:p-6">
        
        {/* 1. IMAGE GALLERY */}
        <div className="mb-8">
          {/* Main Big Image */}
          <div className="aspect-video bg-gray-200 rounded-2xl overflow-hidden shadow-lg mb-4">
            <img src={selectedImage} alt={car.model} className="w-full h-full object-cover" />
          </div>
          
          {/* Thumbnails Row */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {car.images.map((img: string, index: number) => (
              <button 
                key={index} 
                onClick={() => setSelectedImage(img)}
                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${selectedImage === img ? 'border-blue-600 opacity-100' : 'border-transparent opacity-60 hover:opacity-100'}`}
              >
                <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* 2. CAR DETAILS */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md border border-gray-100 dark:border-gray-700">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-3xl font-extrabold uppercase">{car.year} {car.make} {car.model}</h1>
              <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded-full font-bold mt-2">
                {car.use_history}
              </span>
            </div>
            <div className="mt-4 md:mt-0 text-right">
              <p className="text-green-700 dark:text-green-400 font-black text-2xl">{formatPrice(car.price)}</p>
            </div>
          </div>

          <hr className="my-6 border-gray-100 dark:border-gray-700" />

          {/* Specs Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl text-center">
              <Calendar className="mx-auto mb-2 text-blue-500" />
              <p className="text-xs text-gray-500 uppercase">Year</p>
              <p className="font-bold">{car.year}</p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl text-center">
              <Gauge className="mx-auto mb-2 text-blue-500" />
              <p className="text-xs text-gray-500 uppercase">Transmission</p>
              <p className="font-bold">{car.transmission}</p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl text-center">
              <Fuel className="mx-auto mb-2 text-blue-500" />
              <p className="text-xs text-gray-500 uppercase">Fuel</p>
              <p className="font-bold">{car.fuel}</p>
            </div>
             <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl text-center">
              <CheckCircle className="mx-auto mb-2 text-blue-500" />
              <p className="text-xs text-gray-500 uppercase">Color</p>
              <p className="font-bold">{car.color}</p>
            </div>
          </div>

          {/* Call to Action Buttons */}
          <div className="flex flex-col gap-3">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" 
               className="flex items-center justify-center gap-2 bg-green-500 text-white p-4 rounded-xl font-bold text-lg hover:bg-green-600 transition-colors shadow-lg">
              <MessageCircle /> Discuss on WhatsApp
            </a>
            <a href={`tel:${DEALERSHIP_PHONE}`} 
               className="flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white p-4 rounded-xl font-bold text-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
              <Phone /> Call Dealership
            </a>
          </div>

        </div>

      </div>
    </div>
  )
}