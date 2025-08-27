// app/api/workspace/[id]/route.ts
import { NextResponse, NextRequest } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { connect } from "@/utils/db";
import { Workspace } from "@/models/Workspace";
import { Types } from "mongoose";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getId(req: NextRequest) {
  const parts = new URL(req.url).pathname.split("/").filter(Boolean);
  const i = parts.indexOf("workspace");
  return i !== -1 ? parts[i + 1] ?? null : null;
}

export async function GET(req: NextRequest) {
  const { userId } = getAuth(req);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const id = getId(req);
  if (!id || !Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  await connect();

  const ws = await Workspace.findById(id)
    .select({ _id: 1, name: 1, ownerId: 1, members: 1 })
    .lean();

  if (!ws) return NextResponse.json({ workspace: null }, { status: 404 });

  const isMember = ws.ownerId === userId || (Array.isArray(ws.members) && ws.members.includes(userId));
  if (!isMember) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  return NextResponse.json({ workspace: ws });
}
