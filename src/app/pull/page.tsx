"use client";

import { GitHubPRFeed } from "@/components/GitHub/GitHubPRFeed";
import Link from "next/link";
import { Menu, Home, ArrowLeft, GitBranch } from "lucide-react";
import { useState } from "react";

export default function PRFeedPage() {
  const [showMobileNav, setShowMobileNav] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#f5f5f5] dark:bg-black text-black dark:text-white">
      {/* Mobile Sidebar Toggle */}
      <div className="md:hidden absolute top-4 right-4 z-50">
        <button
          onClick={() => setShowMobileNav(!showMobileNav)}
          className="p-2 rounded-full bg-white dark:bg-zinc-800 shadow-md"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed md:relative z-40 top-0 left-0 h-full w-[240px] bg-white dark:bg-zinc-900 border-r border-gray-200 dark:border-white/10 px-4 py-6 flex flex-col transform transition-transform duration-300 ${
          showMobileNav ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <h2 className="text-xl font-bold mb-6">SkillSlack</h2>

        <nav className="flex flex-col gap-4 text-sm">
          <Link href="/" className="flex items-center gap-2 hover:underline">
            <Home size={16} /> Home
          </Link>
          <Link
            href="/pulls"
            className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium"
          >
            <GitBranch size={16} /> GitHub PRs
          </Link>
        </nav>

        <div className="mt-auto pt-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white"
          >
            <ArrowLeft size={16} /> Back to Home
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Top navbar */}
        <header className="w-full px-4 md:px-10 py-4 flex items-center justify-between border-b border-gray-200 dark:border-white/10 bg-white dark:bg-zinc-900 sticky top-0 z-30">
          <h1 className="text-lg font-bold">GitHub Pull Requests</h1>
          <Link href="/" className="text-sm text-blue-500 hover:underline hidden md:inline">
            ← Go Back
          </Link>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <GitHubPRFeed />
        </div>
      </main>
    </div>
  );
}
