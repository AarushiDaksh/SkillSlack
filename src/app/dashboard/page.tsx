'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [profile, setProfile] = useState<any>(null);
  const [newQ, setNewQ] = useState('');
  const [newA, setNewA] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/');
  }, [status]);

  useEffect(() => {
    const fetchProfile = async () => {
      if (session?.user?.email) {
        const res = await fetch(`/api/profile?email=${session.user.email}`);
        const data = await res.json();

        if (data && Object.keys(data).length > 0) {
          setProfile(data);
        } else {
          const newProfile = {
            email: session.user.email,
            name: session.user.name,
            image: session.user.image,
            location: 'India',
            language: 'English',
            skills: ['JavaScript', 'React'],
            learning: ['TypeScript'],
            questions: [],
          };
          const res = await fetch('/api/profile', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newProfile),
          });
          const created = await res.json();
          setProfile(created);
        }
      }
    };

    fetchProfile();
  }, [session]);

  const handleAddQA = async () => {
    if (!newQ.trim() || !newA.trim()) return;

    const updatedQuestions = [...(profile?.questions || []), { q: newQ, a: newA }];
    const updatedProfile = { ...profile, questions: updatedQuestions };

    setProfile(updatedProfile);
    setNewQ('');
    setNewA('');

    await fetch('/api/profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: profile.email, questions: updatedQuestions }),
    });
  };

  if (status === 'loading' || !profile) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black py-12 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Profile Panel */}
        <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 shadow-md">
          <div className="flex flex-col items-center text-center">
            <img
              src={profile.image?.startsWith("http") ? profile.image : '/avatar-placeholder.png'}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
            <h2 className="mt-4 text-xl font-bold">{profile.name}</h2>
            <p className="text-sm text-gray-500">@{profile.email?.split('@')[0]}</p>
          </div>

          <div className="mt-6 text-sm text-gray-700 dark:text-gray-300 space-y-1">
            <p>📍 {profile.location}</p>
            <p>🗣️ {profile.language}</p>
            <p>🛠️ Skills: {profile.skills?.join(', ')}</p>
            <p>🎓 Learning: {profile.learning?.join(', ')}</p>
          </div>

          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="mt-6 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        {/* Q&A Section */}
        <div className="md:col-span-2">
          <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 shadow-md">
            <h1 className="text-2xl font-semibold">Your Q&A Board</h1>
            <p className="text-sm text-gray-500 mt-1">
              Add questions and answers to showcase your knowledge.
            </p>

            {/* Add Q&A */}
            <div className="mt-6">
              <h3 className="font-medium text-lg mb-2">Add New</h3>
              <input
                type="text"
                placeholder="Your question..."
                value={newQ}
                onChange={(e) => setNewQ(e.target.value)}
                className="w-full px-4 py-2 border rounded mb-2 dark:bg-neutral-800"
              />
              <textarea
                placeholder="The answer..."
                value={newA}
                onChange={(e) => setNewA(e.target.value)}
                className="w-full px-4 py-2 border rounded mb-2 dark:bg-neutral-800"
              />
              <button
                onClick={handleAddQA}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Add Q&A
              </button>
            </div>

            {/* Q&A List */}
            <div className="mt-8 space-y-4">
              {profile.questions?.map((item: any, idx: number) => (
                <div key={idx} className="bg-gray-100 dark:bg-neutral-800 p-4 rounded">
                  <p className="font-semibold text-blue-600">Q: {item.q}</p>
                  <p className="mt-1 text-gray-700 dark:text-gray-300">A: {item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
