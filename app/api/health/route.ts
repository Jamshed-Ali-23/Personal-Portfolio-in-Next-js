import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';

export const dynamic = 'force-dynamic';

export async function GET() {
  const status: Record<string, unknown> = {
    timestamp: new Date().toISOString(),
    env: {
      MONGODB_URI: process.env.MONGODB_URI ? `set (${process.env.MONGODB_URI.substring(0, 20)}...)` : 'NOT SET',
      NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'NOT SET',
      NODE_ENV: process.env.NODE_ENV || 'NOT SET',
    },
  };

  try {
    const db = await connectDB();
    if (db) {
      status.mongodb = 'connected';
      // Try a simple query
      const collections = await db.connection.db?.listCollections().toArray();
      status.collections = collections?.map(c => c.name) || [];
    } else {
      status.mongodb = 'failed - connectDB returned null';
    }
  } catch (error) {
    status.mongodb = `error: ${(error as Error).message}`;
  }

  return NextResponse.json(status);
}
