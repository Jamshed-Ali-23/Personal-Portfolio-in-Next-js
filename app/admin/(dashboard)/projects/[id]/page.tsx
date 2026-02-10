import { notFound } from 'next/navigation';
import connectDB from '@/lib/mongodb';
import Project from '@/models/Project';
import EditProjectForm from './EditProjectForm';

async function getProject(id: string) {
  await connectDB();
  const project = await Project.findById(id).lean();
  if (!project) return null;
  return JSON.parse(JSON.stringify(project));
}

export default async function EditProjectPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  const project = await getProject(id);

  if (!project) {
    notFound();
  }

  return <EditProjectForm project={project} />;
}
