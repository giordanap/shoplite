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

Commit 23: demo login page.

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

## TanStack Query setup

TanStack Query is now configured as the server-state layer for the app.

Current query setup:

- `QueryClientProvider`
- App-level providers wrapper
- Query client factory
- Default query options
- Query key registry
- Product query keys
- Auth query keys

Files live in:

```txt
src/app/providers.tsx
src/core/query
```

TanStack Query will be used for external API data such as products, product details, categories and demo auth.

## Products list connected to DummyJSON

The products route now fetches real products from DummyJSON.

Current product data flow:

```txt
/products
  ↓
ProductsPageClient
  ↓
useProductsQuery
  ↓
productsService
  ↓
dummyJsonClient
  ↓
DummyJSON /products
  ↓
Product mappers
  ↓
Internal Product model
```

Current behavior:

- Fetch products from DummyJSON
- Map external DTOs into internal product models
- Render a simple product grid
- Show loading skeletons
- Show API error state
- Display basic pagination metadata
- Link product cards to the product detail placeholder

## Premium product catalog layout

The products page now renders a Stitch-inspired premium catalog layout.

Current catalog pieces:

- Premium catalog header
- Sidebar filter foundation
- Mobile filter section foundation
- Toolbar with search and sort preview
- Product count badges
- Premium product cards
- Product image area
- Category badges
- Discount badges
- Stock badges
- Rating display
- Price and discounted price display
- Pagination preview
- Loading, error and empty catalog states

Files live in:

```txt
src/modules/products/components
```

Search, URL params, functional filters and real pagination controls will be added in the next commits.

## Product search and URL params

The products catalog now supports search through the URL.

Current search behavior:

- Reads the `q` query param from `/products`
- Writes search changes back to the URL
- Debounces search input before updating the route
- Calls DummyJSON `/products/search?q=...`
- Resets the catalog page to `1` when search changes
- Shows the current search term as an active catalog badge
- Shows an empty state when search returns no results

Example URLs:

```txt
/products?q=phone
/products?q=beauty
/products?q=laptop
```

Search files live in:

```txt
src/modules/products/hooks/use-product-search-params.ts
src/shared/hooks/use-debounce.ts
src/modules/products/components/product-toolbar.tsx
```

## Categories and filters

The products catalog now supports real category filters from DummyJSON.

Current category behavior:

- Fetch categories from DummyJSON
- Render category filter chips
- Store selected category in the URL
- Use `/products/category/{slug}` when a category is selected
- Clear search when a category is selected
- Clear category when search is used
- Show active category in the catalog toolbar

Example URLs:

```txt
/products?category=smartphones
/products?category=beauty
/products?category=furniture
```

Category files live in:

```txt
src/modules/products/hooks/use-product-categories-query.ts
src/modules/products/components/product-filters.tsx
src/modules/products/services/products.service.ts
```

## Sorting and pagination behavior

The product catalog now supports URL-driven sorting and pagination.

Supported query params:

    /products?page=2
    /products?sortBy=price&order=asc
    /products?sortBy=price&order=desc
    /products?q=phone&page=2
    /products?category=smartphones&page=2

The UI keeps search, category, sort and page state synchronized with the URL.

## Product detail page

The product detail route now reads the product id from the URL:

    /product?id=1

Current product detail behavior:

  * Reads the `id` query param from `/product`
  * Fetches real product detail data from DummyJSON
  * Renders product gallery, category, brand, rating, stock and price
  * Shows discount, shipping, warranty and return policy information
  * Shows a small reviews section when review data is available
  * Handles missing id, loading and API error states

Product detail files live in:

    src/app/product/page.tsx
    src/modules/products/components/product-detail-page-client.tsx
    src/modules/products/components/product-detail.tsx
    src/modules/products/components/product-detail-states.tsx

## Persistent cart store

The cart now uses Zustand with localStorage persistence.

Cart behavior added in Commit 18:

  * Adds Zustand as the client-side cart state manager
  * Persists cart items under `shoplite-cart-v1`
  * Stores lightweight product snapshots instead of raw API responses
  * Supports add, increase, decrease, update quantity, remove and clear actions
  * Updates the header cart badge from real cart state
  * Enables Add to cart from the product detail page

The cart store lives in:

    src/modules/cart/store/cart.store.ts

The cart types live in:

    src/modules/cart/types/cart.types.ts

## Cart actions

The cart is now connected across the catalog, product detail and cart page.

Current cart behavior:

  * Add products from product cards
  * Add products from product detail
  * Persist cart state with Zustand
  * Show real cart quantity in the header
  * Increase, decrease and remove items from the cart page
  * Clear the full cart
  * Display cart totals and discount summary

## Custom sort dropdown

The catalog no longer uses the native browser select for sorting. It now uses a custom dark premium dropdown so the options match the ShopLite visual system.

## Stitch-inspired cart page

The cart page now has a polished premium commerce layout inspired by the ShopLite visual direction.

Cart page behavior:

  * Shows persisted Zustand cart items
  * Displays product image, category, availability, price and item total
  * Supports increase, decrease, remove and clear cart actions
  * Shows a sticky order summary on desktop
  * Displays subtotal, discount, estimated total and demo checkout note
  * Includes portfolio-friendly trust/status cards
  * Keeps the frontend-only commerce constraint visible

The cart page lives in:

    src/app/cart/page.tsx
    src/modules/cart/components/cart-page-client.tsx

## Checkout demo page

The checkout route now renders a simulated frontend-only checkout experience.

Checkout behavior:

  * Reads persisted cart items from Zustand
  * Computes totals with `getCartTotals(items)` and `useMemo`
  * Shows contact information fields
  * Shows delivery address fields
  * Provides standard and express delivery options
  * Displays a simulated payment section with no real card data
  * Shows a sticky checkout summary on desktop
  * Clears the cart after placing a demo order
  * Redirects to `/order-success`

Important Zustand pattern:

    const items = useCartStore((state) => state.items);
    const totals = useMemo(() => getCartTotals(items), [items]);

Avoid using selectors that return a new object on every render, such as:

    useCartStore(selectCartTotals)

because that can trigger the React warning:

    The result of getSnapshot should be cached to avoid an infinite loop

## Local order creation

The checkout demo now creates a local order before clearing the cart.

Local order behavior:

  * Creates a demo order in localStorage under `shoplite-orders-v1`
  * Stores the latest order id under `shoplite-latest-order-id-v1`
  * Captures customer, delivery, payment, items and totals
  * Clears the Zustand cart after order creation
  * Redirects to `/order-success?orderId=<id>`

The local order service lives in:

    src/modules/orders/services/local-orders.service.ts

## Order success page

The order success route now renders a real local confirmation page.

Order success behavior:

  * Reads `orderId` from the URL
  * Reads persisted local orders from localStorage
  * Shows order status, customer data, delivery method and item summary
  * Shows subtotal, discount, delivery fee and final total
  * Explains that this is a frontend-only demo order
  * Uses `useSyncExternalStore` with a primitive localStorage snapshot to avoid the React getSnapshot warning

## Demo login page

The login route now renders a frontend-only demo authentication flow.

Demo login behavior:

  * Creates a local demo session with Zustand persistence
  * Stores the session under `shoplite-auth-v1`
  * Accepts any email and a demo password with at least 4 characters
  * Redirects to `/account` after successful login
  * Explains that no backend, real credentials or auth provider are used

Lint fix included in this commit:

  * Replaced `window.location.href = ...` in checkout with `router.push(...)`
  * This fixes the `react-hooks/immutability` lint error from the local order creation flow

## Upcoming steps

1. Build account demo page
2. Add order history view