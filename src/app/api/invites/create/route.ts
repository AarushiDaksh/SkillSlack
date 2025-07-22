import { nanoid } from "nanoid";
import { connect } from "@/utils/db";
import  Invite  from "@/models/invite";
import { User } from "@/models/User";
import { getAuth } from "@clerk/nextjs/server";
import mongoose from "mongoose";

export async function POST(req: Request) {
  await connect();

  const { userId: clerkId } = getAuth(req as any) || {};
  const { workspaceId } = await req.json();

  // fallback test value for Thunder Client
  const testClerkId = clerkId || "user_305k81jVxCADZvcbQIMa65nuZoz"; // Replace with a real one if needed

  if (!testClerkId || !workspaceId) {
    return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400 });
  }

  try {
    const mongoUser = await User.findOne({ clerkId: testClerkId });
    if (!mongoUser) {
      return new Response(JSON.stringify({ error: "User not found in DB" }), { status: 404 });
    }

    const token = nanoid(20);
    const invite = await Invite.create({
      token,
      workspaceId: new mongoose.Types.ObjectId(workspaceId),
      invitedBy: mongoUser._id,
    });

    const inviteLink = `${process.env.NEXT_PUBLIC_APP_URL}/join/${token}`;
    return new Response(JSON.stringify({ success: true, inviteLink }), { status: 200 });
  } catch (error) {
    console.error("Invite creation failed:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
