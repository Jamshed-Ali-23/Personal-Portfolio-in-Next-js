'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, CheckCircle2, Target, Lightbulb, AlertTriangle, TrendingUp, ChevronLeft, ChevronRight, Cpu, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

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
}

// Category color mapping for modal
const categoryModalColors: { [key: string]: string } = {
  'Machine Learning': 'bg-violet-500/20 text-violet-300 border-violet-500/30',
  'Data Analytics': 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  'Web Development': 'bg-amber-500/20 text-amber-300 border-amber-500/30',
};

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!project) return null;

  const catColors = categoryModalColors[project.category] || 'bg-amber-500/20 text-amber-400 border-amber-500/30';

  const nextImage = () => {
    if (project.images.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
    }
  };

  const prevImage = () => {
    if (project.images.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
    }
  };

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 sm:inset-2 md:inset-4 lg:inset-8 xl:inset-12 z-50 overflow-hidden"
          >
            <div className="h-full bg-stone-900 border border-stone-800 rounded-none sm:rounded-2xl overflow-hidden flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-stone-800/80 bg-stone-900/95 backdrop-blur-sm">
                <div className="flex-1 min-w-0">
                  <Badge className={`mb-2 ${catColors}`}>
                    {project.category}
                  </Badge>
                  <h2 className="text-xl sm:text-2xl font-bold text-white truncate">{project.title}</h2>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-stone-800 text-stone-400 hover:text-white hover:bg-stone-700 transition-all duration-200"
                      title="View Source Code"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-amber-500/15 text-amber-400 hover:bg-amber-500/25 transition-all duration-200"
                      title="View Live Demo"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                  <button
                    onClick={onClose}
                    className="p-2.5 rounded-xl bg-stone-800 text-stone-400 hover:text-white hover:bg-stone-700 transition-all duration-200"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-4 sm:p-6 space-y-8">
                  {/* Image Carousel */}
                  {project.images && project.images.length > 0 && (
                    <div className="relative aspect-video rounded-xl overflow-hidden bg-stone-800 border border-stone-700/50">
                      <Image
                        src={project.images[currentImageIndex]}
                        alt={`${project.title} screenshot ${currentImageIndex + 1}`}
                        fill
                        className="object-cover"
                      />
                      {project.images.length > 1 && (
                        <>
                          <button
                            onClick={prevImage}
                            className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors backdrop-blur-sm"
                          >
                            <ChevronLeft className="w-5 h-5" />
                          </button>
                          <button
                            onClick={nextImage}
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors backdrop-blur-sm"
                          >
                            <ChevronRight className="w-5 h-5" />
                          </button>
                          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                            {project.images.map((_, index) => (
                              <button
                                key={index}
                                onClick={() => setCurrentImageIndex(index)}
                                className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                                  index === currentImageIndex ? 'bg-amber-400 scale-110' : 'bg-white/40 hover:bg-white/60'
                                }`}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  )}

                  {/* Problem & Solution */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-5 bg-stone-800/30 rounded-xl border border-stone-800/50 space-y-3">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 bg-red-500/15 rounded-lg">
                          <Target className="w-5 h-5 text-red-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-white">The Problem</h3>
                      </div>
                      <p className="text-stone-400 leading-relaxed">{project.problem}</p>
                    </div>
                    <div className="p-5 bg-stone-800/30 rounded-xl border border-stone-800/50 space-y-3">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 bg-amber-500/15 rounded-lg">
                          <Lightbulb className="w-5 h-5 text-amber-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-white">The Solution</h3>
                      </div>
                      <p className="text-stone-400 leading-relaxed">{project.solution}</p>
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 bg-blue-500/15 rounded-lg">
                        <Cpu className="w-5 h-5 text-blue-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-white">Tech Stack</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <Badge
                          key={tech}
                          className="bg-stone-800/80 text-stone-200 border-stone-700/60 px-3 py-1 text-sm font-medium"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Features */}
                  {project.features && project.features.length > 0 && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 bg-green-500/15 rounded-lg">
                          <CheckCircle2 className="w-5 h-5 text-green-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-white">Key Features</h3>
                      </div>
                      <ul className="grid sm:grid-cols-2 gap-3">
                        {project.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-2.5 p-3 bg-stone-800/20 rounded-lg border border-stone-800/40">
                            <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                            <span className="text-stone-300 text-sm leading-relaxed">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Challenges */}
                  {project.challenges && project.challenges.length > 0 && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 bg-orange-500/15 rounded-lg">
                          <AlertTriangle className="w-5 h-5 text-orange-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-white">Challenges Overcome</h3>
                      </div>
                      <ul className="space-y-2">
                        {project.challenges.map((challenge, index) => (
                          <li key={index} className="flex items-start gap-2.5 p-3 bg-stone-800/20 rounded-lg border border-stone-800/40">
                            <AlertTriangle className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                            <span className="text-stone-300 text-sm leading-relaxed">{challenge}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Results */}
                  {project.results && project.results.length > 0 && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 bg-emerald-500/15 rounded-lg">
                          <TrendingUp className="w-5 h-5 text-emerald-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-white">Results & Impact</h3>
                      </div>
                      <ul className="space-y-2">
                        {project.results.map((result, index) => (
                          <li key={index} className="flex items-start gap-2.5 p-3 bg-emerald-500/5 rounded-lg border border-emerald-500/10">
                            <TrendingUp className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                            <span className="text-stone-300 text-sm leading-relaxed">{result}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="p-3 sm:p-4 md:p-6 border-t border-stone-800/80 bg-stone-900/95 backdrop-blur-sm flex flex-wrap items-center justify-between gap-3">
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="border-stone-700 text-stone-300 hover:bg-stone-800 hover:text-white"
                >
                  Close
                </Button>
                <div className="flex items-center gap-3">
                  {project.githubUrl && (
                    <Button
                      asChild
                      variant="outline"
                      className="border-stone-700 text-stone-300 hover:bg-stone-800 hover:text-white"
                    >
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        Source Code
                      </a>
                    </Button>
                  )}
                  {project.liveUrl && (
                    <Button
                      asChild
                      className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold"
                    >
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ArrowUpRight className="w-4 h-4 mr-2" />
                        View Live Demo
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
