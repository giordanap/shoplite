import { AccountDashboardPageClient } from "@/modules/account/components";
import { ClientAuthGuard } from "@/shared/components/guards";

export default function AccountPage() {
  return (
    <ClientAuthGuard>
      <AccountDashboardPageClient />
    </ClientAuthGuard>
  );
}