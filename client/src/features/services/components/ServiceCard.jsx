import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowUpRight,
  Bot,
  Check,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Layers,
  Layout,
  Network,
  Radio,
  Server,
  Sparkles,
  Wifi,
  X,
} from 'lucide-react';

const SERVICE_ICONS = {
  layers: Layers,
  sparkles: Sparkles,
  radio: Radio,
  wifi: Wifi,
  bot: Bot,
  server: Server,
  layout: Layout,
  cpu: Cpu,
};

const HEX_CLIP =
  'polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%)';

// Chamfered octagonal aerospace shape matching SkillGroupCard & ProjectCard
const CHAMFER_CLIP =
  'polygon(16px 0%, calc(100% - 16px) 0%, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0% calc(100% - 16px), 0% 16px)';

/**
 * Computes non-overlapping elliptical polar coordinates (in % of container)
 * placed on diagonal corners/rings so multi-word deliverable pills have room.
 */
function buildServiceWebNodes(deliverables = []) {
  const total = deliverables.length;
  if (total === 0) return [];

  const useDualRing = total > 4;
  const innerCount = useDualRing ? Math.ceil(total / 2) : total;
  const outerCount = useDualRing ? total - innerCount : 0;

  return deliverables.map((item, idx) => {
    const isInner = !useDualRing || idx < innerCount;
    const ringIndex = isInner ? idx : idx - innerCount;
    const countInRing = isInner ? innerCount : outerCount;

    const angleStep = (Math.PI * 2) / countInRing;
    // Start at -45deg for 4 nodes so pills sit cleanly in the 4 quadrants
    const startOffset = countInRing === 4 ? -Math.PI / 4 : -Math.PI / 2 + 0.25;
    const baseAngle = isInner ? startOffset : startOffset + angleStep / 2;
    const angle = baseAngle + ringIndex * angleStep;

    const rx = useDualRing ? (isInner ? 23 : 38) : 33;
    const ry = useDualRing ? (isInner ? 23 : 37) : 32;

    const x = +(50 + Math.cos(angle) * rx).toFixed(2);
    const y = +(50 + Math.sin(angle) * ry).toFixed(2);

    return {
      label: item,
      index: idx,
      isInner,
      x,
      y,
    };
  });
}

/**
 * Chamfered Octagonal Orbital Service Pod
 */
