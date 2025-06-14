import { useRef } from 'react';
import { useState, useEffect} from 'react'

const pizzaSlides = [
    {
        img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
        name: 'Truffle Mushroom Magic',
        desc: 'Earthy mushrooms, truffle oil, and creamy cheese on a golden crust.'
    },
    {
        img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
        name: 'Fiery Mexican Wave',
        desc: 'Jalapeños, spicy salsa, and crunchy nachos for a bold kick.'
    }, {
        img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
        name: 'Truffle Mushroom Magic',
        desc: 'Earthy mushrooms, truffle oil, and creamy cheese on a golden crust.'
    },
    {
        img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
        name: 'Fiery Mexican Wave',
        desc: 'Jalapeños, spicy salsa, and crunchy nachos for a bold kick.'
    }
]
const Carousel = () => {
    const transitioning = useRef(false);
    const [current, setCurrent] = useState(0)
    useEffect(() => {
        const timer = setTimeout(() => setCurrent((prev) => (prev + 1) % pizzaSlides.length), 8000)
        return () => clearTimeout(timer)
    }, [current])
    const prevSlide = () =>{ 
         if(transitioning.current) return
        transitioning.current = true;
        setTimeout(()=>transitioning.current = false,9000)
        setCurrent((current - 1 + pizzaSlides.length) % pizzaSlides.length)
    }
    const nextSlide = () => {
        if(transitioning.current) return
       
          transitioning.current = true;
          setTimeout(()=>transitioning.current = false,900)
        setCurrent((current + 1) % pizzaSlides.length)
    }
    return (
        <div className="w-screen md:h-[90vh] h-[60vh] flex flex-col items-center justify-center relative overflow-hidden ">
            <div className="absolute w-screen h-full overflow-hidden z-0">
                <div
                    className="flex transition-transform duration-900 ease-in-out h-full"
                    style={{ transform: `translateX(-${current * 100}vw)` }}
                >
                    {pizzaSlides.map((elm, i) => (
                        <img
                            src={elm.img}
                            className="w-screen h-[90vh] object-fit flex-shrink-0"
                            key={i}
                            alt={elm.name}
                        />
                    ))}
                </div>
            </div>
            <div className="relative z-10 flex flex-col items-center justify-center h-full w-full mt-20 ">
                <h2 className="text-[max(4vw,20px)] font-extrabold text-white drop-shadow-lg mb-4 mt-10 text-center animate-pulse tracking-widest uppercase">Discover Our Signature Pizzas</h2>
                <p className="text-[max(2vw,15px)] text-yellow-200 font-semibold mb-10 text-center max-w-2xl">Each pizza is a masterpiece, crafted with unique flavors and fresh ingredients. Swipe through and find your next favorite!</p>
                <div className="bg-white/80 rounded-3xl shadow-2xl flex flex-col items-center px-12 py-8 max-w-xl mx-auto">
                    <h3 className="md:text-3xl text-xl font-bold text-yellow-700 mb-2 text-center">{pizzaSlides[current].name}</h3>
                    <p className="md:text-lg md:leading text-gray-700 mb-4 text-center">{pizzaSlides[current].desc}</p>
                </div>
                <div className="absolute left-10 top-1/2 -translate-y-1/2 z-20">
                    <button onClick={prevSlide} className="bg-yellow-400 hover:bg-yellow-500 md:text-4xl cursor-pointer text-2xl rounded-full md:w-14 md:h-14 w-8 h-8 flex items-center justify-center shadow-lg">&#8592;</button>
                </div>
                <div className="absolute right-10 top-1/2 -translate-y-1/2 z-20">
                    <button onClick={nextSlide} className="bg-yellow-400 hover:bg-yellow-500 cursor-pointer md:text-4xl text-2xl rounded-full md:w-14 md:h-14 w-8 h-8 flex items-center justify-center shadow-lg">&#8594;</button>
                </div>
                <div className="flex gap-3 mt-8">
                    {pizzaSlides.map((_, idx) => (
                        <span key={idx} className={`w-4 h-4 rounded-full ${idx === current ? 'bg-yellow-500' : 'bg-yellow-200'} inline-block border-2 border-white`}></span>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Carousel
