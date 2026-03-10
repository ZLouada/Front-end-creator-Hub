/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans:  ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        brand: {
          50:  '#FFFEF5',
          100: '#FFF9E0',
          200: '#FFF3C4',
          300: '#FFE88A',
          400: '#FFDD00',
          500: '#F5C800',
          600: '#D4A900',
          700: '#B08900',
          800: '#8C6D00',
          900: '#1A1A1A',
          yellow:   '#FFDD00',
          charcoal: '#1A1A1A',
        },
        surface: {
          DEFAULT: '#FBF9F6',
          card:    '#FFFFFF',
          dark:    '#1A1A1A',
          sidebar: '#111111',
        },
        success: '#00C853',
        danger:  '#FF5C5C',
        info:    '#3D5AFE',
        editorial: {
          border:  '#E5E7EB',
          divider: '#F3F4F6',
          hover:   '#F9FAFB',
        },
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '38': '9.5rem',
        '42': '10.5rem',
      },
      boxShadow: {
        'editorial':    '0 4px 24px rgba(0,0,0,0.04)',
        'editorial-sm': '0 2px 12px rgba(0,0,0,0.025)',
        'editorial-lg': '0 8px 36px rgba(0,0,0,0.06)',
        'editorial-xl': '0 20px 60px rgba(0,0,0,0.08)',
        'soft':         '0 4px 20px rgba(0, 0, 0, 0.05)',
        'soft-sm':      '0 2px 10px rgba(0, 0, 0, 0.03)',
        'soft-lg':      '0 8px 36px rgba(0, 0, 0, 0.07)',
        'soft-xl':      '0 20px 60px rgba(0, 0, 0, 0.09)',
        'glow':         '0 0 30px rgba(26, 26, 26, 0.08)',
        'glow-sm':      '0 0 16px rgba(26, 26, 26, 0.06)',
      },
      borderRadius: {
        'editorial':    '14px',
        'editorial-lg': '20px',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      animation: {
        'float-slow':    'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 3s infinite',
        'float-fast':    'float 4s ease-in-out infinite',
        'spin-slow':     'spin 20s linear infinite',
        'gradient-bg':   'gradient-shift 8s ease infinite',
        'drift':         'float 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'gradient-shift': {
          '0%':   { backgroundPosition: '0% 50%' },
          '50%':  { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
    },
  },
  plugins: [],
}
