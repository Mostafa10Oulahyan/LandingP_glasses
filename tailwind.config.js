/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        /* ---- Brand: the two logo hexes, expanded to ramps (fixed, theme-independent) ---- */
        bordeaux: {
          50: '#F8F4F4',
          100: '#EEE4E6',
          200: '#D8C0C4',
          300: '#C19AA0',
          400: '#A9747C',
          500: '#93505A',
          600: '#833540',
          700: '#751F2B', // exact logo hex — base brand color
          800: '#601923',
          900: '#4C141C',
          DEFAULT: '#751F2B',
        },
        gold: {
          50: '#F9F6EE',
          100: '#F2EADA',
          200: '#E4D4B3',
          300: '#D5BC89',
          400: '#C3A056', // exact logo hex — base accent color
          500: '#AC8D4C',
          600: '#927840',
          700: '#756034',
          800: '#584827',
          900: '#3A301A',
          DEFAULT: '#C3A056',
          /* legacy aliases kept so existing markup compiles */
          light: '#D5BC89',
          deep: '#927840',
        },

        /* ---- Structural neutral canvas: driven by CSS vars so .dark flips them all ---- */
        cream: 'rgb(var(--c-cream) / <alpha-value>)',
        bone: 'rgb(var(--c-bone) / <alpha-value>)',
        sand: 'rgb(var(--c-sand) / <alpha-value>)',
        beige: 'rgb(var(--c-beige) / <alpha-value>)',
        ink: 'rgb(var(--c-ink) / <alpha-value>)',
        char: 'rgb(var(--c-char) / <alpha-value>)',
        smoke: 'rgb(var(--c-smoke) / <alpha-value>)',

        /* fixed near-black / near-white for surfaces that must NOT invert */
        obsidian: '#0B0A09',
        porcelain: '#FAF8F5',
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        body: ['"Manrope"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      letterSpacing: {
        widest2: '0.32em',
      },
      animation: {
        marquee: 'marquee 60s linear infinite',
        'marquee-slow': 'marquee 90s linear infinite',
        'fade-up': 'fadeUp 1s cubic-bezier(.2,.7,.2,1) both',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
