import {
  ArrowRight,
  GraduationCap,
  Mail,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { ParticleCanvas } from '../../../shared/components/ParticleCanvas';
import {
  GitHubIcon,
  LinkedInIcon,
} from '../../../shared/components/SocialIcons';
import { SOCIAL_LINKS } from '../../navigation/data/nav.data';
import { HERO_DATA } from '../data/hero.data';
import { ProfileCard } from './ProfileCard';

const SOCIAL_ICON_MAP = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
};

const SOCIAL_SUBTITLES = {
  github: 'Contributions',
  linkedin: "Let's Connect",
};

export function HeroSection() {
  // const { profileCard } = HERO_DATA;

  // Split name into crisp white first name + electric mint last name
  const nameParts = HERO_DATA.name.trim().split(' ');
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(' ');

  // Highlight MERN and AI keywords inside the role string
  const roleTokens = HERO_DATA.role.split(/\b(MERN|AI)\b/);

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-[#060708] border-b border-white/[0.06]"
    >
      {/* Scoped Hero Entrance, Underline Draw & CTA Shimmer Animations */}
      <style>{`
        @keyframes hero-reveal-up {
          0% {
            opacity: 0;
            transform: translateY(18px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes draw-mint-swoosh {
          0% {
            stroke-dashoffset: 320;
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          100% {
            stroke-dashoffset: 0;
            opacity: 1;
          }
        }
        @keyframes cta-light-sweep {
          0%, 65% {
            transform: translateX(-140%) skewX(-20deg);
          }
          100% {
            transform: translateX(260%) skewX(-20deg);
          }
        }
        @keyframes pill-ambient-pulse {
          0%, 100% {
            box-shadow: inset 0 1px 0 0 rgba(71, 245, 156, 0.2), 0 0 18px -4px rgba(71, 245, 156, 0.18);
          }
          50% {
            box-shadow: inset 0 1px 0 0 rgba(71, 245, 156, 0.35), 0 0 26px -2px rgba(71, 245, 156, 0.35);
          }
        }
        .hero-stagger {
          opacity: 0;
          animation: hero-reveal-up 0.75s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .mint-swoosh-path {
          stroke-dasharray: 320;
          stroke-dashoffset: 320;
          animation: draw-mint-swoosh 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.45s forwards;
        }
        .cta-sweep-bar {
          animation: cta-light-sweep 4.2s cubic-bezier(0.22, 1, 0.36, 1) infinite;
        }
        .status-pill-glow {
          animation: pill-ambient-pulse 3.5s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-stagger {
            opacity: 1 !important;
            animation: none !important;
            transform: none !important;
          }
          .mint-swoosh-path {
            stroke-dashoffset: 0 !important;
            opacity: 1 !important;
            animation: none !important;
          }
          .cta-sweep-bar,
          .status-pill-glow {
            animation: none !important;
          }
        }
      `}</style>

      {/* Interactive Spider-Web Constellation Layer */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-95 [mask-image:radial-gradient(ellipse_90%_80%_at_50%_45%,#000_55%,transparent_100%)]"
      >
        <ParticleCanvas linkDistance={140} mouseRadius={200} />
      </div>

      {/* Reference Dark Emerald Edge Vignettes */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-28 -left-32 w-[34rem] h-[28rem] rounded-full bg-[#47f59c]/[0.11] blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-10 right-0 w-[42rem] h-[34rem] rounded-full bg-[radial-gradient(circle,rgba(71,245,156,0.14)_0%,rgba(16,185,129,0.04)_45%,transparent_72%)] blur-2xl"
      />

      <div className="relative z-10 max-w-6xl px-6 pt-12 pb-16 mx-auto lg:pt-20 lg:pb-0">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: High-Contrast Animated Positioning & Actions */}
          <div className="lg:col-span-6 space-y-6 lg:pb-24">
            {/* Glowing Availability Pill with Lightning Accent */}
            <div
              style={{ animationDelay: '60ms' }}
              className="hero-stagger status-pill-glow inline-flex items-center gap-2.5 px-4 py-1.5 text-xs font-medium tracking-wide text-zinc-100 rounded-full bg-[#0a140f]/95 border border-[#47f59c]/40 backdrop-blur-md"
            >
              <span className="relative flex w-2 h-2">
                <span className="absolute inline-flex w-full h-full rounded-full opacity-75 bg-[#47f59c] animate-ping motion-reduce:hidden" />
                <span className="relative inline-flex w-2 h-2 rounded-full bg-[#47f59c] shadow-[0_0_10px_#47f59c]" />
              </span>
              <span>{HERO_DATA.availability}</span>
              <Zap
                aria-hidden="true"
                className="w-3.5 h-3.5 text-[#47f59c] fill-[#47f59c] drop-shadow-[0_0_6px_rgba(71,245,156,0.8)]"
              />
            </div>

            {/* Two-Tone Display Headline + Animated Curved Swoosh */}
            <div
              style={{ animationDelay: '150ms' }}
              className="hero-stagger space-y-3"
            >
              <h1 className="text-4xl font-bold tracking-[-0.035em] leading-[1.08] text-white sm:text-5xl lg:text-[3.85rem]">
                <span>{firstName} </span>
                {lastName && (
                  <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#5ef9ab] via-[#47f59c] to-[#10b981] drop-shadow-[0_0_28px_rgba(71,245,156,0.22)]">
                    {lastName}
                    {/* Animated Curved Mint Underline Swoosh */}
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 280 18"
                      fill="none"
                      preserveAspectRatio="none"
                      className="pointer-events-none absolute -bottom-2 left-0 w-full h-3.5 overflow-visible"
                    >
                      <path
                        d="M3 13.5C74 4.5 198 3.5 277 11.5"
                        stroke="url(#mintSwooshGrad)"
                        strokeWidth="3.2"
                        strokeLinecap="round"
                        className="mint-swoosh-path"
                      />
                      <defs>
                        <linearGradient
                          id="mintSwooshGrad"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="0%"
                        >
                          <stop offset="0%" stopColor="#47f59c" />
                          <stop offset="65%" stopColor="#34d399" />
                          <stop offset="100%" stopColor="#10b981" stopOpacity="0.4" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </span>
                )}
              </h1>

              {/* Role Subtitle with Inline Mint Keyword Accents */}
              <p className="pt-1 text-lg font-medium tracking-tight text-zinc-100 sm:text-[1.4rem]">
                {roleTokens.map((part, idx) =>
                  part === 'MERN' || part === 'AI' ? (
                    <span
                      key={idx}
                      className="font-semibold text-[#47f59c]"
                    >
                      {part}
                    </span>
                  ) : (
                    <span key={idx}>{part}</span>
                  )
                )}
              </p>
            </div>

            {/* Concise Engineering Summary */}
            <p
              style={{ animationDelay: '240ms' }}
              className="hero-stagger max-w-lg text-sm leading-relaxed text-zinc-300/90 sm:text-[15px]"
            >
              {HERO_DATA.summary}
            </p>

            {/* Primary Mint Gradient Pill CTA (With Periodic Light Sweep) + Contact Pill */}
            <div
              style={{ animationDelay: '330ms' }}
              className="hero-stagger flex flex-wrap items-center gap-4 pt-2"
            >
              <a
                href={HERO_DATA.primaryCta.href}
                className="group relative overflow-hidden inline-flex items-center gap-3.5 p-1.5 pr-6 text-sm font-semibold tracking-tight text-zinc-950 bg-gradient-to-r from-[#5ef9ab] via-[#47f59c] to-[#10b981] rounded-full ring-1 ring-[#47f59c]/60 shadow-[0_0_34px_-4px_rgba(71,245,156,0.55),inset_0_1px_0_rgba(255,255,255,0.65)] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:shadow-[0_0_44px_0px_rgba(71,245,156,0.75)] hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#47f59c] motion-reduce:transform-none"
              >
                {/* Periodic Ambient Specular Light Sweep */}
                <span
                  aria-hidden="true"
                  className="cta-sweep-bar pointer-events-none absolute inset-y-0 w-16 bg-gradient-to-r from-transparent via-white/55 to-transparent"
                />

                {/* Dark Circular Arrow Housing */}
                <span className="relative z-10 flex items-center justify-center w-9 h-9 rounded-full bg-[#0b0e0d] text-white overflow-hidden shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105">
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-6 motion-reduce:transform-none" />
                  <ArrowRight
                    aria-hidden="true"
                    className="w-4 h-4 absolute -translate-x-6 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0 motion-reduce:hidden"
                  />
                </span>
                <span className="relative z-10">{HERO_DATA.primaryCta.label}</span>
              </a>

              <a
                href={HERO_DATA.secondaryCta.href}
                className="group inline-flex items-center gap-2.5 px-6 py-3 text-sm font-medium tracking-tight text-zinc-100 bg-[#0d1012]/90 border border-white/[0.14] rounded-full shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-white hover:bg-white/[0.06] hover:border-[#47f59c]/45 hover:shadow-[0_0_24px_-6px_rgba(71,245,156,0.3)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#47f59c]/60 motion-reduce:transform-none"
              >
                <Mail className="w-4 h-4 text-zinc-300 transition-colors duration-300 group-hover:text-[#47f59c]" />
                <span>{HERO_DATA.secondaryCta.label}</span>
              </a>
            </div>

            {/* Bottom Structured 2-Line Credential & Social Strip */}
            <div
              style={{ animationDelay: '420ms' }}
              className="hero-stagger grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-y-4 pt-6 border-t border-white/[0.08]"
            >
              {SOCIAL_LINKS.map((social, idx) => {
                const Icon = SOCIAL_ICON_MAP[social.id];
                const subtitle = SOCIAL_SUBTITLES[social.id] || 'Profile';
                return (
                  <div key={social.id} className="flex items-center">
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${social.label} — ${subtitle}`}
                      className="group flex items-center gap-2.5 pr-4 sm:pr-5 rounded-lg transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#47f59c]/60 motion-reduce:transform-none"
                    >
                      {Icon && (
                        <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] text-zinc-200 transition-colors duration-200 group-hover:border-[#47f59c]/40 group-hover:text-[#47f59c] group-hover:bg-[#47f59c]/10">
                          <Icon className="w-4 h-4" />
                        </span>
                      )}
                      <div className="flex flex-col leading-tight">
                        <span className="text-xs font-semibold text-white group-hover:text-[#47f59c] transition-colors">
                          {social.label}
                        </span>
                        <span className="text-[11px] text-zinc-400 mt-0.5">
                          {subtitle}
                        </span>
                      </div>
                    </a>

                    <span
                      aria-hidden="true"
                      className={`hidden sm:inline-block w-px h-7 bg-white/[0.1] mr-5 ${
                        idx === SOCIAL_LINKS.length - 1 ? '' : ''
                      }`}
                    />
                  </div>
                );
              })}

              {/* Experience Credential */}
              <div className="flex items-center">
                <div className="group flex items-center gap-2.5 pr-4 sm:pr-5">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#47f59c]/[0.08] border border-[#47f59c]/25 text-[#47f59c]">
                    <ShieldCheck className="w-4 h-4" />
                  </span>
                  <div className="flex flex-col leading-tight">
                    <span className="text-xs font-semibold text-white">
                      1+ Year
                    </span>
                    <span className="text-[11px] text-zinc-400 mt-0.5">
                      Production Exp.
                    </span>
                  </div>
                </div>

                <span
                  aria-hidden="true"
                  className="hidden sm:inline-block w-px h-7 bg-white/[0.1] mr-5"
                />
              </div>

              {/* Academic Credential */}
              <div className="group flex items-center gap-2.5">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#47f59c]/[0.08] border border-[#47f59c]/25 text-[#47f59c]">
                  <GraduationCap className="w-4 h-4" />
                </span>
                <div className="flex flex-col leading-tight">
                  <span className="text-xs font-semibold text-white">
                    3.73 CGPA
                  </span>
                  <span className="text-[11px] text-zinc-400 mt-0.5">
                    BSCS Honours
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hexagonal Constellation + Solar Tool Orbit Portrait Stage */}
          <div className="lg:col-span-6 self-end">
            <ProfileCard />
          </div>
        </div>
      </div>

      {/* Bottom Pitch-Black Floor Fade so Portrait Dissolves Seamlessly */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#060708] via-[#060708]/80 to-transparent z-20"
      />
    </section>
  );
}