import { useEffect, useMemo, useRef, useState } from 'react';
import { Briefcase, Sparkles } from 'lucide-react';
import { ParticleCanvas } from '../../../shared/components/ParticleCanvas';
import { SectionHeader } from '../../../shared/components/SectionHeader';
import { EXPERIENCE_DATA } from '../data/experience.data';
import {
  ExperienceSpiderNestModal,
  TimelineItem,
} from './TimelineItem';

function summarizeMilestone(item = {}) {
  const title = item.role || item.title || 'Engineering Milestone';
  const organization =
    item.organization || item.company || item.institution || '';
  const period = item.period || item.duration || item.date || '';
  const isCurrent =
    Boolean(item.current) || /present|current|now/i.test(period);

  return { title, organization, period, isCurrent };
}

export function ExperienceSection() {
  const stageRef = useRef(null);
  const cardWrapperRefs = useRef([]);
  const radialLineRefs = useRef([]);
  const arcPathRefs = useRef([]);
  const hubNodeRefs = useRef([]);
  const pulseDotRefs = useRef([]);

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const isPausedRef = useRef(false);
  useEffect(() => {
    isPausedRef.current = hoveredIndex !== null || selectedIndex !== null;
  }, [hoveredIndex, selectedIndex]);

  const summaries = useMemo(
    () => EXPERIENCE_DATA.map((item) => summarizeMilestone(item)),
    []
  );

  // Smooth 60fps Orbital Rotation Engine: rotates cards + connected SVG lines around the center circle
  useEffect(() => {
    const stageEl = stageRef.current;
    if (!stageEl || summaries.length === 0) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let rafId = null;
    let isInViewport = true;
    const baseSpeed = prefersReducedMotion ? 0 : 0.16; // Smooth clockwise orbit
    let angleOffset = (-3 * Math.PI) / 4; // Starts milestone 01 at top-left
    let currentSpeed = baseSpeed;
    let lastTime = performance.now();

    const positionOrbit = (timeMs) => {
      const rect = stageEl.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      if (width === 0 || height === 0) return;

      const cx = width / 2;
      const cy = height / 2;
      const count = summaries.length;

      const rx = Math.min(width * 0.35, count > 4 ? 390 : 365);
      const ry = Math.min(height * 0.33, count > 4 ? 255 : 230);
      const hubRadius = width >= 1024 ? 88 : 76;

      const coords = [];

      for (let i = 0; i < count; i++) {
        const theta = angleOffset + (i * Math.PI * 2) / count;
        const cos = Math.cos(theta);
        const sin = Math.sin(theta);

        const cardX = cx + cos * rx;
        const cardY = cy + sin * ry;

        const startX = cx + cos * hubRadius;
        const startY = cy + sin * hubRadius;

        coords.push({ cardX, cardY });

        const cardEl = cardWrapperRefs.current[i];
        if (cardEl) {
          cardEl.style.transform = `translate3d(${cardX.toFixed(1)}px, ${cardY.toFixed(
            1
          )}px, 0) translate(-50%, -50%)`;
        }

        const lineEl = radialLineRefs.current[i];
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
          const t = (timeMs * 0.00055 + i * 0.25) % 1;
          const px = startX + (cardX - startX) * t;
          const py = startY + (cardY - startY) * t;
          pulseEl.setAttribute('cx', px.toFixed(1));
          pulseEl.setAttribute('cy', py.toFixed(1));
        }
      }

      // Sequential progression filaments linking milestone 01 -> 02 -> 03 -> 04
      for (let i = 0; i < count - 1; i++) {
        const arcEl = arcPathRefs.current[i];
        if (arcEl && coords[i] && coords[i + 1]) {
          arcEl.setAttribute('x1', coords[i].cardX.toFixed(1));
          arcEl.setAttribute('y1', coords[i].cardY.toFixed(1));
          arcEl.setAttribute('x2', coords[i + 1].cardX.toFixed(1));
          arcEl.setAttribute('y2', coords[i + 1].cardY.toFixed(1));
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
  }, [summaries.length]);

  const hoveredMilestone =
    typeof hoveredIndex === 'number' ? summaries[hoveredIndex] : null;
  const activeRole =
    summaries.find((item) => item.isCurrent) || summaries[0];

  return (
    <section
      id="experience"
      className="relative overflow-hidden bg-[#060708] py-24 lg:py-32 border-b border-white/[0.06]"
    >
      {/* Top Section Mint Specular Beam */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#47f59c]/35 to-transparent"
      />

      {/* Overhead Electric-Mint Studio Spotlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[52rem] h-[24rem] rounded-full bg-[radial-gradient(circle,rgba(71,245,156,0.1)_0%,rgba(16,185,129,0.03)_45%,transparent_72%)] blur-3xl"
      />

      {/* Bounded Particle Canvas */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-75 [mask-image:radial-gradient(ellipse_85%_75%_at_50%_50%,#000_45%,transparent_100%)]"
      >
        <ParticleCanvas linkDistance={140} mouseRadius={200} />
      </div>

      {/* Radial-Masked Mint Micro-Dot Matrix */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(71,245,156,0.12)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_50%,#000_35%,transparent_100%)]"
      />

      <div className="relative z-10 max-w-6xl px-6 mx-auto">
        <SectionHeader
          eyebrow="Career Trajectory"
          title="Experience & Education"
          subtitle="Click any orbiting career milestone to inspect quantified engineering impact and weave its applied tech stack."
        />

        {/* DESKTOP & TABLET: Rotating Orbital Constellation */}
        <div
          ref={stageRef}
          className="relative hidden md:block w-full h-[40rem] lg:h-[44rem] mx-auto"
        >
          {/* Ambient Orbital Halo Rings */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[38rem] h-[24rem] lg:w-[48rem] lg:h-[30rem] rounded-full border border-dashed border-[#47f59c]/15"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[23rem] h-[15rem] lg:w-[29rem] lg:h-[19rem] rounded-full border border-white/[0.05]"
          />

          {/* Dynamic SVG Radial Tethers + Sequential Progression Arcs */}
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 w-full h-full z-10"
          >
            <defs>
              <filter
                id="expMintLineGlow"
                x="-20%"
                y="-20%"
                width="140%"
                height="140%"
              >
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {summaries.slice(0, -1).map((item, idx) => (
              <line
                key={`seq-${EXPERIENCE_DATA[idx]?.id || idx}`}
                ref={(el) => {
                  arcPathRefs.current[idx] = el;
                }}
                stroke="rgba(255, 255, 255, 0.08)"
                strokeWidth="1"
                strokeDasharray="3 5"
              />
            ))}

            {summaries.map((item, idx) => {
              const isHighlighted =
                hoveredIndex === idx ||
                selectedIndex === idx ||
                (hoveredIndex === null && item.isCurrent);
              return (
                <g key={`tether-${EXPERIENCE_DATA[idx]?.id || idx}`}>
                  <line
                    ref={(el) => {
                      radialLineRefs.current[idx] = el;
                    }}
                    stroke={
                      isHighlighted
                        ? '#47f59c'
                        : 'rgba(71, 245, 156, 0.28)'
                    }
                    strokeWidth={isHighlighted ? '2' : '1.25'}
                    strokeDasharray={isHighlighted ? 'none' : '4 4'}
                    filter={isHighlighted ? 'url(#expMintLineGlow)' : undefined}
                    className="transition-colors duration-300"
                  />

                  <circle
                    ref={(el) => {
                      pulseDotRefs.current[idx] = el;
                    }}
                    r={isHighlighted ? '3.4' : '2.2'}
                    fill="#47f59c"
                    filter="url(#expMintLineGlow)"
                  />

                  <circle
                    ref={(el) => {
                      hubNodeRefs.current[idx] = el;
                    }}
                    r={isHighlighted ? '4.8' : '3.5'}
                    fill="#090d0b"
                    stroke="#47f59c"
                    strokeWidth="1.8"
                  />
                </g>
              );
            })}
          </svg>

          {/* Central Career Core Circle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-40 h-40 lg:w-48 lg:h-48 rounded-full bg-[#0b0f0d]/95 backdrop-blur-2xl border border-[#47f59c]/50 shadow-[0_0_70px_-8px_rgba(71,245,156,0.38),inset_0_1px_1px_rgba(255,255,255,0.22)]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-2.5 rounded-full border border-dashed border-[#47f59c]/35 animate-[spin_28s_linear_infinite] motion-reduce:animate-none"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-2 rounded-full border border-white/[0.07]"
            />

            <div className="relative z-10 flex flex-col items-center text-center px-3.5">
              <div className="flex items-center justify-center w-9 h-9 mb-1.5 rounded-full bg-[#47f59c]/15 border border-[#47f59c]/45 text-[#47f59c] shadow-[0_0_18px_rgba(71,245,156,0.4)]">
                {hoveredMilestone ? (
                  <Sparkles className="w-4 h-4" />
                ) : (
                  <Briefcase className="w-4 h-4" />
                )}
              </div>

              {hoveredMilestone ? (
                <>
                  <span className="font-mono text-[10px] font-semibold tracking-wider uppercase text-[#47f59c]">
                    {hoveredMilestone.period || 'Milestone'}
                  </span>
                  <span className="text-xs font-bold text-white line-clamp-1 mt-0.5">
                    {hoveredMilestone.organization}
                  </span>
                  <span className="font-mono text-[9px] text-zinc-400 mt-0.5">
                    Click to inspect
                  </span>
                </>
              ) : (
                <>
                  <span className="font-mono text-[10px] font-semibold tracking-[0.16em] uppercase text-[#47f59c]">
                    Career Core
                  </span>
                  <span className="text-sm lg:text-base font-bold tracking-tight text-white line-clamp-1 mt-0.5">
                    {activeRole?.title?.split(' ')[0] || 'Full-Stack'} & AI
                  </span>
                  <span className="font-mono text-[9px] text-zinc-400 mt-1">
                    {summaries.length} Verified Milestones
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Orbiting Chamfered Milestone Pods */}
          {EXPERIENCE_DATA.map((item, index) => (
            <div
              key={item.id || index}
              ref={(el) => {
                cardWrapperRefs.current[index] = el;
              }}
              className="absolute top-0 left-0 z-30 w-[15.25rem] lg:w-[17.25rem] will-change-transform"
            >
              <TimelineItem
                item={item}
                index={index}
                isActive={selectedIndex === index}
                onSelect={(_, idx) => setSelectedIndex(idx)}
                onHoverChange={setHoveredIndex}
              />
            </div>
          ))}
        </div>

        {/* MOBILE VIEW (< md): Chronological Stack with Tap-to-Inspect */}
        <div className="md:hidden space-y-4">
          <div className="flex items-center justify-center gap-3 py-3 px-4 rounded-full bg-[#0b0f0d] border border-[#47f59c]/35 w-fit mx-auto">
            <span className="w-2 h-2 rounded-full bg-[#47f59c] animate-pulse" />
            <span className="font-mono text-xs text-zinc-200">
              {summaries.length} Career Milestones · Tap to inspect
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {EXPERIENCE_DATA.map((item, index) => (
              <TimelineItem
                key={item.id || index}
                item={item}
                index={index}
                isActive={selectedIndex === index}
                onSelect={(_, idx) => setSelectedIndex(idx)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Career Impact & Competency Spider-Nest Modal */}
      <ExperienceSpiderNestModal
        items={EXPERIENCE_DATA}
        activeIndex={selectedIndex}
        onClose={() => setSelectedIndex(null)}
        onSelectIndex={setSelectedIndex}
      />
    </section>
  );
}