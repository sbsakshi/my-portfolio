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
    title: 'Bookwise - Library Management System',
      description: 'Bookwise is a comprehensive library management system that streamlines the process of managing books, users, and transactions. It offers a user-friendly interface for both librarians and patrons, making it easy to search for books, check availability, and manage borrowing and returning processes.',
      subdesc:
        'Built with Next.js 14, Tailwind CSS, TypeScript, and Convex, Bookwise is designed for optimal performance and scalability.',
      href: 'https://github.com/sbsakshi/Bookwise',
      tags: ["FULL STACK", "DESIGN"],

    videoSrc: "/textures/project/project1.mp4",
  },
  {
    title: 'CascadingSpells - Game to learn CSS',
      description: 'cascadingSpells is an interactive game designed to teach users the fundamentals of CSS in a fun and engaging way. Players can explore various levels, each focusing on different CSS concepts, and complete challenges to progress through the game.',
      subdesc:
        'With a focus on gamification, cascadingSpells makes learning CSS enjoyable and effective, by using Next.js, Tailwind CSS, TypeScript, and Framer Motion.',
      href: 'https://cascadingspells.com/',
      texture: '/textures/project/project2.mp4',
    tags: ["AI", "DESIGN"],
    videoSrc: "/textures/project/project2.mp4",
  },
  {
    id: "03",
    title: 'Uterly-Women Health Platform',
      description: 'Uterly is a women’s health platform that provides personalized health insights and resources. It offers a user-friendly interface for tracking menstrual cycles, ovulation, and overall reproductive health.',
      subdesc:
        'With a focus on user experience, Uterly integrates complex forms and SMS notifications, by using Next.js, Appwrite, Twillio and Sentry that enhance operational workflows.',
      href: 'https://github.com/sbsakshi/Uterly',
    tags: ["UI/UX", "INTERACTION"],
    videoSrc: "/textures/project/project3.mp4",
  },
  {
    id: "04",
    title: 'Brainwave-Landing Page',
      description: 'Brainwave is a cutting-edge landing page designed to showcase the capabilities of AI in generating high-quality content. It features a sleek and modern design, with a focus on user experience and engagement.',
      subdesc:
      'Built with Next.js 14, Tailwind CSS, TypeScript, and Framer Motion, Brainwave is optimized for performance and user interaction.',
      href: 'https://github.com/sbsakshi/Brainwave',
    tags: ["CLOUD", "INFRASTRUCTURE"],
    videoSrc: "/textures/project/project4.mp4",
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

