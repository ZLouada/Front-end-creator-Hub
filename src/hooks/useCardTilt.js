import { useCallback, useRef } from 'react';

export default function useCardTilt(maxDeg = 6) {
  const rafId = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const rotateY = (x - 0.5) * maxDeg * 2;
    const rotateX = (0.5 - y) * maxDeg * 2;

    if (rafId.current) cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => {
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
  }, [maxDeg]);

  const handleMouseLeave = useCallback((e) => {
    if (rafId.current) cancelAnimationFrame(rafId.current);
    e.currentTarget.style.transform = '';
  }, []);

  return { onMouseMove: handleMouseMove, onMouseLeave: handleMouseLeave };
}
