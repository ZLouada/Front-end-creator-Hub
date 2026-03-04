import React, { forwardRef } from 'react';

const variants = {
  default: [
    'bg-white border border-brand-200/50',
    'shadow-soft',
    'card-hover',
  ].join(' '),
  glass: [
    'glass-card',
    'card-hover',
  ].join(' '),
  elevated: [
    'bg-white border border-brand-200/30',
    'shadow-soft-md',
    'card-hover',
  ].join(' '),
  dark: [
    'bg-brand-900 border border-white/5',
    'shadow-soft-md text-white',
    'card-hover',
  ].join(' '),
  highlight: [
    'bg-gradient-to-br from-brand-50 to-brand-100',
    'border border-brand-300/30',
    'shadow-soft',
    'card-hover',
  ].join(' '),
};

const Card = forwardRef(function Card({
  variant = 'default',
  padding = 'p-6',
  rounded = 'rounded-2xl',
  children,
  className = '',
  ...props
}, ref) {
  return (
    <div
      ref={ref}
      className={`
        overflow-hidden
        transition-all duration-300 ease-smooth
        ${variants[variant] || variants.default}
        ${padding}
        ${rounded}
        ${className}
      `.trim().replace(/\s+/g, ' ')}
      {...props}
    >
      {children}
    </div>
  );
});

export default Card;
