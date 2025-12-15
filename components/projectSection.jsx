"use client"

import { useEffect, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import ProjectCard from "./project-card"
import { Playfair_Display } from "next/font/google"

const playfair = Playfair_Display({ subsets: ["latin"] })

const projects = [
  {
  id: "01",
  title: "GSAP Cocktail Website",
  description:
    "A visually rich, scroll-driven cocktail website built to showcase smooth animations and immersive user interactions.",
  subdesc:
    "Implemented advanced GSAP animations including scroll-triggered effects, parallax scrolling, pinned sections, scroll-synced video playback, and custom animated carousels using React and Tailwind CSS.",
  href: "https://cocktails-landing-beta.vercel.app/",
  tags: ["GSAP", "Frontend", "Animations", "React"],
  imgSrc: "/textures/project/cocktails.png",
},
  
    {
    id: "02",
    title: "Bookwise - Library Management System",
    description:
      "Bookwise is a comprehensive library management system that streamlines the process of managing books, users, and transactions. It offers a user-friendly interface for both librarians and patrons.",
    subdesc:
      "Built with Next.js 14, Tailwind CSS, TypeScript, and Convex, Bookwise is designed for optimal performance and scalability.",
    href: "https://github.com/sbsakshi/Bookwise",
    tags: ["FULL STACK", "DESIGN"],
    imgSrc: "/textures/project/bookwise.png",
  },
      {
    id: "03",
    title: "Hero Section Redesigns",
    description:
      "Redesigned hero sections of multiple websites to improve first impressions, visual hierarchy, and user engagement.",
    subdesc:
      "Analyzed existing designs for usability and clarity, then applied modern UI/UX principles like contrast, typography, and whitespace. Delivered high-fidelity mockups in Figma.",
    href: "https://www.figma.com/design/PpBRrRvqUThAXzMkMMUPJ1/hero-sections?node-id=7195-2&t=GzLQAiMyRuVe9iP6-1",
    tags: ["UI/UX", "CASE STUDY", "REDESIGN"],
    imgSrc: "/textures/project/heroSections.png",
  },
    {
    id: "04",
    title: "CascadingSpells - Game to learn CSS",
    description:
      "CascadingSpells is an interactive game designed to teach users the fundamentals of CSS in a fun and engaging way.",
    subdesc:
      "With a focus on gamification, CascadingSpells makes learning CSS enjoyable and effective, built with Next.js, Tailwind CSS, TypeScript, and Framer Motion.",
    href: "https://cascadingspells.com/",
    tags: ["AI", "DESIGN"],
    imgSrc: "/textures/project/carvo.png",
  },
  {
    id: "05",
    title: "Veil VPN: Mobile App Prototype",
    description:
      "An end-to-end VPN mobile app prototype designed with a focus on security, ease of use, and modern UI aesthetics.",
    subdesc:
      "Built a complete interactive prototype in Figma with flows for onboarding, login, server selection, subscriptions, and settings. Integrated micro-interactions and a scalable design system.",
    href: "https://www.figma.com/design/WrIw5ym6FWf4sPBlQVuKmn/VeilVPN?node-id=0-1&p=f&t=OeJaKFHlkkdhNOyI-0",
    tags: ["UI/UX", "MOBILE APP", "PROTOTYPE"],
    imgSrc: "/textures/project/veilVPN.png",
  },
  {
    id: "06",
    title: "Brainwave - Landing Page",
    description:
      "Brainwave is a cutting-edge landing page designed to showcase the capabilities of AI in generating high-quality content.",
    subdesc:
      "Built with Next.js 14, Tailwind CSS, TypeScript, and Framer Motion, Brainwave is optimized for performance and user interaction.",
    href: "https://github.com/sbsakshi/Brainwave",
    tags: ["CLOUD", "INFRASTRUCTURE"],
    imgSrc: "/textures/project/brainwave.png",
  },
]

export default function ProjectsSection() {
  const [activeProject, setActiveProject] = useState(0)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const projectElements = document.querySelectorAll(".project-card")

    projectElements.forEach((project, index) => {
      ScrollTrigger.create({
        trigger: project,
        start: "top 40%",
        end: "bottom 40%",
        onEnter: () => setActiveProject(index),
        onEnterBack: () => setActiveProject(index),
        markers: false,
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section className="relative">
      <div className="top-0 left-0 right-0 z-10 py-12 px-8 md:px-16 bg-opacity-90 backdrop-blur-sm">
        <h1
          className={`${playfair.className} text-4xl md:text-6xl lg:text-8xl font-light`}
        >
          SELECTED WORKS /{" "}
          <span className="text-gray-400">({projects.length})</span>
        </h1>
      </div>

      <div className="pt-48">
        {projects.map((project, index) => (
          <div key={project.id} className="relative">
            <div className="absolute left-8 md:left-16 top-1/2 transform -translate-y-1/2 z-10 opacity-20">
              <div
                className={`${playfair.className} text-[12rem] md:text-[20rem] lg:text-[30rem] font-light leading-none transition-opacity duration-500 ${
                  activeProject === index ? "opacity-100" : "opacity-0"
                }`}
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
