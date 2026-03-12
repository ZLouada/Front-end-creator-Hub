import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

/* ─── Shared icon components ──────────────────────────────────── */
const EyeIcon = ({ open }) => open ? (
  <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
) : (
  <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 48 48" fill="none">
    <path d="M44.5 20H24v8.5h11.8C34.7 33.9 29.8 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6-6C34.6 5.1 29.6 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 20-7.5 20-21 0-1.4-.2-2.7-.5-4z" fill="#FFC107"/>
    <path d="M6.3 14.7l7 5.1C15 16.1 19.2 13 24 13c3.1 0 5.9 1.1 8.1 2.9l6-6C34.6 5.1 29.6 3 24 3 16.3 3 9.7 7.9 6.3 14.7z" fill="#FF3D00"/>
    <path d="M24 45c5.5 0 10.5-2 14.2-5.2l-6.6-5.4C29.5 36.1 26.9 37 24 37c-5.8 0-10.7-3.9-12.3-9.3l-6.9 5.3C8.2 40.8 15.5 45 24 45z" fill="#4CAF50"/>
    <path d="M44.5 20H24v8.5h11.8c-.7 2.2-2.1 4.1-4 5.4l6.6 5.4C42 35.8 45 30.3 45 24c0-1.4-.2-2.7-.5-4z" fill="#1976D2"/>
  </svg>
);

/* ─── Left panel testimonial card ─────────────────────────────── */
const TestimonialCard = ({ avatar, name, role, text, accentColor }) => (
  <div style={{
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '16px',
    padding: '1rem 1.2rem',
    backdropFilter: 'blur(12px)',
  }}>
    <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.82rem', lineHeight: 1.6, margin: '0 0 0.75rem' }}>
      "{text}"
    </p>
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
      <div style={{
        width: 32, height: 32, borderRadius: '50%',
        background: accentColor || '#FFDD00',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '0.75rem', fontWeight: 800, color: '#1A1A1A', flexShrink: 0,
      }}>{avatar}</div>
      <div>
        <p style={{ color: '#fff', fontSize: '0.78rem', fontWeight: 700, margin: 0 }}>{name}</p>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.7rem', margin: 0 }}>{role}</p>
      </div>
    </div>
  </div>
);

/* ─── Stat pill ────────────────────────────────────────────────── */
const StatPill = ({ value, label }) => (
  <div style={{ textAlign: 'center' }}>
    <p style={{ color: '#FFDD00', fontSize: '1.5rem', fontWeight: 800, margin: 0, lineHeight: 1 }}>{value}</p>
    <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.7rem', fontWeight: 600, margin: '2px 0 0', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</p>
  </div>
);

/* ─── Input field ──────────────────────────────────────────────── */
const Field = ({ label, isDark, children }) => (
  <div>
    <label style={{
      display: 'block', marginBottom: '0.45rem',
      fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase',
      letterSpacing: '0.06em', color: isDark ? '#9A9AAB' : '#6B7280',
    }}>{label}</label>
    {children}
  </div>
);

const inputStyle = (isDark) => ({
  width: '100%', boxSizing: 'border-box',
  background: isDark ? '#111115' : '#F9FAFB',
  border: `1.5px solid ${isDark ? '#27272F' : '#E5E7EB'}`,
  borderRadius: '12px',
  padding: '0.75rem 1rem',
  /* 1rem = 16px — prevents iOS Safari from auto-zooming on focus */
  fontSize: '1rem', fontWeight: 500,
  minHeight: '48px',
  color: isDark ? '#F0F0F3' : '#1A1A1A',
  fontFamily: 'inherit',
  outline: 'none',
  transition: 'border-color 0.2s, box-shadow 0.2s',
});

