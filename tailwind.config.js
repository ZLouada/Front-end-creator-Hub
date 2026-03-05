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
          yellow:   '#FFDD00',   // Anchor Accent (10%)
          charcoal: '#1A1A1A',   // Stroke & Text (30%)
        },
        surface: {
          DEFAULT: '#F0F0F0',    // Asphalt Gray — page backgrounds
          card:    '#FFFFFF',    // Paper White — card surfaces
          dark:    '#1A1A1A',    // Deep Charcoal — dark UI
          sidebar: '#111111',
        },
        success: '#00C853',      // Success Green
        danger:  '#FF5C5C',      // Chili Red
        info:    '#3D5AFE',      // Info Blue
      },
      boxShadow: {
        'neu':        '5px 5px 0px 0px #1A1A1A',
        'neu-sm':     '3px 3px 0px 0px #1A1A1A',
        'neu-lg':     '8px 8px 0px 0px #1A1A1A',
        'neu-yellow': '5px 5px 0px 0px #FFDD00',
        'neu-hover':  '8px 8px 0px 0px #1A1A1A',
        'neu-active': '1px 1px 0px 0px #1A1A1A',
      },
      animation: {
        'float-slow':    'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 3s infinite',
        'float-fast':    'float 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
}
