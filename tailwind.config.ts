import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Core palette from hero_reference.html
        'bg-deep': '#061321',
        'bg-mid': '#0E2236',
        'bg-soft': '#15314A',
        land: '#04101C',
        'land-edge': 'rgba(70, 110, 145, 0.18)',

        // Teal spectrum
        teal: {
          DEFAULT: '#137D76',
          bright: '#2BA8A0',
          aqua: '#6FE3D0',
        },

        // Ivory spectrum
        ivory: {
          DEFAULT: '#F2EDE3',
          dim: '#B8B0A0',
          faint: '#6E6859',
        },

        // Rules / dividers
        rule: {
          DEFAULT: 'rgba(242, 237, 227, 0.12)',
          soft: 'rgba(242, 237, 227, 0.06)',
        },

        // Suitability gradient stops (for JS interpolation)
        suitability: {
          low: '#2A4A56',
          mid: '#137D76',
          high: '#6FE3D0',
        },
      },

      fontFamily: {
        serif: ['var(--font-fraunces)', ...defaultTheme.fontFamily.serif],
        sans: ['var(--font-inter)', ...defaultTheme.fontFamily.sans],
        mono: ['var(--font-jetbrains)', ...defaultTheme.fontFamily.mono],
      },

      fontSize: {
        // Hero headline: clamp(50px, 6.6vw, 100px)
        'hero-headline': [
          'clamp(50px, 6.6vw, 100px)',
          { lineHeight: '0.96', letterSpacing: '-0.025em' },
        ],
        // Stat numbers
        'stat-num': ['60px', { lineHeight: '1', letterSpacing: '-0.02em' }],
        // Stat unit suffix
        'stat-unit': ['22px', { lineHeight: '1', letterSpacing: '0' }],
        // Eyebrows (panel-eyebrow, section markers)
        eyebrow: ['10px', { lineHeight: '1.4', letterSpacing: '0.22em' }],
        // Labels (stat-label, panel-section-title)
        label: ['11px', { lineHeight: '1.45', letterSpacing: '0.18em' }],
        // Body small
        'body-sm': ['13px', { lineHeight: '1.5' }],
        // Body default
        body: ['17px', { lineHeight: '1.6' }],
      },

      fontWeight: {
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
      },

      spacing: {
        // Page scaffold
        'scaffold-top': '36px',
        'scaffold-x': '56px',
        'scaffold-bottom': '40px',
      },

      maxWidth: {
        scaffold: '1480px',
      },

      borderRadius: {
        card: '4px',
      },

      animation: {
        'fade-up': 'fadeUp 1200ms ease-out forwards',
        'fade-up-fast': 'fadeUp 900ms ease-out forwards',
        'fade-in': 'fadeIn 1500ms ease-out forwards',
        'pulse-halo': 'pulseHalo 2.6s ease-in-out infinite',
        nudge: 'nudge 2s ease-in-out infinite',
        'draw-line': 'drawLine 800ms ease-out forwards',
      },

      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(14px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        pulseHalo: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.85' },
          '50%': { transform: 'scale(2.0)', opacity: '0' },
        },
        nudge: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(4px)' },
        },
        drawLine: {
          from: { opacity: '0', strokeDashoffset: '60' },
          to: { opacity: '1', strokeDashoffset: '0' },
        },
      },

      transitionDuration: {
        '280': '280ms',
      },

      backdropBlur: {
        tooltip: '8px',
      },

      backgroundImage: {
        // Suitability gradient for legends
        'suitability-gradient':
          'linear-gradient(90deg, #2A4A56 0%, #137D76 50%, #6FE3D0 100%)',
        // Page ambient gradients
        'ambient-teal':
          'radial-gradient(ellipse 1400px 900px at 28% 38%, rgba(19, 125, 118, 0.18), transparent 60%)',
        'ambient-aqua':
          'radial-gradient(ellipse 1100px 800px at 78% 72%, rgba(43, 168, 160, 0.10), transparent 55%)',
      },
    },
  },
  plugins: [],
}

export default config
