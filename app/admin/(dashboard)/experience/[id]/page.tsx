import { notFound } from 'next/navigation';
import connectDB from '@/lib/mongodb';
import Experience from '@/models/Experience';
import EditExperienceForm from './EditExperienceForm';

async function getExperience(id: string) {
  await connectDB();
  const experience = await Experience.findById(id).lean();
  if (!experience) return null;
  return JSON.parse(JSON.stringify(experience));
}

export default async function EditExperiencePage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  const experience = await getExperience(id);

  if (!experience) {
    notFound();
  }

  return <EditExperienceForm experience={experience} />;
}
