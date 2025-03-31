"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import Logo from "./Logo";

const Navbar = () => {
  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Projects", path: "/contact" },
  ];

  // Create an array of refs properly
  const itemsRef = useRef([]);

  // Initialize refs array
  useEffect(() => {
    itemsRef.current = itemsRef.current.slice(0, navItems.length);
  }, [navItems.length]);

  const handleHover = (index) => {
    const el = itemsRef.current[index];
    if (!el) return;

    const container = el.querySelector("div");
    if (!container) return;

    const topText = container.children[0];
    const bottomText = container.children[1];

    gsap.to(topText, {
      y: "-100%",
      opacity: 0,
      duration: 0.3,
    });

    gsap.fromTo(bottomText, { y: "100%", opacity: 0 }, { y: "0%", opacity: 1, duration: 0.3 });
  };

  const handleMouseLeave = (index) => {
    const el = itemsRef.current[index];
    if (!el) return;

    const container = el.querySelector("div");
    if (!container) return;

    const topText = container.children[0];
    const bottomText = container.children[1];

    gsap.to(topText, {
      y: "0%",
      opacity: 1,
      duration: 0.3,
    });

    gsap.to(bottomText, {
      y: "100%",
      opacity: 0,
      duration: 0.3,
    });
  };

  return (
    <div className="relative flex justify-between items-center w-full h-[80px]  px-4 text-black">
      <Logo />
      <ul className="flex space-x-6 text-[18px] font-shoulders text-black">
        {navItems.map((item, index) => (
          <li
            key={index}
            ref={(el) => (itemsRef.current[index] = el)}
            className="relative h-[24px] cursor-pointer"
            onMouseEnter={() => handleHover(index)}
            onMouseLeave={() => handleMouseLeave(index)}
          >
            <Link href={item.path} className="block h-full">
              <div className="relative h-full overflow-hidden">
                <span className="block text-center transition-colors duration-300  hover:text-purple-200 cursor-none">
                  {item.name}
                </span>
                <span className="absolute top-0 left-0 w-full text-center opacity-0 transition-colors duration-300 hover:text-purple-200 cursor-none">
                  {item.name}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
