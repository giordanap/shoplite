import { Suspense } from "react";

import { AccountDashboardPageClient } from "@/modules/account/components";
import { ClientAuthGuard } from "@/shared/components/guards";
import { PageLoadingState } from "@/shared/components/feedback";

export default function AccountPage() {
  return (
    <Suspense
      fallback={
        <PageLoadingState
          eyebrow="Account"
          title="Loading account dashboard."
          description="Preparing your local session, cart stats and order history."
          variant="dashboard"
        />
      }
    >
      <ClientAuthGuard>
        <AccountDashboardPageClient />
      </ClientAuthGuard>
    </Suspense>
  );
}