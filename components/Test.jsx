// "use client";
// import React, { useEffect, useRef } from "react";
// import { useRouter } from "next/navigation";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// const Test = () => {
//   const containerRef = useRef(null);
//   const router = useRouter();

//   useEffect(() => {
//     const trigger = ScrollTrigger.create({
//       trigger: containerRef.current,
//       start: "bottom bottom",
//       onEnter: () => {
//         gsap.to(containerRef.current, {
//           opacity: 0,
//           duration: 0.4,
//           onComplete: () => router.push("/contact"),
//         });
//       },
//     });

//     return () => trigger.kill();
//   }, [router]);

//   return (
//     <div ref={containerRef} className=" flex flex-col justify-center items-center text-center">
//       <h1 className="text-[96px]">WHY TRUST ME</h1>
//       <h2 className="text-[96px]">Checkout what others say</h2>
//     </div>
//   );
// };

// export default Test;
