// /app/api/user/me/route.ts
import { auth, getAuth } from "@clerk/nextjs/server";
import { connect } from "@/utils/db";
import {User} from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  
    await connect();

  const user = await User.findOne({ clerkId: userId });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ user });
}
