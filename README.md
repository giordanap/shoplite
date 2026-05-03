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

Commit 3: frontend architecture folders.

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

Any local asset inside `/public` must be referenced using the `withBasePath()` helper instead of hardcoded root paths like `/logo.svg`.

## Architecture

The project follows a feature-based frontend architecture.


```txt
src/
  app/
    Next.js routes and layouts

  core/
    Framework-agnostic infrastructure:
    API clients, HTTP helpers, query config, storage, router helpers,
    pagination utilities and shared error types.

  modules/
    Business features:
    home, products, cart, checkout, auth and account.

  shared/
    Reusable UI, layout components, feedback states, hooks, constants and utilities.
```

The main principle is:
1. Pages compose features.
2. Features own their business UI and hooks.
3. Core owns infrastructure.
4. Shared owns reusable UI and utilities.

## Upcoming steps
1. Add visual design tokens
2. Add shared UI primitives
3. Add premium app shell
4. Build premium home page
5. Add core app routes
6. Connect DummyJSON products
7. Build catalog, cart, checkout and account flows