import React, { useRef, useState } from 'react'
import { Brand } from '../Helpers'
import { gsap } from 'gsap'
import { Link } from 'react-router'

const navItems = ['Deals','Pizzas','Papajohns','Drinks','User']

const Navbar = () => {
    const [open, setOpen] = useState(false)
    const navRef = useRef(null)
    const topBar = useRef(null)
    const midBar = useRef(null)
    const botBar = useRef(null)

    const handleMenuClick = () => {
        setOpen(prev => {
            const next = !prev
            if (next) {
                gsap.to(navRef.current, { y: 0, duration: 0.5, ease: "power3.out", pointerEvents: 'auto' })
                gsap.to(topBar.current, { rotate: 45, y: 8, background: "#fff", duration: 0.3 })
                gsap.to(midBar.current, { opacity: 0, duration: 0.2 })
                gsap.to(botBar.current, { rotate: -45, y: -8, background: "#fff", duration: 0.3 })
            } else {
                gsap.to(navRef.current, { y: "-100%", duration: 0.5, ease: "power3.in", pointerEvents: 'none' })
                gsap.to(topBar.current, { rotate: 0, y: 0, background: "#fff", duration: 0.3 })
                gsap.to(midBar.current, { opacity: 1, duration: 0.2 })
                gsap.to(botBar.current, { rotate: 0, y: 0, background: "#fff", duration: 0.3 })
            }
            return next
        })
    }

    const handleNavClick = () => {
        setOpen(false)
        gsap.to(navRef.current, { y: "-100%", duration: 0.5, ease: "power3.in", pointerEvents: 'none' })
        gsap.to(topBar.current, { rotate: 0, y: 0, background: "#fff", duration: 0.3 })
        gsap.to(midBar.current, { opacity: 1, duration: 0.2 })
        gsap.to(botBar.current, { rotate: 0, y: 0, background: "#fff", duration: 0.3 })
    }

    // Hide nav on mount
    React.useEffect(() => {
        gsap.set(navRef.current, { y: "-100%", pointerEvents: 'none' })
    }, [])

    return (
        <div className='w-screen Navfont backdrop-blur-sm fixed top-0 bg-transparent flex justify-between lg:pt-10 lg:px-30 px-4 pt-6 z-50'>
            {navItems.map((elm, i) =>
                (i === 2) ? (
                    <Brand key={elm} elm={elm} />
                ) : (
                    <Link to={`/${elm}`}
                        className='font-semibold md:inline-block hidden text-[#e1a1a1] hover:text-blue-600 transition-all cursor-pointer'
                        key={elm}
                    >
                        {elm}
                    </Link>
                )
            )}
            {/* Hamburger Menu */}
            <div
                className='md:hidden flex flex-col menu gap-2 w-7 z-50 cursor-pointer'
                onClick={handleMenuClick}
            >
                <div ref={topBar} className="w-full bg-white h-1 rounded transition-all"></div>
                <div ref={midBar} className="w-full bg-white h-1 rounded transition-all"></div>
                <div ref={botBar} className="w-full bg-white h-1 rounded transition-all"></div>
            </div>
            {/* Mobile Nav */}
            <div
                ref={navRef}
                className="fixed top-0 left-0 w-full h-screen bg-[#181818] flex flex-col items-center justify-center gap-8 md:hidden z-40"
                style={{ pointerEvents: open ? 'auto' : 'none' }}
            >
                {navItems.map((elm, i) =>
                    (i === 2) ? (
                        <Brand key={elm} elm={elm} />
                    ) : (
                        <span
                            className='font-semibold text-2xl text-[#ffffff] hover:text-blue-600 transition-all cursor-pointer'
                            key={elm}
                            onClick={handleNavClick}
                        >
                            {elm}
                        </span>
                    )
                )}
            </div>
        </div>
    )
}

export default Navbar
