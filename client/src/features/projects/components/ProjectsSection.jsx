import { useEffect, useMemo, useRef, useState } from 'react';
import { FolderGit2, Layers } from 'lucide-react';
import { SectionHeader } from '../../../shared/components/SectionHeader';
import { PROJECTS, PROJECT_CATEGORIES } from '../data/projects.data';
import { ProjectCard, ProjectSpiderNestModal } from './ProjectCard';
import { ProjectFilter } from './ProjectFilter';
import { ParticleCanvas } from '../../../shared/components/ParticleCanvas';

export function ProjectsSection() {
  const stageRef = useRef(null);
  const cardWrapperRefs = useRef([]);
  const lineRefs = useRef([]);
  const hubNodeRefs = useRef([]);
  const pulseDotRefs = useRef([]);

  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const isPausedRef = useRef(false);
  useEffect(() => {
    isPausedRef.current = hoveredIndex !== null || selectedIndex !== null;
  }, [hoveredIndex, selectedIndex]);

  // Compute badge counts per category
  const categoryCounts = useMemo(() => {
    const counts = { All: PROJECTS.length };
    PROJECT_CATEGORIES.forEach((cat) => {
      if (cat !== 'All') {
        counts[cat] = PROJECTS.filter((p) => p.category === cat).length;
      }
    });
    return counts;
  }, []);

  // Active filtered project list
  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return PROJECTS;
    return PROJECTS.filter((project) => project.category === activeCategory);
  }, [activeCategory]);

  // Clear stale DOM refs whenever the filtered project list changes
  useEffect(() => {
    const len = filteredProjects.length;
    cardWrapperRefs.current.length = len;
    lineRefs.current.length = len;
    hubNodeRefs.current.length = len;
    pulseDotRefs.current.length = len;
  }, [filteredProjects]);

  // Dynamic unique tech count for the currently visible builds
  const visibleUniqueTechCount = useMemo(() => {
    const unique = new Set();
    filteredProjects.forEach((p) => p.stack?.forEach((t) => unique.add(t)));
    return unique.size;
  }, [filteredProjects]);

  const handleSelectCategory = (category) => {
    if (category === activeCategory) return;
    setSelectedIndex(null);
    setHoveredIndex(null);
    setActiveCategory(category);
  };

  // Smooth Orbital Engine: adapts radii & stagger to build count and viewport size
  useEffect(() => {
    const stageEl = stageRef.current;
    if (!stageEl) return;

    const count = filteredProjects.length;
    if (count === 0) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let rafId = null;
    let isInViewport = true;
    const baseSpeed = prefersReducedMotion || count === 1 ? 0 : -0.13;
    let angleOffset = count === 1 ? 0 : -Math.PI / 6;
    let currentSpeed = baseSpeed;
    let lastTime = performance.now();

    const positionOrbit = (timeMs) => {
      const rect = stageEl.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      if (width === 0 || height === 0) return;

      const cx = width / 2;
      const cy = height / 2;

      const isLargeDesktop = width >= 1152;
      const maxRx =
        count === 1
          ? 275
          : count > 8
            ? isLargeDesktop
              ? 465
              : 415
            : count > 4
              ? isLargeDesktop
                ? 425
                : 380
              : 365;

      const maxRy =
        count === 1
          ? 220
          : count > 8
            ? isLargeDesktop
              ? 325
              : 295
            : count > 4
              ? isLargeDesktop
                ? 285
                : 255
              : 235;

      const rxFactor = count === 1 ? 0.28 : count > 8 ? 0.41 : count > 4 ? 0.39 : 0.35;
      const ryFactor = count > 8 ? 0.39 : count > 4 ? 0.36 : 0.33;

      const baseRx = Math.min(width * rxFactor, maxRx);
      const baseRy = Math.min(height * ryFactor, maxRy);
      const hubRadius = width >= 1024 ? 88 : 76;

      for (let i = 0; i < count; i++) {
        const theta = angleOffset + (i * Math.PI * 2) / count;
        const cos = Math.cos(theta);
        const sin = Math.sin(theta);

        // Subtle radial stagger on large orbits prevents adjacent cards from colliding
        const stagger = count > 7 && i % 2 === 1 ? 24 : 0;
        const rx = baseRx + stagger;
        const ry = baseRy + stagger * 0.72;

        const cardX = cx + cos * rx;
        const cardY = cy + sin * ry;

        const startX = cx + cos * hubRadius;
        const startY = cy + sin * hubRadius;

        const cardEl = cardWrapperRefs.current[i];
        if (cardEl) {
          cardEl.style.transform = `translate3d(${cardX.toFixed(1)}px, ${cardY.toFixed(
            1
          )}px, 0) translate(-50%, -50%)`;
        }

        const lineEl = lineRefs.current[i];
        if (lineEl) {
          lineEl.setAttribute('x1', startX.toFixed(1));
          lineEl.setAttribute('y1', startY.toFixed(1));
          lineEl.setAttribute('x2', cardX.toFixed(1));
          lineEl.setAttribute('y2', cardY.toFixed(1));
        }

        const hubNodeEl = hubNodeRefs.current[i];
        if (hubNodeEl) {
          hubNodeEl.setAttribute('cx', startX.toFixed(1));
          hubNodeEl.setAttribute('cy', startY.toFixed(1));
        }

        const pulseEl = pulseDotRefs.current[i];
        if (pulseEl) {
          const t = (timeMs * 0.00045 + i * 0.2) % 1;
          const px = startX + (cardX - startX) * t;
          const py = startY + (cardY - startY) * t;
          pulseEl.setAttribute('cx', px.toFixed(1));
          pulseEl.setAttribute('cy', py.toFixed(1));
        }
      }
    };

    const tick = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      if (isInViewport) {
        const targetSpeed = isPausedRef.current ? 0 : baseSpeed;
        currentSpeed += (targetSpeed - currentSpeed) * 0.08;
        angleOffset += currentSpeed * dt;
        positionOrbit(now);
      }

      rafId = window.requestAnimationFrame(tick);
    };

    const resizeObserver = new ResizeObserver(() => {
      positionOrbit(performance.now());
    });
    resizeObserver.observe(stageEl);

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isInViewport = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    visibilityObserver.observe(stageEl);

    positionOrbit(lastTime);
    rafId = window.requestAnimationFrame(tick);

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
    };
  }, [filteredProjects]);

  const hoveredProject =
    typeof hoveredIndex === 'number' ? filteredProjects[hoveredIndex] : null;

  const isDenseOrbit = filteredProjects.length > 4;
  const isLargeOrbit = filteredProjects.length > 8;

  return (
    <section
      id="projects"
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
          eyebrow="Shipped Systems"
          title="Production Showcase"
          subtitle="Filter by engineering domain or click any build to inspect its system architecture and technology spider-nest."
        />

        {/* Domain Filter Controls */}
        <ProjectFilter
          categories={PROJECT_CATEGORIES}
          activeCategory={activeCategory}
          onSelectCategory={handleSelectCategory}
          counts={categoryCounts}
        />

        {/* DESKTOP: Smooth Circular Orbit Stage with Connected Tether Lines */}
        <div
          ref={stageRef}
          className={`relative hidden lg:block w-full mx-auto transition-[height] duration-300 ${
            isLargeOrbit
              ? 'h-[56rem] xl:h-[60rem]'
              : isDenseOrbit
                ? 'h-[46rem] xl:h-[50rem]'
                : 'h-[36rem] xl:h-[40rem]'
          }`}
        >
          {/* Ambient Orbital Halo Rings */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[46rem] h-[32rem] xl:w-[54rem] xl:h-[36rem] rounded-full border border-dashed border-[#47f59c]/15"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[26rem] h-[18rem] xl:w-[32rem] xl:h-[22rem] rounded-full border border-white/[0.05]"
          />

          {/* Dynamic SVG Tether Lines Connecting Central Circle to Each Orbiting Project */}
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 w-full h-full z-10"
          >
            {filteredProjects.map((project, idx) => {
              const isHighlighted =
                hoveredIndex === idx || selectedIndex === idx;
              return (
                <g key={`tether-${project.id || project.title}`}>
                  <line
                    ref={(el) => {
                      lineRefs.current[idx] = el;
                    }}
                    stroke={
                      isHighlighted
                        ? '#47f59c'
                        : 'rgba(71, 245, 156, 0.32)'
                    }
                    strokeWidth={isHighlighted ? '2' : '1.25'}
                    strokeDasharray={isHighlighted ? 'none' : '4 4'}
                    className="transition-colors duration-300"
                  />

                  <circle
                    ref={(el) => {
                      pulseDotRefs.current[idx] = el;
                    }}
                    r={isHighlighted ? '3.2' : '2.2'}
                    fill="#47f59c"
                  />

                  <circle
                    ref={(el) => {
                      hubNodeRefs.current[idx] = el;
                    }}
                    r={isHighlighted ? '4.5' : '3.5'}
                    fill="#090d0b"
                    stroke="#47f59c"
                    strokeWidth="1.8"
                  />
                </g>
              );
            })}
          </svg>

          {/* Central Core Hub Circle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-36 h-36 xl:w-44 xl:h-44 rounded-full bg-[#0b0f0d]/95 backdrop-blur-2xl border border-[#47f59c]/45 shadow-[0_0_60px_-8px_rgba(71,245,156,0.35),inset_0_1px_1px_rgba(255,255,255,0.2)]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-2.5 rounded-full border border-dashed border-[#47f59c]/35 animate-[spin_26s_linear_infinite_reverse] motion-reduce:animate-none"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-2 rounded-full border border-white/[0.07]"
            />

            <div className="relative z-10 flex flex-col items-center text-center px-3">
              <div className="flex items-center justify-center w-9 h-9 mb-1.5 rounded-full bg-[#47f59c]/15 border border-[#47f59c]/40 text-[#47f59c] shadow-[0_0_18px_rgba(71,245,156,0.35)]">
                {hoveredProject ? (
                  <Layers className="w-4 h-4" />
                ) : (
                  <FolderGit2 className="w-4 h-4" />
                )}
              </div>

              {hoveredProject ? (
                <>
                  <span className="font-mono text-[10px] font-semibold tracking-wider uppercase text-[#47f59c]">
                    {hoveredProject.stack?.length || 0} Stack Nodes
                  </span>
                  <span className="text-xs font-semibold text-white line-clamp-1 mt-0.5">
                    {hoveredProject.title}
                  </span>
                  <span className="font-mono text-[9px] text-zinc-400 mt-0.5">
                    Click to inspect
                  </span>
                </>
              ) : (
                <>
                  <span className="text-lg xl:text-xl font-bold tracking-tight text-white leading-none">
                    {filteredProjects.length}{' '}
                    {filteredProjects.length === 1 ? 'Build' : 'Builds'}
                  </span>
                  <span className="font-mono text-[10px] font-medium tracking-[0.14em] uppercase text-[#47f59c] mt-1 line-clamp-1">
                    {activeCategory === 'All' ? 'Production' : activeCategory}
                  </span>
                  <span className="font-mono text-[9px] text-zinc-400 mt-0.5">
                    {visibleUniqueTechCount} Technologies
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Orbiting Chamfered Project Pods */}
          {filteredProjects.map((project, index) => (
            <div
              key={project.id || project.title}
              ref={(el) => {
                cardWrapperRefs.current[index] = el;
              }}
              className={`absolute top-0 left-0 z-30 will-change-transform ${
                isLargeOrbit
                  ? 'w-[12.5rem] xl:w-[13.75rem]'
                  : isDenseOrbit
                    ? 'w-[13.5rem] xl:w-[14.75rem]'
                    : 'w-[15rem] xl:w-[16.5rem]'
              }`}
            >
              <ProjectCard
                project={project}
                index={index}
                isActive={selectedIndex === index}
                onSelect={(_, idx) => setSelectedIndex(idx)}
                onHoverChange={setHoveredIndex}
              />
            </div>
          ))}
        </div>

        {/* MOBILE & TABLET VIEW (< lg): Clean Grid with Click-to-Inspect */}
        <div className="lg:hidden space-y-4">
          <div className="flex items-center justify-center gap-3 py-3 px-4 rounded-full bg-[#0b0f0d] border border-[#47f59c]/35 w-fit mx-auto">
            <span className="w-2 h-2 rounded-full bg-[#47f59c] animate-pulse" />
            <span className="font-mono text-xs text-zinc-200">
              {filteredProjects.length}{' '}
              {filteredProjects.length === 1 ? 'Build' : 'Builds'} · Tap any card to inspect
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id || project.title}
                project={project}
                index={index}
                isActive={selectedIndex === index}
                onSelect={(_, idx) => setSelectedIndex(idx)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Spider-Nest Architecture & Tech-Stack Modal */}
      <ProjectSpiderNestModal
        projects={filteredProjects}
        activeIndex={selectedIndex}
        onClose={() => setSelectedIndex(null)}
        onSelectIndex={setSelectedIndex}
      />
    </section>
  );
}