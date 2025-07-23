"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/dashboard/User");
    }, 6000); // show for 3 seconds
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center flex-col">
      <div className="text-4xl font-bold mb-4 text-purple-400 animate-pulse">
        SkillSlack
      </div>
      <p className="text-gray-400">Preparing your dashboard...</p>
    </div>
  );
}
