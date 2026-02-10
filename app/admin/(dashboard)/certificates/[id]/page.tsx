import { notFound } from 'next/navigation';
import connectDB from '@/lib/mongodb';
import Certificate from '@/models/Certificate';
import EditCertificateForm from './EditCertificateForm';

async function getCertificate(id: string) {
  await connectDB();
  const certificate = await Certificate.findById(id).lean();
  if (!certificate) return null;
  return JSON.parse(JSON.stringify(certificate));
}

export default async function EditCertificatePage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  const certificate = await getCertificate(id);

  if (!certificate) {
    notFound();
  }

  return <EditCertificateForm certificate={certificate} />;
}
