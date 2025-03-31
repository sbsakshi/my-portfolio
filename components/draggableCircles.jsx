"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { Draggable } from "gsap/Draggable"

gsap.registerPlugin(Draggable)

export default function DraggableCircleGrid() {
  const rows = 6
  const cols = 10
  const containerRef = useRef(null)
  const circlesRef = useRef([])

  useEffect(() => {
    if (!containerRef.current) return

    // Store initial positions
    circlesRef.current.forEach((circle) => {
      if (!circle) return
      const rect = circle.getBoundingClientRect()
      circle.dataset.initialX = rect.left
      circle.dataset.initialY = rect.top
    })

    Draggable.create(circlesRef.current, {
      type: "x,y",
      onRelease() {
        // Animate back to initial position
        gsap.to(this.target, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        })
      },
    })
  }, [])

  return (
    <div className=" flex items-center justify-center">
      <div
        ref={containerRef}
        className="grid gap-2"
        style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
      >
        {Array.from({ length: rows * cols }).map((_, index) => (
          <div
            key={index}
            ref={(el) => (circlesRef.current[index] = el)}
            className="w-6 h-6 bg-[#A17E50] rounded-full cursor-pointer opacity-[0.26]"
          ></div>
        ))}
      </div>
    </div>
  )
}
