"use client";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { useRouter } from "next/navigation";
import Game from "@/components/Game";

export default function Home() {
  const router = useRouter();
  
  const [count, setCount] = useState(3);
  const [loading, setLoading] = useState(true);

  const textRef = useRef(null);
  const boxRef = useRef(null);
  const boxRef2 = useRef(null);
  const text = useRef(null);
  const button = useRef(null);

  const handleComplete = () => {
    gsap.to(button.current, {
      duration: 0.15,
      ease: "power2.out",
      onComplete: () => {
        setTimeout(() => {
          router.push("/home");
        }, 2000);
      }
    });
  };
  
  // Timer to count and transition the loader
  useEffect(() => {
    const tl = gsap.timeline(); // Create GSAP timeline

    if (count > 0 && count < 100) {
      const timer = setTimeout(() => {
        setCount((prev) => prev + 1);
      }, 10);
      return () => clearTimeout(timer);
    } else if (count === 100 && loading) {
      tl.to(".preloader", {
        opacity: 0,
        duration: 1,
        onComplete: () => setLoading(false),
      })
        .from(boxRef2.current, {
          opacity: 0,
          repeat: -1,
          duration: 2,
          ease: "power2.inOut",
        });
    }
  }, [count, loading]);

  // Marquee animation and box reveal animation
  useEffect(() => {
    const marquee = textRef.current;
    const width = marquee.scrollWidth / 2;
    const box = boxRef.current;
    const welcomeText = text.current;
    const welcomeWidth = welcomeText ? welcomeText.offsetWidth : 0;

    gsap.set(text.current, { opacity: 0 });

    gsap.to(marquee, {
      x: `-${width}px`,
      duration: 15,
      ease: "linear",
      repeat: -1,
    });

    gsap.to(box, {
      x: -welcomeWidth - 2, 
      duration: 2,
      ease: "power2.inOut",
      onComplete: () => {
        gsap.to(text.current, {
          opacity: 1,
          duration: 0.25,
          onComplete: handleComplete,
        });
      },
    });

    gsap.from(box, {
      opacity: 0,
      repeat: -1,
      duration: 2,
      ease: "power2.inOut",
    });
  }, [loading]);

  return (
    <section className="bg-purple-100 w-full h-screen text-black font-extrabold whitespace-nowrap overflow-x-hidden relative">
      <Game />
      
      <div>
        <div
          className="shiny-border z-10 absolute h-30 w-[20%] left-1/2 -translate-x-1/2 rounded-full text-white flex items-center justify-center flex-row shadow-[0_4px_10px_rgba(255,255,255,0.3)] hover:brightness-125 active:brightness-90 transition-all" ref={button}
        >
          {loading ? (
            <div className="preloader font-inconsolata absolute inset-0 flex items-center justify-center text-white font-bold transition-opacity duration-500 z-[99]">
              <h1 className="p-4">Loading </h1>
              {count > 0 ? count : "GO!"}
              <div ref={boxRef2} className="bg-white w-2 h-4" />
            </div>
          ) : (
            <>
              <h1 className="p-2 font-4xl font-inconsolata font-bold" ref={text}>
                WELCOME
              </h1>
              <div ref={boxRef} className="bg-white w-2 h-4" />
            </>
          )}
        </div>
      </div>
      
      <h1
        ref={textRef}
        className="absolute top-1/2 -translate-y-1/2 z-1 text-7xl font-bebas"
      >
        A CREATIVE DESIGNER DEVELOPER . A CREATIVE DESIGNER DEVELOPER . A CREATIVE DESIGNER DEVELOPER
      </h1>
    </section>
  );
}
