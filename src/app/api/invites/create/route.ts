// src/app/api/invites/create/route.ts
import { NextResponse, NextRequest } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { connect as connect } from "@/utils/db";
import { Invite } from "@/models/Invite";
import { Workspace } from "@/models/Workspace";
import { generateInviteCode } from "@/lib/invites";
import { Types } from "mongoose";
import { z } from "zod";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const Body = z.object({
  workspaceId: z.string().min(1),
  expiresInDays: z.number().int().nonnegative().optional(), // 0/undefined = never
});

export async function POST(req: NextRequest) {
  try {
    const { userId } = getAuth(req); // ✅ not auth()
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const parsed = Body.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid body", details: parsed.error.flatten() }, { status: 400 });
    }
    const { workspaceId, expiresInDays } = parsed.data;

    await connect();

    const ws = await Workspace.findById(new Types.ObjectId(workspaceId));
    if (!ws) return NextResponse.json({ error: "Workspace not found" }, { status: 404 });

    const isMember = ws.ownerId === userId || ws.members.includes(userId);
    if (!isMember) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const code = generateInviteCode(7);
    const expiresAt =
      typeof expiresInDays === "number" && expiresInDays > 0
        ? new Date(Date.now() + expiresInDays * 86400000)
        : null;

    await Invite.create({
      code,
      workspaceId: ws._id,
      createdBy: userId,
      isActive: true,
      expiresAt,
      // NOTE: no token
    });

    const base = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
    return NextResponse.json({ success: true, code, inviteLink: `${base}/join/${code}`, expiresAt });
  } catch (e) {
    console.error("INVITE_CREATE_ERROR", e);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
