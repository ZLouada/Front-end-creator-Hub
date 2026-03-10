import React, { forwardRef } from 'react';

const variantStyles = {
  default: 'input-neu',
  dark:    'input-neu bg-brand-charcoal text-white placeholder-gray-500 border-gray-700',
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
        <label className="block text-xs font-medium tracking-wide text-gray-600 dark:text-gray-400 mb-2">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={`
          w-full font-normal outline-none rounded-xl
          ${variantStyles[variant] || variantStyles.default}
          ${sizeStyles[size] || sizeStyles.md}
          ${error ? 'border-danger focus:ring-2 focus:ring-danger/20' : ''}
          ${className}
        `.trim().replace(/\s+/g, ' ')}
        {...props}
      />
      {hint && !error && (
        <p className="text-xs font-normal text-gray-500 mt-2">{hint}</p>
      )}
      {error && (
        <p className="text-xs font-medium text-danger mt-2">{error}</p>
      )}
    </div>
  );
});

export default Input;
