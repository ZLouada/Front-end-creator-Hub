import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { authService } from '../../services/api';
import Button from '../ui/Button';

const Blob = ({ className, style }) => (
  <div className={`absolute rounded-full blur-3xl pointer-events-none ${className}`} style={style} />
);

const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || '';
  const code = location.state?.code || '';

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!email || !code) {
      navigate('/forgot-password');
    }
  }, [email, code, navigate]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => navigate('/'), 3000);
      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      await authService.resetPassword(email, code, newPassword);
      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const EyeIcon = ({ open }) => open ? (
    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  ) : (
    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  );

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
              {success ? 'Password reset!' : 'Set new password'}
            </h1>
            <p className="text-sm text-gray-500 mt-1 font-medium text-center">
              {success
                ? 'Your password has been updated. Redirecting to login...'
                : 'Enter your new password below'}
            </p>
          </div>

          {success ? (
            <div className="animate-fade-up">
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-green-50 border border-green-200 mb-4">
                <svg width="20" height="20" fill="none" stroke="#16a34a" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="22 4 12 14.01 9 11.01" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-sm font-semibold text-green-700">
                  Password updated successfully! Redirecting in 3 seconds...
                </span>
              </div>

              <Button
                type="button"
                variant="primary"
                size="lg"
                shimmer
                className="w-full"
                onClick={() => navigate('/')}
              >
                Go to login now
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="animate-fade-up" style={{ animationDelay: '0.1s' }}>
                <label className="block text-xs font-semibold text-brand-700 tracking-wide mb-1.5">
                  New password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="At least 8 characters"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className="w-full font-medium outline-none transition-all duration-300 ease-smooth bg-brand-50/50 border-2 border-brand-200/50 focus:bg-white focus:border-brand-400 focus:shadow-[0_0_0_4px_rgba(255,221,0,0.12),0_4px_16px_rgba(255,221,0,0.06)] focus:-translate-y-px placeholder-gray-400 text-brand-900 px-5 py-3.5 text-base rounded-2xl pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-700 transition-colors duration-300 ease-smooth"
                    tabIndex={-1}
                  >
                    <EyeIcon open={showPassword} />
                  </button>
                </div>
              </div>

              <div className="animate-fade-up" style={{ animationDelay: '0.15s' }}>
                <label className="block text-xs font-semibold text-brand-700 tracking-wide mb-1.5">
                  Confirm password
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full font-medium outline-none transition-all duration-300 ease-smooth bg-brand-50/50 border-2 border-brand-200/50 focus:bg-white focus:border-brand-400 focus:shadow-[0_0_0_4px_rgba(255,221,0,0.12),0_4px_16px_rgba(255,221,0,0.06)] focus:-translate-y-px placeholder-gray-400 text-brand-900 px-5 py-3.5 text-base rounded-2xl"
                />
              </div>

              {error && (
                <div className="animate-fade-up">
                  <p className="text-xs font-semibold text-red-600 mt-1">{error}</p>
                </div>
              )}

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
                      Resetting...
                    </span>
                  ) : (
                    'Reset password'
                  )}
                </Button>
              </div>
            </form>
          )}

          {!success && (
            <p className="text-center text-sm font-medium text-gray-500 mt-5">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="font-bold text-brand-900 hover:text-brand-600 transition-colors duration-300 ease-smooth underline underline-offset-2"
              >
                Back to login
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
