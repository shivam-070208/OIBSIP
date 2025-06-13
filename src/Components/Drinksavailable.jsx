import React, { useRef } from 'react'

const drinksData = [
  {
    category: 'Mocktails',
    color: 'from-blue-200 to-blue-400',
    drinks: [
      { name: 'Blue Lagoon', img: 'https://img.icons8.com/color/96/000000/cocktail.png', desc: 'Refreshing blue mocktail with lemon and mint.', price: '₹129' },
      { name: 'Virgin Mojito', img: 'https://img.icons8.com/color/96/000000/mojito.png', desc: 'Classic minty lime cooler.', price: '₹99' },
      { name: 'Sunset Cooler', img: 'https://img.icons8.com/color/96/000000/tequila.png', desc: 'Orange and pineapple with a hint of grenadine.', price: '₹139' },
      { name: 'Fruit Punch', img: 'https://img.icons8.com/color/96/000000/fruit-juice.png', desc: 'Mixed fruit juice with a tropical twist.', price: '₹119' },
    ]
  },
  {
    category: 'Shakes',
    color: 'from-yellow-200 to-yellow-400',
    drinks: [
      { name: 'Chocolate Shake', img: 'https://img.icons8.com/color/96/000000/chocolate-milk.png', desc: 'Rich chocolate with creamy milk.', price: '₹109' },
      { name: 'Strawberry Shake', img: 'https://img.icons8.com/color/96/000000/strawberry.png', desc: 'Fresh strawberries blended with ice cream.', price: '₹119' },
      { name: 'Mango Shake', img: 'https://img.icons8.com/color/96/000000/mango.png', desc: 'Seasonal mangoes and milk.', price: '₹129' },
      { name: 'Oreo Shake', img: 'https://img.icons8.com/color/96/000000/cookies.png', desc: 'Oreo cookies and vanilla ice cream.', price: '₹139' },
    ]
  },
  {
    category: 'Hot Beverages',
    color: 'from-pink-200 to-pink-400',
    drinks: [
      { name: 'Cappuccino', img: 'https://img.icons8.com/color/96/000000/cappuccino-cup.png', desc: 'Classic Italian coffee with frothy milk.', price: '₹99' },
      { name: 'Hot Chocolate', img: 'https://img.icons8.com/color/96/000000/hot-chocolate.png', desc: 'Rich cocoa and steamed milk.', price: '₹109' },
      { name: 'Masala Chai', img: 'https://img.icons8.com/color/96/000000/tea.png', desc: 'Spiced Indian tea.', price: '₹69' },
      { name: 'Espresso', img: 'https://img.icons8.com/color/96/000000/espresso-cup.png', desc: 'Strong and bold Italian espresso.', price: '₹89' },
    ]
  }
]

const DrinkCarousel = ({ drinks, color }) => {
  const scrollRef = useRef(null)
  const scroll = (dir) => {
    if (scrollRef.current) {
      const amount = window.innerWidth < 768 ? 220 : 320
      scrollRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' })
    }
  }
  return (
    <div className="relative w-full">
      {/* Buttons for desktop */}
      <button onClick={() => scroll('left')} className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-yellow-200 text-3xl rounded-full w-12 h-12 items-center justify-center shadow-lg"><span>&#8592;</span></button>
      <div ref={scrollRef} className="flex gap-6 overflow-x-auto scrollbar-thin scrollbar-thumb-yellow-400 scrollbar-track-yellow-100 py-4 px-2 md:px-10 snap-x snap-mandatory">
        {drinks.map((drink, i) => (
          <div key={i} className={`min-w-[200px] max-w-[220px] bg-gradient-to-br ${color} rounded-2xl shadow-xl flex flex-col items-center p-5 snap-center`}>
            <img src={drink.img} alt={drink.name} className="w-16 h-16 mb-2" />
            <h4 className="text-xl font-bold text-yellow-900 mb-1 text-center">{drink.name}</h4>
            <p className="text-sm text-gray-700 mb-2 text-center">{drink.desc}</p>
            <span className="text-lg font-extrabold text-pink-600 mb-2">{drink.price}</span>
            <button className="px-4 py-1 bg-gradient-to-r from-yellow-400 to-pink-400 text-white font-bold rounded-full shadow hover:scale-105 transition-transform duration-200">Add</button>
          </div>
        ))}
      </div>
      <button onClick={() => scroll('right')} className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-yellow-200 text-3xl rounded-full w-12 h-12 items-center justify-center shadow-lg"><span>&#8594;</span></button>
    </div>
  )
}

const Drinksavailable = () => (
  <div className="w-full min-h-[80vh] flex flex-col items-center py-12 bg-gradient-to-br from-blue-50 via-yellow-50 to-pink-50">
    <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-yellow-500 to-pink-500 animate-pulse drop-shadow-lg mb-14 tracking-widest uppercase">Drinks Menu</h1>
    {drinksData.map((section, idx) => (
      <div key={idx} className="w-full max-w-6xl mb-16">
        <h2 className={`text-3xl font-bold mb-6 text-center tracking-widest uppercase text-yellow-700`}>{section.category}</h2>
        <DrinkCarousel drinks={section.drinks} color={section.color} />
      </div>
    ))}
  </div>
)

export default Drinksavailable
