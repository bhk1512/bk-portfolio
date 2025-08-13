"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";

export default function ProfileAvatar() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Skip effect for reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      container.style.transform = `rotateY(${x / 20}deg) rotateX(${-y / 20}deg)`;
    };

    const handleMouseLeave = () => {
      container.style.transform = "rotateY(0deg) rotateX(0deg)";
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="group relative w-32 h-32 rounded-full overflow-hidden shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6),0_0_0_8px_rgba(224,224,224,0.06)] transition-all duration-300 ease-out hover:scale-[1.04] hover:-translate-y-0.5"
    >
      <Image
        src="/profile.jpg" // <-- put your image in /public/profile.jpg
        alt="Bharat Kaushik"
        fill
        className="object-cover"
      />
      {/* Halo glow */}
      <div className="absolute inset-0 rounded-full pointer-events-none group-hover:shadow-[0_0_20px_4px_rgba(255,255,255,0.2)] transition-shadow duration-300" />
    </div>
  );
}
