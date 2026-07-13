import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

/**
 * Platform Tailwind config: token NAMES only. Every value points at a CSS
 * variable that the owning project defines in its own stylesheet (loaded
 * only on that project's routes), so no project-specific value lives here
 * and two projects can never collide. BOP's values: see
 * src/app/projects/bop/styles/bop.css. Colors are RGB triplets wrapped in
 * rgb(var() / <alpha-value>) so opacity modifiers (bg-bg-mid/55) work;
 * tokens with baked-in alpha (rule, land-edge) are plain variables.
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'bg-deep': 'rgb(var(--bop-bg-deep) / <alpha-value>)',
        'bg-mid': 'rgb(var(--bop-bg-mid) / <alpha-value>)',
        'bg-soft': 'rgb(var(--bop-bg-soft) / <alpha-value>)',
        land: 'rgb(var(--bop-land) / <alpha-value>)',
        'land-edge': 'var(--bop-land-edge)',

        teal: {
          DEFAULT: 'rgb(var(--bop-teal) / <alpha-value>)',
          bright: 'rgb(var(--bop-teal-bright) / <alpha-value>)',
          aqua: 'rgb(var(--bop-teal-aqua) / <alpha-value>)',
        },

        ivory: {
          DEFAULT: 'rgb(var(--bop-ivory) / <alpha-value>)',
          dim: 'rgb(var(--bop-ivory-dim) / <alpha-value>)',
          faint: 'rgb(var(--bop-ivory-faint) / <alpha-value>)',
        },

        rule: {
          DEFAULT: 'var(--bop-rule)',
          soft: 'var(--bop-rule-soft)',
        },

        suitability: {
          low: 'rgb(var(--bop-suitability-low) / <alpha-value>)',
          mid: 'rgb(var(--bop-suitability-mid) / <alpha-value>)',
          high: 'rgb(var(--bop-suitability-high) / <alpha-value>)',
        },
      },

      fontFamily: {
        serif: ['var(--project-font-serif)', ...defaultTheme.fontFamily.serif],
        sans: ['var(--project-font-sans)', ...defaultTheme.fontFamily.sans],
        mono: ['var(--project-font-mono)', ...defaultTheme.fontFamily.mono],
      },

      fontSize: {
        'hero-headline': [
          'var(--bop-text-hero-headline)',
          {
            lineHeight: 'var(--bop-text-hero-headline-lh)',
            letterSpacing: 'var(--bop-text-hero-headline-ls)',
          },
        ],
        'stat-num': [
          'var(--bop-text-stat-num)',
          {
            lineHeight: 'var(--bop-text-stat-num-lh)',
            letterSpacing: 'var(--bop-text-stat-num-ls)',
          },
        ],
        'stat-unit': [
          'var(--bop-text-stat-unit)',
          {
            lineHeight: 'var(--bop-text-stat-unit-lh)',
            letterSpacing: 'var(--bop-text-stat-unit-ls)',
          },
        ],
        eyebrow: [
          'var(--bop-text-eyebrow)',
          {
            lineHeight: 'var(--bop-text-eyebrow-lh)',
            letterSpacing: 'var(--bop-text-eyebrow-ls)',
          },
        ],
        label: [
          'var(--bop-text-label)',
          {
            lineHeight: 'var(--bop-text-label-lh)',
            letterSpacing: 'var(--bop-text-label-ls)',
          },
        ],
        'body-sm': [
          'var(--bop-text-body-sm)',
          { lineHeight: 'var(--bop-text-body-sm-lh)' },
        ],
        body: ['var(--bop-text-body)', { lineHeight: 'var(--bop-text-body-lh)' }],
      },

      // Same values as Tailwind's defaults; kept for explicitness.
      fontWeight: {
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
      },

      spacing: {
        'scaffold-top': 'var(--bop-scaffold-top)',
        'scaffold-x': 'var(--bop-scaffold-x)',
        'scaffold-bottom': 'var(--bop-scaffold-bottom)',
      },

      maxWidth: {
        scaffold: 'var(--bop-scaffold-max)',
      },

      borderRadius: {
        card: 'var(--bop-radius-card)',
      },

      // Keyframes live in the owning project's stylesheet next to the
      // duration/easing variables these names point at.
      animation: {
        'fade-up': 'var(--bop-anim-fade-up)',
        'fade-up-fast': 'var(--bop-anim-fade-up-fast)',
        'fade-in': 'var(--bop-anim-fade-in)',
        'pulse-halo': 'var(--bop-anim-pulse-halo)',
        nudge: 'var(--bop-anim-nudge)',
        'draw-line': 'var(--bop-anim-draw-line)',
      },

      transitionDuration: {
        '280': '280ms',
      },

      backdropBlur: {
        tooltip: 'var(--bop-blur-tooltip)',
      },

      backgroundImage: {
        'suitability-gradient': 'var(--bop-bg-suitability-gradient)',
        'ambient-teal': 'var(--bop-bg-ambient-teal)',
        'ambient-aqua': 'var(--bop-bg-ambient-aqua)',
      },
    },
  },
  plugins: [],
}

export default config
