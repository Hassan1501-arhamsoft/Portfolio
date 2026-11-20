import { Navbar } from '../features/navigation/components/Navbar';
import { HeroSection } from '../features/hero/components/HeroSection';
import { SkillsSection } from '../features/skills/components/SkillsSection';
import { ServicesSection } from '../features/services/components/ServicesSection';
import { ExperienceSection } from '../features/experience/components/ExperienceSection';
import { ProjectsSection } from '../features/projects/components/ProjectsSection';
import { ContactSection } from '../features/contact/components/ContactSection';
import { Footer } from '../features/contact/components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-[#060708] text-slate-100">
      <Navbar />

      <main>
        <HeroSection />
        <SkillsSection />
        <ServicesSection />
        <ExperienceSection />
        <ProjectsSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}