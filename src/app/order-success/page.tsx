import { Suspense } from "react";

import { OrderSuccessPageClient } from "@/modules/orders/components";

export default function OrderSuccessPage() {
  return (
    <Suspense>
      <OrderSuccessPageClient />
    </Suspense>
  );
}