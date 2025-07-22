import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/utils/db";
import {Workspaces} from "@/models/Workspace";

export async function POST(req: NextRequest) {
  try {
    await connect();
    const { name, userId } = await req.json();

    if (!name || !userId) {
      return NextResponse.json({ success: false, error: "Missing fields" }, { status: 400 });
    }

    const newWorkspace = await Workspaces.create({ name, createdBy: userId });

    return NextResponse.json({ success: true, workspace: newWorkspace }, { status: 201 });
  } catch (err) {
    console.error("Workspace creation error:", err);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
