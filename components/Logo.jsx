"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

 function logo() {
  const textRef = useRef(null);

  useEffect(() => {
    const letters = textRef.current.children;
    gsap.fromTo(
      letters,
      { opacity: 0, x: -10 },
      {
        opacity: 1,
        x: 0,
        duration: 0.3,
        stagger: 0.2,
        ease: "power2.out",
      }
    );
  }, []);

  return (
    <div className="text-[36px] font-[signature] flex space-x-1 italic m-4">
      <span ref={textRef}>
        {"Sakshi Bansal".split("").map((char, index) => (
          <span key={index} className="inline-block">
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </span>
    </div>
  );
}

export default logo;