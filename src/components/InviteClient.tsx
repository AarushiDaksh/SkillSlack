// components/InviteClient.tsx
"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Link as LinkIcon,
  Copy,
  RefreshCw,
  Share2,
  ExternalLink,
  Plus,
} from "lucide-react";

export default function InviteClient() {
  const router = useRouter();

  const [inviteLink, setInviteLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [expiresInDays, setExpiresInDays] = useState<number>(0);

  // --- Utilities
  function parseCodeFromLink(link: string): string | null {
    try {
      const u = new URL(link);
      return u.pathname.split("/").filter(Boolean).pop() ?? null;
    } catch {
      return null;
    }
  }
  const code = useMemo(() => parseCodeFromLink(inviteLink) || "", [inviteLink]);

  // --- Fake generation
  async function generateInvite() {
    setLoading(true);
    setCopied(false);
    setCopiedCode(false);

    // Just simulate a link with random code
    const fakeCode = Math.random().toString(36).slice(2, 8);
    const link = `${window.location.origin}/join/${fakeCode}`;
    setInviteLink(link);

    setLoading(false);
  }

  async function copyToClipboard(text: string, which: "link" | "code") {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      if (which === "link") {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      } else {
        setCopiedCode(true);
        setTimeout(() => setCopiedCode(false), 1500);
      }
    } catch {
      // ignore
    }
  }

  async function shareLink() {
    if (!inviteLink) return;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Join Workspace",
          text: "Here’s my invite link",
          url: inviteLink,
        });
      } catch {
        /* cancelled */
      }
    } else {
      copyToClipboard(inviteLink, "link");
    }
  }

  function openJoinPage() {
    if (!inviteLink) return;
    const c = parseCodeFromLink(inviteLink);
    if (c) router.push(`/join/${c}`);
    else window.open(inviteLink, "_blank");
  }

  // --- UI
  return (
    <div className="min-h-screen bg-[#0e1015] text-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg">
        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#141720] to-[#1b1f2a] shadow-xl p-5 sm:p-6">
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-white/10">
              <LinkIcon size={20} />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-semibold">
                Generate Invite Link (Demo)
              </h1>
              <p className="text-white/60 text-xs sm:text-sm">
                UI only — no backend required.
              </p>
            </div>
          </div>

          {/* Expiry + Fake workspace btn */}
          <div className="mb-4 grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-2">
            <div className="flex items-center gap-2">
              <label className="text-xs text-white/60">Expiry</label>
              <select
                value={String(expiresInDays)}
                onChange={(e) => setExpiresInDays(Number(e.target.value))}
                className="rounded-md bg-[#0e1015] border border-white/10 px-2 py-1 text-xs focus:outline-none"
                title="Invite link expiry"
              >
                <option value="0">Never</option>
                <option value="7">7 days</option>
                <option value="30">30 days</option>
              </select>
            </div>
            <button
              onClick={() => alert("Workspace creation disabled in demo")}
              className="inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 bg-white/10 hover:bg-white/15"
              title="Create new workspace"
            >
              <Plus size={16} /> New
            </button>
          </div>

          {/* Generate + Open */}
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <button
              onClick={generateInvite}
              disabled={loading}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 bg-purple-600 hover:bg-purple-700 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <RefreshCw className="animate-spin" size={18} /> Generating…
                </>
              ) : inviteLink ? (
                <>
                  <RefreshCw size={18} /> Regenerate
                </>
              ) : (
                <>
                  <LinkIcon size={18} /> Generate Link
                </>
              )}
            </button>
            <button
              onClick={openJoinPage}
              disabled={!inviteLink}
              className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 bg-white text-black hover:bg-gray-200 disabled:opacity-60"
              title="Open join page"
            >
              <ExternalLink size={18} /> Open
            </button>
          </div>

          {/* Link + code display */}
          <div className="space-y-3">
            <div className="relative">
              <input
                value={inviteLink}
                readOnly
                placeholder="Your invite link will appear here"
                className="w/full rounded-lg bg-[#0e1015] border border-white/10 px-4 py-3 pr-28 text-sm sm:text-base placeholder-white/40 focus:outline-none focus:ring focus:ring-purple-500/40"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
                <button
                  onClick={shareLink}
                  disabled={!inviteLink}
                  className="rounded-md px-3 py-2 bg-white/10 hover:bg-white/15 disabled:opacity-60"
                  title="Share"
                >
                  <Share2 size={16} />
                </button>
                <button
                  onClick={() => copyToClipboard(inviteLink, "link")}
                  disabled={!inviteLink}
                  className="rounded-md px-3 py-2 bg-white/10 hover:bg-white/15 disabled:opacity-60"
                  title="Copy link"
                >
                  <Copy size={16} />
                </button>
              </div>
            </div>

            <div className="relative">
              <input
                value={code}
                readOnly
                placeholder="Invite code"
                className="w/full rounded-lg bg-[#0e1015] border border-white/10 px-4 py-3 pr-16 text-sm placeholder-white/40 focus:outline-none focus:ring focus:ring-purple-500/40"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2">
                <button
                  onClick={() => copyToClipboard(code, "code")}
                  disabled={!code}
                  className="rounded-md px-3 py-2 bg-white/10 hover:bg-white/15 disabled:opacity-60"
                  title="Copy code"
                >
                  <Copy size={16} />
                </button>
              </div>
            </div>

            {(copied || copiedCode) && (
              <div className="text-xs text-emerald-300 bg-emerald-900/20 border border-emerald-600/30 rounded-md px-3 py-2">
                {copied ? "Link copied!" : "Code copied!"}
              </div>
            )}
          </div>

          {/* Back to Home */}
          <div className="mt-6 text-center">
            <button
              onClick={() => router.push("/")}
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-sm"
            >
              ⬅ Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
