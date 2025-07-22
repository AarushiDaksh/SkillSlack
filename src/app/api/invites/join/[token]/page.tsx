"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

export default function JoinWorkspacePage() {
  const router = useRouter();
  const params = useParams();
  const { isLoaded, isSignedIn } = useAuth();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    const joinWorkspace = async () => {
      if (!isLoaded || !isSignedIn) return;

      const token = params.token as string;
      if (!token) {
        setStatus("error");
        return;
      }

      try {
        const res = await fetch("/api/invites/join", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        if (res.ok) {
          setStatus("success");
          setTimeout(() => router.push("/dashboard"), 2000); // Redirect after 2s
        } else {
          setStatus("error");
        }
      } catch (err) {
        setStatus("error");
      }
    };

    joinWorkspace();
  }, [isLoaded, isSignedIn, params, router]);

  return (
    <div className="flex justify-center items-center h-screen">
      {status === "loading" && <p className="text-lg font-medium">Joining workspace...</p>}
      {status === "success" && <p className="text-green-500 text-lg font-semibold">Joined successfully! 🚀</p>}
      {status === "error" && <p className="text-red-500 text-lg font-semibold">Invalid or expired invite.</p>}
    </div>
  );
}
