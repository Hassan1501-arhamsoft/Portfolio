import { useCallback, useEffect, useRef, useState } from 'react';
import {
  BrainCircuit,
  Code2,
  Cpu,
  LayoutGrid,
  Sparkles,
} from 'lucide-react';

function getCategoryIcon(category = '') {
  const normalized = category.toLowerCase();
  if (normalized === 'all') return LayoutGrid;
  if (normalized.includes('ai') || normalized.includes('rag')) return BrainCircuit;
  if (normalized.includes('full') || normalized.includes('web')) return Code2;
  if (normalized.includes('iot') || normalized.includes('real-time')) return Cpu;
  return Sparkles;
}

export function ProjectFilter({
  categories = [],
  activeCategory,
  onSelectCategory,
  counts = {},
}) {
  const dockRef = useRef(null);
  const buttonRefs = useRef({});

  const [activeGlider, setActiveGlider] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    ready: false,
  });

  const [hoverGlider, setHoverGlider] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    visible: false,
  });

  const measureActiveGlider = useCallback(() => {
    const dockEl = dockRef.current;
    const activeEl = buttonRefs.current[activeCategory];
    if (!dockEl || !activeEl) return;

    const dockRect = dockEl.getBoundingClientRect();
    const btnRect = activeEl.getBoundingClientRect();

    if (btnRect.width > 0 && btnRect.height > 0) {
      setActiveGlider({
        left: btnRect.left - dockRect.left - dockEl.clientLeft,
        top: btnRect.top - dockRect.top - dockEl.clientTop,
        width: btnRect.width,
        height: btnRect.height,
        ready: true,
      });
    }
  }, [activeCategory]);

  useEffect(() => {
    measureActiveGlider();

    const dockEl = dockRef.current;
    if (!dockEl || typeof ResizeObserver === 'undefined') return;

    const observer = new ResizeObserver(measureActiveGlider);
    observer.observe(dockEl);

    if (document.fonts?.ready) {
      document.fonts.ready.then(measureActiveGlider);
    }

    return () => observer.disconnect();
  }, [measureActiveGlider, categories]);

  const handleDockMouseMove = (e) => {
    const dock = dockRef.current;
    if (!dock) return;
    const rect = dock.getBoundingClientRect();
    dock.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    dock.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  const showHoverGlider = (category) => {
    const dockEl = dockRef.current;
    const btnEl = buttonRefs.current[category];
    if (!dockEl || !btnEl) return;

    const dockRect = dockEl.getBoundingClientRect();
    const btnRect = btnEl.getBoundingClientRect();

    setHoverGlider({
      left: btnRect.left - dockRect.left - dockEl.clientLeft,
      top: btnRect.top - dockRect.top - dockEl.clientTop,
      width: btnRect.width,
      height: btnRect.height,
      visible: true,
    });
  };

  const hideHoverGlider = () => {
    setHoverGlider((prev) => ({ ...prev, visible: false }));
  };

  if (categories.length === 0) return null;

  return (
    <div className="flex justify-center mb-10 sm:mb-12">
      <div
        ref={dockRef}
        role="group"
        aria-label="Filter projects by category"
        onMouseMove={handleDockMouseMove}
        onMouseLeave={hideHoverGlider}
        onBlur={hideHoverGlider}
        className="group/dock relative inline-flex flex-wrap items-center justify-center gap-1.5 p-1.5 rounded-2xl sm:rounded-full bg-[#0b0e0d]/90 backdrop-blur-2xl border border-white/[0.09] shadow-[0_20px_48px_-12px_rgba(0,0,0,0.92),inset_0_1px_0_0_rgba(255,255,255,0.09)] overflow-hidden"
      >
        {/* Top Specular Mint Rim */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#47f59c]/45 to-transparent"
        />

        {/* Cursor-Tracking Ambient Spotlight */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover/dock:opacity-100 motion-reduce:hidden"
          style={{
            background:
              'radial-gradient(240px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(71, 245, 156, 0.12), transparent 60%)',
          }}
        />

        {/* Secondary Frosted Hover / Focus Glider */}
        <div
          aria-hidden="true"
          style={{
            transform: `translate3d(${hoverGlider.left}px, ${hoverGlider.top}px, 0)`,
            width: `${hoverGlider.width}px`,
            height: `${hoverGlider.height}px`,
            opacity: hoverGlider.visible ? 1 : 0,
            transition:
              'transform 280ms cubic-bezier(0.22, 1, 0.36, 1), width 280ms cubic-bezier(0.22, 1, 0.36, 1), height 280ms cubic-bezier(0.22, 1, 0.36, 1), opacity 180ms ease',
          }}
          className="pointer-events-none absolute top-0 left-0 rounded-xl sm:rounded-full bg-white/[0.06] border border-white/[0.09] motion-reduce:!transition-none"
        />

        {/* Primary Liquid Glass Active Glider */}
        {activeGlider.ready && (
          <div
            aria-hidden="true"
            style={{
              transform: `translate3d(${activeGlider.left}px, ${activeGlider.top}px, 0)`,
              width: `${activeGlider.width}px`,
              height: `${activeGlider.height}px`,
              transition:
                'transform 360ms cubic-bezier(0.22, 1, 0.36, 1), width 360ms cubic-bezier(0.22, 1, 0.36, 1), height 360ms cubic-bezier(0.22, 1, 0.36, 1)',
            }}
            className="pointer-events-none absolute top-0 left-0 rounded-xl sm:rounded-full bg-gradient-to-b from-[#47f59c]/[0.26] via-[#47f59c]/[0.14] to-[#10b981]/[0.2] backdrop-blur-md border border-[#47f59c]/65 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),inset_0_-1px_1px_rgba(71,245,156,0.28),0_0_24px_-4px_rgba(71,245,156,0.45)] motion-reduce:!transition-none"
          >
            {/* Top Glass Specular Glare */}
            <span className="block mx-auto mt-[1px] w-3/5 h-[1.5px] rounded-full bg-gradient-to-r from-transparent via-white/65 to-transparent" />
          </div>
        )}

        {categories.map((category) => {
          const isActive = activeCategory === category;
          const count = counts[category] ?? 0;
          const Icon = getCategoryIcon(category);

          return (
            <button
              key={category}
              ref={(el) => {
                buttonRefs.current[category] = el;
              }}
              type="button"
              aria-pressed={isActive}
              onClick={() => onSelectCategory(category)}
              onMouseEnter={() => showHoverGlider(category)}
              onFocus={() => showHoverGlider(category)}
              className={`group/btn relative z-10 inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl sm:rounded-full font-mono text-[11px] sm:text-xs font-semibold tracking-wider uppercase transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#47f59c] ${
                isActive
                  ? 'text-white drop-shadow-[0_0_10px_rgba(71,245,156,0.3)]'
                  : 'text-zinc-400 hover:text-zinc-100'
              }`}
            >
              <Icon
                aria-hidden="true"
                className={`w-3.5 h-3.5 shrink-0 transition-all duration-200 ${
                  isActive
                    ? 'text-[#47f59c] drop-shadow-[0_0_6px_rgba(71,245,156,0.75)]'
                    : 'text-zinc-500 group-hover/btn:text-[#47f59c]'
                }`}
              />

              <span>{category}</span>

              <span
                className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold tabular-nums transition-all duration-200 ${
                  isActive
                    ? 'bg-[#47f59c] text-zinc-950 shadow-[0_0_12px_rgba(71,245,156,0.6)]'
                    : 'bg-white/[0.06] text-zinc-300 border border-white/[0.07] group-hover/btn:border-[#47f59c]/35 group-hover/btn:text-[#47f59c]'
                }`}
              >
                {String(count).padStart(2, '0')}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}