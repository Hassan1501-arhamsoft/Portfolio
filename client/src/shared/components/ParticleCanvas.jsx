import { useEffect, useRef } from 'react';

const MINT_RGB = '71, 245, 156';
const NEUTRAL_RGB = '228, 228, 231';

export function ParticleCanvas({
  linkDistance = 140,
  mouseRadius = 200,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let animationFrameId = null;
    let isInViewport = true;
    let width = 0;
    let height = 0;
    let particles = [];

    const pointer = {
      x: -9999,
      y: -9999,
      active: false,
    };

    const linkDistSq = linkDistance * linkDistance;
    const mouseDistSq = mouseRadius * mouseRadius;

    const initParticles = () => {
      // Scale node density cleanly by viewport area (caps at 90 on desktop, ~40 on mobile)
      const area = width * height;
      const count = Math.min(90, Math.max(35, Math.floor(area / 14500)));

      particles = Array.from({ length: count }, (_, idx) => {
        const isAnchor = idx % 7 === 0; // Periodic hub nodes with mint accents
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

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      width = rect.width;
      height = rect.height;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      initParticles();
      if (prefersReducedMotion) renderFrame(false);
    };

    const handlePointerMove = (e) => {
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
      if (prefersReducedMotion) return;
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      if (clickX < 0 || clickX > rect.width || clickY < 0 || clickY > rect.height) {
        return;
      }

      // Send a gentle kinetic web ripple outward from click point
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

    const renderFrame = (shouldStep = true) => {
      ctx.clearRect(0, 0, width, height);

      // 1. Update node positions & elastic cursor web physics
      if (shouldStep) {
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];

          // Smoothly relax velocity back toward natural drift speed
          p.vx += (p.baseVx - p.vx) * 0.035;
          p.vy += (p.baseVy - p.vy) * 0.035;

          if (pointer.active) {
            const dx = pointer.x - p.x;
            const dy = pointer.y - p.y;
            const distSq = dx * dx + dy * dy;

            // Elastic web tension: gently pull mid-range nodes, keep inner ring clear
            if (distSq < mouseDistSq && distSq > 1600) {
              const dist = Math.sqrt(distSq);
              const pull = (1 - dist / mouseRadius) * 0.018;
              p.vx += (dx / dist) * pull;
              p.vy += (dy / dist) * pull;
            }
          }

          p.x += p.vx;
          p.y += p.vy;

          // Seamless edge wrap with margin so lines don't snap abruptly
          const margin = 24;
          if (p.x < -margin) p.x = width + margin;
          else if (p.x > width + margin) p.x = -margin;

          if (p.y < -margin) p.y = height + margin;
          else if (p.y > height + margin) p.y = -margin;
        }
      }

      // 2. Draw Spider-Web Filaments (Node-to-Node)
      ctx.lineWidth = 0.85;
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];

        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < linkDistSq) {
            const ratio = 1 - Math.sqrt(distSq) / linkDistance;
            const usesMint = a.isAnchor && b.isAnchor;
            const alpha = usesMint ? ratio * 0.24 : ratio * 0.12;

            ctx.strokeStyle = usesMint
              ? `rgba(${MINT_RGB}, ${alpha.toFixed(3)})`
              : `rgba(${NEUTRAL_RGB}, ${alpha.toFixed(3)})`;

            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // 3. Draw Interactive Cursor Web Strands & Nodes
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        let cursorInfluence = 0;

        if (pointer.active) {
          const dx = pointer.x - p.x;
          const dy = pointer.y - p.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < mouseDistSq) {
            cursorInfluence = 1 - Math.sqrt(distSq) / mouseRadius;

            // Luminous Mint Filament from Cursor to Node
            ctx.strokeStyle = `rgba(${MINT_RGB}, ${(cursorInfluence * 0.52).toFixed(3)})`;
            ctx.lineWidth = 0.7 + cursorInfluence * 0.8;
            ctx.beginPath();
            ctx.moveTo(pointer.x, pointer.y);
            ctx.lineTo(p.x, p.y);
            ctx.stroke();
          }
        }

        // Draw Web Node Vertex
        const nodeRadius = p.radius + cursorInfluence * 1.4;
        ctx.beginPath();
        ctx.arc(p.x, p.y, nodeRadius, 0, Math.PI * 2);

        if (cursorInfluence > 0.05) {
          ctx.fillStyle = `rgba(${MINT_RGB}, ${(0.45 + cursorInfluence * 0.55).toFixed(3)})`;
        } else if (p.isAnchor) {
          ctx.fillStyle = `rgba(${MINT_RGB}, 0.42)`;
        } else {
          ctx.fillStyle = `rgba(${NEUTRAL_RGB}, 0.24)`;
        }

        ctx.fill();
      }

      // 4. Subtle Cursor Anchor Node Ring
      if (pointer.active) {
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

    const animate = () => {
      if (isInViewport && !prefersReducedMotion) {
        renderFrame(true);
      }
      animationFrameId = window.requestAnimationFrame(animate);
    };

    // Pause animation when Hero scrolls off-screen to save battery/CPU
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isInViewport = entry.isIntersecting;
      },
      { threshold: 0.02 }
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

    if (!prefersReducedMotion) {
      animationFrameId = window.requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrameId) window.cancelAnimationFrame(animationFrameId);
      visibilityObserver.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('mouseleave', handlePointerLeave);
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