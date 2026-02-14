import { Suspense } from 'react';
import Navigation from '@/components/portfolio/Navigation';
import HeroSection from '@/components/portfolio/HeroSection';
import AboutSection from '@/components/portfolio/AboutSection';
import ProjectsSection from '@/components/portfolio/ProjectsSection';
import SkillsSection from '@/components/portfolio/SkillsSection';
import CertificatesSection from '@/components/portfolio/CertificatesSection';
import ContactSection from '@/components/portfolio/ContactSection';
import ThreeBackground from '@/components/portfolio/ThreeBackground';
import connectDB from '@/lib/mongodb';
import Profile from '@/models/Profile';
import Project from '@/models/Project';
import SkillCategory from '@/models/SkillCategory';
import Certificate from '@/models/Certificate';
import Experience from '@/models/Experience';

// Force dynamic rendering - this page needs MongoDB data at request time
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Fetch all portfolio data
async function getPortfolioData() {
  try {
    const db = await connectDB();
    if (!db) {
      console.warn('⚠ No database connection - using empty data');
      return {
        profile: null,
        projects: [],
        skillCategories: [],
        certificates: [],
        experiences: [],
      };
    }

    const [profile, projects, skillCategories, certificates, experiences] = await Promise.all([
      Profile.findOne().lean(),
      Project.find({ isVisible: true }).sort({ order: 1, createdAt: -1 }).lean(),
      SkillCategory.find({ isVisible: true }).sort({ order: 1, createdAt: -1 }).lean(),
      Certificate.find({ isVisible: true }).sort({ order: 1, createdAt: -1 }).lean(),
      Experience.find({ isVisible: true }).sort({ order: 1, startDate: -1 }).lean(),
    ]);

    return {
      profile: profile ? JSON.parse(JSON.stringify(profile)) : null,
      projects: JSON.parse(JSON.stringify(projects)),
      skillCategories: JSON.parse(JSON.stringify(skillCategories)),
      certificates: JSON.parse(JSON.stringify(certificates)),
      experiences: JSON.parse(JSON.stringify(experiences)),
    };
  } catch (error) {
    console.error('Error fetching portfolio data:', error);
    return {
      profile: null,
      projects: [],
      skillCategories: [],
      certificates: [],
      experiences: [],
    };
  }
}

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-950">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-amber-500/30 border-t-amber-500 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-stone-400">Loading portfolio...</p>
      </div>
    </div>
  );
}

export default async function Home() {
  const { profile, projects, skillCategories, certificates, experiences } = await getPortfolioData();

  return (
    <main className="min-h-screen bg-stone-950 text-stone-100 overflow-x-hidden">
      <ThreeBackground />
      <Navigation />
      
      <Suspense fallback={<LoadingFallback />}>
        <HeroSection profile={profile} />
        <AboutSection profile={profile} experiences={experiences} />
        <ProjectsSection projects={projects} />
        <SkillsSection skillCategories={skillCategories} />
        <CertificatesSection certificates={certificates} />
        <ContactSection profile={profile} />
      </Suspense>

      {/* Footer */}
      <footer className="relative py-10 border-t border-stone-800/50">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-stone-700/50 to-transparent" />
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                <span className="text-[10px] font-bold text-white">JA</span>
              </div>
              <span className="text-stone-400 text-sm font-medium">
                © {new Date().getFullYear()} {profile?.name || 'Portfolio'}
              </span>
            </div>
            <p className="text-stone-600 text-xs">
              Crafted with Next.js, React, TypeScript &amp; MongoDB
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
