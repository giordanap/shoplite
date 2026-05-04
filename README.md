# ShopLite

ShopLite is a premium frontend-only e-commerce portfolio project built with Next.js, TypeScript, Tailwind CSS, TanStack Query, Zustand, Storybook and DummyJSON.

Live demo:

```txt
https://giordanap.github.io/shoplite
```

Repository:

```txt
https://github.com/giordanap/shoplite
```

## Overview

ShopLite demonstrates a complete commerce-style frontend experience without a backend, private API keys, real authentication or real payment processing.

The goal is to show production-minded frontend engineering through:

* Feature-based architecture
* Real API integration
* URL-driven catalog behavior
* Client-side state persistence
* Demo authentication
* Demo checkout and local order creation
* Responsive UI
* Accessibility improvements
* Performance considerations
* Storybook documentation

## Tech stack

* Next.js App Router
* TypeScript
* Tailwind CSS
* TanStack Query
* Zustand
* DummyJSON API
* Storybook
* GitHub Pages
* Static export

## Project direction

ShopLite follows a dark premium visual direction:

* Aetheric commerce
* Digital luxury
* Glass surfaces
* Electric violet accents
* Neon cyan highlights
* Accent pink details
* Glow shadows
* Premium typography
* Subtle microinteractions

## Main features

### Home page

* Premium hero section
* Commerce positioning
* Featured product preview
* Category highlights
* Benefits section
* Portfolio-focused demo messaging

### Product catalog

* Real products from DummyJSON
* URL-driven search
* URL-driven category filtering
* URL-driven sorting
* URL-driven pagination
* Custom premium sort dropdown
* Product cards with price, rating, stock, discount and actions
* Loading, error and empty states

Example URLs:

```txt
/products
/products?q=phone
/products?category=smartphones
/products?page=2
/products?sortBy=price&order=asc
/products?q=phone&page=2
```

### Product detail

* Product detail fetched from DummyJSON
* Product gallery
* Price and discount display
* Rating, stock, category and brand
* Shipping, warranty and return policy
* Reviews section
* Add to cart action
* Wishlist action

Example URL:

```txt
/product?id=1
```

### Cart

* Zustand cart store
* localStorage persistence
* Product snapshots instead of raw API responses
* Add, increase, decrease, remove and clear actions
* Real cart badge in the header
* Premium cart page
* Order summary
* Discount summary
* Frontend-only checkout disclaimer

Cart storage key:

```txt
shoplite-cart-v1
```

### Checkout demo

* Frontend-only checkout flow
* Contact information form
* Delivery address form
* Standard and express delivery options
* Simulated payment section
* Sticky checkout summary
* Local order creation
* No real payment processing

### Local orders

* Orders are created locally in localStorage
* Checkout creates a local order before clearing the cart
* Success page reads the order by `orderId`
* Order confirmation shows customer, items, delivery and totals

Storage keys:

```txt
shoplite-orders-v1
shoplite-latest-order-id-v1
```

Example success URL:

```txt
/order-success?orderId=SL-...
```

### Demo authentication

* Frontend-only demo login
* Zustand auth store
* localStorage persistence
* Account dashboard protected by client-side guards
* No real credentials are sent anywhere

Auth storage key:

```txt
shoplite-auth-v1
```

Demo credentials:

```txt
Email: demo@shoplite.dev
Password: shoplite-demo
```

Any email and a password with at least 4 characters can create a demo session.

### Account dashboard

* Demo profile information
* Session metadata
* Cart stats
* Wishlist stats
* Local order history
* Recent orders
* Cart preview
* Wishlist preview
* Logout action

### Wishlist

* Zustand wishlist store
* localStorage persistence
* Toggle favorites from product cards
* Toggle favorites from product detail
* Wishlist preview in account dashboard
* Remove favorites from account dashboard

Storage key:

```txt
shoplite-favorites-v1
```

### Client-side guards

The app includes frontend-only guards for demo flows:

* `/account` requires a local demo session
* `/checkout` requires a local demo session and cart items
* `/login` redirects authenticated demo users to account
* Login supports safe `next` redirects

Example:

```txt
/checkout
↓
/login?next=%2Fcheckout
↓
/checkout
```

### Responsive experience

The app includes responsive refinements for:

