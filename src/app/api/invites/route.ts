import { NextResponse } from "next/server";
import  Invite  from "@/models/invite";
import { connect } from "@/utils/db";
import { getAuth } from "@clerk/nextjs/server";
import { User } from "@/models/User"; // optional: for MongoDB lookup

export async function POST(req: Request) {
  try {
    await connect();

    const { userId } = getAuth(req as any);
    const { emails } = await req.json();

    if (!emails || !Array.isArray(emails) || emails.length === 0) {
      return NextResponse.json({ error: "No emails provided" }, { status: 400 });
    }

    const invites = await Invite.insertMany(
      emails.map(email => ({
        email,
        invitedBy: userId || null,
      }))
    );

    return NextResponse.json({ success: true, invites }, { status: 201 });
  } catch (error) {
    console.error("Error creating invites:", error);
    return NextResponse.json({ error: "Failed to create invites" }, { status: 500 });
  }
}
