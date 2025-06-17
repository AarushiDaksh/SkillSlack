import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Profile from '@/models/UserProfile';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    await connectDB();

    // Update if exists, else create
    const updatedProfile = await Profile.findOneAndUpdate(
      { email },
      { $set: body },
      { new: true, upsert: true }
    );

    return NextResponse.json(updatedProfile);
  } catch (error) {
    console.error('POST /api/profile error:', error);
    return NextResponse.json({ error: 'Failed to save profile' }, { status: 500 });
  }
}
