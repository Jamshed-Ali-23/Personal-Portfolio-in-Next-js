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
import DeleteButton from '@/components/admin/DeleteButton';

interface Project {
  _id: string;
  title: string;
  icon: string;
  category: string;
  problem: string;
  solution: string;
  techStack: string[];
  features: string[];
  challenges: string[];
  results: string[];
  images: string[];
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
  order: number;
  isVisible: boolean;
}

export default function EditProjectForm({ project }: { project: Project }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Omit<Project, '_id'>>({
    title: project.title,
    icon: project.icon,
    category: project.category,
    problem: project.problem || '',
    solution: project.solution || '',
    techStack: project.techStack || [],
    features: project.features || [],
    challenges: project.challenges || [],
    results: project.results || [],
    images: project.images || [],
    githubUrl: project.githubUrl || '',
    liveUrl: project.liveUrl || '',
    featured: project.featured || false,
    order: project.order || 0,
    isVisible: project.isVisible !== false,
  });
  const [newItem, setNewItem] = useState({
    tech: '',
    feature: '',
    challenge: '',
    result: '',
    image: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`/api/projects/${project._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to update project');

      toast({
        title: 'Success',
        description: 'Project updated successfully',
      });
      router.push('/admin/projects');
      router.refresh();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update project',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addToArray = (field: keyof Pick<typeof formData, 'techStack' | 'features' | 'challenges' | 'results' | 'images'>, itemKey: keyof typeof newItem) => {
    if (newItem[itemKey].trim()) {
      setFormData({
        ...formData,
        [field]: [...formData[field], newItem[itemKey].trim()],
      });
      setNewItem({ ...newItem, [itemKey]: '' });
    }
  };

  const removeFromArray = (field: keyof Pick<typeof formData, 'techStack' | 'features' | 'challenges' | 'results' | 'images'>, index: number) => {
    setFormData({
      ...formData,
      [field]: formData[field].filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/projects">
            <Button variant="ghost" size="icon" className="text-stone-400 hover:text-stone-100">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-stone-100">Edit Project</h1>
            <p className="text-stone-400 mt-1">{project.title}</p>
          </div>
        </div>
        <DeleteButton id={project._id} endpoint="projects" itemName="Project" redirectPath="/admin/projects" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="bg-stone-900/50 border-stone-800">
          <CardHeader>
            <CardTitle className="text-stone-100">Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-stone-300">Title</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Project Title"
                  required
                  className="bg-stone-800 border-stone-700 text-stone-100"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-stone-300">Icon (Emoji)</Label>
                <Input
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  placeholder="🚀"
                  className="bg-stone-800 border-stone-700 text-stone-100"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-stone-300">Category</Label>
              <Input
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="Machine Learning / Data Analytics / Web Development"
                required
                className="bg-stone-800 border-stone-700 text-stone-100"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-stone-900/50 border-stone-800">
          <CardHeader>
            <CardTitle className="text-stone-100">Project Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-stone-300">Problem Statement</Label>
              <Textarea
                value={formData.problem}
                onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                placeholder="What problem does this project solve?"
                className="bg-stone-800 border-stone-700 text-stone-100 min-h-[100px]"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-stone-300">Solution</Label>
              <Textarea
                value={formData.solution}
                onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                placeholder="How does this project solve the problem?"
                className="bg-stone-800 border-stone-700 text-stone-100 min-h-[100px]"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-stone-900/50 border-stone-800">
          <CardHeader>
            <CardTitle className="text-stone-100">Tech Stack</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={newItem.tech}
                onChange={(e) => setNewItem({ ...newItem, tech: e.target.value })}
                placeholder="Python, TensorFlow, etc."
                className="bg-stone-800 border-stone-700 text-stone-100"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addToArray('techStack', 'tech');
                  }
                }}
              />
              <Button
                type="button"
                onClick={() => addToArray('techStack', 'tech')}
                className="bg-amber-500 hover:bg-amber-600 text-stone-900"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.techStack.map((tech, i) => (
                <Badge key={i} variant="secondary" className="bg-stone-800 text-stone-300">
                  {tech}
                  <button
                    type="button"
                    onClick={() => removeFromArray('techStack', i)}
                    className="ml-2 hover:text-red-400"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-stone-900/50 border-stone-800">
          <CardHeader>
            <CardTitle className="text-stone-100">Features</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={newItem.feature}
                onChange={(e) => setNewItem({ ...newItem, feature: e.target.value })}
                placeholder="Add a feature"
                className="bg-stone-800 border-stone-700 text-stone-100"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addToArray('features', 'feature');
                  }
                }}
              />
              <Button
                type="button"
                onClick={() => addToArray('features', 'feature')}
                className="bg-amber-500 hover:bg-amber-600 text-stone-900"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <ul className="space-y-2">
              {formData.features.map((feature, i) => (
                <li key={i} className="flex items-center justify-between bg-stone-800/50 p-2 rounded">
                  <span className="text-stone-300">{feature}</span>
                  <button
                    type="button"
                    onClick={() => removeFromArray('features', i)}
                    className="text-stone-500 hover:text-red-400"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-stone-900/50 border-stone-800">
          <CardHeader>
            <CardTitle className="text-stone-100">Challenges & Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Label className="text-stone-300">Challenges</Label>
              <div className="flex gap-2">
                <Input
                  value={newItem.challenge}
                  onChange={(e) => setNewItem({ ...newItem, challenge: e.target.value })}
                  placeholder="Add a challenge faced"
                  className="bg-stone-800 border-stone-700 text-stone-100"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addToArray('challenges', 'challenge');
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={() => addToArray('challenges', 'challenge')}
                  className="bg-amber-500 hover:bg-amber-600 text-stone-900"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <ul className="space-y-2">
                {formData.challenges.map((challenge, i) => (
                  <li key={i} className="flex items-center justify-between bg-stone-800/50 p-2 rounded">
                    <span className="text-stone-300">{challenge}</span>
                    <button
                      type="button"
                      onClick={() => removeFromArray('challenges', i)}
                      className="text-stone-500 hover:text-red-400"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <Label className="text-stone-300">Results / Impact</Label>
              <div className="flex gap-2">
                <Input
                  value={newItem.result}
                  onChange={(e) => setNewItem({ ...newItem, result: e.target.value })}
                  placeholder="Add a result or impact"
                  className="bg-stone-800 border-stone-700 text-stone-100"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addToArray('results', 'result');
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={() => addToArray('results', 'result')}
                  className="bg-amber-500 hover:bg-amber-600 text-stone-900"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <ul className="space-y-2">
                {formData.results.map((result, i) => (
                  <li key={i} className="flex items-center justify-between bg-stone-800/50 p-2 rounded">
                    <span className="text-stone-300">{result}</span>
                    <button
                      type="button"
                      onClick={() => removeFromArray('results', i)}
                      className="text-stone-500 hover:text-red-400"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-stone-900/50 border-stone-800">
          <CardHeader>
            <CardTitle className="text-stone-100">Links & Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-stone-300">GitHub URL</Label>
                <Input
                  type="url"
                  value={formData.githubUrl}
                  onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                  placeholder="https://github.com/..."
                  className="bg-stone-800 border-stone-700 text-stone-100"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-stone-300">Live URL</Label>
                <Input
                  type="url"
                  value={formData.liveUrl}
                  onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                  placeholder="https://..."
                  className="bg-stone-800 border-stone-700 text-stone-100"
                />
              </div>
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
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 rounded border-stone-600 bg-stone-800 text-amber-500 focus:ring-amber-500"
                />
                <span className="text-stone-300">Featured Project</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isVisible}
                  onChange={(e) => setFormData({ ...formData, isVisible: e.target.checked })}
                  className="w-4 h-4 rounded border-stone-600 bg-stone-800 text-amber-500 focus:ring-amber-500"
                />
                <span className="text-stone-300">Visible on Portfolio</span>
              </label>
            </div>
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
          <Link href="/admin/projects">
            <Button type="button" variant="outline" className="border-stone-700 text-stone-300 hover:bg-stone-800">
              Cancel
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
