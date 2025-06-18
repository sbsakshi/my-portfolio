"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default function GetInTouch() {
  const containerRef = useRef(null)
  const getInRef = useRef(null)
  const touchRef = useRef(null)
  const starRef = useRef(null)
  const footerRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

    tl.fromTo(getInRef.current, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 1 })
      .fromTo(touchRef.current, { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 1 }, "-=0.8")
      .fromTo(
        starRef.current,
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "elastic.out(1, 0.3)" },
        "-=0.5",
      )
     

    return () => {
      // Cleanup
      tl.kill()
    }
  }, [])

  return (
    <div ref={containerRef} className="min-h-screen w-full flex flex-col bg-[#fffdea] p-6 relative">
    
      <div className="flex-1 flex items-center justify-between px-8 md:px-16">
        <div ref={getInRef} className="text-black text-5xl md:text-7xl font-light">
          GET IN
        </div>
        <div ref={touchRef} className="text-black text-6xl md:text-8xl font-bold">
          TOUCH
        </div>
      </div>

      <div ref={starRef} className="absolute bottom-32 right-8 text-black text-5xl">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 0V40M0 20H40M5.86 5.86L34.14 34.14M34.14 5.86L5.86 34.14" stroke="black" strokeWidth="2" />
        </svg>
      </div>

      <footer ref={footerRef} className="w-full py-8 mt-auto border-t border-black/10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="text-black text-xs">
            <p>EMAIL: sakshi.sb2006@.COM</p>
            <p className="mt-1">LOCATION: chennai,Tamil Nadu</p>
          </div>
          <div className="text-black text-xs opacity-70">
            <p>© 2023 ALL RIGHTS RESERVED</p>
            <p className="mt-1">PRIVACY POLICY • TERMS OF SERVICE</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

