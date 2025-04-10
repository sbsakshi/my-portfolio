"use client"

import React from "react";
import AboutText from "@/components/AboutText";
import TiltedImage from "@/components/TiltedImage";
import BallCluster from "@/components/Balls";
import Interest from "@/components/Interest";
import ProjectsSection from "@/components/projectSection";
import Footer from "@/components/Footer";
import Testimonials from "@/components/Testimonials";
import GetInTouch from "@/components/touch";
import Image from "next/image";
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

const Curtain=()=> {
  const sectionRef = useRef(null)
  const curtainsRef = useRef([])

  useEffect(() => {
    if (typeof window === "undefined") return

    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const section = sectionRef.current
      const curtains = curtainsRef.current.filter(Boolean)

      if (!section || curtains.length === 0) return

      // Set initial state
      gsap.set(curtains, { y: 0 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top bottom-=100",
          end: "top top",
          scrub: 1,
          markers: false,
          invalidateOnRefresh: true,
        },
      })

      // Animate curtains in sequence
      curtains.forEach((curtain, i) => {
        const delay = i * 0.05
        tl.to(
          curtain,
          {
            y: "-100%",
            duration: 0.8,
            ease: "power2.inOut",
          },
          delay,
        )
      })
    })

    return () => ctx.revert()
  }, [])

  // Create 5 curtain panels
  const renderCurtains = () => {
    const curtains = []
    const count = 8

    for (let i = 0; i < count; i++) {
      curtains.push(
        <div
          key={i}
          ref={(el) => (curtainsRef.current[i] = el)}
          className="absolute top-0 bg-black"
          style={{
            left: `${i * (100 / count)}%`,
            width: `${100 / count}%`,
            height: "100%",
          }}
        />,
      )
    }

    return curtains
  }

  return (
    <div className="relative">
      <div className="h-[80vh] bg-black" />

      <div ref={sectionRef} className="relative h-screen">
        {renderCurtains()}

        <div className="bg-[#fffdea] text-black h-500vh overflow-x-hidden">
      <div className="flex flex-col"></div>
      <div className="z-100">
        <Interest />
        <div className="mt-16">
          <GetInTouch />
          <Footer />
        </div>
      </div>
    </div>       
     </div>
    </div>
  )
}

export default Curtain;