* Mobile header menu
* Product toolbar
* Product cards
* Product detail
* Cart page
* Checkout page
* Account dashboard
* Loading skeletons

Target breakpoints:

```txt
Mobile: 360px+
Large phone: 420px+
Tablet: 640px+
Desktop: 1024px+
Wide desktop: 1440px+
```

### Accessibility pass

Accessibility improvements include:

* Skip link to main content
* Main landmark with `id="main-content"`
* Screen-reader utility styles
* Better icon button labels
* Cart badge semantics
* Polite live regions for add-to-cart and wishlist feedback
* Keyboard behavior for custom sort dropdown
* `aria-invalid` for login validation
* `aria-busy` for loading states
* Reduced motion support

### Performance pass

Performance improvements include:

* Static export for GitHub Pages
* Optional bundle analyzer
* Reduced TanStack Query refetches
* Lazy-loaded footer
* Shared `Intl` formatters outside render
* Memoized derived totals and summaries
* Preconnect and DNS prefetch for DummyJSON
* Runtime app code separated from Storybook mocks

### Storybook

Storybook documents shared UI and commerce components.

Commands:

```bash
pnpm storybook
pnpm build-storybook
```

Story coverage:

* Button
* Badge
* Card
* PageLoadingState
* AddToCartButton
* FavoriteToggleButton
* ProductCard
* ProductDetail

Storybook includes:

* Dark premium background
* Global ShopLite styles
* Commerce state fixtures
* Product mocks
* Design system notes

## Architecture

ShopLite follows a feature-based frontend architecture.

```txt
src/
  app/
    Next.js routes, layouts and providers

  core/
    API clients, HTTP helpers, errors, query config, router helpers,
    pagination utilities and infrastructure code

  modules/
    Business features such as home, products, cart, checkout,
    auth, account, orders and favorites

  shared/
    Reusable UI, layout components, feedback states, guards,
    constants, Storybook helpers and utilities
```

Main rules:

1. Pages compose feature modules.
2. Feature modules own business UI and hooks.
3. Core owns infrastructure.
4. Shared owns reusable UI and utilities.
5. UI consumes internal models, not raw API DTOs.

## Important implementation patterns

### Zustand derived state

Avoid Zustand selectors that return new objects on every render.

Do this:

```ts
const items = useCartStore((state) => state.items);
const totals = useMemo(() => getCartTotals(items), [items]);
```

Avoid this:

```ts
const totals = useCartStore(selectCartTotals);
```

The second version can trigger:

```txt
The result of getSnapshot should be cached to avoid an infinite loop
```

### LocalStorage snapshots

Local order state uses primitive snapshots with `useSyncExternalStore` to avoid unstable render snapshots.

### GitHub Pages base path

Production runs under:

```txt
/shoplite
```

Production uses:

```txt
NEXT_PUBLIC_BASE_PATH=/shoplite
```

Local development uses an empty base path:

```txt
NEXT_PUBLIC_BASE_PATH=
```

Internal links and public assets must respect the base path helper when needed.

## Routes

```txt
/
/products
/product?id=1
/cart
/checkout
/login
/account
/order-success?orderId=SL-...
```

## Local development

Install dependencies:

```bash
pnpm install
```

Run development server:

```bash
pnpm dev
```

Run lint:

```bash
pnpm lint
```

Run production build:

```bash
pnpm build
```

Run Storybook:

```bash
pnpm storybook
```

Build Storybook:

```bash
pnpm build-storybook
```

Analyze bundle:

```bash
pnpm analyze
```

## Validation checklist

Before opening a PR:

```bash
pnpm lint
pnpm build
pnpm build-storybook
git status
git diff --stat
```

Manual routes to verify:

```txt
http://localhost:3000/
http://localhost:3000/products
http://localhost:3000/product?id=1
http://localhost:3000/cart
http://localhost:3000/checkout
http://localhost:3000/login
http://localhost:3000/account
http://localhost:3000/order-success
```

Manual flow:

1. Search products.
2. Filter by category.
3. Sort products.
4. Paginate catalog.
5. Open product detail.
6. Add product to cart.
7. Save product to wishlist.
8. Open cart and edit quantities.
9. Login with demo account.
10. Complete checkout demo.
11. Confirm order success page.
12. Open account dashboard.
13. Verify order history, cart preview and wishlist preview.

