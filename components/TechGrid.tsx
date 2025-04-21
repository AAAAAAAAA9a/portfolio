"use client";

import React, { useEffect, useRef } from "react";

export default function TechGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 3; // Extend height to cover entire page
      drawGrid();
    };

    // Function to draw the grid
    const drawGrid = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Grid settings - even bigger grid size
      const gridSize = 50;
      // Increase visibility slightly
      const primaryColor = "rgba(45, 212, 191, 0.07)";

      // Draw the main grid
      ctx.beginPath();
      ctx.strokeStyle = primaryColor;
      ctx.lineWidth = 0.8;

      // Vertical lines
      for (let x = 0; x <= canvas.width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
      }

      // Horizontal lines
      for (let y = 0; y <= canvas.height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
      }

      ctx.stroke();

      // Add accent points at grid intersections
      const accentSize = 2;

      // Only draw accent points at some intersections
      for (let x = 0; x <= canvas.width; x += gridSize) {
        for (let y = 0; y <= canvas.height; y += gridSize) {
          // Only draw at some intersections for a more interesting pattern
          if ((x / gridSize + y / gridSize) % 2 === 0) {
            ctx.beginPath();
            ctx.fillStyle = "rgba(45, 212, 191, 0.12)";
            ctx.arc(x, y, accentSize, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
    };

    // Set initial dimensions and draw
    setCanvasDimensions();

    // Update on resize
    window.addEventListener("resize", setCanvasDimensions);

    return () => {
      window.removeEventListener("resize", setCanvasDimensions);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-20 left-0 right-0 bottom-0 pointer-events-none"
      style={{ zIndex: -5, opacity: 0.9 }}
    />
  );
}
