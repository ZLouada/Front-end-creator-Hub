import React, { useState } from 'react';
import Button from '../ui/Button';

const TwoFactorAuth = ({ onVerify }) => {
  const [code, setCode] = useState(new Array(6).fill(""));

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;
    setCode([...code.map((d, idx) => (idx === index ? element.value : d))]);
    if (element.nextSibling && element.value !== "") {
      element.nextSibling.focus();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface font-sans">
      <div
        className="bg-surface-card p-8 rounded-[2rem] shadow-soft-lg max-w-md w-full border-t-4 border-brand-900"
        style={{ boxShadow: '0 16px 48px rgba(0,0,0,0.08), 0 8px 24px rgba(0,0,0,0.06)' }}
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-soft-sm">
            <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
            </svg>
          </div>
          <h2 className="text-2xl font-semibold font-serif text-brand-900 dark:text-gray-100">Two-Step Verification</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">We sent a verification code to your email. Please enter it below.</p>
        </div>

        <div className="flex justify-center gap-2 mb-8">
          {code.map((data, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={data}
              onChange={(e) => handleChange(e.target, index)}
              onFocus={(e) => e.target.select()}
              className="w-12 h-14 text-center text-xl font-bold bg-gray-50 dark:bg-[#1A1A1A] border border-editorial-border dark:border-gray-700 rounded-xl focus:bg-white dark:focus:bg-[#222] focus:border-brand-900 dark:focus:border-gray-400 focus:shadow-[0_0_0_4px_rgba(26,26,26,0.06),0_4px_16px_rgba(0,0,0,0.04)] focus:-translate-y-px outline-none transition-all duration-300 ease-smooth text-brand-900 dark:text-gray-100"
            />
          ))}
        </div>

        <Button
          variant="primary"
          size="lg"
          shimmer
          onClick={() => onVerify(code.join(''))}
          className="w-full"
        >
          Verify Authentication
        </Button>

        <p className="text-center text-sm font-medium text-gray-500 dark:text-gray-400 mt-6">
          Didn't receive the code?{' '}
          <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 font-bold underline transition-colors duration-300 ease-smooth">
            Resend
          </button>
        </p>
      </div>
    </div>
  );
};

export default TwoFactorAuth;
