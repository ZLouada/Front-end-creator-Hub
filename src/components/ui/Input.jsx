import React, { forwardRef } from 'react';

const variantStyles = {
  default: [
    'bg-brand-50/50 border-2 border-brand-200/50',
    'focus:bg-white focus:border-brand-400',
    'focus:shadow-[0_0_0_4px_rgba(255,221,0,0.12),0_4px_16px_rgba(255,221,0,0.06)]',
    'focus:-translate-y-px',
    'placeholder-gray-400 text-brand-900',
  ].join(' '),
  filled: [
    'bg-brand-100/60 border-2 border-transparent',
    'focus:bg-white focus:border-brand-400',
    'focus:shadow-[0_0_0_4px_rgba(255,221,0,0.12)]',
    'placeholder-brand-600/40 text-brand-900',
  ].join(' '),
  dark: [
    'bg-white/5 border-2 border-white/10',
    'focus:bg-white/10 focus:border-brand-400',
    'focus:shadow-[0_0_0_4px_rgba(255,221,0,0.08)]',
    'placeholder-gray-500 text-white',
  ].join(' '),
};

const sizeStyles = {
  sm: 'px-3 py-2 text-sm rounded-lg',
  md: 'px-4 py-3 text-sm rounded-xl',
  lg: 'px-5 py-3.5 text-base rounded-2xl',
};

const Input = forwardRef(function Input({
  variant = 'default',
  size = 'md',
  label,
  hint,
  error,
  className = '',
  ...props
}, ref) {
  return (
    <div>
      {label && (
        <label className="block text-xs font-semibold text-brand-700 tracking-wide mb-1.5">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={`
          w-full font-medium outline-none
          transition-all duration-300 ease-smooth
          ${variantStyles[variant] || variantStyles.default}
          ${sizeStyles[size] || sizeStyles.md}
          ${error ? 'border-danger focus:border-danger-600 focus:shadow-[0_0_0_4px_rgba(255,92,92,0.12)]' : ''}
          ${className}
        `.trim().replace(/\s+/g, ' ')}
        {...props}
      />
      {hint && !error && (
        <p className="text-xs text-gray-400 mt-1.5">{hint}</p>
      )}
      {error && (
        <p className="text-xs text-danger font-medium mt-1.5">{error}</p>
      )}
    </div>
  );
});

export default Input;
