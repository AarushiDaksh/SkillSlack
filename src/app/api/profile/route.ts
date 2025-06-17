import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Profile from '@/models/UserProfile';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const email = url.searchParams.get('email');

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    await connectDB();
    const profile = await Profile.findOne({ email });

    return NextResponse.json(profile || {});
  } catch (error) {
    console.error('GET /api/profile error:', error);
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    await connectDB();

    let profile = await Profile.findOne({ email });
    if (!profile) {
      profile = await Profile.create(body);
    }

    return NextResponse.json(profile);
  } catch (error) {
    console.error('POST /api/profile error:', error);
    return NextResponse.json({ error: 'Failed to save profile' }, { status: 500 });
  }
}
