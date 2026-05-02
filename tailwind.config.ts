import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        rose: { DEFAULT: '#C4497A', dark: '#a3365e' },
        blush: '#E8B4C8',
        deep: '#1A0A12',
        cream: '#FAF4F0',
        nude: '#F0E4DC',
        mist: '#EDE0E8',
        charcoal: '#2C1A24',
        gray: { DEFAULT: '#5A4A4F', light: '#8A7280' },
        line: 'rgba(196,73,122,0.12)',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'serif'],
        sans: ['DM Sans', 'sans-serif'],
        kr: ['Noto Serif KR', 'serif'],
      },
      animation: {
        'scroll': 'scroll 20s linear infinite',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'scale-in': 'scaleIn 0.3s ease-out forwards',
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
