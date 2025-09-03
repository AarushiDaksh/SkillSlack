// components/GitHub/GitHubPRFeed.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import Lottie from "lottie-react";
import { Calendar, User, ChevronRight } from "lucide-react";

type PR = {
  id: number;
  number: number;
  title: string;
  state: string;
  user: { login: string };
  html_url: string;
  created_at: string;
  updated_at?: string;
};

type Props = {
  owner: string;
  repo: string;
  state?: "open" | "closed" | "all";
  per_page: number;          // page size
  page: number;              // current page (1-based)
  filterKeys?: string;
  onTotalChange?: (total: number) => void; // report total (after filter) to parent
};

export function GitHubPRFeed({
  owner,
  repo,
  state = "open",
  per_page,
  page,
  filterKeys = "",
  onTotalChange,
}: Props) {
  const [pulls, setPulls] = useState<PR[]>([]);
  const [loading, setLoading] = useState(true);
  const [animationData, setAnimationData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch PRs (grab up to 100 for client-side filter/pagination)
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const url = `/api/github/prs?owner=${encodeURIComponent(owner)}&repo=${encodeURIComponent(
          repo
        )}&state=${encodeURIComponent(state)}&per_page=100`; // fetch a large batch
        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
        const data = await res.json();
        const list: PR[] = Array.isArray(data) ? data : data?.items ?? [];
        if (!cancelled) setPulls(list);
      } catch (e: any) {
        if (!cancelled) setError(e?.message || "Failed to load");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [owner, repo, state]);

  // Optional Lottie header
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/github.json");
        if (res.ok) setAnimationData(await res.json());
      } catch {}
    })();
  }, []);

  // Filter + sort
  const filtered = useMemo(() => {
    const q = filterKeys.trim().toLowerCase();
    const base = !q
      ? pulls
      : pulls.filter((pr) => {
          const inTitle = pr.title.toLowerCase().includes(q);
          const inNumber = String(pr.number).includes(q.replace(/^#/, ""));
          const inAuthor = pr.user?.login?.toLowerCase().includes(q);
          return inTitle || inNumber || inAuthor;
        });
    return base
      .slice()
      .sort((a, b) => Date.parse(b.updated_at || b.created_at) - Date.parse(a.updated_at || a.created_at));
  }, [pulls, filterKeys]);

  // Report total back up
  useEffect(() => {
    onTotalChange?.(filtered.length);
  }, [filtered.length, onTotalChange]);

  // Slice for current page
  const start = (page - 1) * per_page;
  const pageItems = filtered.slice(start, start + per_page);

  return (
    <div className="px-4 sm:px-6 md:px-10 lg:px-20 py-8 bg-[#f5f5f5] dark:bg-black text-black dark:text-white rounded-2xl">
      {animationData && (
        <div className="flex justify-center mb-6">
          <div className="w-[320px] md:w-[420px]">
            <Lottie animationData={animationData} loop autoplay />
          </div>
        </div>
      )}

      <h3 className="text-2xl font-bold mb-2 text-center">GitHub Pull Requests</h3>
      <p className="text-sm mb-6 text-gray-600 dark:text-gray-400 text-center">
        Showing {pageItems.length} of {filtered.length} matching PRs
      </p>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6" aria-busy>
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-36 animate-pulse rounded-xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-zinc-900/40"
            />
          ))}
        </div>
      ) : error ? (
        <div className="rounded-lg border border-red-300/50 dark:border-red-900 p-4 text-sm text-red-700 dark:text-red-300">
          Failed to load PRs: {error}
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-xl border border-black/10 dark:border-white/10 p-8 text-center text-gray-600 dark:text-gray-400">
          No pull requests found.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {pageItems.map((pr) => (
              <a
                key={pr.id}
                href={pr.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-black p-5 shadow-sm transition-all duration-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 flex flex-col justify-between"
              >
                <div className="flex justify-between items-center mb-2">
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${
                      pr.state === "open"
                        ? "bg-green-600/10 text-green-500"
                        : pr.state === "closed"
                        ? "bg-red-600/10 text-red-500"
                        : "bg-gray-600/10 text-gray-500"
                    }`}
                  >
                    {pr.state}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">#{pr.number}</span>
                </div>

                <h3 className="text-md font-semibold mb-2 line-clamp-2">{pr.title}</h3>

                <div className="mt-auto text-xs text-gray-500 dark:text-gray-400 flex flex-col gap-1">
                  <span className="flex items-center gap-1">
                    <User size={13} /> {pr.user.login}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={13} /> {new Date(pr.created_at).toDateString()}
                  </span>
                </div>
              </a>
            ))}
          </div>

          {/* Sub tagline */}
          <h1 className="mt-8 text-sm mb-2 text-gray-500 dark:text-gray-400 group font-medium mx-auto px-5 py-2 bg-gradient-to-tr from-zinc-300/20 via-purple-400/20 to-transparent dark:from-zinc-300/5 dark:via-purple-400/5 border border-white/10 rounded-3xl w-fit">
            Collaborate on GitHub pull requests and terminals
            <ChevronRight className="inline w-4 h-4 ml-2 group-hover:translate-x-1 duration-300" />
          </h1>
        </>
      )}
    </div>
  );
}
