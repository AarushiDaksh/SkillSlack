'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/');
  }, [status]);

  useEffect(() => {
    const fetchGitHubProfileAndSave = async () => {
      if (!session?.user?.email) return;

      const username = session.user.email.split('@')[0];

      try {
        const res = await fetch(`https://api.github.com/users/${username}`);
        const githubData = await res.json();

        const profilePayload = {
          email: session.user.email,
          name: githubData.name || session.user.name,
          image: githubData.avatar_url || session.user.image,
          bio: githubData.bio || '',
          location: githubData.location || 'India',
          language: 'English',
          skills: ['JavaScript', 'React'],
          learning: ['TypeScript'],
        };

        const saveRes = await fetch('/api/profile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(profilePayload),
        });

        const saved = await saveRes.json();
        setProfile(saved);
      } catch (err) {
        console.error('GitHub API or DB save failed:', err);
      }
    };

    fetchGitHubProfileAndSave();
  }, [session]);

  if (status === 'loading' || !profile)
    return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 dark:from-black dark:to-gray-900 py-12 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Panel */}
        <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 shadow-lg">
          <div className="flex flex-col items-center text-center">
            <img
              src={profile.image}
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover shadow-md"
            />
            <h2 className="mt-4 text-2xl font-extrabold text-gray-800 dark:text-white">{profile.name}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">@{profile.email?.split('@')[0]}</p>
            <a
              href={`https://github.com/${profile.email?.split('@')[0]}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 text-xs mt-1 hover:underline"
            >
              View GitHub Profile
            </a>
          </div>

          <div className="mt-6 text-sm text-gray-700 dark:text-gray-300 space-y-2">
            <p>📍 <span className="font-medium">Location:</span> {profile.location}</p>
            <p>🗣️ <span className="font-medium">Language:</span> {profile.language}</p>
            <p>🛠️ <span className="font-medium">Skills:</span> {profile.skills?.join(', ')}</p>
            <p>🎯 <span className="font-medium">Learning:</span> {profile.learning?.join(', ')}</p>
          </div>

          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="mt-8 w-full bg-red-500 text-white font-semibold py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        {/* About Panel */}
        <div className="md:col-span-2 bg-white dark:bg-neutral-900 rounded-2xl p-6 shadow-lg">
          <h1 className="text-3xl font-bold mb-2 text-gray-800 dark:text-white">Welcome to Your Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Here’s your professional space to manage your tech presence. You can showcase your skills, what you’re learning,
            and make updates to reflect your journey.
          </p>

          <div className="bg-gray-100 dark:bg-neutral-800 p-4 rounded-lg text-gray-700 dark:text-gray-300">
            <p><strong>Bio:</strong> {profile.bio || 'No bio available from GitHub.'}</p>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-700 dark:text-blue-300">💡 Skills</h3>
              <ul className="mt-2 list-disc list-inside text-sm">
                {profile.skills?.map((skill: string, idx: number) => (
                  <li key={idx}>{skill}</li>
                ))}
              </ul>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <h3 className="font-semibold text-green-700 dark:text-green-300">📚 Learning</h3>
              <ul className="mt-2 list-disc list-inside text-sm">
                {profile.learning?.map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
