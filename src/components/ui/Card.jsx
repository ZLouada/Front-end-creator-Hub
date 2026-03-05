import React, { forwardRef } from 'react';

const variants = {
  default: 'card-neu',
  yellow:  'card-neu bg-brand-yellow',
  dark:    'bg-brand-charcoal border-4 border-brand-charcoal text-white shadow-neu-yellow',
  flat:    'bg-white border-4 border-brand-charcoal',
};

const Card = forwardRef(function Card({
  variant = 'default',
  padding = 'p-6',
  children,
  className = '',
  ...props
}, ref) {
  return (
    <div
      ref={ref}
      className={`
        ${variants[variant] || variants.default}
        ${padding}
        ${className}
      `.trim().replace(/\s+/g, ' ')}
      {...props}
    >
      {children}
    </div>
  );
});

export default Card;
