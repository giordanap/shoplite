import { routes } from "@/core/router/routes";
import { EmptyPageState } from "@/shared/components/feedback";

export default function AccountPage() {
  return (
    <EmptyPageState
      eyebrow="Account"
      title="Account dashboard route is ready."
      description="This page will later show demo profile data, local orders, favorites, cart stats and logout actions."
      primaryAction={{
        label: "Demo login",
        href: routes.login,
      }}
      secondaryAction={{
        label: "Back to home",
        href: routes.home,
      }}
    />
  );
}