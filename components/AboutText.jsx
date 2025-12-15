"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutText = () => {
  let textEl= null;

  useEffect(() => {
    if (!textEl) return;

    gsap.fromTo(
      textEl,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.4,
        ease: "power2.out",
        scrollTrigger: {
          trigger: textEl,
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <div className="relative transform -translate-y-1/2 m-16">
      <div className="flex gap-6 items-center">

        {/* Text Block */}
        <div
          ref={(el) => (textEl = el)}
          className="whitespace-pre-wrap w-2/3 font-mono text-[17px] leading-relaxed text-gray-300"
        >
{`/**
 * About Me
 *
 * I'm a frontend developer who builds interfaces that feel fast,
 * intentional, and easy to use.
 *
 * I focus heavily on UI/UX — layout, motion, spacing, and clarity.
 * If it looks simple, that’s usually the hardest part.
 *
 * I also understand system design at a practical level:
 * APIs, caching, data flow, and scalability.
 *
 * I care about performance, micro-interactions,
 * and building products people actually enjoy using.
 */`}
        </div>

        {/* Image */}
        <div className="w-1/3">
          <Image
            src="/assets/snippets.png"
            alt="code snippets"
            width={600}
            height={827}
            className="object-contain z-10"
          />
        </div>
      </div>

      <Image
        src="/assets/blurs.png"
        alt="background blur"
        fill
        className="z-0 opacity-10 translate-x-16"
      />
    </div>
  );
};

export default AboutText;
