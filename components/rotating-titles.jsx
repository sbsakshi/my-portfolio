"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"

const titles = ["UI/UX Designer", "Frontend Developer", "Motion Designer", "Creative Coder", "Visual Artist"]

export default function RotatingTitles() {
  const containerRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (!containerRef.current) return

    const textContainer = containerRef.current

    const showTitle = (title) => {
      textContainer.innerHTML = title
        .split("")
        .map((char) => `<span class="inline-block opacity-0">${char}</span>`)
        .join("")

      const chars = textContainer.querySelectorAll("span")

      gsap.to(chars, {
        opacity: 1,
        y: 0,
        stagger: 0.05,
        ease: "power2.out",
        duration: 0.5,
      })
    }

    const scatterText = () => {
      const chars = textContainer.querySelectorAll("span")

      return gsap.to(chars, {
        opacity: 0,
        x: () => gsap.utils.random(-100, 100), // Random horizontal scatter
        y: () => gsap.utils.random(-100, 100), // Random vertical scatter
        rotation: () => gsap.utils.random(-90, 90), // Random rotation
        stagger: 0.05,
        ease: "power3.in",
        duration: 0.6,
      })
    }

    showTitle(titles[currentIndex])

    const interval = setInterval(() => {
      scatterText().then(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % titles.length)
        showTitle(titles[(currentIndex + 1) % titles.length])
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [currentIndex])

  return (
    <h1 ref={containerRef} className="font-bold h-[96px] inline-block relative overflow-hidden">
      {/* Text updates dynamically */}
    </h1>
  )
}
