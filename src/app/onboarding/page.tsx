"use client";

import { useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";
import {
  Home,
  MessageCircle,
  Settings,
  Users,
  Link as LinkIcon,
  Plus,
  Menu,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useUser } from "@clerk/nextjs";
import { setWorkspace } from "@/store/slices/workspaceSlice";
import { setUser } from "@/store/slices/userSlice";

const sidebarItems = [
  { name: "Home", icon: <Home size={20} />, path: "/onboarding" },
  { name: "Channels", icon: <MessageCircle size={20} />, path: "/channels" },
  { name: "Direct Messages", icon: <Users size={20} />, path: "/dm" },
  { name: "Settings", icon: <Settings size={20} />, path: "/settings" },
];

export default function SkillSlackDashboard() {
  const [selected, setSelected] = useState("Home");
  const router = useRouter();
  const dispatch = useDispatch();
  const workspace = useAppSelector((state) => state.workspace);
  const [inviteLink, setInviteLink] = useState("");
  const { user, isLoaded, isSignedIn } = useUser();
  const [showSidebar, setShowSidebar] = useState(false);
  const [workspaceName, setWorkspaceName] = useState("");


  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in");
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded || !isSignedIn) return null;

  const generateInvite = async () => {
    const res = await fetch("/api/invites/create", {
      method: "POST",
      body: JSON.stringify({ workspaceId: workspace._id }),
    });
    const data = await res.json();
    if (data.success) setInviteLink(data.inviteLink);
  };

  const createAndJoinDemo = () => {
    router.push("/Demo");
  };

  const createWorkspace = async () => {
    if (!isLoaded || !user) return;
    const res = await fetch("/api/workspace", {
      method: "POST",
      body: JSON.stringify({
        name: "SkillSlack Team",
        userId: user.id,
      }),
    });
    const data = await res.json();
    if (data.success) {
      dispatch(setWorkspace(data.workspace));
      router.push("/dashboard/onboarding");
    } else {
      alert("Failed to create workspace: " + data.error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0e1015] text-white font-sans md:flex">
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setShowSidebar(!showSidebar)}
        className="md:hidden fixed top-4 right-4 z-50 p-2 rounded-md bg-[#1b1d23] text-white shadow-lg"
      >
        <Menu size={20} />
      </button>

      {/* Sidebar */}
    <aside
  className={`fixed md:static top-0 left-0 z-40 h-screen w-64 flex flex-col bg-[#1b1d23] border-r border-white/10 backdrop-blur-sm bg-opacity-90 shadow-xl transition-transform duration-300 transform
    md:translate-x-0 ${
      showSidebar ? "translate-x-0" : "-translate-x-full"
    }`}
>
  {/* Scrollable content */}
  <div className="flex-1 overflow-y-auto p-6">
    {/* Header */}
    <div className="flex items-center gap-3 mb-4 mt-7">
      <div className="w-11 h-11 bg-purple-500 rounded-full flex items-center justify-center text-lg font-bold shadow-lg">
        {workspace?.name?.[0] || "S"}
      </div>
      <div>
        <h2 className="text-lg font-semibold text-purple-300">
          {workspace?.name || "SkillSlack"}
        </h2>
        {user?.firstName && (
          <p className="text-sm text-white/60">
            Welcome, {user.firstName} 👋
          </p>
        )}
      </div>
    </div>

    {/* Navigation */}
    <nav className="space-y-2">
      {sidebarItems.map((item) => (
        <button
          key={item.name}
          onClick={() => {
            setSelected(item.name);
            router.push(item.path);
            setShowSidebar(false);
          }}
          className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
            selected === item.name
              ? "bg-purple-600/80 text-white shadow-lg"
              : "hover:bg-white/10 text-white/80"
          }`}
        >
          {item.icon}
          <span className="text-sm">{item.name}</span>
        </button>
      ))}
    </nav>

    {/* Invite */}
    <div className="mt-6">
      <button
        onClick={generateInvite}
        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 text-white py-2 rounded-md flex items-center justify-center gap-2 text-sm font-medium shadow-md"
      >
        <LinkIcon size={16} /> Invite Link
      </button>

      {inviteLink && (
        <div className="mt-3 text-sm bg-black/30 border border-white/10 px-3 py-2 rounded-md break-all text-purple-200">
          <p className="font-semibold mb-1 text-white">Invite:</p>
          <code>{inviteLink}</code>
        </div>
      )}
    </div>
  </div>

      {/* {Bottom-fixed Button */}
    <div className="p-6 border-t border-white/10 bg-[#1b1d23] flex-none space-y-3">
      <input
        type="text"
        value={workspaceName}
        onChange={(e) => setWorkspaceName(e.target.value)}
        placeholder="Enter workspace name"
        className="w-full px-3 py-2 rounded-md bg-[#2a2d36] border border-white/10 text-sm placeholder-white/40 text-white focus:outline-none focus:ring focus:ring-purple-500"
      />

      <button
        onClick={createWorkspace}
        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md text-sm font-semibold flex items-center justify-center gap-2 shadow-md"
        disabled={!workspaceName.trim()}
      >
        <Plus size={16} /> Create Workspace
      </button>
</div>
</aside>


      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto bg-gradient-to-br from-[#111318] to-[#1a1c22] min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-purple-300 drop-shadow">
          Create workspace and start building.
        </h1>

        <div className="bg-[#22242b] rounded-2xl border border-white/10 p-6 shadow-lg">
          <p className="text-lg text-white/90">
            Developer-first collaboration hub where you can:
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2 text-white/70 text-sm">
            <li>Create and join real-time code channels</li>
            <li>Chat via direct messages and team threads</li>
            <li>Collaborate on GitHub pull requests and terminals</li>
            <li>Join voice rooms for live meetings</li>
          </ul>

          <div className="mt-6 flex gap-4 flex-wrap">
            <button
              className="bg-white text-black hover:bg-gray-200 px-6 py-2 rounded-md text-sm font-semibold"
              onClick={() => alert("Voice room coming soon")}
            >
              Open Voice Room
            </button>

            <button
              className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-2 rounded-md text-sm font-semibold"
              onClick={createAndJoinDemo}
            >
              Create & Join Demo Workspace
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
