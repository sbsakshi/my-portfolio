"use client"
import { Center, OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { Suspense, useRef } from "react"
import { Html, useProgress } from "@react-three/drei";
import Computer from "@/components/Computer"
import ProjectCard from "@/components/ProjectCard";
import  {myProjects}  from "@/index";
import { useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

const page = () => {
 
  const [index,setIndex]=useState(0)
  const containerRef=useRef(null);
  const cardRef=useRef(null);

  const handleScroll = (event) => {
    if (event.deltaY > 0) {
      setIndex((prev) => Math.min(prev + 1, myProjects.length - 1));
    } else if (event.deltaY < 0) {
      setIndex((prev) => Math.max(prev - 1, 0));
    }
  };


 

    const Loading = () => {
        const { progress } = useProgress();
        return (
          <Html center>
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-800"></div>
            <p className="text-white">{progress.toFixed(0)}% loading...</p>
          </Html>
        );
      };
      
  return (
<div 
ref={containerRef}
className="w-full h-screen flex  items-center justify-center overflow-y-auto p-8 "
onWheel={handleScroll}>  
          <div className="flex w-1/2 items-center justify-center" ref={cardRef}> 
   <ProjectCard {...myProjects[index]}/>
    </div>
    <div className=' rounded-lg h-full w-1/2 md:h-full  items-center justify-center '>
      <Canvas>
        <ambientLight intensity={Math.PI}/>
        <directionalLight position={[10,10,5]}/>
            <Center>
            <Suspense fallback={<Loading/>}>
                <group scale={2} position={[0,-3,0]} 
                    rotation={[0,0.1,0]}
                >
                    <Computer 
                    texture={`/textures/project/project${index}.mp4`} />
                </group>
                </Suspense>
            </Center>
            <OrbitControls maxPolarAngle={Math.PI/2} enableZoom={false}/>
      </Canvas>
    </div>
    </div>
  )
}

export default page
