import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { authService } from '../../services/api';

const inputStyle = (isDark, focused) => ({
  width: '100%', boxSizing: 'border-box',
  background: isDark ? '#111115' : '#F9FAFB',
  border: `1.5px solid ${focused ? '#FFDD00' : isDark ? '#27272F' : '#E5E7EB'}`,
  borderRadius: '12px',
  padding: '0.75rem 1rem',
  fontSize: '0.9rem', fontWeight: 500,
  color: isDark ? '#F0F0F3' : '#1A1A1A',
  fontFamily: 'inherit',
  outline: 'none',
  boxShadow: focused ? '0 0 0 3px rgba(255,221,0,0.12)' : 'none',
  transition: 'border-color 0.2s, box-shadow 0.2s',
});

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [error, setError] = useState('');
  const [focusedField, setFocusedField] = useState(null);
  const navigate = useNavigate();
  const { isDark } = useTheme();

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
    if (!code.trim()) { setError('Please enter the code you received.'); return; }
    navigate('/reset-password', { state: { email, code } });
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex',
      background: isDark ? '#0C0C0F' : '#FAFAF8',
      fontFamily: "'Inter', system-ui, sans-serif",
    }}>

      {/* Left panel */}
      <div style={{
        width: '48%', minHeight: '100vh', flexShrink: 0,
        background: 'linear-gradient(145deg, #1A1A1A 0%, #111115 40%, #0C0C0F 100%)',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center',
        padding: '4rem 3.5rem', position: 'relative', overflow: 'hidden',
      }} className="hidden lg:flex">
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(255,221,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,221,0,0.04) 1px, transparent 1px)`, backgroundSize: '48px 48px' }} />
        <div style={{ position: 'absolute', top: '-6rem', left: '-6rem', width: '28rem', height: '28rem', background: 'radial-gradient(circle, rgba(255,221,0,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '380px' }}>
          <div style={{ width: 80, height: 80, borderRadius: '20px', background: 'rgba(255,221,0,0.15)', border: '1px solid rgba(255,221,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
            <svg width="36" height="36" fill="none" stroke="#FFDD00" strokeWidth="1.5" viewBox="0 0 24 24">
              <rect x="2" y="4" width="20" height="16" rx="3"/>
              <path d="M2 7l10 7 10-7"/>
            </svg>
          </div>
          <h2 style={{ color: '#fff', fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.04em', margin: '0 0 1rem', fontFamily: "'Playfair Display', Georgia, serif" }}>
            Check your<br /><span style={{ color: '#FFDD00' }}>inbox.</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
            We'll send a secure code to your email so you can reset your password safely.
          </p>
          <div style={{ marginTop: '2.5rem', padding: '1.5rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px' }}>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.82rem', margin: 0, lineHeight: 1.65 }}>
              💡 <strong style={{ color: 'rgba(255,255,255,0.85)' }}>Tip:</strong> Check your spam folder if you don't see it within 2 minutes. Code expires in 15 minutes.
            </p>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', minHeight: '100vh' }}>
        <div style={{
          width: '100%', maxWidth: '440px',
          background: isDark ? '#1A1A1F' : '#FFFFFF',
          border: `1px solid ${isDark ? '#27272F' : '#E5E7EB'}`,
          borderRadius: '24px', padding: '2.5rem',
          boxShadow: isDark ? '0 24px 64px rgba(0,0,0,0.5)' : '0 24px 64px rgba(0,0,0,0.06)',
        }}>
          {/* Back link */}
          <button type="button" onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: 'none', fontSize: '0.82rem', fontWeight: 600, color: isDark ? '#9A9AAB' : '#6B7280', cursor: 'pointer', padding: 0, marginBottom: '2rem', fontFamily: 'inherit', transition: 'color 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.color = '#FFDD00'}
            onMouseLeave={e => e.currentTarget.style.color = isDark ? '#9A9AAB' : '#6B7280'}
          >
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M19 12H5m0 0l7-7m-7 7l7 7"/></svg>
            Back to login
          </button>

          {/* Heading */}
          <div style={{ marginBottom: '1.75rem' }}>
            <div style={{ width: 48, height: 48, borderRadius: '12px', background: isDark ? 'rgba(255,221,0,0.1)' : 'rgba(255,221,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <svg width="22" height="22" fill="none" stroke="#FFDD00" strokeWidth="1.8" viewBox="0 0 24 24">
                {codeSent
                  ? <><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></>
                  : <><rect x="2" y="4" width="20" height="16" rx="3"/><path d="M2 7l10 7 10-7"/></>
                }
              </svg>
            </div>
            <h2 style={{ margin: '0 0 0.3rem', fontSize: '1.65rem', fontWeight: 700, letterSpacing: '-0.03em', color: isDark ? '#F0F0F3' : '#1A1A1A', fontFamily: "'Playfair Display', Georgia, serif" }}>
              {codeSent ? 'Code sent!' : 'Forgot password?'}
            </h2>
            <p style={{ margin: 0, fontSize: '0.88rem', color: isDark ? '#9A9AAB' : '#6B7280', fontWeight: 500 }}>
              {codeSent
                ? `We sent a reset code to ${email}`
                : "Enter your email and we'll send you a reset code"}
            </p>
          </div>

          {/* Error */}
          {error && (
            <div style={{ padding: '0.75rem 1rem', background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.3)', borderRadius: '10px', marginBottom: '1rem' }}>
              <p style={{ margin: 0, fontSize: '0.83rem', fontWeight: 600, color: '#F87171' }}>{error}</p>
            </div>
          )}

          {!codeSent ? (
            <form onSubmit={handleSendCode} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.45rem', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: isDark ? '#9A9AAB' : '#6B7280' }}>Email address</label>
                <input type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required
                  onFocus={() => setFocusedField('email')} onBlur={() => setFocusedField(null)}
                  style={inputStyle(isDark, focusedField === 'email')} />
              </div>
              <button type="submit" disabled={loading} style={{ marginTop: '0.25rem', width: '100%', padding: '0.85rem', background: loading ? (isDark ? '#3A3A2A' : '#E5D800') : '#FFDD00', border: 'none', borderRadius: '12px', fontSize: '0.92rem', fontWeight: 800, color: '#1A1A1A', cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', boxShadow: loading ? 'none' : '0 4px 18px rgba(255,221,0,0.35)', transition: 'all 0.18s' }}
                onMouseEnter={e => { if (!loading) e.currentTarget.style.boxShadow = '0 8px 24px rgba(255,221,0,0.45)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = loading ? 'none' : '0 4px 18px rgba(255,221,0,0.35)'; }}
              >
                {loading ? (
                  <><svg style={{ animation: 'spin 0.8s linear infinite' }} width="16" height="16" fill="none" viewBox="0 0 24 24"><circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path style={{ opacity: 0.9 }} fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/></svg> Sending…</>
                ) : 'Send reset code'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleContinue} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ padding: '0.85rem 1rem', background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.25)', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <svg width="18" height="18" fill="none" stroke="#4ADE80" strokeWidth="2.2" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" strokeLinecap="round"/><polyline points="22 4 12 14.01 9 11.01" strokeLinecap="round"/></svg>
                <span style={{ fontSize: '0.83rem', fontWeight: 600, color: '#4ADE80' }}>Code sent! Check your inbox.</span>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.45rem', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: isDark ? '#9A9AAB' : '#6B7280' }}>Reset code</label>
                <input type="text" placeholder="Enter the code from your email" value={code} onChange={e => setCode(e.target.value)} required
                  onFocus={() => setFocusedField('code')} onBlur={() => setFocusedField(null)}
                  style={{ ...inputStyle(isDark, focusedField === 'code'), letterSpacing: '0.1em', fontSize: '1rem' }} />
              </div>
              <button type="submit" style={{ width: '100%', padding: '0.85rem', background: '#FFDD00', border: 'none', borderRadius: '12px', fontSize: '0.92rem', fontWeight: 800, color: '#1A1A1A', cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 4px 18px rgba(255,221,0,0.35)', transition: 'all 0.18s' }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = '0 8px 24px rgba(255,221,0,0.45)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = '0 4px 18px rgba(255,221,0,0.35)'}
              >Continue</button>
              <button type="button" onClick={() => { setCodeSent(false); setError(''); setCode(''); }}
                style={{ background: 'none', border: 'none', fontSize: '0.8rem', fontWeight: 600, color: isDark ? '#6A6A78' : '#9CA3AF', cursor: 'pointer', fontFamily: 'inherit', padding: '0.25rem 0', transition: 'color 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.color = isDark ? '#F0F0F3' : '#1A1A1A'}
                onMouseLeave={e => e.currentTarget.style.color = isDark ? '#6A6A78' : '#9CA3AF'}
              >Didn't receive the code? Send again</button>
            </form>
          )}
        </div>
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default ForgotPasswordPage;
