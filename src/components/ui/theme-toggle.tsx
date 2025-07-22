"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <Button
      variant="outline"
      size="icon"
      className="relative border border-gray-300 dark:border-white bg-white dark:bg-black text-black dark:text-white"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {/* Moon (for light mode) */}
      <Moon className="h-[1.2rem] w-[1.2rem] transition-all duration-300 dark:rotate-0 dark:scale-0 rotate-0 scale-100" />
      {/* Sun (for dark mode) */}
      <Sun className="absolute h-[1.2rem] w-[1.2rem] transition-all duration-300 dark:rotate-0 dark:scale-100 rotate-90 scale-0" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
