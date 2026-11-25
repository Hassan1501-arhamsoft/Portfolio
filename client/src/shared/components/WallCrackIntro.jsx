import { useCallback, useEffect, useRef, useState } from 'react';

const SESSION_KEY = 'hm_wall_intro_seen';

/**
 * Generates deterministic jagged fracture tendrils radiating from (0, 0)
 * in normalized radius [0..1] so paths stay consistent while jittering smoothly.
 */
function createFractureNetwork(tendrilCount = 22) {
  const tendrils = [];

  for (let i = 0; i < tendrilCount; i++) {
    const baseAngle =
      (i * Math.PI * 2) / tendrilCount + Math.sin(i * 12.9898) * 0.14;
    const maxReach = 0.65 + ((Math.sin(i * 78.233) + 1) * 0.5) * 0.32;
    const steps = 15;
    const points = [{ r: 0, angle: baseAngle, jitterSeed: i * 3.1 }];

    let currentAngle = baseAngle;
    for (let s = 1; s <= steps; s++) {
      const t = s / steps;
      const jag = Math.sin(i * 19.3 + s * 7.7) * 0.1;
      currentAngle += jag * 0.65;
      points.push({
        r: t * maxReach,
        angle: currentAngle,
        jitterSeed: i * 11.3 + s * 4.7,
      });
    }

    // Secondary forked hairline cracks branching off primary tendrils
    const branches = [];
    if (i % 2 === 0) {
      const forkIdx = 4 + (i % 5);
      const origin = points[forkIdx];
      let bAngle = origin.angle + (i % 4 === 0 ? 0.44 : -0.44);
      const bPoints = [{ ...origin }];
      for (let b = 1; b <= 6; b++) {
        bAngle += Math.cos(i * 5.1 + b * 6.3) * 0.12;
        bPoints.push({
          r: origin.r + b * 0.05,
          angle: bAngle,
          jitterSeed: i * 17.1 + b * 2.9,
        });
      }
      branches.push({ startProgress: forkIdx / steps, points: bPoints });
    }

    tendrils.push({
      points,
      branches,
      thickness: i % 3 === 0 ? 2.0 : 1.2,
    });
  }

  // Spark debris streaks released when the bubble detonates
  const sparks = Array.from({ length: 42 }, (_, idx) => ({
    angle: (idx * Math.PI * 2) / 42 + Math.sin(idx * 9.1) * 0.14,
    speed: 0.6 + ((Math.cos(idx * 14.7) + 1) * 0.5) * 0.75,
    size: 1.4 + (idx % 3) * 0.85,
    length: 16 + (idx % 4) * 10,
  }));

  return { tendrils, sparks };
}

