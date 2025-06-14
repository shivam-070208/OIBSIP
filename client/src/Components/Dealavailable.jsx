import React from 'react'

const deals = [
  {
    title: 'Buy 1 Get 1 Free',
    desc: 'Order any large pizza and get another absolutely free! Perfect for sharing with friends.',
    code: 'BOGO2025',
    color: 'from-green-400 to-yellow-300',
    video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    price: '₹499',
  },
  {
    title: 'Family Feast Combo',
    desc: '2 Medium Pizzas + 2 Drinks + 1 Dessert at a crazy price. Family time just got tastier!',
    code: 'FAMILYFUN',
    color: 'from-pink-400 to-red-300',
    video: 'https://www.w3schools.com/html/movie.mp4',
    price: '₹699',
  },
  {
    title: 'Student Special',
    desc: 'Show your student ID and get 20% off on all orders above ₹299. Because you deserve it!',
    code: 'STUDENT20',
    color: 'from-blue-400 to-purple-300',
    video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    price: '20% OFF',
  },
]

const Dealavailable = () => (
  <div className="w-full min-h-[80vh] flex flex-col items-center py-32 bg-gradient-to-br from-yellow-100 via-pink-100 to-red-100">
    <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-500 to-pink-500 animate-pulse drop-shadow-lg mb-12 tracking-widest uppercase">Hot Pizza Deals</h1>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full max-w-6xl">
      {deals.map((deal, i) => (
        <div key={i} className={`rounded-3xl shadow-2xl p-8 flex flex-col items-center bg-gradient-to-br ${deal.color} hover:scale-105 transition-transform duration-300 border-4 border-white/60 relative overflow-hidden`}>
          <video src={deal.video} className="w-40 h-40 object-cover rounded-2xl mb-4 shadow-xl" autoPlay loop muted playsInline />
          <h2 className="text-3xl font-bold text-white mb-2 uppercase tracking-wide drop-shadow">{deal.title}</h2>
          <p className="text-lg text-white/90 mb-4 text-center">{deal.desc}</p>
          <span className="text-2xl font-extrabold text-yellow-100 mb-2">{deal.price}</span>
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-white/80 text-pink-600 font-bold px-4 py-1 rounded-full text-lg tracking-widest cursor-pointer" onClick={()=>navigator.clipboard.writeText(deal.code)}>{deal.code}</span>
            <button className="ml-2 px-6 py-2 bg-gradient-to-r from-yellow-400 to-red-400 text-white font-bold rounded-full shadow-lg hover:scale-110 transition-transform duration-200">Order Now</button>
          </div>
          <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-white/20 rounded-full blur-2xl animate-pulse"></div>
        </div>
      ))}
    </div>
  </div>
)

export default Dealavailable
