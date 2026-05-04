# ShopLite Portfolio Case Study

## Project summary

ShopLite is a premium frontend-only e-commerce demo built to showcase modern frontend engineering skills.

The project simulates a complete commerce journey:

```txt
Home
↓
Catalog
↓
Product detail
↓
Cart
↓
Login
↓
Checkout
↓
Local order success
↓
Account dashboard
```

## Why this project exists

The goal was to build a portfolio project that feels closer to a real product than a simple UI demo.

ShopLite focuses on:

* Real API data
* Real catalog behavior
* Real client-side persistence
* Real URL state
* Real responsive layouts
* Real accessibility considerations
* Real documentation

At the same time, it avoids unsafe frontend practices such as exposing private API keys, using real payments or storing sensitive credentials.

## Engineering highlights

### Feature-based architecture

The project separates routes, infrastructure, business modules and shared UI.

```txt
app      -> route composition
core     -> infrastructure
modules  -> business features
shared   -> reusable UI and utilities
```

This keeps the app easier to scale as new commerce features are added.

### API integration

Products come from DummyJSON through a controlled API layer.

The UI does not consume raw API DTOs. Data is mapped into internal models first.

### URL state

Catalog state is synchronized with the URL:

* Search
* Category
* Sorting
* Pagination

This makes the catalog shareable and easier to debug.

### Server state

TanStack Query handles external API state.

The query client is configured to avoid unnecessary refetches in a static portfolio app.

### Client state

Zustand powers:

* Cart
* Wishlist
* Demo auth session

Each store persists only lightweight snapshots in localStorage.

### Local orders

Checkout creates local demo orders in localStorage.

This allows a realistic order confirmation and account order history without a backend.

### Accessibility

The app includes:

* Skip link
* Main landmark
* Keyboard-friendly interactions
* Live regions
* Validation state semantics
* Reduced motion support

### Performance

The app includes:

* Static export
* Bundle analyzer
* Lazy footer
* Memoized derived values
* Preconnect to API origin
* Storybook mocks isolated from runtime code

### Storybook

Storybook documents shared UI and commerce components with visual states.

This helps demonstrate component thinking and design system foundations.

## Trade-offs

### No backend

ShopLite does not include a backend. This keeps the project safe for GitHub Pages and avoids secrets in the frontend.

Trade-off:

* Orders and sessions are local only.
* There is no real authentication.
* There is no real payment processing.

### DummyJSON

DummyJSON is useful for portfolio data, but it is not a real commerce backend.

Trade-off:

* Product data is external and generic.
* Some product images/categories may not perfectly match the premium brand direction.

### Static export

GitHub Pages requires static output.

Trade-off:

* No server actions.
* No protected server routes.
* No runtime secrets.

## What this project demonstrates

ShopLite demonstrates that I can build a polished frontend application with:

* Clean architecture
* Typed data models
* API mapping
* Client persistence
* URL-driven UX
* Reusable components
* Responsive design
* Accessibility awareness
* Performance awareness
* Documentation discipline

## Suggested interview explanation

ShopLite is a frontend-only commerce demo I built for my portfolio. It uses Next.js, TypeScript, Tailwind, TanStack Query, Zustand and Storybook. The catalog consumes real product data from DummyJSON and supports search, filters, sorting and pagination through URL params. The cart, wishlist and demo session are persisted with Zustand and localStorage. Checkout creates a local demo order and redirects to a success page, so the flow feels complete without using real payments or backend secrets. I also added responsive polish, accessibility improvements, performance checks and Storybook stories for the UI system.
