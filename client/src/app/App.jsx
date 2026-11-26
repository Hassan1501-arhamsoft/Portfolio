import { lazy, Suspense } from 'react';
import { Navbar } from '../features/navigation/components/Navbar';
import { HeroSection } from '../features/hero/components/HeroSection';
import { WallCrackIntro } from '../shared/components/WallCrackIntro';

const CustomCursor = lazy(() =>
  import('../shared/components/CustomCursor').then((m) => ({
    default: m.CustomCursor,
  }))
);

const SkillsSection = lazy(() =>
  import('../features/skills/components/SkillsSection').then((m) => ({
    default: m.SkillsSection,
  }))
);
const ServicesSection = lazy(() =>
  import('../features/services/components/ServicesSection').then((m) => ({
    default: m.ServicesSection,
  }))
);
const ExperienceSection = lazy(() =>
  import('../features/experience/components/ExperienceSection').then((m) => ({
    default: m.ExperienceSection,
  }))
);
const ProjectsSection = lazy(() =>
  import('../features/projects/components/ProjectsSection').then((m) => ({
    default: m.ProjectsSection,
  }))
);
const AchievementsSection = lazy(() =>
  import('../features/achievements/components/AchievementsSection').then((m) => ({
    default: m.AchievementsSection,
  }))
);
const ContactSection = lazy(() =>
  import('../features/contact/components/ContactSection').then((m) => ({
    default: m.ContactSection,
  }))
);
const Footer = lazy(() =>
  import('../features/contact/components/Footer').then((m) => ({
    default: m.Footer,
  }))
);

export default function App() {
  return (
    <div className="min-h-screen bg-[#060708] text-slate-100">
      {/* Change to playOncePerSession={false} if you want it on every refresh */}
      <WallCrackIntro playOncePerSession={false} />
      <Navbar />
      <main>
        <HeroSection />
        <Suspense fallback={<div className="min-h-screen bg-[#060708]" />}>
          <SkillsSection />
          <ServicesSection />
          <ExperienceSection />
          <ProjectsSection />
          <AchievementsSection />
          <ContactSection />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <CustomCursor hideNativeCursor={true} />
        <Footer />
      </Suspense>
    </div>
  );
}