import React, { forwardRef } from 'react';

const variants = {
  primary:   'bg-brand-yellow text-brand-charcoal',
  secondary: 'bg-white text-brand-charcoal',
  dark:      'bg-brand-charcoal text-white',
  danger:    'bg-danger text-white',
  info:      'bg-info text-white',
  ghost:     'bg-transparent text-brand-charcoal border-transparent shadow-none hover:bg-brand-yellow',
};

const sizes = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
  xl: 'px-10 py-5 text-lg',
};

const Button = forwardRef(function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}, ref) {
  return (
    <button
      ref={ref}
      className={`
        btn-neu rounded-full
        font-black uppercase tracking-wider
        disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none
        ${variants[variant] || variants.primary}
        ${sizes[size] || sizes.md}
        ${className}
      `.trim().replace(/\s+/g, ' ')}
      {...props}
    >
      {children}
    </button>
  );
});

export default Button;
