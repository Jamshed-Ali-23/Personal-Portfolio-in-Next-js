import { Suspense } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  FolderKanban, 
  Award, 
  Briefcase, 
  Brain, 
  User, 
  ArrowRight,
  TrendingUp 
} from 'lucide-react';
import connectDB from '@/lib/mongodb';
import Project from '@/models/Project';
import Certificate from '@/models/Certificate';
import Experience from '@/models/Experience';
import SkillCategory from '@/models/SkillCategory';

async function getStats() {
  await connectDB();
  
  const [projectCount, certificateCount, experienceCount, skillCategoryCount] = await Promise.all([
    Project.countDocuments(),
    Certificate.countDocuments(),
    Experience.countDocuments(),
    SkillCategory.countDocuments(),
  ]);

  return {
    projects: projectCount,
    certificates: certificateCount,
    experiences: experienceCount,
    skillCategories: skillCategoryCount,
  };
}

function StatsCard({ 
  title, 
  count, 
  icon: Icon, 
  href, 
  color 
}: { 
  title: string; 
  count: number; 
  icon: React.ElementType; 
  href: string; 
  color: string;
}) {
  return (
    <Link href={href}>
      <Card className="bg-stone-900/50 border-stone-800 hover:border-stone-700 transition-colors cursor-pointer group">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-stone-400">{title}</CardTitle>
          <div className={`p-2 rounded-lg ${color}`}>
            <Icon className="h-4 w-4" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-3xl font-bold text-stone-100">{count}</div>
            <ArrowRight className="h-4 w-4 text-stone-500 group-hover:text-amber-500 group-hover:translate-x-1 transition-all" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

async function DashboardStats() {
  const stats = await getStats();

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Projects"
        count={stats.projects}
        icon={FolderKanban}
        href="/admin/projects"
        color="bg-blue-500/20 text-blue-500"
      />
      <StatsCard
        title="Certificates"
        count={stats.certificates}
        icon={Award}
        href="/admin/certificates"
        color="bg-green-500/20 text-green-500"
      />
      <StatsCard
        title="Experience"
        count={stats.experiences}
        icon={Briefcase}
        href="/admin/experience"
        color="bg-purple-500/20 text-purple-500"
      />
      <StatsCard
        title="Skill Categories"
        count={stats.skillCategories}
        icon={Brain}
        href="/admin/skills"
        color="bg-amber-500/20 text-amber-500"
      />
    </div>
  );
}

function StatsLoading() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {[...Array(4)].map((_, i) => (
        <Card key={i} className="bg-stone-900/50 border-stone-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="h-4 w-20 bg-stone-800 rounded animate-pulse" />
            <div className="h-8 w-8 bg-stone-800 rounded-lg animate-pulse" />
          </CardHeader>
          <CardContent>
            <div className="h-8 w-12 bg-stone-800 rounded animate-pulse" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

const quickLinks = [
  { title: 'Edit Profile', description: 'Update your personal information', href: '/admin/profile', icon: User },
  { title: 'Add Project', description: 'Showcase a new project', href: '/admin/projects/new', icon: FolderKanban },
  { title: 'Add Certificate', description: 'Add a new certification', href: '/admin/certificates/new', icon: Award },
  { title: 'Add Experience', description: 'Add work experience', href: '/admin/experience/new', icon: Briefcase },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-stone-100">Dashboard</h1>
        <p className="text-stone-400 mt-1">Welcome to your portfolio admin panel</p>
      </div>

      <Suspense fallback={<StatsLoading />}>
        <DashboardStats />
      </Suspense>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-stone-900/50 border-stone-800">
          <CardHeader>
            <CardTitle className="text-stone-100">Quick Actions</CardTitle>
            <CardDescription className="text-stone-400">
              Common tasks to manage your portfolio
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-stone-800/50 transition-colors group"
              >
                <div className="p-2 rounded-lg bg-amber-500/10">
                  <link.icon className="h-4 w-4 text-amber-500" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-stone-200">{link.title}</p>
                  <p className="text-xs text-stone-500">{link.description}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-stone-500 group-hover:text-amber-500 group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-stone-900/50 border-stone-800">
          <CardHeader>
            <CardTitle className="text-stone-100 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-amber-500" />
              Tips
            </CardTitle>
            <CardDescription className="text-stone-400">
              Best practices for your portfolio
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-stone-800/50 rounded-lg">
              <p className="text-sm text-stone-300">
                <strong className="text-amber-500">Keep it updated:</strong> Regularly add new projects and certificates to show continuous growth.
              </p>
            </div>
            <div className="p-3 bg-stone-800/50 rounded-lg">
              <p className="text-sm text-stone-300">
                <strong className="text-amber-500">Quality images:</strong> Use high-quality screenshots and thumbnails for your projects.
              </p>
            </div>
            <div className="p-3 bg-stone-800/50 rounded-lg">
              <p className="text-sm text-stone-300">
                <strong className="text-amber-500">Be specific:</strong> Include detailed descriptions of challenges solved and technologies used.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
