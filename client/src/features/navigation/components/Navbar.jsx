import { useState, useRef, useEffect, useCallback } from 'react';
import { Download, Menu } from 'lucide-react';
import { BRAND, NAV_ITEMS, RESUME_URL } from '../data/nav.data';
import { MobileDrawer } from './MobileDrawer';

const HEX_CLIP =
  'polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%)';

export function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const [activeNavId, setActiveNavId] = useState(() => NAV_ITEMS[0]?.id || '');
  const clickLockRef = useRef(false);
  const clickTimerRef = useRef(null);

  // Refs for Liquid Glass sliding segmented pill
  const navListRef = useRef(null);
  const itemRefs = useRef({});
  const [activePill, setActivePill] = useState({
    left: 0,
    width: 0,
    ready: false,
  });
  const [hoverPill, setHoverPill] = useState({
    left: 0,
    width: 0,
    visible: false,
  });

  // Single unified RAF scroll listener for active section + floating elevation
  useEffect(() => {
    let rafPending = false;

    const updateFromViewport = () => {
      rafPending = false;
      setIsScrolled(window.scrollY > 24);

      if (clickLockRef.current) return;

      const doc = document.documentElement;
      const nearBottom =
        window.innerHeight + window.scrollY >= doc.scrollHeight - 32;

      if (nearBottom && NAV_ITEMS.length > 0) {
        setActiveNavId(NAV_ITEMS[NAV_ITEMS.length - 1].id);
        return;
      }

      const triggerLine = Math.min(180, window.innerHeight * 0.28);
      let matchedId = NAV_ITEMS[0]?.id || '';

      for (const item of NAV_ITEMS) {
        const targetId = item.href?.replace(/^#/, '') || item.id;
        const sectionEl =
          document.getElementById(targetId) || document.getElementById(item.id);
        if (!sectionEl) continue;

        const { top } = sectionEl.getBoundingClientRect();
        if (top <= triggerLine) {
          matchedId = item.id;
        }
      }

      if (matchedId) {
        setActiveNavId(matchedId);
      }
    };

    const handleAnyScroll = () => {
      if (!rafPending) {
        rafPending = true;
        window.requestAnimationFrame(updateFromViewport);
      }
    };

    updateFromViewport();
    window.addEventListener('scroll', handleAnyScroll, {
      passive: true,
      capture: true,
    });

    return () => {
      window.removeEventListener('scroll', handleAnyScroll, { capture: true });
      if (clickTimerRef.current) window.clearTimeout(clickTimerRef.current);
    };
  }, []);

  const currentActiveId = activeNavId || NAV_ITEMS[0]?.id;

  // Measure exact coordinates relative to the <ul> track
  const measureActivePill = useCallback(() => {
    const listEl = navListRef.current;
    const activeEl = itemRefs.current[currentActiveId];
    if (!listEl || !activeEl) return;

    const listRect = listEl.getBoundingClientRect();
    const activeRect = activeEl.getBoundingClientRect();
    const left = activeRect.left - listRect.left - listEl.clientLeft;

    if (activeRect.width > 0) {
      setActivePill({
        left,
        width: activeRect.width,
        ready: true,
      });
    }
  }, [currentActiveId]);

  useEffect(() => {
    measureActivePill();

    const listEl = navListRef.current;
    if (!listEl) return;

    const resizeObserver = new ResizeObserver(measureActivePill);
    resizeObserver.observe(listEl);

    if (document.fonts?.ready) {
      document.fonts.ready.then(measureActivePill);
    }

    return () => resizeObserver.disconnect();
  }, [measureActivePill]);

  const handleNavClick = (id) => {
    setActiveNavId(id);
    clickLockRef.current = true;
    if (clickTimerRef.current) window.clearTimeout(clickTimerRef.current);
    clickTimerRef.current = window.setTimeout(() => {
      clickLockRef.current = false;
    }, 900);
  };

  const showPreviewPill = (id) => {
    const listEl = navListRef.current;
    const el = itemRefs.current[id];
    if (!listEl || !el) return;

    const listRect = listEl.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();

    setHoverPill({
      left: elRect.left - listRect.left - listEl.clientLeft,
      width: elRect.width,
      visible: true,
    });
  };

  const hidePreviewPill = () => {
    setHoverPill((prev) => ({ ...prev, visible: false }));
  };

  return (
    <>
      <header className="sticky top-4 z-40 w-full px-4 sm:px-6 pointer-events-none">
        <nav
          aria-label="Primary navigation"
          className={`pointer-events-auto relative overflow-hidden flex items-center justify-between h-16 max-w-6xl pl-3 pr-2.5 sm:pl-4 sm:pr-2.5 mx-auto rounded-full backdrop-blur-2xl border transition-all duration-300 ${
            isScrolled
              ? 'bg-[#080b0a]/95 border-[#47f59c]/25 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.98),0_0_28px_-10px_rgba(71,245,156,0.22),inset_0_1px_0_0_rgba(255,255,255,0.1)]'
              : 'bg-[#0b0e0d]/85 border-white/[0.08] shadow-[0_24px_48px_-12px_rgba(0,0,0,0.95),inset_0_1px_0_0_rgba(255,255,255,0.08)]'
          }`}
        >
          {/* Left-Side Subtle Mint Dot Matrix */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 w-64 bg-[radial-gradient(rgba(71,245,156,0.28)_1px,transparent_1px)] [background-size:9px_9px] [mask-image:radial-gradient(ellipse_75%_85%_at_18%_50%,#000_10%,transparent_75%)] opacity-80"
          />

          {/* Top Edge Micro-Sheen */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
          />

          {/* Brand Lockup with Mint Hexagonal Frame */}
          <a
            href="#hero"
            onClick={() => handleNavClick(NAV_ITEMS[0]?.id)}
            className="relative z-10 flex items-center gap-3 py-1 pr-2 rounded-full shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#47f59c]/60"
          >
            <div
              style={{ clipPath: HEX_CLIP }}
              className="relative flex items-center justify-center w-10 h-11 p-[1.5px] bg-gradient-to-b from-[#47f59c] via-[#34d399] to-[#47f59c]/60 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 motion-reduce:transform-none"
            >
              <div
                style={{ clipPath: HEX_CLIP }}
                className="flex items-center justify-center w-full h-full bg-[#0c0e10] overflow-hidden"
              >
                {BRAND.avatarUrl && !imgError ? (
                  <img
                    src={BRAND.avatarUrl}
                    alt={BRAND.name}
                    width="800"
                    height="833"
                    loading="eager"
                    decoding="async"
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover object-top"
                  />
                ) : (
                  <span className="text-xs font-bold tracking-wider text-white group-hover:text-[#47f59c] transition-colors">
                    {BRAND.monogram}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col">
              <span className="relative overflow-hidden inline-flex flex-col h-4 leading-4">
                <span className="text-sm font-semibold tracking-tight text-white transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full motion-reduce:transform-none">
                  {BRAND.name}
                </span>
                <span
                  aria-hidden="true"
                  className="text-sm font-semibold tracking-tight text-[#47f59c] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full motion-reduce:hidden"
                >
                  {BRAND.name}
                </span>
              </span>
              <span className="text-[11px] font-normal text-zinc-400 leading-none mt-1">
                {BRAND.tagline}
              </span>
            </div>
          </a>

          {/* Center Navigation: Liquid Glass Segmented Capsule (lg+ to prevent tablet squeezing) */}
          <ul
            ref={navListRef}
            onMouseLeave={hidePreviewPill}
            onBlur={hidePreviewPill}
            className="relative z-10 hidden lg:flex items-center gap-0.5 p-1 rounded-full bg-white/[0.025] backdrop-blur-xl border border-white/[0.08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_8px_24px_-8px_rgba(0,0,0,0.8)]"
          >
            {/* Outer Track Subtle Emerald Rim Glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-px rounded-full border border-[#47f59c]/25 [mask-image:linear-gradient(to_right,#000_0%,transparent_48%)]"
            />

            {/* Secondary Frosted Hover / Focus Pill */}
            <div
              aria-hidden="true"
              style={{
                transform: `translate3d(${hoverPill.left}px, 0, 0)`,
                width: `${hoverPill.width}px`,
                opacity: hoverPill.visible ? 1 : 0,
                transition:
                  'transform 320ms cubic-bezier(0.22, 1, 0.36, 1), width 320ms cubic-bezier(0.22, 1, 0.36, 1), opacity 200ms ease',
              }}
              className="pointer-events-none absolute top-1 bottom-1 left-0 rounded-full bg-white/[0.06] border border-white/[0.08] motion-reduce:!transition-none"
            />

            {/* Primary Liquid Glass Active Capsule */}
            {activePill.ready && (
              <div
                aria-hidden="true"
                style={{
                  transform: `translate3d(${activePill.left}px, 0, 0)`,
                  width: `${activePill.width}px`,
                  transition:
                    'transform 380ms cubic-bezier(0.22, 1, 0.36, 1), width 380ms cubic-bezier(0.22, 1, 0.36, 1)',
                }}
                className="pointer-events-none absolute top-1 bottom-1 left-0 rounded-full bg-gradient-to-b from-[#47f59c]/[0.24] via-[#47f59c]/[0.12] to-[#10b981]/[0.18] backdrop-blur-md border border-[#47f59c]/55 shadow-[inset_0_1px_1px_rgba(255,255,255,0.38),inset_0_-1px_1px_rgba(71,245,156,0.28),0_0_22px_-2px_rgba(71,245,156,0.38)] motion-reduce:!transition-none"
              >
                {/* Top Curved Glass Specular Glare */}
                <span className="block mx-auto mt-[1px] w-3/5 h-[1.5px] rounded-full bg-gradient-to-r from-transparent via-white/60 to-transparent" />
              </div>
            )}

            {NAV_ITEMS.map((item) => {
              const isActive = currentActiveId === item.id;
              return (
                <li key={item.id} className="relative z-10">
                  <a
                    ref={(el) => {
                      itemRefs.current[item.id] = el;
                    }}
                    href={item.href}
                    onClick={() => handleNavClick(item.id)}
                    onMouseEnter={() => showPreviewPill(item.id)}
                    onFocus={() => showPreviewPill(item.id)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`relative inline-flex items-center justify-center px-3.5 py-1.5 text-[13px] font-medium rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#47f59c]/70 ${
                      isActive
                        ? 'text-[#7efcc0] font-semibold drop-shadow-[0_0_10px_rgba(71,245,156,0.35)]'
                        : 'text-zinc-300 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Right Action: Mint Pill CTA + Mobile/Tablet Drawer Trigger */}
          <div className="relative z-10 flex items-center gap-2 shrink-0">
            <a
              href={RESUME_URL}
              download="Hassan_Maqbool_Resume.pdf"
              className="group hidden sm:inline-flex items-center gap-2.5 p-1.5 pr-4 lg:pr-5 text-[13px] font-semibold tracking-tight text-zinc-950 bg-[#47f59c] rounded-full shadow-[0_0_24px_-4px_rgba(71,245,156,0.45),inset_0_1px_0_rgba(255,255,255,0.6)] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-[#5ef9ab] hover:shadow-[0_0_32px_-2px_rgba(71,245,156,0.65)] hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#47f59c] motion-reduce:transform-none"
            >
              <span className="relative flex items-center justify-center w-8 h-8 rounded-full bg-white text-zinc-950 shadow-sm overflow-hidden shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105">
                <Download className="w-3.5 h-3.5 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-6 motion-reduce:transform-none" />
                <Download
                  aria-hidden="true"
                  className="w-3.5 h-3.5 absolute -translate-y-6 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 motion-reduce:hidden"
                />
              </span>
              <span>Download CV</span>
            </a>

            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-expanded={drawerOpen}
              aria-controls="mobile-nav-drawer"
              aria-label="Open navigation menu"
              className="group p-2.5 rounded-full text-zinc-200 bg-white/[0.06] border border-white/[0.08] hover:text-[#47f59c] hover:border-[#47f59c]/40 active:scale-95 transition-all duration-200 lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#47f59c]"
            >
              <Menu className="w-4 h-4 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-90" />
            </button>
          </div>
        </nav>
      </header>

      <MobileDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        activeId={currentActiveId}
      />
    </>
  );
}