import {
  buildPaginationMeta,
  type PaginatedResult,
} from "@/core/pagination";

import type {
  DummyJsonProductCategoryDto,
  DummyJsonProductDto,
  DummyJsonProductsResponseDto,
  Product,
  ProductAvailabilityStatus,
  ProductCategory,
  ProductImage,
  ProductReview,
} from "../types";

function roundMoney(value: number): number {
  return Math.round(value * 100) / 100;
}

function calculateDiscountedPrice(
  price: number,
  discountPercent: number,
): number {
  const discountAmount = price * (discountPercent / 100);

  return roundMoney(price - discountAmount);
}

function normalizeCategorySlug(category: string): string {
  return category.trim().toLowerCase().replace(/\s+/g, "-");
}

function formatCategoryName(category: string): string {
  return category
    .replace(/-/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function mapAvailabilityStatus(stock: number): ProductAvailabilityStatus {
  if (stock <= 0) return "out-of-stock";
  if (stock <= 10) return "low-stock";

  return "in-stock";
}

function mapProductImage({
  url,
  productName,
  index,
}: {
  url: string;
  productName: string;
  index: number;
}): ProductImage {
  return {
    url,
    alt: `${productName} image ${index + 1}`,
  };
}

function mapProductReview(review: {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
}): ProductReview {
  return {
    rating: review.rating,
    comment: review.comment,
    date: review.date,
    reviewerName: review.reviewerName,
  };
}

export function mapDummyJsonCategorySlugToProductCategory(
  categorySlug: string,
): ProductCategory {
  const slug = normalizeCategorySlug(categorySlug);

  return {
    slug,
    name: formatCategoryName(slug),
  };
}

export function mapDummyJsonCategoryDtoToProductCategory(
  category: DummyJsonProductCategoryDto,
): ProductCategory {
  return {
    slug: category.slug,
    name: category.name,
  };
}

export function mapDummyJsonProductDtoToProduct(
  product: DummyJsonProductDto,
): Product {
  const category = mapDummyJsonCategorySlugToProductCategory(product.category);
  const imageUrls =
    product.images.length > 0 ? product.images : [product.thumbnail];

  return {
    id: product.id,
    name: product.title,
    description: product.description,
    category,
    price: roundMoney(product.price),
    discountPercent: roundMoney(product.discountPercentage),
    discountedPrice: calculateDiscountedPrice(
      product.price,
      product.discountPercentage,
    ),
    rating: product.rating,
    stock: product.stock,
    availabilityStatus: mapAvailabilityStatus(product.stock),
    brandName: product.brand ?? null,
    sku: product.sku ?? null,
    tags: product.tags ?? [],
    thumbnail: {
      url: product.thumbnail,
      alt: `${product.title} thumbnail`,
    },
    images: imageUrls.map((url, index) =>
      mapProductImage({
        url,
        productName: product.title,
        index,
      }),
    ),
    reviews: product.reviews?.map(mapProductReview) ?? [],
    warrantyInformation: product.warrantyInformation ?? null,
    shippingInformation: product.shippingInformation ?? null,
    returnPolicy: product.returnPolicy ?? null,
    minimumOrderQuantity: product.minimumOrderQuantity ?? null,
  };
}

export function mapDummyJsonProductsResponseDtoToPaginatedProducts(
  response: DummyJsonProductsResponseDto,
): PaginatedResult<Product> {
  return {
    items: response.products.map(mapDummyJsonProductDtoToProduct),
    pagination: buildPaginationMeta({
      total: response.total,
      limit: response.limit,
      skip: response.skip,
    }),
  };
}