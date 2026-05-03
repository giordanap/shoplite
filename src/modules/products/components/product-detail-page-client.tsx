"use client";

import { useSearchParams } from "next/navigation";

import { useProductDetailQuery } from "../hooks";

import { ProductDetail } from "./product-detail";
import {
  ProductDetailErrorState,
  ProductDetailLoadingState,
  ProductDetailMissingState,
} from "./product-detail-states";

function parseProductId(value: string | null): number | null {
  if (!value) return null;

  const parsedValue = Number(value);

  if (!Number.isInteger(parsedValue) || parsedValue < 1) {
    return null;
  }

  return parsedValue;
}

export function ProductDetailPageClient() {
  const searchParams = useSearchParams();
  const productId = parseProductId(searchParams.get("id"));

  const productQuery = useProductDetailQuery(productId);

  if (!productId) {
    return <ProductDetailMissingState />;
  }

  if (productQuery.isLoading) {
    return <ProductDetailLoadingState />;
  }

  if (productQuery.isError || !productQuery.data) {
    return <ProductDetailErrorState />;
  }

  return <ProductDetail product={productQuery.data} />;
}