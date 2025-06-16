import React, { useEffect, useState } from 'react'
import { useContextValues } from '../Helpers/Contextprovider'
import axios from 'axios'
import { useNavigate } from 'react-router'

const Section = ({ title, pizzas, color }) =>{ 
  const navigate = useNavigate()
  return(
  <div className="mb-16 w-full">
    <h2 className={`text-4xl font-extrabold mb-8 text-center tracking-widest uppercase ${color}`}>{title}</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 justify-items-center">
      {pizzas.map((pizza, i) => (
        <div key={i} className="bg-white/90 rounded-3xl shadow-2xl p-8 flex flex-col items-center border-4 border-yellow-200 w-80 h-[28rem] hover:scale-105 transition-transform duration-300 justify-between">
          <img src={pizza.Image} alt={pizza.Name} className="w-36 h-36 object-contain drop-shadow-xl mb-4" />
          <h3 className="text-2xl font-bold text-yellow-700 mb-2">{pizza.Name}</h3>
          <p className="text-sm text-gray-700 mb-4 text-center line-clamp-2">{pizza.Description}</p>
          <span className="text-xl font-extrabold text-red-500 mb-4">{pizza.Price}</span>
          <span className="text-xl font-extrabold text-red-500 mb-2">{pizza.Category}</span>
          <button onClick={()=>{
            navigate(`/Place?id=${pizza._id}&seller=${btoa(JSON.stringify(pizza.Seller))}&Price=${pizza.Price}`)
          }} className="px-6 py-2 bg-gradient-to-r from-yellow-400 to-red-400 text-white font-bold rounded-full shadow-lg hover:scale-110 transition-transform duration-200">Order Now</button>
        </div>
      ))}
    </div>
  </div>
)
}
const Pizzasavailable = () => {
  const { host } = useContextValues([])
  const [pizza, spizza] = useState([])
  const fetchpizza = async () => {
    try {
      const response = await axios.post(`${host}/users/fetchitem?type=pizza`)
      if (response.status === 200) {
        spizza([...response.data])
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchpizza()
  }, [])

  return (
    <div className="w-full min-h-[90vh] flex flex-col items-center py-16 bg-gradient-to-br from-yellow-100 via-pink-100 to-red-100">
      <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-500 to-pink-500 animate-pulse drop-shadow-lg mb-10 tracking-widest uppercase">Our Pizza Menu</h1>
      <Section title="Cheese Lovers" pizzas={pizza} color="text-yellow-500" />
    </div>
  )
}

export default Pizzasavailable
