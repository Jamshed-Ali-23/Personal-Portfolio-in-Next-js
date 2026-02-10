'use client';

import { motion } from 'framer-motion';
import { Database, Brain, Code2, Zap, Target, Users, Lightbulb } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface Skill {
  name: string;
  level: number;
}

interface SkillCategory {
  _id: string;
  title: string;
  icon?: string;
  description?: string;
  skills: Skill[];
}

// Icon mapping
const iconMap: { [key: string]: React.ElementType } = {
  Database,
  Brain,
  Code2,
  Zap,
};

// Skill Badge
const SkillBadge = ({ skill, index }: { skill: Skill; index: number }) => {
  const levelColors: { [key: number]: string } = {
    1: 'bg-stone-800 border-stone-700',
    2: 'bg-stone-800 border-stone-600',
    3: 'bg-amber-900/40 border-amber-700/50',
    4: 'bg-amber-800/50 border-amber-600/50',
    5: 'bg-amber-700/60 border-amber-500/50',
  };

  // Normalize level: if > 5, treat as 0-100 scale and convert to 1-5
  const normalizedLevel = skill.level > 5 
    ? Math.min(5, Math.max(1, Math.ceil(skill.level / 20)))
    : skill.level;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.05, y: -2 }}
    >
      <Badge
        className={`${levelColors[normalizedLevel] || levelColors[3]} text-stone-100 text-sm py-1.5 px-3`}
      >
        {skill.name}
      </Badge>
    </motion.div>
  );
};

// Category Card
const CategoryCard = ({
  category,
  index,
}: {
  category: SkillCategory;
  index: number;
}) => {
  const Icon = iconMap[category.icon || 'Code2'] || Code2;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
    >
      <Card className="bg-stone-900/50 border-stone-800 hover:border-amber-500/30 transition-all duration-300 h-full">
        <CardContent className="p-6">
          {/* Header */}
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-xl">
              <Icon className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">{category.title}</h3>
              {category.description && (
                <p className="text-stone-400 text-sm mt-1">{category.description}</p>
              )}
            </div>
          </div>

          {/* Skills Grid */}
          <div className="flex flex-wrap gap-2">
            {category.skills.map((skill, skillIndex) => (
              <SkillBadge key={skill.name} skill={skill} index={skillIndex} />
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Stats Card
const StatCard = ({
  icon: Icon,
  value,
  label,
  delay,
}: {
  icon: React.ElementType;
  value: string;
  label: string;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    whileHover={{ scale: 1.05 }}
    className="p-6 bg-stone-800/50 border border-stone-700/50 rounded-xl text-center"
  >
    <Icon className="w-8 h-8 text-amber-400 mx-auto mb-3" />
    <div className="text-3xl font-bold text-white mb-1">{value}</div>
    <div className="text-sm text-stone-400">{label}</div>
  </motion.div>
);

// Strength Card
const StrengthCard = ({
  icon: Icon,
  title,
  description,
  delay,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    className="flex items-start gap-4 p-4 bg-stone-800/30 border border-stone-700/30 rounded-xl"
  >
    <div className="p-2 bg-amber-500/20 rounded-lg flex-shrink-0">
      <Icon className="w-5 h-5 text-amber-400" />
    </div>
    <div>
      <h4 className="font-semibold text-white">{title}</h4>
      <p className="text-sm text-stone-400 mt-1">{description}</p>
    </div>
  </motion.div>
);

interface SkillsSectionProps {
  skillCategories: SkillCategory[];
}

export default function SkillsSection({ skillCategories }: SkillsSectionProps) {
  // Calculate total skills
  const totalSkills = skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0);

  return (
    <section id="skills" className="py-20 sm:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-amber-500/10 text-amber-400 border-amber-500/30">
              Technical Skills
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Tools & Technologies
              <span className="block bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                I Work With
              </span>
            </h2>
            <p className="text-stone-400 max-w-2xl mx-auto">
              A comprehensive toolkit built through coursework, certifications, and hands-on project
              experience.
            </p>
          </div>

          {/* Skill Categories Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {skillCategories.map((category, index) => (
              <CategoryCard key={category._id} category={category} index={index} />
            ))}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            <StatCard icon={Database} value={`${totalSkills}+`} label="Technologies" delay={0.1} />
            <StatCard icon={Brain} value={`${skillCategories.length}`} label="Skill Categories" delay={0.2} />
            <StatCard icon={Target} value="95%" label="Project Success" delay={0.3} />
            <StatCard icon={Zap} value="Fast" label="Learning Pace" delay={0.4} />
          </div>

          {/* Key Strengths */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-stone-900/30 border border-stone-800 rounded-2xl p-8"
          >
            <h3 className="text-xl font-semibold text-white mb-6 text-center">What Sets Me Apart</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <StrengthCard
                icon={Target}
                title="Problem-Solving Mindset"
                description="Approach complex data challenges with structured analytical thinking"
                delay={0.1}
              />
              <StrengthCard
                icon={Lightbulb}
                title="Continuous Learner"
                description="Stay updated with latest tools, techniques, and best practices"
                delay={0.2}
              />
              <StrengthCard
                icon={Users}
                title="Communication Skills"
                description="Translate technical insights into actionable business recommendations"
                delay={0.3}
              />
              <StrengthCard
                icon={Code2}
                title="Full-Stack Capability"
                description="End-to-end project delivery from data collection to visualization"
                delay={0.4}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
