# Modules

The `modules` layer contains business features.

Each feature owns its components, hooks, types, services, mappers or store when needed.

Current planned modules:

- home
- products
- cart
- checkout
- auth
- account

A module can use `core` and `shared`, but `core` should not depend on modules.