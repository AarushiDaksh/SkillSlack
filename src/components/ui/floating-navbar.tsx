"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";



interface FloatingNavProps {
  className?: string;
  showLogo?: boolean;
  showThemeToggle?: boolean;

}
export const FloatingNav: React.FC<FloatingNavProps> = ({
  className = "",
  showLogo = false,
  showThemeToggle = false,
}) =>
  {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);
  const router = useRouter();

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const direction = current - scrollYProgress.getPrevious()!;
      const scrollY = window.scrollY;
      setVisible(scrollY < window.innerHeight || direction < 0);
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="navbar"
        initial={{ opacity: 1, y: 0 }}
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "fixed top-3 left-1/2 -translate-x-1/2 z-[50] w-[92%] max-w-lg px-5 py-2.5 rounded-full flex items-center justify-between border border-neutral-300 dark:border-white/20 bg-white/10 dark:bg-white/5 backdrop-blur-lg"
        )}
      >
        <div className="flex items-center gap-2 font-bold">
          <div className="size-7 light:text-black/20 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 text-white flex items-center justify-center text-xs">
            S
          </div>
         <span className={cn("text-m", "text-black dark:text-white")}>SkillSlack</span>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
         

        <button
          onClick={() => router.push("/sign-in")}
          className="px-3 py-1 rounded-full border border-neutral-300 dark:border-white/20 text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/10 transition"
        >
          Login
        </button>

        </div>
      </motion.div>
    </AnimatePresence>
  );
};
