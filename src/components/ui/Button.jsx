import React, { forwardRef } from 'react';

const variants = {
  primary:   'bg-brand-yellow text-brand-charcoal border-brand-yellow hover:bg-brand-500',
  secondary: 'bg-white text-brand-charcoal border-editorial-border hover:text-brand-yellow hover:border-editorial-border',
  dark:      'bg-brand-charcoal text-white border-transparent hover:bg-gray-800',
  danger:    'bg-danger text-white border-danger hover:bg-red-600',
  info:      'bg-info text-white border-info hover:bg-blue-600',
  ghost:     'bg-transparent text-brand-charcoal border-transparent shadow-none hover:bg-editorial-hover',
};

const sizes = {
  sm: 'px-5 py-2.5 text-xs',
  md: 'px-7 py-3.5 text-sm',
  lg: 'px-9 py-4.5 text-base',
  xl: 'px-12 py-6 text-lg',
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
        font-semibold tracking-normal
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
