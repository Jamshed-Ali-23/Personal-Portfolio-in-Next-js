'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ExternalLink, Calendar, CheckCircle2, Sparkles, ShieldCheck, FileText, Download, X, Eye } from 'lucide-react';
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
  certificateFile?: string;
  skills?: string[];
  color?: string;
}

// Color variants for certificates
const colorVariants: { [key: string]: { bg: string; border: string; text: string; icon: string; glow: string; barGradient: string } } = {
  amber: {
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    text: 'text-amber-400',
    icon: 'text-amber-400',
    glow: 'hover:shadow-amber-500/5',
    barGradient: 'from-amber-500 to-orange-500',
  },
  blue: {
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
    text: 'text-blue-400',
    icon: 'text-blue-400',
    glow: 'hover:shadow-blue-500/5',
    barGradient: 'from-blue-500 to-cyan-500',
  },
  green: {
    bg: 'bg-green-500/10',
    border: 'border-green-500/30',
    text: 'text-green-400',
    icon: 'text-green-400',
    glow: 'hover:shadow-green-500/5',
    barGradient: 'from-green-500 to-emerald-500',
  },
  purple: {
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/30',
    text: 'text-purple-400',
    icon: 'text-purple-400',
    glow: 'hover:shadow-purple-500/5',
    barGradient: 'from-purple-500 to-violet-500',
  },
  rose: {
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/30',
    text: 'text-rose-400',
    icon: 'text-rose-400',
    glow: 'hover:shadow-rose-500/5',
    barGradient: 'from-rose-500 to-pink-500',
  },
  cyan: {
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/30',
    text: 'text-cyan-400',
    icon: 'text-cyan-400',
    glow: 'hover:shadow-cyan-500/5',
    barGradient: 'from-cyan-500 to-teal-500',
  },
};

