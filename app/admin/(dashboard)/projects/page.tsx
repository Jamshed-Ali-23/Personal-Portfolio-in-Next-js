import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, ExternalLink, Github, EyeOff } from 'lucide-react';
import connectDB from '@/lib/mongodb';
import Project from '@/models/Project';
import DeleteButton from '@/components/admin/DeleteButton';

async function getProjects() {
  await connectDB();
  const projects = await Project.find().sort({ order: 1, createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(projects));
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-stone-100">Projects</h1>
          <p className="text-stone-400 mt-1">Manage your portfolio projects</p>
        </div>
        <Link href="/admin/projects/new">
          <Button className="bg-amber-500 hover:bg-amber-600 text-stone-900">
            <Plus className="h-4 w-4 mr-2" />
            Add Project
          </Button>
        </Link>
      </div>

      {projects.length === 0 ? (
        <Card className="bg-stone-900/50 border-stone-800">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-stone-400 mb-4">No projects yet</p>
            <Link href="/admin/projects/new">
              <Button className="bg-amber-500 hover:bg-amber-600 text-stone-900">
                Add Your First Project
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {projects.map((project: any) => (
            <Card key={project._id} className="bg-stone-900/50 border-stone-800">
              <CardHeader className="flex flex-row items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{project.icon}</div>
                  <div>
                    <CardTitle className="text-stone-100 flex items-center gap-2">
                      {project.title}
                      {!project.isVisible && (
                        <Badge variant="outline" className="text-stone-500 border-stone-600">
                          <EyeOff className="h-3 w-3 mr-1" />
                          Hidden
                        </Badge>
                      )}
                      {project.featured && (
                        <Badge className="bg-amber-500/20 text-amber-500 border-amber-500/30">
                          Featured
                        </Badge>
                      )}
                    </CardTitle>
                    <p className="text-sm text-stone-400 mt-1">{project.category}</p>
                    <p className="text-sm text-stone-500 mt-2 line-clamp-2">{project.problem}</p>
                    <div className="flex flex-wrap gap-1 mt-3">
                      {project.techStack?.slice(0, 5).map((tech: string, i: number) => (
                        <Badge key={i} variant="secondary" className="bg-stone-800 text-stone-300 text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {project.techStack?.length > 5 && (
                        <Badge variant="secondary" className="bg-stone-800 text-stone-400 text-xs">
                          +{project.techStack.length - 5}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Button variant="ghost" size="icon" className="text-stone-400 hover:text-stone-100">
                        <Github className="h-4 w-4" />
                      </Button>
                    </a>
                  )}
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <Button variant="ghost" size="icon" className="text-stone-400 hover:text-stone-100">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </a>
                  )}
                  <Link href={`/admin/projects/${project._id}`}>
                    <Button variant="ghost" size="icon" className="text-stone-400 hover:text-amber-500">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </Link>
                  <DeleteButton id={project._id} endpoint="projects" itemName="Project" />
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
