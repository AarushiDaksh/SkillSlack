// /app/api/github/pulls/route.ts
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const owner = searchParams.get("owner");
  const repo = searchParams.get("repo");

  if (!owner || !repo) {
    return new Response(JSON.stringify({ error: "Missing owner/repo" }), { status: 400 });
  }

  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/pulls`, {
    headers: {
      Authorization: `token ${process.env.GITHUB_TOKEN}`, // 🔒 use a GitHub PAT
    },
    next: { revalidate: 30 },
  });

  const data = await res.json();
  return Response.json(data);
}
