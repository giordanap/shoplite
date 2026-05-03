import { Suspense } from "react";

import { DemoLoginPageClient } from "@/modules/auth/components";
import { ClientGuestGuard } from "@/shared/components/guards";
import { PageLoadingState } from "@/shared/components/feedback";

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <PageLoadingState
          eyebrow="Demo login"
          title="Loading demo login."
          description="Preparing the local authentication experience."
          variant="form"
        />
      }
    >
      <ClientGuestGuard>
        <DemoLoginPageClient />
      </ClientGuestGuard>
    </Suspense>
  );
}