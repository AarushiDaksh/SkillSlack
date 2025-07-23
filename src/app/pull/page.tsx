"use client";

import { GitHubPRFeed } from "@/components/GitHub/GitHubPRFeed";
import Link from "next/link";
import { Menu, Home, ArrowLeft, GitBranch } from "lucide-react";
import { useState, useEffect } from "react";

export default function PRFeedPage() {
  const [showMobileNav, setShowMobileNav] = useState(false);

  // Close sidebar on route change or ESC key press
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowMobileNav(false);
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  // Close sidebar when clicked outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const sidebar = document.getElementById("sidebar");
      if (
        sidebar &&
        !sidebar.contains(e.target as Node) &&
        (e.target as HTMLElement).closest("button")?.id !== "menu-toggle"
      ) {
        setShowMobileNav(false);
      }
    };

    if (showMobileNav) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showMobileNav]);

  return (
    <div className="flex h-screen overflow-hidden bg-[#f5f5f5] dark:bg-black text-black dark:text-white relative">
      {/* Mobile Sidebar Toggle Button */}
      <button
        id="menu-toggle"
        onClick={() => setShowMobileNav(!showMobileNav)}
        className="md:hidden fixed top-4 right-4 z-50 p-2 rounded-md bg-white dark:bg-zinc-800 shadow-md"
      >
        <Menu size={20} />
      </button>

      {/* Sidebar */}
      <aside
        id="sidebar"
        className={`fixed top-0 right-0 z-40 h-full w-[240px] bg-white dark:bg-zinc-900 border-l border-gray-200 dark:border-white/10 px-4 py-6 flex flex-col transform transition-transform duration-300 md:relative md:border-r md:border-l-0 md:left-0 md:translate-x-0 ${
          showMobileNav ? "translate-x-0" : "translate-x-full md:translate-x-0"
        }`}
      >
        <h2 className="text-xl font-bold mb-6">SkillSlack</h2>

        <nav className="flex flex-col gap-4 text-sm">
          <Link
            href="/"
            onClick={() => setShowMobileNav(false)}
            className="flex items-center gap-2 hover:underline"
          >
            <Home size={16} /> Home
          </Link>
          <Link
            href="/pull"
            onClick={() => setShowMobileNav(false)}
            className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium"
          >
            <GitBranch size={16} /> GitHub PRs
          </Link>
        </nav>

        <div className="mt-auto pt-6">
          <Link
            href="/"
            onClick={() => setShowMobileNav(false)}
            className="flex items-center gap-2 text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white"
          >
            <ArrowLeft size={16} /> Back to Home
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-full overflow-y-auto">
        {/* Top navbar */}
        <header className="w-full px-4 md:px-10 py-4 flex items-center justify-between border-b border-gray-200 dark:border-white/10 bg-white dark:bg-zinc-900 sticky top-0 z-30">
          <h1 className="text-lg font-bold">GitHub Pull Requests</h1>
          <Link href="/" className="text-sm text-blue-500 hover:underline hidden md:inline">
            ← Go Back
          </Link>
        </header>

        {/* PR Feed */}
        <GitHubPRFeed />
      </main>
    </div>
  );
}
