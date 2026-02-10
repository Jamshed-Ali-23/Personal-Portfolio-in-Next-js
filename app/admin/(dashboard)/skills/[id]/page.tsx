import { notFound } from 'next/navigation';
import connectDB from '@/lib/mongodb';
import SkillCategory from '@/models/SkillCategory';
import EditSkillForm from './EditSkillForm';

async function getSkillCategory(id: string) {
  await connectDB();
  const category = await SkillCategory.findById(id).lean();
  if (!category) return null;
  return JSON.parse(JSON.stringify(category));
}

export default async function EditSkillCategoryPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  const category = await getSkillCategory(id);

  if (!category) {
    notFound();
  }

  return <EditSkillForm category={category} />;
}
