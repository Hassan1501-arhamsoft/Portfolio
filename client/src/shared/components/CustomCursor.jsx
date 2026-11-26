import { useEffect, useRef } from 'react';

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, textarea, select, label, [data-cursor="interactive"], [data-cursor-label]';

function resolveCursorTag(target) {
  if (!(target instanceof Element)) return '';

  const customEl = target.closest('[data-cursor-label]');
  if (customEl) {
    return customEl.getAttribute('data-cursor-label') || '';
  }

  if (target.closest('input, textarea, select')) return 'INPUT';
  if (target.closest('article[role="button"]')) return 'INSPECT';

  const anchor = target.closest('a');
  if (anchor) {
    return anchor.getAttribute('target') === '_blank' ? 'OPEN ↗' : 'JUMP';
  }

  if (target.closest('button, [role="button"], label')) return 'SELECT';
  return '';
}

export function CustomCursor({ hideNativeCursor = true, speed = 36 }) {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pulseRef = useRef(null);
  const tagRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const isFinePointer = window.matchMedia(
      '(hover: hover) and (pointer: fine)'
    ).matches;
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (!isFinePointer || prefersReducedMotion) return;

    const dotEl = dotRef.current;
    const ringEl = ringRef.current;
    const pulseEl = pulseRef.current;
    const tagEl = tagRef.current;
    if (!dotEl || !ringEl || !pulseEl || !tagEl) return;

    let styleTag = null;
    if (hideNativeCursor) {
      styleTag = document.createElement('style');
      styleTag.setAttribute('data-custom-cursor', 'true');
      styleTag.textContent =
        '@media (hover: hover) and (pointer: fine) { html, body, *, *::before, *::after { cursor: none !important; } }';
      document.head.appendChild(styleTag);
    }

    let targetX = -100;
    let targetY = -100;
    let ringX = -100;
    let ringY = -100;
    let vx = 0;
    let visible = false;
    let hovering = false;
    let pressed = false;
    let activeTag = '';
    let rafId = null;
    let lastTime = performance.now();

    const applyVisualState = () => {
      const scale = pressed ? 0.8 : hovering ? 1.35 : 1;
      const tiltDeg = Math.max(-12, Math.min(12, vx * 0.35));

      ringEl.style.transform = `translate3d(${ringX.toFixed(1)}px, ${ringY.toFixed(
        1
      )}px, 0) translate(-50%, -50%) scale(${scale}) rotate(${tiltDeg.toFixed(1)}deg)`;

      dotEl.style.transform = `translate3d(${targetX.toFixed(1)}px, ${targetY.toFixed(
        1
      )}px, 0) translate(-50%, -50%) scale(${pressed ? 1.35 : hovering ? 0.65 : 1})`;

      tagEl.style.transform = `translate3d(${(ringX + 20).toFixed(1)}px, ${(
        ringY + 16
      ).toFixed(1)}px, 0)`;
    };

    const tick = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      const dx = targetX - ringX;
      const dy = targetY - ringY;

      // Frame-rate-independent exponential smoothing for fast, crisp tracking
      const factor = 1 - Math.exp(-speed * dt);
      vx = dx * factor;
      ringX += vx;
      ringY += dy * factor;

      applyVisualState();

      if (Math.abs(dx) > 0.08 || Math.abs(dy) > 0.08) {
        rafId = window.requestAnimationFrame(tick);
      } else {
        vx = 0;
        ringX = targetX;
        ringY = targetY;
        applyVisualState();
        rafId = null;
      }
    };

    const wakeLoop = () => {
      if (rafId === null) {
        lastTime = performance.now();
        rafId = window.requestAnimationFrame(tick);
      }
    };

    const handleMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;

      if (!visible) {
        visible = true;
        ringX = targetX;
        ringY = targetY;
        dotEl.style.opacity = '1';
        ringEl.style.opacity = '1';
      }

      dotEl.style.transform = `translate3d(${targetX.toFixed(1)}px, ${targetY.toFixed(
        1
      )}px, 0) translate(-50%, -50%) scale(${pressed ? 1.35 : hovering ? 0.65 : 1})`;

      wakeLoop();
    };

    const handleMouseOver = (e) => {
      const target = e.target instanceof Element ? e.target : null;
      const interactiveEl = target?.closest(INTERACTIVE_SELECTOR);
      const nextHovering = Boolean(interactiveEl);
      const nextTag = nextHovering ? resolveCursorTag(target) : '';

      if (nextHovering !== hovering) {
        hovering = nextHovering;
        ringEl.dataset.hover = hovering ? 'true' : 'false';
        wakeLoop();
      }

      if (nextTag !== activeTag) {
        activeTag = nextTag;
        if (activeTag) {
          tagEl.textContent = activeTag;
          tagEl.style.opacity = '1';
        } else {
          tagEl.style.opacity = '0';
        }
      }
    };

    const handleMouseDown = () => {
      pressed = true;
      wakeLoop();

      if (visible && typeof pulseEl.animate === 'function') {
        pulseEl.animate(
          [
            {
              transform: `translate3d(${targetX.toFixed(1)}px, ${targetY.toFixed(
                1
              )}px, 0) translate(-50%, -50%) scale(0.45)`,
              opacity: 0.85,
            },
            {
              transform: `translate3d(${targetX.toFixed(1)}px, ${targetY.toFixed(
                1
              )}px, 0) translate(-50%, -50%) scale(2.2)`,
              opacity: 0,
            },
          ],
          {
            duration: 320,
            easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
          }
        );
      }
    };

    const handleMouseUp = () => {
      pressed = false;
      wakeLoop();
    };

    const handleMouseLeave = () => {
      visible = false;
      dotEl.style.opacity = '0';
      ringEl.style.opacity = '0';
      tagEl.style.opacity = '0';
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (rafId !== null) window.cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (styleTag) styleTag.remove();
    };
  }, [hideNativeCursor, speed]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[9999]">
      {/* Fast Click Shockwave Pulse Ring */}
      <div
        ref={pulseRef}
        style={{ opacity: 0 }}
        className="fixed top-0 left-0 w-9 h-9 rounded-full border border-[#47f59c] shadow-[0_0_20px_rgba(71,245,156,0.5)] will-change-transform"
      />

      {/* Trailing Aerospace SVG Reticle + Target-Lock Brackets */}
      <div
        ref={ringRef}
        data-hover="false"
        style={{ opacity: 0 }}
        className="group/reticle fixed top-0 left-0 w-10 h-10 transition-opacity duration-100 will-change-transform"
      >
        <div className="absolute inset-1 rounded-full bg-[#47f59c]/0 blur-md transition-colors duration-200 group-data-[hover=true]/reticle:bg-[#47f59c]/20" />

        <svg
          viewBox="0 0 40 40"
          fill="none"
          className="w-full h-full overflow-visible drop-shadow-[0_0_10px_rgba(71,245,156,0.3)]"
        >
          {/* Fast Rotating Outer Segmented Orbital Arc */}
          <circle
            cx="20"
            cy="20"
            r="16.5"
            stroke="#47f59c"
            strokeOpacity="0.45"
            strokeWidth="1.1"
            strokeDasharray="18 8 4 8"
            className="origin-center animate-[spin_4s_linear_infinite] group-data-[hover=true]/reticle:stroke-opacity-95"
          />

          {/* Inner Precision Hairline Ring */}
          <circle
            cx="20"
            cy="20"
            r="11.5"
            stroke="#7efcc0"
            strokeOpacity="0.18"
            strokeWidth="0.75"
            className="transition-all duration-200 group-data-[hover=true]/reticle:stroke-opacity-55"
          />

          {/* 45° Corner Target-Lock Brackets */}
          <g
            stroke="#47f59c"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="transition-opacity duration-150 opacity-55 group-data-[hover=true]/reticle:opacity-100"
          >
            <path d="M5 11V5H11" />
            <path d="M29 5H35V11" />
            <path d="M35 29V35H29" />
            <path d="M11 35H5V29" />
          </g>
        </svg>
      </div>

      {/* Instant Center Precision Core */}
      <div
        ref={dotRef}
        style={{ opacity: 0 }}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-[#7efcc0] shadow-[0_0_10px_#47f59c,0_0_2px_#ffffff] transition-opacity duration-100 will-change-transform"
      />

      {/* Contextual Micro-HUD Action Badge */}
      <div
        ref={tagRef}
        style={{ opacity: 0 }}
        className="fixed top-0 left-0 px-1.5 py-0.5 rounded bg-[#090d0b]/90 border border-[#47f59c]/45 font-mono text-[9px] font-semibold tracking-[0.16em] uppercase text-[#7efcc0] shadow-[0_4px_14px_rgba(0,0,0,0.85)] backdrop-blur-md transition-opacity duration-100 will-change-transform"
      />
    </div>
  );
}