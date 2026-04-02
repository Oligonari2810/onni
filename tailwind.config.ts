import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        rose: { DEFAULT: '#C4497A' },
        blush: '#E8B4C8',
        deep: '#1A0A12',
        cream: '#FAF4F0',
        nude: '#F0E4DC',
        mist: '#EDE0E8',
        charcoal: '#2C1A24',
        gray: { DEFAULT: '#8A7280' },
      },
      fontFamily: {
        cormorant: ['Cormorant Garamond', 'serif'],
        dm: ['DM Sans', 'sans-serif'],
        korean: ['Noto Serif KR', 'serif'],
      },
      zIndex: {
        '100': '100',
      },
      transitionDuration: {
        '400': '400ms',
      },
      animation: {
        marquee: 'marquee 20s linear infinite',
        'pulse-centered': 'pulse-centered 2s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        'pulse-centered': {
          '0%, 100%': { transform: 'translate(-50%, -50%) scale(1)' },
          '50%': { transform: 'translate(-50%, -50%) scale(1.05)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
