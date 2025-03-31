"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import ElasticGrid from "./Grid";

const Testimonials = () => {
  const testimonials = ["crazy", "awesome", "right fit", "ambitious"];
  const people = ["adam(director)", "joe(professor)", "jane(mentor)", "jane(mentor)"];
  const [currentIndex, setCurrentIndex] = useState(0);
  const textRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    // Animation timeline
    const tl = gsap.timeline();
    const interval = setInterval(() => {
      tl.to(textRef.current, {
        duration: 1,
        opacity: 0,
        y: 20,
        ease: "power2.out",
        onComplete: () => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);

          gsap.fromTo(
            textRef.current,
            { opacity: 0, y: -20 },
            { duration: 0.5, opacity: 1, y: 0, ease: "power2.out" }
          );
        },
      });
    }, 3000);

    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: -20 },
      { duration: 0.5, opacity: 1, y: 0, ease: "power2.out" }
    );

    // Detect scroll attempt (even if no overflow)
    const handleScroll = () => {
      gsap.to("body", {
        opacity: 0,
        duration: 1,
        onComplete: () => router.push("/about"),
      });
    };

    window.addEventListener("wheel", handleScroll);
    window.addEventListener("touchmove", handleScroll);

    return () => {
      clearInterval(interval);
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("touchmove", handleScroll);
    };
  }, [testimonials.length, router]);

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <div className="relative z-0">
        <ElasticGrid />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-white text-[92px] flex items-center justify-center w-full">
        <span className="text-[200px] left-1/4"> ( </span>
        <div className="flex flex-col align-center items-center leading-none">
          <h1>Sakshi</h1>
          <h1 className="whitespace-nowrap" ref={textRef}>
            is {testimonials[currentIndex]}
          </h1>
          <h4 className="text-[24px] text-gray-300 italic">-{people[currentIndex]}</h4>
        </div>
        <span className="text-[200px] right-1/4"> )</span>
      </div>
    </div>
  );
};

export default Testimonials;
