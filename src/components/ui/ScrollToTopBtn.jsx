import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

/**
 * Floating "back to top" button that appears after scrolling 300px.
 */
export default function ScrollToTopBtn() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
      style={{
        position: 'fixed',
        bottom: '1.75rem',
        right: '1.75rem',
        zIndex: 999,
        width: '44px',
        height: '44px',
        borderRadius: '50%',
        background: '#1A1A1A',
        color: '#FFDD00',
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: '0 4px 20px rgba(0,0,0,0.18)',
        transition: 'transform 0.2s, box-shadow 0.2s, opacity 0.2s',
        animation: 'fadeUp 0.25s ease both',
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(0,0,0,0.22)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.18)'; }}
    >
      <ChevronUp size={22} strokeWidth={2.5} />
    </button>
  );
}
