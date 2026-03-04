import React, { forwardRef } from 'react';

const variants = {
  primary: [
    'bg-gradient-to-br from-brand-400 to-brand-500',
    'text-brand-900 font-bold',
    'shadow-soft hover:shadow-soft-md',
    'hover:-translate-y-0.5',
    'active:translate-y-0 active:shadow-soft-sm',
  ].join(' '),
  secondary: [
    'bg-white border border-brand-300',
    'text-brand-900 font-bold',
    'shadow-soft-sm hover:shadow-soft',
    'hover:bg-brand-50 hover:-translate-y-0.5',
    'active:translate-y-0',
  ].join(' '),
  ghost: [
    'bg-transparent text-brand-700 font-semibold',
    'hover:bg-brand-100',
    'active:bg-brand-200',
  ].join(' '),
  dark: [
    'bg-brand-900 text-white font-bold',
    'shadow-soft hover:shadow-soft-md',
    'hover:-translate-y-0.5 hover:bg-gray-800',
    'active:translate-y-0',
  ].join(' '),
  danger: [
    'bg-danger text-white font-bold',
    'shadow-sm hover:shadow-md hover:bg-danger-600',
    'hover:-translate-y-0.5',
    'active:translate-y-0',
  ].join(' '),
  info: [
    'bg-info text-white font-bold',
    'shadow-sm hover:shadow-md hover:bg-info-600',
    'hover:-translate-y-0.5',
    'active:translate-y-0',
  ].join(' '),
};

const sizes = {
  sm: 'px-4 py-2 text-sm rounded-xl gap-1.5',
  md: 'px-6 py-3 text-sm rounded-xl gap-2',
  lg: 'px-8 py-4 text-base rounded-2xl gap-2.5',
  xl: 'px-10 py-5 text-lg rounded-2xl gap-3',
};

const Button = forwardRef(function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  shimmer = false,
  glow = false,
  ...props
}, ref) {
  return (
    <button
      ref={ref}
      className={`
        inline-flex items-center justify-center
        transition-all duration-300 ease-smooth
        disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none
        ${variants[variant] || variants.primary}
        ${sizes[size] || sizes.md}
        ${shimmer ? 'shimmer-btn' : ''}
        ${glow ? 'animate-pulse-glow' : ''}
        ${className}
      `.trim().replace(/\s+/g, ' ')}
      {...props}
    >
      {children}
    </button>
  );
});

export default Button;
