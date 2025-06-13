import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
const Heroic = () => {
    
    const [index,sindex] = useState(0)
    useEffect(()=>{
        gsap.from('.cornerimage',{
            y:-100,
            
            duration:1.2
        })
    },[index])
    const heroicContent = [
        {
            category:'Veggie',
             corner:'peperonicorner.png',
            pizza:'veggie.png',
            back:'VEGGIEbg.png'
        },
        {
            category:'italian',
            corner:'italiancorner.png',
            pizza:'italian.png',
            back:'italianbg.png'
        },
         {
            category:'peproni',
            corner:'tomato.png',
           
            pizza:'peperoni.png',
            back:'pepperonibg.png'
        }
    ]
const getPositionStyle = (pos) => {
   
    if (pos === index) {
        return {
            left: '50%',
            transform: 'translate(-50%, -50%) ',
            zIndex: 2,
            width: '32vw',
            minWidth: 220,
            top: '50%',
           
            cursor: 'default'
        }
    }
    if (pos === (index+1)%3) {
        return {
            left: '0%',
            transform: 'translateY(-50%) scale(0.8)',
            zIndex: 1,
            width: '18vw',
            minWidth: 120,
            top: '50%',
           
            cursor: 'pointer'
        }
    }
    if (pos ===(index+2)%3) {
        return {
            right: '0px',
            transform: 'translateY(60%) scale(0.8)',
            zIndex: 1,
            width: '18vw',
            minWidth: 120,
           origin:'center',
            filter: 'blur(1px) grayscale(0.3)',
            cursor: 'pointer',
        }
    }
    return { display: 'none' }
}

const imgRefs = [useRef(null), useRef(null), useRef(null)]

let transition = false;

const handleImageClick = (pos) => {
    if (pos === index) return
    if(transition) return
     imgRefs.forEach((ref, i) => {
        if (ref.current) {
            let realpos =pos;
            if(pos === i) realpos =index;
            if(i===index){
             realpos = 0^1^2^pos^index
            }
           
            gsap.to(ref.current, {
                ...getPositionStyle(realpos),
                duration: 0.7,
                ease:'sine.in',
                onStart:()=>{
                    transition = true;
                },
                onComplete:()=>{
                    transition = false;
                }
            })
        }
    })
    setTimeout(()=>{
        sindex(pos)
    },0)
}

return (
    <div
        style={{
            width: '100vw',
            height: '100vh',
            backgroundImage: `url(/heroic/${heroicContent[index].back})`,
            backgroundSize: '100% 95%',
            backgroundPosition: 'center',
            position: 'relative',
            transition:'background 0.3s ease-in'
        }}
        className="w-screen relative h-screen"
    >
        <div className='absolute w-[20vw] opacity-75 min-w-[120px]  top-20 object-cover overflow-hidden  left-10'>
            <img className='w-full min-h-[60px] object-cover cornerimage' src={`/heroic/${heroicContent[index].corner}`} alt="" />
        </div>
        <div className='text-[max(10vw,60px)] text-white origin-center Navfont m-auto pt-50 md:pt-30 h-fit overflow-hidden text-center font-extrabold'><span>{heroicContent[index].category.toUpperCase()}</span></div>
        <div className='flex w-screen absolute top-0 h-screen overflow-hidden items-center justify-center '>
            {[ 0, 1, 2 ].map((pos, i) => {
                // Calculate the correct index for left, center, right
               
                return (
                    <img
                        key={i}
                        ref={imgRefs[i]}
                        src={`/heroic/${heroicContent[i].pizza}`}
                        alt={heroicContent[i].category}
                        style={{
                            position: 'absolute',
                          
                            ...getPositionStyle(pos),
                        }}
                        onClick={() => handleImageClick(pos)}
                        className={`${i==index?'':'sides'}`}
                        draggable={false}
                    />
                )
            })}
        </div>
    </div>
)
}

export default Heroic
