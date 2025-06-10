'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status]);

  if (status === 'loading') return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black py-12 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left: Profile Card */}
        <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 shadow-md">
          <div className="flex flex-col items-center text-center">
            <img
              src={session?.user?.image || '/avatar-placeholder.png'}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
            <h2 className="mt-4 text-xl font-bold">{session?.user?.name}</h2>
            <p className="text-sm text-gray-500">@{session?.user?.email?.split('@')[0]}</p>
          </div>

          <div className="mt-6 space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <p>📍 Located in India</p>
            <p>📅 Joined June 2025</p>
            <p>💬 Language: English (Fluent)</p>
          </div>

          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="mt-6 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        {/* Right: Dashboard Details */}
        <div className="md:col-span-2">
          <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 shadow-md">
            <h1 className="text-2xl font-semibold">Hi 👋 Let’s build your SkillSwap profile</h1>
            <p className="text-sm text-gray-500 mt-1">
              Help others learn about your skills and how you can contribute or collaborate.
            </p>

            {/* Profile Checklist */}
            <div className="mt-6">
              <h3 className="font-medium text-lg">Profile checklist</h3>
              <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="w-1/3 bg-blue-500 h-full" />
              </div>

              <div className="mt-4 space-y-3">
                <div className="bg-gray-100 dark:bg-neutral-800 p-4 rounded-lg flex justify-between items-center">
                  <div>
                    <p className="font-medium">Add a bio or intro</p>
                    <p className="text-sm text-gray-500">Tell users about your expertise.</p>
                  </div>
                  <button className="text-blue-500 text-sm font-semibold">Add</button>
                </div>
                <div className="bg-gray-100 dark:bg-neutral-800 p-4 rounded-lg flex justify-between items-center">
                  <div>
                    <p className="font-medium">List your skills or services</p>
                    <p className="text-sm text-gray-500">Share what you offer or want to learn.</p>
                  </div>
                  <button className="text-blue-400 text-sm font-semibold">Add</button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
