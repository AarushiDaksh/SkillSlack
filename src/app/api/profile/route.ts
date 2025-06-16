// app/api/profile/route.ts
import { connectDB } from '@/lib/mongodb';
import UserProfile from '@/models/UserProfile';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    if (!email) return NextResponse.json({ error: 'Missing email' }, { status: 400 });

    const profile = await UserProfile.findOne({ email });
    return NextResponse.json(profile || {});
  } catch (error) {
    console.error("GET /api/profile error:", error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const profile = await UserProfile.findOneAndUpdate(
      { email: body.email },
      { $set: body },
      { upsert: true, new: true }
    );

    return NextResponse.json(profile);
  } catch (error) {
    console.error("POST /api/profile error:", error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
