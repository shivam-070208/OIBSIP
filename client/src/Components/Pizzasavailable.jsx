import React from 'react'


const vegPizzas = [
  {
    name: 'Veggie Delight',
    desc: 'Loaded with fresh veggies, olives, and a cheesy burst!',
    price: '₹299',
    img: '/heroic/veggie.png',
  },
  {
    name: 'Margherita',
    desc: 'Classic mozzarella, basil, and tomato sauce.',
    price: '₹279',
    img: 'https://img.icons8.com/color/452/pizza-slice.png',
  },
  {
    name: 'Spicy Paneer',
    desc: 'Paneer cubes, spicy sauce, and bell peppers.',
    price: '₹369',
    img: 'https://img.icons8.com/color/452/cheese.png',
  },
]

const nonVegPizzas = [
  {
    name: 'Peperoni Blast',
    desc: 'Spicy peperoni, gooey cheese, and a crispy crust!',
    price: '₹399',
    img: '/heroic/peperoni.png',
  },
  {
    name: 'BBQ Chicken',
    desc: 'Juicy chicken, tangy BBQ sauce, and crispy onions.',
    price: '₹429',
    img: 'https://img.icons8.com/color/452/pizza.png',
  },
]

const cheeseLovers = [
  {
    name: 'Italian Cheese Burst',
    desc: 'Extra mozzarella, fresh basil, and a crispy crust.',
    price: '₹399',
    img: '/heroic/italian.png',
  },
  {
    name: 'Triple Cheese',
    desc: 'Mozzarella, cheddar, and parmesan on a golden base.',
    price: '₹449',
    img: 'https://img.icons8.com/color/452/cheese.png',
  },
]

const Section = ({ title, pizzas, color }) => (
  <div className="mb-16 w-full">
    <h2 className={`text-4xl font-extrabold mb-8 text-center tracking-widest uppercase ${color}`}>{title}</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 justify-items-center">
      {pizzas.map((pizza, i) => (
        <div key={i} className="bg-white/90 rounded-3xl shadow-2xl p-8 flex flex-col items-center border-4 border-yellow-200 w-80 h-[28rem] hover:scale-105 transition-transform duration-300 justify-between">
          <img src={pizza.img} alt={pizza.name} className="w-36 h-36 object-contain drop-shadow-xl mb-4" />
          <h3 className="text-2xl font-bold text-yellow-700 mb-2">{pizza.name}</h3>
          <p className="text-lg text-gray-700 mb-4 text-center">{pizza.desc}</p>
          <span className="text-xl font-extrabold text-red-500 mb-4">{pizza.price}</span>
          <button className="px-6 py-2 bg-gradient-to-r from-yellow-400 to-red-400 text-white font-bold rounded-full shadow-lg hover:scale-110 transition-transform duration-200">Order Now</button>
        </div>
      ))}
    </div>
  </div>
)

const Pizzasavailable = () => (
  <div className="w-full min-h-[90vh] flex flex-col items-center py-16 bg-gradient-to-br from-yellow-100 via-pink-100 to-red-100">
   
    <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-500 to-pink-500 animate-pulse drop-shadow-lg mb-10 tracking-widest uppercase">Our Pizza Menu</h1>
    <Section title="Veg Pizzas" pizzas={vegPizzas} color="text-green-500" />
    <Section title="Non-Veg Pizzas" pizzas={nonVegPizzas} color="text-pink-500" />
    <Section title="Cheese Lovers" pizzas={cheeseLovers} color="text-yellow-500" />
  </div>
)

export default Pizzasavailable
