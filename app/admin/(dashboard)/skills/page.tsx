import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, EyeOff } from 'lucide-react';
import connectDB from '@/lib/mongodb';
import SkillCategory from '@/models/SkillCategory';
import DeleteButton from '@/components/admin/DeleteButton';

async function getSkillCategories() {
  await connectDB();
  const categories = await SkillCategory.find().sort({ order: 1, createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(categories));
}

export default async function SkillsPage() {
  const categories = await getSkillCategories();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-stone-100">Skill Categories</h1>
          <p className="text-stone-400 mt-1">Manage your skill categories and individual skills</p>
        </div>
        <Link href="/admin/skills/new">
          <Button className="bg-amber-500 hover:bg-amber-600 text-stone-900">
            <Plus className="h-4 w-4 mr-2" />
            Add Category
          </Button>
        </Link>
      </div>

      {categories.length === 0 ? (
        <Card className="bg-stone-900/50 border-stone-800">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-stone-400 mb-4">No skill categories yet</p>
            <Link href="/admin/skills/new">
              <Button className="bg-amber-500 hover:bg-amber-600 text-stone-900">
                Add Your First Skill Category
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {categories.map((category: any) => (
            <Card key={category._id} className="bg-stone-900/50 border-stone-800">
              <CardHeader className="flex flex-row items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{category.icon}</div>
                  <div>
                    <CardTitle className="text-stone-100 flex items-center gap-2">
                      {category.title}
                      {!category.isVisible && (
                        <Badge variant="outline" className="text-stone-500 border-stone-600">
                          <EyeOff className="h-3 w-3 mr-1" />
                          Hidden
                        </Badge>
                      )}
                    </CardTitle>
                    <p className="text-sm text-stone-500 mt-1">{category.description}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {category.skills?.map((skill: any, i: number) => (
                        <Badge key={i} variant="secondary" className="bg-stone-800 text-stone-300">
                          {skill.name} - {skill.level}%
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link href={`/admin/skills/${category._id}`}>
                    <Button variant="ghost" size="icon" className="text-stone-400 hover:text-amber-500">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </Link>
                  <DeleteButton id={category._id} endpoint="skills" itemName="Skill Category" />
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
