// app/api/github/prs/route.ts
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const owner = searchParams.get("owner");
  const repo = searchParams.get("repo");
  const state = searchParams.get("state") || "open";
  const per_page = searchParams.get("per_page") || "30";

  if (!owner || !repo) {
    return NextResponse.json({ error: "owner and repo are required" }, { status: 400 });
  }

  const url = `https://api.github.com/repos/${owner}/${repo}/pulls?state=${state}&per_page=${per_page}`;

  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "SkillSlack-PRFeed",
  };

  // Strongly recommended to avoid 60/hr anon limit
  const token = process.env.GITHUB_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(url, {
    headers,
    cache: "no-store",
    // Revalidate immediately if someone hits it from a server component later
    next: { revalidate: 0 },
  });

  // Surface GitHub errors clearly
  if (!res.ok) {
    const text = await res.text();
    return NextResponse.json(
      { error: "GitHub error", status: res.status, body: text.slice(0, 500) },
      { status: 500 }
    );
  }

  const data = await res.json(); // This is an array from the pulls API
  return NextResponse.json(data, { status: 200 });
}
