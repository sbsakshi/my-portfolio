"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Playfair_Display, Inter } from "next/font/google"
import { useRouter } from "next/navigation"
import Image from "next/image"

const playfair = Playfair_Display({ subsets: ["latin"] })
const inter = Inter({ subsets: ["latin"] })

export default function ProjectCard({ project, isActive }) {
  const cardRef = useRef(null)
  const videoRef = useRef(null)
  const contentRef = useRef(null)
  const router = useRouter()

  useEffect(() => {
    if (isActive && contentRef.current) {
      gsap.to(contentRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      })
    } else if (contentRef.current) {
      gsap.to(contentRef.current, {
        opacity: 0.7,
        y: 20,
        duration: 0.8,
        ease: "power2.out",
      })
    }
  }, [isActive])

  const handleClick = () => {
    if (project.href) {
      router.push(project.href)
    }
  }

  return (
    <div
      ref={cardRef}
      className={`project-card min-h-screen py-24 px-8 md:px-16 ${isActive ? "active" : ""} flex cursor-pointer`}
      onClick={handleClick}
    >
      <div className="ml-auto w-full md:w-3/5 lg:w-1/2" ref={contentRef}>
        <div className="relative w-full aspect-video bg-gray-900 rounded-lg overflow-hidden mb-12">
          {/* <video ref={videoRef} className="w-full h-full object-cover" src={project.videoSrc} muted playsInline loop /> */}
          <Image src={project.imgSrc} className="w-full h-full object-cover" fill={true} />
        </div>

        <div className="mt-8">
          <div className={`text-sm text-gray-400 ${inter.className}`}>{project.category}</div>
          <h2 className={`${playfair.className} text-4xl md:text-5xl lg:text-6xl font-medium mt-2`}>{project.title}</h2>
          <p className={`mt-8 text-gray-300 text-lg leading-relaxed max-w-2xl ${inter.className}`}>
            {project.description}
          </p>
          <p className={`mt-8 text-gray-300 text-lg leading-relaxed max-w-2xl ${inter.className}`}>
            {project.subdesc}
          </p>
          <div className="flex flex-wrap gap-3 mt-12">
            {project.tags.map((tag) => (
              <span key={tag} className={`border border-gray-700 rounded-full px-5 py-2 text-sm ${inter.className}`}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
