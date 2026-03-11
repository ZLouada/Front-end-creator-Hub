import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

const IntroPage = () => {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const t = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(t);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const bg = isDark ? '#09090B' : '#FAFAF8';
  const textPrimary = isDark ? '#FAFAFA' : '#0A0A0A';
  const textSub = isDark ? 'rgba(255,255,255,0.50)' : 'rgba(0,0,0,0.50)';
  const cardBg = isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)';
  const cardBorder = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)';

  const navBg = scrolled
    ? isDark ? 'rgba(9,9,11,0.88)' : 'rgba(250,250,248,0.88)'
    : 'transparent';
  const navBorder = scrolled
    ? isDark ? '1px solid rgba(255,255,255,0.07)' : '1px solid rgba(0,0,0,0.07)'
    : '1px solid transparent';

  return (
    <div style={{ minHeight: '100vh', background: bg, fontFamily: "'Inter', system-ui, sans-serif", overflowX: 'hidden' }}>

      {/* ── Keyframe animations ─────────────────────────────────── */}
      <style>{`
        @keyframes introFadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes introBlobA {
          0%,100% { transform: translate(0,0) scale(1); }
          33%      { transform: translate(24px,-32px) scale(1.05); }
          66%      { transform: translate(-16px,22px) scale(0.97); }
        }
        @keyframes introBlobB {
          0%,100% { transform: translate(0,0) scale(1); }
          40%      { transform: translate(-28px,22px) scale(1.04); }
          80%      { transform: translate(18px,-28px) scale(0.96); }
        }
        @keyframes ctaGlow {
          0%,100% { opacity: 0.65; }
          50%      { opacity: 1; }
        }
      `}</style>

      {/* ══════════════════════════════════════════════════════════
          NAVBAR
      ══════════════════════════════════════════════════════════ */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: navBg,
        backdropFilter: scrolled ? 'blur(18px) saturate(180%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(18px) saturate(180%)' : 'none',
        borderBottom: navBorder,
        transition: 'background 0.35s, border-color 0.35s, backdrop-filter 0.35s',
      }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto',
          padding: '0 2rem', height: 66,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>

          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', cursor: 'pointer' }}
               onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div style={{
              width: 36, height: 36, borderRadius: '10px',
              background: '#FFDD00', flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                      stroke="#1A1A1A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span style={{ color: textPrimary, fontSize: '1.05rem', fontWeight: 800, letterSpacing: '-0.03em' }}>
              CreatorHub <span style={{ color: '#FFDD00' }}>SA</span>
            </span>
          </div>

          {/* Right — Auth buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <button
              onClick={() => navigate('/auth')}
              style={{
                background: 'none',
                border: `1.5px solid ${isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)'}`,
                borderRadius: '10px', padding: '0.5rem 1.1rem',
                fontSize: '0.85rem', fontWeight: 600, color: textPrimary,
                cursor: 'pointer', fontFamily: 'inherit',
                transition: 'border-color 0.15s, color 0.15s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#FFDD00';
                e.currentTarget.style.color = '#FFDD00';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)';
                e.currentTarget.style.color = textPrimary;
              }}
            >Log in</button>

            <button
              onClick={() => navigate('/auth?mode=signup')}
              style={{
                background: '#FFDD00', border: '1.5px solid #FFDD00',
                borderRadius: '10px', padding: '0.5rem 1.1rem',
                fontSize: '0.85rem', fontWeight: 700, color: '#1A1A1A',
                cursor: 'pointer', fontFamily: 'inherit',
                boxShadow: '0 2px 14px rgba(255,221,0,0.35)',
                transition: 'transform 0.15s, box-shadow 0.15s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(255,221,0,0.5)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 14px rgba(255,221,0,0.35)';
              }}
            >Get started →</button>
          </div>
        </div>
      </nav>

      {/* ══════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════ */}
      <section style={{
        minHeight: '100vh', display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        position: 'relative', overflow: 'hidden',
        paddingTop: '80px',
      }}>
        {/* Dot grid */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: isDark
            ? 'radial-gradient(rgba(255,255,255,0.055) 1px, transparent 1px)'
            : 'radial-gradient(rgba(0,0,0,0.055) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }} />

        {/* Yellow glow blobs */}
        <div style={{
          position: 'absolute', top: '8%', left: '10%',
          width: '38rem', height: '38rem',
          background: 'radial-gradient(circle, rgba(255,221,0,0.09) 0%, transparent 70%)',
          pointerEvents: 'none', animation: 'introBlobA 14s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute', bottom: '8%', right: '8%',
          width: '30rem', height: '30rem',
          background: 'radial-gradient(circle, rgba(255,221,0,0.06) 0%, transparent 70%)',
          pointerEvents: 'none', animation: 'introBlobB 18s ease-in-out infinite',
        }} />

        <div style={{
          maxWidth: 920, margin: '0 auto', padding: '2rem',
          textAlign: 'center', position: 'relative', zIndex: 1,
        }}>

          {/* Eyebrow badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.55rem',
            background: isDark ? 'rgba(255,221,0,0.08)' : 'rgba(255,221,0,0.10)',
            border: '1px solid rgba(255,221,0,0.22)',
            borderRadius: '100px', padding: '0.3rem 1rem',
            marginBottom: '2.5rem',
            animation: mounted ? 'introFadeUp 0.6s cubic-bezier(0.22,1,0.36,1) 0.05s both' : 'none',
            opacity: mounted ? undefined : 0,
          }}>
            <span style={{
              fontSize: '0.7rem', color: '#FFDD00', fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '0.1em',
            }}>Creator Platform</span>
            <span style={{ width: 1, height: 12, background: 'rgba(255,221,0,0.3)' }} />
            <span style={{
              fontSize: '0.78rem', fontWeight: 500,
              color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.55)',
            }}>Built for South Asia</span>
          </div>

          {/* Headline */}
          <h1 style={{
            color: textPrimary,
            fontSize: 'clamp(2.8rem, 7.5vw, 5.5rem)',
            fontWeight: 900, lineHeight: 1.05,
            letterSpacing: '-0.045em', margin: '0 0 1.5rem',
            fontFamily: "'Playfair Display', Georgia, serif",
            animation: mounted ? 'introFadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.15s both' : 'none',
            opacity: mounted ? undefined : 0,
          }}>
            The creator platform<br />
            <span style={{ color: '#FFDD00', fontStyle: 'italic' }}>built to scale you.</span>
          </h1>

          {/* Sub headline */}
          <p style={{
            color: textSub, fontSize: 'clamp(1rem, 2.2vw, 1.2rem)',
            lineHeight: 1.75, maxWidth: 580, margin: '0 auto 2.75rem',
            fontWeight: 400,
            animation: mounted ? 'introFadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.25s both' : 'none',
            opacity: mounted ? undefined : 0,
          }}>
            Share your craft, grow your community, and earn — with local payments,
            powerful analytics, and the highest revenue share in the region.
          </p>

          {/* CTA buttons */}
          <div style={{
            display: 'flex', justifyContent: 'center', flexWrap: 'wrap',
            gap: '0.875rem', marginBottom: '3.25rem',
            animation: mounted ? 'introFadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.35s both' : 'none',
            opacity: mounted ? undefined : 0,
          }}>
            <button
              onClick={() => navigate('/auth?mode=signup')}
              style={{
                background: '#FFDD00', border: 'none',
                borderRadius: '12px', padding: '0.95rem 2.1rem',
                fontSize: '0.95rem', fontWeight: 800, color: '#1A1A1A',
                cursor: 'pointer', fontFamily: 'inherit',
                boxShadow: '0 4px 26px rgba(255,221,0,0.4)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 10px 36px rgba(255,221,0,0.55)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 26px rgba(255,221,0,0.4)';
              }}
            >
              Start for free
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>

            <button
              onClick={() => navigate('/auth')}
              style={{
                background: 'none',
                border: `1.5px solid ${isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)'}`,
                borderRadius: '12px', padding: '0.95rem 2.1rem',
                fontSize: '0.95rem', fontWeight: 600, color: textPrimary,
                cursor: 'pointer', fontFamily: 'inherit',
                transition: 'border-color 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.35)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)';
              }}
            >Sign in</button>
          </div>

          {/* Trust strip */}
          <div style={{
            display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1.5rem',
            animation: mounted ? 'introFadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.45s both' : 'none',
            opacity: mounted ? undefined : 0,
          }}>
            {[
              { icon: '⚡', text: 'Setup in 2 minutes' },
              { icon: '🔒', text: 'No credit card required' },
              { icon: '💰', text: 'Keep 92% of revenue' },
            ].map(({ icon, text }) => (
              <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ fontSize: '0.85rem' }}>{icon}</span>
                <span style={{ color: textSub, fontSize: '0.82rem', fontWeight: 500 }}>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          STATS BAR
      ══════════════════════════════════════════════════════════ */}
      <section style={{
        borderTop: `1px solid ${cardBorder}`,
        borderBottom: `1px solid ${cardBorder}`,
        padding: '3.5rem 2rem',
      }}>
        <div style={{
          maxWidth: 900, margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '2rem', textAlign: 'center',
        }}>
          {[
            { value: '5M+',     label: 'Active Creators' },
            { value: 'SAR 2B+', label: 'Creator Earnings' },
            { value: '92%',     label: 'Revenue Share'   },
            { value: '180+',    label: 'Countries'       },
          ].map(({ value, label }) => (
            <div key={label}>
              <p style={{
                color: '#FFDD00', fontSize: '2.1rem', fontWeight: 900,
                margin: '0 0 0.3rem', letterSpacing: '-0.04em',
              }}>{value}</p>
              <p style={{
                color: textSub, fontSize: '0.78rem', fontWeight: 600,
                margin: 0, textTransform: 'uppercase', letterSpacing: '0.07em',
              }}>{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          FEATURES
      ══════════════════════════════════════════════════════════ */}
      <section style={{ padding: '7rem 2rem' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto' }}>

          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p style={{
              color: '#FFDD00', fontSize: '0.72rem', fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '0.12em', margin: '0 0 0.9rem',
            }}>Everything you need</p>
            <h2 style={{
              color: textPrimary, fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800,
              letterSpacing: '-0.04em', margin: '0 0 1rem',
              fontFamily: "'Playfair Display', Georgia, serif",
            }}>
              One platform.<br />
              <span style={{ color: '#FFDD00' }}>Unlimited possibilities.</span>
            </h2>
            <p style={{ color: textSub, fontSize: '1rem', maxWidth: 500, margin: '0 auto', lineHeight: 1.75 }}>
              Everything a creator needs to publish, monetize, and grow — subscriptions, analytics, and local payment gates.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
            gap: '1.25rem',
          }}>
            {[
              {
                svg: <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>,
                title: 'Subscription Tiers',
                desc: 'Create multiple membership tiers with exclusive content and pricing — perfect for any niche.',
              },
              {
                svg: <><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></>,
                title: 'Exclusive Content',
                desc: 'Gate articles, videos, downloads, and live sessions behind subscriber tiers automatically.',
              },
              {
                svg: <><path d="M3 3h18v18H3zM3 9h18M9 21V9"/></>,
                title: 'Local Payments',
                desc: 'Accept Mada, STC Pay, Apple Pay, and bank transfers — built for South Asian infrastructure.',
              },
              {
                svg: <><path d="M18 20V10M12 20V4M6 20v-6"/></>,
                title: 'Deep Analytics',
                desc: 'Track revenue, subscriber growth, engagement, and churn in a beautiful creator dashboard.',
              },
              {
                svg: <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></>,
                title: 'Community Building',
                desc: 'Cultivate loyal fans with subscriber-only posts, early access, and direct community interaction.',
              },
              {
                svg: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>,
                title: 'Secure & Trusted',
                desc: 'Bank-level encryption, fraud protection, and compliant payment processing for your peace of mind.',
              },
            ].map(({ svg, title, desc }) => (
              <div key={title}
                style={{
                  background: cardBg,
                  border: `1px solid ${cardBorder}`,
                  borderRadius: '20px', padding: '2rem',
                  transition: 'border-color 0.22s, background 0.22s',
                  cursor: 'default',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,221,0,0.3)';
                  e.currentTarget.style.background = 'rgba(255,221,0,0.04)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = cardBorder;
                  e.currentTarget.style.background = cardBg;
                }}
              >
                <div style={{
                  width: 48, height: 48, borderRadius: '14px',
                  background: 'rgba(255,221,0,0.1)',
                  border: '1px solid rgba(255,221,0,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '1.25rem',
                }}>
                  <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#FFDD00" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    {svg}
                  </svg>
                </div>
                <h3 style={{
                  color: textPrimary, fontSize: '0.97rem', fontWeight: 700,
                  margin: '0 0 0.5rem', letterSpacing: '-0.02em',
                }}>{title}</h3>
                <p style={{ color: textSub, fontSize: '0.875rem', lineHeight: 1.65, margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════════════════════════ */}
      <section style={{
        padding: '6rem 2rem',
        background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
        borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`,
        borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`,
      }}>
        <div style={{ maxWidth: 1120, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <p style={{
              color: '#FFDD00', fontSize: '0.72rem', fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '0.12em', margin: '0 0 0.75rem',
            }}>Creators love it</p>
            <h2 style={{
              color: textPrimary, fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800,
              letterSpacing: '-0.04em', margin: 0,
              fontFamily: "'Playfair Display', Georgia, serif",
            }}>Trusted by creators across South Asia</h2>
          </div>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
            gap: '1.25rem',
          }}>
            {[
              { avatar: 'LS', name: 'Layla S.',  role: 'Lifestyle Creator · 48K fans',  text: "Switched from Patreon and never looked back. The local payment options alone doubled my conversion rate.", color: '#FF6B6B' },
              { avatar: 'KM', name: 'Karim M.',  role: 'Music Producer · 120K fans',    text: "The analytics dashboard is incredible — I finally understand which content actually grows my audience.", color: '#4ECDC4' },
              { avatar: 'NR', name: 'Noura R.',  role: 'Digital Artist · 22K fans',     text: "Setup took 10 minutes. My fans immediately loved the exclusive tier content. Revenue up 3x in 2 months.", color: '#A78BFA' },
            ].map(({ avatar, name, role, text, color }) => (
              <div key={name} style={{
                background: isDark ? 'rgba(255,255,255,0.04)' : '#FFFFFF',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)'}`,
                borderRadius: '20px', padding: '1.75rem',
              }}>
                {/* Stars */}
                <div style={{ display: 'flex', gap: '2px', marginBottom: '1rem' }}>
                  {[1,2,3,4,5].map(i => (
                    <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="#FFDD00">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
                <p style={{
                  color: isDark ? 'rgba(255,255,255,0.75)' : 'rgba(0,0,0,0.75)',
                  fontSize: '0.92rem', lineHeight: 1.7, margin: '0 0 1.25rem',
                }}>"{text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: '50%', flexShrink: 0,
                    background: color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.78rem', fontWeight: 800, color: '#fff',
                  }}>{avatar}</div>
                  <div>
                    <p style={{ color: textPrimary, fontSize: '0.85rem', fontWeight: 700, margin: 0 }}>{name}</p>
                    <p style={{ color: textSub, fontSize: '0.74rem', margin: 0 }}>{role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          FINAL CTA
      ══════════════════════════════════════════════════════════ */}
      <section style={{ padding: '8rem 2rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        {/* Centered glow */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          width: '44rem', height: '44rem',
          background: 'radial-gradient(circle, rgba(255,221,0,0.08) 0%, transparent 70%)',
          pointerEvents: 'none', animation: 'ctaGlow 6s ease-in-out infinite',
        }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 620, margin: '0 auto' }}>
          <h2 style={{
            color: textPrimary, fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 900,
            letterSpacing: '-0.045em', margin: '0 0 1.25rem',
            fontFamily: "'Playfair Display', Georgia, serif",
          }}>
            Ready to start<br />
            <span style={{ color: '#FFDD00', fontStyle: 'italic' }}>your creator journey?</span>
          </h2>
          <p style={{ color: textSub, fontSize: '1.05rem', lineHeight: 1.75, margin: '0 0 2.75rem' }}>
            Join 5 million creators. No credit card required. Cancel anytime.
          </p>

          <button
            onClick={() => navigate('/auth?mode=signup')}
            style={{
              background: '#FFDD00', border: 'none',
              borderRadius: '14px', padding: '1.05rem 2.6rem',
              fontSize: '1rem', fontWeight: 800, color: '#1A1A1A',
              cursor: 'pointer', fontFamily: 'inherit',
              boxShadow: '0 4px 30px rgba(255,221,0,0.45)',
              transition: 'transform 0.2s, box-shadow 0.2s',
              display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 12px 44px rgba(255,221,0,0.55)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 30px rgba(255,221,0,0.45)';
            }}
          >
            Get started for free
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════════════════ */}
      <footer style={{
        borderTop: `1px solid ${cardBorder}`,
        padding: '2.5rem 2rem',
      }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: '1rem',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{
              width: 28, height: 28, borderRadius: '8px',
              background: '#FFDD00',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <span style={{ color: textSub, fontSize: '0.83rem', fontWeight: 500 }}>
              © 2024 CreatorHub SA. All rights reserved.
            </span>
          </div>

          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {['Privacy', 'Terms', 'Contact'].map(link => (
              <a key={link} href="#" onClick={e => e.preventDefault()}
                 style={{
                   color: textSub, fontSize: '0.82rem', fontWeight: 500,
                   textDecoration: 'none', transition: 'color 0.15s',
                 }}
                 onMouseEnter={e => e.target.style.color = textPrimary}
                 onMouseLeave={e => e.target.style.color = textSub}
              >{link}</a>
            ))}
          </div>
        </div>
      </footer>

    </div>
  );
};

export default IntroPage;
