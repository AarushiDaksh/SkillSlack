// File: components/magicui/retro-grid.tsx

import * as React from "react"
import { cn } from "@/lib/utils"

export interface RetroGridProps extends React.HTMLAttributes<HTMLDivElement> {
  angle?: number
  cellSize?: number
  opacity?: number
  lightLineColor?: string
  darkLineColor?: string
}

export const RetroGrid = React.forwardRef<HTMLDivElement, RetroGridProps>(
  (
    {
      className,
      angle = 65,
      cellSize = 60,
      opacity = 0.5,
      lightLineColor = "rgba(0,0,0,0.1)",
      darkLineColor = "rgba(255,255,255,0.1)",
      ...props
    },
    ref
  ) => {
    const gradient =
      `repeating-linear-gradient(${angle}deg,` +
      `${lightLineColor} 0,` +
      `${lightLineColor} 1px,` +
      `transparent 1px,` +
      `transparent ${cellSize}px),` +
      `repeating-linear-gradient(${angle + 90}deg,` +
      `${lightLineColor} 0,` +
      `${lightLineColor} 1px,` +
      `transparent 1px,` +
      `transparent ${cellSize}px)`

    const darkGradient =
      `repeating-linear-gradient(${angle}deg,` +
      `${darkLineColor} 0,` +
      `${darkLineColor} 1px,` +
      `transparent 1px,` +
      `transparent ${cellSize}px),` +
      `repeating-linear-gradient(${angle + 90}deg,` +
      `${darkLineColor} 0,` +
      `${darkLineColor} 1px,` +
      `transparent 1px,` +
      `transparent ${cellSize}px)`

    return (
      <div
        ref={ref}
        className={cn("pointer-events-none absolute inset-0 z-0", className)}
        style={{
          backgroundImage: gradient,
          backgroundSize: `${cellSize}px ${cellSize}px`,
          opacity: opacity,
          mixBlendMode: "difference",
        }}
        {...props}
      >
        <style>
          {`
            @media (prefers-color-scheme: dark) {
              .dark & {
                background-image: ${darkGradient};
              }
            }
          `}
        </style>
      </div>
    )
  }
)

RetroGrid.displayName = "RetroGrid"
