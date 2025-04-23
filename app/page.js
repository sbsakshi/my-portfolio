"use client"

import { useRef, useEffect, useState } from "react"
import gsap from "gsap"
import { useRouter } from "next/navigation"
import Game from "@/components/Game"

export default function Home() {
  const router = useRouter()

  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [resourcesLoaded, setResourcesLoaded] = useState(false)

  const textRef = useRef(null)
  const boxRef = useRef(null)
  const boxRef2 = useRef(null)
  const text = useRef(null)
  const button = useRef(null)

  // Resource loading tracker
  useEffect(() => {
    let domReady = false
    let fontsReady = false
    let imagesReady = false
    let scriptsReady = false

    const checkIfAllLoaded = () => {
      if (domReady && fontsReady && imagesReady && scriptsReady) {
        setResourcesLoaded(true)
      }
    }

    // DOM
    if (document.readyState === "interactive" || document.readyState === "complete") {
      domReady = true
      checkIfAllLoaded()
    } else {
      window.addEventListener("DOMContentLoaded", () => {
        domReady = true
        checkIfAllLoaded()
      })
    }

    // Fonts
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        fontsReady = true
        checkIfAllLoaded()
      })
    } else {
      setTimeout(() => {
        fontsReady = true
        checkIfAllLoaded()
      }, 500)
    }

    // Images & scripts
    window.addEventListener("load", () => {
      imagesReady = true
      scriptsReady = true
      checkIfAllLoaded()
    })
  }, [])

  // Animate count to 100 smoothly
  useEffect(() => {
    if (resourcesLoaded) {
      const timer = setInterval(() => {
        setCount((prev) => {
          if (prev >= 100) {
            clearInterval(timer)
            return 100
          }
          return prev + 1
        })
      }, 20)
    }
  }, [resourcesLoaded])

  // When count reaches 100, fade out preloader and show WELCOME
  useEffect(() => {
    if (count === 100 && loading) {
      gsap.to(".preloader", {
        opacity: 0,
        duration: 1,
        onComplete: () => setLoading(false),
      })
    }
  }, [count, loading])

  // WELCOME animation and redirect
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
  }, [loading])

  return (
    <section className="bg-purple-100 w-full h-screen text-black font-extrabold whitespace-nowrap overflow-x-hidden relative">
      <Game />

      <div>
        <div
          className="shiny-border z-10 absolute h-30 w-[20%] left-1/2 -translate-x-1/2 rounded-full text-white flex items-center justify-center flex-row shadow-[0_4px_10px_rgba(255,255,255,0.3)] hover:brightness-125 active:brightness-90 transition-all"
          ref={button}
        >
          {loading ? (
            <div className="preloader font-inconsolata absolute inset-0 flex items-center justify-center text-white font-bold transition-opacity duration-500 z-[99]">
              <h1 className="p-4">Loading </h1>
              {count}%
              <div ref={boxRef2} className="bg-white w-2 h-4 ml-2" />
            </div>
          ) : (
            <>
              <h1 className="p-2 font-4xl font-inconsolata font-bold" ref={text}>
                WELCOME
              </h1>
              <div ref={boxRef} className="bg-white w-2 h-4" />
            </>
          )}
        </div>
      </div>

      <h1 ref={textRef} className="absolute top-1/2 -translate-y-1/2 z-1 text-7xl font-bebas">
        A CREATIVE DESIGNER DEVELOPER . A CREATIVE DESIGNER DEVELOPER . A CREATIVE DESIGNER DEVELOPER
      </h1>
    </section>
  )
}
