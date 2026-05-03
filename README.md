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

Commit 10: product DTOs, models and mappers.

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

The main principles are:

1. Pages compose features.
2. Features own their business UI and hooks.
3. Core owns infrastructure.
4. Shared owns reusable UI and utilities.

## Visual foundation

The visual foundation is inspired by the Stitch premium UI direction:

- Dark aetheric background
- Electric violet primary accent
- Neon cyan secondary accent
- Glass-like surfaces
- Gradient highlights
- Glow shadows
- Premium display typography
- Reusable CSS tokens

Design tokens live in:

```txt
src/app/globals.css
src/shared/constants/design-tokens.ts
```

## Shared UI primitives

Reusable UI primitives live in:

```txt
src/shared/components/ui
src/shared/components/layout
src/shared/utils
```

Current primitives:

- Button
- ButtonLink
- Card
- Badge
- Input
- IconButton
- SkeletonBlock
- Container
- SectionHeader

## App shell

The app shell defines the global structure used by all pages.

Current shell pieces:

- Sticky header
- Logo
- Main navigation
- Cart placeholder action
- Account placeholder action
- Mobile navigation row
- Footer navigation groups
- Portfolio/demo badges

Shell files live in:

```txt
src/shared/components/layout
src/shared/constants/navigation.ts
```

## Premium home page

The home page now follows the premium Stitch-inspired direction with:

- Hero section
- Featured product preview
- Category cards
- Product preview cards
- Benefits section
- Newsletter/next milestone section
- Internal links prepared for GitHub Pages subpath deployment

Home page files live in:

```txt
src/app/page.tsx
src/modules/home/components/home-page.tsx
```

## Core routes

The main application routes now exist as static pages:

```txt
/products
/product?id=1
/cart
/checkout
/login
/account
/order-success
```

## DummyJSON API client foundation

The API foundation prepares the app to consume DummyJSON through a controlled internal client.

Current API foundation:

- `fetchClient` wrapper
- Query string builder
- HTTP error normalization
- Network error normalization
- Timeout handling
- DummyJSON base client
- DummyJSON endpoint registry

Files live in:

```txt
src/core/http
src/core/errors
src/core/api/dummyjson
```

## Product models and mappers

The products module now separates external API DTOs from internal app models.

Current product modeling pieces:

- DummyJSON product DTOs
- Internal `Product` domain model
- Product category model
- Product filters model
- Product availability status
- Product image model
- Product review model
- Pagination model
- DummyJSON product mapper
- DummyJSON products response mapper

Files live in:

```txt
src/core/pagination
src/modules/products/types
src/modules/products/mappers
```

The UI should consume internal product models, not raw DummyJSON responses.

## Upcoming steps

1. Set up TanStack Query
2. Fetch products from DummyJSON
3. Build premium product catalog layout
4. Build cart, checkout and account flows