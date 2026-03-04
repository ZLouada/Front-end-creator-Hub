/** @type {import('tailwindcss').Config} */
export default {
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
          400: '#FFDD00',   // Brand Yellow
          500: '#F5C800',
          600: '#D4A800',
          700: '#B08900',
          800: '#8B6D00',
          900: '#1A1A1A',   // Deep Charcoal
        },
        surface: {
          DEFAULT: '#F0F0F0',  // Asphalt Gray — page backgrounds
          card:    '#FFFFFF',  // Paper White — card surfaces
          dark:    '#1A1A1A',  // Deep Charcoal — dark UI
          sidebar: '#111111',
        },
        success: '#00C853',    // Success Green
        danger: {
          DEFAULT: '#FF5C5C',  // Chili Red
          50:  '#FFF0F0',
          100: '#FFE0E0',
          200: '#FFC7C7',
          500: '#FF5C5C',
          600: '#E54545',
          700: '#CC3333',
        },
        info: {
          DEFAULT: '#3D5AFE',  // Info Blue
          50:  '#EEF0FF',
          100: '#DDE2FF',
          200: '#B8C2FF',
          500: '#3D5AFE',
          600: '#3451E0',
          700: '#2A42C2',
        },
      },
      boxShadow: {
        'soft-sm':  '0 2px 8px rgba(255, 221, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.06)',
        'soft':     '0 4px 16px rgba(255, 221, 0, 0.10), 0 2px 6px rgba(0, 0, 0, 0.06)',
        'soft-md':  '0 8px 32px rgba(255, 221, 0, 0.12), 0 4px 12px rgba(0, 0, 0, 0.06)',
        'soft-lg':  '0 16px 48px rgba(255, 221, 0, 0.15), 0 8px 24px rgba(0, 0, 0, 0.08)',
        'soft-xl':  '0 24px 64px rgba(255, 221, 0, 0.18), 0 12px 32px rgba(0, 0, 0, 0.08)',
        'glow-sm':  '0 0 12px rgba(255, 221, 0, 0.25)',
        'glow':     '0 0 24px rgba(255, 221, 0, 0.35)',
        'glow-lg':  '0 0 40px rgba(255, 221, 0, 0.45)',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      animation: {
        'float-slow':    'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 3s infinite',
        'float-fast':    'float 4s ease-in-out infinite',
        'pulse-glow':    'pulse-glow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 16px rgba(255, 221, 0, 0.3)' },
          '50%':      { boxShadow: '0 0 32px rgba(255, 221, 0, 0.6)' },
        },
      },
    },
  },
  plugins: [],
}
