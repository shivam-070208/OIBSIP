import React, { useEffect, useState, useRef } from 'react'
import { useContextValues } from '../Helpers/Contextprovider'
import { useNavigate } from 'react-router'
import axios from 'axios'

const Section = ({ title, drinks, color }) => {
  const navigate = useNavigate()
  return (
    <div className="mb-16 w-full">
      <h2 className={`text-4xl font-extrabold mb-8 text-center tracking-widest uppercase ${color}`}>{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 justify-items-center">
        {drinks.map((drink, i) => (
          <div key={i} className={`bg-white/90 rounded-3xl shadow-2xl p-8 flex flex-col items-center border-4 border-yellow-200 w-80 h-[28rem] hover:scale-105 transition-transform duration-300 justify-between`}>
            <img src={drink.Image} alt={drink.Name} className="w-36 h-36 object-contain drop-shadow-xl mb-4" />
            <h3 className="text-2xl font-bold text-yellow-700 mb-2">{drink.Name}</h3>
            <p className="text-sm text-gray-700 mb-4 text-center line-clamp-2">{drink.Description}</p>
            <span className="text-xl font-extrabold text-red-500 mb-4">{drink.Price}</span>
            <span className="text-xl font-extrabold text-red-500 mb-2">{drink.Category}</span>
            <button onClick={()=>{
              navigate(`/Place?id=${drink._id}&seller=${btoa(JSON.stringify(drink.Seller))}&Price=${drink.Price}`)
            }} className="px-6 py-2 bg-gradient-to-r from-yellow-400 to-red-400 text-white font-bold rounded-full shadow-lg hover:scale-110 transition-transform duration-200">Order Now</button>
          </div>
        ))}
      </div>
    </div>
  )
}

const Drinksavailable = () => {
  const { host } = useContextValues([])
  const [drinks, setDrinks] = useState([])
  const scrollRef = useRef(null)
  const scroll = (dir) => {
    if (scrollRef.current) {
        const v = scrollRef.current.scrollWidth <= scrollRef.current.scrollLeft + scrollRef.current.clientWidth 
     
    const amount =  v? -1*scrollRef.current.clientWidth : 100;
      scrollRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' })
    }
  }
  useEffect(() => {
    const fetchDrinks = async () => {
      try {
        const response = await axios.post(`${host}/users/fetchitem?type=drinks`)
        if (response.status === 200) {
          setDrinks([...response.data])
        }
      } catch (err) {
        console.log(err)
      }
    }
    fetchDrinks()
  }, [host])

  // Group drinks by category
  const grouped = drinks.reduce((acc, drink) => {
    acc[drink.Category] = acc[drink.Category] || []
    acc[drink.Category].push(drink)
    return acc
  }, {})

  return (
    <div className="w-full min-h-[80vh] flex flex-col items-center py-12 bg-gradient-to-br from-blue-50 via-yellow-50 to-pink-50">
      <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-yellow-500 to-pink-500 animate-pulse drop-shadow-lg mb-14 tracking-widest uppercase">Drinks Menu</h1>
      {Object.entries(grouped).map(([category, items], idx) => (
        <Section key={category} title={category} drinks={items} color={idx % 2 === 0 ? 'text-blue-500' : 'text-yellow-500'} />
      ))}
    </div>
  )
}

export default Drinksavailable
