"use client";

import { useEffect, useRef, useState } from "react";
// import Cursor from "@/components/cursor"
import Socials from "@/components/Socials";
import Navbar from "@/components/Navbar";
import RotatingTitles from "@/components/rotating-titles";
import ScrollIndicator from "@/components/ScrollIndicator";
import gsap from "gsap";
import Link from "next/link";
import AboutText from "@/components/AboutText";
import TiltedImage from "@/components/TiltedImage";
import BallCluster from "@/components/Balls";
import Interest from "@/components/Interest";
import Image from "next/image";
import ProjectsSection from '@/components/projectSection'
import Test from '@/components/Test'
// import Testimonials from '@/components/Testimonials'
import { ArrowUpLeft } from 'lucide-react';
import DraggableCircleGrid from "@/components/draggableCircles";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";


const page=()=> {
  const nameRef = useRef(null);
  const paragraphRef = useRef(null);
  const containerRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    gsap.set([nameRef.current, paragraphRef.current], {
      filter: "blur(5px)",
      opacity: 0.7,
    });

    const nameElement = nameRef.current;
    const paragraphElement = paragraphRef.current;

    const handleNameHover = () => {
      gsap.to(nameElement, {
        filter: "blur(0px)",
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    const handleParagraphHover = () => {
      gsap.to(paragraphElement, {
        filter: "blur(0px)",
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    if (nameElement) {
      nameElement.addEventListener("mouseenter", handleNameHover);
    }

    if (paragraphElement) {
      paragraphElement.addEventListener("mouseenter", handleParagraphHover);
    }

    return () => {
      if (nameElement) {
        nameElement.removeEventListener("mouseenter", handleNameHover);
      }
      if (paragraphElement) {
        paragraphElement.removeEventListener(
          "mouseenter",
          handleParagraphHover
        );
      }
    };
  }, []);

  return (
    <>
      <div className=" flex flex-col justify-between relative bg-[#fffdea] text-black transition-all duration-300  h-dvh">
        <Navbar />
        <div className="top-0 right-0 absolute z-10  "> 
        <DraggableCircleGrid/>
        {/* <div className="inline-flex  items-center space-x-2 ">
    <ArrowUpLeft className="w-6 h-6" stroke="black" />
    <h2 className="italic">drag me if u can</h2>
  </div> */}
  <Image src="/assets/move.png" height={100} width={200} alt="text"/>
        </div>
        <div className="bottom-0 left-0 absolute z-10 translate-y-[80%] m-8"> 
        <DraggableCircleGrid/>
        </div>
        <div
          ref={containerRef}
          className="text-[96px]/[94px] pl-24  absolute top-24 "
        >
          <h1 className="font-bold">Hi, I'm </h1>
          <div ref={nameRef}>
            <h1 className="font-bold relative">SAKSHI BANSAL</h1>
            <RotatingTitles />
          </div>
        </div>
       
        <div
          ref={paragraphRef}
          className="absolute bottom-0 text-[18px] right-0 pl-24 pt-4 m-8 max-w-xl"
        >
          <p className="leading-relaxed">
            "Enthusiastic about graphic design, typography, and the dynamic
            areas of motion and web-based animations. Specialized in translating
            brands into unique and immersive digital user experiences."
          </p>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <ScrollIndicator />
        </div>
      

      <div className="">
        <div className="flex flex-col  bottom-8 left-8  gap-6 z-40 m-8">
          <Link
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-hover"
          >
            <Image src="/assets/git.png" alt="logo" height={200} width={20} />
          </Link>
          <Link
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-hover"
          >
            <Image
              src="/assets/Linked.png"
              alt="logo"
              height={200}
              width={20}
            />
          </Link>
          <Link
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-hover"
          >
            <Image
              src="/assets/instagram.png"
              alt="logo"
              height={200}
              width={20}
            />
          </Link>
          <Link
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-hover"
          >
            {/* <Twitter size={20} /> */}
          </Link>
        </div>
        </div>
      </div>
      {/* about page */}
      <div >
        <TiltedImage />
        <AboutText />
        <div className="transform -translate-y-1/2">
          <BallCluster />
        </div>
          <div>
             <ProjectsSection/>
             </div>
             {/* <div className="">
             <Testimonials/> */}
             </div>
             <div className="mb-24">
             <Test/>
             </div>
        {/* <div className="">
          <Interest />
        </div>
      </div>
      <Footer/> */}
    </>
  );
}

export default page;