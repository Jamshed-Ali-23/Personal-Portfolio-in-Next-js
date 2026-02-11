'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ExternalLink, Github, ChevronRight, TrendingUp, BarChart3, Brain, Code2, Database, PieChart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ProjectDetailModal from './ProjectDetailModal';

interface Project {
  _id: string;
  title: string;
  category: string;
  problem: string;
  solution: string;
  techStack: string[];
  features: string[];
  challenges: string[];
  results: string[];
  images: string[];
  githubUrl?: string;
  liveUrl?: string;
  icon?: string;
}

// Icon mapping
const iconMap: { [key: string]: React.ElementType } = {
  TrendingUp,
  BarChart3,
  Brain,
  Code2,
  Database,
  PieChart,
};

// Project Card Component
const ProjectCard = ({
  project,
  index,
  onClick,
}: {
  project: Project;
  index: number;
  onClick: () => void;
}) => {
  const Icon = iconMap[project.icon || 'Code2'] || Code2;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -10 }}
      className="h-full"
    >
      <Card
        onClick={onClick}
        className="bg-stone-900/50 border-stone-800 hover:border-amber-500/50 transition-all duration-300 cursor-pointer h-full overflow-hidden group"
      >
        {/* Project Image */}
        {project.images && project.images.length > 0 && (
          <div className="relative h-48 overflow-hidden">
            <Image
              src={project.images[0]}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900 to-transparent" />
            <div className="absolute top-4 left-4">
              <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
                {project.category}
              </Badge>
            </div>
          </div>
        )}

        <CardContent className="p-6">
          {/* Header */}
          <div className="flex items-start gap-4 mb-4">
            <div className="p-3 bg-amber-500/20 rounded-xl group-hover:bg-amber-500/30 transition-colors">
              <Icon className="w-6 h-6 text-amber-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white group-hover:text-amber-400 transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-stone-400 mt-1 line-clamp-2">{project.problem}</p>
            </div>
          </div>

          {/* Solution Preview */}
          <p className="text-stone-400 text-sm mb-4 line-clamp-2">{project.solution}</p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.techStack.slice(0, 4).map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="bg-stone-800/80 text-stone-300 border-stone-700/50 text-xs"
              >
                {tech}
              </Badge>
            ))}
            {project.techStack.length > 4 && (
              <Badge
                variant="secondary"
                className="bg-stone-800/80 text-stone-400 border-stone-700/50 text-xs"
              >
                +{project.techStack.length - 4}
              </Badge>
            )}
          </div>

          {/* Action Links */}
          <div className="flex items-center justify-between pt-4 border-t border-stone-800">
            <div className="flex gap-2">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-2 rounded-lg bg-stone-800/50 text-stone-400 hover:text-white hover:bg-stone-700/50 transition-colors"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-2 rounded-lg bg-stone-800/50 text-stone-400 hover:text-white hover:bg-stone-700/50 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-amber-400 hover:text-amber-300 hover:bg-amber-500/10 p-0"
            >
              View Details
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

interface ProjectsSectionProps {
  projects: Project[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<string>('All');

  // Get unique categories
  const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))];

  // Filter projects
  const filteredProjects = filter === 'All' ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-20 sm:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-stone-950" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-amber-500/10 text-amber-400 border-amber-500/30">
              Featured Work
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Projects That
              <span className="block bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Showcase Impact
              </span>
            </h2>
            <p className="text-stone-400 max-w-2xl mx-auto">
              Data-driven solutions that transform complex problems into actionable insights and measurable
              results.
            </p>
          </div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categories.map((category) => (
              <Button
                key={category}
                variant={filter === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter(category)}
                className={
                  filter === category
                    ? 'bg-amber-500 hover:bg-amber-600 text-white'
                    : 'border-stone-700 text-stone-400 hover:text-white hover:border-amber-500/50'
                }
              >
                {category}
              </Button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project._id}
                  project={project}
                  index={index}
                  onClick={() => setSelectedProject(project)}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-stone-400">No projects found in this category.</p>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
