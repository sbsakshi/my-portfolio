"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const Cursor = ({ isHovered =false }) => {
    const cursorRef = useRef(null);

    useEffect(() => {
        const moveCursor = (e) => {
            gsap.to(cursorRef.current, {
                x: e.clientX - 10,
                y: e.clientY - 10,
                duration: 0.05,
                ease: "power2.out",
            });
        };

        window.addEventListener("mousemove", moveCursor);
        return () => window.removeEventListener("mousemove", moveCursor);
    }, []);

    return (
        <>
            <style>{`
                body {
                    cursor: none;
                }
            `}</style>

            <div
                ref={cursorRef}
                className="w-8 h-8 bg-[#ecc8fe] scale-105 shadow-[0_0_40px_15px_rgba(170,85,255,0.8)] 
                    rounded-full fixed top-0 left-0 pointer-events-none"
                style={{
                    cursor: isHovered ? "pointer" : "none",
                }}
            ></div>
        </>
    );
};

export default Cursor;
