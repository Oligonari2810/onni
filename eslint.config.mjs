import nextVitals from 'eslint-config-next/core-web-vitals'

const config = [
  {
    ignores: [
      '.next/**',
      'out/**',
      'node_modules/**',
      'public/**',
      'next-env.d.ts',
    ],
  },
  ...nextVitals,
  {
    rules: {
      // These effects perform SSR-safe, client-only initialization
      // (localStorage, timezone and search-param reads) where calling setState
      // inside the effect is the correct pattern. Surfaced as a warning so the
      // team can revisit it incrementally without blocking CI.
      'react-hooks/set-state-in-effect': 'warn',
    },
  },
]

export default config
