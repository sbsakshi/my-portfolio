"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Cursor from "./Cursor";

const Socials = () => {
    const [isHovered, setIsHovered] = useState(false);

    const ar = [
        { alt: "github", img: "/assets/github.svg", link: "#" },
        { alt: "linkedin", img: "/assets/LinkedIn.png", link: "#" },
        { alt: "insta", img: "/assets/insta.png", link: "#" },
        { alt: "X", img: "/assets/X.png", link: "#" },
    ];

    useEffect(() => {
        console.log("yes");
    }, [isHovered]);

    return (

        <>
            <Cursor isHovered={isHovered} />

            <div
                className={`fixed top-1/2 left-5 flex flex-col items-center gap-4 px-4 py-6 rounded-full 
                transition-all duration-300 ease-in-out 
                ${isHovered ? "bg-[#ecc8fe] scale-105 shadow-[0_0_40px_15px_rgba(170,85,255,0.8)]" : "bg-transparent"}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {ar.map((item) => (
                    <Link href={item.link} key={item.alt}>
                        <Image 
                            className=" transition-all duration-300 hover:scale-110" 
                            src={item.img} 
                            width={30} 
                            height={30} 
                            alt={item.alt} 
                        />
                    </Link>
                ))}
            </div>
        </>
    );
};

export default Socials;
