import { useCallback, useEffect, useRef, useState } from 'react';

// Shared 11-point jagged fracture spine so left slab, right slab, and SVG crack lock seamlessly
const SEAM_POINTS = [
  [51, 0],
  [48.5, 9],
  [53, 18],
  [47, 28],
  [54, 37],
  [46, 48],
  [53.5, 58],
  [47.5, 68],
  [52.5, 78],
  [46.5, 89],
  [50.5, 100],
];

const LEFT_WALL_CLIP = `polygon(0% 0%, ${SEAM_POINTS.map(
  ([x, y]) => `${x}% ${y}%`
).join(', ')}, 0% 100%)`;

const RIGHT_WALL_CLIP = `polygon(${SEAM_POINTS[0][0]}% 0%, 100% 0%, 100% 100%, ${[
  ...SEAM_POINTS,
]
  .reverse()
  .map(([x, y]) => `${x}% ${y}%`)
  .join(', ')})`;

const MAIN_CRACK_PATH = SEAM_POINTS.map(
  ([x, y], idx) => `${idx === 0 ? 'M' : 'L'} ${x} ${y}`
).join(' ');

// Multi-tier organic veins & hairline fractures creeping outward from the primary fault line
const VEIN_CRACKS = [
  { d: 'M 48.5 9 L 43 13 L 38 11.5 L 34 14', delay: '0.42s', width: '0.24' },
  { d: 'M 43 13 L 40.5 18 L 37 20', delay: '0.58s', width: '0.14' },
  { d: 'M 53 18 L 59 22 L 64 20.5 L 68 23', delay: '0.50s', width: '0.24' },
  { d: 'M 59 22 L 61.5 27 L 65 29', delay: '0.66s', width: '0.14' },
  { d: 'M 47 28 L 40 32 L 34 30 L 29 33.5', delay: '0.64s', width: '0.26' },
  { d: 'M 40 32 L 37 38 L 33 41', delay: '0.80s', width: '0.15' },
  { d: 'M 54 37 L 61 41 L 67 39 L 72 43', delay: '0.72s', width: '0.26' },
  { d: 'M 61 41 L 63.5 47 L 68 50', delay: '0.88s', width: '0.15' },
  { d: 'M 46 48 L 38.5 52 L 32 50 L 26 54', delay: '0.86s', width: '0.28' },
  { d: 'M 38.5 52 L 35 58 L 30 61', delay: '1.02s', width: '0.15' },
  { d: 'M 53.5 58 L 60.5 62 L 66 60 L 71 64', delay: '0.96s', width: '0.26' },
  { d: 'M 47.5 68 L 40.5 72 L 35 70 L 30 74', delay: '1.10s', width: '0.24' },
  { d: 'M 52.5 78 L 59 82 L 64.5 80.5 L 69 84', delay: '1.20s', width: '0.24' },
  { d: 'M 46.5 89 L 41 93 L 36 92', delay: '1.30s', width: '0.20' },
];

// Deterministic floating mint-ash / spore particles emerging from the seam
const ABYSS_SPORES = [
  { left: '48%', top: '18%', size: 3, delay: '0.45s', dx: '-28px', dy: '-45px' },
  { left: '52%', top: '26%', size: 4, delay: '0.58s', dx: '34px', dy: '-38px' },
  { left: '47%', top: '39%', size: 2.5, delay: '0.68s', dx: '-42px', dy: '-52px' },
  { left: '53%', top: '47%', size: 3.5, delay: '0.78s', dx: '38px', dy: '-44px' },
  { left: '49%', top: '57%', size: 4, delay: '0.88s', dx: '-32px', dy: '-60px' },
  { left: '52%', top: '66%', size: 2.5, delay: '0.98s', dx: '44px', dy: '-35px' },
  { left: '48%', top: '76%', size: 3, delay: '1.10s', dx: '-36px', dy: '-48px' },
  { left: '51%', top: '85%', size: 3.5, delay: '1.22s', dx: '29px', dy: '-42px' },
];

const SESSION_KEY = 'hm_wall_intro_seen';

