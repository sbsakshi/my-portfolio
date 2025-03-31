"use client"
import React, { useRef, useState } from "react";
import { gsap } from "gsap";

const Footer = () => {
  const textRef = useRef(null);
  const containerRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e) => {
    if (!containerRef.current || !isHovering) return;

    const container = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - container.left - container.width / 2) / (container.width / 2);
    const y = (e.clientY - container.top - container.height / 2) / (container.height / 2);

    if (textRef.current) {
      gsap.to(textRef.current, {
        rotationY: x * 15,
        rotationX: -y * 15,
        transformPerspective: 1000,
        ease: "power2.out",
        duration: 0.5,
      });
    }
  };

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => {
    setIsHovering(false);
    if (textRef.current) {
      gsap.to(textRef.current, {
        rotationY: 0,
        rotationX: 0,
        duration: 0.7,
        ease: "power2.out",
      });
    }
  };

  return (
    <div
      className="w-full flex justify-center items-center min-h-[300px] overflow-hidden"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={textRef}
        className="font-[calcio] text-[450px] font-bold transform-style-preserve-3d text-brown-900 "
      >
        SAKSHIBANSAL
      </div>
    </div>
  );
};

export default Footer;