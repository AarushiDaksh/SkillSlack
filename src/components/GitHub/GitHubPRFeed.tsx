"use client";

import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import { Calendar, User, GitBranch, ChevronRight } from "lucide-react";
import { title } from "process";

type PR = {
  id: number;
  number: number;
  title: string;
  state: string;
  user: { login: string };
  html_url: string;
  created_at: string;
};

const PER_PAGE = 5;

export function GitHubPRFeed() {
  const [pulls, setPulls] = useState<PR[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [animationData, setAnimationData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/github/pulls?owner=vercel&repo=next.js")
      .then((res) => res.json())
      .then((data) => {
        setPulls(data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch("/github.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data));
  }, []);

  const totalPages = Math.ceil(pulls.length / PER_PAGE);
  const start = (page - 1) * PER_PAGE;
  const paginatedPRs = pulls.slice(start, start + PER_PAGE);

  return (
    <div className="px-4 sm:px-6 md:px-10 lg:px-20 py-12 bg-[#f5f5f5] dark:bg-black">
      {animationData && (
        <div className="flex justify-center mb-6">
          <div className="w-[350px] md:w-[480px]">
            <Lottie animationData={animationData} loop autoplay />
          </div>
        </div>
      )}

      <h3 className="text-2xl font-bold mb-10 text-center text-black dark:text-white">
        GitHub Pull Requests
      </h3>
      <h1 className="text-sm mb-3 text-gray-400 group font-medium mx-auto px-5 py-2 bg-gradient-to-tr from-zinc-300/20 via-purple-400/20 to-transparent dark:from-zinc-300/5 dark:via-purple-400/5 border border-white/10 rounded-3xl w-fit">
                Collaborate on GitHub pull requests and terminals
                <ChevronRight className="inline w-4 h-4 ml-2 group-hover:translate-x-1 duration-300" />
        </h1>
      {loading ? (
        <p className="text-center text-gray-600 dark:text-gray-400">Loading pull requests...</p>
      ) : pulls.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-400">No pull requests found.</p>
      ) : (
        <>
         <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
  {paginatedPRs.map((pr) => (
    <a
      key={pr.id}
      href={pr.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-xl border bg-[#f5f5f5] dark:bg-blac p-5 shadow-sm transition-all duration-200 hover:shadow-lg flex flex-col justify-between"
    >
      {/* Header Row */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-600/10 text-green-400 capitalize">
          {pr.state}
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          #{pr.number}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-md font-semibold text-black dark:text-white mb-2 line-clamp-2">
        {pr.title}
      </h3>

      {/* Meta */}
      <div className="mt-auto text-xs text-gray-400 flex flex-col gap-1">
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


          {/* Pagination */}
          <div className="flex justify-center mt-10 gap-2 text-black dark:text-white">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-3 py-1 rounded text-sm border disabled:opacity-50 bg-white dark:bg-zinc-800"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`px-3 py-1 rounded text-sm border ${
                  page === i + 1
                    ? "bg-blue-600 text-white dark:bg-blue-500"
                    : "bg-white dark:bg-zinc-800"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="px-3 py-1 rounded text-sm border disabled:opacity-50 bg-white dark:bg-zinc-800"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
