import React, { forwardRef } from 'react';

const variantStyles = {
  default: 'input-neu',
  dark:    'input-neu bg-brand-charcoal text-white placeholder-gray-500 border-brand-charcoal',
};

const sizeStyles = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-3 text-sm',
  lg: 'px-5 py-4 text-base',
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
        <label className="block text-xs font-black uppercase tracking-wider text-brand-charcoal dark:text-gray-300 mb-2">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={`
          w-full font-bold outline-none
          ${variantStyles[variant] || variantStyles.default}
          ${sizeStyles[size] || sizeStyles.md}
          ${error ? 'border-danger focus:shadow-[5px_5px_0px_0px_#FF5C5C]' : ''}
          ${className}
        `.trim().replace(/\s+/g, ' ')}
        {...props}
      />
      {hint && !error && (
        <p className="text-xs font-bold text-brand-charcoal/60 mt-2">{hint}</p>
      )}
      {error && (
        <p className="text-xs font-black uppercase text-danger mt-2">{error}</p>
      )}
    </div>
  );
});

export default Input;
