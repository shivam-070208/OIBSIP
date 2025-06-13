
import { Heroic, Navbar, Menu, Featured, Testimonials, Footer } from '../Components'

const Home = () => {
 
  return (
    <div  className='w-screen relative h-full bg-gradient-to-b from-yellow-100 via-pink-100 to-red-100'>
      <Navbar />
      <Heroic />
      <Featured />
      <Menu />
      <Testimonials />
      <Footer />
    </div>
  )
}

export default Home
