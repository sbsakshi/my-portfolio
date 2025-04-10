"use client";
import React, { useEffect } from "react";
import AboutText from "@/components/AboutText";
import TiltedImage from "@/components/TiltedImage";
import BallCluster from "@/components/Balls";
import Interest from "@/components/Interest";
import ProjectsSection from "@/components/projectSection";
import Footer from "@/components/Footer";
import Testimonials from "@/components/Testimonials";
import GetInTouch from "@/components/touch";
import Image from "next/image";

const About = () => {
  // useEffect(() => {
  //   const link = document.createElement("link");
  //   link.href = "https://assets.calendly.com/assets/external/widget.css";
  //   link.rel = "stylesheet";
  //   document.head.appendChild(link);

  //   const script = document.createElement("script");
  //   script.src = "https://assets.calendly.com/assets/external/widget.js";
  //   script.async = true;
  //   script.onload = () => {
  //     if (window.Calendly) {
  //       window.Calendly.initBadgeWidget({
  //         url: "https://calendly.com/sakshi-sb2006/30min",
  //         text: "Schedule time with me",
  //         color: "#0069ff",
  //         textColor: "#ffffff",
  //       });
  //     }
  //   };
  //   document.body.appendChild(script);
  // }, []);

  return (
    <div className="bg-[#fffdea] text-black h-500vh overflow-x-hidden">
      <div className="flex flex-col"></div>
      <div className="z-100">
        <Interest />
        <div className="mt-16">
          <GetInTouch />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default About;