import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Bot,
  BrainCircuit,
  ChevronLeft,
  ChevronRight,
  Code2,
  Cpu,
  Database,
  Globe,
  Layers,
  Network,
  Server,
  ShieldCheck,
  Sparkles,
  Terminal,
  Wifi,
  Wrench,
  X,
} from 'lucide-react';
import { TechNodeIcon } from '../../../shared/components/TechNodeIcon';

const HEX_CLIP =
  'polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%)';

const CHAMFER_CLIP =
  'polygon(16px 0%, calc(100% - 16px) 0%, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0% calc(100% - 16px), 0% 16px)';

const CATEGORY_ICONS = {
  cpu: Cpu,
  brain: BrainCircuit,
  bot: Bot,
  code: Code2,
  globe: Globe,
  server: Server,
  database: Database,
  layers: Layers,
  terminal: Terminal,
  wrench: Wrench,
  shield: ShieldCheck,
  wifi: Wifi,
  sparkles: Sparkles,
};

function CategoryIcon({ iconKey, className = 'w-4 h-4' }) {
  const normalized = String(iconKey || '').toLowerCase();
  const IconComponent = CATEGORY_ICONS[normalized] || Cpu;
  return <IconComponent className={className} />;
}

/**
 * Computes non-overlapping elliptical polar coordinates padded safely for mobile & desktop pills.
 */
function buildSkillWebNodes(skills = []) {
  const total = skills.length;
  if (total === 0) return [];

  const useDualRing = total > 4;
  const innerCount = useDualRing ? Math.ceil(total / 2) : total;
  const outerCount = useDualRing ? total - innerCount : 0;

  return skills.map((entry, idx) => {
    const label = typeof entry === 'string' ? entry : entry.name || entry.label;
    const isInner = !useDualRing || idx < innerCount;
    const ringIndex = isInner ? idx : idx - innerCount;
    const countInRing = isInner ? innerCount : outerCount;

    const angleStep = (Math.PI * 2) / countInRing;
    const baseAngle = -Math.PI / 2 + (isInner ? 0.25 : 0.25 + angleStep / 2);
    const angle = baseAngle + ringIndex * angleStep;

    // Clamped horizontal radius so icon + label pills stay inside container walls on narrow screens
    const rx = useDualRing ? (isInner ? 19 : 29) : 26;
    const ry = useDualRing ? (isInner ? 22 : 37) : 31;

    const x = +(50 + Math.cos(angle) * rx).toFixed(2);
    const y = +(50 + Math.sin(angle) * ry).toFixed(2);

    return {
      label,
      index: idx,
      isInner,
      x,
      y,
    };
  });
}

/**
 * Chamfered Octagonal Orbital Domain Card
 */
