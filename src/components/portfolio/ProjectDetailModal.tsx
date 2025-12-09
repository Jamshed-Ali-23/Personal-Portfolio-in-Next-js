import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  X, 
  Github, 
  ExternalLink, 
  Play, 
  ChevronLeft, 
  ChevronRight,
  Calendar,
  Target,
  Lightbulb,
  CheckCircle2,
  Layers,
  Image as ImageIcon
} from "lucide-react";
import { useState, useEffect } from "react";

interface ProjectDetail {
  id: number;
  title: string;
  problem: string;
  techStack: string[];
  solution: string;
  githubUrl: string;
  liveUrl: string;
  // Extended details
  icon: string;
  category: string;
  duration: string;
  fullDescription: string;
  features: string[];
  challenges: string[];
  results: string[];
  images: string[];
  demoVideo?: string;
}

interface ProjectDetailModalProps {
  project: ProjectDetail | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectDetailModal = ({ project, isOpen, onClose }: ProjectDetailModalProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'gallery' | 'video'>('overview');

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentImageIndex(0);
      setActiveTab('overview');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && project?.images.length) {
        setCurrentImageIndex(prev => prev === 0 ? project.images.length - 1 : prev - 1);
      }
      if (e.key === 'ArrowRight' && project?.images.length) {
        setCurrentImageIndex(prev => prev === project.images.length - 1 ? 0 : prev + 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, project, onClose]);

  if (!project) return null;

  const nextImage = () => {
    if (project.images.length > 0) {
      setCurrentImageIndex(prev => prev === project.images.length - 1 ? 0 : prev + 1);
    }
  };

