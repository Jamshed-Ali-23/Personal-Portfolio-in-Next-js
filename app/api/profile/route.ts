import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Profile from '@/models/Profile';

export async function GET() {
  try {
    await connectDB();
    const profile = await Profile.findOne();
    return NextResponse.json(profile);
  } catch (_error) {
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await connectDB();
    const data = await request.json();
    
    // Upsert - update if exists, create if not
    const profile = await Profile.findOneAndUpdate(
      {},
      data,
      { new: true, upsert: true, runValidators: true }
    );
    
    return NextResponse.json(profile);
  } catch (_error) {
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}
