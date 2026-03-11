import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import Button from '../ui/Button';
import Input from '../ui/Input';

const Particle = ({ style }) => (
  <span
    className="absolute rounded-full pointer-events-none"
    style={{
      width: style.size,
      height: style.size,
      left: style.left,
      top: style.top,
      background: style.color,
      opacity: 0,
      animation: `particle-rise ${style.duration}s ease-out ${style.delay}s infinite`,
    }}
  />
);

const Blob = ({ className, style }) => (
  <div className={`absolute rounded-full blur-3xl pointer-events-none ${className}`} style={style} />
);

const SocialBtn = ({ icon, label }) => (
  <button
    type="button"
    className="flex items-center justify-center gap-2 w-full py-3 rounded-full border border-editorial-border dark:border-gray-700 bg-gray-50/50 dark:bg-[#1A1A1F] hover:bg-white dark:hover:bg-[#22222A] hover:border-brand-900 dark:hover:border-gray-500 text-sm font-semibold text-brand-900 dark:text-gray-100 transition-all duration-300 ease-smooth hover:shadow-soft hover:-translate-y-0.5 active:scale-95"
  >
    {icon}
    {label}
  </button>
);

const AuthModal = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formKey, setFormKey] = useState(0);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuthContext();
  const { isDark } = useTheme();

  const switchMode = () => {
    setIsLogin((v) => !v);
    setFormKey((k) => k + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    login({ name: name || 'Creator', email });
    setLoading(false);
    navigate('/home');
  };

  const [particles] = useState(() => Array.from({ length: 14 }, (_, i) => ({
    size: `${Math.random() * 8 + 4}px`,
    left: `${Math.random() * 90 + 5}%`,
    top: `${Math.random() * 80 + 10}%`,
    colorLight: ['#E5E7EB', '#D1D5DB', '#F3F4F6', '#9CA3AF'][i % 4],
    colorDark: ['#9CA3AF', '#6B7280', '#D1D5DB', '#4B5563'][i % 4],
    duration: Math.random() * 3 + 3,
    delay: Math.random() * 5,
  })));

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
      <Blob
        className="w-48 h-48 animate-drift"
        style={{ background: isDark ? '#2D2D2D' : '#D1D5DB', opacity: isDark ? 0.05 : 0.15, top: '20%', right: '8%', animationDelay: '3s' }}
      />

      <div
        className="absolute animate-spin-slow pointer-events-none"
        style={{
          width: 520,
          height: 520,
          border: isDark ? '1.5px dashed rgba(255,255,255,0.06)' : '1.5px dashed rgba(26,26,26,0.08)',
          borderRadius: '50%',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          width: 380,
          height: 380,
          border: isDark ? '1px dashed rgba(255,255,255,0.04)' : '1px dashed rgba(26,26,26,0.06)',
          borderRadius: '50%',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          animation: 'spin-slow 30s linear infinite reverse',
        }}
      />

      {particles.map((p, i) => (
        <Particle key={i} style={{ ...p, color: isDark ? p.colorDark : p.colorLight }} />
      ))}

      <div
        className={`glass-card relative z-10 w-full max-w-[440px] mx-4 rounded-[2.5rem] shadow-soft-xl overflow-hidden animate-fade-up`}
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
              {isLogin ? 'Welcome back!' : 'Join for free'}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 font-medium">
              {isLogin
                ? 'Sign in to your account'
                : 'Start sharing your work with the world'}
            </p>
          </div>

          <div
            key={`social-${formKey}`}
            className="flex flex-col gap-3 mb-5 animate-fade-up"
            style={{ animationDelay: '0.08s' }}
          >
            <SocialBtn
              label="Continue with Google"
              icon={
                <svg width="18" height="18" viewBox="0 0 48 48" fill="none">
                  <path d="M44.5 20H24v8.5h11.8C34.7 33.9 29.8 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6-6C34.6 5.1 29.6 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 20-7.5 20-21 0-1.4-.2-2.7-.5-4z" fill="#FFC107"/>
                  <path d="M6.3 14.7l7 5.1C15 16.1 19.2 13 24 13c3.1 0 5.9 1.1 8.1 2.9l6-6C34.6 5.1 29.6 3 24 3 16.3 3 9.7 7.9 6.3 14.7z" fill="#FF3D00"/>
                  <path d="M24 45c5.5 0 10.5-2 14.2-5.2l-6.6-5.4C29.5 36.1 26.9 37 24 37c-5.8 0-10.7-3.9-12.3-9.3l-6.9 5.3C8.2 40.8 15.5 45 24 45z" fill="#4CAF50"/>
                  <path d="M44.5 20H24v8.5h11.8c-.7 2.2-2.1 4.1-4 5.4l6.6 5.4C42 35.8 45 30.3 45 24c0-1.4-.2-2.7-.5-4z" fill="#1976D2"/>
                </svg>
              }
            />
          </div>

          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-gray-200 dark:to-gray-700" />
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">or</span>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-gray-200 dark:to-gray-700" />
          </div>

          <form
            key={formKey}
            onSubmit={handleSubmit}
            className="space-y-3.5"
          >
            {!isLogin && (
              <div className="animate-fade-up" style={{ animationDelay: '0.05s' }}>
                <Input
                  label="Your name"
                  variant="default"
                  size="lg"
                  type="text"
                  placeholder="e.g. Alex Johnson"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}

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
              />
            </div>

            <div className="animate-fade-up" style={{ animationDelay: '0.15s' }}>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-300 tracking-wide">
                  Password
                </label>
                {isLogin && (
                  <button type="button" onClick={() => navigate('/forgot-password')} className="text-xs font-semibold text-gray-500 dark:text-gray-400 hover:text-gray-700 transition-colors duration-300 ease-smooth">
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full font-medium outline-none transition-all duration-300 ease-smooth bg-gray-50 dark:bg-[#1A1A1F] border border-editorial-border dark:border-gray-700 focus:bg-white dark:focus:bg-[#22222A] focus:border-brand-900 dark:focus:border-gray-400 focus:shadow-[0_0_0_4px_rgba(26,26,26,0.06),0_4px_16px_rgba(0,0,0,0.04)] focus:-translate-y-px placeholder-gray-400 text-brand-900 dark:text-gray-100 px-5 py-3.5 text-base rounded-xl pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors duration-300 ease-smooth"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
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
                    Just a moment...
                  </span>
                ) : (
                  isLogin ? 'Sign in' : 'Create account'
                )}
              </Button>
            </div>
          </form>

          <p className="text-center text-sm font-medium text-gray-500 dark:text-gray-400 mt-5">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button
              type="button"
              onClick={switchMode}
              className="font-bold text-brand-900 dark:text-gray-100 hover:text-gray-600 transition-colors duration-300 ease-smooth underline underline-offset-2"
            >
              {isLogin ? 'Sign up free' : 'Log in'}
            </button>
          </p>

          <div className="flex items-center justify-center gap-4 mt-6 pt-5 border-t border-gray-200/50 dark:border-gray-700/50">
            {[
              { icon: '\u{1F512}', text: 'Secure' },
              { icon: '\u2728', text: 'Free forever' },
              { icon: '\u{1F49B}', text: '5M+ creators' },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-1 text-xs font-semibold text-gray-400">
                <span>{icon}</span>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
