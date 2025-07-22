"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { ReduxProvider } from "@/components/provider";
import UserSync from "@/components/UserSync";

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <ReduxProvider>
        <UserSync />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Toaster />
        </ThemeProvider>
      </ReduxProvider>
    </SessionProvider>
  );
}