export function WallCrackIntro({
  playOncePerSession = true,
  brandTag = 'SYS // CORE CONTAINMENT',
}) {
  const [phase, setPhase] = useState(() => {
    if (typeof window === 'undefined') return 'done';
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return 'done';
    }
    if (playOncePerSession && sessionStorage.getItem(SESSION_KEY) === '1') {
      return 'done';
    }
    return 'active'; // 'active' -> 'blasting' -> 'done'
  });

  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const networkRef = useRef(null);
  const isDoneRef = useRef(phase === 'done');

  const finishIntro = useCallback(() => {
    if (isDoneRef.current) return;
    isDoneRef.current = true;
    if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    if (playOncePerSession) {
      sessionStorage.setItem(SESSION_KEY, '1');
    }
    document.body.style.overflow = '';
    setPhase('done');
  }, [playOncePerSession]);

  useEffect(() => {
    if (isDoneRef.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (!networkRef.current) {
      networkRef.current = createFractureNetwork(22);
    }

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    let width = window.innerWidth;
    let height = window.innerHeight;

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') finishIntro();
    };
    window.addEventListener('keydown', handleKeyDown);

    // Smooth, unhurried 3-stage timeline (in seconds)
    const STAGE1_CRACK_END = 1.45; // Small cracks creep outward & form spiderweb
    const STAGE2_BUBBLE_END = 3.10; // Cracks convert & condense into big cracking bubble
    const TOTAL_DURATION = 4.25; // Bubble blasts open & reveals main page

    let startTime = null;
    let hudHiddenForBlast = false;

    const drawGridWall = (shakeX, shakeY) => {
      ctx.save();
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = '#050607';
      ctx.fillRect(-24, -24, width + 48, height + 48);

      // Subtle emerald micro-dot matrix matching site background
      ctx.fillStyle = 'rgba(71, 245, 156, 0.065)';
      const spacing = 26;
      const offsetX = shakeX % spacing;
      const offsetY = shakeY % spacing;
      for (let x = offsetX; x < width; x += spacing) {
        for (let y = offsetY; y < height; y += spacing) {
          ctx.fillRect(x, y, 1.2, 1.2);
        }
      }

      // Deep radial vignette
      const vig = ctx.createRadialGradient(
        width / 2,
        height / 2,
        Math.min(width, height) * 0.14,
        width / 2,
        height / 2,
        Math.hypot(width, height) * 0.56
      );
      vig.addColorStop(0, 'rgba(5, 6, 7, 0)');
      vig.addColorStop(1, 'rgba(0, 0, 0, 0.85)');
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, width, height);
      ctx.restore();
    };

    const drawFractureTendrils = (
      cx,
      cy,
      maxR,
      crackProgress,
      innerClipR,
      timeSec,
      intensity
    ) => {
      if (intensity <= 0.01) return;
      const { tendrils } = networkRef.current;

      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      for (const tendril of tendrils) {
        const pts = tendril.points;
        const visibleCount = Math.max(
          2,
          Math.ceil(crackProgress * (pts.length - 1)) + 1
        );

        const tracePath = (pointList, limit) => {
          ctx.beginPath();
          let started = false;
          for (let i = 0; i < Math.min(limit, pointList.length); i++) {
            const p = pointList[i];
            const rPx = p.r * maxR;
            // Clamp points inside the growing bubble so cracks visibly feed into its perimeter
            const effectiveR = Math.max(rPx, innerClipR * 0.88);
            const jitter =
              i === 0
                ? 0
                : Math.sin(timeSec * 24 + p.jitterSeed) * 1.8 * intensity;
            const x = cx + Math.cos(p.angle) * effectiveR + jitter;
            const y = cy + Math.sin(p.angle) * effectiveR - jitter;
            if (!started) {
              ctx.moveTo(x, y);
              started = true;
            } else {
              ctx.lineTo(x, y);
            }
          }
        };

        // 1. Deep emerald outer glow
        tracePath(pts, visibleCount);
        ctx.strokeStyle = `rgba(16, 185, 129, ${0.42 * intensity})`;
        ctx.lineWidth = tendril.thickness * 4.2;
        ctx.stroke();

        // 2. Electric-mint plasma body
        tracePath(pts, visibleCount);
        ctx.strokeStyle = `rgba(71, 245, 156, ${0.82 * intensity})`;
        ctx.lineWidth = tendril.thickness * 1.7;
        ctx.stroke();

        // 3. White-hot inner fracture filament
        tracePath(pts, visibleCount);
        ctx.strokeStyle = `rgba(244, 255, 249, ${0.95 * intensity})`;
        ctx.lineWidth = tendril.thickness * 0.6;
        ctx.stroke();

        // Sub-branches
        for (const branch of tendril.branches) {
          if (crackProgress > branch.startProgress) {
            const bProg = Math.min(
              1,
              (crackProgress - branch.startProgress) / (1 - branch.startProgress)
            );
            const bLimit = Math.max(
              2,
              Math.ceil(bProg * (branch.points.length - 1)) + 1
            );
            tracePath(branch.points, bLimit);
            ctx.strokeStyle = `rgba(71, 245, 156, ${0.65 * intensity})`;
            ctx.lineWidth = 0.85;
            ctx.stroke();
          }
        }
      }

      ctx.restore();
    };

    const drawCrackingBubble = (cx, cy, radius, chargeRatio, timeSec) => {
      if (radius <= 1) return;
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';

      // Volumetric electric-mint halo around the expanding sphere
      const outerHalo = ctx.createRadialGradient(
        cx,
        cy,
        radius * 0.08,
        cx,
        cy,
        radius * 2.2
      );
      outerHalo.addColorStop(0, 'rgba(244, 255, 249, 0.95)');
      outerHalo.addColorStop(0.26, 'rgba(126, 252, 192, 0.72)');
      outerHalo.addColorStop(0.55, 'rgba(71, 245, 156, 0.28)');
      outerHalo.addColorStop(1, 'rgba(16, 185, 129, 0)');
      ctx.fillStyle = outerHalo;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 2.2, 0, Math.PI * 2);
      ctx.fill();

      // Concentric jagged cracking rings forming the high-pressure bubble shell
      const ringRatios = [0.48, 0.74, 1.0];
      ringRatios.forEach((ratio, rIdx) => {
        const ringR = radius * ratio;
        const segments = 36;
        ctx.beginPath();
        for (let s = 0; s <= segments; s++) {
          const theta = (s / segments) * Math.PI * 2;
          const wave =
            Math.sin(theta * 7 + timeSec * (16 + rIdx * 6)) *
              (2.8 * chargeRatio) +
            Math.cos(theta * 13 - timeSec * 22) * (1.8 * chargeRatio);
          const r = ringR + wave;
          const x = cx + Math.cos(theta) * r;
          const y = cy + Math.sin(theta) * r;
          if (s === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();

        // Outer mint glow stroke
        ctx.strokeStyle =
          rIdx === 2
            ? 'rgba(71, 245, 156, 0.92)'
            : 'rgba(126, 252, 192, 0.65)';
        ctx.lineWidth = rIdx === 2 ? 3.5 : 2.1;
        ctx.stroke();

        // White-hot core ring fracture
        ctx.strokeStyle = 'rgba(244, 255, 249, 0.94)';
        ctx.lineWidth = rIdx === 2 ? 1.3 : 0.8;
        ctx.stroke();
      });

      // Internal crisscrossing lightning cracks trapped inside the bubble
      const arcCount = 9;
      for (let a = 0; a < arcCount; a++) {
        const a1 = (a / arcCount) * Math.PI * 2 + timeSec * 3.2;
        const a2 = a1 + Math.PI * 0.82 + Math.sin(timeSec * 12 + a) * 0.45;
        const midAngle = (a1 + a2) * 0.5 + Math.cos(timeSec * 15 + a) * 0.5;
        const midR = radius * (0.35 + ((a % 3) * 0.14));

        ctx.beginPath();
        ctx.moveTo(
          cx + Math.cos(a1) * radius * 0.95,
          cy + Math.sin(a1) * radius * 0.95
        );
        ctx.lineTo(
          cx + Math.cos(midAngle) * midR,
          cy + Math.sin(midAngle) * midR
        );
        ctx.lineTo(
          cx + Math.cos(a2) * radius * 0.95,
          cy + Math.sin(a2) * radius * 0.95
        );
        ctx.strokeStyle = 'rgba(244, 255, 249, 0.7)';
        ctx.lineWidth = 1.15;
        ctx.stroke();
      }

      // Blinding white-mint singularity core
      const coreGrad = ctx.createRadialGradient(
        cx,
        cy,
        0,
        cx,
        cy,
        radius * 0.52
      );
      coreGrad.addColorStop(0, '#ffffff');
      coreGrad.addColorStop(0.42, '#f4fff9');
      coreGrad.addColorStop(0.78, 'rgba(71, 245, 156, 0.65)');
      coreGrad.addColorStop(1, 'rgba(71, 245, 156, 0)');
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 0.52, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const tick = (now) => {
      if (isDoneRef.current) return;
      if (startTime === null) startTime = now;
      const elapsed = (now - startTime) / 1000;

      if (elapsed >= TOTAL_DURATION) {
        finishIntro();
        return;
      }

      const cx = width / 2;
      const cy = height / 2;
      const maxScreenR = Math.hypot(cx, cy);
      // Big commanding cracking bubble before detonation
      const bigBubbleMaxR = Math.min(width, height) * 0.22 + 32;

      // Unlock page scroll & fade bottom telemetry right when blast triggers
      if (elapsed >= STAGE2_BUBBLE_END && !hudHiddenForBlast) {
        hudHiddenForBlast = true;
        document.body.style.overflow = prevOverflow;
        setPhase('blasting');
      }

      // Smoothly building seismic tremor peaking just before detonation
      let shakeX = 0;
      let shakeY = 0;
      if (elapsed > STAGE1_CRACK_END * 0.6 && elapsed < STAGE2_BUBBLE_END) {
        const tension =
          (elapsed - STAGE1_CRACK_END * 0.6) /
          (STAGE2_BUBBLE_END - STAGE1_CRACK_END * 0.6);
        const amp = tension * tension * 4.2;
        shakeX = Math.sin(elapsed * 52) * amp;
        shakeY = Math.cos(elapsed * 58) * amp;
      }

      ctx.clearRect(0, 0, width, height);

      // 1. Draw obsidian micro-dot wall
      drawGridWall(shakeX, shakeY);

      const scx = cx + shakeX;
      const scy = cy + shakeY;

      if (elapsed < STAGE1_CRACK_END) {
        // STAGE 1: Small cracks slowly propagate outward from a tiny pinpoint spark
        const rawP = elapsed / STAGE1_CRACK_END;
        const crackEase = 1 - Math.pow(1 - rawP, 2.2);

        // Pinpoint ignition spark at center
        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        const sparkR = 4 + crackEase * 12;
        const sparkGrad = ctx.createRadialGradient(scx, scy, 0, scx, scy, sparkR);
        sparkGrad.addColorStop(0, '#ffffff');
        sparkGrad.addColorStop(0.5, 'rgba(71, 245, 156, 0.85)');
        sparkGrad.addColorStop(1, 'rgba(71, 245, 156, 0)');
        ctx.fillStyle = sparkGrad;
        ctx.beginPath();
        ctx.arc(scx, scy, sparkR, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        drawFractureTendrils(
          scx,
          scy,
          maxScreenR * 0.68,
          crackEase,
          0,
          elapsed,
          0.45 + crackEase * 0.5
        );
      } else if (elapsed < STAGE2_BUBBLE_END) {
        // STAGE 2: Cracks convert & condense into the big cracking bubble
        const rawBubbleP =
          (elapsed - STAGE1_CRACK_END) / (STAGE2_BUBBLE_END - STAGE1_CRACK_END);
        // Smooth cubic ease-in-out growth so there is zero sudden jump
        const bubbleEase =
          rawBubbleP < 0.5
            ? 4 * rawBubbleP * rawBubbleP * rawBubbleP
            : 1 - Math.pow(-2 * rawBubbleP + 2, 3) / 2;

        const pulse = Math.sin(elapsed * 26) * (3.5 * rawBubbleP);
        const currentBubbleR = 14 + bubbleEase * (bigBubbleMaxR - 14) + pulse;

        // Outer cracks draw inward and convert into the growing bubble's shell
        const tendrilReach = maxScreenR * (0.68 - bubbleEase * 0.34);
        const tendrilAlpha = 0.95 - bubbleEase * 0.45;

        drawFractureTendrils(
          scx,
          scy,
          tendrilReach,
          1,
          currentBubbleR,
          elapsed,
          tendrilAlpha
        );

        drawCrackingBubble(scx, scy, currentBubbleR, rawBubbleP, elapsed);
      } else {
        // STAGE 3: The big cracking bubble blasts open to reveal the main page
        const rawBlastP = Math.min(
          1,
          (elapsed - STAGE2_BUBBLE_END) / (TOTAL_DURATION - STAGE2_BUBBLE_END)
        );
        const blastEase = 1 - Math.pow(1 - rawBlastP, 3.0);
        const blastRadius = Math.max(
          1,
          bigBubbleMaxR + blastEase * (maxScreenR * 1.2)
        );
        const fadeOut = 1 - rawBlastP;

        // Carve expanding circular blast hole out of the dark wall
        ctx.save();
        ctx.globalCompositeOperation = 'destination-out';
        const holeGrad = ctx.createRadialGradient(
          cx,
          cy,
          blastRadius * 0.72,
          cx,
          cy,
          blastRadius
        );
        holeGrad.addColorStop(0, 'rgba(0, 0, 0, 1)');
        holeGrad.addColorStop(0.86, 'rgba(0, 0, 0, 0.96)');
        holeGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = holeGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, blastRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Blazing electric-mint & white-hot shockwave ring on the blast perimeter
        ctx.save();
        ctx.globalCompositeOperation = 'lighter';

        const ringThickness = Math.max(8, 64 * fadeOut);
        const shockGrad = ctx.createRadialGradient(
          cx,
          cy,
          Math.max(0.1, blastRadius - ringThickness),
          cx,
          cy,
          blastRadius + ringThickness * 0.65
        );
        shockGrad.addColorStop(0, 'rgba(16, 185, 129, 0)');
        shockGrad.addColorStop(0.45, `rgba(71, 245, 156, ${0.88 * fadeOut})`);
        shockGrad.addColorStop(0.72, `rgba(244, 255, 249, ${0.96 * fadeOut})`);
        shockGrad.addColorStop(1, 'rgba(71, 245, 156, 0)');

        ctx.fillStyle = shockGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, blastRadius + ringThickness * 0.65, 0, Math.PI * 2);
        ctx.fill();

        // High-velocity mint spark streaks flying outward from the detonation
        const { sparks } = networkRef.current;
        for (const spark of sparks) {
          const dist =
            bigBubbleMaxR * 0.85 + blastEase * maxScreenR * spark.speed * 1.1;
          const x1 = cx + Math.cos(spark.angle) * dist;
          const y1 = cy + Math.sin(spark.angle) * dist;
          const x2 =
            cx +
            Math.cos(spark.angle) * Math.max(0, dist - spark.length * fadeOut);
          const y2 =
            cy +
            Math.sin(spark.angle) * Math.max(0, dist - spark.length * fadeOut);

          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.strokeStyle = `rgba(126, 252, 192, ${0.92 * fadeOut})`;
          ctx.lineWidth = spark.size;
          ctx.lineCap = 'round';
          ctx.stroke();
        }

        ctx.restore();
      }

      rafRef.current = window.requestAnimationFrame(tick);
    };

    rafRef.current = window.requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [finishIntro]);

  if (phase === 'done') return null;

  const isBlasting = phase === 'blasting';

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[100] pointer-events-none select-none overflow-hidden"
    >
      <canvas ref={canvasRef} className="block w-full h-full" />

      {/* Bottom Telemetry Stamp */}
      <div
        className={`absolute bottom-8 left-6 sm:left-10 flex items-center gap-2.5 font-mono text-[10px] sm:text-xs tracking-[0.22em] uppercase text-zinc-300 transition-opacity duration-300 ${
          isBlasting ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <span className="w-2 h-2 rounded-full bg-[#47f59c] shadow-[0_0_10px_#47f59c] animate-ping" />
        <span className="drop-shadow-[0_0_8px_rgba(71,245,156,0.65)]">
          {brandTag}
        </span>
      </div>

      {/* Interactive Skip Button */}
      <button
        type="button"
        onClick={finishIntro}
        className={`pointer-events-auto absolute bottom-7 right-6 sm:right-10 z-20 px-3 py-1 rounded-full font-mono text-[10px] tracking-widest uppercase text-zinc-400 bg-black/60 border border-white/[0.12] hover:text-[#47f59c] hover:border-[#47f59c]/50 transition-all ${
          isBlasting ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        Skip [ESC]
      </button>
    </div>
  );
}