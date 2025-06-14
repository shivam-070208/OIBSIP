import React from 'react'
import { Routes,Route } from 'react-router'
import { Home,Deals, Pizzas,Drinks } from './Routes'


const App = () => {
  const loaderColors = [
    'bg-amber-300',
    'bg-red-300',
    'bg-green-300',
    'bg-blue-300',
    'bg-purple-300',
    'bg-pink-300'
  ];

  return (
    <div className='select-none'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/deals' element={<Deals />} />
         <Route path='/pizzas' element={<Pizzas />} />
         <Route path='/Drinks' element={<Drinks/>} />
         <Route path='/Users' element={<Drinks/>} />
      </Routes>
      <div className='w-screen h-screen fixed flex top-0 pointer-events-none z-[100]'>
        {Array(window.innerWidth<500?3:6).fill().map((_, i) => (
          <div
            key={i}
            className={`md:w-1/6 w-1/3 loader border-r-1 translate-y-[-100%] h-screen ${loaderColors[i]} pointer-events-auto z-100`}
          ></div>
        ))}
      </div>
    </div>
  )
}

export default App
