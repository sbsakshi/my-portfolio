"use client"
import { useRef, useEffect, useState } from "react"
import gsap from "gsap"
import { useRouter } from "next/navigation"
import Game from "@/components/Game"

export default function Home() {
  const router = useRouter()

  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [resources, setResources] = useState({
    dom: false,
    fonts: false,
    images: false,
    scripts: false,
  })

  const textRef = useRef(null)
  const boxRef = useRef(null)
  const boxRef2 = useRef(null)
  const text = useRef(null)
  const button = useRef(null)

  const handleComplete = () => {
    gsap.to(button.current, {
      duration: 0.15,
      ease: "power2.out",
      onComplete: () => {
        setTimeout(() => {
          router.push("/home")
        }, 2000)
      },
    })
  }

  // Track actual loading progress
  useEffect(() => {
    // Track DOM content loaded
    if (document.readyState === "interactive" || document.readyState === "complete") {
      setResources((prev) => ({ ...prev, dom: true }))
    } else {
      const domLoadedHandler = () => {
        setResources((prev) => ({ ...prev, dom: true }))
      }
      document.addEventListener("DOMContentLoaded", domLoadedHandler)
      return () => document.removeEventListener("DOMContentLoaded", domLoadedHandler)
    }

    // Check when document is fully loaded (including images, styles, etc.)
    const loadHandler = () => {
      setResources((prev) => ({ ...prev, images: true }))
    }
    window.addEventListener("load", loadHandler)

    // Check font loading
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        setResources((prev) => ({ ...prev, fonts: true }))
      })
    } else {
      // Fallback if document.fonts is not supported
      setTimeout(() => {
        setResources((prev) => ({ ...prev, fonts: true }))
      }, 500)
    }

    // Check scripts loading (approximate)
    setTimeout(() => {
      setResources((prev) => ({ ...prev, scripts: true }))
    }, 300)

    return () => {
      window.removeEventListener("load", loadHandler)
    }
  }, [])

  // Calculate and update count based on resources loaded
  useEffect(() => {
    const resourcesArray = Object.values(resources)
    const loadedCount = resourcesArray.filter(Boolean).length
    const totalResources = resourcesArray.length
    const newCount = Math.floor((loadedCount / totalResources) * 100)

    if (newCount > count) {
      const incrementInterval = setInterval(() => {
        setCount((prevCount) => {
          if (prevCount >= newCount) {
            clearInterval(incrementInterval)
            return prevCount
          }
          return prevCount + 1
        })
      }, 20)

      return () => clearInterval(incrementInterval)
    }
  }, [resources, count])

  // Handle completion of loading
  useEffect(() => {
    const tl = gsap.timeline()

    // Track loading resources
    if (count < 100) {
      // Track DOM content loaded
      const domLoaded = document.readyState === "interactive" || document.readyState === "complete"

      // Track when document is fully loaded (including images)
      const loadHandler = () => {
        // Jump to 100% when everything is loaded
        setCount(100)
      }

      // Set up progress tracking
      let progress = 0

      // Start with some initial progress based on DOM state
      if (domLoaded) {
        progress += 30 // DOM is ready, that's 30% progress
      }

      // Listen for full page load
      window.addEventListener("load", loadHandler)

      // Check font loading for additional progress
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => {
          progress += 20
          setCount(Math.min(90, progress)) // Fonts loaded, add 20% more progress
        })
      }

      // Gradually increase the counter to show activity
      const timer = setInterval(() => {
        // Increment slowly until we reach our known progress
        // but never go beyond 95% until everything is confirmed loaded
        setCount((prevCount) => {
          if (prevCount >= 95) {
            clearInterval(timer)
            return prevCount
          }
          return Math.min(progress + 5, prevCount + 1)
        })
      }, 50)

      return () => {
        clearInterval(timer)
        window.removeEventListener("load", loadHandler)
      }
    } else if (count === 100 && loading) {
      tl.to(".preloader", {
        opacity: 0,
        duration: 1,
        onComplete: () => setLoading(false),
      }).from(boxRef2.current, {
        opacity: 0,
        repeat: -1,
        duration: 2,
        ease: "power2.inOut",
      })
    }
  }, [count, loading])

  // Marquee animation and box reveal animation
  useEffect(() => {
    if (!loading && textRef.current && boxRef.current && text.current) {
      const marquee = textRef.current
      const width = marquee.scrollWidth / 2
      const box = boxRef.current
      const welcomeText = text.current
      const welcomeWidth = welcomeText ? welcomeText.offsetWidth : 0

      gsap.set(text.current, { opacity: 0 })

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
          gsap.to(text.current, {
            opacity: 1,
            duration: 0.25,
            onComplete: handleComplete,
          })
        },
      })

      gsap.from(box, {
        opacity: 0,
        repeat: -1,
        duration: 2,
        ease: "power2.inOut",
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
