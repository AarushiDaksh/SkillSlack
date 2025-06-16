"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
interface HeroProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  headline?: string
  subheading?: string
  ctaText?: string
  ctaSecondaryText?: string
  ctaHref?: string
  secondaryCtaHref?: string
}



const RetroGrid = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden [perspective:400px]">
      {/* Animated dotted grid */}
      <motion.div
        initial={{ opacity: 0, scale: 1.2 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 3, ease: "easeOut" }}
        className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.08)_1px,transparent_1px)] dark:bg-[radial-gradient(circle,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:30px_30px] w-[600vw] h-[300vh] ml-[-200%]"
      />

      {/* Optional glowing center highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[65vw] h-[65vh] rounded-full bg-[radial-gradient(circle,rgba(0,255,128,0.15)_0%,rgba(0,128,255,0.15)_70%,transparent_100%)] dark:bg-[radial-gradient(circle,rgba(0,255,128,0.2)_0%,rgba(0,128,255,0.2)_70%,transparent_100%)] blur-[120px]" />
    </div>
  )
}



const Hero = React.forwardRef<HTMLDivElement, HeroProps>(
  (
    {
      className,
      title = "Collaborative Skill Exchange Platform",
      headline = "Get Help, Give Help, and Grow Together",
      subheading = "SkillSwap connects developers and creators to share their skills, solve each other's problems, and earn community tokens through collaborative learning.",
      ctaText = "Find Help",
      ctaSecondaryText = "Offer Help",
      ctaHref = "#find-help",
      secondaryCtaHref = "#offer-help",
      ...props
    },
    ref,
  ) => {
    return (
      <div className={cn("relative min-h-screen", className)} ref={ref} {...props}>
        {/* ✅ Background image (light and dark) */}
        <div
          className="absolute top-0 z-[0] h-screen w-full bg-cover bg-center dark:hidden"
          style={{ backgroundImage: `url('https://raw.githubusercontent.com/AarushiDaksh/assets/main/skillswap-light.png')` }}
        />
        <div
          className="absolute top-0 z-[0] h-screen w-full bg-cover bg-center hidden dark:block"
          style={{ backgroundImage: `url('https://raw.githubusercontent.com/AarushiDaksh/assets/main/skillswap-dark.png')` }}
        />

<section className="relative max-w-full mx-auto z-1 min-h-screen flex items-center">
  <RetroGrid />




          <div className="max-w-screen-xl z-10 mx-auto px-4 py-20 md:px-8 w-full">
            <div className="space-y-5 max-w-3xl leading-0 lg:leading-5 mx-auto text-center">
              {/* Label */}
              

              {/* Gradient headline */}
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
              <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300 text-base leading-relaxed px-4">
                {subheading}
              </p>
                <h1 className="text-sm text-gray-600 dark:text-gray-400 group font-medium mx-auto px-5 py-2 bg-gradient-to-tr from-zinc-300/20 via-purple-400/20 to-transparent dark:from-zinc-300/5 dark:via-purple-400/5 border-[2px] border-black/5 dark:border-white/5 rounded-3xl w-fit">
                {title}
                <ChevronRight className="inline w-4 h-4 ml-2 group-hover:translate-x-1 duration-300" />
              </h1>
              {/* CTAs */}
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
    )
  },
)

Hero.displayName = "Hero"
export { Hero }
