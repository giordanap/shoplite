import { routes } from "@/core/router/routes";
import { EmptyPageState } from "@/shared/components/feedback";

export default function LoginPage() {
  return (
    <EmptyPageState
      eyebrow="Demo login"
      title="Login route is ready."
      description="This page will later connect to DummyJSON demo authentication and store a frontend-only session for portfolio purposes."
      primaryAction={{
        label: "Back to home",
        href: routes.home,
      }}
      secondaryAction={{
        label: "Open account",
        href: routes.account,
      }}
    />
  );
}