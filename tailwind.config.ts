import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        rose: '#C4497A',
        blush: '#E8B4C8',
        deep: '#1A0A12',
        cream: '#FAF4F0',
        nude: '#F0E4DC',
        mist: '#EDE0E8',
        charcoal: '#2C1A24',
        gray: '#8A7280',
      },
      fontFamily: {
        cormorant: ['Cormorant Garamond', 'serif'],
        dm: ['DM Sans', 'sans-serif'],
        korean: ['Noto Serif KR', 'serif'],
      },
    },
  },
  plugins: [],
}
export default config
