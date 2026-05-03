import { Suspense } from "react";

import { ProductDetailPageClient } from "@/modules/products/components/product-detail-page-client";
import { ProductDetailLoadingState } from "@/modules/products/components/product-detail-states";

export default function ProductDetailPage() {
  return (
    <Suspense fallback={<ProductDetailLoadingState />}>
      <ProductDetailPageClient />
    </Suspense>
  );
}