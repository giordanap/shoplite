import { Suspense } from "react";

import { OrderSuccessPageClient } from "@/modules/orders/components";
import { PageLoadingState } from "@/shared/components/feedback";

export default function OrderSuccessPage() {
  return (
    <Suspense
      fallback={
        <PageLoadingState
          eyebrow="Order success"
          title="Loading order confirmation."
          description="Reading your locally persisted demo order."
          variant="detail"
        />
      }
    >
      <OrderSuccessPageClient />
    </Suspense>
  );
}