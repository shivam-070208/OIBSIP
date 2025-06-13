import React from 'react'

const Featured = () => (
  <div className="w-full py-10 bg-gradient-to-r from-pink-100 via-yellow-100 to-red-100 flex flex-col items-center">
    <h2 className="text-4xl font-bold text-red-500 mb-4 uppercase tracking-widest">Today's Special</h2>
    <div className="flex flex-col md:flex-row gap-8 items-center">
      <img src="/heroic/italian.png" alt="Special Pizza" className="w-40 h-40 object-contain drop-shadow-2xl animate-bounce" />
      <div>
        <h3 className="text-2xl font-semibold text-yellow-700 mb-2">Italian Cheese Burst</h3>
        <p className="text-lg text-gray-700 mb-2">A cheesy delight with extra mozzarella, fresh basil, and a crispy crust. Limited time only!</p>
        <span className="text-xl font-bold text-red-600">₹399</span>
      </div>
    </div>
  </div>
)

export default Featured
