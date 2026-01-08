// app/api/github/prs/route.ts
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const owner = searchParams.get("owner");
  const repo = searchParams.get("repo");
  const state = searchParams.get("state") || "open";
  const per_page = searchParams.get("per_page") || "30";

  if (!owner || !repo) {
    return NextResponse.json(
      { error: "owner and repo are required" },
      { status: 400 }
    );
  }

  const url = `https://api.github.com/repos/${owner}/${repo}/pulls?state=${state}&per_page=${per_page}`;

  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "SkillSlack-PRFeed",
  };

  const token = process.env.GITHUB_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000); // 20s

  try {
    const res = await fetch(url, {
      headers,
      cache: "no-store",
      signal: controller.signal,
      next: { revalidate: 0 },
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        { error: "GitHub error", status: res.status, body: text.slice(0, 800) },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      {
        error: "Fetch to GitHub failed",
        message: err?.name === "AbortError" ? "Timed out" : err?.message,
        hint: "Network/DNS/firewall blocking api.github.com or unstable connection",
      },
      { status: 500 }
    );
  } finally {
    clearTimeout(timeout);
  }
}
