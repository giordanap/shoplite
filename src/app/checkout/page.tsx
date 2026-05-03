import { Suspense } from "react";

import { CheckoutPageClient } from "@/modules/checkout/components";
import { ClientAuthGuard, ClientCartGuard } from "@/shared/components/guards";
import { PageLoadingState } from "@/shared/components/feedback";

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <PageLoadingState
          eyebrow="Checkout"
          title="Loading checkout demo."
          description="Preparing contact fields, delivery options and cart summary."
          variant="form"
        />
      }
    >
      <ClientAuthGuard>
        <ClientCartGuard>
          <CheckoutPageClient />
        </ClientCartGuard>
      </ClientAuthGuard>
    </Suspense>
  );
}