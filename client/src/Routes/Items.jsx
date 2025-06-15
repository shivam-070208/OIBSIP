import React, { useEffect, useState } from 'react'
import { Navbar } from '../Components'
import { useContextValues } from '../Helpers/Contextprovider'
import { useNavigate } from 'react-router'
import axios from 'axios'


// Example static items (replace with props or API data as needed)


const Items = () => {
  const navigate = useNavigate()
    const {user,host} = useContextValues()
    const[items,sitems] = useState()
    useEffect(()=>{
        if(!user) return
        if(user.role==='User') window.location.pathname='/'
    },[user])

    const fetchitems = async ()=>{
      try{

        const response = await axios.post(`${host}/host/fetchitems`)
        console.log(response)
        if(response.status == 200){
          sitems(response.data)
        }
      }catch(err){
    console.log(err)
  }
    }
    useEffect(()=>{
    fetchitems()   
    },[])
  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-yellow-50 via-pink-50 to-red-100 pb-16">
      <Navbar />
      <div className="flex flex-col items-center pt-32">
        <h2 className="text-4xl md:text-5xl font-extrabold text-yellow-700 mb-10 tracking-widest drop-shadow-lg text-center animate-pulse">
          Your Items
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10 w-full p-4 text-center max-w-6xl mb-16">
          {!items && (
            <span className="col-span-full text-xl text-gray-500 font-semibold py-10">
              Sorry, no item available
            </span>
          )}
          {items &&
            items.map((item, idx) => (
              <div
                key={idx}
                className="bg-white/95 rounded-3xl shadow-2xl md:p-8 p-6 flex flex-col items-center border-4 border-yellow-200 w-full hover:scale-105 transition-transform duration-300 hover:shadow-yellow-200/60"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-36 h-36 object-cover rounded-xl mb-4 border-2 border-pink-200 shadow-lg"
                />
                <h3 className="text-2xl font-bold text-yellow-700 mb-1 text-center">
                  {item.name}
                </h3>
                <div className="text-lg text-pink-600 font-semibold mb-1">
                  {item.category}
                </div>
                <div className="text-xl font-extrabold text-green-600 mb-2">
                  ₹{item.price}
                </div>
              </div>
            ))}
        </div>
        <button
          onClick={() => navigate('/addItem')}
          className="px-10 py-3 bg-gradient-to-r from-yellow-400 to-pink-400 text-white text-2xl font-extrabold rounded-full shadow-lg hover:scale-110 fixed bottom-10 right-10 transition-transform duration-200 animate-bounce"
        >
          Add Item
        </button>
      </div>
    </div>
  )
}

export default Items
