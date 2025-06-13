import React from 'react'

const testimonials = [
  { name: 'Amit', text: 'Best pizza in town! The crust is perfect and the cheese is heavenly.' },
  { name: 'Priya', text: 'Loved the crazy menu and the vibrant vibes. Will order again!' },
  { name: 'Rahul', text: 'The Italian Cheese Burst is a must-try. Highly recommended!' },
]

const Testimonials = () => (
  <div className="w-full py-10 bg-white flex flex-col items-center">
    <h2 className="text-3xl font-bold text-pink-500 mb-6 uppercase tracking-widest">What Our Customers Say</h2>
    <div className="flex flex-col md:flex-row gap-8">
      {testimonials.map((t, i) => (
        <div key={i} className="bg-yellow-100 rounded-2xl shadow-lg p-6 w-72 flex flex-col items-center border-2 border-pink-200">
          <span className="text-6xl mb-2">🍕</span>
          <p className="text-gray-700 italic mb-2">"{t.text}"</p>
          <span className="font-bold text-red-500">- {t.name}</span>
        </div>
      ))}
    </div>
  </div>
)

export default Testimonials
