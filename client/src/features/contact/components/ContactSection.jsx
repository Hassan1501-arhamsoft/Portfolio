import { useRef, useState } from 'react';
import {
  ArrowUpRight,
  Check,
  Clock,
  Copy,
  Mail,
  MapPin,
  Terminal,
} from 'lucide-react';
import { SectionHeader } from '../../../shared/components/SectionHeader';
import {
  GitHubIcon,
  LinkedInIcon,
} from '../../../shared/components/SocialIcons';
import { SOCIAL_LINKS } from '../../navigation/data/nav.data';
import { CONTACT_DATA } from '../data/contact.data';
import { ContactForm } from './ContactForm';
import { ParticleCanvas } from '../../../shared/components/ParticleCanvas';

function SocialProfileIcon({ id, className = 'w-4 h-4' }) {
  if (id === 'github') return <GitHubIcon className={className} />;
  if (id === 'linkedin') return <LinkedInIcon className={className} />;
  return null;
}

export function ContactSection() {
  const cardRef = useRef(null);
  const [copied, setCopied] = useState(false);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_DATA.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback if clipboard permissions are restricted
      window.location.href = `mailto:${CONTACT_DATA.email}`;
    }
  };

  return (
    <section
      id="contact"
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

      {/* Subtle Bottom-Left Emerald Vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-24 w-[32rem] h-[24rem] rounded-full bg-[#47f59c]/[0.05] blur-[120px]"
      />

      {/* Radial-Masked Mint Micro-Dot Matrix */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(71,245,156,0.13)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_50%,#000_35%,transparent_100%)]"
      />

      <div className="relative z-10 max-w-6xl px-6 mx-auto">
        <SectionHeader
          eyebrow="Get In Touch"
          title="Let's Build Something Solid"
          subtitle="Available for full-stack MERN roles, AI/RAG engineering positions, and technical consulting."
        />

        <div className="grid gap-8 lg:grid-cols-12 items-start">
          {/* Left Column: Obsidian-Mint Direct Channels Hub */}
          <div className="lg:col-span-5">
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              className="group relative p-6 sm:p-7 rounded-3xl bg-[#0b0e0d]/95 backdrop-blur-2xl border border-white/[0.09] shadow-[0_28px_70px_-15px_rgba(0,0,0,0.95),inset_0_1px_0_0_rgba(255,255,255,0.1)] overflow-hidden space-y-6"
            >
              {/* Top Specular Mint Edge */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#47f59c]/55 to-transparent"
              />

              {/* Corner Aerospace Bracket Ticks */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute top-3 left-3 w-3.5 h-3.5 border-t-2 border-l-2 border-[#47f59c]/60 rounded-tl-sm"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-3 right-3 w-3.5 h-3.5 border-b-2 border-r-2 border-[#47f59c]/60 rounded-br-sm"
              />

              {/* Cursor-Tracking Radial Mint Spotlight */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 motion-reduce:hidden"
                style={{
                  background:
                    'radial-gradient(380px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(71, 245, 156, 0.095), transparent 55%)',
                }}
              />

              {/* Header + Live Availability Status */}
              <div className="relative z-10">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-[#47f59c]/12 border border-[#47f59c]/35 text-[#47f59c] shadow-[0_0_20px_-4px_rgba(71,245,156,0.4)]">
                    <Terminal className="w-4 h-4" />
                  </div>

                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-[10px] font-semibold tracking-wider uppercase bg-[#47f59c]/12 border border-[#47f59c]/35 text-[#47f59c]">
                    <span className="relative flex w-1.5 h-1.5">
                      <span className="absolute inline-flex w-full h-full rounded-full opacity-75 bg-[#47f59c] animate-ping motion-reduce:hidden" />
                      <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-[#47f59c]" />
                    </span>
                    Open to Roles
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white">
                  Direct Channels
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">
                  Prefer direct email over forms? Copy my address below or
                  connect on GitHub and LinkedIn.
                </p>
              </div>

              {/* Email Copy Box */}
              <div className="relative z-10 p-3.5 rounded-2xl bg-[#060807]/95 border border-[#47f59c]/25 shadow-[inset_0_0_24px_rgba(71,245,156,0.04)] flex items-center justify-between gap-2.5">
                <a
                  href={`mailto:${CONTACT_DATA.email}`}
                  className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-mono text-zinc-200 hover:text-[#47f59c] transition-colors truncate"
                >
                  <Mail className="w-4 h-4 text-[#47f59c] shrink-0" />
                  <span className="truncate">{CONTACT_DATA.email}</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  aria-label="Copy email address"
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-semibold rounded-full border transition-all shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#47f59c] ${
                    copied
                      ? 'bg-[#47f59c] text-zinc-950 border-[#47f59c] shadow-[0_0_16px_rgba(71,245,156,0.45)]'
                      : 'bg-white/[0.04] text-zinc-200 border-white/[0.12] hover:border-[#47f59c]/50 hover:text-[#47f59c]'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Location & Response SLA Telemetry Rows */}
              <div className="relative z-10 space-y-2.5">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.025] border border-white/[0.06] text-xs text-zinc-300">
                  <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#47f59c]/10 border border-[#47f59c]/25 text-[#47f59c] shrink-0">
                    <MapPin className="w-3.5 h-3.5" />
                  </span>
                  <span>{CONTACT_DATA.location}</span>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.025] border border-white/[0.06] text-xs text-zinc-300">
                  <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#47f59c]/10 border border-[#47f59c]/25 text-[#47f59c] shrink-0">
                    <Clock className="w-3.5 h-3.5" />
                  </span>
                  <span>{CONTACT_DATA.availabilityNote}</span>
                </div>
              </div>

              {/* Social Profiles */}
              <div className="relative z-10 pt-4 border-t border-white/[0.07]">
                <p className="mb-3 font-mono text-[10px] font-semibold tracking-[0.18em] uppercase text-zinc-500">
                  Verified Profiles
                </p>

                <div className="grid grid-cols-2 gap-2.5">
                  {SOCIAL_LINKS.map((social) => (
                    <a
                      key={social.id}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/social flex items-center justify-between gap-2 px-3.5 py-2.5 text-xs font-medium text-zinc-200 rounded-xl bg-white/[0.03] border border-white/[0.09] hover:bg-[#0f2419]/80 hover:text-white hover:border-[#47f59c]/45 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#47f59c]"
                    >
                      <span className="inline-flex items-center gap-2 truncate">
                        <span className="text-[#47f59c]">
                          <SocialProfileIcon id={social.id} className="w-4 h-4" />
                        </span>
                        <span className="truncate">{social.label}</span>
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500 group-hover/social:text-[#47f59c] group-hover/social:translate-x-0.5 group-hover/social:-translate-y-0.5 transition-transform shrink-0" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Validated Uplink Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}