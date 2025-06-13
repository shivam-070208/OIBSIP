import React, { useEffect } from 'react'
import { Navbar,Footer,Dealavailable } from '../Components'
import { start,end } from '../Helpers/Loaderfunction'
const Deals = () => {
  
    useEffect(()=>{
   start();
        setTimeout(()=>{
            end()
           
         
        },4000)
    },[])
  return (
    <div className='w-screen min-h-screen'>
      <Navbar />
      <Dealavailable />
      <Footer />
    </div>
  )
}

export default Deals
