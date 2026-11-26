import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Download, X } from 'lucide-react';
import { BRAND, NAV_ITEMS, RESUME_URL } from '../data/nav.data';

const HEX_CLIP =
  'polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%)';

export function MobileDrawer({ isOpen, onClose, activeId, onSelect }) {
  const [imgError, setImgError] = useState(false);
  const closeBtnRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousFocused = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusRaf = window.requestAnimationFrame(() => {
      closeBtnRef.current?.focus();
    });

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.cancelAnimationFrame(focusRaf);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      if (previousFocused instanceof HTMLElement) {
        previousFocused.focus();
      }
    };
  }, [isOpen, onClose]);

  const handleLinkClick = (id) => {
    onSelect?.(id);
    onClose();
  };

  const tabIndex = isOpen ? 0 : -1;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-hidden={!isOpen}
      inert={!isOpen}
      aria-label="Mobile navigation"
      className={`fixed inset-0 z-50 lg:hidden transition-[visibility] duration-300 ${
        isOpen ? 'visible pointer-events-auto' : 'invisible pointer-events-none'
      }`}
    >
      {/* Pitch-Black Frosted Backdrop */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`fixed inset-0 bg-[#060708]/80 backdrop-blur-md transition-opacity duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Detached Floating Glass Drawer */}
      <aside
        id="mobile-nav-drawer"
        className={`fixed inset-y-3 right-3 w-80 max-w-[86vw] rounded-3xl bg-[#111316]/95 backdrop-blur-2xl border border-white/[0.08] shadow-[0_24px_60px_-12px_rgba(0,0,0,0.95),inset_0_1px_0_0_rgba(255,255,255,0.08)] p-5 flex flex-col justify-between overflow-hidden transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
          isOpen ? 'translate-x-0' : 'translate-x-[calc(100%+1.5rem)]'
        }`}
      >
        {/* Top Mint Dot Matrix Accent */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[radial-gradient(rgba(71,245,156,0.22)_1px,transparent_1px)] [background-size:10px_10px] [mask-image:radial-gradient(ellipse_85%_80%_at_30%_0%,#000_10%,transparent_75%)] opacity-80"
        />

        {/* Top Specular Edge */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
        />

        {/* Pinned Header with Hexagonal Brand Lockup */}
        <div className="relative z-10 shrink-0 flex items-center justify-between pb-4 border-b border-white/[0.07]">
          <a
            href="#hero"
            tabIndex={tabIndex}
            onClick={() => handleLinkClick(NAV_ITEMS[0]?.id)}
            className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#47f59c]/60 rounded-full"
          >
            <div
              style={{ clipPath: HEX_CLIP }}
              className="flex items-center justify-center w-9 h-10 p-[1.5px] bg-gradient-to-b from-[#47f59c] via-[#34d399] to-[#47f59c]/60"
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
                    loading="lazy"
                    decoding="async"
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover object-top"
                  />
                ) : (
                  <span className="text-[11px] font-bold tracking-wider text-white">
                    {BRAND.monogram}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-sm font-semibold tracking-tight text-white leading-none">
                {BRAND.name}
              </span>
              <span className="text-[11px] text-zinc-400 mt-1 leading-none">
                {BRAND.tagline}
              </span>
            </div>
          </a>

          <button
            ref={closeBtnRef}
            type="button"
            tabIndex={tabIndex}
            onClick={onClose}
            aria-label="Close navigation menu"
            className="group p-2 rounded-full text-zinc-400 bg-white/[0.04] border border-white/[0.08] hover:text-[#47f59c] hover:border-[#47f59c]/40 active:scale-95 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#47f59c]"
          >
            <X className="w-4 h-4 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-90" />
          </button>
        </div>

        {/* Scrollable Staggered Navigation List (Prevents Clipping on Short Viewports) */}
        <ul className="relative z-10 flex-1 min-h-0 overflow-y-auto py-4 space-y-1.5">
          {NAV_ITEMS.map((item, idx) => {
            const isActive = activeId === item.id;
            return (
              <li
                key={item.id}
                style={{ transitionDelay: isOpen ? `${idx * 45 + 60}ms` : '0ms' }}
                className={`transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-x-0 ${
                  isOpen
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 translate-x-4'
                }`}
              >
                <a
                  href={item.href}
                  tabIndex={tabIndex}
                  onClick={() => handleLinkClick(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`group flex items-center justify-between px-3.5 py-2.5 sm:py-3 rounded-2xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#47f59c]/60 ${
                    isActive
                      ? 'bg-[#47f59c]/[0.1] text-white border border-[#47f59c]/30 shadow-[inset_0_1px_0_0_rgba(71,245,156,0.15)]'
                      : 'text-zinc-400 border border-transparent hover:text-zinc-100 hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`font-mono text-[11px] ${
                        isActive
                          ? 'text-[#47f59c]'
                          : 'text-zinc-600 group-hover:text-zinc-400'
                      }`}
                    >
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span>{item.label}</span>
                  </div>

                  {isActive ? (
                    <span
                      aria-hidden="true"
                      className="w-1.5 h-1.5 rounded-full bg-[#47f59c] shadow-[0_0_8px_#47f59c]"
                    />
                  ) : (
                    <ArrowUpRight className="w-3.5 h-3.5 text-zinc-600 opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-zinc-300" />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Pinned Bottom Mint Pill CTA */}
        <div className="relative z-10 shrink-0 pt-4 border-t border-white/[0.07]">
          <a
            href={RESUME_URL}
            tabIndex={tabIndex}
            download="Hassan_Maqbool_Resume.pdf"
            onClick={onClose}
            className="group flex items-center justify-between w-full p-1.5 pr-5 text-sm font-semibold tracking-tight text-zinc-950 bg-[#47f59c] rounded-full shadow-[0_0_24px_-4px_rgba(71,245,156,0.45)] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-[#5ef9ab] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#47f59c]"
          >
            <span className="flex items-center justify-center w-9 h-9 rounded-full bg-white text-zinc-950 shadow-sm shrink-0">
              <Download className="w-4 h-4 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0.5" />
            </span>
            <span>Download CV</span>
            <span aria-hidden="true" className="w-4" />
          </a>
        </div>
      </aside>
    </div>
  );
}