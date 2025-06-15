import React, { useEffect } from 'react'
import { Navbar } from '../Components'
import { useContextValues } from '../Helpers/Contextprovider'

// Example static items (replace with props or API data as needed)
const items = [
  {
    name: 'Paneer Tikka Supreme',
    category: 'Veg',
    price: 399,
    image: '/heroic/veggie.png',
  },
  {
    name: 'BBQ Chicken',
    category: 'Non-Veg',
    price: 429,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Triple Cheese',
    category: 'Cheese',
    price: 449,
    image: 'https://images.unsplash.com/photo-1548365328-8b849e6c7b8b?auto=format&fit=crop&w=400&q=80',
  },
]

const Items = () => {
    const {user} = useContextValues()
    useEffect(()=>{
        if(!user) return
        if(user.role==='User') window.location.pathname='/'
    },[user])
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-yellow-100 via-pink-100 to-red-100 pb-16">
      <Navbar />
      <div className="flex flex-col items-center pt-32">
        <h2 className="text-4xl font-extrabold text-yellow-700 mb-8 tracking-widest drop-shadow-lg text-center animate-pulse">
          Your Items
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full max-w-5xl mb-12">
          {items.map((item, idx) => (
            <div key={idx} className="bg-white/95 rounded-3xl shadow-2xl p-8 flex flex-col items-center border-4 border-yellow-300 w-80 hover:scale-105 transition-transform duration-300">
              <img src={item.image} alt={item.name} className="w-36 h-36 object-cover rounded-xl mb-4 border-2 border-pink-300 shadow" />
              <h3 className="text-2xl font-bold text-yellow-700 mb-1 text-center">{item.name}</h3>
              <div className="text-lg text-pink-600 font-semibold mb-1">{item.category}</div>
              <div className="text-xl font-extrabold text-green-600 mb-2">₹{item.price}</div>
            </div>
          ))}
        </div>
        <button className="px-10 py-3 bg-gradient-to-r from-yellow-400 to-pink-400 text-white text-2xl font-extrabold rounded-full shadow-lg hover:scale-110 fixed bottom-10 transition-transform duration-200 animate-bounce">
          Add Item
        </button>
      </div>
    </div>
  )
}

export default Items
