// app/api/user/save/route.ts
import { auth } from "@clerk/nextjs/server";
import { connect } from "@/utils/db";
import { User } from "@/models/User";
import { NextResponse } from "next/server";

export async function POST() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connect();

  try {
    const existingUser = await User.findOne({ clerkId: userId });
    if (!existingUser) {
      const user = await fetch(`https://api.clerk.dev/v1/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
        },
      }).then(res => res.json());

      await User.create({
        clerkId: user.id,
        name: user.first_name + " " + user.last_name,
        email: user.email_addresses[0].email_address,
        image: user.image_url,
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Save user error:", err);
    return NextResponse.json({ error: "Failed to save user" }, { status: 500 });
  }
}
