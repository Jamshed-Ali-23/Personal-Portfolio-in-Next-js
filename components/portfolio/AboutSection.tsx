'use client';

import { motion } from 'framer-motion';
import { GraduationCap, Calendar, BookOpen, Zap, Target, Lightbulb, Users, CheckCircle2, Briefcase } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface Experience {
  _id: string;
  role: string;
  company: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  location?: string;
  description?: string;
  achievements: string[];
  technologies?: string[];
}

interface Profile {
  name: string;
  title: string;
  bio: string;
  education?: {
    degree: string;
    institution: string;
    year: string;
    description?: string;
  };
  coursework?: string[];
  strengths?: string[];
  stats: {
    projectsCompleted: number;
    certificationsEarned: number;
    technologiesMastered: number;
  };
}

// Stat Card
const StatCard = ({ icon: Icon, value, label, color }: { icon: React.ElementType; value: string; label: string; color: string }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className={`p-4 sm:p-6 rounded-xl bg-stone-800/50 border border-stone-700/50 text-center ${color}`}
  >
    <Icon className="w-6 h-6 mx-auto mb-2 opacity-80" />
    <div className="text-2xl sm:text-3xl font-bold">{value}</div>
    <div className="text-sm text-stone-400">{label}</div>
  </motion.div>
);

// Coursework Item
const CourseworkItem = ({ item, index }: { item: string; index: number }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className="flex items-center gap-2 text-stone-300"
  >
    <BookOpen className="w-4 h-4 text-amber-400" />
    <span className="text-sm">{item}</span>
  </motion.div>
);

// Strength Item
const StrengthItem = ({ icon: Icon, title, index }: { icon: React.ElementType; title: string; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    whileHover={{ scale: 1.05 }}
    className="flex items-center gap-3 p-3 bg-stone-800/50 border border-stone-700/50 rounded-lg"
  >
    <div className="p-2 bg-amber-500/20 rounded-lg">
      <Icon className="w-4 h-4 text-amber-400" />
    </div>
    <span className="text-sm text-stone-300">{title}</span>
  </motion.div>
);

const defaultCoursework = [
  'Linear Algebra',
  'Probability & Statistics',
  'Calculus',
  'Discrete Mathematics',
];

const strengthIcons: { [key: string]: React.ElementType } = {
  'Problem-Solving': Target,
  'Fast Learner': Lightbulb,
  'Team Player': Users,
  'Data-Driven': Zap,
};

interface AboutSectionProps {
  profile: Profile | null;
  experiences: Experience[];
}

export default function AboutSection({ profile, experiences }: AboutSectionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const coursework = profile?.coursework || defaultCoursework;
  const strengths = profile?.strengths || ['Problem-Solving', 'Fast Learner', 'Team Player', 'Data-Driven'];
  const stats = profile?.stats || { projectsCompleted: 6, certificationsEarned: 6, technologiesMastered: 18 };

  const currentExperience = experiences.find((exp) => exp.isCurrent);

  return (
    <section id="about" className="py-20 sm:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <Badge className="mb-4 bg-amber-500/10 text-amber-400 border-amber-500/30">About Me</Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Transforming Data Into
              <span className="block bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Strategic Insights
              </span>
            </h2>
            <p className="text-stone-400 max-w-2xl mx-auto">
              {profile?.bio ||
                'A passionate Data Science student combining analytical expertise with modern web development skills.'}
            </p>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Education Card */}
            <motion.div variants={itemVariants}>
              <Card className="bg-stone-900/50 border-stone-800 overflow-hidden h-full">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="p-3 bg-amber-500/20 rounded-xl">
                      <GraduationCap className="w-6 h-6 text-amber-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">
                        {profile?.education?.degree || 'BS Computer Science'}
                      </h3>
                      <p className="text-amber-400">
                        {profile?.education?.institution || 'Air University, Islamabad'}
                      </p>
                      <div className="flex items-center gap-2 text-stone-400 text-sm mt-1">
                        <Calendar className="w-4 h-4" />
                        <span>{profile?.education?.year || '2023 - 2027'}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-stone-400 mb-6">
                    {profile?.education?.description ||
                      'Focused on Data Science, Machine Learning, and Analytics. Combining theoretical knowledge with practical project experience.'}
                  </p>

                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-stone-300 uppercase tracking-wider">
                      Relevant Coursework
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {coursework.map((item, index) => (
                        <CourseworkItem key={item} item={item} index={index} />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Experience Card */}
            <motion.div variants={itemVariants}>
              <Card className="bg-stone-900/50 border-stone-800 overflow-hidden h-full">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="p-3 bg-amber-500/20 rounded-xl">
                      <Briefcase className="w-6 h-6 text-amber-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">
                        {currentExperience?.role || 'Data Analytics Intern'}
                      </h3>
                      <p className="text-amber-400">
                        {currentExperience?.company || 'Elevvo Pathways'}
                      </p>
                      <div className="flex items-center gap-2 text-stone-400 text-sm mt-1">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {currentExperience?.startDate
                            ? new Date(currentExperience.startDate).toLocaleDateString('en-US', {
                                month: 'short',
                                year: 'numeric',
                              })
                            : 'Present'}{' '}
                          - {currentExperience?.isCurrent ? 'Present' : currentExperience?.endDate}
                        </span>
                      </div>
                    </div>
                  </div>

                  {currentExperience?.description && (
                    <p className="text-stone-400 mb-6">{currentExperience.description}</p>
                  )}

                  {currentExperience?.achievements && currentExperience.achievements.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold text-stone-300 uppercase tracking-wider">
                        Key Achievements
                      </h4>
                      <ul className="space-y-2">
                        {currentExperience.achievements.slice(0, 4).map((achievement, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start gap-2 text-stone-300 text-sm"
                          >
                            <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                            <span>{achievement}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {currentExperience?.technologies && currentExperience.technologies.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-stone-700/50">
                      <h4 className="text-sm font-semibold text-stone-300 uppercase tracking-wider mb-3">
                        Technologies Used
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {currentExperience.technologies.map((tech) => (
                          <Badge
                            key={tech}
                            variant="secondary"
                            className="bg-stone-800 text-stone-300 border-stone-700"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Stats Grid */}
          <motion.div variants={itemVariants} className="grid grid-cols-3 gap-4 mt-12">
            <StatCard
              icon={Target}
              value={`${stats.projectsCompleted}+`}
              label="Projects Completed"
              color="text-amber-400"
            />
            <StatCard
              icon={GraduationCap}
              value={`${stats.certificationsEarned}+`}
              label="Certifications"
              color="text-orange-400"
            />
            <StatCard
              icon={Zap}
              value={`${stats.technologiesMastered}+`}
              label="Technologies"
              color="text-rose-400"
            />
          </motion.div>

          {/* Strengths */}
          <motion.div variants={itemVariants} className="mt-12">
            <h3 className="text-xl font-semibold text-white mb-6 text-center">Key Strengths</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {strengths.map((strength, index) => (
                <StrengthItem
                  key={strength}
                  icon={strengthIcons[strength] || Zap}
                  title={strength}
                  index={index}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
