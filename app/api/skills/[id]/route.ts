import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import SkillCategory from '@/models/SkillCategory';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    await connectDB();
    const skill = await SkillCategory.findById(id);
    
    if (!skill) {
      return NextResponse.json({ error: 'Skill category not found' }, { status: 404 });
    }
    
    return NextResponse.json(skill);
  } catch (_error) {
    return NextResponse.json({ error: 'Failed to fetch skill category' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    await connectDB();
    const data = await request.json();
    
    const skill = await SkillCategory.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    
    if (!skill) {
      return NextResponse.json({ error: 'Skill category not found' }, { status: 404 });
    }
    
    return NextResponse.json(skill);
  } catch (_error) {
    return NextResponse.json({ error: 'Failed to update skill category' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    await connectDB();
    const skill = await SkillCategory.findByIdAndDelete(id);
    
    if (!skill) {
      return NextResponse.json({ error: 'Skill category not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Skill category deleted successfully' });
  } catch (_error) {
    return NextResponse.json({ error: 'Failed to delete skill category' }, { status: 500 });
  }
}
