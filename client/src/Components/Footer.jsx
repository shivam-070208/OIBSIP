import React from 'react'

const Footer = () => (
  <footer className="w-full py-8 bg-gradient-to-r from-red-400 via-yellow-400 static bottom-0 to-pink-400 text-center text-white font-bold ">
    <div className="mb-2">
      © {new Date().getFullYear()} Pizza Craze | Follow us on
      <a href="#" className="mx-2 underline hover:text-yellow-200">Instagram</a>
      <a href="#" className="mx-2 underline hover:text-yellow-200">Facebook</a>
      <a href="#" className="mx-2 underline hover:text-yellow-200">Twitter</a>
    </div>
    <div className="mb-2">
      <span className="mr-2">Contact us:</span>
      <a href="mailto:info@pizzacraze.com" className="underline hover:text-yellow-200">info@pizzacraze.com</a>
      <span className="mx-2">|</span>
      <span>+1 (555) 123-4567</span>
    </div>
    <div>
      <a href="/about" className="mx-2 underline hover:text-yellow-200">About Us</a>
      <a href="/menu" className="mx-2 underline hover:text-yellow-200">Menu</a>
      <a href="/locations" className="mx-2 underline hover:text-yellow-200">Locations</a>
      <a href="/careers" className="mx-2 underline hover:text-yellow-200">Careers</a>
      <a href="/privacy" className="mx-2 underline hover:text-yellow-200">Privacy Policy</a>
    </div>
  </footer>
)

export default Footer
