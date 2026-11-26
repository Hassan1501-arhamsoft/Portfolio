import { useEffect, useRef } from 'react';

const MINT_RGB = '71, 245, 156';
const NEUTRAL_RGB = '228, 228, 231';

// Precomputed bucket styles eliminate per-segment string allocations & state thrashing
const NEUTRAL_STYLES = [
  `rgba(${NEUTRAL_RGB}, 0.04)`,
  `rgba(${NEUTRAL_RGB}, 0.08)`,
  `rgba(${NEUTRAL_RGB}, 0.12)`,
];
const MINT_STYLES = [
  `rgba(${MINT_RGB}, 0.12)`,
  `rgba(${MINT_RGB}, 0.23)`,
];

export function ParticleCanvas({
  linkDistance = 140,
  mouseRadius = 200,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true });
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let animationFrameId = null;
    let isInViewport = false;
    let isTabHidden = document.hidden;
    let width = 0;
    let height = 0;
    let particles = [];

    // Reusable coordinate buffers for batched line rendering (zero GC churn)
    const neutralBuckets = [[], [], []];
    const mintBuckets = [[], []];

    const pointer = {
      x: -9999,
      y: -9999,
      active: false,
    };

    const linkDistSq = linkDistance * linkDistance;
    const invLinkDist = 1 / linkDistance;
    const mouseDistSq = mouseRadius * mouseRadius;
    const invMouseRadius = 1 / mouseRadius;

    const initParticles = () => {
      const isMobile = width < 768;
      const area = width * height;
      // Lean node budget on mobile so Lighthouse 4x CPU throttle stays under budget
      const maxNodes = isMobile ? 26 : 75;
      const minNodes = isMobile ? 16 : 32;
      const divisor = isMobile ? 19000 : 15500;
      const count = Math.min(maxNodes, Math.max(minNodes, Math.floor(area / divisor)));

      particles = Array.from({ length: count }, (_, idx) => {
        const isAnchor = idx % 7 === 0;
        const baseVx = (Math.random() - 0.5) * 0.42;
        const baseVy = (Math.random() - 0.5) * 0.42;

        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: baseVx,
          vy: baseVy,
          baseVx,
          baseVy,
          radius: isAnchor ? 2.1 : Math.random() * 1.1 + 0.9,
          isAnchor,
        };
      });
    };

    const renderFrame = (shouldStep = true) => {
      if (width === 0 || height === 0) return;
      ctx.clearRect(0, 0, width, height);

      const len = particles.length;

      // 1. Update node positions & elastic cursor web physics
      if (shouldStep) {
        for (let i = 0; i < len; i++) {
          const p = particles[i];

          p.vx += (p.baseVx - p.vx) * 0.035;
          p.vy += (p.baseVy - p.vy) * 0.035;

          if (pointer.active) {
            const dx = pointer.x - p.x;
            const dy = pointer.y - p.y;
            const distSq = dx * dx + dy * dy;

            if (distSq < mouseDistSq && distSq > 1600) {
              const dist = Math.sqrt(distSq);
              const pull = (1 - dist * invMouseRadius) * 0.018;
              p.vx += (dx / dist) * pull;
              p.vy += (dy / dist) * pull;
            }
          }

          p.x += p.vx;
          p.y += p.vy;

          const margin = 24;
          if (p.x < -margin) p.x = width + margin;
          else if (p.x > width + margin) p.x = -margin;

          if (p.y < -margin) p.y = height + margin;
          else if (p.y > height + margin) p.y = -margin;
        }
      }

      // 2. Bucket Spider-Web Filaments (Node-to-Node)
      neutralBuckets[0].length = 0;
      neutralBuckets[1].length = 0;
      neutralBuckets[2].length = 0;
      mintBuckets[0].length = 0;
      mintBuckets[1].length = 0;

      for (let i = 0; i < len; i++) {
        const a = particles[i];

        for (let j = i + 1; j < len; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < linkDistSq) {
            const ratio = 1 - Math.sqrt(distSq) * invLinkDist;

            if (a.isAnchor && b.isAnchor) {
              const bucket = ratio > 0.5 ? mintBuckets[1] : mintBuckets[0];
              bucket.push(a.x, a.y, b.x, b.y);
            } else {
              const idx = ratio > 0.66 ? 2 : ratio > 0.33 ? 1 : 0;
              neutralBuckets[idx].push(a.x, a.y, b.x, b.y);
            }
          }
        }
      }

      // Flush batched filaments (max 5 stroke() calls total per frame)
      ctx.lineWidth = 0.85;
      for (let b = 0; b < 3; b++) {
        const segs = neutralBuckets[b];
        if (segs.length === 0) continue;
        ctx.strokeStyle = NEUTRAL_STYLES[b];
        ctx.beginPath();
        for (let k = 0; k < segs.length; k += 4) {
          ctx.moveTo(segs[k], segs[k + 1]);
          ctx.lineTo(segs[k + 2], segs[k + 3]);
        }
        ctx.stroke();
      }

      for (let b = 0; b < 2; b++) {
        const segs = mintBuckets[b];
        if (segs.length === 0) continue;
        ctx.strokeStyle = MINT_STYLES[b];
        ctx.beginPath();
        for (let k = 0; k < segs.length; k += 4) {
          ctx.moveTo(segs[k], segs[k + 1]);
          ctx.lineTo(segs[k + 2], segs[k + 3]);
        }
        ctx.stroke();
      }

      // 3. Batch-draw static neutral & anchor nodes
      ctx.fillStyle = `rgba(${NEUTRAL_RGB}, 0.24)`;
      ctx.beginPath();
      for (let i = 0; i < len; i++) {
        const p = particles[i];
        if (p.isAnchor) continue;
        ctx.moveTo(p.x + p.radius, p.y);
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      }
      ctx.fill();

      ctx.fillStyle = `rgba(${MINT_RGB}, 0.42)`;
      ctx.beginPath();
      for (let i = 0; i < len; i++) {
        const p = particles[i];
        if (!p.isAnchor) continue;
        ctx.moveTo(p.x + p.radius, p.y);
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      }
      ctx.fill();

      // 4. Interactive Cursor Web Strands & Highlighted Vertices (only when pointer active)
      if (pointer.active) {
        for (let i = 0; i < len; i++) {
          const p = particles[i];
          const dx = pointer.x - p.x;
          const dy = pointer.y - p.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < mouseDistSq) {
            const influence = 1 - Math.sqrt(distSq) * invMouseRadius;

            ctx.strokeStyle = `rgba(${MINT_RGB}, ${(influence * 0.52).toFixed(2)})`;
            ctx.lineWidth = 0.7 + influence * 0.8;
            ctx.beginPath();
            ctx.moveTo(pointer.x, pointer.y);
            ctx.lineTo(p.x, p.y);
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius + influence * 1.4, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${MINT_RGB}, ${(0.45 + influence * 0.55).toFixed(2)})`;
            ctx.fill();
          }
        }

        // Cursor Anchor Node Ring
        ctx.beginPath();
        ctx.arc(pointer.x, pointer.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${MINT_RGB}, 0.85)`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(pointer.x, pointer.y, 14, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${MINT_RGB}, 0.18)`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    };

    // True RAF hibernation: stops scheduling ticks completely when offscreen or hidden
    const animate = () => {
      if (!isInViewport || isTabHidden || prefersReducedMotion) {
        animationFrameId = null;
        return;
      }
      renderFrame(true);
      animationFrameId = window.requestAnimationFrame(animate);
    };

    const startLoop = () => {
      if (!animationFrameId && isInViewport && !isTabHidden && !prefersReducedMotion) {
        animationFrameId = window.requestAnimationFrame(animate);
      }
    };

    const stopLoop = () => {
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    };

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      const rect = parent.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const widthChanged = Math.abs(rect.width - width) > 2;
      const heightChangedSignificantly = Math.abs(rect.height - height) > 60;

      // Cap DPR at 1.5 on mobile to avoid 4x fill-rate bottlenecks
      const maxDpr = rect.width < 768 ? 1.5 : 2;
      const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);

      width = rect.width;
      height = rect.height;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (particles.length === 0 || widthChanged || heightChangedSignificantly) {
        initParticles();
      }

      if (prefersReducedMotion || isInViewport) {
        renderFrame(false);
      }
    };

    const handlePointerMove = (e) => {
      // Skip layout read completely when this canvas is scrolled offscreen
      if (!isInViewport) return;

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        pointer.x = x;
        pointer.y = y;
        pointer.active = true;
      } else {
        pointer.active = false;
      }
    };

    const handlePointerLeave = () => {
      pointer.active = false;
    };

    const handlePointerDown = (e) => {
      if (prefersReducedMotion || !isInViewport) return;

      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      if (clickX < 0 || clickX > rect.width || clickY < 0 || clickY > rect.height) {
        return;
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const dx = p.x - clickX;
        const dy = p.y - clickY;
        const distSq = dx * dx + dy * dy;

        if (distSq > 1 && distSq < mouseDistSq * 1.4) {
          const dist = Math.sqrt(distSq);
          const impulse = (1 - dist / (mouseRadius * 1.18)) * 2.4;
          p.vx += (dx / dist) * impulse;
          p.vy += (dy / dist) * impulse;
        }
      }
    };

    const handleVisibilityChange = () => {
      isTabHidden = document.hidden;
      if (isTabHidden) {
        stopLoop();
      } else {
        startLoop();
      }
    };

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isInViewport = entry.isIntersecting;
        if (isInViewport) {
          startLoop();
        } else {
          pointer.active = false;
          stopLoop();
        }
      },
      { rootMargin: '80px', threshold: 0.01 }
    );
    visibilityObserver.observe(canvas);

    const resizeObserver = new ResizeObserver(resizeCanvas);
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    resizeCanvas();

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    document.addEventListener('mouseleave', handlePointerLeave);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      stopLoop();
      visibilityObserver.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('mouseleave', handlePointerLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [linkDistance, mouseRadius]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="block w-full h-full pointer-events-none"
    />
  );
}