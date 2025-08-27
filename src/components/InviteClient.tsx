// components/InviteClient.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/store/hooks";
import { setWorkspace } from "@/store/slices/workspaceSlice";
import { Link as LinkIcon, Copy, RefreshCw, Share2, ExternalLink, Plus } from "lucide-react";

type WsItem = { _id: string; name: string; ownerId?: string };
type WorkspaceSlicePayload = { id: string; name: string; userId: string };

function toSlicePayload(w: WsItem, currentUserId?: string): WorkspaceSlicePayload {
  return { id: w._id, name: w.name, userId: w.ownerId ?? currentUserId ?? "" };
}

export default function InviteClient() { // ← removed { csp }
  const router = useRouter();
  const { isLoaded, isSignedIn, user } = useUser();
  const dispatch = useDispatch();

  const wsFromStore = useAppSelector((s) => s.workspace);
  const [wsList, setWsList] = useState<WsItem[]>([]);
  const [selectedWsId, setSelectedWsId] = useState<string>(
    (wsFromStore as any)?.id || (wsFromStore as any)?._id || ""
  );

  const [inviteLink, setInviteLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expiresInDays, setExpiresInDays] = useState<number>(0); // 0 = never

  useEffect(() => {
    const storeId = (wsFromStore as any)?.id || (wsFromStore as any)?._id;
    if (storeId && storeId !== selectedWsId) setSelectedWsId(storeId);
  }, [wsFromStore, selectedWsId]);

  const selectedWs = useMemo(
    () =>
      wsList.find((w) => w._id === selectedWsId) ||
      ((wsFromStore as any)?.id || (wsFromStore as any)?._id
        ? {
            _id: ((wsFromStore as any)?.id || (wsFromStore as any)?._id) as string,
            name: (wsFromStore as any)?.name as string,
            ownerId: (wsFromStore as any)?.userId as string | undefined,
          }
        : undefined),
    [wsList, selectedWsId, wsFromStore]
  );

  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn) {
      router.replace("/sign-in");
      return;
    }

    const ac = new AbortController();
    (async () => {
      try {
        const res = await fetch("/api/workspace/mine", { cache: "no-store", signal: ac.signal });
        if (!res.ok) return;

        const data = (await res.json()) as { workspaces: WsItem[] };
        const list = (data.workspaces || []).map((w) => ({
          _id: w._id,
          name: w.name,
          ownerId: (w as any).ownerId,
        }));
        setWsList(list);

        if (!selectedWsId && list.length) {
          setSelectedWsId(list[0]._id);
          dispatch(setWorkspace(toSlicePayload(list[0], user?.id)));
        }
      } catch {
        /* ignore */
      }
    })();

    return () => ac.abort();
  }, [isLoaded, isSignedIn, router, dispatch, selectedWsId, user?.id]);

  function parseCodeFromLink(link: string): string | null {
    try {
      const u = new URL(link);
      const code = u.pathname.split("/").filter(Boolean).pop();
      return code || null;
    } catch {
      return null;
    }
  }

  const code = useMemo(() => parseCodeFromLink(inviteLink) || "", [inviteLink]);

  async function generateInvite() {
    if (!selectedWsId) {
      setError("No workspace selected. Create or select a workspace first.");
      return;
    }
    setLoading(true);
    setError(null);
    setCopied(false);
    setCopiedCode(false);
    try {
      const res = await fetch("/api/invites/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          workspaceId: selectedWsId,
          ...(expiresInDays > 0 ? { expiresInDays } : {}),
        }),
      });
      const data = await res.json();

      if (data?.success && (data?.inviteLink || data?.code)) {
        const link =
          data.inviteLink ||
          `${typeof window !== "undefined" ? window.location.origin : ""}/join/${data.code}`;
        setInviteLink(link);
      } else {
        setError(data?.error || "Failed to create invite link.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
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
      setError("Could not copy. Select and copy manually.");
    }
  }

  async function shareLink() {
    if (!inviteLink) return;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Join SkillSlack",
          text: "Join my workspace on SkillSlack",
          url: inviteLink,
        });
      } catch {
        /* user cancelled */
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

  async function createWorkspaceInline() {
    const name = prompt("Workspace name", "My Team");
    if (!name?.trim() || !user) return;

    try {
      const res = await fetch("/api/workspace", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), userId: user.id }),
      });
      const data = await res.json();
      if (data?.success) {
        const newWs: WsItem = {
          _id: data.workspace._id,
          name: data.workspace.name,
          ownerId: data.workspace.ownerId ?? user.id,
        };
        setWsList((list) => [newWs, ...list]);
        setSelectedWsId(newWs._id);
        dispatch(setWorkspace(toSlicePayload(newWs, user.id)));
      } else {
        alert(data?.error || "Failed to create workspace");
      }
    } catch {
      alert("Network error while creating workspace");
    }
  }

  if (!isLoaded || !isSignedIn) {
    return (
      <div className="min-h-screen grid place-items-center bg-[#0e1015] text-white">
        <p className="text-white/60">Redirecting to sign in…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0e1015] text-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg">
        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#141720] to-[#1b1f2a] shadow-xl p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-white/10">
              <LinkIcon size={20} />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-semibold">Generate Invite Link</h1>
              <p className="text-white/60 text-xs sm:text-sm">Create a shareable link so anyone can join your workspace.</p>
            </div>
          </div>

          <div className="mb-4 grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-2">
            <select
              value={selectedWsId}
              onChange={(e) => {
                const id = e.target.value;
                setSelectedWsId(id);
                const ws = wsList.find((w) => w._id === id);
                if (ws) dispatch(setWorkspace(toSlicePayload(ws, user?.id)));
                setError(null);
              }}
              className="w-full rounded-lg bg-[#0e1015] border border-white/10 px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-purple-500/40"
            >
              {!selectedWsId && <option value="">Select workspace…</option>}
              {wsList.map((w) => (
                <option key={w._id} value={w._id}>
                  {w.name}
                </option>
              ))}
              {(wsFromStore as any)?.id &&
                !wsList.find((w) => w._id === (wsFromStore as any).id) && (
                  <option value={(wsFromStore as any).id}>{(wsFromStore as any).name}</option>
                )}
            </select>

            <button
              onClick={createWorkspaceInline}
              className="inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 bg-white/10 hover:bg-white/15"
              title="Create new workspace"
            >
              <Plus size={16} /> New
            </button>
          </div>

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
          </div>

          {error && (
            <div className="mb-4 text-sm text-red-300 bg-red-900/20 border border-red-500/30 rounded-lg px-3 py-2">
              {error}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <button
              onClick={generateInvite}
              disabled={loading || !selectedWsId}
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
                placeholder="Invite code (appears after generating a link)"
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

            {inviteLink && (
              <p className="text-xs text-white/50">
                Anyone with this link can join your workspace. Regenerate to invalidate the old one (if your backend deactivates previous invites).
              </p>
            )}

            {(copied || copiedCode) && (
              <div className="text-xs text-emerald-300 bg-emerald-900/20 border border-emerald-600/30 rounded-md px-3 py-2">
                {copied ? "Link copied!" : "Code copied!"}
              </div>
            )}
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-white/40">
          Workspace: <span className="text-white/70">{selectedWs?.name || "—"}</span>
        </p>
      </div>
    </div>
  );
}
