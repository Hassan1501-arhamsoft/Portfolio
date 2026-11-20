import { useEffect, useRef, useState } from 'react';

export function SectionHeader({ eyebrow, title, subtitle, align = 'center' }) {
  const headerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  );

  useEffect(() => {
    if (isVisible) return;
    const node = headerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -30px 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [isVisible]);

  const isLeft = align === 'left';
  const alignmentClasses = isLeft
    ? 'text-left items-start'
    : 'text-center items-center mx-auto';

  // Highlight the final word in electric mint for multi-word titles (matches HeroSection)
  const words = typeof title === 'string' ? title.trim().split(/\s+/) : [];
  const hasMultipleWords = words.length > 1;
  const leadingTitle = hasMultipleWords ? words.slice(0, -1).join(' ') : title;
  const accentTitle = hasMultipleWords ? words[words.length - 1] : null;

  return (
    <header
      ref={headerRef}
      className={`flex flex-col max-w-2xl mb-14 lg:mb-16 ${alignmentClasses}`}
    >
      {/* Obsidian Mint Eyebrow Pill */}
      {eyebrow && (
        <div
          className={`mb-4 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`}
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1 font-mono text-[11px] font-medium tracking-[0.2em] uppercase rounded-full bg-[#0a140f]/90 text-[#47f59c] border border-[#47f59c]/30 shadow-[inset_0_1px_0_0_rgba(71,245,156,0.18),0_0_20px_-4px_rgba(71,245,156,0.25)]">
            <span className="relative flex w-1.5 h-1.5">
              <span className="absolute inline-flex w-full h-full rounded-full opacity-75 bg-[#47f59c] animate-ping motion-reduce:hidden" />
              <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-[#47f59c] shadow-[0_0_8px_#47f59c]" />
            </span>
            <span>{eyebrow}</span>
          </span>
        </div>
      )}

      {/* Two-Tone Display Heading */}
      <h2
        style={{ transitionDelay: '90ms' }}
        className={`text-3xl font-bold tracking-[-0.03em] leading-[1.12] text-white sm:text-4xl lg:text-[2.65rem] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <span>{leadingTitle}</span>
        {accentTitle && (
          <>
            {' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5ef9ab] via-[#47f59c] to-[#10b981] drop-shadow-[0_0_24px_rgba(71,245,156,0.18)]">
              {accentTitle}
            </span>
          </>
        )}
      </h2>

      {/* Expanding Mint Specular Divider */}
      <div
        aria-hidden="true"
        style={{ transitionDelay: '180ms' }}
        className={`relative mt-4 h-[2px] w-28 overflow-hidden rounded-full bg-white/[0.08] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isLeft ? 'origin-left' : 'origin-center'
        } motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:scale-x-100 ${
          isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
        }`}
      >
        <div
          className={`h-full w-full bg-gradient-to-r ${
            isLeft
              ? 'from-[#47f59c] via-[#34d399] to-transparent'
              : 'from-transparent via-[#47f59c] to-transparent'
          } shadow-[0_0_12px_#47f59c]`}
        />
      </div>

      {/* Subtitle */}
      {subtitle && (
        <p
          style={{ transitionDelay: '240ms' }}
          className={`mt-4 text-sm leading-relaxed text-zinc-400 sm:text-base transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`}
        >
          {subtitle}
        </p>
      )}
    </header>
  );
}