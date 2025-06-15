import React from 'react'
import gsap from 'gsap'
import { Link, useNavigate } from 'react-router'

const Brand = ({elm}) => {
    const navigate = useNavigate()
    const hover =()=>{
        gsap.set('.alpha',{
            top:0,
            rotate:0
        })
        gsap.from('.alpha',{
            top:34,
            rotate:'40deg',
            duration:0.2,
            stagger:{
                from:'random',
                amount:0.4
            }
        })
    }

  return (
   
    <span onMouseEnter={hover} onClick={()=>{
        navigate('/')
    }} className=" overflow-hidden h-fit perspective-[3000px] ">
        {elm.split('').map((e, i) => (
            <span
                key={i} 
                className="text-[#ff0000] relative cursor-pointer uppercase alpha font-bold text-2xl md:text-4xl"
                style={{
                    transform: `translateZ(${-(Math.floor(Math.random()*3) * 100)}px) translateY(${Math.floor(Math.random()*3) *2}px)`,
                    display: 'inline-block',
                }}
            >
                {e}
            </span>
))}
    </span>
 )
}

export default Brand
