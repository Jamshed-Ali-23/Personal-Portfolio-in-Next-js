'use client';

import { motion } from 'framer-motion';
import {
  Database,
  Brain,
  Code2,
  Zap,
  Target,
  Users,
  Lightbulb,
  Sparkles,
  FileCode2,
  BarChart3,
  Table2,
  Grid3x3,
  LineChart,
  GitBranch,
  Layers,
  LayoutDashboard,
  PieChart,
  Workflow,
  Cpu,
  Boxes,
  Braces,
  Palette,
  Globe,
  Sigma,
  TrendingUp,
  Gauge,
  Network,
  FlaskConical,
  SlidersHorizontal,
  AreaChart,
} from 'lucide-react';
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

// Category icon mapping
const categoryIconMap: { [key: string]: React.ElementType } = {
  Database,
  Brain,
  Code2,
  Zap,
};

// Skill-specific icon mapping
const skillIconMap: { [key: string]: React.ElementType } = {
  // Core Technologies
  Python: FileCode2,
  SQL: Database,
  'Power BI': BarChart3,
  DAX: Sigma,
  Pandas: Table2,
  NumPy: Grid3x3,
  Excel: LayoutDashboard,
  'Power Query': SlidersHorizontal,

  // ML & Analytics
  'Scikit-learn': FlaskConical,
  'K-Means': Network,
  'RFM Analysis': PieChart,
  'Time Series': LineChart,
  XGBoost: TrendingUp,
  Prophet: AreaChart,
  Classification: Boxes,
  Regression: Gauge,

  // Engineering Edge
  React: Layers,
  Streamlit: Globe,
  Git: GitBranch,
  Plotly: BarChart3,
  TypeScript: Braces,
  'Tailwind CSS': Palette,
  'Three.js': Cpu,
  'Next.js': Globe,

  // Extra fallbacks
  MongoDB: Database,
  'Node.js': Globe,
  JavaScript: FileCode2,
  CSS: Palette,
  HTML: Code2,
  Docker: Boxes,
  AWS: Workflow,
  Firebase: Zap,
};

// Color mapping per category
const categoryColors: {
  [key: string]: {
    accent: string;
    bg: string;
    border: string;
    glow: string;
    skillBg: string;
    skillBorder: string;
    skillIconColor: string;
  };
} = {
  'Core Technologies': {
    accent: 'text-amber-400',
    bg: 'from-amber-500/15 to-amber-500/5',
    border: 'hover:border-amber-500/30',
    glow: 'group-hover:shadow-amber-500/5',
    skillBg: 'bg-amber-500/[0.06] hover:bg-amber-500/15',
    skillBorder: 'border-amber-500/10 hover:border-amber-500/25',
    skillIconColor: 'text-amber-400/60 group-hover/skill:text-amber-400',
  },
  'ML & Analytics': {
    accent: 'text-violet-400',
    bg: 'from-violet-500/15 to-violet-500/5',
    border: 'hover:border-violet-500/30',
    glow: 'group-hover:shadow-violet-500/5',
    skillBg: 'bg-violet-500/[0.06] hover:bg-violet-500/15',
    skillBorder: 'border-violet-500/10 hover:border-violet-500/25',
    skillIconColor: 'text-violet-400/60 group-hover/skill:text-violet-400',
  },
  'Engineering Edge': {
    accent: 'text-cyan-400',
    bg: 'from-cyan-500/15 to-cyan-500/5',
    border: 'hover:border-cyan-500/30',
    glow: 'group-hover:shadow-cyan-500/5',
    skillBg: 'bg-cyan-500/[0.06] hover:bg-cyan-500/15',
    skillBorder: 'border-cyan-500/10 hover:border-cyan-500/25',
    skillIconColor: 'text-cyan-400/60 group-hover/skill:text-cyan-400',
  },
};

