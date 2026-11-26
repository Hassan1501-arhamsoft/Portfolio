import { useMemo, useState } from 'react';
import { SectionHeader } from '../../../shared/components/SectionHeader';
import { ParticleCanvas } from '../../../shared/components/ParticleCanvas';
import {
  ACHIEVEMENT_CATEGORIES,
  ACHIEVEMENTS_DATA,
} from '../data/achievements.data';
import {
  AchievementCard,
  AchievementSpiderNestModal,
} from './AchievementCard';
import { AchievementFilter } from './AchievementFilter';

export function AchievementsSection() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedIndex, setSelectedIndex] = useState(null);

  const categoryCounts = useMemo(() => {
    const counts = { All: ACHIEVEMENTS_DATA.length };
    ACHIEVEMENT_CATEGORIES.forEach((cat) => {
      if (cat !== 'All') {
        counts[cat] = ACHIEVEMENTS_DATA.filter(
          (item) => item.category === cat
        ).length;
      }
    });
    return counts;
  }, []);

  const filteredItems = useMemo(() => {
    if (activeCategory === 'All') return ACHIEVEMENTS_DATA;
    return ACHIEVEMENTS_DATA.filter(
      (item) => item.category === activeCategory
    );
  }, [activeCategory]);

  const handleSelectCategory = (category) => {
    if (category === activeCategory) return;
    setSelectedIndex(null);
    setActiveCategory(category);
  };

  return (
    <section
      id="achievements"
      className="relative overflow-hidden bg-[#060708] py-24 lg:py-32 border-b border-white/[0.06]"
    >
      {/* Ambient Constellation Layer */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-65 [mask-image:radial-gradient(ellipse_90%_80%_at_50%_45%,#000_55%,transparent_100%)]"
      >
        <ParticleCanvas linkDistance={140} mouseRadius={200} />
      </div>

      {/* Top Section Mint Specular Beam */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#47f59c]/35 to-transparent"
      />

      {/* Overhead Electric-Mint Studio Spotlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[50rem] h-[22rem] rounded-full bg-[radial-gradient(circle,rgba(71,245,156,0.09)_0%,rgba(16,185,129,0.03)_45%,transparent_72%)] blur-3xl"
      />

      {/* Radial-Masked Mint Micro-Dot Matrix */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(71,245,156,0.13)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_50%,#000_35%,transparent_100%)]"
      />

      <div className="relative z-10 max-w-6xl px-6 mx-auto">
        <SectionHeader
          eyebrow="Recognition & Credentials"
          title="Achievements & Certifications"
          subtitle="National academic merit honors and international technical certifications—click any pod to inspect visual proof."
        />

        {/* Liquid Glass Domain Filter Dock */}
        <AchievementFilter
          categories={ACHIEVEMENT_CATEGORIES}
          activeCategory={activeCategory}
          onSelectCategory={handleSelectCategory}
          counts={categoryCounts}
        />

        {/* Chamfered Octagonal Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
          {filteredItems.map((item, index) => (
            <AchievementCard
              key={item.id}
              item={item}
              index={index}
              isActive={selectedIndex === index}
              onSelect={(_, idx) => setSelectedIndex(idx)}
            />
          ))}
        </div>
      </div>

      {/* Expanded Proof + Competency Spider-Nest Modal */}
      <AchievementSpiderNestModal
        items={filteredItems}
        activeIndex={selectedIndex}
        onClose={() => setSelectedIndex(null)}
        onSelectIndex={setSelectedIndex}
      />
    </section>
  );
}