import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { connect as connect } from "@/utils/db";
import { Workspace } from "@/models/Workspace";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connect();

    const { name } = (await req.json()) as { name?: string };
    if (!name?.trim()) return NextResponse.json({ error: "name required" }, { status: 400 });

    const workspace = await Workspace.create({
      name: name.trim(),
      ownerId: userId,
      members: [userId],
    });

    return NextResponse.json({ success: true, workspace }, { status: 201 });
  } catch (err) {
    console.error("WORKSPACE_CREATE_ERROR", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
