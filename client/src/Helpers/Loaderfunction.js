import gsap from "gsap";
let t=-1;

const start=()=>{
    gsap.to('.loader',{
        transform:'translateY(0%)',
        duration:0.4,
        opacity:1,
        stagger:{
            from:'random',
            amount:'0.2'
        }
    })
}


const end=()=>{
    gsap.to('.loader',{
        transform:`translateY(${t *100}%)`,
        duration:0.4,
        opacity:0,
        stagger:{
            from:'center',
            amount:'0.2'
        },
       
    })
    t=-1*t
  
}


export {
    start,end
}