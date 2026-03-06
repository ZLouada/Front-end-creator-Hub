/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
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
          DEFAULT: '#F0F0F0',
          card:    '#FFFFFF',
          dark:    '#1A1A1A',
          sidebar: '#111111',
        },
        success: '#00C853',
        danger:  '#FF5C5C',
        info:    '#3D5AFE',
      },
      boxShadow: {
        'neu':        '5px 5px 0px 0px #1A1A1A',
        'neu-sm':     '3px 3px 0px 0px #1A1A1A',
        'neu-lg':     '8px 8px 0px 0px #1A1A1A',
        'neu-yellow': '5px 5px 0px 0px #FFDD00',
        'neu-hover':  '8px 8px 0px 0px #1A1A1A',
        'neu-active': '1px 1px 0px 0px #1A1A1A',
        'soft':       '0 4px 16px rgba(0, 0, 0, 0.06)',
        'soft-sm':    '0 2px 8px rgba(0, 0, 0, 0.04)',
        'soft-lg':    '0 8px 32px rgba(0, 0, 0, 0.08)',
        'soft-xl':    '0 16px 48px rgba(0, 0, 0, 0.1)',
        'glow':       '0 0 24px rgba(255, 221, 0, 0.3)',
        'glow-sm':    '0 0 12px rgba(255, 221, 0, 0.2)',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.22, 1, 0.36, 1)',
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
          '50%': { transform: 'translateY(-20px)' },
        },
        'gradient-shift': {
          '0%':   { backgroundPosition: '0% 50%' },
          '50%':  { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'particle-rise': {
          '0%':   { opacity: '0', transform: 'translateY(0) scale(0)' },
          '50%':  { opacity: '0.8' },
          '100%': { opacity: '0', transform: 'translateY(-60px) scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
