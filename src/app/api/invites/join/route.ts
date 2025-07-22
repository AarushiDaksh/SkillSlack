import { connect } from "@/utils/db";
import  Invite  from "@/models/invite";
import { User } from "@/models/User";
import { Workspaces } from "@/models/Workspace";
import { getAuth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  await connect();

  const { userId: clerkId } = getAuth(req as any);
  const { token } = await req.json();

  if (!token || !clerkId) {
    return new Response(JSON.stringify({ error: "Missing token or auth" }), { status: 400 });
  }

  try {
    const invite = await Invite.findOne({ token });
    if (!invite) {
      return new Response(JSON.stringify({ error: "Invalid or expired invite" }), { status: 400 });
    }

    const mongoUser = await User.findOne({ clerkId });
    if (!mongoUser) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    const workspace = await Workspaces.findById(invite.workspaceId);
    if (!workspace) {
      return new Response(JSON.stringify({ error: "Workspace not found" }), { status: 404 });
    }

    // Prevent duplicate joins
    if (!workspace.members.includes(mongoUser._id)) {
      workspace.members.push(mongoUser._id);
      await workspace.save();
    }

    return new Response(JSON.stringify({
      success: true,
      message: "Joined workspace successfully"
    }), { status: 200 });

  } catch (error) {
    console.error("Join error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
