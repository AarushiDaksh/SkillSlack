"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Menu, X } from "lucide-react";

export const FloatingNav = ({
  navItems,
  className,
  showLogo = true,
  showThemeToggle = true,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: React.ReactNode;
  }[];
  className?: string;
  showLogo?: boolean;
  showThemeToggle?: boolean;
}) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      let direction = current! - scrollYProgress.getPrevious()!;
      
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      if (scrollY < windowHeight) {
        setVisible(true);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key="navbar"
          initial={{
            opacity: 1,
            y: 0,
          }}
          animate={{
            y: visible ? 0 : -100,
            opacity: visible ? 1 : 0,
          }}
          transition={{
            duration: 0.2,
          }}
          className={cn(
            "flex fixed top-4 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-full dark:bg-black bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[50] px-4 py-2 items-center justify-between w-[95%] sm:max-w-2xl",
            className
          )}
        >
          {showLogo && (
            <div className="flex items-center gap-2 font-bold">
              <div className="size-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs">S</div>
              <span className="text-sm">SkillSwap</span>
            </div>
          )}
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center flex-1 mx-4">
            <div className="flex items-center justify-center space-x-5 mx-auto">
              {navItems.map((navItem, idx) => (
                <Link
                  key={`desktop-link-${idx}`}
                  href={navItem.link}
                  className={cn(
                    "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500 px-2"
                  )}
                >
                  {navItem.icon && <span>{navItem.icon}</span>}
                  <span className="text-sm">{navItem.name}</span>
                </Link>
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {showThemeToggle && <ThemeToggle />}
            <button className="hidden sm:block border text-xs font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-3 py-1.5 rounded-full">
              <span>Login</span>
              <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px" />
            </button>
            
            {/* Mobile Menu Button */}
            <button 
              onClick={toggleMobileMenu} 
              className="md:hidden flex items-center justify-center"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              <span className="sr-only">{mobileMenuOpen ? "Close menu" : "Open menu"}</span>
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Mobile Menu - with elegant styling that matches the design */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
            key="mobile-menu"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ 
              duration: 0.15, 
              ease: [0.4, 0.0, 0.2, 1]
            }}
            className="fixed top-[72px] right-4 bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 p-4 shadow-lg rounded-2xl w-[220px] z-[49] overflow-hidden"
            style={{
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)"
            }}
          >
            {/* Subtle gradient accent at the top */}
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
            
            <div className="flex flex-col space-y-1.5 pt-1">
              {navItems.map((navItem, idx) => (
                <Link
                  key={`mobile-link-${idx}`}
                  href={navItem.link}
                  onClick={() => setMobileMenuOpen(false)}
                  className="relative flex items-center space-x-2 text-neutral-700 dark:text-neutral-200 hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800/50 p-2 rounded-lg transition-colors duration-150"
                >
                  {navItem.icon && (
                    <span className="text-neutral-500 dark:text-neutral-400">{navItem.icon}</span>
                  )}
                  <span className="text-sm font-medium">{navItem.name}</span>
                </Link>
              ))}
              <div className="pt-3 mt-1 border-t border-neutral-200 dark:border-neutral-800">
                <button className="w-full flex items-center justify-center text-sm font-medium bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-black dark:text-white px-3 py-2 rounded-lg transition-colors duration-150">
                  Login
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
