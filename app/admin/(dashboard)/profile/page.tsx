'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { Loader2, Plus, X, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ProfileData {
  name: string;
  title: string;
  bio: string;
  email: string;
  location: string;
  avatarUrl: string;
  resumeUrl: string;
  socialLinks: {
    github: string;
    linkedin: string;
    twitter: string;
    email: string;
  };
  education: {
    degree: string;
    institution: string;
    year: string;
  };
  coursework: string[];
  strengths: string[];
  stats: {
    projectsCompleted: number;
    certificationsEarned: number;
    technologiesMastered: number;
  };
}

const defaultProfile: ProfileData = {
  name: '',
  title: '',
  bio: '',
  email: '',
  location: '',
  avatarUrl: '',
  resumeUrl: '',
  socialLinks: {
    github: '',
    linkedin: '',
    twitter: '',
    email: '',
  },
  education: {
    degree: '',
    institution: '',
    year: '',
  },
  coursework: [],
  strengths: [],
  stats: {
    projectsCompleted: 0,
    certificationsEarned: 0,
    technologiesMastered: 0,
  },
};

export default function ProfilePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [formData, setFormData] = useState<ProfileData>(defaultProfile);
  const [newCoursework, setNewCoursework] = useState('');
  const [newStrength, setNewStrength] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await fetch('/api/profile');
      if (response.ok) {
        const data = await response.json();
        if (data) {
          setFormData({
            ...defaultProfile,
            ...data,
            socialLinks: { ...defaultProfile.socialLinks, ...data.socialLinks },
            education: { ...defaultProfile.education, ...data.education },
            stats: { ...defaultProfile.stats, ...data.stats },
          });
        }
      }
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    } finally {
      setIsFetching(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to update profile');

      toast({
        title: 'Success',
        description: 'Profile updated successfully',
      });
      router.refresh();
    } catch (_error) {
      toast({
        title: 'Error',
        description: 'Failed to update profile',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addCoursework = () => {
    if (newCoursework.trim()) {
      setFormData({
        ...formData,
        coursework: [...formData.coursework, newCoursework.trim()],
      });
      setNewCoursework('');
    }
  };

  const removeCoursework = (index: number) => {
    setFormData({
      ...formData,
      coursework: formData.coursework.filter((_, i) => i !== index),
    });
  };

  const addStrength = () => {
    if (newStrength.trim()) {
      setFormData({
        ...formData,
        strengths: [...formData.strengths, newStrength.trim()],
      });
      setNewStrength('');
    }
  };

  const removeStrength = (index: number) => {
    setFormData({
      ...formData,
      strengths: formData.strengths.filter((_, i) => i !== index),
    });
  };

  if (isFetching) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-full bg-amber-500/10">
          <User className="h-8 w-8 text-amber-500" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-stone-100">Profile</h1>
          <p className="text-stone-400 mt-1">Manage your personal information</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="bg-stone-900/50 border-stone-800">
          <CardHeader>
            <CardTitle className="text-stone-100">Basic Information</CardTitle>
            <CardDescription className="text-stone-400">
              Your public profile information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-stone-300">Full Name</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Jamshed Ali"
                  className="bg-stone-800 border-stone-700 text-stone-100"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-stone-300">Professional Title</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Data Scientist & Analytics Expert"
                  className="bg-stone-800 border-stone-700 text-stone-100"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-stone-300">Bio</Label>
              <Textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="Tell visitors about yourself..."
                className="bg-stone-800 border-stone-700 text-stone-100 min-h-[100px]"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-stone-300">Email</Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="hello@example.com"
                  className="bg-stone-800 border-stone-700 text-stone-100"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-stone-300">Location</Label>
                <Input
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Islamabad, Pakistan"
                  className="bg-stone-800 border-stone-700 text-stone-100"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-stone-900/50 border-stone-800">
          <CardHeader>
            <CardTitle className="text-stone-100">Social Links</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-stone-300">GitHub</Label>
                <Input
                  value={formData.socialLinks.github}
                  onChange={(e) => setFormData({
                    ...formData,
                    socialLinks: { ...formData.socialLinks, github: e.target.value }
                  })}
                  placeholder="https://github.com/username"
                  className="bg-stone-800 border-stone-700 text-stone-100"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-stone-300">LinkedIn</Label>
                <Input
                  value={formData.socialLinks.linkedin}
                  onChange={(e) => setFormData({
                    ...formData,
                    socialLinks: { ...formData.socialLinks, linkedin: e.target.value }
                  })}
                  placeholder="https://linkedin.com/in/username"
                  className="bg-stone-800 border-stone-700 text-stone-100"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-stone-300">Twitter/X</Label>
                <Input
                  value={formData.socialLinks.twitter}
                  onChange={(e) => setFormData({
                    ...formData,
                    socialLinks: { ...formData.socialLinks, twitter: e.target.value }
                  })}
                  placeholder="https://twitter.com/username"
                  className="bg-stone-800 border-stone-700 text-stone-100"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-stone-300">Contact Email</Label>
                <Input
                  value={formData.socialLinks.email}
                  onChange={(e) => setFormData({
                    ...formData,
                    socialLinks: { ...formData.socialLinks, email: e.target.value }
                  })}
                  placeholder="contact@example.com"
                  className="bg-stone-800 border-stone-700 text-stone-100"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-stone-900/50 border-stone-800">
          <CardHeader>
            <CardTitle className="text-stone-100">Education</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="text-stone-300">Degree</Label>
                <Input
                  value={formData.education.degree}
                  onChange={(e) => setFormData({
                    ...formData,
                    education: { ...formData.education, degree: e.target.value }
                  })}
                  placeholder="BS Computer Science"
                  className="bg-stone-800 border-stone-700 text-stone-100"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-stone-300">Institution</Label>
                <Input
                  value={formData.education.institution}
                  onChange={(e) => setFormData({
                    ...formData,
                    education: { ...formData.education, institution: e.target.value }
                  })}
                  placeholder="Air University"
                  className="bg-stone-800 border-stone-700 text-stone-100"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-stone-300">Year</Label>
                <Input
                  value={formData.education.year}
                  onChange={(e) => setFormData({
                    ...formData,
                    education: { ...formData.education, year: e.target.value }
                  })}
                  placeholder="2022 - 2026"
                  className="bg-stone-800 border-stone-700 text-stone-100"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-stone-900/50 border-stone-800">
          <CardHeader>
            <CardTitle className="text-stone-100">Relevant Coursework</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={newCoursework}
                onChange={(e) => setNewCoursework(e.target.value)}
                placeholder="Add a course"
                className="bg-stone-800 border-stone-700 text-stone-100"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addCoursework();
                  }
                }}
              />
              <Button
                type="button"
                onClick={addCoursework}
                className="bg-amber-500 hover:bg-amber-600 text-stone-900"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.coursework.map((course, i) => (
                <Badge key={i} variant="secondary" className="bg-stone-800 text-stone-300">
                  {course}
                  <button
                    type="button"
                    onClick={() => removeCoursework(i)}
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
            <CardTitle className="text-stone-100">Key Strengths</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={newStrength}
                onChange={(e) => setNewStrength(e.target.value)}
                placeholder="Add a strength"
                className="bg-stone-800 border-stone-700 text-stone-100"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addStrength();
                  }
                }}
              />
              <Button
                type="button"
                onClick={addStrength}
                className="bg-amber-500 hover:bg-amber-600 text-stone-900"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.strengths.map((strength, i) => (
                <Badge key={i} variant="secondary" className="bg-stone-800 text-stone-300">
                  {strength}
                  <button
                    type="button"
                    onClick={() => removeStrength(i)}
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
            <CardTitle className="text-stone-100">Portfolio Stats</CardTitle>
            <CardDescription className="text-stone-400">
              These numbers are displayed on your homepage
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="text-stone-300">Projects Completed</Label>
                <Input
                  type="number"
                  value={formData.stats.projectsCompleted}
                  onChange={(e) => setFormData({
                    ...formData,
                    stats: { ...formData.stats, projectsCompleted: parseInt(e.target.value) || 0 }
                  })}
                  className="bg-stone-800 border-stone-700 text-stone-100"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-stone-300">Certifications Earned</Label>
                <Input
                  type="number"
                  value={formData.stats.certificationsEarned}
                  onChange={(e) => setFormData({
                    ...formData,
                    stats: { ...formData.stats, certificationsEarned: parseInt(e.target.value) || 0 }
                  })}
                  className="bg-stone-800 border-stone-700 text-stone-100"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-stone-300">Technologies Mastered</Label>
                <Input
                  type="number"
                  value={formData.stats.technologiesMastered}
                  onChange={(e) => setFormData({
                    ...formData,
                    stats: { ...formData.stats, technologiesMastered: parseInt(e.target.value) || 0 }
                  })}
                  className="bg-stone-800 border-stone-700 text-stone-100"
                />
              </div>
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
              'Save Profile'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
