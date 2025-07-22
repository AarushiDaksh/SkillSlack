"use client";

import { useAuth, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();

  const [section, setSection] = useState("profile");

  useEffect(() => {
    fetch("/api/user/save", { method: "POST" });
  }, []);

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in");
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded || !isSignedIn) return null;

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={() => router.push("/")}
          className="text-sm px-4 py-2 rounded-full border border-white/20 hover:bg-white/10 transition"
        >
          ← Back
        </button>
        <UserButton afterSignOutUrl="/" />
      </div>

      <h1 className="text-3xl font-bold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-400">
        Welcome to SkillSlack
      </h1>
      <p className="text-center text-gray-400 mb-10">Code. Collaborate. Connect.</p>

      <div className="flex justify-center space-x-4 mb-8">
        <button
          onClick={() => setSection("profile")}
          className={`px-4 py-2 rounded-full border border-white/10 transition ${
            section === "profile" ? "bg-white/10" : "hover:bg-white/5"
          }`}
        >
          My Profile
        </button>
        <button
          onClick={() => setSection("skills")}
          className={`px-4 py-2 rounded-full border border-white/10 transition ${
            section === "skills" ? "bg-white/10" : "hover:bg-white/5"
          }`}
        >
          My Skills
        </button>
        <button
          onClick={() => setSection("projects")}
          className={`px-4 py-2 rounded-full border border-white/10 transition ${
            section === "projects" ? "bg-white/10" : "hover:bg-white/5"
          }`}
        >
          My Projects
        </button>
      </div>

      <div className="bg-white/5 border border-white/10 p-6 rounded-xl max-w-3xl mx-auto">
        {section === "profile" && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Your Profile</h2>
            <p className="text-sm text-gray-300">Display and edit your personal information here.</p>
          </div>
        )}
        {section === "skills" && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Your Skills</h2>
            <p className="text-sm text-gray-300">Add or update your skillset.</p>
          </div>
        )}
        {section === "projects" && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Your Projects</h2>
            <p className="text-sm text-gray-300">Showcase your latest work and contributions.</p>
          </div>
        )}
      </div>
    </div>
  );
}