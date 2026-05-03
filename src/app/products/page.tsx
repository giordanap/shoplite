import { Suspense } from "react";

import {
  ProductCatalogLoadingState,
  ProductsPageClient,
} from "@/modules/products/components";

export default function ProductsPage() {
  return (
    <Suspense fallback={<ProductCatalogLoadingState />}>
      <ProductsPageClient />
    </Suspense>
  );
}