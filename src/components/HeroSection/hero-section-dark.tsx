"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import ShootingStars from "@/components/Background/ShootingStars";

interface HeroProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  headline?: string;
  subheading?: string;
  ctaText?: string;
  ctaSecondaryText?: string;
  ctaHref?: string;
  secondaryCtaHref?: string;
}

const RetroGrid = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden [perspective:400px]">
      <motion.div
        initial={{ opacity: 0, scale: 1.2 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 3, ease: "easeOut" }}
        className="absolute inset-0 
          bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] 
          dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] 
          bg-[size:30px_30px] 
          w-[600vw] h-[300vh] ml-[-200%]"
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
        w-[65vw] h-[65vh] rounded-full 
        bg-[radial-gradient(circle,rgba(0,255,128,0.15)_0%,rgba(0,128,255,0.15)_70%,transparent_100%)] 
        dark:bg-[radial-gradient(circle,rgba(0,255,128,0.2)_0%,rgba(0,128,255,0.2)_70%,transparent_100%)] 
        blur-[120px]" />
    </div>
  );
};

const HeroSection = React.forwardRef<HTMLDivElement, HeroProps>(
  (
    {
      className,
      title = "Real-Time Dev Collaboration",
      headline = "Code. Collaborate. Connect.",
      subheading = "SkillSlack is a developer-first workspace with real-time coding, terminal sessions, GitHub PR sync, and voice rooms — all in one place.",
      ctaText = "Launch Workspace",
      ctaSecondaryText = "Try Editor",
      ctaHref = "/onboarding",
      secondaryCtaHref = "/playground",
      ...props
    },
    ref
  ) => {
    return (
      <div className={cn("relative min-h-screen bg-black text-white", className)} ref={ref} {...props}>
        
     
     

        {/* Optional Background Image */}
        <div
          className="absolute top-0 z-[-1] h-screen w-full bg-cover bg-center dark:hidden"
          style={{
            backgroundImage: `url('https://raw.githubusercontent.com/AarushiDaksh/assets/main/skillswap-light.png')`,
          }}
        />
        <div
          className="absolute top-0 z-[-1] h-screen w-full bg-cover bg-center hidden dark:block"
          style={{
            backgroundImage: `url('https://raw.githubusercontent.com/AarushiDaksh/assets/main/skillswap-dark.png')`,
          }}
        />

        <section className="relative max-w-full mx-auto z-10 min-h-screen flex items-center">
          <div className="max-w-screen-xl mx-auto px-4 py-20 md:px-8 w-full">
            <div className="space-y-5 max-w-3xl leading-0 lg:leading-5 mx-auto text-center">
              {/* Gradient Headline */}
              <h2 className="text-4xl tracking-tighter font-bold bg-clip-text text-transparent mx-auto md:text-6xl bg-[linear-gradient(180deg,_#000_0%,_rgba(0,_0,_0,_0.75)_100%)] dark:bg-[linear-gradient(180deg,_#FFF_0%,_rgba(255,_255,_255,_0.00)_202.08%)]">
                {headline.split(" ").map((word, i, arr) =>
                  i >= arr.length - 2 ? (
                    <span
                      key={i}
                      className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-cyan-500 dark:from-purple-300 dark:to-blue-200"
                    >
                      {word}{" "}
                    </span>
                  ) : (
                    <span key={i}>{word} </span>
                  )
                )}
              </h2>

              {/* Subheading */}
              <p className="max-w-2xl mx-auto text-gray-400 dark:text-gray-300 text-base leading-relaxed px-4">
                {subheading}
              </p>

              {/* Label */}
              <h1 className="text-sm text-gray-400 group font-medium mx-auto px-5 py-2 bg-gradient-to-tr from-zinc-300/20 via-purple-400/20 to-transparent dark:from-zinc-300/5 dark:via-purple-400/5 border border-white/10 rounded-3xl w-fit">
                {title}
                <ChevronRight className="inline w-4 h-4 ml-2 group-hover:translate-x-1 duration-300" />
              </h1>

              {/* CTA Buttons */}
              <div className="items-center justify-center gap-x-4 space-y-3 sm:flex sm:space-y-0 pt-8">
                <Button size="lg" className="px-8 w-full sm:w-auto" asChild>
                  <a href={ctaHref}>{ctaText}</a>
                </Button>
                <Button size="lg" variant="outline" className="px-8 w-full sm:w-auto mt-4 sm:mt-0" asChild>
                  <a href={secondaryCtaHref}>{ctaSecondaryText}</a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
);

HeroSection.displayName = "HeroSection";
export { HeroSection };