import React, { useState } from 'react'
import gsap from 'gsap'
import { useEffect,useRef } from 'react'

const Game = () => {
    const ballRef=useRef(null)
    const div1=useRef();
    const div2=useRef();
    const div3=useRef();
    const div4=useRef();
    const [distance,setDistance]=useState(0);
    const[xPos,setxPos]=useState(0);


    useEffect(()=>{
        const t1=gsap.timeline({ repeat: -1 });
        const ball=ballRef.current;
        const x1=div1.current.offsetLeft;
        const x2=div2.current.offsetLeft;
        console.log(x2-x1);
        
        t1.set(ball,{x:x1})
        .fromTo(ball,
            { x: x1 },
            {
                x:x1+(x2-x1)/2,
                duration:1
            }
        )
        .to(ball,
            {
                y:-34,
                duration:1
            }
        )
        .to(ball,
            {    
                x: x2+(x2-x1)/2,
                duration:1
            }
        )
        .to(ball,
            {
                y:6,
                duration:1
            }
        )
        .to(ball,
            {
                x: x2 + 1.5*(x2 - x1),
                duration:1
            }
        )
        .to(ball,
            {
                y:-34,
                duration:1
            }
        )
        
    }
    ,[])

    useEffect(()=>{
       
        const div11=div1.current;
        const div22=div2.current;
        const div33=div3.current;
        const div44=div4.current;

      const t2=gsap.timeline();
      t2.to(
        div1,{
        }
      )

    },[])

    console.log(xPos)

  return (
    <div>
    <div className="relative w-full h-full p-4 flex justify-end items-start">
  <div ref={div1} className="bg-black w-1 h-8 mr-4" />
  <div ref={div2} className="bg-black w-1 h-8 mr-4 mt-4" />
  <div ref={div3} className="bg-black w-1 h-8 mr-4" />
  <div ref={div4} className="bg-black w-1 h-8 mr-4 mt-4" />
  
</div>
<div ref={ballRef} className={`bg-red-700 w-2 h-2 rounded-full absolute top-14 ` } />
</div>

  )
}

export default Game