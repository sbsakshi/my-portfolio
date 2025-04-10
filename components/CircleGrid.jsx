"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { Draggable } from "gsap/Draggable"

gsap.registerPlugin(Draggable)

export default function CircleGrid() {
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
  })


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