export function WallCrackIntro({
  playOncePerSession = true,
  brandTag = 'SYS // BREACH DETECTED',
}) {
  const [phase, setPhase] = useState(() => {
    if (typeof window === 'undefined') return 'done';
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return 'done';
    }
    if (playOncePerSession && sessionStorage.getItem(SESSION_KEY) === '1') {
      return 'done';
    }
    return 'cracking'; // 'cracking' -> 'splitting' -> 'done'
  });

  const timersRef = useRef([]);

  const finishIntro = useCallback(() => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    if (playOncePerSession) {
      sessionStorage.setItem(SESSION_KEY, '1');
    }
    document.body.style.overflow = '';
    setPhase('done');
  }, [playOncePerSession]);

  useEffect(() => {
    if (phase === 'done') return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Phase 1 -> Phase 2: Strobe + organic veins finish tearing down the wall, slabs split open
    const splitTimer = window.setTimeout(() => {
      setPhase('splitting');
      document.body.style.overflow = prevOverflow;
    }, 1850);

    // Phase 2 -> Unmount: Slabs clear the viewport completely
    const doneTimer = window.setTimeout(() => {
      finishIntro();
    }, 3050);

    timersRef.current = [splitTimer, doneTimer];

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') finishIntro();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      timersRef.current.forEach((id) => window.clearTimeout(id));
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [phase, finishIntro]);

  if (phase === 'done') return null;

  const isSplitting = phase === 'splitting';

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[100] pointer-events-auto overflow-hidden select-none"
    >
      <style>{`
        @keyframes hmHorrorStrobe {
          0%, 100% { opacity: 0.92; }
          8% { opacity: 0.25; }
          14% { opacity: 0.95; }
          22% { opacity: 0.15; }
          28% { opacity: 0.98; }
          65% { opacity: 0.88; }
          72% { opacity: 0.45; }
          78% { opacity: 1; }
        }
        @keyframes hmCrackTear {
          0% {
            stroke-dashoffset: 130;
            opacity: 0;
          }
          20% {
            stroke-dashoffset: 130;
            opacity: 0.45;
          }
          100% {
            stroke-dashoffset: 0;
            opacity: 1;
          }
        }
        @keyframes hmVeinCreep {
          0% {
            stroke-dashoffset: 36;
            opacity: 0;
          }
          35% {
            opacity: 0.95;
          }
          100% {
            stroke-dashoffset: 0;
            opacity: 0.82;
          }
        }
        @keyframes hmSeismicShake {
          0%, 22%, 100% { transform: translate3d(0, 0, 0); }
          27% { transform: translate3d(-4px, 2px, 0); }
          33% { transform: translate3d(4px, -3px, 0); }
          39% { transform: translate3d(-3px, -2px, 0); }
          47% { transform: translate3d(3px, 3px, 0); }
          55% { transform: translate3d(-5px, 1px, 0); }
          63% { transform: translate3d(5px, -2px, 0); }
          71% { transform: translate3d(-3px, 3px, 0); }
          79% { transform: translate3d(4px, -1px, 0); }
          87% { transform: translate3d(-2px, -2px, 0); }
        }
        @keyframes hmSporeDrift {
          0% {
            opacity: 0;
            transform: translate3d(0, 0, 0) scale(0.4);
          }
          30% {
            opacity: 0.95;
          }
          100% {
            opacity: 0;
            transform: translate3d(var(--dx), var(--dy), 0) scale(1.3);
          }
        }
        @keyframes hmMintGlitch {
          0%, 100% {
            text-shadow: -1.5px 0 rgba(16, 185, 129, 0.9), 1.5px 0 rgba(126, 252, 192, 0.9);
          }
          33% {
            text-shadow: 2px 0 rgba(71, 245, 156, 0.95), -2px 0 rgba(16, 185, 129, 0.9);
          }
          66% {
            text-shadow: -1px -1px rgba(126, 252, 192, 0.85), 1px 1px rgba(71, 245, 156, 0.95);
          }
        }
        .hm-seismic-shake {
          animation: hmSeismicShake 1.6s cubic-bezier(0.36, 0.07, 0.19, 0.97) forwards;
        }
        .hm-horror-strobe {
          animation: hmHorrorStrobe 1.65s linear forwards;
        }
        .hm-main-tear {
          stroke-dasharray: 130;
          stroke-dashoffset: 130;
          animation: hmCrackTear 1.55s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .hm-vein-creep {
          stroke-dasharray: 36;
          stroke-dashoffset: 36;
          animation: hmVeinCreep 0.75s ease-out forwards;
        }
        .hm-spore {
          opacity: 0;
          animation: hmSporeDrift 1.3s ease-out forwards;
        }
        .hm-glitch-text {
          animation: hmMintGlitch 0.32s infinite;
        }
      `}</style>

      {/* Volumetric Electric-Mint & Emerald Rift Light Bleeding Behind the Seam */}
      <div
        className={`pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 w-72 transition-all duration-700 ${
          isSplitting ? 'opacity-0 scale-x-150' : 'opacity-100'
        }`}
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(126, 252, 192, 0.45) 0%, rgba(71, 245, 156, 0.42) 34%, rgba(16, 185, 129, 0.16) 60%, transparent 80%)',
          filter: 'blur(26px)',
        }}
      />

      {/* LEFT OBSIDIAN MONOLITH SLAB */}
      <div
        style={{
          clipPath: LEFT_WALL_CLIP,
          transform: isSplitting
            ? 'translate3d(-106%, 0, 0) rotate(-1.2deg)'
            : 'translate3d(0, 0, 0) rotate(0deg)',
          transition: 'transform 1180ms cubic-bezier(0.76, 0, 0.24, 1)',
        }}
        className={`absolute inset-0 bg-[#050607] will-change-transform ${
          !isSplitting ? 'hm-seismic-shake' : ''
        }`}
      >
        {/* Dark Weathered Concrete / Obsidian Texture + CRT Scanlines */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(71,245,156,0.06)_1px,transparent_1px)] [background-size:18px_18px] opacity-70" />
        <div
          className="absolute inset-0 opacity-35"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, rgba(0,0,0,0.65) 0px, rgba(0,0,0,0.65) 1px, transparent 1px, transparent 3px)',
          }}
        />
        {/* Heavy Vignette Shadow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_25%,rgba(0,0,0,0.92)_100%)]" />

        {/* Corrupted Warning Telemetry Stamp */}
        <div className="hm-horror-strobe absolute bottom-8 left-6 sm:left-10 flex items-center gap-2.5 font-mono text-[10px] sm:text-xs tracking-[0.22em] uppercase text-zinc-300">
          <span className="w-2 h-2 rounded-full bg-[#47f59c] shadow-[0_0_10px_#47f59c] animate-ping" />
          <span className="hm-glitch-text">{brandTag}</span>
        </div>
      </div>

      {/* RIGHT OBSIDIAN MONOLITH SLAB */}
      <div
        style={{
          clipPath: RIGHT_WALL_CLIP,
          transform: isSplitting
            ? 'translate3d(106%, 0, 0) rotate(1.2deg)'
            : 'translate3d(0, 0, 0) rotate(0deg)',
          transition: 'transform 1180ms cubic-bezier(0.76, 0, 0.24, 1)',
        }}
        className={`absolute inset-0 bg-[#050607] will-change-transform ${
          !isSplitting ? 'hm-seismic-shake' : ''
        }`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(rgba(71,245,156,0.06)_1px,transparent_1px)] [background-size:18px_18px] opacity-70" />
        <div
          className="absolute inset-0 opacity-35"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, rgba(0,0,0,0.65) 0px, rgba(0,0,0,0.65) 1px, transparent 1px, transparent 3px)',
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_25%,rgba(0,0,0,0.92)_100%)]" />
      </div>

      {/* FLOATING ABYSSAL ASH / SPORES ESCAPING THE FRACTURE */}
      {!isSplitting &&
        ABYSS_SPORES.map((spore, idx) => (
          <span
            key={idx}
            style={{
              left: spore.left,
              top: spore.top,
              width: `${spore.size}px`,
              height: `${spore.size}px`,
              animationDelay: spore.delay,
              '--dx': spore.dx,
              '--dy': spore.dy,
            }}
            className="hm-spore pointer-events-none absolute rounded-full bg-[#7efcc0] shadow-[0_0_8px_#47f59c,0_0_16px_#10b981]"
          />
        ))}

      {/* MULTI-LAYERED RIFT & ORGANIC VEINS SVG OVERLAY */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className={`pointer-events-none absolute inset-0 w-full h-full transition-opacity duration-300 ${
          isSplitting ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <defs>
          <filter id="abyssRiftGlow" x="-40%" y="-10%" width="180%" height="120%">
            <feGaussianBlur stdDeviation="1.25" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Secondary Organic Spiderweb Veins (Emerald + Electric-Mint Split) */}
        {VEIN_CRACKS.map((vein, idx) => (
          <path
            key={vein.d}
            d={vein.d}
            fill="none"
            stroke={
              idx % 3 === 0
                ? 'rgba(16, 185, 129, 0.78)'
                : 'rgba(71, 245, 156, 0.68)'
            }
            strokeWidth={vein.width}
            strokeLinecap="round"
            style={{ animationDelay: vein.delay }}
            className="hm-vein-creep"
          />
        ))}

        {/* Deep Emerald Sub-Surface Rift Aura */}
        <path
          d={MAIN_CRACK_PATH}
          fill="none"
          stroke="#10b981"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#abyssRiftGlow)"
          className="hm-main-tear opacity-85"
        />

        {/* Electric-Mint Plasma Edge */}
        <path
          d={MAIN_CRACK_PATH}
          fill="none"
          stroke="#47f59c"
          strokeWidth="0.85"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#abyssRiftGlow)"
          className="hm-main-tear"
        />

        {/* White-Hot Inner Tear Core */}
        <path
          d={MAIN_CRACK_PATH}
          fill="none"
          stroke="#f4fff9"
          strokeWidth="0.3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="hm-main-tear"
        />
      </svg>

      {/* Instant Skip Button */}
      <button
        type="button"
        onClick={finishIntro}
        className={`absolute bottom-7 right-6 sm:right-10 z-20 px-3 py-1 rounded-full font-mono text-[10px] tracking-widest uppercase text-zinc-400 bg-black/60 border border-white/[0.12] hover:text-[#47f59c] hover:border-[#47f59c]/50 transition-all ${
          isSplitting ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        Skip [ESC]
      </button>
    </div>
  );
}