"use client";

import { useParams } from "next/navigation";

export default function DirectMessagePage() {
  const { id } = useParams();

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-semibold mb-4">Direct Message</h1>
      <p className="text-lg">Chat with user ID: {id}</p>
    </div>
  );
}
