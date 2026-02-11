import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Certificate from '@/models/Certificate';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    await connectDB();
    const certificate = await Certificate.findById(id);
    
    if (!certificate) {
      return NextResponse.json({ error: 'Certificate not found' }, { status: 404 });
    }
    
    return NextResponse.json(certificate);
  } catch (_error) {
    return NextResponse.json({ error: 'Failed to fetch certificate' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    await connectDB();
    const data = await request.json();
    
    const certificate = await Certificate.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    
    if (!certificate) {
      return NextResponse.json({ error: 'Certificate not found' }, { status: 404 });
    }
    
    return NextResponse.json(certificate);
  } catch (_error) {
    return NextResponse.json({ error: 'Failed to update certificate' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    await connectDB();
    const certificate = await Certificate.findByIdAndDelete(id);
    
    if (!certificate) {
      return NextResponse.json({ error: 'Certificate not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Certificate deleted successfully' });
  } catch (_error) {
    return NextResponse.json({ error: 'Failed to delete certificate' }, { status: 500 });
  }
}
