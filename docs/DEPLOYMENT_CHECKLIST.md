# ShopLite Deployment Checklist

## Local validation

Run:

```bash
pnpm lint
pnpm build
pnpm build-storybook
```

Optional:

```bash
pnpm analyze
```

## Git status

Check:

```bash
git status
git diff --stat
```

## Local routes

Verify:

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

## Core flow

1. Open home.
2. Open products.
3. Search a product.
4. Filter by category.
5. Sort by price.
6. Paginate.
7. Open product detail.
8. Add product to cart.
9. Add product to favorites.
10. Open cart.
11. Edit quantity.
12. Login with demo account.
13. Continue checkout.
14. Complete demo order.
15. Confirm order success.
16. Open account.
17. Confirm order history.
18. Confirm wishlist preview.
19. Logout.

## Responsive checks

Test widths:

```txt
360px
390px
430px
768px
1024px
1440px
```

## Accessibility checks

1. Press Tab at page start.
2. Confirm skip link appears.
3. Navigate header with keyboard.
4. Open mobile menu with keyboard.
5. Open sort dropdown with keyboard.
6. Close sort dropdown with Escape.
7. Trigger add to cart.
8. Trigger wishlist toggle.
9. Submit login with invalid fields.
10. Confirm focus states are visible.

## GitHub Pages checks

Production URL:

```txt
https://giordanap.github.io/shoplite
```

Verify:

```txt
https://giordanap.github.io/shoplite
https://giordanap.github.io/shoplite/products
https://giordanap.github.io/shoplite/product?id=1
https://giordanap.github.io/shoplite/cart
https://giordanap.github.io/shoplite/login
https://giordanap.github.io/shoplite/account
```

## Base path rule

Production uses:

```txt
NEXT_PUBLIC_BASE_PATH=/shoplite
```

Avoid hardcoded public asset paths like:

```txt
/logo.svg
```

Use the base path helper when needed.

## Final PR checklist

* Lint passed
* Build passed
* Storybook build passed
* No generated analyzer files committed
* README updated
* Portfolio case study updated
* Deployment checklist updated
* GitHub Pages deploy verified

## Final release validation

Before merging the final release PR:

- Confirm `pnpm lint` passes
- Confirm `pnpm build` passes
- Confirm `pnpm build-storybook` passes
- Confirm no generated analyzer files are staged
- Confirm `.env.example` exists
- Confirm README points to the live GitHub Pages URL
- Confirm case study is updated
- Confirm release notes are updated
- Confirm GitHub Actions deploy succeeds after merge

## Post-merge verification

After merging to `main`, verify:

```txt
https://giordanap.github.io/shoplite
https://giordanap.github.io/shoplite/products
https://giordanap.github.io/shoplite/product?id=1
https://giordanap.github.io/shoplite/cart
https://giordanap.github.io/shoplite/login
https://giordanap.github.io/shoplite/account
```
