"use client"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import Script from "next/script"


export default function TiltImage() {
  const containerRef = useRef(null)
  const imageRef = useRef(null)
  const [isGsapReady, setIsGsapReady] = useState(false)

  // Handle GSAP scripts loaded
  const handleGsapLoad = () => {
    setIsGsapReady(true)
  }

  useEffect(() => {
    // Only run this effect when GSAP is ready and we're on the client
    if (!isGsapReady || typeof window === "undefined") return

    // Access GSAP from window
    const gsap = window.gsap
    const ScrollTrigger = window.ScrollTrigger

    if (!gsap || !ScrollTrigger) {
      console.error("GSAP or ScrollTrigger not found on window")
      return
    }

    // Set initial tilt
    gsap.set(imageRef.current, {
      rotationX: 5,
      rotationY: -15,
      scale: 0.8,
      transformPerspective: 1000,
      transformOrigin: "center center",
    })

    // Create a timeline for scroll effects
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=1000", // Explicit scroll distance for reliability
        pin: true, // Pin the element during scroll
        pinSpacing: true,
        scrub: 1, // Smooth scrubbing effect
        markers: false, // Set to true for debugging
      },
    })

    // Add animations to the scroll timeline
    scrollTl
      .to(imageRef.current, {
        rotationX: 0,
        rotationY: 0,
        scale: 1.5,
        duration: 1,
        ease: "power1.inOut",
      })
      // .to(
      //   containerRef.current,
      //   {
      //     position: "fixed",
      //     top: 0,
      //     left: 0,
      //     width: "100%",
      //     height: "100%",
      //     zIndex: 50,
      //     duration: 0.3,
      //   },
      //   ">-0.3",
      // ) // Overlap with previous animation
      .to(
        imageRef.current,
        {
          borderRadius: 0,
          duration: 0.3,
        },
        "<",
      ) // Start at same time as previous animation

    // Variable to control mouse sensitivity
    let mouseSensitivity = 1

    // Update mouse sensitivity based on scroll progress
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "+=1000",
      onUpdate: (self) => {
        // As we scroll more, reduce mouse sensitivity
        mouseSensitivity = 1 - self.progress
      },
    })

    // Mouse move handler
    const handleMouseMove = (e) => {
      if (!containerRef.current || !imageRef.current) return

      const rect = containerRef.current.getBoundingClientRect()

      // Calculate mouse position relative to center of container
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2

      // Apply tilt based on mouse position and sensitivity
      gsap.to(imageRef.current, {
        rotationY: 15 * x * mouseSensitivity,
        rotationX: -10 * y * mouseSensitivity,
        duration: 0.5,
        ease: "power2.out",
        overwrite: "auto", // Prevent animation queue buildup
      })
    }

    // Reset tilt when mouse leaves
    const handleMouseLeave = () => {
      if (!imageRef.current) return

      // Get current scroll progress
      const progress = ScrollTrigger.getAll()[0]?.progress || 0

      // Interpolate rotation based on scroll progress
      const rotX = gsap.utils.interpolate(5, 0, progress)
      const rotY = gsap.utils.interpolate(-15, 0, progress)

      // Animate back to default position
      // gsap.to(imageRef.current, {
      //   rotationX: rotX,
      //   rotationY: rotY,
      //   duration: 0.5,
      //   ease: "power2.out",
      // })
    }

    // Add event listeners
    window.addEventListener("mousemove", handleMouseMove)
    containerRef.current?.addEventListener("mouseleave", handleMouseLeave)

    // Cleanup function
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      containerRef.current?.removeEventListener("mouseleave", handleMouseLeave)

      // Clean up ScrollTrigger instances
      if (ScrollTrigger) {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      }

      // Kill the timeline
      if (scrollTl) {
        scrollTl.kill()
      }
    }
  }, [isGsapReady]) // Only run when GSAP is ready

  return (
    <>
      {/* Load GSAP from CDN */}
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"
        strategy="afterInteractive"
        onLoad={() => console.log("GSAP core loaded")}
      />
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"
        strategy="afterInteractive"
        onLoad={handleGsapLoad}
      />

      <div ref={containerRef} className="relative mx-auto h-[500px] w-full overflow-hidden">
        <div ref={imageRef} className="w-full h-full overflow-hidden rounded-lg shadow-2xl">
          <div className="relative w-full h-full">
            <Image
              src="/assets/girl.jpg"
              alt="Cyberpunk gaming setup with multiple monitors"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Loading indicator */}
        {!isGsapReady && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white">
            Loading animation...
          </div>
        )}
      </div>
    </>
  )
}

