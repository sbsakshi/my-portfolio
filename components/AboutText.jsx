"use client"
import React from 'react'
import { useRef,useEffect } from 'react';
import Image from 'next/image'
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger"

const AboutText = () => {
  const textRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);
  return (
    <div className='relative transform -translate-y-1/2 m-16'>

      {/* Flex container to align text and image side by side */}
      <div className='flex gap-4 items-center'>

        {/* Text Block */}
        <div className="whitespace-pre-wrap w-2/3 font-[TypewriterFont] text-[18px] text-gray-300"       
        ref={textRef}
        >
          {`/**
 * About me
 * 
 * Currently in my 2nd year of Computer Science at State University,
 * where I'm diving deep into data structures and algorithms.
 * 
 * I've completed several course projects including a basic web app
 * using React and a simple database system with SQL.
 * 
 * Actively involved in the campus coding club and recently started
 * an internship where I'm gaining hands-on experience with front-end
 * development.
 * 
 * When I'm not coding, you can find me at the campus gym or exploring
 * local coffee shops with my laptop, working on side projects.
 * 
 * Looking to connect with other students and professionals in the tech
 * industry as I continue to build my skills and portfolio.
 */`}
        </div>
        
        {/* Image Block - Adjust size as needed */}
        <div className="w-1/3">
          <Image 
            src="/assets/snippets.png" 
            alt="code snippets" 
            width={600}  // Set width manually
            height={827} // Set height manually
            className="object-contain z-10"
          />
        </div>

      </div>
      {/* <Image src='/assets/noise.png'  alt='noise' layout='fill' className='z-0 opacity-0.4'/> */}
       <Image src='/assets/blurs.png'  alt='noise' layout='fill' className='z-0 opacity-0.1 transorm translate-x-16'/>
    </div>
  )
}

export default AboutText
