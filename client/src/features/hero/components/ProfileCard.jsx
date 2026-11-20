import { useState } from 'react';
import { TiltCard } from '../../../shared/components/TiltCard';
import { HERO_DATA } from '../data/hero.data';

const HEX_CLIP =
  'polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%)';

/* Crisp Custom Tool SVGs */
function ReactLogo({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="2.1" fill="#61DAFB" />
      <g stroke="#61DAFB" strokeWidth="1.3">
        <ellipse cx="12" cy="12" rx="9.5" ry="3.8" />
        <ellipse cx="12" cy="12" rx="9.5" ry="3.8" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="9.5" ry="3.8" transform="rotate(120 12 12)" />
      </g>
    </svg>
  );
}

function NodeLogo({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M12 2.5L20.2 7.25V16.75L12 21.5L3.8 16.75V7.25L12 2.5Z"
        stroke="#47f59c"
        strokeWidth="1.5"
        fill="rgba(71,245,156,0.08)"
      />
      <path
        d="M9.5 14.8V9.2L14.5 14.8V9.2"
        stroke="#47f59c"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MongoLogo({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M12 2.5C12 2.5 7.2 7.6 7.2 13.1C7.2 16.7 9.6 19.1 11.4 20.1V21.8H12.6V20.1C14.4 19.1 16.8 16.7 16.8 13.1C16.8 7.6 12 2.5 12 2.5Z"
        fill="rgba(71,245,156,0.16)"
        stroke="#47f59c"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M12 6.5V19.8"
        stroke="#47f59c"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function VectorAiLogo({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="2.4" fill="#47f59c" />
      <circle cx="12" cy="4" r="1.6" fill="#e4e4e7" />
      <circle cx="19" cy="8.5" r="1.6" fill="#47f59c" />
      <circle cx="19" cy="15.5" r="1.6" fill="#e4e4e7" />
      <circle cx="12" cy="20" r="1.6" fill="#47f59c" />
      <circle cx="5" cy="15.5" r="1.6" fill="#e4e4e7" />
      <circle cx="5" cy="8.5" r="1.6" fill="#47f59c" />
      <path
        d="M12 5.6V9.6M17.5 9.3L14.1 11M17.5 14.7L14.1 13M12 18.4V14.4M6.5 14.7L9.9 13M6.5 9.3L9.9 11"
        stroke="rgba(71,245,156,0.65)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function JsLogo({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect
        x="3.5"
        y="3.5"
        width="17"
        height="17"
        rx="4"
        fill="rgba(250,204,21,0.12)"
        stroke="#facc15"
        strokeWidth="1.4"
      />
      <path
        d="M10.2 10.5V15.2C10.2 16.3 9.5 16.9 8.5 16.9C7.8 16.9 7.3 16.5 7 16"
        stroke="#facc15"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M16.5 11.2C16.1 10.6 15.5 10.4 14.8 10.4C13.9 10.4 13.3 10.9 13.3 11.7C13.3 13.4 16.7 13.1 16.7 15.1C16.7 16.1 15.9 16.8 14.7 16.8C13.8 16.8 13.1 16.4 12.7 15.8"
        stroke="#facc15"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SocketLogo({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle
        cx="12"
        cy="12"
        r="8.5"
        stroke="#e4e4e7"
        strokeWidth="1.4"
      />
      <path
        d="M13.2 6.8L8.8 12.4H12.2L10.8 17.2L15.2 11.6H11.8L13.2 6.8Z"
        fill="#47f59c"
      />
    </svg>
  );
}

const INNER_ORBIT_TOOLS = [
  { name: 'React.js', angle: 0, Icon: ReactLogo },
  { name: 'Node.js', angle: 120, Icon: NodeLogo },
  { name: 'MongoDB', angle: 240, Icon: MongoLogo },
];

const OUTER_ORBIT_TOOLS = [
  { name: 'Vector Search & AI', angle: 45, Icon: VectorAiLogo },
  { name: 'JavaScript ES6+', angle: 165, Icon: JsLogo },
  { name: 'Socket.IO', angle: 285, Icon: SocketLogo },
];

export function ProfileCard() {
  const { profileCard } = HERO_DATA;
  const [imgError, setImgError] = useState(false);

  const initials = HERO_DATA.name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <TiltCard maxTilt={5} className="w-full max-w-xl mx-auto">
      {/* Scoped Solar-System Orbit Keyframes */}
      <style>{`
        @keyframes solar-orbit-cw {
          from { transform: rotateZ(0deg); }
          to { transform: rotateZ(360deg); }
        }
        @keyframes solar-orbit-ccw {
          from { transform: rotateZ(0deg); }
          to { transform: rotateZ(-360deg); }
        }
        .orbit-spin-cw {
          animation: solar-orbit-cw var(--orbit-duration, 22s) linear infinite;
        }
        .orbit-spin-ccw {
          animation: solar-orbit-ccw var(--orbit-duration, 22s) linear infinite;
        }
        .group:hover .orbit-spin-cw,
        .group:hover .orbit-spin-ccw {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .orbit-spin-cw,
          .orbit-spin-ccw {
            animation: none !important;
          }
        }
      `}</style>

      <div className="group relative flex flex-col items-center justify-end min-h-[26rem] sm:min-h-[30rem] lg:min-h-[33rem] [perspective:1100px] [transform-style:preserve-3d]">
        {/* Layer 1: Interlocking Hexagonal Wireframe Mesh */}
        <svg
          aria-hidden="true"
          viewBox="0 0 520 460"
          fill="none"
          className="pointer-events-none absolute inset-0 w-full h-full object-contain opacity-85 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03] motion-reduce:transform-none"
        >
          <defs>
            <radialGradient id="hexFade" cx="52%" cy="48%" r="52%">
              <stop offset="0%" stopColor="#47f59c" stopOpacity="0.32" />
              <stop offset="55%" stopColor="#ffffff" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="hexAccent" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#47f59c" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#47f59c" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          <g stroke="url(#hexFade)" strokeWidth="1.15">
            <polygon points="170,40 235,78 235,154 170,192 105,154 105,78" />
            <polygon points="300,40 365,78 365,154 300,192 235,154 235,78" />
            <polygon points="430,40 495,78 495,154 430,192 365,154 365,78" />

            <polygon points="105,154 170,192 170,268 105,306 40,268 40,192" />
            <polygon points="235,154 300,192 300,268 235,306 170,268 170,192" />
            <polygon points="365,154 430,192 430,268 365,306 300,268 300,192" />

            <polygon points="170,268 235,306 235,382 170,420 105,382 105,306" />
            <polygon points="300,268 365,306 365,382 300,420 235,382 235,306" />
            <polygon points="430,268 495,306 495,382 430,420 365,382 365,306" />
          </g>

          <polygon
            points="365,154 430,192 430,268 365,306 300,268 300,192"
            stroke="url(#hexAccent)"
            strokeWidth="1.5"
          />

          <circle cx="365" cy="154" r="3" fill="#47f59c" fillOpacity="0.8" />
          <circle cx="430" cy="268" r="2.5" fill="#47f59c" fillOpacity="0.6" />
          <circle cx="235" cy="78" r="2.5" fill="#47f59c" fillOpacity="0.5" />
          <circle cx="105" cy="154" r="2" fill="#ffffff" fillOpacity="0.35" />
        </svg>

        {/* Soft Studio Rim Light Behind Portrait */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-14 w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-[#47f59c]/[0.15] blur-3xl transition-opacity duration-500 opacity-80 group-hover:opacity-100"
        />

        {/* Layer 2: Central Star (Cutout Portrait Stage) */}
        <div className="relative z-10 w-full flex justify-center [transform-style:preserve-3d] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:[transform:translateZ(14px)] motion-reduce:transform-none">
          {profileCard.avatarUrl && !imgError ? (
            <div className="relative w-[18.5rem] sm:w-[21.5rem] lg:w-[23.5rem] h-[23rem] sm:h-[26.5rem] lg:h-[29rem] [mask-image:linear-gradient(to_bottom,#000_75%,transparent_100%)]">
              <img
                src={profileCard.avatarUrl}
                alt={`${HERO_DATA.name} — ${HERO_DATA.role}`}
                fetchPriority="high"
                decoding="async"
                onError={() => setImgError(true)}
                className="w-full h-full object-cover object-top drop-shadow-[0_24px_38px_rgba(0,0,0,0.92)] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02] motion-reduce:transform-none"
              />
            </div>
          ) : (
            <div className="my-auto py-14 flex flex-col items-center">
              <div
                style={{ clipPath: HEX_CLIP }}
                className="w-48 h-52 sm:w-56 sm:h-60 p-[2px] bg-gradient-to-b from-[#47f59c] via-[#47f59c]/40 to-transparent shadow-[0_0_50px_rgba(71,245,156,0.2)]"
              >
                <div
                  style={{ clipPath: HEX_CLIP }}
                  className="w-full h-full bg-[#0d1012] flex flex-col items-center justify-center gap-2"
                >
                  <span className="text-4xl sm:text-5xl font-bold tracking-wider text-white">
                    {initials}
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#47f59c]">
                    MERN · AI
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Layer 3: 3D Tilted Solar-System Tool Orbits */}
        <div
          aria-label="Core technology orbit"
          className="pointer-events-none absolute inset-x-0 top-[58%] -translate-y-1/2 flex items-center justify-center z-20 [transform-style:preserve-3d]"
        >
          {/* INNER ORBIT RING (React, Node.js, MongoDB) */}
          <div
            style={{
              transform: 'rotateX(68deg) rotateY(-10deg)',
              '--orbit-duration': '20s',
            }}
            className="relative flex items-center justify-center w-[20rem] h-[20rem] sm:w-[24.5rem] sm:h-[24.5rem] lg:w-[27rem] lg:h-[27rem] rounded-full border border-[#47f59c]/30 shadow-[0_0_30px_rgba(71,245,156,0.08),inset_0_0_24px_rgba(71,245,156,0.06)] [transform-style:preserve-3d]"
          >
            <div className="orbit-spin-cw relative w-full h-full rounded-full [transform-style:preserve-3d]">
              {INNER_ORBIT_TOOLS.map(({ name, angle, Icon }) => (
                <div
                  key={name}
                  style={{ transform: `rotateZ(${angle}deg)` }}
                  className="absolute inset-0 [transform-style:preserve-3d]"
                >
                  {/* Planet Position at Top of Ring */}
                  <div
                    style={{ transform: `translate(-50%, -50%) rotateZ(${-angle}deg)` }}
                    className="absolute top-0 left-1/2 [transform-style:preserve-3d]"
                  >
                    {/* Counter-Spin to Keep Icon Upright */}
                    <div className="orbit-spin-ccw [transform-style:preserve-3d]">
                      {/* Counter-Tilt to Face Camera Flat */}
                      <div
                        style={{ transform: 'rotateY(10deg) rotateX(-68deg)' }}
                        className="pointer-events-auto group/planet relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#111316]/90 backdrop-blur-xl border border-white/[0.14] shadow-[0_8px_24px_rgba(0,0,0,0.85),0_0_16px_rgba(71,245,156,0.2),inset_0_1px_0_rgba(255,255,255,0.18)] transition-transform duration-300 hover:scale-125 hover:border-[#47f59c]"
                      >
                        <Icon className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
                        <span className="pointer-events-none absolute -top-7 px-2 py-0.5 rounded-full bg-[#0b0d0f]/95 border border-[#47f59c]/35 font-mono text-[10px] font-medium text-white whitespace-nowrap opacity-0 transition-opacity duration-200 group-hover/planet:opacity-100">
                          {name}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* OUTER ORBIT RING (Vector AI, JavaScript, Socket.IO — Counter-Rotating) */}
          <div
            style={{
              transform: 'rotateX(68deg) rotateY(-10deg)',
              '--orbit-duration': '28s',
            }}
            className="absolute flex items-center justify-center w-[25.5rem] h-[25.5rem] sm:w-[31rem] sm:h-[31rem] lg:w-[34.5rem] lg:h-[34.5rem] rounded-full border border-dashed border-white/[0.14] [transform-style:preserve-3d]"
          >
            <div className="orbit-spin-ccw relative w-full h-full rounded-full [transform-style:preserve-3d]">
              {OUTER_ORBIT_TOOLS.map(({ name, angle, Icon }) => (
                <div
                  key={name}
                  style={{ transform: `rotateZ(${angle}deg)` }}
                  className="absolute inset-0 [transform-style:preserve-3d]"
                >
                  <div
                    style={{ transform: `translate(-50%, -50%) rotateZ(${-angle}deg)` }}
                    className="absolute top-0 left-1/2 [transform-style:preserve-3d]"
                  >
                    {/* Counter-Spin (CW) to Keep Icon Upright */}
                    <div className="orbit-spin-cw [transform-style:preserve-3d]">
                      {/* Counter-Tilt to Face Camera Flat */}
                      <div
                        style={{ transform: 'rotateY(10deg) rotateX(-68deg)' }}
                        className="pointer-events-auto group/planet relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#111316]/90 backdrop-blur-xl border border-white/[0.12] shadow-[0_8px_24px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.15)] transition-transform duration-300 hover:scale-125 hover:border-[#47f59c]"
                      >
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="pointer-events-none absolute -top-7 px-2 py-0.5 rounded-full bg-[#0b0d0f]/95 border border-[#47f59c]/35 font-mono text-[10px] font-medium text-white whitespace-nowrap opacity-0 transition-opacity duration-200 group-hover/planet:opacity-100">
                          {name}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </TiltCard>
  );
}