'use client';

import { motion } from 'framer-motion';
import {
  Mail,
  Github,
  Linkedin,
  Download,
  MapPin,
  Clock,
  ArrowUpRight,
  Send,
  Sparkles,
  MessageSquare,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface Profile {
  name: string;
  title: string;
  bio: string;
  email: string;
  location?: string;
  socialLinks: {
    github: string;
    linkedin: string;
    email: string;
  };
}

// Info Card
const InfoCard = ({
  icon: Icon,
  title,
  value,
  accent,
  delay,
}: {
  icon: React.ElementType;
  title: string;
  value: string;
  accent: string;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    whileHover={{ y: -4 }}
  >
    <Card className="bg-stone-900/40 border-stone-800/60 hover:border-stone-700/60 transition-all duration-300 group hover:shadow-lg">
      <CardContent className="p-5 flex items-center gap-4">
        <div className={`p-3 rounded-xl ${accent} group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="min-w-0">
          <p className="text-xs text-stone-500 font-medium uppercase tracking-wider">{title}</p>
          <p className="text-white font-semibold mt-0.5 truncate">{value}</p>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

// Social Link Card
const SocialCard = ({
  href,
  icon: Icon,
  label,
  subtitle,
  hoverBorder,
  hoverText,
  iconBg,
  delay,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
  subtitle: string;
  hoverBorder: string;
  hoverText: string;
  iconBg: string;
  delay: number;
}) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    whileHover={{ y: -4, scale: 1.01 }}
    className={`group flex items-center gap-4 p-5 bg-stone-900/40 border border-stone-800/60 rounded-2xl ${hoverBorder} transition-all duration-300 hover:shadow-lg`}
  >
    <div className={`p-3 rounded-xl ${iconBg} group-hover:scale-110 transition-transform duration-300`}>
      <Icon className="w-5 h-5" />
    </div>
    <div className="flex-1 min-w-0">
      <p className={`font-semibold text-white ${hoverText} transition-colors`}>{label}</p>
      <p className="text-xs text-stone-500 mt-0.5 truncate">{subtitle}</p>
    </div>
    <ArrowUpRight className="w-4 h-4 text-stone-600 group-hover:text-stone-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
  </motion.a>
);

interface ContactSectionProps {
  profile: Profile | null;
}

export default function ContactSection({ profile }: ContactSectionProps) {
  const email = profile?.socialLinks?.email || profile?.email || 'jamshedsaiin@gmail.com';
  const github = profile?.socialLinks?.github || 'https://github.com/Jamshed-Ali-23';
  const linkedin = profile?.socialLinks?.linkedin || 'https://linkedin.com/in/jamshedali23';

  const handleEmailClick = () => {
    window.location.href = `mailto:${email}?subject=Portfolio Inquiry&body=Hi ${profile?.name || 'Jamshed'},`;
  };

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/Resume/Jamshed_Ali_Resume.pdf';
    link.download = 'Jamshed_Ali_Resume.pdf';
    link.click();
  };

  return (
    <section id="contact" className="py-20 sm:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-stone-900/50 to-stone-950" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />

      {/* Decorative blur orbs */}
      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-amber-500/8 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-orange-500/8 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          {/* Section Header */}
          <div className="text-center mb-14">
            <Badge className="mb-4 bg-amber-500/10 text-amber-400 border-amber-500/30 px-4 py-1.5 text-sm font-medium">
              <MessageSquare className="w-3.5 h-3.5 mr-1.5 inline-block" />
              Get In Touch
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Let&apos;s Work
              <span className="block bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Together
              </span>
            </h2>
            <p className="text-stone-400 max-w-2xl mx-auto leading-relaxed">
              I&apos;m currently open to new opportunities and collaborations. Whether you have a
              project in mind or just want to connect, feel free to reach out!
            </p>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-12">
            <InfoCard
              icon={Send}
              title="Response Time"
              value="Within 24 hours"
              accent="bg-amber-500/15 text-amber-400"
              delay={0.1}
            />
            <InfoCard
              icon={MapPin}
              title="Location"
              value={profile?.location || 'Islamabad, Pakistan'}
              accent="bg-blue-500/15 text-blue-400"
              delay={0.15}
            />
            <InfoCard
              icon={Clock}
              title="Status"
              value="Open to Work"
              accent="bg-green-500/15 text-green-400"
              delay={0.2}
            />
          </div>

          {/* Social Link Cards */}
          <div className="space-y-3 mb-10">
            <SocialCard
              href={`mailto:${email}`}
              icon={Mail}
              label="Send an Email"
              subtitle={email}
              hoverBorder="hover:border-amber-500/40"
              hoverText="group-hover:text-amber-400"
              iconBg="bg-amber-500/15 text-amber-400"
              delay={0.1}
            />
            <SocialCard
              href={github}
              icon={Github}
              label="GitHub Profile"
              subtitle="Check out my repositories & open source contributions"
              hoverBorder="hover:border-stone-500/60"
              hoverText="group-hover:text-white"
              iconBg="bg-stone-700/50 text-stone-300"
              delay={0.15}
            />
            <SocialCard
              href={linkedin}
              icon={Linkedin}
              label="LinkedIn Profile"
              subtitle="Let's connect professionally"
              hoverBorder="hover:border-blue-500/40"
              hoverText="group-hover:text-blue-400"
              iconBg="bg-blue-500/15 text-blue-400"
              delay={0.2}
            />
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              size="lg"
              onClick={handleEmailClick}
              className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold px-8 rounded-xl shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-all"
            >
              <Mail className="w-5 h-5 mr-2" />
              Send Email
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={handleDownloadCV}
              className="w-full sm:w-auto border-stone-700 text-stone-300 hover:text-white hover:bg-stone-800/50 hover:border-stone-600 rounded-xl transition-all"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Resume
            </Button>
          </motion.div>

          {/* Closing */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center mt-16 pt-12 border-t border-stone-800/50"
          >
            <div className="inline-flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-sm text-amber-400 font-medium">Open for Opportunities</span>
            </div>
            <p className="text-stone-500 text-sm">
              Thanks for visiting my portfolio! Let&apos;s create something amazing together.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
