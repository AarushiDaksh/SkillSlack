import { NextResponse } from "next/server";
import { connect } from "@/utils/db";
import { Workspaces } from "@/models/Workspace";
import Invite from "@/models/invite";
import mongoose from "mongoose";
import { nanoid } from "nanoid";

export async function GET() {
  try {
    await connect();

    let workspace = await Workspaces.findOne({ name: "SkillSlack Demo" });

    if (!workspace) {
      workspace = await Workspaces.create({
        name: "SkillSlack Demo",
        creatorId: "demo-user",
        members: [],
      });
    }

    let invite = await Invite.findOne({ workspaceId: workspace._id });

    if (!invite) {
      const inviteCode = "geXwhcffxnsKH9Ww4-3_";

      invite = await Invite.create({
        workspaceId: workspace._id,
        code: inviteCode,
        invitedBy: new mongoose.Types.ObjectId(),
        token: nanoid(32),
      });
    }

    console.log("Created invite:", invite);

    return NextResponse.json({
      success: true,
      workspace,
      invite,
      inviteLink: `/join/${invite?.code || "MISSING-CODE"}`,
    });

  } catch (error) {
    console.error("Error seeding demo:", error);
    return NextResponse.json({ success: false, error: "Failed to create demo" }, { status: 500 });
  }
}
