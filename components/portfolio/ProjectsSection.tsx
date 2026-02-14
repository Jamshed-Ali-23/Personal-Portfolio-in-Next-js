'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
  ExternalLink,
  Github,
  ChevronRight,
  TrendingUp,
  BarChart3,
  Brain,
  Code2,
  Database,
  PieChart,
  Layers,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';
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

// Category icon + color mapping
const categoryMeta: { [key: string]: { icon: React.ElementType; color: string; bgColor: string; borderColor: string; activeGlow: string } } = {
  'Machine Learning': {
    icon: Brain,
    color: 'text-violet-400',
    bgColor: 'bg-violet-500/15',
    borderColor: 'border-violet-500/40',
    activeGlow: 'shadow-violet-500/25',
  },
  'Data Analytics': {
    icon: BarChart3,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/15',
    borderColor: 'border-emerald-500/40',
    activeGlow: 'shadow-emerald-500/25',
  },
  'Web Development': {
    icon: Code2,
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/15',
    borderColor: 'border-amber-500/40',
    activeGlow: 'shadow-amber-500/25',
  },
};

// Category color for badges on cards
const categoryCardColors: { [key: string]: string } = {
  'Machine Learning': 'bg-violet-500/20 text-violet-300 border-violet-500/30',
  'Data Analytics': 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  'Web Development': 'bg-amber-500/20 text-amber-300 border-amber-500/30',
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
  const catColors = categoryCardColors[project.category] || 'bg-amber-500/20 text-amber-400 border-amber-500/30';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      whileHover={{ y: -8 }}
      className="h-full"
    >
      <Card
        onClick={onClick}
        className="bg-stone-900/60 border-stone-800/80 hover:border-amber-500/40 transition-all duration-300 cursor-pointer h-full overflow-hidden group hover:shadow-lg hover:shadow-amber-500/5"
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
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent" />
            <div className="absolute top-4 left-4">
              <Badge className={catColors}>
                {project.category}
              </Badge>
            </div>
          </div>
        )}

        <CardContent className="p-6">
          {/* Category badge when no image */}
          {(!project.images || project.images.length === 0) && (
            <div className="mb-3">
              <Badge className={`text-xs ${catColors}`}>
                {project.category}
              </Badge>
            </div>
          )}

          {/* Header */}
          <div className="flex items-start gap-4 mb-3">
            <div className="p-2.5 bg-gradient-to-br from-amber-500/20 to-orange-500/10 rounded-xl group-hover:from-amber-500/30 group-hover:to-orange-500/20 transition-colors flex-shrink-0">
              <Icon className="w-5 h-5 text-amber-400" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-white group-hover:text-amber-400 transition-colors leading-tight">
                {project.title}
              </h3>
            </div>
          </div>

          {/* Problem */}
          <p className="text-stone-400 text-sm mb-2 leading-relaxed line-clamp-2">{project.problem}</p>

          {/* Solution Preview */}
          <p className="text-stone-500 text-xs mb-4 leading-relaxed line-clamp-2">{project.solution}</p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.techStack.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 bg-stone-800/80 text-stone-300 border border-stone-700/50 text-[11px] rounded-md font-medium"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 5 && (
              <span className="px-2 py-0.5 bg-stone-800/60 text-stone-500 text-[11px] rounded-md font-medium">
                +{project.techStack.length - 5} more
              </span>
            )}
          </div>

          {/* Action Links */}
          <div className="flex items-center justify-between pt-4 border-t border-stone-800/60">
            <div className="flex gap-2">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-2 rounded-lg bg-stone-800/60 text-stone-400 hover:text-white hover:bg-stone-700/60 transition-all duration-200 hover:scale-105"
                  title="View Source Code"
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
                  className="p-2 rounded-lg bg-stone-800/60 text-stone-400 hover:text-amber-400 hover:bg-amber-500/10 transition-all duration-200 hover:scale-105"
                  title="View Live Demo"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-amber-400/80 hover:text-amber-300 hover:bg-amber-500/10 px-3 py-1 text-xs font-semibold gap-1"
            >
              View Details
              <ArrowUpRight className="w-3.5 h-3.5" />
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
  const [filter, setFilter] = useState<string>('Machine Learning');

  // Get unique categories in a fixed order
  const categoryOrder = ['Machine Learning', 'Data Analytics', 'Web Development'];
  const categories = categoryOrder.filter((cat) =>
    projects.some((p) => p.category === cat)
  );

  // Filter projects by selected category
  const filteredProjects = projects.filter((p) => p.category === filter);

  // Count per category
  const categoryCounts: { [key: string]: number } = {};
  projects.forEach((p) => {
    categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
  });

  return (
    <section id="projects" className="py-20 sm:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-stone-950" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
      {/* Subtle radial accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-500/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <div className="text-center mb-14">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-4 bg-amber-500/10 text-amber-400 border-amber-500/30 px-4 py-1.5 text-sm font-medium">
                <Sparkles className="w-3.5 h-3.5 mr-1.5 inline-block" />
                Featured Work
              </Badge>
            </motion.div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Projects That
              <span className="block bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Showcase Impact
              </span>
            </h2>
            <p className="text-stone-400 max-w-2xl mx-auto leading-relaxed">
              From machine learning models and data analytics dashboards to full-stack web applications — each project
              demonstrates end-to-end problem solving with real-world impact.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12 px-2 sm:px-0"
          >
            {categories.map((category) => {
              const meta = categoryMeta[category] || categoryMeta['Web Development'];
              const CatIcon = meta.icon;
              const isActive = filter === category;
              const count = categoryCounts[category] || 0;

              return (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`
                    flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium 
                    transition-all duration-300 border
                    ${
                      isActive
                        ? `${meta.bgColor} ${meta.color} ${meta.borderColor} shadow-lg ${meta.activeGlow}`
                        : 'bg-stone-900/50 text-stone-400 border-stone-800 hover:text-stone-200 hover:border-stone-700 hover:bg-stone-800/50'
                    }
                  `}
                >
                  <CatIcon className="w-4 h-4" />
                  <span>{category}</span>
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${
                      isActive ? 'bg-white/10 text-current' : 'bg-stone-800 text-stone-500'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </motion.div>

          {/* Projects Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
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

          {/* Project count indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-8"
          >
            <p className="text-stone-600 text-sm">
              Showing <span className="text-stone-400 font-medium">{filteredProjects.length}</span> of{' '}
              <span className="text-stone-400 font-medium">{projects.length}</span> projects
            </p>
          </motion.div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <Layers className="w-12 h-12 text-stone-700 mx-auto mb-4" />
              <p className="text-stone-400 text-lg font-medium">No projects found in this category.</p>
              <p className="text-stone-600 text-sm mt-1">Try selecting a different category above.</p>
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
