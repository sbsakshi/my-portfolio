"use client";

import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function ElasticGrid() {
  // Grid dimensions
  const rows = 5;
  const columns = 24;

  // SVG dimensions
  const svgWidth = 1200;
  const svgHeight = 800;

  // Gap between double lines
  const lineGap = 8;

  // Refs for container and animation
  const containerRef = useRef(null);
  const verticalLinesRef = useRef([]);
  const horizontalLinesRef = useRef([]);

  // State for current paths and responsive values
  const [verticalPaths, setVerticalPaths] = useState([]);
  const [horizontalPaths, setHorizontalPaths] = useState([]);
  const [influenceRadius, setInfluenceRadius] = useState(100);
  const [maxDisplacement, setMaxDisplacement] = useState(30);

  // Initialize line paths and handle resize
  useEffect(() => {
    const initializeGrid = () => {
      const isMobile = window.innerWidth < 768;
      setInfluenceRadius(isMobile ? 70 : 100);
      setMaxDisplacement(isMobile ? 20 : 30);

      verticalLinesRef.current = Array(columns + 1)
        .fill(null)
        .map((_, i) => {
          const x = (i / columns) * svgWidth;
          return {
            path1: `M${x - lineGap / 2},0 L${x - lineGap / 2},${svgHeight}`,
            path2: `M${x + lineGap / 2},0 L${x + lineGap / 2},${svgHeight}`,
          };
        });

      horizontalLinesRef.current = Array(rows + 1)
        .fill(null)
        .map((_, i) => {
          const y = (i / rows) * svgHeight;
          return {
            path1: `M0,${y - lineGap / 2} L${svgWidth},${y - lineGap / 2}`,
            path2: `M0,${y + lineGap / 2} L${svgWidth},${y + lineGap / 2}`,
          };
        });

      setVerticalPaths([...verticalLinesRef.current]);
      setHorizontalPaths([...horizontalLinesRef.current]);
    };

    initializeGrid();
    const handleResize = () => {
      initializeGrid();
      resetLines();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePointerMove = (event) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const pointerX = event.clientX - rect.left;
    const pointerY = event.clientY - rect.top;

    const svgPointerX = (pointerX / rect.width) * svgWidth;
    const svgPointerY = (pointerY / rect.height) * svgHeight;

    updateLines(svgPointerX, svgPointerY);
  };

  const updateLines = (svgPointerX, svgPointerY) => {
    const newVerticalPaths = verticalLinesRef.current.map((originalPaths, i) => {
      const x = (i / columns) * svgWidth;
      const distance = Math.abs(x - svgPointerX);

      if (distance < influenceRadius) {
        const displacement = maxDisplacement * (1 - distance / influenceRadius);
        const direction = x < svgPointerX ? -1 : 1;

        return {
          path1: createCurvedVerticalPath(x - lineGap / 2, svgPointerY, displacement * direction),
          path2: createCurvedVerticalPath(x + lineGap / 2, svgPointerY, displacement * direction),
        };
      }

      return originalPaths;
    });

    const newHorizontalPaths = horizontalLinesRef.current.map((originalPaths, i) => {
      const y = (i / rows) * svgHeight;
      const distance = Math.abs(y - svgPointerY);

      if (distance < influenceRadius) {
        const displacement = maxDisplacement * (1 - distance / influenceRadius);
        const direction = y < svgPointerY ? -1 : 1;

        return {
          path1: createCurvedHorizontalPath(y - lineGap / 2, svgPointerX, displacement * direction),
          path2: createCurvedHorizontalPath(y + lineGap / 2, svgPointerX, displacement * direction),
        };
      }

      return originalPaths;
    });

    setVerticalPaths(newVerticalPaths);
    setHorizontalPaths(newHorizontalPaths);
  };

  const resetLines = () => {
    gsap.to({}, {
      duration: 1.2,
      onUpdate: () => {
        setVerticalPaths([...verticalLinesRef.current]);
        setHorizontalPaths([...horizontalLinesRef.current]);
      },
      ease: "elastic.out(1, 0.5)",
    });
  };

  const handlePointerLeave = () => {
    resetLines();
  };

  const createCurvedVerticalPath = (x, pointerY, displacement) => {
    const controlPoint1Y = Math.max(0, pointerY - 100);
    const controlPoint2Y = Math.min(svgHeight, pointerY + 100);

    return `
      M${x},0 
      C${x},${controlPoint1Y} ${x + displacement},${pointerY} ${x},${controlPoint2Y} 
      L${x},${svgHeight}
    `;
  };

  const createCurvedHorizontalPath = (y, pointerX, displacement) => {
    const controlPoint1X = Math.max(0, pointerX - 100);
    const controlPoint2X = Math.min(svgWidth, pointerX + 100);

    return `
      M0,${y} 
      C${controlPoint1X},${y} ${pointerX},${y + displacement} ${controlPoint2X},${y} 
      L${svgWidth},${y}
    `;
  };

  return (
    <div
      ref={containerRef}
      className="w-full h-screen bg-black overflow-hidden touch-none"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onTouchStart={(e) => e.preventDefault()}
    >
      <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-full" preserveAspectRatio="none">
        {verticalPaths.map((paths, i) => (
          <g key={`v-${i}`}>
            <path d={paths.path1} stroke="gray" strokeWidth="1" fill="transparent" />
            <path d={paths.path2} stroke="gray" strokeWidth="1" fill="transparent" />
          </g>
        ))}
        {horizontalPaths.map((paths, i) => (
          <g key={`h-${i}`}>
            <path d={paths.path1} stroke="gray" strokeWidth="1" fill="transparent" />
            <path d={paths.path2} stroke="gray" strokeWidth="1" fill="transparent" />
          </g>
        ))}
      </svg>
    </div>
  );
}
