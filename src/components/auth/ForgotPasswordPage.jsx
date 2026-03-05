import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
      style={{ background: 'linear-gradient(135deg, #FFFEF5 0%, #FFF3C4 30%, #FFE88A 60%, #FFDD00 100%)' }}
    >
      <div
        className="absolute inset-0 animate-gradient-bg pointer-events-none"
        style={{
          background: 'linear-gradient(270deg, #FFFEF5, #FFDD00, #FFFEF5, #FFF3C4)',
          backgroundSize: '400% 400%',
          opacity: 0.6,
        }}
      />

      <Blob
        className="w-96 h-96 animate-float-slow"
        style={{ background: '#FFDD00', opacity: 0.25, top: '-8rem', left: '-8rem' }}
      />
      <Blob
        className="w-80 h-80 animate-drift"
        style={{ background: '#F5C800', opacity: 0.18, bottom: '-6rem', right: '-6rem', animationDelay: '2s' }}
      />
      <Blob
        className="w-64 h-64 animate-float-fast"
        style={{ background: '#FFDD00', opacity: 0.12, top: '60%', left: '10%', animationDelay: '1s' }}
      />

      <div
        className={`glass-card relative z-10 w-full max-w-[440px] mx-4 rounded-[2.5rem] shadow-soft-xl overflow-hidden
          ${mounted ? 'animate-fade-up' : 'opacity-0'}`}
        style={{ boxShadow: '0 32px 80px rgba(255,221,0,0.18), 0 8px 32px rgba(0,0,0,0.06)' }}
      >
        <div className="h-1.5 w-full bg-gradient-to-r from-brand-300 via-brand-400 to-brand-500" />

        <div className="p-8 pt-7">
          <div className="flex flex-col items-center mb-7">
            <div className="mb-4 animate-fade-up">
              <span
                className="text-4xl font-bold tracking-tight"
                style={{
                  background: 'linear-gradient(135deg, #1A1A1A 30%, #FFDD00 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                CreatorHub
              </span>
            </div>

            <h1 className="text-[1.7rem] font-bold text-brand-900 tracking-tight leading-tight">
              {codeSent ? 'Check your email' : 'Forgot password?'}
            </h1>
            <p className="text-sm text-gray-500 mt-1 font-medium text-center">
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
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-green-50 border border-green-200 mb-4">
                  <svg width="20" height="20" fill="none" stroke="#16a34a" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" strokeLinecap="round" strokeLinejoin="round"/>
                    <polyline points="22 4 12 14.01 9 11.01" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-sm font-semibold text-green-700">
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
                className="w-full text-center text-xs font-semibold text-brand-600 hover:text-brand-700 transition-colors duration-300 ease-smooth mt-2"
              >
                Didn't receive the code? Send again
              </button>
            </form>
          )}

          <p className="text-center text-sm font-medium text-gray-500 mt-5">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="font-bold text-brand-900 hover:text-brand-600 transition-colors duration-300 ease-smooth underline underline-offset-2"
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