/* ─── Main component ───────────────────────────────────────────── */
const AuthModal = () => {
  const [searchParams] = useSearchParams();
  const [isLogin, setIsLogin] = useState(searchParams.get('mode') !== 'signup');
  const [formKey, setFormKey] = useState(0);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuthContext();
  const { isDark } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = requestAnimationFrame(() => setMounted(true)); return () => cancelAnimationFrame(t); }, []);

  const switchMode = () => {
    setIsLogin(v => !v);
    setFormKey(k => k + 1);
    setName(''); setEmail(''); setPassword('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    login({ name: name || 'Creator', email });
    setLoading(false);
    navigate('/home');
  };

  const fieldBorder = (field) => focusedField === field
    ? '1.5px solid #FFDD00'
    : isDark ? '1.5px solid #27272F' : '1.5px solid #E5E7EB';
  const fieldShadow = (field) => focusedField === field
    ? '0 0 0 3px rgba(255,221,0,0.12)'
    : 'none';

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      background: isDark ? '#0C0C0F' : '#FAFAF8',
      fontFamily: "'Inter', system-ui, sans-serif",
    }}>

      {/* ── Animations ─────────────────────────────────────────── */}
      <style>{`
        @keyframes authCardIn  { from { opacity:0; transform:translateY(22px) } to { opacity:1; transform:translateY(0) } }
        @keyframes authFadeLeft{ from { opacity:0; transform:translateX(-18px) } to { opacity:1; transform:translateX(0) } }
        @keyframes authFadeUp  { from { opacity:0; transform:translateY(12px) } to { opacity:1; transform:translateY(0) } }
        @keyframes authBlobA   { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(24px,-32px) scale(1.05)} 66%{transform:translate(-16px,22px) scale(0.97)} }
        @keyframes authBlobB   { 0%,100%{transform:translate(0,0) scale(1)} 40%{transform:translate(-28px,22px) scale(1.04)} 80%{transform:translate(18px,-28px) scale(0.96)} }
        .auth-right-wrap { padding: 2rem; overflow-x: hidden; }
        .auth-card       { padding: 2.5rem; }
        @media (max-width: 640px) {
          .auth-right-wrap { padding: 1.5rem 1rem !important; align-items: flex-start !important; padding-top: 2.5rem !important; }
          .auth-card       { padding: 1.75rem 1.25rem !important; border-radius: 20px !important; box-shadow: none !important; }
          .auth-trust-row  { gap: 0.75rem !important; flex-wrap: wrap !important; justify-content: center !important; }
        }
        @media (max-width: 390px) {
          .auth-right-wrap { padding: 1rem 0.75rem !important; padding-top: 2rem !important; }
          .auth-card       { padding: 1.5rem 1rem !important; }
        }
      `}</style>

      {/* ── LEFT PANEL — brand identity ─────────────────────────── */}
      <div style={{
        width: '48%', minHeight: '100vh', flexShrink: 0,
        background: 'linear-gradient(145deg, #1A1A1A 0%, #111115 40%, #0C0C0F 100%)',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center', padding: '4rem 3.5rem',
        position: 'relative', overflow: 'hidden',
      }} className="hidden lg:flex">

        {/* Background grid */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `linear-gradient(rgba(255,221,0,0.04) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,221,0,0.04) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }} />

        {/* Yellow glow blobs — animated */}
        <div style={{ position: 'absolute', top: '-6rem', left: '-6rem', width: '28rem', height: '28rem', background: 'radial-gradient(circle, rgba(255,221,0,0.12) 0%, transparent 70%)', pointerEvents: 'none', animation: 'authBlobA 10s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', bottom: '-4rem', right: '-4rem', width: '22rem', height: '22rem', background: 'radial-gradient(circle, rgba(255,221,0,0.07) 0%, transparent 70%)', pointerEvents: 'none', animation: 'authBlobB 13s ease-in-out infinite' }} />

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 1, animation: mounted ? 'authFadeLeft 0.7s cubic-bezier(0.22,1,0.36,1) forwards' : 'none', opacity: mounted ? undefined : 0 }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '3.5rem', animation: mounted ? 'authFadeLeft 0.6s cubic-bezier(0.22,1,0.36,1) 0.05s both' : 'none' }}>
            <div style={{
              width: 44, height: 44, borderRadius: '12px',
              background: '#FFDD00',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#1A1A1A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 800, letterSpacing: '-0.03em' }}>CreatorHub</span>
          </div>

          {/* Headline */}
          <h1 style={{ animation: mounted ? 'authFadeLeft 0.6s cubic-bezier(0.22,1,0.36,1) 0.12s both' : 'none',
            color: '#fff', fontSize: '2.8rem', fontWeight: 800,
            lineHeight: 1.1, letterSpacing: '-0.04em', margin: '0 0 1rem',
            fontFamily: "'Playfair Display', Georgia, serif",
          }}>
            Your audience<br />
            <span style={{ color: '#FFDD00' }}>awaits you.</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '1rem', lineHeight: 1.6, margin: '0 0 3rem', maxWidth: '360px' }}>
            Join 5M+ creators who share their work, grow their audience, and earn from what they love — all in one place.
          </p>

          {/* Stats */}
          <div style={{
            display: 'flex', gap: '2rem', marginBottom: '3rem',
            paddingBottom: '3rem',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            animation: mounted ? 'authFadeLeft 0.6s cubic-bezier(0.22,1,0.36,1) 0.22s both' : 'none',
          }}>
            <StatPill value="5M+" label="Creators" />
            <StatPill value="SAR 2B+" label="Earned" />
            <StatPill value="180+" label="Countries" />
          </div>

          {/* Testimonials */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', animation: mounted ? 'authFadeLeft 0.6s cubic-bezier(0.22,1,0.36,1) 0.32s both' : 'none' }}>
            <TestimonialCard
              avatar="LS"
              name="Layla S."
              role="Fashion Creator · Riyadh"
              text="I hit my first 100k subscribers within 3 months of joining CreatorHub. The tools here are incredible."
              accentColor="#FFDD00"
            />
            <TestimonialCard
              avatar="AK"
              name="Ahmad K."
              role="Tech Educator · Jeddah"
              text="Finally a platform that understands Arab creators. Local payments, Arabic support — this is home."
              accentColor="#A3E635"
            />
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL — auth form ──────────────────────────────── */}
      <div className="auth-right-wrap" style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: isDark ? '#0C0C0F' : '#FAFAF8',
        minHeight: '100vh',
        overflowX: 'hidden',
      }}>
        <div className="auth-card" style={{
          width: '100%', maxWidth: '440px',
          background: isDark ? '#1A1A1F' : '#FFFFFF',
          border: `1px solid ${isDark ? '#27272F' : '#E5E7EB'}`,
          borderRadius: '24px', /* overridden by .auth-card media query on mobile */
          boxShadow: isDark
            ? '0 24px 64px rgba(0,0,0,0.5)'
            : '0 24px 64px rgba(0,0,0,0.06)',
          animation: mounted ? 'authCardIn 0.65s cubic-bezier(0.22,1,0.36,1) forwards' : 'none',
          opacity: mounted ? undefined : 0,
        }}>

          {/* Mobile logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '2rem' }} className="lg:hidden">
            <div style={{ width: 36, height: 36, borderRadius: '10px', background: '#FFDD00', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#1A1A1A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span style={{ color: isDark ? '#F0F0F3' : '#1A1A1A', fontSize: '1.05rem', fontWeight: 800 }}>CreatorHub</span>
          </div>

          {/* Heading */}
          <div key={isLogin ? 'h-login' : 'h-signup'} style={{ marginBottom: '1.75rem', animation: 'authFadeUp 0.35s cubic-bezier(0.22,1,0.36,1) both' }}>
            <h2 style={{
              margin: '0 0 0.3rem',
              fontSize: '1.65rem', fontWeight: 700, letterSpacing: '-0.03em',
              color: isDark ? '#F0F0F3' : '#1A1A1A',
              fontFamily: "'Playfair Display', Georgia, serif",
            }}>
              {isLogin ? 'Welcome back' : 'Create your account'}
            </h2>
            <p style={{ margin: 0, fontSize: '0.88rem', color: isDark ? '#9A9AAB' : '#6B7280', fontWeight: 500 }}>
              {isLogin
                ? 'Sign in to continue to your dashboard'
                : 'Start building your audience today — it\'s free'}
            </p>
          </div>

          {/* Google button */}
          <button
            type="button"
            style={{ animation: mounted ? 'authFadeUp 0.45s cubic-bezier(0.22,1,0.36,1) 0.1s both' : 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.65rem',
              width: '100%', padding: '0.78rem',
              minHeight: '52px',
              background: isDark ? '#111115' : '#F9FAFB',
              border: `1.5px solid ${isDark ? '#27272F' : '#E5E7EB'}`,
              borderRadius: '12px',
              fontSize: '1rem', fontWeight: 600,
              color: isDark ? '#F0F0F3' : '#1A1A1A',
              cursor: 'pointer',
              transition: 'all 0.18s',
              marginBottom: '1.5rem',
              fontFamily: 'inherit',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#FFDD00'; e.currentTarget.style.background = isDark ? '#1A1A1F' : '#FFFEF5'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = isDark ? '#27272F' : '#E5E7EB'; e.currentTarget.style.background = isDark ? '#111115' : '#F9FAFB'; }}
          >
            <GoogleIcon />
            Continue with Google
          </button>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <div style={{ flex: 1, height: '1px', background: isDark ? '#27272F' : '#E5E7EB' }} />
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: isDark ? '#6A6A78' : '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.08em' }}>or</span>
            <div style={{ flex: 1, height: '1px', background: isDark ? '#27272F' : '#E5E7EB' }} />
          </div>

          {/* Form */}
          <form key={formKey} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

            {!isLogin && (
              <div style={{ animation: 'authFadeUp 0.35s cubic-bezier(0.22,1,0.36,1) 0s both' }}>
              <Field label="Full name" isDark={isDark}>
                <input
                  type="text"
                  placeholder="e.g. Ahmed Al-Rashid"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  style={{ ...inputStyle(isDark), border: fieldBorder('name'), boxShadow: fieldShadow('name') }}
                />
              </Field>
              </div>
            )}

            <div style={{ animation: 'authFadeUp 0.35s cubic-bezier(0.22,1,0.36,1) 0.05s both' }}>
            <Field label="Email address" isDark={isDark}>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                style={{ ...inputStyle(isDark), border: fieldBorder('email'), boxShadow: fieldShadow('email') }}
              />
            </Field>
            </div>

            <div style={{ animation: 'authFadeUp 0.35s cubic-bezier(0.22,1,0.36,1) 0.1s both' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.45rem' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: isDark ? '#9A9AAB' : '#6B7280' }}>Password</label>
                {isLogin && (
                  <button type="button" onClick={() => navigate('/forgot-password')}
                    style={{ background: 'none', border: 'none', fontSize: '0.78rem', fontWeight: 600, color: isDark ? '#9A9AAB' : '#6B7280', cursor: 'pointer', padding: 0, fontFamily: 'inherit' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#FFDD00'}
                    onMouseLeave={e => e.currentTarget.style.color = isDark ? '#9A9AAB' : '#6B7280'}
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  style={{ ...inputStyle(isDark), border: fieldBorder('password'), boxShadow: fieldShadow('password'), paddingRight: '3rem' }}
                />
                <button type="button" onClick={() => setShowPassword(v => !v)} tabIndex={-1}
                  style={{ position: 'absolute', right: '0.85rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: isDark ? '#6A6A78' : '#9CA3AF', cursor: 'pointer', display: 'flex', lineHeight: 0, padding: '0.25rem', minWidth: '44px', minHeight: '44px', alignItems: 'center', justifyContent: 'flex-end' }}>
                  <EyeIcon open={showPassword} />
                </button>
              </div>
            </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                animation: 'authFadeUp 0.35s cubic-bezier(0.22,1,0.36,1) 0.15s both',
                marginTop: '0.5rem',
                width: '100%', padding: '0.85rem',
                minHeight: '52px',
                background: loading ? (isDark ? '#3A3A2A' : '#E5D800') : '#FFDD00',
                border: 'none', borderRadius: '12px',
                fontSize: '1rem', fontWeight: 800, letterSpacing: '-0.01em',
                color: '#1A1A1A',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.18s',
                fontFamily: 'inherit',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                boxShadow: loading ? 'none' : '0 4px 18px rgba(255,221,0,0.35)',
              }}
              onMouseEnter={e => { if (!loading) { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(255,221,0,0.45)'; } }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = loading ? 'none' : '0 4px 18px rgba(255,221,0,0.35)'; }}
            >
              {loading ? (
                <>
                  <svg style={{ animation: 'spin 0.8s linear infinite' }} width="16" height="16" fill="none" viewBox="0 0 24 24">
                    <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path style={{ opacity: 0.9 }} fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
                  </svg>
                  Just a moment…
                </>
              ) : isLogin ? 'Sign in to CreatorHub' : 'Create free account'}
            </button>
          </form>

          {/* Switch mode */}
          <p style={{ textAlign: 'center', fontSize: '0.85rem', color: isDark ? '#9A9AAB' : '#6B7280', fontWeight: 500, marginTop: '1.5rem' }}>
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button type="button" onClick={switchMode}
              style={{ background: 'none', border: 'none', fontWeight: 800, color: isDark ? '#F0F0F3' : '#1A1A1A', cursor: 'pointer', padding: 0, fontFamily: 'inherit', fontSize: '0.85rem', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
              {isLogin ? 'Sign up free' : 'Log in'}
            </button>
          </p>

          {/* Trust row */}
          <div className="auth-trust-row" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.25rem',
            flexWrap: 'wrap',
            marginTop: '1.75rem', paddingTop: '1.5rem',
            borderTop: `1px solid ${isDark ? '#27272F' : '#F3F4F6'}`,
          }}>
            {[['🔒', 'Bank-level security'], ['⭐', 'Free forever'], ['🌍', '180+ countries']].map(([icon, text]) => (
              <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.72rem', fontWeight: 600, color: isDark ? '#6A6A78' : '#9CA3AF' }}>
                <span>{icon}</span><span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes authCardIn { from { opacity: 0; transform: translateY(28px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes authFadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes authFadeLeft { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes authBlobA { 0%,100% { transform: translate(0,0) scale(1); } 40% { transform: translate(20px,-25px) scale(1.08); } 70% { transform: translate(-10px,15px) scale(0.95); } }
        @keyframes authBlobB { 0%,100% { transform: translate(0,0) scale(1); } 35% { transform: translate(-18px,20px) scale(1.06); } 65% { transform: translate(12px,-12px) scale(0.97); } }
      `}</style>
    </div>
  );
};

export default AuthModal;
