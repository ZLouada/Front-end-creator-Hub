import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { authService } from '../../services/api';
import Button from '../ui/Button';
import Input from '../ui/Input';

const Blob = ({ className, style }) => (
  <div className={`absolute rounded-full blur-3xl pointer-events-none ${className}`} style={style} />
);

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();
  const { isDark } = useTheme();

  useEffect(() => { setMounted(true); }, []);

  const handleSendCode = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await authService.forgotPassword(email);
      setCodeSent(true);
    } catch (err) {
      setError(err.message || 'Failed to send reset code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = (e) => {
    e.preventDefault();
    if (!code.trim()) {
      setError('Please enter the code you received.');
      return;
    }
    navigate('/reset-password', { state: { email, code } });
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center overflow-hidden font-sans bg-surface"
      style={{ background: isDark
        ? 'linear-gradient(135deg, #0A0A0A 0%, #141414 40%, #1A1A1A 70%, #0A0A0A 100%)'
        : 'linear-gradient(135deg, #FFFFFF 0%, #FBF9F6 30%, #F3F4F6 60%, #E5E7EB 100%)'
      }}
    >
      <div
        className="absolute inset-0 animate-gradient-bg pointer-events-none"
        style={{
          background: isDark
            ? 'linear-gradient(270deg, #0A0A0A, #1A1A1A, #0A0A0A, #141414)'
            : 'linear-gradient(270deg, #FFFFFF, #F3F4F6, #FFFFFF, #FBF9F6)',
          backgroundSize: '400% 400%',
          opacity: isDark ? 0.3 : 0.6,
        }}
      />

      <Blob
        className="w-96 h-96 animate-float-slow"
        style={{ background: isDark ? '#333333' : '#E5E7EB', opacity: isDark ? 0.08 : 0.25, top: '-8rem', left: '-8rem' }}
      />
      <Blob
        className="w-80 h-80 animate-drift"
        style={{ background: isDark ? '#2D2D2D' : '#D1D5DB', opacity: isDark ? 0.06 : 0.18, bottom: '-6rem', right: '-6rem', animationDelay: '2s' }}
      />
      <Blob
        className="w-64 h-64 animate-float-fast"
        style={{ background: isDark ? '#333333' : '#E5E7EB', opacity: isDark ? 0.04 : 0.12, top: '60%', left: '10%', animationDelay: '1s' }}
      />

      <div
        className={`glass-card relative z-10 w-full max-w-[440px] mx-4 rounded-[2.5rem] shadow-soft-xl overflow-hidden
          ${mounted ? 'animate-fade-up' : 'opacity-0'}`}
        style={{ boxShadow: isDark
          ? '0 32px 80px rgba(0,0,0,0.4), 0 8px 32px rgba(0,0,0,0.3)'
          : '0 32px 80px rgba(0,0,0,0.08), 0 8px 32px rgba(0,0,0,0.04)',
          backgroundColor: isDark ? '#141414' : undefined,
        }}
      >
        <div className="h-1.5 w-full bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500" />

        <div className="p-8 pt-7">
          <div className="flex flex-col items-center mb-7">
            <div className="mb-4 animate-fade-up">
              <span
                className="text-4xl font-bold tracking-tight"
                style={{
                  background: isDark
                    ? 'linear-gradient(135deg, #F0F0F0 30%, #9CA3AF 100%)'
                    : 'linear-gradient(135deg, #1A1A1A 30%, #6B7280 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                CreatorHub
              </span>
            </div>

            <h1 className="text-[1.7rem] font-semibold font-serif text-brand-900 dark:text-gray-100 tracking-tight leading-tight">
              {codeSent ? 'Check your email' : 'Forgot password?'}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 font-medium text-center">
              {codeSent
                ? `We sent a reset code to ${email}`
                : 'Enter your email and we\'ll send you a code to reset your password'}
            </p>
          </div>

          {!codeSent ? (
            <form onSubmit={handleSendCode} className="space-y-3.5">
              <div className="animate-fade-up" style={{ animationDelay: '0.1s' }}>
                <Input
                  label="Email address"
                  variant="default"
                  size="lg"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  error={error}
                />
              </div>

              <div className="animate-fade-up pt-1" style={{ animationDelay: '0.2s' }}>
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  shimmer
                  disabled={loading}
                  className="w-full"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin" width="18" height="18" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    'Send reset code'
                  )}
                </Button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleContinue} className="space-y-3.5">
              <div className="animate-fade-up" style={{ animationDelay: '0.1s' }}>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 mb-4">
                  <svg width="20" height="20" fill="none" stroke="#16a34a" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" strokeLinecap="round" strokeLinejoin="round"/>
                    <polyline points="22 4 12 14.01 9 11.01" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-sm font-semibold text-green-700 dark:text-green-400">
                    Code sent! Check your inbox and spam folder.
                  </span>
                </div>

                <Input
                  label="Reset code"
                  variant="default"
                  size="lg"
                  type="text"
                  placeholder="Enter the code from your email"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                  error={error}
                />
              </div>

              <div className="animate-fade-up pt-1" style={{ animationDelay: '0.15s' }}>
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  shimmer
                  className="w-full"
                >
                  Continue
                </Button>
              </div>

              <button
                type="button"
                onClick={() => { setCodeSent(false); setError(''); setCode(''); }}
                className="w-full text-center text-xs font-semibold text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors duration-300 ease-smooth mt-2"
              >
                Didn't receive the code? Send again
              </button>
            </form>
          )}

          <p className="text-center text-sm font-medium text-gray-500 dark:text-gray-400 mt-5">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="font-bold text-brand-900 dark:text-gray-100 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-300 ease-smooth underline underline-offset-2"
            >
              Back to login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
