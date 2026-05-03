import { routes } from "@/core/router/routes";
import { EmptyPageState } from "@/shared/components/feedback";

export default function OrderSuccessPage() {
  return (
    <EmptyPageState
      eyebrow="Order success"
      title="Order success route is ready."
      description="This page will later show the simulated order confirmation, local order summary and demo checkout disclaimer."
      primaryAction={{
        label: "Continue shopping",
        href: routes.products,
      }}
      secondaryAction={{
        label: "Back to home",
        href: routes.home,
      }}
    />
  );
}