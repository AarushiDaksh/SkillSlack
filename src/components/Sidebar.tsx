"use client";

import { useState } from "react";
import { ClipboardCopy } from "lucide-react";
import { toast } from "sonner";

interface SidebarProps {
  workspaceId: string;
}

export default function Sidebar({ workspaceId }: SidebarProps) {
  const [inviteLink, setInviteLink] = useState("");

  const generateInvite = async () => {
    if (!workspaceId) {
      toast.error("Workspace ID missing.");
      return;
    }

    try {
      const res = await fetch("/api/invite/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ workspaceId }),
      });

      const data = await res.json();
      if (data?.inviteLink) {
        const fullLink = `${window.location.origin}/join/${data.inviteLink}`;
        setInviteLink(fullLink);
        toast.success("Invite link generated!");
      } else {
        toast.error(data?.error || "Failed to generate invite link");
      }
    } catch (error) {
      console.error("Invite generation error:", error);
      toast.error("Something went wrong.");
    }
  };

  const copyToClipboard = () => {
    if (!inviteLink) return;
    navigator.clipboard.writeText(inviteLink);
    toast.success("Link copied to clipboard!");
  };

  return (
    <aside className="bg-[#1e1f24] text-white h-full w-64 p-4 flex flex-col border-r border-white/10">
      <div className="font-bold text-2xl mb-6 text-purple-400">SkillSlack</div>

      <div className="mb-6">
        <p className="text-sm text-gray-400 mb-1">Channels</p>
        <ul className="space-y-2">
          <li className="hover:bg-white/10 px-2 py-1 rounded cursor-pointer"># general</li>
          <li className="hover:bg-white/10 px-2 py-1 rounded cursor-pointer"># dev-help</li>
        </ul>
      </div>

      <div className="mb-6">
        <button
          onClick={generateInvite}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded text-sm w-full"
        >
          Generate Invite Link
        </button>

        {inviteLink && (
          <div className="mt-3 bg-white/10 text-xs p-2 rounded flex items-center justify-between">
            <span className="truncate">{inviteLink}</span>
            <ClipboardCopy
              size={16}
              className="cursor-pointer ml-2 hover:text-purple-400"
              onClick={copyToClipboard}
            />
          </div>
        )}
      </div>

      <div className="mt-auto">
        <p className="text-sm text-gray-400 mb-1">Direct Messages</p>
        <ul className="space-y-2">
          <li className="hover:bg-white/10 px-2 py-1 rounded cursor-pointer">John Doe</li>
          <li className="hover:bg-white/10 px-2 py-1 rounded cursor-pointer">Aarushi Daksh</li>
        </ul>
      </div>
    </aside>
  );
}
