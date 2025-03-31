"use client"
import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/all"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger)

const TiltedImage= () => {
  const imageContainerRef = useRef(null)
  const imageRef = useRef(null)
  const sectionRef = useRef(null)

  // Track mouse position for tilt effect
  const handleMouseMove = (e) => {
    if (!imageContainerRef.current || !imageRef.current) return

    // Get the current scroll progress to adjust tilt sensitivity
    const scrollProgress = ScrollTrigger.getAll().find((st) => st.vars.trigger === sectionRef.current)?.progress || 0
    const tiltFactor = 1 - Math.min(scrollProgress * 1.5, 1)

    // Get container dimensions and position
    const rect = imageContainerRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    // Calculate normalized mouse position (-1 to 1)
    const mouseX = ((e.clientX - centerX) / (rect.width / 2)) * tiltFactor
    const mouseY = ((e.clientY - centerY) / (rect.height / 2)) * tiltFactor

    // Apply tilt with GSAP
    gsap.to(imageRef.current, {
      rotationY: mouseX * 15, // More tilt
      rotationX: -mouseY * 15,
      transformPerspective: 1200,
      duration: 0.5,
      ease: "power2.out",
      overwrite: "auto",
    })
  }

  // Reset tilt when mouse leaves
  const handleMouseLeave = () => {
    if (!imageRef.current) return

    gsap.to(imageRef.current, {
      rotationY: 0,
      rotationX: 0,
      duration: 0.5,
      ease: "power2.out",
    })
  }

  useGSAP(() => {
    gsap.set(imageRef.current, {
      transformPerspective: 1200,
      transformOrigin: "center center",
      rotateX: -10, // Initial tilt
      rotateY: 10,
      boxShadow: "10px 20px 50px rgba(0, 0, 0, 0.3)", // Added depth effect
    })

    // Scroll animation
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=1000",
        scrub: 0.5,
        pin: true,
        pinSpacing: true, // Prevent extra spacing issues
        markers: false, // Set to true for debugging
      },
    })

    clipAnimation
      .to(imageContainerRef.current, {
        width: "100vw",
        height: "100vh",
        borderRadius: 0,
        top: "50%", // Stick to top after animation
        left: "50%",
        x: "-50%",
        y: "-50%",
        margin:0,
        duration: 1,
      })
      .to(
        imageRef.current,
        {
          rotationY: 0,
          rotationX: 0,
          boxShadow: "none", // Remove shadow when full screen
          duration: 0.5,
          margin:0,
          onComplete: () => {
            gsap.to(sectionRef.current, {
              backgroundColor: "#000",
              duration: 1,
              ease: "power2.out",
            })
          }
        },
        "<",
      )
  }, [])

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div id="about" className="min-h-screen w-full overflow-hidden  bg-[#fffdea] text-black" ref={sectionRef}>
      <div className="flex flex-col items-center gap-5 pt-32 pb-16">
        <h2 className="text-sm uppercase md:text-[10px]">Welcome to Sakshi's Universe</h2>

        <h1></h1>
        <div className="mt-5 text-center text-4xl uppercase leading-[0.8] md:text-[6rem]">
          DISCOVER
          <br />
          THROUGH MY EYES
        </div>

        {/* Image container */}
        <div
          ref={imageContainerRef}
          className="mask-clip-path relative mx-auto mt-16 h-[60vh] w-96 overflow-hidden rounded-3xl md:w-[30vw] shadow-xl"
          onMouseLeave={handleMouseLeave}
        >
          <div ref={imageRef} className="w-full h-full">
            <img src="/assets/girl.jpg" alt="girl" className="h-full w-full object-cover" />
          </div>
        </div>

        <div className="mt-8 max-w-96 text-center font-circular-web text-lg md:max-w-[34rem]">
          <p>The Game of Game begins—your life</p>
        </div>
      </div>
    </div>
  )
}

export default TiltedImage