// Certificate Card
const CertificateCard = ({
  certificate,
  index,
  onViewCertificate,
}: {
  certificate: Certificate;
  index: number;
  onViewCertificate: (cert: Certificate) => void;
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
      transition={{ delay: index * 0.08, duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <Card
        className={`bg-stone-900/40 border-stone-800/60 hover:border-stone-700/60 transition-all duration-300 h-full group hover:shadow-xl ${colors.glow} overflow-hidden`}
      >
        {/* Top colored accent bar */}
        <div className={`h-1 bg-gradient-to-r ${colors.barGradient} opacity-60 group-hover:opacity-100 transition-opacity`} />

        <CardContent className="p-6">
          {/* Header */}
          <div className="flex items-start gap-4 mb-4">
            <div className={`p-3 rounded-xl ${colors.bg} group-hover:scale-110 transition-transform duration-300`}>
              <Award className={`w-6 h-6 ${colors.icon}`} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-semibold text-white leading-tight group-hover:text-stone-100 transition-colors">{certificate.title}</h3>
              <p className={`text-sm ${colors.text} font-medium mt-0.5`}>{certificate.platform}</p>
            </div>
          </div>

          {/* Date */}
          <div className="flex items-center gap-2 text-stone-500 text-xs mb-4">
            <Calendar className="w-3.5 h-3.5" />
            <span>Issued {formatDate(certificate.issueDate)}</span>
          </div>

          {/* Skills */}
          {certificate.skills && certificate.skills.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {certificate.skills.slice(0, 3).map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="bg-stone-800/60 text-stone-300 border-stone-700/50 text-[10px] font-medium px-2 py-0.5"
                >
                  {skill}
                </Badge>
              ))}
              {certificate.skills.length > 3 && (
                <Badge
                  variant="secondary"
                  className="bg-stone-800/40 text-stone-500 border-stone-700/50 text-[10px] font-medium px-2 py-0.5"
                >
                  +{certificate.skills.length - 3}
                </Badge>
              )}
            </div>
          )}

          {/* Credential ID */}
          {certificate.credentialId && (
            <div className="flex items-center gap-2 text-stone-600 text-[11px] mb-4 font-mono">
              <CheckCircle2 className="w-3 h-3 text-green-500" />
              <span className="truncate">ID: {certificate.credentialId}</span>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col gap-2 mt-1">
            {certificate.certificateFile && (
              <Button
                onClick={() => onViewCertificate(certificate)}
                variant="outline"
                size="sm"
                className={`w-full border-stone-800/80 ${colors.text} hover:text-white hover:bg-stone-800/50 hover:border-stone-700 transition-all text-xs`}
              >
                <Eye className="w-3.5 h-3.5 mr-2" />
                View Certificate
                <FileText className="w-3 h-3 ml-auto" />
              </Button>
            )}
            {certificate.credentialUrl && (
              <Button
                asChild
                variant="outline"
                size="sm"
                className="w-full border-stone-800/80 text-stone-400 hover:text-white hover:bg-stone-800/50 hover:border-stone-700 transition-all text-xs"
              >
                <a href={certificate.credentialUrl} target="_blank" rel="noopener noreferrer">
                  <ShieldCheck className="w-3.5 h-3.5 mr-2" />
                  Verify Credential
                  <ExternalLink className="w-3 h-3 ml-auto" />
                </a>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

interface CertificatesSectionProps {
  certificates: Certificate[];
}

export default function CertificatesSection({ certificates }: CertificatesSectionProps) {
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);

  return (
    <section id="certificates" className="py-20 sm:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-stone-950" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
      <div className="absolute top-1/3 -right-40 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl" />

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
              <Award className="w-3.5 h-3.5 mr-1.5 inline-block" />
              Certifications
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Professional
              <span className="block bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Credentials
              </span>
            </h2>
            <p className="text-stone-400 max-w-2xl mx-auto leading-relaxed">
              Industry-recognized certifications demonstrating expertise in data science, cloud
              computing, and software development.
            </p>
          </div>

          {/* Certificates Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {certificates.map((certificate, index) => (
              <CertificateCard
                key={certificate._id}
                certificate={certificate}
                index={index}
                onViewCertificate={setSelectedCertificate}
              />
            ))}
          </div>

          {/* Summary Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 p-4 sm:p-6 bg-stone-900/30 border border-stone-800/50 rounded-2xl">
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-400">{certificates.length}</div>
                <div className="text-xs text-stone-500 font-medium mt-0.5">Total Certifications</div>
              </div>
              <div className="hidden sm:block w-px h-10 bg-stone-800" />
              <div className="w-12 h-px sm:hidden bg-stone-800" />
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">
                  {new Set(certificates.map((c) => c.platform)).size}
                </div>
                <div className="text-xs text-stone-500 font-medium mt-0.5">Learning Platforms</div>
              </div>
              <div className="hidden sm:block w-px h-10 bg-stone-800" />
              <div className="w-12 h-px sm:hidden bg-stone-800" />
              <div className="text-center flex flex-col items-center">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xl font-bold text-blue-400">Active</span>
                </div>
                <div className="text-xs text-stone-500 font-medium mt-0.5">Credential Status</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Certificate Preview Modal */}
      <AnimatePresence>
        {selectedCertificate && selectedCertificate.certificateFile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-sm"
            onClick={() => setSelectedCertificate(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-stone-950 border border-stone-800 rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 sm:p-5 border-b border-stone-800/60 bg-stone-900/50">
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`p-2 rounded-lg ${colorVariants[selectedCertificate.color || 'amber']?.bg || 'bg-amber-500/10'}`}>
                    <Award className={`w-5 h-5 ${colorVariants[selectedCertificate.color || 'amber']?.icon || 'text-amber-400'}`} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm sm:text-base font-semibold text-white truncate">{selectedCertificate.title}</h3>
                    <p className="text-xs text-stone-400">{selectedCertificate.platform}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-3 flex-shrink-0">
                  <a
                    href={selectedCertificate.certificateFile}
                    download
                    className="p-2 rounded-lg bg-stone-800/50 text-stone-400 hover:text-amber-400 hover:bg-stone-800 transition-colors"
                    title="Download Certificate"
                  >
                    <Download className="w-4 h-4" />
                  </a>
                  <a
                    href={selectedCertificate.certificateFile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-stone-800/50 text-stone-400 hover:text-amber-400 hover:bg-stone-800 transition-colors"
                    title="Open in New Tab"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => setSelectedCertificate(null)}
                    className="p-2 rounded-lg bg-stone-800/50 text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
                    title="Close"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* PDF Viewer */}
              <div className="w-full h-[70vh] sm:h-[75vh] bg-stone-900">
                <iframe
                  src={`${selectedCertificate.certificateFile}#toolbar=1&navpanes=0`}
                  className="w-full h-full border-0"
                  title={`${selectedCertificate.title} Certificate`}
                />
              </div>

              {/* Mobile Fallback - Download Button */}
              <div className="sm:hidden p-4 border-t border-stone-800/60 bg-stone-900/50">
                <p className="text-xs text-stone-500 text-center mb-3">
                  If the PDF doesn&apos;t display, use the button below
                </p>
                <a
                  href={selectedCertificate.certificateFile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-lg text-sm font-medium hover:bg-amber-500/20 transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  Open Certificate PDF
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
