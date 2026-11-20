import { useRef, useEffect } from 'react';

export function TiltCard({ children, className = '', maxTilt = 8 }) {
  const cardRef = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const handlePointerMove = (e) => {
    if (e.pointerType !== 'mouse') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const el = cardRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const normX = (e.clientX - rect.left) / rect.width - 0.5;
    const normY = (e.clientY - rect.top) / rect.height - 0.5;

    const rotateY = (normX * maxTilt * 2).toFixed(2);
    const rotateX = (-normY * maxTilt * 2).toFixed(2);

    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      el.style.transition = 'transform 80ms ease-out';
      el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
    });
  };

  const handlePointerLeave = () => {
    const el = cardRef.current;
    if (!el) return;

    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    el.style.transition = 'transform 350ms cubic-bezier(0.22, 1, 0.36, 1)';
    el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`will-change-transform ${className}`}
    >
      {children}
    </div>
  );
}