## Deployment

The app is deployed to GitHub Pages with static export.

Production URL:

```txt
https://giordanap.github.io/shoplite
```

Required production environment variable:

```txt
NEXT_PUBLIC_BASE_PATH=/shoplite
```

After merging to `main`, verify:

```txt
https://giordanap.github.io/shoplite
https://giordanap.github.io/shoplite/products
https://giordanap.github.io/shoplite/product?id=1
https://giordanap.github.io/shoplite/cart
https://giordanap.github.io/shoplite/login
```

## Portfolio notes

This project is designed to demonstrate:

* Frontend architecture
* UI composition
* API integration
* Server-state management
* Client-state persistence
* URL state management
* Static deployment constraints
* Accessibility awareness
* Performance awareness
* Storybook documentation
* Commerce flow thinking

It intentionally avoids:

* Real payments
* Real authentication
* Backend secrets
* Private API keys
* Sensitive user data
* Server-side order persistence

## Final status

ShopLite is a complete frontend-only portfolio commerce demo. It includes catalog, product detail, cart, checkout, local order confirmation, demo login, account dashboard, wishlist, client-side guards, responsive UI, accessibility pass, performance pass and Storybook documentation.
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

## Account dashboard page

The account route now renders a frontend-only customer dashboard.

Account dashboard behavior:

  * Reads the local demo auth session from Zustand
  * Redirects unauthenticated users to the demo login flow
  * Shows demo profile information and session metadata
  * Shows persistent cart stats using `getCartTotals(items)` with `useMemo`
  * Shows recent local orders from localStorage
  * Links to local order confirmations
  * Shows a cart preview
  * Supports logout and redirects back to `/login`

Important Zustand pattern:

    const cartItems = useCartStore((state) => state.items);
    const cartTotals = useMemo(() => getCartTotals(cartItems), [cartItems]);

Do not use a Zustand selector that returns a new object for totals.

## Client-side guards

The app now includes frontend-only route guards for the demo commerce flow.

Guard behavior:

  * `/account` requires a local demo auth session
  * `/checkout` requires a local demo auth session and at least one cart item
  * `/login` redirects authenticated demo users to the account dashboard
  * Protected routes wait for Zustand persistence hydration before deciding
  * Checkout redirects unauthenticated users to `/login?next=/checkout`
  * Login redirects back to the safe `next` path after demo sign-in

Guard files:

    src/shared/components/guards/client-route-guards.tsx

Important Zustand rule:

  * Guard selectors only read primitive values or stable references
  * Cart totals are still computed with `getCartTotals(items)` + `useMemo`
  * Avoid selectors that return new objects on every render

## Favorites wishlist state

The app now includes a persistent wishlist powered by Zustand.

Wishlist behavior:

  * Persists favorite products under `shoplite-favorites-v1`
  * Stores lightweight product snapshots instead of full API responses
  * Allows toggling favorites from product cards
  * Allows toggling favorites from product detail
  * Shows wishlist count and saved products in the account dashboard
  * Allows removing favorites from the account dashboard

Wishlist files:

    src/modules/favorites/store/favorites.store.ts
    src/modules/favorites/types/favorites.types.ts
    src/modules/favorites/components/favorite-toggle-button.tsx

Zustand rule:

  * Select primitive values or stable references
  * Avoid selectors that create new objects or arrays on every render

## Loading skeletons and refined states

The app now includes a reusable premium loading state for route-level and feature-level loading experiences.

Refined state behavior:

  * Adds `PageLoadingState` as a shared loading skeleton component
  * Supports catalog, detail, dashboard, form and default skeleton variants
  * Reuses the loading state in product catalog and product detail
  * Adds Suspense fallbacks for login, account, checkout and order success
  * Reuses refined loading visuals in client-side guards
  * Adds subtle glow decoration to empty states

State components:

    src/shared/components/feedback/page-loading-state.tsx
    src/shared/components/feedback/empty-page-state.tsx

Important UX rule:

  * Loading states should preserve the expected page shape so transitions feel stable.

## Responsive mobile experience

The app now includes a more polished mobile experience across the main commerce flow.

