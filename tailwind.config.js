/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
      colors: {
        // ── New coastal-premium dental palette ──────────────────────────
        navy:         '#08154A',   // dark navy — headings, dark sections
        'royal-blue': '#223B86',   // royal blue — brand primary, buttons
        mustard:      '#D9A23A',   // warm mustard — accents, badges
        clay:         '#A9530B',   // burnt orange — secondary accent
        sand:         '#E7E1D6',   // warm sand — light section backgrounds
        'off-white':  '#F8F7F2',   // clean off-white — base background, cards

        // ── Legacy names remapped to new palette (class refs still work) ─
        cream:            '#E7E1D6',   // sand (was #FAF7F2)
        'warm-white':     '#F8F7F2',   // off-white (was #FDFAF6)
        sage:             '#D9A23A',   // mustard (was #7B9E87)
        'sage-light':     '#EDD89A',   // pale mustard (was #A8C4B0)
        'sage-dark':      '#223B86',   // royal blue (was #4A7A5C)
        gold:             '#D9A23A',   // mustard (was #C9A84C)
        'gold-light':     '#F0D9A0',   // pale mustard (was #E8D5A3)
        charcoal:         '#08154A',   // dark navy (was #2C2C2C)
        'charcoal-soft':  '#1A2E6B',   // mid navy (was #3D3D3D)
        'mid-gray':       '#5A6A8A',   // muted navy-gray (was #7A7A7A)
        'light-gray':     '#DDD9CE',   // sand border (was #E8E4DC)
        'pink-blush':     '#FDE8D8',   // light clay (was #F5EBE8)
        terracotta:       '#A9530B',   // clay (was #C5856A)

        // ── Primary scale ────────────────────────────────────────────────
        primary: {
          DEFAULT: '#223B86',
          50:  '#EEF1FA',
          100: '#D4DBEF',
          200: '#A9B7DF',
          300: '#7E93CF',
          400: '#536FBF',
          500: '#223B86',
          600: '#1B2F6B',
          700: '#142350',
          800: '#08154A',
          900: '#040B27',
        },

        // ── Alias helpers ────────────────────────────────────────────────
        'deep-navy':  '#08154A',
        'soft-bg':    '#F8F7F2',
        'soft-bg-2':  '#E7E1D6',
        accent:       '#D9A23A',
        'brand-text': '#08154A',
        muted:        '#5A6A8A',
        'warm-gold':  '#D9A23A',
        'deep-amber': '#A9530B',
        'dark-brown': '#08154A',
      },
      boxShadow: {
        card:        '0 18px 45px rgba(8,21,74,0.08), 0 4px 12px rgba(8,21,74,0.04)',
        'card-hover':'0 24px 60px rgba(8,21,74,0.14), 0 8px 20px rgba(8,21,74,0.06)',
        'card-sm':   '0 4px 20px rgba(8,21,74,0.06)',
        elevated:    '0 20px 60px rgba(8,21,74,0.12), 0 8px 24px rgba(8,21,74,0.06)',
        btn:         '0 4px 20px rgba(34,59,134,0.35)',
        'btn-hover': '0 8px 30px rgba(34,59,134,0.50)',
        float:       '0 8px 40px rgba(34,59,134,0.12)',
        'glow-navy': '0 0 30px rgba(8,21,74,0.22), 0 0 60px rgba(8,21,74,0.08)',
        // legacy aliases
        'glow-sage':    '0 0 30px rgba(34,59,134,0.22), 0 0 60px rgba(34,59,134,0.08)',
        'glow-gold':    '0 0 30px rgba(217,162,58,0.22), 0 0 60px rgba(217,162,58,0.08)',
        'glow-gold-sm': '0 0 16px rgba(217,162,58,0.18)',
        'btn-gold':     '0 4px 20px rgba(217,162,58,0.35)',
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
        glowSpin: {
          '0%':   { transform: 'rotate(10deg)  scale(1)' },
          '25%':  { transform: 'rotate(100deg) scale(0.875)' },
          '50%':  { transform: 'rotate(190deg) scale(0.75)' },
          '75%':  { transform: 'rotate(280deg) scale(0.875)' },
          '100%': { transform: 'rotate(370deg) scale(1)' },
        },
      },
      animation: {
        float:         'float 6s ease-in-out infinite',
        'float-slow':  'float 9s ease-in-out infinite',
        'float-alt':   'floatAlt 7s ease-in-out infinite',
        blob:          'blob 14s ease-in-out infinite',
        'blob-alt':    'blobAlt 18s ease-in-out 3s infinite',
        'pulse-glow':  'pulseGlow 3s ease-in-out infinite',
        shimmer:       'shimmer 0.65s ease-out forwards',
        spin:          'spin 1s linear infinite',
        'glow-spin':   'glowSpin 8s cubic-bezier(0.56,0.15,0.28,0.86) infinite',
      },
    },
  },
  plugins: [],
}
