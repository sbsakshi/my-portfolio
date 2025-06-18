"use client"
import { Anton } from "next/font/google";
import { useState,useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const anton = Anton({ weight: "400", subsets: ["latin"], display: "swap" });


const Interest = () => {
    let [index,setIndex]=useState(-1);
    const topicRefs=useRef([]);

 

    const topics = [
        "UI/UX Design", 
        "Frontend Development", 
        "Full-Stack Development", 
        "Web Animations", 
        "API Development", 
        "Next.js & React",  
        "Game-Inspired Interfaces", 
        "Web Accessibility",  
        "Web3",
        "Blockchain",
        "Artificial Intelligence",
        "Dessert 🍰"
      ];
      
      
      useGSAP(() => {
        topics.forEach((_, i) => {
          gsap.to(topicRefs.current[i], {
            scrollTrigger: {
              trigger: topicRefs.current[i],
              start: "top 33%",
              end: "top 35%",
              onEnter: () => setIndex(i),
              onEnterBack: () => setIndex(i),
              toggleActions: "play none none reverse",
            },
            opacity: 1,
            scale:1.2,
            duration: 0.8,
          });
        });
      }, []);

  return (
    <div className="relative flex justify-center pt-52 max-w-screen-md w-full  left-1/2 mr-8
  ">
      <Image src="/assets/Noise.png" fill alt="noise" className='z-0 opacity-[0.15]'/>

    <div className={`${anton.className}  text-7xl text-black  sm:text-5xl md:text-7xl`}>
      <h1 className=' text-2xl  '>I'M ALWAYS INTERSTED ABOUT</h1>
      {
        topics.map((item,i)=>(
            <h1 className={`opacity-40 ${i==index?"text-[#9c5030] ":""}`}
            ref={(el) => (topicRefs.current[i] = el)}
            key={i}>{item}</h1>
        ))
      }
    </div>
    </div>
  )

}
 

export default Interest

