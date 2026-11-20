import { useRef } from 'react';
import { ArrowUp, ArrowUpRight, Radio } from 'lucide-react';
import {
  GitHubIcon,
  LinkedInIcon,
} from '../../../shared/components/SocialIcons';
import { BRAND, NAV_ITEMS, SOCIAL_LINKS } from '../../navigation/data/nav.data';
import { ParticleCanvas } from '../../../shared/components/ParticleCanvas';

const HEX_CLIP =
  'polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%)';

function SocialFooterIcon({ id, className = 'w-4 h-4' }) {
  if (id === 'github') return <GitHubIcon className={className} />;
  if (id === 'linkedin') return <LinkedInIcon className={className} />;
  return null;
}

export function Footer() {
  const deckRef = useRef(null);
  const currentYear = new Date().getFullYear();

  const handleMouseMove = (e) => {
    const deck = deckRef.current;
    if (!deck) return;
    const rect = deck.getBoundingClientRect();
    deck.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    deck.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  const handleScrollTop = () => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <footer className="relative overflow-hidden bg-[#060708] border-t border-white/[0.07]">
      {/* Top Mint Specular Horizon Beam */}
      {/* Ambient Constellation Layer */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-65 [mask-image:radial-gradient(ellipse_90%_80%_at_50%_45%,#000_55%,transparent_100%)]"
          >
            <ParticleCanvas linkDistance={140} mouseRadius={200} />
          </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#47f59c]/45 to-transparent"
      />

      {/* Bottom Upward Electric-Mint Ambient Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 left-1/2 -translate-x-1/2 w-[48rem] h-[18rem] rounded-full bg-[radial-gradient(circle,rgba(71,245,156,0.09)_0%,rgba(16,185,129,0.02)_50%,transparent_75%)] blur-3xl"
      />

      {/* Radial-Masked Mint Micro-Dot Matrix */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(71,245,156,0.12)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_80%_75%_at_50%_60%,#000_30%,transparent_100%)]"
      />

      <div className="relative z-10 max-w-6xl px-6 py-14 lg:py-16 mx-auto">
        {/* Main Obsidian-Mint Command Deck */}
        <div
          ref={deckRef}
          onMouseMove={handleMouseMove}
          className="group relative p-6 sm:p-8 rounded-3xl bg-[#0b0e0d]/90 backdrop-blur-2xl border border-white/[0.08] shadow-[0_24px_60px_-15px_rgba(0,0,0,0.95),inset_0_1px_0_0_rgba(255,255,255,0.09)] overflow-hidden"
        >
          {/* Top Inner Specular Highlight */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-14 top-0 h-px bg-gradient-to-r from-transparent via-[#47f59c]/50 to-transparent"
          />

          {/* Corner Aerospace Brackets */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-3 left-3 w-3.5 h-3.5 border-t-2 border-l-2 border-[#47f59c]/55 rounded-tl-sm"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-3 right-3 w-3.5 h-3.5 border-b-2 border-r-2 border-[#47f59c]/55 rounded-br-sm"
          />

          {/* Cursor-Tracking Mint Spotlight */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 motion-reduce:hidden"
            style={{
              background:
                'radial-gradient(460px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(71, 245, 156, 0.085), transparent 50%)',
            }}
          />

          <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            {/* Brand Core Hub */}
            <div className="flex items-center gap-4">
              <div className="relative flex items-center justify-center w-12 h-12 shrink-0">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-full border border-dashed border-[#47f59c]/40 animate-[spin_22s_linear_infinite] motion-reduce:animate-none"
                />
                <div
                  style={{ clipPath: HEX_CLIP }}
                  className="flex items-center justify-center w-10 h-11 p-[1.5px] bg-gradient-to-b from-[#47f59c] to-[#10b981] shadow-[0_0_24px_rgba(71,245,156,0.35)]"
                >
                  <span
                    style={{ clipPath: HEX_CLIP }}
                    className="flex items-center justify-center w-full h-full bg-[#090d0b] font-mono text-sm font-bold tracking-wider text-[#47f59c]"
                  >
                    {BRAND.monogram}
                  </span>
                </div>
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-base font-bold tracking-tight text-white">
                    {BRAND.name}
                  </p>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-mono text-[9px] font-semibold tracking-widest uppercase bg-[#47f59c]/12 text-[#47f59c] border border-[#47f59c]/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#47f59c] animate-pulse" />
                    Online
                  </span>
                </div>
                <p className="mt-0.5 text-xs sm:text-sm text-zinc-400">
                  {BRAND.tagline}
                </p>
              </div>
            </div>

            {/* Tethered Section Waypoints */}
            <nav aria-label="Footer navigation" className="relative">
              {/* Connecting Silk Filament Behind Waypoint Pills (Desktop) */}
              <div
                aria-hidden="true"
                className="hidden sm:block pointer-events-none absolute inset-x-4 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-[#47f59c]/25 to-transparent"
              />

              <ul className="relative z-10 flex flex-wrap items-center gap-2">
                {NAV_ITEMS.map((item) => (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      className="group/link inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono text-xs text-zinc-300 bg-[#070908]/95 border border-white/[0.09] hover:text-white hover:border-[#47f59c]/50 hover:shadow-[0_0_16px_-4px_rgba(71,245,156,0.45)] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#47f59c]"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-600 group-hover/link:bg-[#47f59c] group-hover/link:shadow-[0_0_8px_#47f59c] transition-all" />
                      <span>{item.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Return-to-Orbit Thruster Button */}
            <button
              type="button"
              onClick={handleScrollTop}
              aria-label="Scroll smoothly back to top"
              className="group/top inline-flex items-center gap-2 self-start lg:self-auto px-4 py-2.5 rounded-full font-mono text-xs font-semibold tracking-wider uppercase text-zinc-950 bg-[#47f59c] shadow-[0_0_24px_-4px_rgba(71,245,156,0.5)] hover:bg-[#5ef9ab] hover:shadow-[0_0_32px_-2px_rgba(71,245,156,0.75)] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#47f59c] focus-visible:ring-offset-2 focus-visible:ring-offset-[#060708]"
            >
              <span>Return Top</span>
              <ArrowUp className="w-3.5 h-3.5 transition-transform duration-200 group-hover/top:-translate-y-0.5" />
            </button>
          </div>
        </div>

        {/* Bottom Telemetry & Social Bar */}
        <div className="flex flex-col gap-4 pt-8 mt-8 border-t border-white/[0.06] sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-zinc-500">
            <span>
              © {currentYear}{' '}
              <strong className="font-semibold text-zinc-300">
                {BRAND.name}
              </strong>
            </span>
            <span className="text-zinc-700">·</span>
            <span className="inline-flex items-center gap-1.5 text-zinc-400">
              <Radio className="w-3 h-3 text-[#47f59c]" />
              Engineered with React, Vite & Tailwind CSS
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.id}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="group/social inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono text-xs text-zinc-300 bg-white/[0.03] border border-white/[0.09] hover:text-white hover:bg-[#0f2419]/80 hover:border-[#47f59c]/45 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#47f59c]"
              >
                <span className="text-[#47f59c]">
                  <SocialFooterIcon id={social.id} className="w-3.5 h-3.5" />
                </span>
                <span>{social.label}</span>
                <ArrowUpRight className="w-3 h-3 text-zinc-500 group-hover/social:text-[#47f59c] group-hover/social:translate-x-0.5 group-hover/social:-translate-y-0.5 transition-transform" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}