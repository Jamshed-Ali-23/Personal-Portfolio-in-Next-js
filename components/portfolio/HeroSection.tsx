'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronDown, ArrowRight, Download, Github, Linkedin, Mail, Database, BarChart3, Brain, Code2 } from 'lucide-react';

interface Profile {
  name: string;
  title: string;
  bio: string;
  email: string;
  socialLinks: {
    github: string;
    linkedin: string;
    email: string;
  };
  stats: {
    projectsCompleted: number;
    certificationsEarned: number;
    technologiesMastered: number;
  };
}

// Animated Background Grid
const GridBackground = () => (
  <div className="absolute inset-0 -z-10">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#d9731510_1px,transparent_1px),linear-gradient(to_bottom,#d9731510_1px,transparent_1px)] bg-[size:60px_60px]" />
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-stone-950" />
  </div>
);

// Floating Orbs
const FloatingOrb = ({ className, delay = 0 }: { className: string; delay?: number }) => (
  <motion.div
    className={`absolute rounded-full blur-3xl ${className}`}
    animate={{
      y: [0, -30, 0],
      x: [0, 20, 0],
      scale: [1, 1.1, 1],
    }}
    transition={{
      duration: 8,
      repeat: Infinity,
      ease: 'easeInOut',
      delay,
    }}
  />
);

// Tech Badge Component
const TechBadge = ({ icon: Icon, label, delay }: { icon: React.ElementType; label: string; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    whileHover={{ scale: 1.05, y: -5 }}
    className="flex items-center gap-2 px-4 py-2 bg-stone-800/50 border border-stone-700/50 rounded-full backdrop-blur-sm"
  >
    <Icon className="w-4 h-4 text-amber-400" />
    <span className="text-sm text-stone-300">{label}</span>
  </motion.div>
);

// Stat Card
const StatCard = ({ value, label, delay }: { value: string; label: string; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.5, type: 'spring' }}
    className="text-center"
  >
    <div className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
      {value}
    </div>
    <div className="text-xs sm:text-sm text-stone-400 mt-1">{label}</div>
  </motion.div>
);

interface HeroSectionProps {
  profile: Profile | null;
}

