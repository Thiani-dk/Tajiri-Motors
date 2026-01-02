'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { Upload, Car, Loader2, Lock, Trash2, RefreshCw } from 'lucide-react'

export default function AdminPage() {
  // --- AUTHENTICATION ---
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [pinInput, setPinInput] = useState('')
  const SECRET_PIN = "1234" // Your PIN

  // --- APP STATE ---
  const [loading, setLoading] = useState(false)
  const [inventory, setInventory] = useState<any[]>([]) // Stores list of cars
  const [message, setMessage] = useState('')
  const [formData, setFormData] = useState({
    make: '', model: '', year: '', transmission: 'Automatic', 
    fuel: 'Petrol', price: '', color: '', use_history: 'Foreign Used',
  })
  const [images, setImages] = useState<any[]>([])

  // 1. Fetch Inventory function
  const fetchInventory = async () => {
    const { data } = await supabase.from('inventory').select('*').order('created_at', { ascending: false })
    if (data) setInventory(data)
  }

  // Fetch cars when we log in
  useEffect(() => {
    if (isAuthenticated) {
      fetchInventory()
    }
  }, [isAuthenticated])

  // LOGIN LOGIC
  const handleLogin = (e: any) => {
    e.preventDefault()
    if (pinInput === SECRET_PIN) {
      setIsAuthenticated(true)
    } else {
      alert("Incorrect PIN")
    }
  }

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleImageChange = (e: any) => {
    if (e.target.files) setImages([...Array.from(e.target.files)])
  }

  // UPLOAD LOGIC
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const imageUrls = []
      // Upload Images
      for (const file of images) {
        const fileName = `${Date.now()}-${file.name}`
        const { error } = await supabase.storage.from('car-images').upload(fileName, file)
        if (error) throw error
        const { data } = supabase.storage.from('car-images').getPublicUrl(fileName)
        imageUrls.push(data.publicUrl)
      }

      // Upload Data
      const { error: dbError } = await supabase.from('inventory').insert([{
        make: formData.make,
        model: formData.model,
        year: parseInt(formData.year),
        transmission: formData.transmission,
        fuel: formData.fuel,
        price: parseFloat(formData.price),
        color: formData.color,
        use_history: formData.use_history,
        images: imageUrls,
      }])

      if (dbError) throw dbError

      setMessage('✅ Car uploaded successfully!')
      setFormData({ make: '', model: '', year: '', transmission: 'Automatic', fuel: 'Petrol', price: '', color: '', use_history: 'Foreign Used' })
      setImages([])
      fetchInventory() // Refresh the list

    } catch (error: any) {
      console.error(error)
      setMessage('❌ Error: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  // DELETE LOGIC
  const handleDelete = async (id: number) => {
    const confirm = window.confirm("Are you sure you want to delete this car? This cannot be undone.")
    if (!confirm) return

    const { error } = await supabase.from('inventory').delete().eq('id', id)
    
    if (error) {
      alert("Error deleting car")
    } else {
      fetchInventory() // Refresh list instantly
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES' }).format(price)
  }

  // STYLES
  const inputClass = "p-3 border rounded-lg w-full outline-none transition-colors bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
  const labelClass = "text-xs font-bold uppercase mb-1 block text-gray-600 dark:text-gray-300"

  // LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
        <form onSubmit={handleLogin} className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl w-full max-w-sm text-center border dark:border-gray-700">
          <div className="bg-blue-100 dark:bg-blue-900/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-xl font-bold mb-4 dark:text-white">Staff Access Only</h2>
          <input type="password" placeholder="Enter PIN" className={`${inputClass} text-center text-lg tracking-widest mb-4`} value={pinInput} onChange={(e) => setPinInput(e.target.value)} />
          <button type="submit" className="w-full bg-blue-700 text-white p-3 rounded-lg font-bold hover:bg-blue-800">UNLOCK</button>
        </form>
      </div>
    )
  }

  // ADMIN DASHBOARD
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 md:p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3 text-blue-800 dark:text-blue-400">
            <Car size={32} />
            <h1 className="text-3xl font-extrabold tracking-tight">Admin Dashboard</h1>
          </div>
          <a href="/" className="text-sm font-bold text-gray-500 hover:text-blue-600">Back to Website</a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* LEFT: UPLOAD FORM */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 h-fit">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Upload size={20}/> Upload New Car</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div><label className={labelClass}>Make</label><input required name="make" placeholder="Toyota" value={formData.make} onChange={handleChange} className={inputClass} /></div>
                <div><label className={labelClass}>Model</label><input required name="model" placeholder="Vitz" value={formData.model} onChange={handleChange} className={inputClass} /></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className={labelClass}>Year</label><input required type="number" name="year" placeholder="2018" value={formData.year} onChange={handleChange} className={inputClass} /></div>
                <div><label className={labelClass}>Color</label><input required name="color" placeholder="White" value={formData.color} onChange={handleChange} className={inputClass} /></div>
              </div>
              <div>
                <label className={labelClass}>Price (KSH)</label>
                <input required type="number" name="price" placeholder="0" value={formData.price} onChange={handleChange} className={`${inputClass} font-bold text-green-700 dark:text-green-400`} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                 <select name="transmission" value={formData.transmission} onChange={handleChange} className={inputClass}><option>Automatic</option><option>Manual</option></select>
                 <select name="fuel" value={formData.fuel} onChange={handleChange} className={inputClass}><option>Petrol</option><option>Diesel</option><option>Hybrid</option></select>
              </div>
               <select name="use_history" value={formData.use_history} onChange={handleChange} className={inputClass}><option>Foreign Used</option><option>Kenyan Used</option><option>Brand New</option></select>
              
              <div className="border-2 border-dashed p-4 rounded-lg text-center cursor-pointer hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700">
                <label className="cursor-pointer w-full block">
                  <span className="text-sm text-gray-500">Tap to upload photos</span>
                  <input type="file" multiple accept="image/*" onChange={handleImageChange} className="hidden" />
                </label>
                {images.length > 0 && <p className="text-xs text-green-600 mt-1">{images.length} selected</p>}
              </div>

              <button type="submit" disabled={loading} className="w-full bg-blue-700 text-white p-3 rounded-lg font-bold hover:bg-blue-800 flex justify-center">{loading ? <Loader2 className="animate-spin" /> : 'UPLOAD CAR'}</button>
              {message && <div className="text-center text-sm font-bold text-green-600">{message}</div>}
            </form>
          </div>

          {/* RIGHT: MANAGE INVENTORY */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold flex items-center gap-2"><RefreshCw size={20}/> Live Inventory</h2>
              <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded-full">{inventory.length} Cars</span>
            </div>
            
            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
              {inventory.length === 0 ? (
                <p className="text-gray-400 text-center py-10">No cars in stock.</p>
              ) : (
                inventory.map((car) => (
                  <div key={car.id} className="flex justify-between items-center p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-600 transition">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-200 rounded-md overflow-hidden">
                        {car.images?.[0] && <img src={car.images[0]} className="w-full h-full object-cover" />}
                      </div>
                      <div>
                        <p className="font-bold text-sm">{car.year} {car.make} {car.model}</p>
                        <p className="text-xs text-green-600 font-bold">{formatPrice(car.price)}</p>
                      </div>
                    </div>
                    <button onClick={() => handleDelete(car.id)} className="text-red-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-full transition">
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}