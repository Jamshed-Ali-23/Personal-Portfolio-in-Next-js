'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { ArrowLeft, Loader2, Plus, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import DeleteButton from '@/components/admin/DeleteButton';

interface Experience {
  _id: string;
  role: string;
  company: string;
  location?: string;
  description?: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  achievements: string[];
  technologies?: string[];
  order: number;
  isVisible: boolean;
}

export default function EditExperienceForm({ experience }: { experience: Experience }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [newTech, setNewTech] = useState('');
  const [formData, setFormData] = useState<Omit<Experience, '_id'>>({
    role: experience.role,
    company: experience.company,
    location: experience.location || '',
    description: experience.description || '',
    startDate: experience.startDate ? new Date(experience.startDate).toISOString().split('T')[0] : '',
    endDate: experience.endDate ? new Date(experience.endDate).toISOString().split('T')[0] : '',
    isCurrent: experience.isCurrent || false,
    achievements: experience.achievements || [],
    technologies: experience.technologies || [],
    order: experience.order || 0,
    isVisible: experience.isVisible !== false,
  });
  const [newAchievement, setNewAchievement] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`/api/experience/${experience._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to update experience');

      toast({
        title: 'Success',
        description: 'Experience updated successfully',
      });
      router.push('/admin/experience');
      router.refresh();
    } catch (_error) {
      toast({
        title: 'Error',
        description: 'Failed to update experience',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addAchievement = () => {
    if (newAchievement.trim()) {
      setFormData({
        ...formData,
        achievements: [...formData.achievements, newAchievement.trim()],
      });
      setNewAchievement('');
    }
  };

  const removeAchievement = (index: number) => {
    setFormData({
      ...formData,
      achievements: formData.achievements.filter((_, i) => i !== index),
    });
  };

  const addTech = () => {
    const tech = newTech.trim();
    if (tech && !(formData.technologies || []).includes(tech)) {
      setFormData({ ...formData, technologies: [...(formData.technologies || []), tech] });
      setNewTech('');
    }
  };

  const removeTech = (techToRemove: string) => {
    setFormData({ ...formData, technologies: (formData.technologies || []).filter((t) => t !== techToRemove) });
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/experience">
            <Button variant="ghost" size="icon" className="text-stone-400 hover:text-stone-100">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-stone-100">Edit Experience</h1>
            <p className="text-stone-400 mt-1">{experience.role} at {experience.company}</p>
          </div>
        </div>
        <DeleteButton id={experience._id} endpoint="experience" itemName="Experience" redirectPath="/admin/experience" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="bg-stone-900/50 border-stone-800">
          <CardHeader>
            <CardTitle className="text-stone-100">Position Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-stone-300">Role / Title</Label>
              <Input
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                placeholder="Data Analyst Intern"
                required
                className="bg-stone-800 border-stone-700 text-stone-100"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-stone-300">Company *</Label>
                <Input
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="Company Name"
                  required
                  className="bg-stone-800 border-stone-700 text-stone-100"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-stone-300">Location</Label>
                <Input
                  value={formData.location || ''}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Islamabad, Pakistan"
                  className="bg-stone-800 border-stone-700 text-stone-100"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-stone-300">Description</Label>
              <Textarea
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief description of your role and responsibilities"
                className="bg-stone-800 border-stone-700 text-stone-100"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-stone-300">Start Date</Label>
                <Input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  required
                  className="bg-stone-800 border-stone-700 text-stone-100"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-stone-300">End Date</Label>
                <Input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  disabled={formData.isCurrent}
                  className="bg-stone-800 border-stone-700 text-stone-100 disabled:opacity-50"
                />
              </div>
            </div>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isCurrent}
                  onChange={(e) => setFormData({ ...formData, isCurrent: e.target.checked, endDate: '' })}
                  className="w-4 h-4 rounded border-stone-600 bg-stone-800 text-amber-500 focus:ring-amber-500"
                />
                <span className="text-stone-300">I currently work here</span>
              </label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-stone-300">Display Order</Label>
                <Input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                  className="bg-stone-800 border-stone-700 text-stone-100"
                />
              </div>
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

        {/* Technologies */}
        <Card className="bg-stone-900/50 border-stone-800">
          <CardHeader>
            <CardTitle className="text-stone-100">Technologies</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={newTech}
                onChange={(e) => setNewTech(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTech(); } }}
                placeholder="Add a technology (e.g. Python, Power BI)"
                className="bg-stone-800 border-stone-700 text-stone-100"
              />
              <Button type="button" onClick={addTech} variant="outline" className="border-stone-700 text-stone-300 hover:bg-stone-800 flex-shrink-0">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            {(formData.technologies || []).length > 0 && (
              <div className="flex flex-wrap gap-2">
                {(formData.technologies || []).map((tech) => (
                  <Badge key={tech} className="bg-stone-800 text-stone-200 border-stone-700 gap-1.5 pr-1.5">
                    {tech}
                    <button type="button" onClick={() => removeTech(tech)} className="hover:text-red-400 transition-colors">
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card className="bg-stone-900/50 border-stone-800">
          <CardHeader>
            <CardTitle className="text-stone-100">Achievements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={newAchievement}
                onChange={(e) => setNewAchievement(e.target.value)}
                placeholder="Describe an achievement or responsibility"
                className="bg-stone-800 border-stone-700 text-stone-100"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addAchievement();
                  }
                }}
              />
              <Button
                type="button"
                onClick={addAchievement}
                className="bg-amber-500 hover:bg-amber-600 text-stone-900"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <ul className="space-y-2">
              {formData.achievements.map((achievement, i) => (
                <li key={i} className="flex items-start justify-between bg-stone-800/50 p-3 rounded">
                  <span className="text-stone-300 flex-1">{achievement}</span>
                  <button
                    type="button"
                    onClick={() => removeAchievement(i)}
                    className="text-stone-500 hover:text-red-400 ml-2"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
            {formData.achievements.length === 0 && (
              <p className="text-stone-500 text-center py-4">No achievements added yet</p>
            )}
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
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </Button>
          <Link href="/admin/experience">
            <Button type="button" variant="outline" className="border-stone-700 text-stone-300 hover:bg-stone-800">
              Cancel
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
