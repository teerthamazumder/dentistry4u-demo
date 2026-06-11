/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#0891B2',
          50: '#ECFEFF',
          100: '#CFFAFE',
          200: '#A5F3FC',
          300: '#67E8F9',
          400: '#22D3EE',
          500: '#06B6D4',
          600: '#0891B2',
          700: '#0E7490',
          800: '#155E75',
          900: '#164E63',
        },
        'deep-navy': '#0C2340',
        'navy-mid': '#1E3A5F',
        'soft-bg': '#F0F9FF',
        'soft-bg-2': '#E0F2FE',
        accent: '#22D3EE',
        'brand-text': '#0F172A',
        muted: '#64748B',
      },
      boxShadow: {
        'glow-sm': '0 0 20px rgba(8,145,178,0.15)',
        glow: '0 0 40px rgba(8,145,178,0.2)',
        'glow-lg': '0 0 80px rgba(8,145,178,0.25)',
        card: '0 4px 24px rgba(8,145,178,0.08), 0 1px 3px rgba(0,0,0,0.05)',
        elevated: '0 20px 60px rgba(8,145,178,0.12), 0 8px 24px rgba(0,0,0,0.06)',
        btn: '0 4px 20px rgba(8,145,178,0.40)',
        'btn-hover': '0 8px 30px rgba(8,145,178,0.50)',
        float: '0 8px 40px rgba(8,145,178,0.12)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        floatAlt: {
          '0%, 100%': { transform: 'translateY(-6px)' },
          '50%': { transform: 'translateY(6px)' },
        },
        blob: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(40px, -60px) scale(1.12)' },
          '66%': { transform: 'translate(-30px, 30px) scale(0.88)' },
        },
        blobAlt: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(-40px, 50px) scale(1.08)' },
          '66%': { transform: 'translate(30px, -30px) scale(0.92)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%) skewX(-15deg)' },
          '100%': { transform: 'translateX(200%) skewX(-15deg)' },
        },
        spin: {
          to: { transform: 'rotate(360deg)' },
        },
        // GlowButton — combines speen (rotate) + woah (scale) in a single 8 s keyframe
        glowSpin: {
          '0%':   { transform: 'rotate(10deg)  scale(1)' },
          '25%':  { transform: 'rotate(100deg) scale(0.875)' },
          '50%':  { transform: 'rotate(190deg) scale(0.75)' },
          '75%':  { transform: 'rotate(280deg) scale(0.875)' },
          '100%': { transform: 'rotate(370deg) scale(1)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'float-alt': 'floatAlt 7s ease-in-out infinite',
        blob: 'blob 14s ease-in-out infinite',
        'blob-alt': 'blobAlt 18s ease-in-out 3s infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        shimmer: 'shimmer 0.65s ease-out forwards',
        spin: 'spin 1s linear infinite',
        'glow-spin': 'glowSpin 8s cubic-bezier(0.56,0.15,0.28,0.86) infinite',
      },
    },
  },
  plugins: [],
}
