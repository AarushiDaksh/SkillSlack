"use client";

import { useEffect, useRef } from "react";

export default function ShootingStars() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let stars: { x: number; y: number; size: number; speed: number }[] = [];

    const initStars = () => {
      stars = Array.from({ length: 100 }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 2,
        speed: Math.random() * 0.5 + 0.2,
      }));
    };

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.arc(star.x, star.y, star.size, 0, 2 * Math.PI);
        ctx.fill();

        star.x -= star.speed * 2;
        star.y += star.speed;

        // Reset when off screen
        if (star.x < 0 || star.y > window.innerHeight) {
          star.x = Math.random() * window.innerWidth;
          star.y = 0;
        }
      });

      requestAnimationFrame(animate);
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
    />
  );
}
