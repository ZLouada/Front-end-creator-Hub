import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { authService } from '../../services/api';

const inputStyle = (isDark, focused) => ({
  width: '100%', boxSizing: 'border-box',
  background: isDark ? '#111115' : '#F9FAFB',
  border: `1.5px solid ${focused ? '#FFDD00' : isDark ? '#27272F' : '#E5E7EB'}`,
  borderRadius: '12px', padding: '0.75rem 1rem',
  fontSize: '0.9rem', fontWeight: 500,
  color: isDark ? '#F0F0F3' : '#1A1A1A',
  fontFamily: 'inherit', outline: 'none',
  boxShadow: focused ? '0 0 0 3px rgba(255,221,0,0.12)' : 'none',
  transition: 'border-color 0.2s, box-shadow 0.2s',
});

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

const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { isDark } = useTheme();

  const email = location.state?.email || '';
  const code = location.state?.code || '';

  useEffect(() => { if (!email || !code) navigate('/forgot-password'); }, [email, code, navigate]);
  useEffect(() => { if (success) { const t = setTimeout(() => navigate('/auth'), 3000); return () => clearTimeout(t); } }, [success, navigate]);
  useEffect(() => { const t = requestAnimationFrame(() => setMounted(true)); return () => cancelAnimationFrame(t); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (newPassword.length < 8) { setError('Password must be at least 8 characters.'); return; }
    if (newPassword !== confirmPassword) { setError('Passwords do not match.'); return; }
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

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: isDark ? '#0C0C0F' : '#FAFAF8', fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* Left panel */}
      <div style={{ width: '48%', minHeight: '100vh', flexShrink: 0, background: 'linear-gradient(145deg, #1A1A1A 0%, #111115 40%, #0C0C0F 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '4rem 3.5rem', position: 'relative', overflow: 'hidden' }} className="hidden lg:flex">
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(255,221,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,221,0,0.04) 1px, transparent 1px)`, backgroundSize: '48px 48px' }} />
        <div style={{ position: 'absolute', top: '-5rem', left: '-5rem', width: '22rem', height: '22rem', background: 'radial-gradient(circle, rgba(255,221,0,0.09) 0%, transparent 70%)', pointerEvents: 'none', animation: 'authBlobA 10s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', bottom: '-4rem', right: '-4rem', width: '22rem', height: '22rem', background: 'radial-gradient(circle, rgba(255,221,0,0.08) 0%, transparent 70%)', pointerEvents: 'none', animation: 'authBlobB 13s ease-in-out infinite' }} />
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '380px', animation: mounted ? 'authFadeLeft 0.7s cubic-bezier(0.22,1,0.36,1) 0.1s both' : 'none' }}>
          <div style={{ width: 80, height: 80, borderRadius: '20px', background: 'rgba(255,221,0,0.15)', border: '1px solid rgba(255,221,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
            <svg width="36" height="36" fill="none" stroke="#FFDD00" strokeWidth="1.5" viewBox="0 0 24 24">
              <rect x="3" y="11" width="18" height="11" rx="2"/>
              <path d="M7 11V7a5 5 0 0110 0v4"/>
            </svg>
          </div>
          <h2 style={{ color: '#fff', fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.04em', margin: '0 0 1rem', fontFamily: "'Playfair Display', Georgia, serif" }}>
            Set a new<br /><span style={{ color: '#FFDD00' }}>password.</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.95rem', lineHeight: 1.6, margin: '0 0 2rem' }}>
            Choose a strong password with at least 8 characters to keep your account secure.
          </p>
          {['Use 8+ characters', 'Mix letters & numbers', 'Use a unique password'].map((tip, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.6rem', textAlign: 'left' }}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(255,221,0,0.15)', border: '1px solid rgba(255,221,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="10" height="10" fill="none" stroke="#FFDD00" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.83rem' }}>{tip}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', minHeight: '100vh' }}>
        <div style={{ width: '100%', maxWidth: '440px', background: isDark ? '#1A1A1F' : '#FFFFFF', border: `1px solid ${isDark ? '#27272F' : '#E5E7EB'}`, borderRadius: '24px', padding: '2.5rem', boxShadow: isDark ? '0 24px 64px rgba(0,0,0,0.5)' : '0 24px 64px rgba(0,0,0,0.06)', animation: mounted ? 'authCardIn 0.65s cubic-bezier(0.22,1,0.36,1) forwards' : 'none', opacity: mounted ? undefined : 0 }}>

          <button type="button" onClick={() => navigate('/forgot-password')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: 'none', fontSize: '0.82rem', fontWeight: 600, color: isDark ? '#9A9AAB' : '#6B7280', cursor: 'pointer', padding: 0, marginBottom: '2rem', fontFamily: 'inherit', transition: 'color 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.color = '#FFDD00'}
            onMouseLeave={e => e.currentTarget.style.color = isDark ? '#9A9AAB' : '#6B7280'}
          >
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M19 12H5m0 0l7-7m-7 7l7 7"/></svg>
            Back
          </button>

          <div key={success ? 'success' : 'form'} style={{ marginBottom: '1.75rem', animation: 'authFadeUp 0.35s cubic-bezier(0.22,1,0.36,1) both' }}>
            <div style={{ width: 48, height: 48, borderRadius: '12px', background: isDark ? 'rgba(255,221,0,0.1)' : 'rgba(255,221,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <svg width="22" height="22" fill="none" stroke="#FFDD00" strokeWidth="1.8" viewBox="0 0 24 24">
                {success
                  ? <><path d="M22 11.08V12a10 10 0 11-5.93-9.14" strokeLinecap="round"/><polyline points="22 4 12 14.01 9 11.01" strokeLinecap="round"/></>
                  : <><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></>
                }
              </svg>
            </div>
            <h2 style={{ margin: '0 0 0.3rem', fontSize: '1.65rem', fontWeight: 700, letterSpacing: '-0.03em', color: isDark ? '#F0F0F3' : '#1A1A1A', fontFamily: "'Playfair Display', Georgia, serif" }}>
              {success ? 'Password updated!' : 'Create new password'}
            </h2>
            <p style={{ margin: 0, fontSize: '0.88rem', color: isDark ? '#9A9AAB' : '#6B7280', fontWeight: 500 }}>
              {success ? 'Redirecting you to login in a moment…' : 'Choose a strong password for your account'}
            </p>
          </div>

          {success ? (
            <div>
              <div style={{ padding: '0.85rem 1rem', background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.25)', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
                <svg width="18" height="18" fill="none" stroke="#4ADE80" strokeWidth="2.2" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" strokeLinecap="round"/><polyline points="22 4 12 14.01 9 11.01" strokeLinecap="round"/></svg>
                <span style={{ fontSize: '0.83rem', fontWeight: 600, color: '#4ADE80' }}>Password updated successfully!</span>
              </div>
              <button type="button" onClick={() => navigate('/auth')} style={{ width: '100%', padding: '0.85rem', background: '#FFDD00', border: 'none', borderRadius: '12px', fontSize: '0.92rem', fontWeight: 800, color: '#1A1A1A', cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 4px 18px rgba(255,221,0,0.35)' }}>
                Go to login
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {error && (
                <div style={{ animation: 'authFadeUp 0.3s cubic-bezier(0.22,1,0.36,1) both' }}><div style={{ padding: '0.75rem 1rem', background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.3)', borderRadius: '10px' }}>
                  <p style={{ margin: 0, fontSize: '0.83rem', fontWeight: 600, color: '#F87171' }}>{error}</p>
                </div></div>
              )}
              <div style={{ animation: 'authFadeUp 0.35s cubic-bezier(0.22,1,0.36,1) 0.05s both' }}>
                <label style={{ display: 'block', marginBottom: '0.45rem', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: isDark ? '#9A9AAB' : '#6B7280' }}>New password</label>
                <div style={{ position: 'relative' }}>
                  <input type={showPassword ? 'text' : 'password'} placeholder="At least 8 characters" value={newPassword} onChange={e => setNewPassword(e.target.value)} required
                    onFocus={() => setFocusedField('new')} onBlur={() => setFocusedField(null)}
                    style={{ ...inputStyle(isDark, focusedField === 'new'), paddingRight: '3rem' }} />
                  <button type="button" onClick={() => setShowPassword(v => !v)} tabIndex={-1} style={{ position: 'absolute', right: '0.85rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: isDark ? '#6A6A78' : '#9CA3AF', cursor: 'pointer', display: 'flex', lineHeight: 0, padding: 0 }}>
                    <EyeIcon open={showPassword} />
                  </button>
                </div>
              </div>
              <div style={{ animation: 'authFadeUp 0.35s cubic-bezier(0.22,1,0.36,1) 0.1s both' }}>
                <label style={{ display: 'block', marginBottom: '0.45rem', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: isDark ? '#9A9AAB' : '#6B7280' }}>Confirm password</label>
                <input type={showPassword ? 'text' : 'password'} placeholder="Re-enter your password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required
                  onFocus={() => setFocusedField('confirm')} onBlur={() => setFocusedField(null)}
                  style={inputStyle(isDark, focusedField === 'confirm')} />
              </div>
              <button type="submit" disabled={loading} style={{ animation: 'authFadeUp 0.35s cubic-bezier(0.22,1,0.36,1) 0.15s both', marginTop: '0.25rem', width: '100%', padding: '0.85rem', background: loading ? (isDark ? '#3A3A2A' : '#E5D800') : '#FFDD00', border: 'none', borderRadius: '12px', fontSize: '0.92rem', fontWeight: 800, color: '#1A1A1A', cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', boxShadow: loading ? 'none' : '0 4px 18px rgba(255,221,0,0.35)', transition: 'all 0.18s' }}>
                {loading ? (
                  <><svg style={{ animation: 'spin 0.8s linear infinite' }} width="16" height="16" fill="none" viewBox="0 0 24 24"><circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path style={{ opacity: 0.9 }} fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/></svg> Updating…</>
                ) : 'Update password'}
              </button>
            </form>
          )}
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

export default ResetPasswordPage;
