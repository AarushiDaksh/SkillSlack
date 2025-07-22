"use client";

import { useParams } from "next/navigation";

export default function ChannelPage() {
  const { id } = useParams();

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-semibold mb-4">Channel Page</h1>
      <p className="text-lg">Channel ID: {id}</p>
    </div>
  );
}
