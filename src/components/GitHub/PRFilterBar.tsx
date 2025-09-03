// components/GitHub/PRFilterBar.tsx
"use client";

import { Filter, Search, RefreshCw, ChevronLeft, ChevronRight } from "lucide-react";

export type PRState = "open" | "closed" | "all";

type Props = {
  owner: string;
  repo: string;
  state: PRState;
  perPage: number;
  filterKeys: string;
  onOwner: (v: string) => void;
  onRepo: (v: string) => void;
  onState: (v: PRState) => void;
  onPerPage: (v: number) => void;
  onFilterKeys: (v: string) => void;
  onRefresh?: () => void;

  // Pagination
  page: number;
  totalPages: number;
  onPageChange: (p: number) => void;

  className?: string;
};

export default function PRFilterBar({
  owner,
  repo,
  state,
  perPage,
  filterKeys,
  onOwner,
  onRepo,
  onState,
  onPerPage,
  onFilterKeys,
  onRefresh,
  page,
  totalPages,
  onPageChange,
  className = "",
}: Props) {
  const pages = getPageWindow(page, totalPages, 9);

  return (
    <div
      className={[
        "rounded-2xl border border-black/10 dark:border-white/10",
        "bg-white/70 dark:bg-zinc-900/60 backdrop-blur",
        "p-4 sm:p-5",
        className,
      ].join(" ")}
      role="region"
      aria-label="Pull request controls"
    >
      {/* Filters */}
      <div className="flex flex-col gap-3 sm:grid sm:grid-cols-2 lg:grid-cols-6">
        {/* Owner */}
        <label className="flex items-center gap-2 rounded-lg border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 px-3 py-2">
          <Search size={16} className="shrink-0" />
          <input
            value={owner}
            onChange={(e) => onOwner(e.target.value)}
            placeholder="Owner (e.g., vercel)"
            className="w-full bg-transparent outline-none text-sm
                       text-black dark:text-white
                       placeholder-black/60 dark:placeholder-white/50
                       dark:[color-scheme:dark]"
            aria-label="Repository owner"
            autoComplete="off"
          />
        </label>

        {/* Repo */}
        <label className="flex items-center gap-2 rounded-lg border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 px-3 py-2">
          <Search size={16} className="shrink-0" />
          <input
            value={repo}
            onChange={(e) => onRepo(e.target.value)}
            placeholder="Repo (e.g., next.js)"
            className="w-full bg-transparent outline-none text-sm
                       text-black dark:text-white
                       placeholder-black/60 dark:placeholder-white/50
                       dark:[color-scheme:dark]"
            aria-label="Repository name"
            autoComplete="off"
          />
        </label>

        {/* State */}
        <label className="flex items-center gap-2 rounded-lg border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 px-3 py-2">
          <Filter size={16} className="shrink-0" />
          <select
            value={state}
            onChange={(e) => onState(e.target.value as any)}
            className="w-full bg-transparent outline-none text-sm
                       text-black dark:text-white
                       dark:bg-zinc-900/0
                       dark:[color-scheme:dark]"
            aria-label="State filter"
          >
            <option className="bg-white dark:bg-zinc-900" value="open">Open</option>
            <option className="bg-white dark:bg-zinc-900" value="closed">Closed</option>
            <option className="bg-white dark:bg-zinc-900" value="all">All</option>
          </select>
        </label>

        {/* Per page */}
        <label className="flex items-center gap-2 rounded-lg border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 px-3 py-2">
          <Filter size={16} className="shrink-0" />
          <select
            value={perPage}
            onChange={(e) => onPerPage(Number(e.target.value))}
            className="w-full bg-transparent outline-none text-sm
                       text-black dark:text-white
                       dark:bg-zinc-900/0
                       dark:[color-scheme:dark]"
            aria-label="Results per page"
          >
            {[10, 20, 30, 50, 100].map((n) => (
              <option key={n} value={n} className="bg-white dark:bg-zinc-900">
                {n} / page
              </option>
            ))}
          </select>
        </label>

        {/* Keyword filter */}
        <label className="flex items-center gap-2 rounded-lg border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 px-3 py-2 col-span-2 lg:col-span-2">
          <Search size={16} className="shrink-0" />
          <input
            value={filterKeys}
            onChange={(e) => onFilterKeys(e.target.value)}
            placeholder="Filter by title, #number, author…"
            className="w-full bg-transparent outline-none text-sm
                       text-black dark:text-white
                       placeholder-black/60 dark:placeholder-white/50
                       dark:[color-scheme:dark]"
            aria-label="Keyword filter"
            autoComplete="off"
          />
        </label>

        {/* Refresh */}
        <div className="flex items-center justify-end">
          <button
            onClick={onRefresh}
            className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 active:scale-[.98] focus:outline-none focus:ring-2 focus:ring-blue-500/60 disabled:opacity-60"
            aria-label="Refresh pull requests"
          >
            <RefreshCw size={16} /> Refresh
          </button>
        </div>
      </div>

      {/* Pagination */}
      <nav
        className="mt-5 flex flex-wrap items-center justify-center gap-2"
        role="navigation"
        aria-label="Pagination"
      >
        <button
          type="button"
          onClick={() => onPageChange(Math.max(1, page - 1))}
          disabled={page <= 1}
          className="inline-flex items-center gap-1 px-3 py-1 rounded text-sm
                     border border-black/10 dark:border-white/10
                     disabled:opacity-50 bg-white dark:bg-zinc-800"
        >
          <ChevronLeft size={16} /> Previous
        </button>

        {pages.map((p, idx) =>
          p === "…" ? (
            <span
              key={`ellipsis-${idx}`}
              className="px-2 text-sm text-gray-500 dark:text-gray-400 select-none"
              aria-hidden="true"
            >
              …
            </span>
          ) : (
            <button
              key={p}
              type="button"
              onClick={() => onPageChange(p)}
              aria-current={p === page ? "page" : undefined}
              className={[
                "px-3 py-1 rounded text-sm border border-black/10 dark:border-white/10",
                p === page
                  ? "bg-blue-600 text-white dark:bg-blue-500"
                  : "bg-white dark:bg-zinc-800",
              ].join(" ")}
            >
              {p}
            </button>
          )
        )}

        <button
          type="button"
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
          disabled={page >= totalPages}
          className="inline-flex items-center gap-1 px-3 py-1 rounded text-sm
                     border border-black/10 dark:border-white/10
                     disabled:opacity-50 bg-white dark:bg-zinc-800"
        >
          Next <ChevronRight size={16} />
        </button>
      </nav>
    </div>
  );
}

function getPageWindow(current: number, total: number, maxButtons: number): Array<number | "…"> {
  if (total <= maxButtons) return Array.from({ length: total }, (_, i) => i + 1);
  const inner = maxButtons - 2; // keep first & last
  const half = Math.floor(inner / 2);
  let start = Math.max(2, current - half);
  let end = Math.min(total - 1, start + inner - 1);
  if (end - start + 1 < inner) start = Math.max(2, end - inner + 1);
  const out: Array<number | "…"> = [1];
  if (start > 2) out.push("…");
  for (let p = start; p <= end; p++) out.push(p);
  if (end < total - 1) out.push("…");
  out.push(total);
  return out;
}
