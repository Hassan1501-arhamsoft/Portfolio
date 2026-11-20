import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Bot,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Layout,
  Network,
  Server,
  Sparkles,
  X,
} from 'lucide-react';

const CATEGORY_ICONS = {
  bot: Bot,
  server: Server,
  layout: Layout,
  cpu: Cpu,
};

const HEX_CLIP =
  'polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%)';

// Chamfered octagonal aerospace shape for orbiting cards
const CHAMFER_CLIP =
  'polygon(16px 0%, calc(100% - 16px) 0%, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0% calc(100% - 16px), 0% 16px)';

/**
 * Computes non-overlapping elliptical polar coordinates (in % of container)
 * across 1 or 2 concentric web rings so skill vertex pills never collide.
 */
function buildSpiderWebNodes(skills = []) {
  const total = skills.length;
  if (total === 0) return [];

  const useDualRing = total > 4;
  const innerCount = useDualRing ? Math.ceil(total / 2) : total;
  const outerCount = useDualRing ? total - innerCount : 0;

  return skills.map((skill, idx) => {
    const isInner = !useDualRing || idx < innerCount;
    const ringIndex = isInner ? idx : idx - innerCount;
    const countInRing = isInner ? innerCount : outerCount;

    const angleStep = (Math.PI * 2) / countInRing;
    const baseAngle = -Math.PI / 2 + (isInner ? 0.22 : 0.22 + angleStep / 2);
    const angle = baseAngle + ringIndex * angleStep;

    const rx = useDualRing ? (isInner ? 24 : 40) : 34;
    const ry = useDualRing ? (isInner ? 24 : 39) : 33;

    const x = +(50 + Math.cos(angle) * rx).toFixed(2);
    const y = +(50 + Math.sin(angle) * ry).toFixed(2);

    return {
      label: skill,
      index: idx,
      isInner,
      x,
      y,
    };
  });
}

/**
 * Chamfered Octagonal Orbital Node Card
 */
export function SkillGroupCard({
  category,
  index,
  isActive = false,
  onSelect,
  onHoverChange,
}) {
  const cardRef = useRef(null);
  const Icon = CATEGORY_ICONS[category.icon] || Server;
  const moduleNumber =
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
      onSelect?.(category, index);
    }
  };

  return (
    <article
      ref={cardRef}
      role="button"
      tabIndex={0}
      aria-expanded={isActive}
      aria-label={`${category.title} — Click to weave ${category.skills.length} skill nodes`}
      onClick={() => onSelect?.(category, index)}
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

      {/* Chamfered Octagon Card Body */}
      <div
        style={{ clipPath: CHAMFER_CLIP }}
        className={`relative p-4 sm:p-5 backdrop-blur-2xl transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03] group-focus-visible:ring-2 group-focus-visible:ring-[#47f59c] motion-reduce:transform-none ${
          isActive
            ? 'bg-[#0e1713]/95'
            : 'bg-[#101316]/92 group-hover:bg-[#121916]/95'
        }`}
      >
        {/* Crisp SVG Chamfered Perimeter Border (since clip-path clips standard borders) */}
        <svg
          aria-hidden="true"
          viewBox="0 0 260 156"
          preserveAspectRatio="none"
          fill="none"
          className="pointer-events-none absolute inset-0 w-full h-full"
        >
          <polygon
            points="16,0.75 244,0.75 259.25,16 259.25,140 244,155.25 16,155.25 0.75,140 0.75,16"
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
            points="236,155 244,155 259,140 259,132"
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

        {/* Header: Hexagonal Icon Badge + Module & Node Count */}
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
            {moduleNumber && (
              <span className="px-1.5 py-0.5 rounded bg-white/[0.04] text-zinc-400">
                {moduleNumber}
              </span>
            )}
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#47f59c]/10 border border-[#47f59c]/30 text-[#47f59c]">
              <Network className="w-2.5 h-2.5" />
              <span>{category.skills.length}</span>
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="relative z-10 text-sm sm:text-[15px] font-semibold tracking-tight text-white leading-snug group-hover:text-[#7efcc0] transition-colors">
          {category.title}
        </h3>

        {/* Compact Top-Skill Preview + Action Prompt */}
        <div className="relative z-10 mt-3 pt-2.5 border-t border-white/[0.07] flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-zinc-300 truncate">
            <span className="w-1.5 h-1.5 rounded-full bg-[#47f59c] shrink-0 shadow-[0_0_6px_#47f59c]" />
            <span className="truncate">{category.skills[0]}</span>
          </span>

          <span className="shrink-0 font-mono text-[10px] font-medium tracking-wider uppercase text-[#47f59c] opacity-80 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all">
            Weave →
          </span>
        </div>
      </div>
    </article>
  );
}

/**
 * Expanded Interactive Spider-Nest Detail Overlay (Opens When Any Card Is Clicked)
 */
