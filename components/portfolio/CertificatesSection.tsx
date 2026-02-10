'use client';

import { motion } from 'framer-motion';
import { Award, ExternalLink, Calendar, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Certificate {
  _id: string;
  title: string;
  platform: string;
  issueDate: string;
  credentialId?: string;
  credentialUrl?: string;
  skills?: string[];
  color?: string;
}

// Color variants for certificates
const colorVariants: { [key: string]: { bg: string; border: string; text: string; icon: string } } = {
  amber: {
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    text: 'text-amber-400',
    icon: 'text-amber-400',
  },
  blue: {
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
    text: 'text-blue-400',
    icon: 'text-blue-400',
  },
  green: {
    bg: 'bg-green-500/10',
    border: 'border-green-500/30',
    text: 'text-green-400',
    icon: 'text-green-400',
  },
  purple: {
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/30',
    text: 'text-purple-400',
    icon: 'text-purple-400',
  },
  rose: {
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/30',
    text: 'text-rose-400',
    icon: 'text-rose-400',
  },
  cyan: {
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/30',
    text: 'text-cyan-400',
    icon: 'text-cyan-400',
  },
};

// Certificate Card
const CertificateCard = ({
  certificate,
  index,
}: {
  certificate: Certificate;
  index: number;
}) => {
  const colors = colorVariants[certificate.color || 'amber'] || colorVariants.amber;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <Card
        className={`bg-stone-900/50 border-stone-800 hover:${colors.border} transition-all duration-300 h-full group`}
      >
        <CardContent className="p-6">
          {/* Header */}
          <div className="flex items-start gap-4 mb-4">
            <div className={`p-3 rounded-xl ${colors.bg} group-hover:scale-110 transition-transform`}>
              <Award className={`w-6 h-6 ${colors.icon}`} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-white truncate">{certificate.title}</h3>
              <p className={`text-sm ${colors.text}`}>{certificate.platform}</p>
            </div>
          </div>

          {/* Date */}
          <div className="flex items-center gap-2 text-stone-400 text-sm mb-4">
            <Calendar className="w-4 h-4" />
            <span>Issued {formatDate(certificate.issueDate)}</span>
          </div>

          {/* Skills */}
          {certificate.skills && certificate.skills.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {certificate.skills.slice(0, 3).map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="bg-stone-800/80 text-stone-300 border-stone-700/50 text-xs"
                >
                  {skill}
                </Badge>
              ))}
              {certificate.skills.length > 3 && (
                <Badge
                  variant="secondary"
                  className="bg-stone-800/80 text-stone-400 border-stone-700/50 text-xs"
                >
                  +{certificate.skills.length - 3}
                </Badge>
              )}
            </div>
          )}

          {/* Credential ID */}
          {certificate.credentialId && (
            <div className="flex items-center gap-2 text-stone-500 text-xs mb-4">
              <CheckCircle2 className="w-3 h-3 text-green-400" />
              <span className="truncate">ID: {certificate.credentialId}</span>
            </div>
          )}

          {/* Action */}
          {certificate.credentialUrl && (
            <Button
              asChild
              variant="outline"
              size="sm"
              className={`w-full mt-2 border-stone-700 hover:${colors.border} hover:${colors.text}`}
            >
              <a href={certificate.credentialUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                Verify Credential
              </a>
            </Button>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

interface CertificatesSectionProps {
  certificates: Certificate[];
}

export default function CertificatesSection({ certificates }: CertificatesSectionProps) {
  return (
    <section id="certificates" className="py-20 sm:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-stone-950" />
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
              Certifications
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Professional
              <span className="block bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Credentials
              </span>
            </h2>
            <p className="text-stone-400 max-w-2xl mx-auto">
              Industry-recognized certifications demonstrating expertise in data science, cloud
              computing, and software development.
            </p>
          </div>

          {/* Certificates Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((certificate, index) => (
              <CertificateCard key={certificate._id} certificate={certificate} index={index} />
            ))}
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <div className="inline-flex items-center gap-8 p-6 bg-stone-900/50 border border-stone-800 rounded-2xl">
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-400">{certificates.length}</div>
                <div className="text-sm text-stone-400">Certifications</div>
              </div>
              <div className="w-px h-12 bg-stone-700" />
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">
                  {new Set(certificates.map((c) => c.platform)).size}
                </div>
                <div className="text-sm text-stone-400">Platforms</div>
              </div>
              <div className="w-px h-12 bg-stone-700" />
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">Active</div>
                <div className="text-sm text-stone-400">Status</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