Responsive behavior added:

  * Header uses a real mobile menu instead of a passive horizontal nav
  * Container spacing is tighter on small screens
  * Product toolbar stacks search, clear and sorting controls better
  * Product cards avoid cramped two-column buttons on very small devices
  * Product detail reduces hero height and title size on mobile
  * Cart quantity controls become easier to tap on mobile
  * Checkout spacing and delivery cards are refined for small screens
  * Account dashboard stats use 2 columns on tablet and 4 columns on desktop
  * Loading skeleton spacing is refined for mobile layouts

Responsive targets:

  * Mobile: 360px+
  * Small mobile / large phone: 420px+
  * Tablet: 640px+
  * Desktop: 1024px+

## Storybook foundation

The project now includes a Storybook foundation for the ShopLite design system.

Storybook behavior:

  * Adds Storybook for Next.js
  * Imports the global ShopLite Tailwind and design tokens
  * Adds dark premium background configuration
  * Adds initial stories for Button, Badge, Card and PageLoadingState
  * Adds initial MDX documentation for the visual system

Commands:

    pnpm storybook
    pnpm build-storybook

Storybook files:

    .storybook/main.ts
    .storybook/preview.tsx
    src/shared/components/ui/button.stories.tsx
    src/shared/components/ui/badge.stories.tsx
    src/shared/components/ui/card.stories.tsx
    src/shared/components/feedback/page-loading-state.stories.tsx
    src/shared/docs/shoplite-design-system.mdx

## Storybook commerce stories

The project now includes Storybook stories for reusable commerce components.

Commerce stories added:

  * AddToCartButton
  * FavoriteToggleButton
  * ProductCard
  * ProductDetail

Story states covered:

  * Default product
  * Product already in cart
  * Favorite product
  * Low stock product
  * Out of stock product
  * Compact action buttons

Testing utilities:

    src/modules/products/testing/product.mocks.ts
    src/shared/storybook/commerce-store-fixtures.tsx

The Storybook fixtures seed Zustand cart and wishlist state per story without relying on backend data.

## Visual polish and microinteractions

The app now includes subtle visual polish across shared UI and commerce components.

Polish added:

  * Global microinteraction utilities
  * Button press feedback
  * Product card lift and premium glow
  * Skeleton shimmer loading effect
  * Add to cart temporary success feedback
  * Favorite heart visual transition
  * Selected favorite glow state
  * Reduced motion support

Files touched:

    src/app/globals.css
    src/shared/components/ui/button.tsx
    src/shared/components/ui/card.tsx
    src/shared/components/ui/skeleton-block.tsx
    src/modules/products/components/product-card.tsx
    src/modules/cart/components/add-to-cart-button.tsx
    src/modules/favorites/components/favorite-toggle-button.tsx

## Accessibility pass

The app now includes a first accessibility pass across layout, commerce actions and interactive states.

Accessibility improvements:

  * Adds a skip link to main content
  * Adds `id="main-content"` to the main landmark
  * Adds screen-reader utility styles
  * Improves mobile navigation aria controls
  * Improves cart badge semantics
  * Adds polite live feedback for add-to-cart and wishlist actions
  * Adds better keyboard behavior to the custom sort dropdown
  * Adds article semantics to product cards
  * Adds `aria-invalid` to login validation fields
  * Adds `aria-busy` to route-level loading states
  * Documents accessibility rules in Storybook docs

Accessibility focus areas:

  * Keyboard navigation
  * Screen reader labels
  * Dynamic action feedback
  * Loading and route landmarks
  * Reduced-motion compatibility

## Performance pass

The app now includes a first performance pass for the frontend-only commerce flow.

Performance improvements:

  * Adds optional Next.js bundle analyzer
  * Adds `pnpm analyze` for local bundle inspection
  * Reduces unnecessary TanStack Query refetches
  * Lazy-loads the footer outside the critical path
  * Keeps expensive `Intl` formatters outside render
  * Memoizes account order summaries
  * Keeps cart totals derived with `getCartTotals(items)` + `useMemo`
  * Adds preconnect and dns-prefetch for DummyJSON
  * Documents that Storybook mocks must not be imported by runtime app code

Commands:

    pnpm analyze
    pnpm build
    pnpm build-storybook

## Upcoming steps

1. Add final portfolio README documentation
2. Prepare deploy verification checklist