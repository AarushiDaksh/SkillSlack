"use client";

import * as React from "react";
import { cn } from "@/lib/utlis";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {RetroGrid}  from "@/components/magicui/retro-grid";


interface HeroProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  headline?: string;
  subheading?: string;
  ctaText?: string;
  ctaHref?: string;
}

const Hero = React.forwardRef<HTMLDivElement, HeroProps>(
  (
    {
      className,
      title = "GitHub PR Sync",
      headline = "Track. Review. Merge.",
      subheading = "Stay on top of your GitHub Pull Requests in one place — fast, focused, and real-time.",
      ctaText = "View PRs",
      ctaHref = "/pull",
      ...props
    },
    ref,
  ) => {
    return (
      <div
        className={cn(
          "relative min-h-screen overflow-hidden",
          "bg-white text-black dark:bg-[#0a0b0f] dark:text-white",
          className
        )}
        ref={ref}
        {...props}
      >
        {/* Light background (keep original look) */}
        <div className="absolute top-0 z-0 h-full w-full bg-[#f5f5f5] dark:hidden" />

        {/* Dark background */}
        <div className="absolute top-0 z-0 hidden h-full w-full dark:block bg-[#0a0b0f]" />

        {/* GRID: now visible in both themes */}
        <div
          className={cn(
            "absolute inset-0 z-[1] pointer-events-none",
            // Light: very subtle gray lines
            "bg-[linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)]",
            "bg-[size:36px_36px]",
            // Dark: brighter grid
            "dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.07)_1px,transparent_1px)]",
            "dark:bg-[size:34px_34px]"
          )}
        />

        {/* Depth grid (RetroGrid) */}
        <div className="absolute inset-0 z-[1] opacity-10 dark:opacity-30 pointer-events-none">
          <RetroGrid />
        </div>

        {/* Glow (only in dark) */}
        <div className="hidden dark:block absolute -top-40 left-1/2 -translate-x-1/2 size-[110vmin] rounded-full blur-[120px] opacity-40 z-[1]
                        bg-[radial-gradient(circle,rgba(124,58,237,.35),rgba(56,189,248,.25),transparent)]" />

        {/* Content */}
        <section className="relative z-10 max-w-full mx-auto min-h-screen flex items-center">
          <div className="max-w-screen-xl mx-auto px-4 py-20 md:px-8 w-full">
            <div className="space-y-6 max-w-3xl mx-auto text-center">
              {/* label */}
              <h1
                className="inline-flex items-center justify-center gap-2 mx-auto rounded-full px-5 py-2 text-xs md:text-sm
                           border border-black/10 bg-white/60 text-gray-700
                           backdrop-blur dark:border-white/15 dark:bg-white/5 dark:text-white/80"
              >
                {title}
                <ChevronRight className="inline w-4 h-4 opacity-70" />
              </h1>

              {/* headline */}
              <h2
                className="text-4xl md:text-6xl font-extrabold tracking-tight mx-auto
                           bg-clip-text text-transparent
                           bg-[linear-gradient(180deg,#000_0%,rgba(0,0,0,.75)_100%)]
                           dark:bg-[linear-gradient(90deg,#a78bfa_0%,#60a5fa_50%,#22d3ee_100%)]
                           drop-shadow-[0_0_30px_rgba(59,130,246,.15)]"
              >
                {headline.split(" ").map((word, i, arr) =>
                  i >= arr.length - 2 ? (
                    <span
                      key={i}
                      className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-indigo-300 to-cyan-300"
                    >
                      {word}{" "}
                    </span>
                  ) : (
                    <span key={i}>{word} </span>
                  )
                )}
              </h2>

              {/* subheading */}
              <p className="max-w-2xl mx-auto text-gray-700 dark:text-white/70 text-base md:text-lg leading-relaxed px-2">
                {subheading}
              </p>

              {/* CTA */}
              <div className="pt-6">
                <Button
                  size="lg"
                  className={cn(
                    "px-8 font-semibold",
                    "text-white bg-gradient-to-r from-purple-600 to-blue-600",
                    "hover:opacity-95",
                    "dark:shadow-[0_0_25px_rgba(99,102,241,.35)] dark:hover:shadow-[0_0_40px_rgba(99,102,241,.5)]",
                    "transition-shadow duration-300 relative"
                  )}
                  asChild
                >
                  <a href={ctaHref}>{ctaText}</a>
                </Button>
              </div>

              <div className="mx-auto mt-8 h-px w-32
                              bg-gradient-to-r from-transparent via-black/30 to-transparent
                              dark:from-transparent dark:via-cyan-300/40 dark:to-transparent" />
            </div>
          </div>
        </section>
      </div>
    );
  },
);

Hero.displayName = "Hero";
export { Hero };
