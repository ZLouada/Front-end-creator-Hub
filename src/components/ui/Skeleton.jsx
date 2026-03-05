import React from 'react';

export default function Skeleton({
  width = '100%',
  height = '1rem',
  borderRadius = '0.5rem',
  className = '',
}) {
  return (
    <div
      className={className}
      style={{
        width,
        height,
        borderRadius,
        background: 'var(--bg-card, #e4e4e7)',
        backgroundImage:
          'linear-gradient(90deg, var(--bg-card, #e4e4e7) 0%, var(--bg-surface, #f4f4f5) 50%, var(--bg-card, #e4e4e7) 100%)',
        backgroundSize: '400px 100%',
        animation: 'shimmer 1.5s ease-in-out infinite',
      }}
    />
  );
}