export default function HeroSection({ profile }: HeroSectionProps) {
  const [text, setText] = useState('');
  const fullText = profile?.title || 'Data Scientist & Analytics Expert';
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [5, -5]), { stiffness: 100, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-5, 5]), { stiffness: 100, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      mouseX.set(e.clientX - rect.left - rect.width / 2);
      mouseY.set(e.clientY - rect.top - rect.height / 2);
    }
  };

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) clearInterval(timer);
    }, 50);
    return () => clearInterval(timer);
  }, [fullText]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const name = profile?.name || 'Jamshed Ali';
  const stats = profile?.stats || { projectsCompleted: 6, certificationsEarned: 6, technologiesMastered: 18 };

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-stone-950"
    >
      {/* Background Effects */}
      <GridBackground />
      <FloatingOrb className="w-[600px] h-[600px] bg-amber-500/20 top-[-200px] left-[-200px]" delay={0} />
      <FloatingOrb className="w-[500px] h-[500px] bg-orange-500/15 bottom-[-150px] right-[-150px]" delay={2} />
      <FloatingOrb className="w-[300px] h-[300px] bg-rose-500/10 top-[40%] right-[10%]" delay={4} />

      {/* Main Content */}
      <motion.div
        className="container mx-auto px-4 sm:px-6 py-16 sm:py-20 relative z-10"
        style={{ y, opacity }}
      >
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center max-w-7xl mx-auto">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-sm text-amber-300">Available for opportunities</span>
            </motion.div>

            {/* Name & Title */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold"
              >
                <span className="text-white">Hi, I'm </span>
                <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-500 bg-clip-text text-transparent">
                  {name}
                </span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-slate-300 h-8 sm:h-10"
              >
                {text}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="inline-block w-[3px] h-8 bg-cyan-400 ml-1 align-middle"
                />
              </motion.div>
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-base sm:text-lg text-stone-400 leading-relaxed max-w-xl"
            >
              I transform complex data into actionable insights. Specializing in
              <span className="text-amber-400 font-medium"> Python, Power BI, SQL</span>, and
              <span className="text-amber-400 font-medium"> Machine Learning</span> with a unique edge in
              building interactive dashboards.
            </motion.p>

            {/* Tech Stack */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-3"
            >
              <TechBadge icon={Database} label="SQL & Python" delay={0.8} />
              <TechBadge icon={BarChart3} label="Power BI" delay={0.9} />
              <TechBadge icon={Brain} label="Machine Learning" delay={1.0} />
              <TechBadge icon={Code2} label="React & Streamlit" delay={1.1} />
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <Button
                size="lg"
                onClick={() => scrollToSection('projects')}
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold px-8"
              >
                View Projects
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-amber-500/50 text-amber-400 hover:bg-amber-500/10"
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = '/Resume/Jamshed_Ali_Resume.pdf';
                  link.download = 'Jamshed_Ali_Resume.pdf';
                  link.click();
                }}
              >
                <Download className="mr-2 w-4 h-4" />
                Download CV
              </Button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="flex gap-4 pt-4"
            >
              {profile?.socialLinks?.github && (
                <a
                  href={profile.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-stone-800/50 border border-stone-700/50 text-stone-400 hover:text-amber-400 hover:border-amber-500/50 transition-colors"
                >
                  <Github className="w-5 h-5" />
                </a>
              )}
              {profile?.socialLinks?.linkedin && (
                <a
                  href={profile.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-stone-800/50 border border-stone-700/50 text-stone-400 hover:text-amber-400 hover:border-amber-500/50 transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
              {profile?.socialLinks?.email && (
                <a
                  href={`mailto:${profile.socialLinks.email}`}
                  className="p-3 rounded-full bg-stone-800/50 border border-stone-700/50 text-stone-400 hover:text-amber-400 hover:border-amber-500/50 transition-colors"
                >
                  <Mail className="w-5 h-5" />
                </a>
              )}
            </motion.div>
          </motion.div>

          {/* Right Content - Profile Image + Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
            className="relative flex flex-col items-center"
          >
            {/* Profile Image */}
            <motion.div
              className="relative mb-12"
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full blur-3xl opacity-30 scale-110" />

              {/* Image Container */}
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-stone-800 shadow-2xl shadow-amber-500/20">
                <img
                  src="/images/profile.jpg"
                  alt={name}
                  className="w-full h-full object-cover object-center scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent" />
              </div>

              {/* Floating Badges */}
              <motion.div
                className="hidden sm:block absolute -top-4 -right-4 px-4 py-2 bg-stone-900 border border-amber-500/30 rounded-xl shadow-lg"
                animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
              >
                <span className="text-2xl">🐍</span>
                <span className="ml-2 text-sm font-medium text-amber-400">Python</span>
              </motion.div>

              <motion.div
                className="hidden sm:block absolute top-1/2 -left-8 px-4 py-2 bg-stone-900 border border-orange-500/30 rounded-xl shadow-lg"
                animate={{ y: [0, -10, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              >
                <span className="text-2xl">📊</span>
                <span className="ml-2 text-sm font-medium text-orange-400">Power BI</span>
              </motion.div>

              <motion.div
                className="hidden sm:block absolute -bottom-2 right-0 px-4 py-2 bg-stone-900 border border-rose-500/30 rounded-xl shadow-lg"
                animate={{ y: [0, -10, 0], rotate: [0, 3, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1.5 }}
              >
                <span className="text-2xl">🤖</span>
                <span className="ml-2 text-sm font-medium text-rose-400">ML</span>
              </motion.div>
            </motion.div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-6">
              <StatCard value={`${stats.projectsCompleted}+`} label="Projects" delay={1.0} />
              <StatCard value={`${stats.certificationsEarned}+`} label="Certificates" delay={1.1} />
              <StatCard value={`${stats.technologiesMastered}+`} label="Technologies" delay={1.2} />
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.button
            onClick={() => scrollToSection('about')}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-stone-400 hover:text-amber-400 transition-colors"
          >
            <ChevronDown className="w-8 h-8" />
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}
