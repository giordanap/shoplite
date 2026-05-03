export const routes = {
  home: "/",
  products: "/products",
  cart: "/cart",
  checkout: "/checkout",
  login: "/login",
  account: "/account",
  orderSuccess: "/order-success",

  productDetail: (productId: number | string) => `/product?id=${productId}`,

  external: {
    dummyJson: "https://dummyjson.com",
  },
} as const;