/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: 'var(--color-ink)',
        surface: 'var(--color-surface)',
        'surface-strong': 'var(--color-surface-strong)',
        accent: 'var(--color-accent)',
        'accent-2': 'var(--color-accent-2)',
        highlight: 'var(--color-highlight)',
        muted: 'var(--color-muted)'
      },
      fontFamily: {
        display: ['"Martian Mono"', 'ui-monospace', 'SFMono-Regular'],
        body: ['"Spline Sans"', 'ui-sans-serif', 'system-ui']
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(255, 77, 109, 0.3), 0 0 30px rgba(255, 77, 109, 0.18)'
      }
    }
  },
  plugins: []
};
