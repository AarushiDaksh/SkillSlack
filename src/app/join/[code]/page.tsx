"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useDispatch } from "react-redux";
import { setWorkspace } from "@/store/slices/workspaceSlice";

type Ws = { _id: string; name: string; ownerId?: string };

export default function JoinByCodePage() {
  const { code } = useParams<{ code: string }>();
  const router = useRouter();
  const dispatch = useDispatch();
  const { isLoaded, isSignedIn } = useUser();

  const [status, setStatus] = useState<"idle" | "joining" | "success" | "error">("idle");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    if (!isLoaded) return;

    // if not signed in, redirect to sign-in and come back here
    if (!isSignedIn) {
      router.replace(`/sign-in?redirect_url=/join/${code}`);
      return;
    }

    // call join API
    const run = async () => {
      setStatus("joining");
      setMessage("Joining workspace…");
      try {
        const res = await fetch("/api/invites/join", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code }),
        });
        const data = await res.json();

        if (!res.ok || !data?.success) {
          throw new Error(data?.error || "Unable to join with this invite.");
        }

        const wsId = data.workspaceId as string;

        // fetch minimal workspace info so Redux has name/id
        try {
          const wres = await fetch(`/api/workspace/${wsId}`, { cache: "no-store" });
          if (wres.ok) {
            const wjson = (await wres.json()) as { workspace: Ws | null };
            if (wjson.workspace) {
              const w = wjson.workspace;
              dispatch(
                setWorkspace({
                  id: w._id,
                  name: w.name,
                  userId: w.ownerId ?? "",
                })
              );
            }
          }
        } catch {
          /* non-fatal */
        }

        setStatus("success");
        setMessage("Joined! Redirecting…");
        // take them to your main area; adjust path if you prefer /channels etc.
        setTimeout(() => router.replace("/channels"), 600);
      } catch (e: any) {
        setStatus("error");
        setMessage(e?.message || "Failed to join workspace.");
      }
    };

    run();
  }, [isLoaded, isSignedIn, router, code, dispatch]);

  return (
    <div className="min-h-screen grid place-items-center bg-[#0e1015] text-white px-6">
      <div className="max-w-md w-full rounded-2xl border border-white/10 bg-[#181b24] p-6 text-center">
        <h1 className="text-xl font-semibold mb-2">Joining workspace</h1>
        <p className="text-white/70">
          {status === "joining" && (message || "One moment…")}
          {status === "success" && (message || "Success!")}
          {status === "error" && (message || "This invite is invalid or expired.")}
        </p>

        {status === "error" && (
          <div className="mt-6 flex justify-center gap-3">
            <button
              onClick={() => router.replace("/onboarding")}
              className="px-4 py-2 rounded-md bg-white/10 hover:bg-white/15"
            >
              Go to Onboarding
            </button>
            <button
              onClick={() => router.replace("/")}
              className="px-4 py-2 rounded-md bg-white text-black hover:bg-gray-200"
            >
              Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