export function SkillSpiderNestModal({
  categories = [],
  activeIndex,
  onClose,
  onSelectIndex,
}) {
  const [hoveredNode, setHoveredNode] = useState(null);

  const category =
    typeof activeIndex === 'number' ? categories[activeIndex] : null;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHoveredNode(null);
  }, [activeIndex]);

  useEffect(() => {
    if (!category) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.();
      if (e.key === 'ArrowRight' && categories.length > 1) {
        onSelectIndex?.((activeIndex + 1) % categories.length);
      }
      if (e.key === 'ArrowLeft' && categories.length > 1) {
        onSelectIndex?.(
          (activeIndex - 1 + categories.length) % categories.length
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [category, activeIndex, categories.length, onClose, onSelectIndex]);

  const webNodes = useMemo(
    () => buildSpiderWebNodes(category?.skills || []),
    [category]
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

  if (!category) return null;

  const Icon = CATEGORY_ICONS[category.icon] || Server;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${category.title} skill spider nest`}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      {/* Frosted Pitch-Black Backdrop */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className="fixed inset-0 bg-[#050607]/85 backdrop-blur-xl transition-opacity"
      />

      {/* Spider-Nest Chamber Card */}
      <div className="relative z-10 w-full max-w-3xl rounded-3xl bg-[#0b0e0d]/95 border border-[#47f59c]/35 shadow-[0_32px_80px_-12px_rgba(0,0,0,0.98),0_0_50px_-12px_rgba(71,245,156,0.28),inset_0_1px_0_0_rgba(255,255,255,0.12)] overflow-hidden">
        {/* Top Specular Mint Rim */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-[#47f59c]/70 to-transparent"
        />

        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 p-5 sm:p-6 border-b border-white/[0.07]">
          <div className="flex items-center gap-3.5">
            <div
              style={{ clipPath: HEX_CLIP }}
              className="flex items-center justify-center w-11 h-12 p-[1.5px] bg-gradient-to-b from-[#47f59c] to-[#10b981] shrink-0"
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
                  Node {String(activeIndex + 1).padStart(2, '0')} /{' '}
                  {String(categories.length).padStart(2, '0')}
                </span>
                <span className="text-zinc-600">·</span>
                <span className="font-mono text-[11px] text-zinc-400">
                  {category.skills.length} Connected Tools
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white mt-0.5">
                {category.title}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-xl">
                {category.description}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close spider nest view"
            className="p-2 rounded-full text-zinc-400 bg-white/[0.04] border border-white/[0.08] hover:text-[#47f59c] hover:border-[#47f59c]/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#47f59c]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Interactive Spider-Nest Web Canvas */}
        <div className="p-4 sm:p-6">
          <div className="relative w-full h-[21rem] sm:h-[24rem] rounded-2xl bg-[#060807] border border-[#47f59c]/20 shadow-[inset_0_0_40px_rgba(71,245,156,0.06)] overflow-hidden">
            {/* Radial Center Glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 rounded-full bg-[#47f59c]/[0.15] blur-2xl"
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

            {/* Central Core Hub */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-12 h-12 rounded-full bg-[#0b120e] border border-[#47f59c]/65 text-[#47f59c] shadow-[0_0_28px_rgba(71,245,156,0.55),inset_0_1px_0_rgba(255,255,255,0.25)]"
            >
              <span className="absolute inset-0 rounded-full border border-[#47f59c]/40 animate-ping opacity-40 motion-reduce:hidden" />
              <Icon className="w-5 h-5 relative z-10" />
            </div>

            {/* Skill Vertex Pills Placed on Every Point of the Nest */}
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
                  className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono text-[11px] sm:text-xs font-medium whitespace-nowrap border backdrop-blur-xl transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#47f59c] ${
                    isLit
                      ? 'z-30 scale-110 bg-[#0f2419]/95 text-white border-[#47f59c] shadow-[0_0_22px_rgba(71,245,156,0.6),inset_0_1px_0_rgba(255,255,255,0.3)]'
                      : node.isInner
                      ? 'bg-[#121619]/95 text-zinc-100 border-[#47f59c]/40 shadow-[0_8px_20px_rgba(0,0,0,0.85)] hover:border-[#47f59c]'
                      : 'bg-[#111316]/90 text-zinc-200 border-white/[0.15] shadow-[0_8px_20px_rgba(0,0,0,0.85)] hover:border-[#47f59c]/70'
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
                  <span>{node.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer: Quick Orbit Domain Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 bg-white/[0.02] border-t border-white/[0.07]">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() =>
                onSelectIndex?.(
                  (activeIndex - 1 + categories.length) % categories.length
                )
              }
              aria-label="Previous domain"
              className="p-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-zinc-300 hover:text-[#47f59c] hover:border-[#47f59c]/40 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() =>
                onSelectIndex?.((activeIndex + 1) % categories.length)
              }
              aria-label="Next domain"
              className="p-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-zinc-300 hover:text-[#47f59c] hover:border-[#47f59c]/40 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <span className="ml-2 hidden sm:inline-flex items-center gap-1.5 font-mono text-[11px] text-zinc-400">
              <Sparkles className="w-3 h-3 text-[#47f59c]" />
              Hover any node to illuminate silk connections
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((cat, idx) => (
              <button
                key={cat.id}
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