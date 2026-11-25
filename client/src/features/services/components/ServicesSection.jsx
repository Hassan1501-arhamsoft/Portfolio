import { useEffect, useMemo, useRef, useState } from 'react';
import { Layers, Sparkles } from 'lucide-react';
import { SectionHeader } from '../../../shared/components/SectionHeader';
import * as servicesModule from '../data/services.data';
import { ServiceCard, ServiceSpiderNestModal } from './ServiceCard';
import { ParticleCanvas } from '../../../shared/components/ParticleCanvas';

const SERVICES = servicesModule.SERVICES_DATA || [];

export function ServicesSection() {
  const stageRef = useRef(null);
  const cardWrapperRefs = useRef([]);
  const lineRefs = useRef([]);
  const hubNodeRefs = useRef([]);
  const pulseDotRefs = useRef([]);

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const isPausedRef = useRef(false);
  useEffect(() => {
    isPausedRef.current = hoveredIndex !== null || selectedIndex !== null;
  }, [hoveredIndex, selectedIndex]);

  const totalDeliverablesCount = useMemo(
    () =>
      SERVICES.reduce(
        (sum, srv) => sum + (srv.deliverables?.length || 0),
        0
      ),
    []
  );

  // Smooth 60fps Orbital Engine: moves service pods + connected SVG tether lines in lockstep
  useEffect(() => {
    const stageEl = stageRef.current;
    if (!stageEl || SERVICES.length === 0) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let rafId = null;
    let isInViewport = true;
    const baseSpeed = prefersReducedMotion ? 0 : 0.16;
    let angleOffset = Math.PI / 4;
    let currentSpeed = baseSpeed;
    let lastTime = performance.now();

    const positionOrbit = (timeMs) => {
      const rect = stageEl.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      if (width === 0 || height === 0) return;

      const cx = width / 2;
      const cy = height / 2;
      const count = SERVICES.length;

      const rxFactor = count > 4 ? 0.37 : 0.34;
      const ryFactor = count > 4 ? 0.35 : 0.32;
      const rx = Math.min(width * rxFactor, count > 4 ? 390 : 360);
      const ry = Math.min(height * ryFactor, count > 4 ? 250 : 225);
      const hubRadius = width >= 1024 ? 86 : 74;

      for (let i = 0; i < count; i++) {
        const theta = angleOffset + (i * Math.PI * 2) / count;
        const cos = Math.cos(theta);
        const sin = Math.sin(theta);

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
          const t = (timeMs * 0.00052 + i * 0.25) % 1;
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
  }, []);

  const hoveredService =
    typeof hoveredIndex === 'number' ? SERVICES[hoveredIndex] : null;

  const isDenseOrbit = SERVICES.length > 4;

  return (
    <section
      id="services"
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
          eyebrow="Capabilities & Scope"
          title="Engineering Services"
          subtitle="Click any orbiting service pod to weave its deliverables spider-nest and explore production implementation scope."
        />

        {/* DESKTOP & TABLET: Smooth Circular Orbit Stage with Connected Tether Lines */}
        <div
          ref={stageRef}
          className={`relative hidden md:block w-full mx-auto ${
            isDenseOrbit
              ? 'h-[42rem] lg:h-[46rem]'
              : 'h-[38rem] lg:h-[42rem]'
          }`}
        >
          {/* Ambient Orbital Halo Rings */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[36rem] h-[23rem] lg:w-[45rem] lg:h-[28rem] rounded-full border border-dashed border-[#47f59c]/15"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[22rem] h-[14rem] lg:w-[28rem] lg:h-[18rem] rounded-full border border-white/[0.05]"
          />

          {/* Dynamic SVG Tether Lines Connecting Central Circle to Each Orbiting Service */}
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 w-full h-full z-10"
          >
            <defs>
              <filter
                id="serviceMintLineGlow"
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

            {SERVICES.map((service, idx) => {
              const isHighlighted =
                hoveredIndex === idx || selectedIndex === idx;
              return (
                <g key={`tether-${service.id || service.title}`}>
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
                    filter={
                      isHighlighted ? 'url(#serviceMintLineGlow)' : undefined
                    }
                    className="transition-colors duration-300"
                  />

                  <circle
                    ref={(el) => {
                      pulseDotRefs.current[idx] = el;
                    }}
                    r={isHighlighted ? '3.2' : '2.2'}
                    fill="#47f59c"
                    filter="url(#serviceMintLineGlow)"
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
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-36 h-36 lg:w-44 lg:h-44 rounded-full bg-[#0b0f0d]/95 backdrop-blur-2xl border border-[#47f59c]/45 shadow-[0_0_60px_-8px_rgba(71,245,156,0.35),inset_0_1px_1px_rgba(255,255,255,0.2)]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-2.5 rounded-full border border-dashed border-[#47f59c]/35 animate-[spin_24s_linear_infinite] motion-reduce:animate-none"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-2 rounded-full border border-white/[0.07]"
            />

            <div className="relative z-10 flex flex-col items-center text-center px-3">
              <div className="flex items-center justify-center w-9 h-9 mb-1.5 rounded-full bg-[#47f59c]/15 border border-[#47f59c]/40 text-[#47f59c] shadow-[0_0_18px_rgba(71,245,156,0.35)]">
                {hoveredService ? (
                  <Sparkles className="w-4 h-4" />
                ) : (
                  <Layers className="w-4 h-4" />
                )}
              </div>

              {hoveredService ? (
                <>
                  <span className="font-mono text-[10px] font-semibold tracking-wider uppercase text-[#47f59c]">
                    {hoveredService.deliverables?.length || 0} Deliverables
                  </span>
                  <span className="text-xs font-semibold text-white line-clamp-1 mt-0.5">
                    {hoveredService.title.split('&')[0]}
                  </span>
                  <span className="font-mono text-[9px] text-zinc-400 mt-0.5">
                    Click to weave
                  </span>
                </>
              ) : (
                <>
                  <span className="text-lg lg:text-xl font-bold tracking-tight text-white leading-none">
                    {SERVICES.length} Domains
                  </span>
                  <span className="font-mono text-[10px] font-medium tracking-[0.16em] uppercase text-[#47f59c] mt-1">
                    Full Lifecycle
                  </span>
                  <span className="font-mono text-[9px] text-zinc-400 mt-0.5">
                    {totalDeliverablesCount} Deliverables
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Orbiting Chamfered Service Pods */}
          {SERVICES.map((service, index) => (
            <div
              key={service.id || service.title}
              ref={(el) => {
                cardWrapperRefs.current[index] = el;
              }}
              className={`absolute top-0 left-0 z-30 will-change-transform ${
                isDenseOrbit
                  ? 'w-[14rem] lg:w-[15.5rem]'
                  : 'w-[14.75rem] lg:w-[16.5rem]'
              }`}
            >
              <ServiceCard
                service={service}
                index={index}
                isActive={selectedIndex === index}
                onSelect={(_, idx) => setSelectedIndex(idx)}
                onHoverChange={setHoveredIndex}
              />
            </div>
          ))}
        </div>

        {/* MOBILE VIEW (< md): Responsive Stack with Tap-to-Weave */}
        <div className="md:hidden space-y-4">
          <div className="flex items-center justify-center gap-3 py-3 px-4 rounded-full bg-[#0b0f0d] border border-[#47f59c]/35 w-fit mx-auto">
            <span className="w-2 h-2 rounded-full bg-[#47f59c] animate-pulse" />
            <span className="font-mono text-xs text-zinc-200">
              {SERVICES.length} Service Domains · Tap any card to weave
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {SERVICES.map((service, index) => (
              <ServiceCard
                key={service.id || service.title}
                service={service}
                index={index}
                isActive={selectedIndex === index}
                onSelect={(_, idx) => setSelectedIndex(idx)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Deliverables Spider-Nest Modal */}
      <ServiceSpiderNestModal
        services={SERVICES}
        activeIndex={selectedIndex}
        onClose={() => setSelectedIndex(null)}
        onSelectIndex={setSelectedIndex}
      />
    </section>
  );
}