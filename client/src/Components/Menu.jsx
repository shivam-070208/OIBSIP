import React from 'react'

const Menu = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-200 via-red-100 to-pink-200 flex flex-col items-center py-10 relative overflow-hidden">
      <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-500 to-pink-500 animate-pulse drop-shadow-lg mb-10 tracking-widest uppercase">Pizza Craze Menu</h1>
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-[url('/heroic/veggie.png')] bg-contain bg-no-repeat opacity-20 rotate-12 animate-spin-slow"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[url('/heroic/italian.png')] bg-contain bg-no-repeat opacity-20 -rotate-12 animate-spin-slow-reverse"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 z-10">
        {/* Veggie */}
        <div className="bg-white/90 rounded-3xl shadow-2xl p-10 flex flex-col items-center hover:scale-105 transition-transform duration-300 border-4 border-yellow-400 w-96 h-[32rem] justify-between">
          <img src="/heroic/veggie.png" alt="Veggie Pizza" className="w-52 h-52 object-contain drop-shadow-xl animate-bounce mb-4" />
          <h2 className="text-4xl font-bold text-green-600 mb-2">Veggie Delight</h2>
          <p className="text-xl text-gray-700 mb-4 text-center">Loaded with fresh veggies, olives, and a cheesy burst! A healthy and tasty treat for everyone.</p>
          <span className="text-3xl font-extrabold text-yellow-600 mb-4">₹299</span>
          <button className="mt-2 px-8 py-3 bg-gradient-to-r from-green-400 to-yellow-400 text-white text-xl font-bold rounded-full shadow-lg hover:scale-110 transition-transform duration-200">Buy Now</button>
        </div>
        {/* Italian */}
        <div className="bg-white/90 rounded-3xl shadow-2xl p-10 flex flex-col items-center hover:scale-105 transition-transform duration-300 border-4 border-red-400 w-96 h-[32rem] justify-between">
          <img src="/heroic/italian.png" alt="Italian Pizza" className="w-52 h-52 object-contain drop-shadow-xl animate-bounce-slow mb-4" />
          <h2 className="text-4xl font-bold text-red-600 mb-2">Italian Classic</h2>
          <p className="text-xl text-gray-700 mb-4 text-center">Classic Italian flavors with rich tomato sauce, fresh herbs, and a golden crust. A timeless favorite!</p>
          <span className="text-3xl font-extrabold text-red-600 mb-4">₹349</span>
          <button className="mt-2 px-8 py-3 bg-gradient-to-r from-red-400 to-yellow-400 text-white text-xl font-bold rounded-full shadow-lg hover:scale-110 transition-transform duration-200">Buy Now</button>
        </div>
        {/* Peperoni */}
        <div className="bg-white/90 rounded-3xl shadow-2xl p-10 flex flex-col items-center hover:scale-105 transition-transform duration-300 border-4 border-pink-400 w-96 h-[32rem] justify-between">
          <img src="/heroic/peperoni.png" alt="Peperoni Pizza" className="w-52 h-52 object-contain drop-shadow-xl animate-bounce mb-4" />
          <h2 className="text-4xl font-bold text-pink-600 mb-2">Peperoni Blast</h2>
          <p className="text-xl text-gray-700 mb-4 text-center">Spicy peperoni, gooey cheese, and a crispy crust! For those who love a little heat.</p>
          <span className="text-3xl font-extrabold text-pink-600 mb-4">₹399</span>
          <button className="mt-2 px-8 py-3 bg-gradient-to-r from-pink-400 to-yellow-400 text-white text-xl font-bold rounded-full shadow-lg hover:scale-110 transition-transform duration-200">Buy Now</button>
        </div>
      </div>
      <div className="absolute left-1/2 bottom-10 -translate-x-1/2 flex gap-4 z-0">
        <img src="/heroic/tomato.png" className="w-20 h-20 animate-wiggle" alt="tomato" />
        <img src="/heroic/veggie.png" className="w-20 h-20 animate-spin-slow" alt="veggie" />
        <img src="/heroic/peperoni.png" className="w-20 h-20 animate-bounce" alt="peperoni" />
      </div>
      <style>{`
        @keyframes wiggle { 0%, 100% { transform: rotate(-10deg); } 50% { transform: rotate(10deg); } }
        .animate-wiggle { animation: wiggle 1.5s infinite; }
        .animate-spin-slow { animation: spin 10s linear infinite; }
        .animate-spin-slow-reverse { animation: spin-reverse 12s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
        @keyframes spin-reverse { 100% { transform: rotate(-360deg); } }
        .animate-bounce-slow { animation: bounce 2.5s infinite; }
      `}</style>
    </div>
  )
}

export default Menu