  const prevImage = () => {
    if (project.images.length > 0) {
      setCurrentImageIndex(prev => prev === 0 ? project.images.length - 1 : prev - 1);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
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
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-4 sm:inset-8 md:inset-12 lg:inset-16 z-50 overflow-hidden"
          >
            <div className="relative w-full h-full bg-gradient-to-br from-stone-900 via-stone-900 to-stone-800 border border-amber-400/30 rounded-2xl overflow-hidden flex flex-col">
              {/* Header */}
              <div className="flex-shrink-0 bg-gradient-to-r from-amber-900/50 to-orange-900/50 border-b border-amber-400/20 px-4 sm:px-6 py-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-3xl sm:text-4xl flex-shrink-0">{project.icon}</span>
                    <div className="min-w-0">
                      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-amber-300 truncate">
                        {project.title}
                      </h2>
                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        <Badge className="bg-amber-500/20 border-amber-500/50 text-amber-200 text-xs">
                          {project.category}
                        </Badge>
                        <span className="text-stone-400 text-xs sm:text-sm flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {project.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Close Button */}
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                    className="flex-shrink-0 p-2 rounded-full bg-stone-800 border border-stone-700 text-stone-400 hover:text-white hover:border-amber-500/50 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mt-4">
                  {['overview', 'gallery', 'video'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab as any)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        activeTab === tab
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                          : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800'
                      }`}
                    >
                      {tab === 'overview' && <Layers className="w-4 h-4 inline mr-2" />}
                      {tab === 'gallery' && <ImageIcon className="w-4 h-4 inline mr-2" />}
                      {tab === 'video' && <Play className="w-4 h-4 inline mr-2" />}
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                <AnimatePresence mode="wait">
                  {activeTab === 'overview' && (
                    <motion.div
                      key="overview"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="space-y-6"
                    >
                      {/* Full Description */}
                      <div className="bg-stone-800/50 border border-stone-700/50 rounded-xl p-4 sm:p-6">
                        <h3 className="text-lg font-bold text-amber-300 mb-3 flex items-center gap-2">
                          <Target className="w-5 h-5" />
                          Project Overview
                        </h3>
                        <p className="text-stone-300 leading-relaxed">
                          {project.fullDescription}
                        </p>
                      </div>

                      {/* Problem & Solution Grid */}
                      <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                        {/* Problem */}
                        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 sm:p-6">
                          <h3 className="text-lg font-bold text-red-400 mb-3 flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-red-500/20 border border-red-500/50 flex items-center justify-center text-xs font-bold">
                              ?
                            </div>
                            The Problem
                          </h3>
                          <p className="text-stone-300 leading-relaxed text-sm sm:text-base">
                            {project.problem}
                          </p>
                        </div>

                        {/* Solution */}
                        <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 sm:p-6">
                          <h3 className="text-lg font-bold text-green-400 mb-3 flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-green-500/20 border border-green-500/50 flex items-center justify-center text-xs font-bold">
                              ✓
                            </div>
                            The Solution
                          </h3>
                          <p className="text-stone-300 leading-relaxed text-sm sm:text-base">
                            {project.solution}
                          </p>
                        </div>
                      </div>

                      {/* Tech Stack */}
                      <div className="bg-stone-800/50 border border-stone-700/50 rounded-xl p-4 sm:p-6">
                        <h3 className="text-lg font-bold text-amber-300 mb-4 flex items-center gap-2">
                          ⚙️ Technologies Used
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {project.techStack.map((tech, i) => (
                            <motion.div
                              key={tech}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: i * 0.05 }}
                            >
                              <Badge className="px-4 py-2 text-sm bg-amber-900/40 border border-amber-400/50 text-amber-200 hover:bg-amber-800/50 transition-colors">
                                {tech}
                              </Badge>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Key Features */}
                      {project.features.length > 0 && (
                        <div className="bg-stone-800/50 border border-stone-700/50 rounded-xl p-4 sm:p-6">
                          <h3 className="text-lg font-bold text-amber-300 mb-4 flex items-center gap-2">
                            <Lightbulb className="w-5 h-5" />
                            Key Features
                          </h3>
                          <div className="grid sm:grid-cols-2 gap-3">
                            {project.features.map((feature, i) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="flex items-start gap-2 p-3 bg-stone-900/50 rounded-lg"
                              >
                                <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                                <span className="text-stone-300 text-sm">{feature}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Challenges Overcome */}
                      {project.challenges.length > 0 && (
                        <div className="bg-stone-800/50 border border-stone-700/50 rounded-xl p-4 sm:p-6">
                          <h3 className="text-lg font-bold text-orange-400 mb-4 flex items-center gap-2">
                            🎯 Challenges Overcome
                          </h3>
                          <ul className="space-y-2">
                            {project.challenges.map((challenge, i) => (
                              <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="flex items-start gap-2 text-stone-300 text-sm"
                              >
                                <span className="text-orange-400">•</span>
                                {challenge}
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Results & Impact */}
                      {project.results.length > 0 && (
                        <div className="bg-gradient-to-r from-amber-900/30 to-orange-900/30 border border-amber-400/30 rounded-xl p-4 sm:p-6">
                          <h3 className="text-lg font-bold text-amber-300 mb-4 flex items-center gap-2">
                            📈 Results & Impact
                          </h3>
                          <div className="grid sm:grid-cols-2 gap-3">
                            {project.results.map((result, i) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="flex items-start gap-2 p-3 bg-stone-900/50 rounded-lg"
                              >
                                <span className="text-amber-400">✓</span>
                                <span className="text-stone-300 text-sm">{result}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {activeTab === 'gallery' && (
                    <motion.div
                      key="gallery"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="space-y-6"
                    >
                      {project.images.length > 0 ? (
                        <>
                          {/* Main Image Display */}
                          <div className="relative aspect-video bg-stone-800 rounded-xl overflow-hidden border border-stone-700">
                            <img
                              src={project.images[currentImageIndex]}
                              alt={`${project.title} screenshot ${currentImageIndex + 1}`}
                              className="w-full h-full object-contain"
                            />
                            
                            {/* Navigation Arrows */}
                            {project.images.length > 1 && (
                              <>
                                <button
                                  onClick={prevImage}
                                  className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                                >
                                  <ChevronLeft className="w-6 h-6" />
                                </button>
                                <button
                                  onClick={nextImage}
                                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                                >
                                  <ChevronRight className="w-6 h-6" />
                                </button>
                              </>
                            )}

                            {/* Image Counter */}
                            <div className="absolute bottom-2 right-2 px-3 py-1 bg-black/50 rounded-full text-white text-sm">
                              {currentImageIndex + 1} / {project.images.length}
                            </div>
                          </div>

                          {/* Thumbnails */}
                          {project.images.length > 1 && (
                            <div className="flex gap-2 overflow-x-auto pb-2">
                              {project.images.map((img, i) => (
                                <button
                                  key={i}
                                  onClick={() => setCurrentImageIndex(i)}
                                  className={`flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                                    i === currentImageIndex
                                      ? 'border-amber-500 opacity-100'
                                      : 'border-transparent opacity-60 hover:opacity-100'
                                  }`}
                                >
                                  <img
                                    src={img}
                                    alt={`Thumbnail ${i + 1}`}
                                    className="w-full h-full object-cover"
                                  />
                                </button>
                              ))}
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="aspect-video bg-stone-800/50 border border-stone-700/50 rounded-xl flex items-center justify-center">
                          <div className="text-center text-stone-500">
                            <ImageIcon className="w-12 h-12 mx-auto mb-2" />
                            <p>No images available for this project</p>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {activeTab === 'video' && (
                    <motion.div
                      key="video"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="space-y-6"
                    >
                      {project.demoVideo ? (
                        <div className="aspect-video bg-stone-800 rounded-xl overflow-hidden border border-stone-700">
                          <iframe
                            src={project.demoVideo}
                            title={`${project.title} Demo Video`}
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                      ) : (
                        <div className="aspect-video bg-stone-800/50 border border-stone-700/50 rounded-xl flex items-center justify-center">
                          <div className="text-center text-stone-500">
                            <Play className="w-12 h-12 mx-auto mb-2" />
                            <p>No demo video available for this project</p>
                            <p className="text-sm mt-2">Check out the live demo or GitHub for more details</p>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Footer with Action Buttons */}
              <div className="flex-shrink-0 bg-stone-900/80 border-t border-stone-700/50 px-4 sm:px-6 py-4">
                <div className="flex flex-wrap gap-3 justify-center sm:justify-end">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold px-6"
                      onClick={() => window.open(project.githubUrl, '_blank', 'noopener,noreferrer')}
                    >
                      <Github className="w-4 h-4 mr-2" />
                      View Code on GitHub
                    </Button>
                  </motion.div>
                  
                  {project.liveUrl && project.liveUrl !== "#" && (
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        variant="outline"
                        className="border-amber-400/50 text-amber-300 hover:bg-amber-500/10 px-6"
                        onClick={() => window.open(project.liveUrl, '_blank', 'noopener,noreferrer')}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                      </Button>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
