// app/pull/page.tsx
"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu, X, Home, ArrowLeft, GitBranch, Sun, Moon } from "lucide-react";
import { GitHubPRFeed } from "@/components/GitHub/GitHubPRFeed";
import PRFilterBar, { PRState } from "@/components/GitHub/PRFilterBar";

export default function PRFeedPage() {
  const [open, setOpen] = useState(false);

  // filters
  const [owner, setOwner] = useState("vercel");
  const [repo, setRepo] = useState("next.js");
  const [state, setState] = useState<PRState>("open");
  const [perPage, setPerPage] = useState(30);
  const [filterKeys, setFilterKeys] = useState("");

  // pagination (page in parent; total computed from child)
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const totalPages = Math.max(1, Math.ceil(totalItems / perPage));

  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
  const [isDark, setIsDark] = useState<boolean>(false);

  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);

  // Theme init
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const dark = saved ? saved === "dark" : prefersDark;
    setIsDark(dark);
    document.documentElement.classList.toggle("dark", dark);
  }, []);
  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  // Close on ESC
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, []);

  // Click outside
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!open) return;
      const sidebar = sidebarRef.current;
      if (sidebar && !sidebar.contains(e.target as Node)) setOpen(false);
    };
    if (open) document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  // Body scroll lock
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // focus first link when opening
  useEffect(() => {
    if (!open) return;
    const id = requestAnimationFrame(() => firstLinkRef.current?.focus());
    return () => cancelAnimationFrame(id);
  }, [open]);

  // manual refresh trigger
  const [refreshKey, setRefreshKey] = useState(0);
  const doRefresh = () => {
    setRefreshKey((k) => k + 1);
    setLastRefresh(new Date());
  };

  // reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [owner, repo, state, perPage, filterKeys, refreshKey]);

  return (
    <div className="flex min-h-dvh bg-[#f5f5f5] text-black dark:bg-[#0a0b0f] dark:text-white relative">
      {/* Skip to content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-md focus:bg-white focus:px-3 focus:py-2 focus:text-black dark:focus:bg-zinc-900 dark:focus:text-white"
      >
        Skip to content
      </a>

      {/* Mobile topbar */}
   <header className="lg:hidden fixed top-0 inset-x-0 z-40 border-b border-black/10 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-white/10 dark:bg-zinc-900/80 dark:supports-[backdrop-filter]:bg-zinc-900/60"> <div className="px-4 py-3 flex items-center justify-between gap-2"> <h1 className="text-base font-semibold">GitHub Pull Requests</h1> <div className="flex items-center gap-2"> <button onClick={toggleTheme} className="inline-flex items-center justify-center rounded-md p-2 bg-white text-black shadow-sm ring-1 ring-black/10 dark:bg-zinc-800 dark:text-white dark:ring-white/10" aria-label="Toggle theme" title={isDark ? "Switch to light" : "Switch to dark"} > {isDark ? <Sun size={18} /> : <Moon size={18} />} </button> <button id="menu-toggle" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-controls="sidebar" aria-label="Toggle navigation" className="inline-flex items-center justify-center rounded-md p-2 bg-white text-black shadow-sm ring-1 ring-black/10 dark:bg-zinc-800 dark:text-white dark:ring-white/10" > {open ? <X size={18} /> : <Menu size={18} />} </button> </div> </div> </header>

      {/* Sidebar overlay (mobile) */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/30 backdrop-blur-sm lg:hidden"
          aria-hidden="true"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        id="sidebar"
        ref={sidebarRef}
        className={[
          "fixed lg:sticky top-0 right-0 lg:left-0 z-40 h-dvh w-[260px]",
          "bg-white/90 text-black backdrop-blur supports-[backdrop-filter]:bg-white/70",
          "dark:bg-zinc-900/90 dark:text-white dark:supports-[backdrop-filter]:bg-zinc-900/70",
          "border-l lg:border-l-0 lg:border-r border-black/10 dark:border-white/10",
          "px-4 lg:px-5 pt-[4.25rem] lg:pt-6 pb-6 flex flex-col",
          "transform transition-transform duration-300 motion-reduce:transition-none",
          open ? "translate-x-0" : "translate-x-full lg:translate-x-0",
        ].join(" ")}
      >
        <div className="hidden lg:flex items-center gap-2 font-bold mb-6">
          <div className="size-7 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 text-white flex items-center justify-center text-xs">
            S
          </div>
          <span>SkillSlack</span>
        </div>

        <nav className="flex flex-col gap-2 text-sm">
          <Link
            href="/"
            ref={firstLinkRef}
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 rounded-md px-2 py-2 hover:bg-black/5 focus:bg-black/5 dark:hover:bg-white/10 dark:focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          >
            <Home size={16} />
            Home
          </Link>
          <Link
            href="/pull"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 rounded-md px-2 py-2 bg-blue-600/10 text-blue-700 hover:bg-blue-600/15 dark:bg-blue-400/10 dark:text-blue-300 dark:hover:bg-blue-400/15 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          >
            <GitBranch size={16} />
            GitHub PRs
          </Link>
        </nav>

        <div className="mt-auto pt-6">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 rounded-md px-2 py-2 text-gray-700 hover:bg-black/5 dark:text-gray-300 dark:hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main id="main-content" className="flex-1 min-w-0">
        <div className="sticky top-0 z-30 hidden lg:block border-b border-black/10 bg-white/70 backdrop-blur dark:border-white/10 dark:bg-zinc-900/70">
          <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Link href="/" className="inline-flex items-center gap-2 text-sm text-blue-600 hover:underline dark:text-blue-400">
                <ArrowLeft size={16} /> Back
              </Link>
              <h1 className="text-lg font-semibold select-none">GitHub Pull Requests</h1>
            </div>
            <div className="hidden md:flex items-center gap-2 text-xs text-gray-600 dark:text-white/50">
              <span className="inline-block rounded-full border border-black/10 bg-white/60 px-2 py-1 backdrop-blur dark:border-white/15 dark:bg-white/5">
                PR Sync • Real-time updates
              </span>
              {lastRefresh && (
                <span className="ml-2">Last refresh: {lastRefresh.toLocaleTimeString()}</span>
              )}
            </div>
          </div>
        </div>

        {/* Filter bar + pagination */}
        <section className="mx-auto max-w-6xl px-4 sm:px-6 py-20 lg:py-8">
          <PRFilterBar
            owner={owner}
            repo={repo}
            state={state}
            perPage={perPage}
            filterKeys={filterKeys}
            onOwner={setOwner}
            onRepo={setRepo}
            onState={setState}
            onPerPage={setPerPage}
            onFilterKeys={setFilterKeys}
            onRefresh={doRefresh}
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </section>

        {/* Feed */}
        <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-16">
          <GitHubPRFeed
            key={`${owner}:${repo}:${state}:${perPage}:${filterKeys}:${refreshKey}:${page}`}
            owner={owner}
            repo={repo}
            state={state}
            per_page={perPage}
            page={page}
            filterKeys={filterKeys}
            onTotalChange={setTotalItems}
          />
        </section>
      </main>

      {/* Safe-area padding */}
      <style jsx global>{`
        @supports (padding: max(0px)) {
          header > div,
          main > section {
            padding-left: max(1rem, env(safe-area-inset-left));
            padding-right: max(1rem, env(safe-area-inset-right));
          }
        }
      `}</style>
    </div>
  );
}
