import { useEffect, useState } from 'react';

export function useScrollSpy(sectionIds, offset = '0px 0px -55% 0px') {
  const [activeId, setActiveId] = useState(sectionIds[0] || '');

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible?.target?.id) {
          setActiveId(visible.target.id);
        }
      },
      { rootMargin: offset, threshold: 0.1 }
    );

    elements.forEach((el) => observer.observe(el));

    const handleBottomEdge = () => {
      const nearBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 40;
      if (nearBottom && sectionIds.length > 0) {
        setActiveId(sectionIds[sectionIds.length - 1]);
      }
    };

    window.addEventListener('scroll', handleBottomEdge, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleBottomEdge);
    };
  }, [sectionIds, offset]);

  return activeId;
}