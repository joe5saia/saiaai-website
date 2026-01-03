# Saiaai Website

Static marketing site for Saiaai Systems built with Astro and Tailwind CSS.

## Tech Stack

- Astro (static site output)
- Tailwind CSS
- TypeScript
- Vitest

## Getting Started

```bash
npm install
npm run dev
```

## Scripts

```bash
npm run dev      # Local dev server
npm run build    # Production build (outputs to dist/)
npm run preview  # Preview the production build
npm run check    # Astro type-checking
npm run format   # Prettier formatting check
npm run test     # Vitest test suite
```

## Project Structure

- `src/pages/index.astro`: Landing page composition
- `src/components/`: Section components (Hero, About, Services, Stats, Contact)
- `src/layouts/`: Layout wrapper and shared metadata
- `src/lib/reveal.ts`: IntersectionObserver utilities for reveal-on-scroll
- `src/styles/`: Global Tailwind styles
- `tests/`: Vitest unit tests
- `public/`: Static assets

## Reveal-on-Scroll Behavior

Elements marked with `data-reveal` are revealed when they enter the viewport.
See `src/lib/reveal.ts` for the observer logic and `tests/reveal.test.ts` for coverage.
