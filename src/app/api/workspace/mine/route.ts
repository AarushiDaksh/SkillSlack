import { NextResponse, NextRequest } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { connect as connect } from "@/utils/db";
import { Workspace, type IWorkspace } from "@/models/Workspace";
import type { FilterQuery } from "mongoose";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { userId } = getAuth(req);                      // ← use req
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connect();

    const filter: FilterQuery<IWorkspace> = { $or: [{ ownerId: userId }, { members: userId }] };
    const workspaces = await Workspace.find(filter)
      .select({ _id: 1, name: 1, ownerId: 1 })
      .sort({ updatedAt: -1 })
      .lean();

    return NextResponse.json({ workspaces });
  } catch (e) {
    console.error("WORKSPACE_MINE_ERROR", e);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
