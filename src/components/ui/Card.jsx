import React, { forwardRef } from 'react';

const variants = {
  default: 'card-neu',
  yellow:  'card-neu bg-gray-50',
  dark:    'bg-brand-charcoal border border-transparent text-white shadow-editorial rounded-2xl',
  flat:    'bg-white border border-editorial-border rounded-2xl',
};

const Card = forwardRef(function Card({
  variant = 'default',
  padding = 'p-8',
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
