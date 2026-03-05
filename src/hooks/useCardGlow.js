import { useCallback } from 'react';

export default function useCardGlow() {
  const handleMouseMove = useCallback((e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--glow-x', `${x}px`);
    card.style.setProperty('--glow-y', `${y}px`);
  }, []);

  const handleMouseLeave = useCallback((e) => {
    e.currentTarget.style.removeProperty('--glow-x');
    e.currentTarget.style.removeProperty('--glow-y');
  }, []);

  return { onMouseMove: handleMouseMove, onMouseLeave: handleMouseLeave };
}
