// app/api/profile/route.ts
import { connectDB } from '@/lib/mongodb';
import UserProfile from '@/models/UserProfile';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();

  const profile = await UserProfile.findOneAndUpdate(
    { email: body.email },
    { $set: body },
    { upsert: true, new: true }
  );

  return NextResponse.json(profile);
}

export async function GET(req: Request) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');

  const profile = await UserProfile.findOne({ email });
  return NextResponse.json(profile);
}
