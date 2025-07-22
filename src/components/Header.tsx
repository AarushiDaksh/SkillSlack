"use client";

import React from "react";
import { FloatingNav } from "@/components/ui/floating-navbar";


export const HeaderH = () => {
  return (
    <FloatingNav
      className="py-2 px-4"
      showLogo={true}
      showThemeToggle={true}
    />
  );
};
