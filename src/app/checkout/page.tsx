import { CheckoutPageClient } from "@/modules/checkout/components";
import { ClientAuthGuard, ClientCartGuard } from "@/shared/components/guards";

export default function CheckoutPage() {
  return (
    <ClientAuthGuard>
      <ClientCartGuard>
        <CheckoutPageClient />
      </ClientCartGuard>
    </ClientAuthGuard>
  );
}