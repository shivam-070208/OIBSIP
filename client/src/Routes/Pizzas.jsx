import React from 'react'
import Carousel from '../Helpers/Carousel'
import { Navbar,Footer,Pizzasavailable } from '../Components'
const Pizzas = () => {
  return (
    <div className='w-screen min-h-screen'>
      <Navbar />
      <Carousel />
      <Pizzasavailable />
      <Footer />
    </div>
  )
}

export default Pizzas
