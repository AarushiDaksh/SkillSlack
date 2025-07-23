"use client";

import { useAuth, useUser, UserButton } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { isLoaded, isSignedIn } = useAuth();
  const { user: clerkUser } = useUser();
  const router = useRouter();

  const [userData, setUserData] = useState<any>(null);
  const [section, setSection] = useState("profile");

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in");
    }
  }, [isLoaded, isSignedIn]);

  useEffect(() => {
    const fetchUserData = async () => {
      const res = await fetch("/api/user/me");
      const data = await res.json();
      if (data.user) setUserData(data.user);
    };

    if (isSignedIn) fetchUserData();
  }, [isSignedIn]);

  if (!isLoaded || !isSignedIn || !userData) return null;

  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={() => router.push("/")}
          className="text-sm px-4 py-2 rounded-full border border-white/20 hover:bg-white/10 transition"
        >
          ← Back
        </button>
        <UserButton afterSignOutUrl="/" />
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-400">
        Welcome to SkillSlack
      </h1>
      <p className="text-center text-gray-400 mb-10">
        Code. Collaborate. Connect.
      </p>

      {/* Tabs */}
      <div className="flex justify-center space-x-4 mb-8">
        {["profile", "skills", "projects"].map((tab) => (
          <button
            key={tab}
            onClick={() => setSection(tab)}
            className={`px-4 py-2 rounded-full border border-white/10 transition text-sm font-medium ${
              section === tab
                ? "bg-white/10 text-white"
                : "hover:bg-white/5 text-white/70"
            }`}
          >
            {tab === "profile"
              ? "My Profile"
              : tab === "skills"
              ? "My Skills"
              : "My Projects"}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white/5 border border-white/10 p-6 rounded-xl max-w-3xl mx-auto">
        {section === "profile" && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Your Profile</h2>
            <div className="flex items-center gap-4 mt-4">
              {/* <img
                src={userData.image}
                alt="Avatar"
                className="w-24 h-24 rounded-full border-4 border-purple-500"
              /> */}
              {/* <div>
                <p className="font-bold text-lg text-purple-300">
                  {userData.name}
                </p>
                <p className="text-sm text-white/60">@{userData.username}</p>
              </div> */}
            </div>
            <p className="text-sm text-white/70 mt-4">
              Display and edit your personal information here.
            </p>
          </div>
        )}

        {section === "skills" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Your Skills</h2>
            <div className="flex flex-wrap gap-3">
              {userData.skills?.map((skill: string) => (
                <span
                  key={skill}
                  className="bg-purple-700/40 px-4 py-1 rounded-full text-sm border border-purple-500"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {section === "projects" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Your Projects</h2>
            <div className="grid grid-cols-1 gap-4">
              {userData.projects?.map((proj: any) => (
                <a
                  key={proj.name}
                  href={proj.link}
                  target="_blank"
                  className="block bg-[#161b22] p-4 rounded-lg border border-white/10 hover:border-purple-400 transition"
                >
                  <h3 className="text-lg font-bold text-purple-300">
                    {proj.name}
                  </h3>
                  <p className="text-sm text-gray-400 mt-2">
                    {proj.description}
                  </p>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
