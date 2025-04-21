"use client";

import { useEffect, useRef, useState } from "react";

export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // Set dimensions
    function updateDimensions() {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dimensions.width === 0) return;

    // Use non-null assertion operator (!) or provide a fallback if getContext returns null
    const ctx = canvas.getContext("2d")!; // Using non-null assertion operator
    if (!ctx) return; // Still keep this check for runtime safety

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    // Configuration - slightly increased particle count but still optimized for performance
    const particleCount = Math.floor(dimensions.width * 0.05); // Slightly increased from 0.01
    const particleSize = 1.5;
    const connectionDistance = dimensions.width * 0.05; // Reduced connection distance
    const moveSpeed = 0.3; // Slower movement

    // Create particles
    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      color: string;
    }[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        vx: (Math.random() - 0.5) * moveSpeed,
        vy: (Math.random() - 0.5) * moveSpeed,
        color: `rgba(45, 212, 191, ${Math.random() * 0.5 + 0.1})`,
      });
    }

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    let isMouseActive = false;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isMouseActive = true;
    };

    const handleMouseOut = () => {
      isMouseActive = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseOut);

    let animationFrameId: number;
    let lastTime = 0;
    const fps = 30; // Limit to 30 fps for better performance
    const interval = 1000 / fps;

    function animate(currentTime: number) {
      animationFrameId = requestAnimationFrame(animate);

      const deltaTime = currentTime - lastTime;
      if (deltaTime < interval) return;

      lastTime = currentTime - (deltaTime % interval);

      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      // Create simplified gradients
      const gradient1 = ctx.createRadialGradient(
        dimensions.width * 0.2,
        dimensions.height * 0.2,
        0,
        dimensions.width * 0.2,
        dimensions.height * 0.2,
        dimensions.width * 0.5
      );
      gradient1.addColorStop(0, "rgba(45, 212, 191, 0.03)");
      gradient1.addColorStop(1, "rgba(45, 212, 191, 0)");

      // Draw gradients
      ctx.beginPath();
      ctx.fillStyle = gradient1;
      ctx.fillRect(0, 0, dimensions.width, dimensions.height);

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Boundary check
        if (p.x < 0 || p.x > dimensions.width) p.vx = -p.vx;
        if (p.y < 0 || p.y > dimensions.height) p.vy = -p.vy;

        // Mouse repulsion - only if mouse is active
        if (isMouseActive) {
          const dx = p.x - mouseX;
          const dy = p.y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            const force = (150 - dist) / 150;
            p.vx += dx * force * 0.01; // Reduced force
            p.vy += dy * force * 0.01; // Reduced force
          }
        }

        // Speed limiting
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > 1.5) {
          p.vx = (p.vx / speed) * 1.5;
          p.vy = (p.vy / speed) * 1.5;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, particleSize, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        // Connect particles - but less connections
        for (let j = i + 1; j < particles.length; j += 2) {
          // Skip some particles for performance
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(45, 212, 191, ${
              (1 - dist / connectionDistance) * 0.1
            })`; // Reduced opacity
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
    }

    animationFrameId = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, [dimensions]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/5 via-background to-primary-900/5" />
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}