// Skill Chip with Icon
const SkillChip = ({
  skill,
  index,
  colors,
}: {
  skill: Skill;
  index: number;
  colors: (typeof categoryColors)[string];
}) => {
  const Icon = skillIconMap[skill.name] || Code2;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04, duration: 0.35 }}
      whileHover={{ y: -2 }}
      className={`group/skill flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border ${colors.skillBg} ${colors.skillBorder} transition-all duration-300 cursor-default`}
    >
      <Icon
        className={`w-4 h-4 flex-shrink-0 ${colors.skillIconColor} transition-colors duration-300`}
      />
      <span className="text-sm text-stone-300 font-medium group-hover/skill:text-white transition-colors duration-300">
        {skill.name}
      </span>
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
  const Icon = categoryIconMap[category.icon || 'Code2'] || Code2;
  const colors = categoryColors[category.title] || categoryColors['Core Technologies'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, duration: 0.5 }}
    >
      <Card
        className={`bg-stone-900/40 border-stone-800/60 ${colors.border} transition-all duration-300 h-full group hover:shadow-xl ${colors.glow}`}
      >
        <CardContent className="p-6">
          {/* Header */}
          <div className="flex items-start gap-4 mb-5">
            <div
              className={`p-3 bg-gradient-to-br ${colors.bg} rounded-xl group-hover:scale-105 transition-transform`}
            >
              <Icon className={`w-6 h-6 ${colors.accent}`} />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white">{category.title}</h3>
              {category.description && (
                <p className="text-stone-500 text-xs mt-1 leading-relaxed">
                  {category.description}
                </p>
              )}
            </div>
            <Badge className="bg-stone-800/60 text-stone-400 border-stone-700/50 text-[10px] font-semibold">
              {category.skills.length}
            </Badge>
          </div>

          {/* Skills as icon chips */}
          <div className="flex flex-wrap gap-2">
            {category.skills.map((skill, skillIndex) => (
              <SkillChip
                key={skill.name}
                skill={skill}
                index={skillIndex}
                colors={colors}
              />
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
    whileHover={{ scale: 1.03, y: -3 }}
    className="p-5 bg-stone-900/40 border border-stone-800/60 rounded-2xl text-center hover:border-stone-700/60 transition-all duration-300"
  >
    <div className="w-10 h-10 mx-auto mb-3 rounded-xl bg-stone-800/60 border border-stone-700/40 flex items-center justify-center">
      <Icon className="w-5 h-5 text-amber-400" />
    </div>
    <div className="text-2xl sm:text-3xl font-bold text-white mb-0.5">{value}</div>
    <div className="text-xs text-stone-500 font-medium">{label}</div>
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
    whileHover={{ x: 4 }}
    className="flex items-start gap-4 p-4 bg-stone-800/30 border border-stone-700/30 rounded-xl hover:bg-stone-800/50 hover:border-stone-700/50 transition-all duration-300"
  >
    <div className="p-2 bg-gradient-to-br from-amber-500/15 to-orange-500/10 rounded-lg flex-shrink-0">
      <Icon className="w-5 h-5 text-amber-400" />
    </div>
    <div>
      <h4 className="font-semibold text-white text-sm">{title}</h4>
      <p className="text-xs text-stone-500 mt-1 leading-relaxed">{description}</p>
    </div>
  </motion.div>
);

interface SkillsSectionProps {
  skillCategories: SkillCategory[];
}

export default function SkillsSection({ skillCategories }: SkillsSectionProps) {
  const totalSkills = skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0);

  return (
    <section id="skills" className="py-20 sm:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-stone-900/80 to-stone-950" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
      <div className="absolute bottom-1/4 -left-40 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <div className="text-center mb-14">
            <Badge className="mb-4 bg-amber-500/10 text-amber-400 border-amber-500/30 px-4 py-1.5 text-sm font-medium">
              <Sparkles className="w-3.5 h-3.5 mr-1.5 inline-block" />
              Technical Skills
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Tools & Technologies
              <span className="block bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                I Work With
              </span>
            </h2>
            <p className="text-stone-400 max-w-2xl mx-auto leading-relaxed">
              A comprehensive toolkit built through coursework, certifications, and hands-on project
              experience across data science, machine learning, and web development.
            </p>
          </div>

          {/* Skill Categories Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-10 sm:mb-14">
            {skillCategories.map((category, index) => (
              <CategoryCard key={category._id} category={category} index={index} />
            ))}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-10 sm:mb-14">
            <StatCard icon={Database} value={`${totalSkills}+`} label="Technologies" delay={0.1} />
            <StatCard
              icon={Brain}
              value={`${skillCategories.length}`}
              label="Skill Categories"
              delay={0.2}
            />
            <StatCard icon={Target} value="95%" label="Project Success" delay={0.3} />
            <StatCard icon={Zap} value="Fast" label="Learning Pace" delay={0.4} />
          </div>

          {/* Key Strengths */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-stone-900/30 border border-stone-800/50 rounded-2xl p-6 sm:p-8"
          >
            <h3 className="text-lg font-semibold text-white mb-6 text-center">
              What Sets Me <span className="text-amber-400">Apart</span>
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <StrengthCard
                icon={Target}
                title="Problem-Solving Mindset"
                description="Approach complex data challenges with structured analytical thinking and creative solutions"
                delay={0.1}
              />
              <StrengthCard
                icon={Lightbulb}
                title="Continuous Learner"
                description="Stay updated with latest tools, techniques, and industry best practices"
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
                description="End-to-end project delivery from data collection to visualization and deployment"
                delay={0.4}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}