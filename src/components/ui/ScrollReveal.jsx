import React from 'react';
import useScrollReveal from '../../hooks/useScrollReveal';

const ANIMATION_MAP = {
  'fade-up': 'reveal-fade-up',
  'fade-in': 'reveal-fade-in',
  'slide-left': 'reveal-slide-left',
  'slide-right': 'reveal-slide-right',
  'scale-in': 'reveal-scale-in',
};

export default function ScrollReveal({
  children,
  animation = 'fade-up',
  delay = 0,
  threshold = 0.15,
  className = '',
}) {
  const { ref, isVisible } = useScrollReveal({ threshold });
  const animClass = ANIMATION_MAP[animation] || ANIMATION_MAP['fade-up'];

  return (
    <div
      ref={ref}
      className={`scroll-reveal ${animClass} ${isVisible ? 'visible' : ''} ${className}`}
      style={delay > 0 ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}
