# ShopLite

ShopLite is a premium frontend-only e-commerce demo built for a developer portfolio.

The project will use:

- Next.js App Router
- TypeScript
- Tailwind CSS
- DummyJSON API
- Zustand
- TanStack Query
- Storybook
- GitHub Pages

## Goal

Build a modern, visually impactful e-commerce experience without backend, API keys, payment processing, or private data.

## Current step

Commit 2: GitHub Pages deployment.

## Deployment

This project is deployed to GitHub Pages under the `/shoplite` subpath.

Production uses:

```txt
NEXT_PUBLIC_BASE_PATH=/shoplite
```

Local development uses an empty base path:

```txt
NEXT_PUBLIC_BASE_PATH=
```

Any local asset inside /public must be referenced using the withBasePath() helper instead of hardcoded root paths like /logo.svg.

Upcoming steps
1. Add frontend architecture folders
2. Add visual design tokens
3. Add premium app shell
4. Connect DummyJSON products
5. Build catalog, cart, checkout and account flows