export function ServiceCard({
  service,
  index,
  isActive = false,
  onSelect,
  onHoverChange,
}) {
  const cardRef = useRef(null);
  const Icon = SERVICE_ICONS[service.icon] || Layers;
  const deliverables = service.deliverables || [];

  const serviceNumber =
    typeof index === 'number' ? String(index + 1).padStart(2, '0') : null;

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect?.(service, index);
    }
  };

  return (
    <article
      ref={cardRef}
      role="button"
      tabIndex={0}
      aria-expanded={isActive}
      aria-label={`${service.title} — Click to weave ${deliverables.length} service deliverables`}
      onClick={() => onSelect?.(service, index)}
      onKeyDown={handleKeyDown}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => onHoverChange?.(index)}
      onMouseLeave={() => onHoverChange?.(null)}
      className="group relative w-full cursor-pointer select-none focus-visible:outline-none"
    >
      {/* Outer Ambient Mint Glow on Hover / Active */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -inset-1 rounded-2xl bg-[#47f59c]/20 blur-xl transition-opacity duration-500 ${
          isActive ? 'opacity-90' : 'opacity-0 group-hover:opacity-75'
        }`}
      />

      {/* Chamfered Octagon Pod Body */}
      <div
        style={{ clipPath: CHAMFER_CLIP }}
        className={`relative p-4 sm:p-5 backdrop-blur-2xl transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03] group-focus-visible:ring-2 group-focus-visible:ring-[#47f59c] motion-reduce:transform-none ${
          isActive
            ? 'bg-[#0e1713]/95'
            : 'bg-[#101316]/92 group-hover:bg-[#121916]/95'
        }`}
      >
        {/* Crisp SVG Chamfered Perimeter Border */}
        <svg
          aria-hidden="true"
          viewBox="0 0 264 164"
          preserveAspectRatio="none"
          fill="none"
          className="pointer-events-none absolute inset-0 w-full h-full"
        >
          <polygon
            points="16,0.75 248,0.75 263.25,16 263.25,148 248,163.25 16,163.25 0.75,148 0.75,16"
            stroke={isActive ? '#47f59c' : 'rgba(255, 255, 255, 0.14)'}
            strokeWidth="1.4"
            className="transition-colors duration-300 group-hover:stroke-[#47f59c]/75"
          />
          {/* Corner Mint Accent Ticks */}
          <polyline
            points="1,24 1,16 16,1 24,1"
            stroke="#47f59c"
            strokeWidth="1.8"
            strokeOpacity={isActive ? '1' : '0.55'}
          />
          <polyline
            points="240,163 248,163 263,148 263,140"
            stroke="#47f59c"
            strokeWidth="1.8"
            strokeOpacity={isActive ? '1' : '0.55'}
          />
        </svg>

        {/* Cursor-Tracking Mint Spotlight */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:hidden"
          style={{
            background:
              'radial-gradient(240px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(71, 245, 156, 0.16), transparent 60%)',
          }}
        />

        {/* Header: Hexagonal Icon + Service Number & Deliverable Count */}
        <div className="relative z-10 flex items-center justify-between gap-2 mb-3">
          <div
            style={{ clipPath: HEX_CLIP }}
            className="flex items-center justify-center w-9 h-10 p-[1px] bg-gradient-to-b from-[#47f59c]/80 to-[#47f59c]/20 transition-transform duration-300 group-hover:scale-110"
          >
            <div
              style={{ clipPath: HEX_CLIP }}
              className="flex items-center justify-center w-full h-full bg-[#0a0f0d] text-[#47f59c]"
            >
              <Icon className="w-4 h-4" />
            </div>
          </div>

          <div className="flex items-center gap-1.5 font-mono text-[10px] tracking-wider uppercase">
            {serviceNumber && (
              <span className="px-1.5 py-0.5 rounded bg-white/[0.04] text-zinc-400">
                {serviceNumber}
              </span>
            )}
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#47f59c]/10 border border-[#47f59c]/30 text-[#47f59c]">
              <Network className="w-2.5 h-2.5" />
              <span>{deliverables.length} Specs</span>
            </span>
          </div>
        </div>

        {/* Service Title & 1-Line Summary */}
        <h3 className="relative z-10 text-sm sm:text-[15px] font-semibold tracking-tight text-white leading-snug line-clamp-1 group-hover:text-[#7efcc0] transition-colors">
          {service.title}
        </h3>

        <p className="relative z-10 mt-1 text-xs text-zinc-400 line-clamp-1">
          {service.summary}
        </p>

        {/* Bottom Preview & Weave Trigger */}
        <div className="relative z-10 mt-3 pt-2.5 border-t border-white/[0.07] flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-zinc-300 truncate">
            <span className="w-1.5 h-1.5 rounded-full bg-[#47f59c] shrink-0 shadow-[0_0_6px_#47f59c]" />
            <span className="truncate">{deliverables[0]}</span>
          </span>

          <span className="shrink-0 font-mono text-[10px] font-medium tracking-wider uppercase text-[#47f59c] opacity-85 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all">
            Weave →
          </span>
        </div>
      </div>
    </article>
  );
}

/**
 * Expanded Interactive Service Spider-Nest Modal
 */
export function ServiceSpiderNestModal({
  services = [],
  activeIndex,
  onClose,
  onSelectIndex,
}) {
  const [hoveredNode, setHoveredNode] = useState(null);

  const service =
    typeof activeIndex === 'number' ? services[activeIndex] : null;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHoveredNode(null);
  }, [activeIndex]);

  useEffect(() => {
    if (!service) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.();
      if (e.key === 'ArrowRight' && services.length > 1) {
        onSelectIndex?.((activeIndex + 1) % services.length);
      }
      if (e.key === 'ArrowLeft' && services.length > 1) {
        onSelectIndex?.((activeIndex - 1 + services.length) % services.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [service, activeIndex, services.length, onClose, onSelectIndex]);

  const webNodes = useMemo(
    () => buildServiceWebNodes(service?.deliverables || []),
    [service]
  );

  const { innerPolygonPoints, outerPolygonPoints, crossLinks } = useMemo(() => {
    const inner = webNodes.filter((n) => n.isInner);
    const outer = webNodes.filter((n) => !n.isInner);

    const toPoints = (arr) =>
      arr.length >= 3 ? arr.map((n) => `${n.x},${n.y}`).join(' ') : '';

    const links = outer
      .map((outNode, idx) => {
        const targetInner = inner[idx % inner.length];
        return targetInner
          ? {
              from: outNode,
              to: targetInner,
              key: `${outNode.label}-${targetInner.label}`,
            }
          : null;
      })
      .filter(Boolean);

    return {
      innerPolygonPoints: toPoints(inner),
      outerPolygonPoints: toPoints(outer),
      crossLinks: links,
    };
  }, [webNodes]);

  if (!service) return null;

  const Icon = SERVICE_ICONS[service.icon] || Layers;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${service.title} deliverables spider nest`}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
    >
      {/* Frosted Pitch-Black Backdrop */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className="fixed inset-0 bg-[#050607]/85 backdrop-blur-xl transition-opacity"
      />

      {/* Service Spider-Nest Chamber */}
      <div className="relative z-10 w-full max-w-5xl my-auto rounded-3xl bg-[#0b0e0d]/95 border border-[#47f59c]/35 shadow-[0_32px_80px_-12px_rgba(0,0,0,0.98),0_0_50px_-12px_rgba(71,245,156,0.28),inset_0_1px_0_0_rgba(255,255,255,0.12)] overflow-hidden">
        {/* Top Specular Mint Rim */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-[#47f59c]/70 to-transparent"
        />

        {/* Modal Header */}
        <div className="flex flex-wrap items-start justify-between gap-4 p-5 sm:p-6 border-b border-white/[0.07]">
          <div className="flex items-start gap-3.5">
            <div
              style={{ clipPath: HEX_CLIP }}
              className="flex items-center justify-center w-11 h-12 p-[1.5px] bg-gradient-to-b from-[#47f59c] to-[#10b981] shrink-0 mt-0.5"
            >
              <div
                style={{ clipPath: HEX_CLIP }}
                className="flex items-center justify-center w-full h-full bg-[#090d0b] text-[#47f59c]"
              >
                <Icon className="w-5 h-5" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] font-semibold tracking-widest uppercase text-[#47f59c]">
                  Capability {String(activeIndex + 1).padStart(2, '0')} /{' '}
                  {String(services.length).padStart(2, '0')}
                </span>
                <span className="text-zinc-600">·</span>
                <span className="font-mono text-[11px] text-zinc-400">
                  {webNodes.length} Core Deliverables
                </span>
              </div>
              <h3 className="text-lg sm:text-2xl font-bold tracking-tight text-white mt-0.5">
                {service.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <a
              href="#contact"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-zinc-950 bg-[#47f59c] rounded-full shadow-[0_0_24px_-4px_rgba(71,245,156,0.55)] hover:bg-[#5ef9ab] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#47f59c]"
            >
              <span>Scope This Build</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close service spider nest"
              className="p-2 rounded-full text-zinc-400 bg-white/[0.04] border border-white/[0.08] hover:text-[#47f59c] hover:border-[#47f59c]/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#47f59c]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Two-Column Body: Synced Deliverables Breakdown + Interactive Spider-Nest Web */}
        <div className="grid lg:grid-cols-12 gap-6 p-5 sm:p-6">
          {/* Left Column: Summary & Synced Key Deliverables */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
            <div>
              <p className="text-sm leading-relaxed text-zinc-300">
                {service.summary}
              </p>

              <div className="mt-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#47f59c] shadow-[0_0_8px_#47f59c]" />
                  <h4 className="font-mono text-[11px] font-semibold tracking-[0.18em] uppercase text-[#47f59c]">
                    Key Deliverables
                  </h4>
                </div>

                <ul className="space-y-2">
                  {webNodes.map((node) => {
                    const isLit = hoveredNode === node.index;
                    return (
                      <li
                        key={node.label}
                        onMouseEnter={() => setHoveredNode(node.index)}
                        onMouseLeave={() => setHoveredNode(null)}
                        className={`flex items-center gap-3 p-3 rounded-xl border text-xs sm:text-[13px] transition-all duration-200 cursor-pointer ${
                          isLit
                            ? 'bg-[#0f2419]/80 border-[#47f59c]/60 text-white shadow-[0_0_20px_-6px_rgba(71,245,156,0.4)]'
                            : 'bg-white/[0.025] border-white/[0.06] text-zinc-300 hover:border-white/[0.14]'
                        }`}
                      >
                        <span
                          className={`flex items-center justify-center w-5 h-5 rounded-full border shrink-0 transition-transform ${
                            isLit
                              ? 'bg-[#47f59c] border-[#47f59c] text-zinc-950 scale-110'
                              : 'bg-[#47f59c]/10 border-[#47f59c]/30 text-[#47f59c]'
                          }`}
                        >
                          <Check className="w-3 h-3 stroke-[2.5]" />
                        </span>
                        <span className="leading-snug">{node.label}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Deliverables Spider-Nest Web */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="flex items-center justify-between mb-2.5">
              <span className="font-mono text-[11px] font-semibold tracking-[0.18em] uppercase text-zinc-400">
                Deliverables Constellation ({webNodes.length} Nodes)
              </span>
              <span className="font-mono text-[10px] text-[#47f59c]">
                Hover any node or item to trace silk
              </span>
            </div>

            <div className="relative w-full h-[20rem] sm:h-[22rem] flex-1 rounded-2xl bg-[#060807] border border-[#47f59c]/20 shadow-[inset_0_0_40px_rgba(71,245,156,0.06)] overflow-hidden">
              {/* Radial Center Glow */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-[#47f59c]/[0.15] blur-2xl"
              />

              {/* Spider-Web SVG Silk Geometry */}
              <svg
                aria-hidden="true"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="pointer-events-none absolute inset-0 w-full h-full"
              >
                <ellipse
                  cx="50"
                  cy="50"
                  rx="15"
                  ry="14"
                  fill="none"
                  stroke="rgba(71, 245, 156, 0.16)"
                  strokeWidth="0.35"
                  strokeDasharray="1.5 1.5"
                />
                <ellipse
                  cx="50"
                  cy="50"
                  rx="32"
                  ry="30"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.08)"
                  strokeWidth="0.35"
                />

                {innerPolygonPoints && (
                  <polygon
                    points={innerPolygonPoints}
                    fill="rgba(71, 245, 156, 0.035)"
                    stroke="rgba(71, 245, 156, 0.3)"
                    strokeWidth="0.4"
                  />
                )}
                {outerPolygonPoints && (
                  <polygon
                    points={outerPolygonPoints}
                    fill="none"
                    stroke="rgba(71, 245, 156, 0.22)"
                    strokeWidth="0.38"
                    strokeDasharray="2 1.2"
                  />
                )}

                {crossLinks.map((link) => {
                  const isLit =
                    hoveredNode === link.from.index ||
                    hoveredNode === link.to.index;
                  return (
                    <line
                      key={link.key}
                      x1={link.from.x}
                      y1={link.from.y}
                      x2={link.to.x}
                      y2={link.to.y}
                      stroke={
                        isLit
                          ? 'rgba(71, 245, 156, 0.75)'
                          : 'rgba(255, 255, 255, 0.11)'
                      }
                      strokeWidth={isLit ? '0.55' : '0.32'}
                      className="transition-all duration-300"
                    />
                  );
                })}

                {webNodes.map((node) => {
                  const isLit = hoveredNode === node.index;
                  return (
                    <line
                      key={`spoke-${node.label}`}
                      x1="50"
                      y1="50"
                      x2={node.x}
                      y2={node.y}
                      stroke={
                        isLit
                          ? '#47f59c'
                          : node.isInner
                          ? 'rgba(71, 245, 156, 0.48)'
                          : 'rgba(71, 245, 156, 0.28)'
                      }
                      strokeWidth={isLit ? '0.75' : '0.42'}
                      className="transition-all duration-300"
                    />
                  );
                })}
              </svg>

              {/* Central Service Core Hub */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-12 h-12 rounded-full bg-[#0b120e] border border-[#47f59c]/65 text-[#47f59c] shadow-[0_0_28px_rgba(71,245,156,0.55),inset_0_1px_0_rgba(255,255,255,0.25)]"
              >
                <span className="absolute inset-0 rounded-full border border-[#47f59c]/40 animate-ping opacity-40 motion-reduce:hidden" />
                <Icon className="w-5 h-5 relative z-10" />
              </div>

              {/* Deliverable Vertex Nodes Placed on Every Point of the Nest */}
              {webNodes.map((node) => {
                const isLit = hoveredNode === node.index;
                return (
                  <button
                    key={node.label}
                    type="button"
                    style={{
                      left: `${node.x}%`,
                      top: `${node.y}%`,
                    }}
                    onMouseEnter={() => setHoveredNode(node.index)}
                    onMouseLeave={() => setHoveredNode(null)}
                    onFocus={() => setHoveredNode(node.index)}
                    onBlur={() => setHoveredNode(null)}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 flex items-center gap-1.5 max-w-[175px] sm:max-w-[200px] px-2.5 py-1.5 rounded-full font-mono text-[10px] sm:text-[11px] font-medium border backdrop-blur-xl transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#47f59c] ${
                      isLit
                        ? 'z-30 scale-105 bg-[#0f2419]/95 text-white border-[#47f59c] shadow-[0_0_22px_rgba(71,245,156,0.6),inset_0_1px_0_rgba(255,255,255,0.3)]'
                        : 'bg-[#121619]/95 text-zinc-100 border-[#47f59c]/35 shadow-[0_8px_20px_rgba(0,0,0,0.85)] hover:border-[#47f59c]'
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                        isLit
                          ? 'bg-[#47f59c] scale-125 shadow-[0_0_8px_#47f59c]'
                          : 'bg-[#47f59c]/85'
                      }`}
                    />
                    <span className="truncate">{node.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer: Quick Service Orbit Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 bg-white/[0.02] border-t border-white/[0.07]">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() =>
                onSelectIndex?.(
                  (activeIndex - 1 + services.length) % services.length
                )
              }
              aria-label="Previous service"
              className="p-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-zinc-300 hover:text-[#47f59c] hover:border-[#47f59c]/40 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() =>
                onSelectIndex?.((activeIndex + 1) % services.length)
              }
              aria-label="Next service"
              className="p-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-zinc-300 hover:text-[#47f59c] hover:border-[#47f59c]/40 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <span className="ml-2 hidden sm:inline-flex items-center gap-1.5 font-mono text-[11px] text-zinc-400">
              <Sparkles className="w-3 h-3 text-[#47f59c]" />
              Use ← / → keys to switch engineering domains
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {services.map((item, idx) => (
              <button
                key={item.id || item.title}
                type="button"
                onClick={() => onSelectIndex?.(idx)}
                className={`px-2.5 py-1 rounded-full font-mono text-[11px] transition-all ${
                  idx === activeIndex
                    ? 'bg-[#47f59c] text-zinc-950 font-semibold shadow-[0_0_16px_rgba(71,245,156,0.45)]'
                    : 'bg-white/[0.04] text-zinc-400 border border-white/[0.08] hover:text-white'
                }`}
              >
                {String(idx + 1).padStart(2, '0')}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}