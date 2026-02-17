'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ChevronDown, ArrowRight, Download, Github, Linkedin, Mail, Database, BarChart3, Brain, Code2, Sparkles } from 'lucide-react';

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
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#d9731508_1px,transparent_1px),linear-gradient(to_bottom,#d9731508_1px,transparent_1px)] bg-[size:80px_80px]" />
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

// Tech Badge
const TechBadge = ({ icon: Icon, label, delay }: { icon: React.ElementType; label: string; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    whileHover={{ scale: 1.05, y: -3 }}
    className="flex items-center gap-2 px-4 py-2 bg-stone-800/40 border border-stone-700/40 rounded-full backdrop-blur-sm hover:border-amber-500/30 hover:bg-stone-800/60 transition-all duration-300"
  >
    <Icon className="w-4 h-4 text-amber-400" />
    <span className="text-sm text-stone-300 font-medium">{label}</span>
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

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-stone-950"
    >
      {/* Background Effects */}
      <GridBackground />
      <FloatingOrb className="w-[600px] h-[600px] bg-amber-500/15 top-[-200px] left-[-200px]" delay={0} />
      <FloatingOrb className="w-[400px] h-[400px] bg-orange-500/10 bottom-[-150px] right-[-150px]" delay={2} />
      <FloatingOrb className="w-[250px] h-[250px] bg-rose-500/8 top-[40%] right-[10%]" delay={4} />

      {/* Main Content */}
      <motion.div
        className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 relative z-10"
        style={{ y, opacity }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-20 items-center max-w-7xl mx-auto">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-5 sm:space-y-7 text-center lg:text-left"
          >
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 bg-gradient-to-r from-amber-500/10 to-orange-500/5 border border-amber-500/20 rounded-full"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-sm text-amber-300/90 font-medium">Available for opportunities</span>
            </motion.div>

            {/* Name & Title */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1]"
              >
                <span className="text-white">Hi, I&apos;m </span>
                <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-500 bg-clip-text text-transparent">
                  {name}
                </span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-base sm:text-xl md:text-2xl lg:text-3xl text-stone-300 h-8 sm:h-10 overflow-hidden"
              >
                {text}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="inline-block w-[3px] h-7 sm:h-8 bg-amber-400 ml-1 align-middle"
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
              <span className="text-amber-400 font-medium"> Machine Learning</span> — with a frontend edge in
              <span className="text-amber-400 font-medium"> React &amp; Next.js</span> for building interactive dashboards and web apps.
            </motion.p>

            {/* Tech Stack */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-2 sm:gap-2.5 justify-center lg:justify-start"
            >
              <TechBadge icon={Database} label="SQL & Python" delay={0.8} />
              <TechBadge icon={BarChart3} label="Power BI" delay={0.9} />
              <TechBadge icon={Brain} label="Machine Learning" delay={1.0} />
              <TechBadge icon={Code2} label="React & Next.js" delay={1.1} />
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col xs:flex-row flex-wrap gap-3 sm:gap-4 pt-2"
            >
              <Button
                size="lg"
                onClick={() => scrollToSection('projects')}
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold px-8 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-all"
              >
                <Sparkles className="mr-2 w-4 h-4" />
                View Projects
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-stone-700 text-stone-300 hover:text-amber-400 hover:border-amber-500/50 hover:bg-amber-500/5 transition-all"
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
              className="flex gap-3 pt-2 justify-center sm:justify-start"
            >
              {profile?.socialLinks?.github && (
                <a
                  href={profile.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-stone-800/40 border border-stone-700/40 text-stone-400 hover:text-white hover:border-stone-600 hover:bg-stone-800/70 transition-all duration-300"
                >
                  <Github className="w-5 h-5" />
                </a>
              )}
              {profile?.socialLinks?.linkedin && (
                <a
                  href={profile.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-stone-800/40 border border-stone-700/40 text-stone-400 hover:text-blue-400 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all duration-300"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
              {profile?.socialLinks?.email && (
                <a
                  href={`mailto:${profile.socialLinks.email}`}
                  className="p-2.5 rounded-xl bg-stone-800/40 border border-stone-700/40 text-stone-400 hover:text-amber-400 hover:border-amber-500/30 hover:bg-amber-500/5 transition-all duration-300"
                >
                  <Mail className="w-5 h-5" />
                </a>
              )}
            </motion.div>
          </motion.div>

          {/* Right Content — Profile Image + Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
            className="relative flex flex-col items-center order-first lg:order-last"
          >
            {/* Profile Image */}
            <motion.div
              className="relative mb-6 sm:mb-8 lg:mb-12"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full blur-3xl opacity-20 scale-125" />

              {/* Ring decoration */}
              <div className="absolute -inset-3 rounded-full border border-amber-500/10 animate-[spin_20s_linear_infinite]">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-amber-500/40 rounded-full" />
              </div>

              {/* Image Container */}
              <div className="relative w-40 h-40 xs:w-48 xs:h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80 rounded-full overflow-hidden border-2 border-stone-800/80 shadow-2xl shadow-amber-500/10 ring-1 ring-amber-500/10 ring-offset-4 ring-offset-stone-950">
                <Image
                  src="/images/profile.jpg"
                  alt={name}
                  fill
                  className="object-cover object-center scale-110"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/50 via-transparent to-transparent" />
              </div>

            </motion.div>
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
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-stone-500 hover:text-amber-400 transition-colors"
          >
            <span className="text-xs font-medium tracking-wider uppercase">Scroll</span>
            <ChevronDown className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}
