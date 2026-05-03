export const dummyJsonEndpoints = {
  products: {
    list: "/products",
    search: "/products/search",
    detail: (productId: number | string) => `/products/${productId}`,
    categories: "/products/categories",
    categoryList: "/products/category-list",
    byCategory: (categorySlug: string) => `/products/category/${categorySlug}`,
  },

  carts: {
    list: "/carts",
    detail: (cartId: number | string) => `/carts/${cartId}`,
    byUser: (userId: number | string) => `/carts/user/${userId}`,
    add: "/carts/add",
    update: (cartId: number | string) => `/carts/${cartId}`,
    delete: (cartId: number | string) => `/carts/${cartId}`,
  },

  auth: {
    login: "/auth/login",
    me: "/auth/me",
    refresh: "/auth/refresh",
  },
} as const;