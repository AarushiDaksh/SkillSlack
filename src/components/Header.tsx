"use client";

import React from "react";
import { FloatingNav } from "@/components/ui/floating-navbar";

const navItems = [
  {
    name: "Explore Skills",
    link: "#explore",
  },
  {
    name: "How It Works",
    link: "#how-it-works",
  },
  {
    name: "Community",
    link: "#community",
  },
  {
    name: "Contact",
    link: "#contact",
  },
];

export const Header = () => {
  return (
    <FloatingNav
      navItems={navItems}
      className="py-2 px-4"
      showLogo={true}
      showThemeToggle={true}
    />
  );
};