export function SkillGroupCard({
  category,
  index,
  isActive = false,
  onSelect,
  onHoverChange,
}) {
  const cardRef = useRef(null);
  const skills = category.skills || [];

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
      aria-label={`${category.title} — Click to weave ${skills.length} skill nodes`}
      onClick={() => onSelect?.(category, index)}
      onKeyDown={handleKeyDown}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => onHoverChange?.(index)}
      onMouseLeave={() => onHoverChange?.(null)}
      onFocus={() => onHoverChange?.(index)}
      onBlur={() => onHoverChange?.(null)}
      className="group relative w-full cursor-pointer select-none focus-visible:outline-none"
    >
      {/* Ambient Mint Glow */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -inset-1 rounded-2xl bg-[#47f59c]/25 blur-xl transition-opacity duration-500 ${
          isActive ? 'opacity-95' : 'opacity-0 group-hover:opacity-75'
        }`}
      />

      {/* Chamfered Octagon Pod Body */}
      <div
        style={{ clipPath: CHAMFER_CLIP }}
        className={`relative p-4 sm:p-5 backdrop-blur-2xl transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03] group-focus-visible:ring-2 group-focus-visible:ring-[#47f59c] motion-reduce:transform-none ${
          isActive
            ? 'bg-[#0e1813]/95'
            : 'bg-[#101316]/92 group-hover:bg-[#121916]/95'
        }`}
      >
        {/* Crisp SVG Chamfered Perimeter Border */}
        <svg
          aria-hidden="true"
          viewBox="0 0 256 164"
          preserveAspectRatio="none"
          fill="none"
          className="pointer-events-none absolute inset-0 w-full h-full"
        >
          <polygon
            points="16,0.75 240,0.75 255.25,16 255.25,148 240,163.25 16,163.25 0.75,148 0.75,16"
            stroke={isActive ? '#47f59c' : 'rgba(255, 255, 255, 0.14)'}
            strokeWidth="1.5"
            className="transition-colors duration-300 group-hover:stroke-[#47f59c]/80"
          />
          <polyline
            points="1,24 1,16 16,1 24,1"
            stroke="#47f59c"
            strokeWidth="2"
            strokeOpacity={isActive ? '1' : '0.6'}
          />
          <polyline
            points="232,163 240,163 255,148 255,140"
            stroke="#47f59c"
            strokeWidth="2"
            strokeOpacity={isActive ? '1' : '0.6'}
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

        {/* Top Row: Hex Domain Icon + Node Count */}
        <div className="relative z-10 flex items-center justify-between gap-2 mb-3">
          <div
            style={{ clipPath: HEX_CLIP }}
            className="flex items-center justify-center w-9 h-10 p-[1px] bg-gradient-to-b from-[#47f59c]/85 to-[#47f59c]/25 transition-transform duration-300 group-hover:scale-110 shrink-0"
          >
            <div
              style={{ clipPath: HEX_CLIP }}
              className="flex items-center justify-center w-full h-full bg-[#0a0f0d] text-[#47f59c]"
            >
              <CategoryIcon iconKey={category.icon} className="w-4 h-4" />
            </div>
          </div>

          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-mono text-[10px] font-semibold tracking-wider uppercase bg-[#47f59c]/10 text-[#47f59c] border border-[#47f59c]/30">
            <Network className="w-2.5 h-2.5" />
            {skills.length} Nodes
          </span>
        </div>

        {/* Category Title & Description */}
        <h3 className="relative z-10 text-sm sm:text-[15px] font-bold tracking-tight text-white leading-snug line-clamp-1 group-hover:text-[#7efcc0] transition-colors">
          {category.title}
        </h3>

        <p className="relative z-10 mt-1 text-xs text-zinc-400 line-clamp-1">
          {category.description}
        </p>

        {/* Footer CTA */}
        <div className="relative z-10 mt-3 pt-2.5 border-t border-white/[0.07] flex items-center justify-between gap-2">
          <span className="font-mono text-[10px] text-zinc-400 truncate">
            {typeof skills[0] === 'string' ? skills[0] : skills[0]?.name}
          </span>
          <span className="shrink-0 font-mono text-[10px] font-semibold tracking-wider uppercase text-[#47f59c] opacity-85 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all">
            Weave →
          </span>
        </div>
      </div>
    </article>
  );
}

/**
 * Expanded Spider-Nest Modal (Core Stack List + Responsive Mobile/Desktop Spider Constellation)
 */
export function SkillSpiderNestModal({
  categories = [],
  activeIndex,
  onClose,
  onSelectIndex,
}) {
  const [hoverState, setHoverState] = useState({ forIndex: null, node: null });
  const hoveredNode =
    hoverState.forIndex === activeIndex ? hoverState.node : null;

  const category =
    typeof activeIndex === 'number' ? categories[activeIndex] : null;

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
    () => buildSkillWebNodes(category?.skills || []),
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

  const setActiveNode = (nodeIdx) =>
    setHoverState({ forIndex: activeIndex, node: nodeIdx });

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${category.title} — Skill Spider Nest`}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
    >
      {/* Frosted Pitch-Black Backdrop */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className="fixed inset-0 bg-[#050607]/85 backdrop-blur-xl transition-opacity"
      />

      {/* Spider-Nest Chamber */}
      <div className="relative z-10 w-full max-w-5xl my-auto rounded-3xl bg-[#0b0e0d]/95 border border-[#47f59c]/35 shadow-[0_32px_80px_-12px_rgba(0,0,0,0.98),0_0_50px_-12px_rgba(71,245,156,0.28),inset_0_1px_0_0_rgba(255,255,255,0.12)] overflow-hidden">
        {/* Top Specular Mint Rim */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-[#47f59c]/70 to-transparent"
        />

        {/* Modal Header */}
        <div className="flex items-start justify-between gap-3 p-4 sm:p-6 border-b border-white/[0.07]">
          <div className="flex items-start gap-3 sm:gap-3.5 min-w-0">
            <div
              style={{ clipPath: HEX_CLIP }}
              className="flex items-center justify-center w-10 h-11 sm:w-11 sm:h-12 p-[1.5px] bg-gradient-to-b from-[#47f59c] to-[#10b981] shrink-0 mt-0.5"
            >
              <div
                style={{ clipPath: HEX_CLIP }}
                className="flex items-center justify-center w-full h-full bg-[#090d0b] text-[#47f59c]"
              >
                <CategoryIcon iconKey={category.icon} className="w-5 h-5" />
              </div>
            </div>

            <div className="min-w-0">
              <span className="font-mono text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase text-[#47f59c]">
                Domain Hub {String(activeIndex + 1).padStart(2, '0')} /{' '}
                {String(categories.length).padStart(2, '0')}
              </span>

              <h3 className="text-lg sm:text-2xl font-bold tracking-tight text-white mt-0.5">
                {category.title}
              </h3>

              {category.description && (
                <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-2xl">
                  {category.description}
                </p>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close skill spider nest"
            className="shrink-0 p-2 rounded-full text-zinc-400 bg-white/[0.04] border border-white/[0.08] hover:text-[#47f59c] hover:border-[#47f59c]/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#47f59c]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Two-Column Body: Core Stack List + Spider Constellation */}
        <div className="grid lg:grid-cols-12 gap-5 sm:gap-6 p-4 sm:p-6">
          {/* Left Column: Core Stack & Tooling List (Syncs with Constellation on Tap/Hover) */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="flex items-center gap-2 mb-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#47f59c] shadow-[0_0_8px_#47f59c]" />
              <h4 className="font-mono text-[11px] font-semibold tracking-[0.18em] uppercase text-[#47f59c]">
                Core Stack &amp; Tooling
              </h4>
            </div>

            <ul className="space-y-2">
              {webNodes.map((node) => {
                const isLit = hoveredNode === node.index;
                return (
                  <li key={`list-${node.label}`}>
                    <button
                      type="button"
                      onClick={() =>
                        setActiveNode(isLit ? null : node.index)
                      }
                      onMouseEnter={() => setActiveNode(node.index)}
                      onMouseLeave={() => setActiveNode(null)}
                      onFocus={() => setActiveNode(node.index)}
                      onBlur={() => setActiveNode(null)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border text-left font-mono text-xs transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#47f59c] ${
                        isLit
                          ? 'bg-[#0f2419]/90 border-[#47f59c] text-white shadow-[0_0_20px_rgba(71,245,156,0.28)]'
                          : 'bg-white/[0.025] border-white/[0.07] text-zinc-200 hover:border-[#47f59c]/45'
                      }`}
                    >
                      <span
                        className={`flex items-center justify-center w-7 h-7 rounded-lg border shrink-0 transition-colors ${
                          isLit
                            ? 'bg-[#47f59c]/15 border-[#47f59c]/60 text-[#7efcc0]'
                            : 'bg-[#0a0f0d] border-white/[0.08] text-[#47f59c]'
                        }`}
                      >
                        <TechNodeIcon
                          label={node.label}
                          className="w-3.5 h-3.5"
                        />
                      </span>
                      <span className="truncate">{node.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right Column: Interactive Spider-Nest Canvas (Explicit Height Fixed for Mobile) */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="flex items-center justify-between gap-2 mb-2.5">
              <span className="font-mono text-[11px] font-semibold tracking-[0.14em] uppercase text-zinc-400">
                Skill Constellation ({webNodes.length} Nodes)
              </span>
              <span className="font-mono text-[10px] text-[#47f59c] shrink-0">
                <span className="sm:hidden">Tap nodes</span>
                <span className="hidden sm:inline">Hover nodes to trace silk</span>
              </span>
            </div>

            <div className="relative w-full h-[22rem] sm:h-[26rem] min-h-[22rem] shrink-0 lg:flex-1 rounded-2xl bg-[#060807] border border-[#47f59c]/20 shadow-[inset_0_0_40px_rgba(71,245,156,0.06)] overflow-hidden">
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
                  rx="14"
                  ry="14"
                  fill="none"
                  stroke="rgba(71, 245, 156, 0.16)"
                  strokeWidth="0.35"
                  strokeDasharray="1.5 1.5"
                />
                <ellipse
                  cx="50"
                  cy="50"
                  rx="28"
                  ry="29"
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

              {/* Central Domain Hub */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#0b120e] border border-[#47f59c]/65 text-[#47f59c] shadow-[0_0_28px_rgba(71,245,156,0.55),inset_0_1px_0_rgba(255,255,255,0.25)]"
              >
                <span className="absolute inset-0 rounded-full border border-[#47f59c]/40 animate-ping opacity-40 motion-reduce:hidden" />
                <CategoryIcon
                  iconKey={category.icon}
                  className="w-4 h-4 sm:w-5 sm:h-5 relative z-10"
                />
              </div>

              {/* Skill Vertex Nodes with Icons */}
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
                    onClick={() => setActiveNode(isLit ? null : node.index)}
                    onMouseEnter={() => setActiveNode(node.index)}
                    onMouseLeave={() => setActiveNode(null)}
                    onFocus={() => setActiveNode(node.index)}
                    onBlur={() => setActiveNode(null)}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 flex items-center gap-1 sm:gap-1.5 max-w-[112px] sm:max-w-[165px] px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-full font-mono text-[9px] sm:text-[11px] font-medium border backdrop-blur-xl transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#47f59c] ${
                      isLit
                        ? 'z-30 scale-105 bg-[#0f2419]/95 text-white border-[#47f59c] shadow-[0_0_22px_rgba(71,245,156,0.6),inset_0_1px_0_rgba(255,255,255,0.3)]'
                        : node.isInner
                        ? 'bg-[#121619]/95 text-zinc-100 border-[#47f59c]/40 shadow-[0_8px_20px_rgba(0,0,0,0.85)] hover:border-[#47f59c]'
                        : 'bg-[#111316]/90 text-zinc-200 border-white/[0.15] shadow-[0_8px_20px_rgba(0,0,0,0.85)] hover:border-[#47f59c]/70'
                    }`}
                  >
                    <span
                      className={`flex items-center justify-center shrink-0 transition-transform duration-300 ${
                        isLit
                          ? 'text-[#7efcc0] scale-110 drop-shadow-[0_0_6px_rgba(71,245,156,0.75)]'
                          : 'text-[#47f59c]'
                      }`}
                    >
                      <TechNodeIcon
                        label={node.label}
                        className="w-3 h-3 sm:w-3.5 sm:h-3.5"
                      />
                    </span>
                    <span className="truncate">{node.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer: Domain Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-5 py-3.5 sm:py-4 bg-white/[0.02] border-t border-white/[0.07]">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() =>
                onSelectIndex?.(
                  (activeIndex - 1 + categories.length) % categories.length
                )
              }
              aria-label="Previous skill domain"
              className="p-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-zinc-300 hover:text-[#47f59c] hover:border-[#47f59c]/40 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() =>
                onSelectIndex?.((activeIndex + 1) % categories.length)
              }
              aria-label="Next skill domain"
              className="p-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-zinc-300 hover:text-[#47f59c] hover:border-[#47f59c]/40 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <span className="ml-2 hidden sm:inline-flex items-center gap-1.5 font-mono text-[11px] text-zinc-400">
              <Sparkles className="w-3 h-3 text-[#47f59c]" />
              Use ← / → keys to switch skill hubs
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((cat, idx) => (
              <button
                key={cat.id || idx}
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