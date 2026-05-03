import { DemoLoginPageClient } from "@/modules/auth/components";
import { ClientGuestGuard } from "@/shared/components/guards";

export default function LoginPage() {
  return (
    <ClientGuestGuard>
      <DemoLoginPageClient />
    </ClientGuestGuard>
  );
}