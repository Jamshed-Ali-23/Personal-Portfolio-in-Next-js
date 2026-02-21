'use client';

import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface Experience {
  _id: string;
  role: string;
  company: string;
  location?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  isCurrent: boolean;
  achievements: string[];
  technologies?: string[];
  order: number;
  isVisible: boolean;
}

interface ExperienceSectionProps {
  experiences: Experience[];
}

function formatDate(dateStr?: string): string {
  if (!dateStr) return '';
  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

function ExperienceCard({ experience, index }: { experience: Experience; index: number }) {
  const startFormatted = formatDate(experience.startDate);
  const endFormatted = experience.isCurrent ? 'Present' : formatDate(experience.endDate);
  const dateRange = [startFormatted, endFormatted].filter(Boolean).join(' — ');

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative pl-8 sm:pl-12 pb-10 last:pb-0 group"
    >
      {/* Timeline line */}
      <div className="absolute left-[11px] sm:left-[19px] top-2 bottom-0 w-px bg-gradient-to-b from-amber-500/40 via-stone-700/30 to-transparent group-last:hidden" />
      
      {/* Timeline dot */}
      <div className="absolute left-0 sm:left-2 top-2 z-10">
        <div className={`w-[23px] h-[23px] rounded-full border-2 flex items-center justify-center transition-colors duration-300 ${
          experience.isCurrent
            ? 'border-amber-500 bg-amber-500/20'
            : 'border-stone-600 bg-stone-900 group-hover:border-amber-500/60'
        }`}>
          <div className={`w-2.5 h-2.5 rounded-full ${
            experience.isCurrent ? 'bg-amber-500 animate-pulse' : 'bg-stone-600 group-hover:bg-amber-500/60'
          }`} />
        </div>
      </div>

      {/* Card */}
      <Card className="bg-stone-900/40 border-stone-800/60 overflow-hidden hover:border-stone-700/60 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-amber-500/5">
        <CardContent className="p-5 sm:p-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h3 className="text-lg font-semibold text-white">
                  {experience.role}
                </h3>
                {experience.isCurrent && (
                  <Badge className="bg-green-500/10 text-green-400 border-green-500/20 text-[10px] font-semibold px-2 py-0.5">
                    Current
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-1.5 mt-1">
                <ArrowUpRight className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-amber-400 font-medium text-sm">{experience.company}</span>
              </div>
            </div>
            <div className="flex flex-col sm:items-end gap-1 text-stone-500 text-xs sm:text-sm shrink-0">
              {dateRange && (
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{dateRange}</span>
                </div>
              )}
              {experience.location && (
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{experience.location}</span>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          {experience.description && (
            <p className="text-stone-400 text-sm leading-relaxed mb-4">{experience.description}</p>
          )}

          {/* Achievements */}
          {experience.achievements && experience.achievements.length > 0 && (
            <div className="mb-4">
              <ul className="space-y-2">
                {experience.achievements.map((achievement, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-start gap-2.5 text-stone-300 text-sm"
                  >
                    <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>{achievement}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          )}

          {/* Technologies */}
          {experience.technologies && experience.technologies.length > 0 && (
            <div className="pt-3 border-t border-stone-800/50">
              <div className="flex flex-wrap gap-1.5">
                {experience.technologies.map((tech) => (
                  <Badge
                    key={tech}
                    variant="secondary"
                    className="bg-stone-800/60 text-stone-300 border-stone-700/50 text-xs font-medium px-2.5 py-0.5"
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
  );
}

export default function ExperienceSection({ experiences }: ExperienceSectionProps) {
  if (!experiences || experiences.length === 0) {
    return null;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="experience" className="py-20 sm:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-stone-900/60 to-stone-950" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
      {/* Decorative accents */}
      <div className="absolute top-1/4 -right-40 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -left-40 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
          className="max-w-4xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-14">
            <Badge className="mb-4 bg-amber-500/10 text-amber-400 border-amber-500/30 px-4 py-1.5 text-sm font-medium">
              <Briefcase className="w-3.5 h-3.5 mr-1.5 inline-block" />
              Experience
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5">
              Professional
              <span className="block bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Journey
              </span>
            </h2>
            <p className="text-stone-400 max-w-2xl mx-auto leading-relaxed">
              A timeline of my professional experience, roles, and contributions.
            </p>
          </motion.div>

          {/* Timeline */}
          <motion.div variants={itemVariants}>
            {experiences.map((exp, index) => (
              <ExperienceCard key={exp._id} experience={exp} index={index} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
