"use client";

import { useEffect, useRef } from "react";
import { ArrowDown } from "lucide-react";
import gsap from "gsap";
import Image from "next/image";

export default function ScrollIndicator() {
  const circleRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (!circleRef.current || !textRef.current) return;

    // Circle pulse animation
    const circleTl = gsap.timeline({ repeat: -1, yoyo: true });
    circleTl.to(circleRef.current, {
      scale: 1.1,
      duration: 1.5,
      ease: "power1.inOut",
    });

    // Revolving text animation
    const textTl = gsap.timeline({ repeat: -1, ease: "none" });
    textTl.to(textRef.current, {
      rotation: 360,
      duration: 10,
      transformOrigin: "center",
      ease: "none",
    });

    // Arrow bounce animation
    const arrowTl = gsap.timeline({ repeat: -1, repeatDelay: 0.2 });
    arrowTl.to(".arrow-icon", { y: 5, duration: 0.5, ease: "power1.inOut" });
    arrowTl.to(".arrow-icon", { y: 0, duration: 0.5, ease: "power1.inOut" });

    return () => {
      circleTl.kill();
      textTl.kill();
      arrowTl.kill();
    };
  }, []);

  // Scroll behavior
  const handleClick = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative cursor-pointer" onClick={handleClick}>
      <div 
  ref={circleRef} 
  className="w-16 h-16 flex items-center justify-center bg-black rounded-full"
>
  <Image  src="/assets/Arrow.png" height={20} width={20} alt="arrow"/>
</div>

      <div ref={textRef} className="absolute top-0 left-0 w-full h-full" style={{ pointerEvents: "none" }}>
        <svg
          width="120"
          height="120"
          viewBox="0 0 120 120"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <path id="textPath" d="M60,10 A50,50 0 1,1 59.9,10" fill="none" stroke="none" />
          <text className="text-xs uppercase tracking-widest">
            <textPath xlinkHref="#textPath" startOffset="0%">
              Scroll Below • Scroll Below •
            </textPath>
          </text>
        </svg>
      </div>
    </div>
  );
}
