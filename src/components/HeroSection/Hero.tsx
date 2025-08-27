"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RetroGrid } from "@/components/magicui/retro-grid";


interface HeroProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  headline?: string
  subheading?: string
  ctaText?: string
  ctaSecondaryText?: string
  ctaHref?: string
  secondaryCtaHref?: string
}

const Hero = React.forwardRef<HTMLDivElement, HeroProps>(
  (
    {
      className,
      title = "Collaborative Skill Exchange Platform",
      headline = "Get Help, Give Help, and Grow Together",
      subheading = "SkillSlack connects developers and creators to share their skills, solve each other's problems, and earn community tokens through collaborative learning.",
      ctaText = "Find Help",
      ctaSecondaryText = "Offer Help",
      ctaHref = "",
      secondaryCtaHref = "#offer-help",
      ...props
    },
    ref,
  ) => {
    return (
      <div className={cn("relative min-h-screen", className)} ref={ref} {...props}>

        <div
            className="absolute top-0 z-[0] h-screen w-full bg-white bg-[url('https://raw.githubusercontent.com/AarushiDaksh/assets/main/skillswap-light.png')] bg-cover bg-center dark:hidden"
            style={{
              backgroundBlendMode: "screen",
              backgroundColor: "#f5f5f5",
            }}
          />

         
          
                  <section className="relative max-w-full mx-auto z-1 min-h-screen flex items-center">
          <div className="max-w-screen-xl z-10 mx-auto px-4 py-20 md:px-8 w-full">
            <div className="space-y-5 max-w-3xl leading-0 lg:leading-5 mx-auto text-center">

              {/* Gradient headline */}
              <h2 className="text-4xl tracking-tighter font-bold bg-clip-text text-transparent mx-auto md:text-6xl 
                bg-gradient-to-r from-black to-gray-700 dark:from-purple-300 dark:to-blue-200">
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

              {/* Title label */}
              <h1 className="text-sm text-gray-600 dark:text-gray-400 group font-medium mx-auto px-5 py-2 bg-gradient-to-tr from-zinc-300/20 via-purple-400/20 to-transparent dark:from-zinc-300/5 dark:via-purple-400/5 border-[2px] border-black/5 dark:border-white/5 rounded-3xl w-fit">
                {title}
                <ChevronRight className="inline w-4 h-4 ml-2 group-hover:translate-x-1 duration-300" />
              </h1>

              {/* CTA Buttons */}
              <div className="items-center justify-center gap-x-4 space-y-3 sm:flex sm:space-y-0 pt-8">
                <Button
                size="lg"
                className="px-8 w-full sm:w-auto text-white dark:text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90"
                asChild
              >
                <a href={ctaHref}>{ctaText}</a>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="px-8 w-full sm:w-auto mt-4 sm:mt-0 text-black dark:text-white border-black dark:border-white hover:bg-black/5 dark:hover:bg-white/10"
                asChild
              >
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
