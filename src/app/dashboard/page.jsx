"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Clock10 } from "lucide-react";
import Link from "next/link";


// Blob Effect for Background
const BlobEffect = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none bg-[#5865F2] bg-opacity-40 rounded-full blur-3xl animate-pulse" />
  );
};

// Interactive Text Reveal
const AnimatedText = () => {
  return (
    <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 mb-6 tracking-wide text-shadow-md animate-fade-in">
      We’re Crafting Something Legendary
    </h1>
  );
};

const Dashboard = () => {
  // Mouse Position for Dynamic Lighting
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
  <div
      className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-[#5865F2]"
      style={{
        background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 0.2), rgba(0, 0, 0, 0.7))`,
        transition: "background 0.2s ease-in-out",
      }}
    >
      {/* Blob Background */}
      <BlobEffect />

      {/* Foreground content */}
      <div className="relative z-10 max-w-2xl text-center animate-fade-in-up">
        <div className="flex justify-center mb-6">
          <Sparkles className="h-12 w-12 text-white animate-spin-slow drop-shadow-xl" />
        </div>

        {/* Animated Title */}
        <AnimatedText />

        <p className="text-lg md:text-xl opacity-90 mb-6">
          Our dashboard is still under construction — but trust us, it’ll be worth the wait. 🚀
        </p>
        <div className="flex items-center justify-center gap-2 text-sm md:text-base text-white/80">
          <Clock10 className="h-5 w-5 animate-pulse" />
          Estimated Launch: May 2025
        </div>
        <div className="mt-10">
          <Link
            href="/"
            className="inline-block px-6 py-3 rounded-full bg-white text-[#5865F2] font-semibold text-sm md:text-base shadow-md hover:bg-gray-100 hover:scale-110 transition-all ease-in-out"
          >
            Go back home
          </Link>
        </div>
      </div>
  </div>
  );
};

export default Dashboard;
