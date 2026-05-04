# ShopLite Release Notes

## Final portfolio release

ShopLite is now a complete frontend-only commerce portfolio project.

## Included features

- Premium home page
- Product catalog connected to DummyJSON
- Search, category filters, sorting and pagination
- Product detail page
- Zustand cart with persistence
- Wishlist with persistence
- Demo login session
- Client-side route guards
- Demo checkout
- Local order creation
- Order success page
- Account dashboard
- Responsive mobile experience
- Loading skeletons and refined states
- Accessibility pass
- Performance pass
- Storybook foundation
- Commerce component stories
- Final portfolio documentation

## Validation commands

```bash
pnpm lint
pnpm build
pnpm build-storybook
```

Optional:

```bash
pnpm analyze
```

## Production

```txt
https://giordanap.github.io/shoplite
```

## Constraints

ShopLite intentionally does not include:

* Real payments
* Real authentication
* Backend secrets
* Private API keys
* Sensitive user data
* Server-side persistence
