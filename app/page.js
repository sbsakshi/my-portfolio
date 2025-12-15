"use client"

import { useRef, useEffect, useState } from "react"
import gsap from "gsap"
import { useRouter } from "next/navigation"
import Game from "@/components/Game"

export default function Home() {
  const router = useRouter()

  // 1. Add mount state tracking
  const [isMounted, setIsMounted] = useState(false)
  
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [resourcesLoaded, setResourcesLoaded] = useState(false)

  // Types are fine here, as long as they aren't evaluated on the server
  const textRef = useRef(null)
  const boxRef = useRef(null)
  const boxRef2 = useRef(null)
  const text = useRef(null)
  const button = useRef(null)
  const preloaderRef = useRef(null)

  /* -----------------------------------------
     ENSURE CLIENT-ONLY RENDERING
  ------------------------------------------ */
  useEffect(() => {
    setIsMounted(true)
    setCount(0)
    setLoading(true)
    setResourcesLoaded(false)
  }, [])

  /* -----------------------------------------
     SIMULATE / TRACK SCREEN LOADING
  ------------------------------------------ */
  useEffect(() => {
    // Only run timeouts if mounted
    if (!isMounted) return

    const timeout = setTimeout(() => {
      setResourcesLoaded(true)
    }, 800) 

    return () => clearTimeout(timeout)
  }, [isMounted])

  /* -----------------------------------------
     COUNT UP TO 100
  ------------------------------------------ */
  useEffect(() => {
    if (!resourcesLoaded || !isMounted) return

    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          return 100
        }
        return prev + 1
      })
    }, 20)

    return () => clearInterval(timer)
  }, [resourcesLoaded, isMounted])

  /* -----------------------------------------
     FADE OUT PRELOADER
  ------------------------------------------ */
  useEffect(() => {
    if (count === 100 && loading && preloaderRef.current) {
      gsap.to(preloaderRef.current, {
        opacity: 0,
        duration: 1,
        onComplete: () => setLoading(false),
      })
    }
  }, [count, loading])

  /* -----------------------------------------
     WELCOME ANIMATION + REDIRECT
  ------------------------------------------ */
  useEffect(() => {
    if (!loading && textRef.current && boxRef.current && text.current) {
      const marquee = textRef.current
      const width = marquee.scrollWidth / 2
      const box = boxRef.current
      const welcomeText = text.current
      const welcomeWidth = welcomeText.offsetWidth

      gsap.set(welcomeText, { opacity: 0 })

      gsap.to(marquee, {
        x: `-${width}px`,
        duration: 15,
        ease: "linear",
        repeat: -1,
      })

      gsap.to(box, {
        x: -welcomeWidth - 2,
        duration: 2,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.to(welcomeText, {
            opacity: 1,
            duration: 0.1,
            onComplete: () => {
              setTimeout(() => {
                router.push("/home")
              }, 2000)
            },
          })
        },
      })
    }
  }, [loading, router])

  // 2. Prevent Server Side Rendering of the DOM structure
  if (!isMounted) {
    return null 
  }

  return (
    <section className="bg-purple-100 w-full h-screen text-black font-extrabold whitespace-nowrap overflow-x-hidden relative">
      <Game />

      <div>
        <div
          ref={button}
          className="shiny-border z-10 absolute h-30 w-[20%] left-1/2 -translate-x-1/2 rounded-full text-white flex items-center justify-center shadow-[0_4px_10px_rgba(255,255,255,0.3)]"
        >
          {loading ? (
            <div
              ref={preloaderRef}
              className="font-inconsolata absolute inset-0 flex items-center justify-center text-white font-bold z-[99]"
            >
              <h1 className="p-4">Loading</h1>
              {count}%
              <div ref={boxRef2} className="bg-white w-2 h-4 ml-2" />
            </div>
          ) : (
            <>
              <h1 ref={text} className="p-2 font-inconsolata text-2xl text-white font-bold">
                WELCOME
              </h1>
              <div ref={boxRef} className="bg-white w-2 h-4" />
            </>
          )}
        </div>
      </div>

      <h1
        ref={textRef}
        className="absolute top-1/2 -translate-y-1/2 text-7xl font-bebas"
      >
        A CREATIVE DESIGNER DEVELOPER . A CREATIVE DESIGNER DEVELOPER . A CREATIVE
        DESIGNER DEVELOPER
      </h1>
    </section>
  )
}