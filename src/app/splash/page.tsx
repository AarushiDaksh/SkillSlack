"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/dashboard/User");
    }, 3000); // Delay for 3 seconds
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-[#0d1117] text-white flex flex-col items-center justify-center">
      {/* Logo */}
      <div className="text-5xl font-extrabold text-purple-500 animate-pulse drop-shadow mb-3">
        SkillSlack
      </div>

      {/* Subtext */}
      <p className="text-gray-400 text-sm">Preparing your developer workspace...</p>

      {/* Loading animation */}
      <div className="mt-8 w-48 h-2 bg-white/10 rounded-full overflow-hidden">
        <div className="h-full bg-purple-500 animate-slide rounded-full w-1/2" />
      </div>

      <style jsx>{`
        @keyframes slide {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }
        .animate-slide {
          animation: slide 1.8s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}
