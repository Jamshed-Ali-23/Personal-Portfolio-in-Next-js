import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, EyeOff, Calendar } from 'lucide-react';
import connectDB from '@/lib/mongodb';
import Experience from '@/models/Experience';
import DeleteButton from '@/components/admin/DeleteButton';

async function getExperiences() {
  await connectDB();
  const experiences = await Experience.find().sort({ order: 1, startDate: -1 }).lean();
  return JSON.parse(JSON.stringify(experiences));
}

export default async function ExperiencePage() {
  const experiences = await getExperiences();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-stone-100">Experience</h1>
          <p className="text-stone-400 mt-1">Manage your work experience</p>
        </div>
        <Link href="/admin/experience/new">
          <Button className="bg-amber-500 hover:bg-amber-600 text-stone-900">
            <Plus className="h-4 w-4 mr-2" />
            Add Experience
          </Button>
        </Link>
      </div>

      {experiences.length === 0 ? (
        <Card className="bg-stone-900/50 border-stone-800">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-stone-400 mb-4">No experience entries yet</p>
            <Link href="/admin/experience/new">
              <Button className="bg-amber-500 hover:bg-amber-600 text-stone-900">
                Add Your First Experience
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {experiences.map((exp: any) => (
            <Card key={exp._id} className="bg-stone-900/50 border-stone-800">
              <CardHeader className="flex flex-row items-start justify-between">
                <div>
                  <CardTitle className="text-stone-100 flex items-center gap-2">
                    {exp.role}
                    {!exp.isVisible && (
                      <Badge variant="outline" className="text-stone-500 border-stone-600">
                        <EyeOff className="h-3 w-3 mr-1" />
                        Hidden
                      </Badge>
                    )}
                    {exp.isCurrent && (
                      <Badge className="bg-green-500/20 text-green-500 border-green-500/30">
                        Current
                      </Badge>
                    )}
                  </CardTitle>
                  <p className="text-stone-400 mt-1">{exp.company}</p>
                  <div className="flex items-center gap-2 mt-2 text-sm text-stone-500">
                    <Calendar className="h-4 w-4" />
                    {exp.startDate && new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    {' - '}
                    {exp.isCurrent 
                      ? 'Present' 
                      : exp.endDate 
                        ? new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
                        : 'Present'
                    }
                  </div>
                  {exp.achievements?.length > 0 && (
                    <ul className="mt-3 space-y-1">
                      {exp.achievements.slice(0, 2).map((achievement: string, i: number) => (
                        <li key={i} className="text-sm text-stone-400 line-clamp-1">
                          • {achievement}
                        </li>
                      ))}
                      {exp.achievements.length > 2 && (
                        <li className="text-sm text-stone-500">
                          +{exp.achievements.length - 2} more achievements
                        </li>
                      )}
                    </ul>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Link href={`/admin/experience/${exp._id}`}>
                    <Button variant="ghost" size="icon" className="text-stone-400 hover:text-amber-500">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </Link>
                  <DeleteButton id={exp._id} endpoint="experience" itemName="Experience" />
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
