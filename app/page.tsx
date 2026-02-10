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
      <footer className="py-8 border-t border-stone-800">
        <div className="container mx-auto px-4 text-center">
          <p className="text-stone-500 text-sm">
            © {new Date().getFullYear()} {profile?.name || 'Portfolio'}. All rights reserved.
          </p>
          <p className="text-stone-600 text-xs mt-2">
            Built with Next.js, TypeScript, and MongoDB
          </p>
        </div>
      </footer>
    </main>
  );
}
