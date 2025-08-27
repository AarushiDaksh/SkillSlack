// app/api/join/route.ts
import { NextResponse, NextRequest } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { connect } from "@/utils/db";
import Invite from "@/models/Invite";            // ← default export
import {Workspace} from "@/models/Workspace";      // ← if yours is a named export, change to:  import { Workspace } from "@/models/Workspace";
import mongoose from "mongoose";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  // Auth
  const { userId } = getAuth(req);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Parse body
  let body: any = {};
  try {
    body = await req.json();
  } catch {
    /* ignore */
  }
  const code = typeof body?.code === "string" ? body.code.trim() : "";
  if (!code) {
    return NextResponse.json({ error: "code required" }, { status: 400 });
  }

  await connect();

  // Find invite (no .lean() so TS keeps schema typing)
  const invite = await Invite.findOne({ code });
  if (!invite || invite.active === false) {
    return NextResponse.json({ error: "Invalid invite" }, { status: 404 });
  }

  // Expiry check
  if (invite.expiresAt && invite.expiresAt.getTime() < Date.now()) {
    return NextResponse.json({ error: "Invite expired" }, { status: 410 });
  }

  // Validate workspace id
  const wsId = invite.workspaceId?.toString?.() ?? "";
  if (!mongoose.Types.ObjectId.isValid(wsId)) {
    return NextResponse.json({ error: "Workspace not found" }, { status: 404 });
  }

  // Load workspace
  const ws = await Workspace.findById(wsId);
  if (!ws) {
    return NextResponse.json({ error: "Workspace not found" }, { status: 404 });
  }

  // Ensure members array exists
  if (!Array.isArray(ws.members)) {
    ws.members = [];
  }

  // Add member if not already present
  const alreadyMember = ws.ownerId === userId || ws.members.includes(userId);
  if (!alreadyMember) {
    ws.members = Array.from(new Set([...ws.members, userId]));
    await ws.save();
  }

  return NextResponse.json({ success: true, workspaceId: ws._id.toString() });
}
