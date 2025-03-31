"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import ProjectCard from "./project-card"
import { Playfair_Display } from "next/font/google"

const playfair = Playfair_Display({ subsets: ["latin"] })

// Define our project data
const projects = [
  {
    id: "01",
    title: 'Podcastr - AI Podcast Platform',
    category: "AI & WEB DEVELOPMENT",
    description:
    'Podcastr is a revolutionary Software-as-a-Service platform that transforms the way podcasts are created. With advanced AI-powered features like text-to-multiple-voices functionality, it allows creators to generate diverse voiceovers from a single text input.',
    year: "2024",
    tags: ["DESIGN", "DEVELOPMENT","AI"],
    videoSrc: "/textures/project/project1.mp4",
  },
  {
    id: "02",
    title: "LIVEDOC™",
    category: "WEB DEVELOPMENT",
    description:
      'LiveDoc is a powerful collaborative app that elevates the capabilities of real-time document editing. As an enhanced version of Google Docs, It supports millions of collaborators simultaneously, ensuring that every change is captured instantly and accurately.',
    year: "2024",
    tags: ["AI", "DESIGN"],
    videoSrc: "/textures/project/project2.mp4",
  },
  {
    id: "03",
    title: 'CarePulse ',
    category: "UI/UX Design",
    description:
     'An innovative healthcare platform designed to streamline essential medical processes. It simplifies patient registration, appointment scheduling, and medical record management, providing a seamless experience for both healthcare providers and patients.',
    year: "2023",
    tags: ["UI/UX", "INTERACTION"],
    videoSrc: "/textures/project/project3.mp4",
  },
  {
    id: "04",
    title: 'Horizon - Online Banking Platform',
    category: "Software Development",
    description:
    'Horizon is a comprehensive online banking platform that offers users a centralized finance management dashboard. It allows users to connect multiple bank accounts, monitor real-time transactions, and seamlessly transfer money to other users.',
    year: "2023",
    tags: ["CLOUD", "INFRASTRUCTURE"],
    videoSrc: "/textures/project/project4.mp4",
  },
  {
    id: "05",
    title: "Imaginify ",
    category: "AI",
    description:
    'An innovative healthcare platform designed to streamline essential medical processes. It simplifies patient registration, appointment scheduling, and medical record management, providing a seamless experience for both healthcare providers and patients.',
    
    year: "2022",
    tags: ["AI", "HEALTHCARE"],
    videoSrc: "/textures/project/project5.mp4",
  },
]

export default function ProjectsSection() {
  const [activeProject, setActiveProject] = useState(0)

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger)

    // Create scroll triggers for each project
    const projectElements = document.querySelectorAll(".project-card")

    projectElements.forEach((project, index) => {
      // Create scroll trigger for each project
      ScrollTrigger.create({
        trigger: project,
        start: "top 40%",
        end: "bottom 40%",
        onEnter: () => setActiveProject(index),
        onEnterBack: () => setActiveProject(index),
        markers: false,
      })

      // Create scroll trigger for video playback
      const video = project.querySelector("video")
      if (video) {
        ScrollTrigger.create({
          trigger: project,
          start: "top 70%",
          end: "bottom 30%",
          onEnter: () => {
            if (video instanceof HTMLVideoElement) {
              video.play()
            }
          },
          onLeave: () => {
            if (video instanceof HTMLVideoElement) {
              video.pause()
            }
          },
          onEnterBack: () => {
            if (video instanceof HTMLVideoElement) {
              video.play()
            }
          },
          onLeaveBack: () => {
            if (video instanceof HTMLVideoElement) {
              video.pause()
            }
          },
          markers: false,
        })
      }
    })

    return () => {
      // Clean up all scroll triggers when component unmounts
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section className="relative">
      <div className=" top-0 left-0 right-0 z-10 py-12 px-8 md:px-16 bg-opacity-90 backdrop-blur-sm">
        <h1 className={`${playfair.className} text-4xl md:text-6xl lg:text-8xl font-light`}>
          SELECTED WORKS / <span className="text-gray-400">({projects.length})</span>
        </h1>
      </div>

      <div className="pt-48">
        {projects.map((project, index) => (
          <div key={project.id} className="relative">
            <div className="absolute left-8 md:left-16 top-1/2 transform -translate-y-1/2 z-10 opacity-20">
              <div
                className={`${playfair.className} text-[12rem] md:text-[20rem] lg:text-[30rem] font-light leading-none transition-opacity duration-500 ${activeProject === index ? "opacity-100" : "opacity-0"}`}
              >
                {project.id}
              </div>
            </div>

            <ProjectCard project={project} isActive={index === activeProject} />
          </div>
        ))}
      </div>

      
    </section>
  )
}

