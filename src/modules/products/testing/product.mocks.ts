import type { Product } from "../types";

export const mockPremiumProduct: Product = {
  id: 1,
  name: "Aether Wireless Headphones",
  description:
    "Immersive wireless headphones with adaptive noise cancellation, spatial sound and a refined premium finish.",
  category: {
    slug: "audio",
    name: "Audio",
  },
  price: 249,
  discountPercent: 18,
  discountedPrice: 204.18,
  rating: 4.8,
  stock: 18,
  availabilityStatus: "in-stock",
  brandName: "Aether Labs",
  sku: "AETH-HD-001",
  tags: ["wireless", "premium", "audio"],
  thumbnail: {
    url: "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp",
    alt: "Aether Wireless Headphones",
  },
  images: [
    {
      url: "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp",
      alt: "Aether Wireless Headphones front view",
    },
    {
      url: "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/2.webp",
      alt: "Aether Wireless Headphones side view",
    },
    {
      url: "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/3.webp",
      alt: "Aether Wireless Headphones detail view",
    },
  ],
  reviews: [
    {
      rating: 5,
      comment: "Premium look and very clean sound profile.",
      date: "2026-01-10T10:00:00.000Z",
      reviewerName: "Mia Stone",
    },
    {
      rating: 4,
      comment: "Great battery life and comfortable for long sessions.",
      date: "2026-01-14T15:30:00.000Z",
      reviewerName: "Leo Chen",
    },
    {
      rating: 5,
      comment: "Feels like a luxury product without being too loud.",
      date: "2026-01-20T08:15:00.000Z",
      reviewerName: "Nora Vega",
    },
  ],
  warrantyInformation: "1 year limited warranty",
  shippingInformation: "Ships in 2 to 4 business days",
  returnPolicy: "30-day return policy",
  minimumOrderQuantity: 1,
};

export const mockLowStockProduct: Product = {
  ...mockPremiumProduct,
  id: 2,
  name: "Nova Smart Watch",
  category: {
    slug: "wearables",
    name: "Wearables",
  },
  price: 399,
  discountPercent: 10,
  discountedPrice: 359.1,
  rating: 4.5,
  stock: 2,
  availabilityStatus: "low-stock",
  brandName: "Nova",
  sku: "NOVA-WATCH-002",
  thumbnail: {
    url: "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpods-max-silver/thumbnail.webp",
    alt: "Nova Smart Watch",
  },
  images: [
    {
      url: "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpods-max-silver/1.webp",
      alt: "Nova Smart Watch front view",
    },
    {
      url: "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpods-max-silver/2.webp",
      alt: "Nova Smart Watch detail view",
    },
  ],
};

export const mockOutOfStockProduct: Product = {
  ...mockPremiumProduct,
  id: 3,
  name: "Lumina Desk Lamp",
  category: {
    slug: "home",
    name: "Home",
  },
  price: 149,
  discountPercent: 0,
  discountedPrice: 149,
  rating: 4.2,
  stock: 0,
  availabilityStatus: "out-of-stock",
  brandName: "Lumina",
  sku: "LUM-LAMP-003",
  thumbnail: {
    url: "https://cdn.dummyjson.com/product-images/home-decoration/decoration-swing/thumbnail.webp",
    alt: "Lumina Desk Lamp",
  },
  images: [
    {
      url: "https://cdn.dummyjson.com/product-images/home-decoration/decoration-swing/1.webp",
      alt: "Lumina Desk Lamp product view",
    },
  ],
};

export const mockProducts = [
  mockPremiumProduct,
  mockLowStockProduct,
  mockOutOfStockProduct,
];