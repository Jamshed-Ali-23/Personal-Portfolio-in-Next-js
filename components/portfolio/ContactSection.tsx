'use client';

import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Download, MapPin, Clock, ArrowRight, Send } from 'lucide-react';
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
  delay,
}: {
  icon: React.ElementType;
  title: string;
  value: string;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    whileHover={{ scale: 1.02 }}
  >
    <Card className="bg-stone-800/50 border-stone-700/50">
      <CardContent className="p-4 flex items-center gap-4">
        <div className="p-3 bg-amber-500/20 rounded-lg">
          <Icon className="w-5 h-5 text-amber-400" />
        </div>
        <div>
          <p className="text-sm text-stone-400">{title}</p>
          <p className="text-white font-medium">{value}</p>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

// Social Link
const SocialLink = ({
  href,
  icon: Icon,
  label,
  color,
  delay,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
  color: string;
  delay: number;
}) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay }}
    whileHover={{ scale: 1.05, y: -5 }}
    className={`flex items-center gap-3 p-4 bg-stone-800/50 border border-stone-700/50 rounded-xl hover:${color} hover:border-current transition-colors`}
  >
    <Icon className="w-6 h-6" />
    <span className="font-medium">{label}</span>
    <ArrowRight className="w-4 h-4 ml-auto" />
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
      <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />

      {/* Decorative Elements */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-amber-500/10 text-amber-400 border-amber-500/30">
              Get In Touch
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Let&apos;s Work
              <span className="block bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Together
              </span>
            </h2>
            <p className="text-stone-400 max-w-2xl mx-auto">
              I&apos;m currently open to new opportunities and collaborations. Whether you have a project in
              mind or just want to chat, feel free to reach out!
            </p>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <InfoCard icon={Send} title="Quick Response" value="Within 24 hours" delay={0.1} />
            <InfoCard
              icon={MapPin}
              title="Location"
              value={profile?.location || 'Islamabad, Pakistan'}
              delay={0.2}
            />
            <InfoCard icon={Clock} title="Availability" value="Open to Work" delay={0.3} />
          </div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4 mb-12"
          >
            <SocialLink
              href={`mailto:${email}`}
              icon={Mail}
              label={email}
              color="text-amber-400"
              delay={0.1}
            />
            <SocialLink
              href={github}
              icon={Github}
              label="GitHub Profile"
              color="text-white"
              delay={0.2}
            />
            <SocialLink
              href={linkedin}
              icon={Linkedin}
              label="LinkedIn Profile"
              color="text-blue-400"
              delay={0.3}
            />
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              size="lg"
              onClick={handleEmailClick}
              className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold px-8"
            >
              <Mail className="w-5 h-5 mr-2" />
              Send Email
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={handleDownloadCV}
              className="w-full sm:w-auto border-amber-500/50 text-amber-400 hover:bg-amber-500/10"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Resume
            </Button>
          </motion.div>

          {/* Closing Message */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center mt-16 pt-16 border-t border-stone-800"
          >
            <p className="text-stone-400">
              Thanks for visiting my portfolio! Let&apos;s create something amazing together.
            </p>
            <div className="mt-6 flex items-center justify-center gap-4 text-2xl">
              <span>🚀</span>
              <span>💻</span>
              <span>📊</span>
              <span>🎯</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
