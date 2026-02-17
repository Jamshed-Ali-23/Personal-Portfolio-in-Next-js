'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { ArrowLeft, Loader2, Plus, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const colorOptions = [
  { value: 'amber', label: 'Amber', className: 'bg-amber-500' },
  { value: 'blue', label: 'Blue', className: 'bg-blue-500' },
  { value: 'green', label: 'Green', className: 'bg-green-500' },
  { value: 'purple', label: 'Purple', className: 'bg-purple-500' },
  { value: 'rose', label: 'Rose', className: 'bg-rose-500' },
  { value: 'cyan', label: 'Cyan', className: 'bg-cyan-500' },
];

interface FormData {
  title: string;
  platform: string;
  issueDate: string;
  credentialId: string;
  credentialUrl: string;
  certificateFile: string;
  skills: string[];
  color: string;
  description: string;
  order: number;
  isVisible: boolean;
}

export default function NewCertificatePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [formData, setFormData] = useState<FormData>({
    title: '',
    platform: '',
    issueDate: '',
    credentialId: '',
    credentialUrl: '',
    certificateFile: '',
    skills: [],
    color: 'amber',
    description: '',
    order: 0,
    isVisible: true,
  });

  const addSkill = () => {
    const skill = newSkill.trim();
    if (skill && !formData.skills.includes(skill)) {
      setFormData({ ...formData, skills: [...formData.skills, skill] });
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData({ ...formData, skills: formData.skills.filter((s) => s !== skillToRemove) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/certificates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to create certificate');

      toast({
        title: 'Success',
        description: 'Certificate created successfully',
      });
      router.push('/admin/certificates');
      router.refresh();
    } catch (_error) {
      toast({
        title: 'Error',
        description: 'Failed to create certificate',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-4">
        <Link href="/admin/certificates">
          <Button variant="ghost" size="icon" className="text-stone-400 hover:text-stone-100">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-stone-100">New Certificate</h1>
          <p className="text-stone-400 mt-1">Add a new certification to your portfolio</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card className="bg-stone-900/50 border-stone-800">
          <CardHeader>
            <CardTitle className="text-stone-100">Certificate Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-stone-300">Title *</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="AWS Certified Solutions Architect"
                required
                className="bg-stone-800 border-stone-700 text-stone-100"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-stone-300">Platform *</Label>
                <Input
                  value={formData.platform}
                  onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                  placeholder="Amazon Web Services"
                  required
                  className="bg-stone-800 border-stone-700 text-stone-100"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-stone-300">Issue Date</Label>
                <Input
                  type="date"
                  value={formData.issueDate}
                  onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                  className="bg-stone-800 border-stone-700 text-stone-100"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-stone-300">Credential ID</Label>
              <Input
                value={formData.credentialId}
                onChange={(e) => setFormData({ ...formData, credentialId: e.target.value })}
                placeholder="AWS-CP-2024-001"
                className="bg-stone-800 border-stone-700 text-stone-100"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-stone-300">Description</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief description of what this certification covers"
                className="bg-stone-800 border-stone-700 text-stone-100"
              />
            </div>
          </CardContent>
        </Card>

        {/* Certificate File */}
        <Card className="bg-stone-900/50 border-stone-800">
          <CardHeader>
            <CardTitle className="text-stone-100">Certificate File</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-stone-300">Certificate PDF / Image Path</Label>
              <Input
                value={formData.certificateFile}
                onChange={(e) => setFormData({ ...formData, certificateFile: e.target.value })}
                placeholder="/Certificates/my-certificate.pdf"
                className="bg-stone-800 border-stone-700 text-stone-100"
              />
              <p className="text-xs text-stone-500">
                Path to the certificate file in the public folder. Example: /Certificates/My Certificate.pdf
              </p>
            </div>
            <div className="space-y-2">
              <Label className="text-stone-300">Credential URL</Label>
              <Input
                type="url"
                value={formData.credentialUrl}
                onChange={(e) => setFormData({ ...formData, credentialUrl: e.target.value })}
                placeholder="https://www.credly.com/badges/..."
                className="bg-stone-800 border-stone-700 text-stone-100"
              />
            </div>
          </CardContent>
        </Card>

        {/* Skills */}
        <Card className="bg-stone-900/50 border-stone-800">
          <CardHeader>
            <CardTitle className="text-stone-100">Skills</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addSkill(); } }}
                placeholder="Add a skill (e.g. Python, AWS, SQL)"
                className="bg-stone-800 border-stone-700 text-stone-100"
              />
              <Button type="button" onClick={addSkill} variant="outline" className="border-stone-700 text-stone-300 hover:bg-stone-800 flex-shrink-0">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            {formData.skills.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.skills.map((skill) => (
                  <Badge key={skill} className="bg-stone-800 text-stone-200 border-stone-700 gap-1.5 pr-1.5">
                    {skill}
                    <button type="button" onClick={() => removeSkill(skill)} className="hover:text-red-400 transition-colors">
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Display Settings */}
        <Card className="bg-stone-900/50 border-stone-800">
          <CardHeader>
            <CardTitle className="text-stone-100">Display Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-stone-300">Card Color Theme</Label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {colorOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, color: opt.value })}
                    className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all ${
                      formData.color === opt.value
                        ? 'border-white bg-stone-800/80 scale-105'
                        : 'border-stone-700/50 bg-stone-800/30 hover:border-stone-600'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full ${opt.className}`} />
                    <span className="text-xs text-stone-400">{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-stone-300">Display Order</Label>
              <Input
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                className="bg-stone-800 border-stone-700 text-stone-100"
              />
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isVisible}
                onChange={(e) => setFormData({ ...formData, isVisible: e.target.checked })}
                className="w-4 h-4 rounded border-stone-600 bg-stone-800 text-amber-500 focus:ring-amber-500"
              />
              <span className="text-stone-300">Visible on Portfolio</span>
            </label>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-amber-500 hover:bg-amber-600 text-stone-900"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              'Create Certificate'
            )}
          </Button>
          <Link href="/admin/certificates">
            <Button type="button" variant="outline" className="border-stone-700 text-stone-300 hover:bg-stone-800">
              Cancel
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
