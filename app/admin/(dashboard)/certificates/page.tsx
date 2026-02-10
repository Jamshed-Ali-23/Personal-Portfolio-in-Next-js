import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, ExternalLink, EyeOff } from 'lucide-react';
import connectDB from '@/lib/mongodb';
import Certificate from '@/models/Certificate';
import DeleteButton from '@/components/admin/DeleteButton';

async function getCertificates() {
  await connectDB();
  const certificates = await Certificate.find().sort({ order: 1, createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(certificates));
}

export default async function CertificatesPage() {
  const certificates = await getCertificates();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-stone-100">Certificates</h1>
          <p className="text-stone-400 mt-1">Manage your certifications and credentials</p>
        </div>
        <Link href="/admin/certificates/new">
          <Button className="bg-amber-500 hover:bg-amber-600 text-stone-900">
            <Plus className="h-4 w-4 mr-2" />
            Add Certificate
          </Button>
        </Link>
      </div>

      {certificates.length === 0 ? (
        <Card className="bg-stone-900/50 border-stone-800">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-stone-400 mb-4">No certificates yet</p>
            <Link href="/admin/certificates/new">
              <Button className="bg-amber-500 hover:bg-amber-600 text-stone-900">
                Add Your First Certificate
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {certificates.map((cert: any) => (
            <Card key={cert._id} className="bg-stone-900/50 border-stone-800">
              <CardHeader className="flex flex-row items-start justify-between">
                <div className="flex items-start gap-4">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: cert.color || '#f59e0b' }}
                  >
                    {cert.platform?.charAt(0) || 'C'}
                  </div>
                  <div>
                    <CardTitle className="text-stone-100 text-base flex items-center gap-2">
                      {cert.title}
                      {!cert.isVisible && (
                        <Badge variant="outline" className="text-stone-500 border-stone-600">
                          <EyeOff className="h-3 w-3 mr-1" />
                          Hidden
                        </Badge>
                      )}
                    </CardTitle>
                    <p className="text-sm text-stone-400">{cert.platform}</p>
                    {cert.issueDate && (
                      <p className="text-xs text-stone-500 mt-1">
                        Issued: {new Date(cert.issueDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {cert.credentialUrl && (
                    <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer">
                      <Button variant="ghost" size="icon" className="text-stone-400 hover:text-stone-100">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </a>
                  )}
                  <Link href={`/admin/certificates/${cert._id}`}>
                    <Button variant="ghost" size="icon" className="text-stone-400 hover:text-amber-500">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </Link>
                  <DeleteButton id={cert._id} endpoint="certificates" itemName="Certificate" />
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
