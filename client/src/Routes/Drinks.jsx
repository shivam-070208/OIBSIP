import React from 'react'
import { Carousel } from '../Helpers'
import { Navbar,Footer,Drinksavailable } from '../Components'
const Drinks = () => {
  return (
    <div className='w-screen min-h-screen'>
      <Navbar />
<Carousel />
<Drinksavailable />
      <Footer />
    </div>
  )
}

export default Drinks
