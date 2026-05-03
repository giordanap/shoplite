import { routes } from "@/core/router/routes";
import { EmptyPageState } from "@/shared/components/feedback";

export default function CartPage() {
  return (
    <EmptyPageState
      eyebrow="Cart"
      title="Cart route is ready."
      description="This page will later show persistent cart items, quantity controls, remove actions and a premium order summary."
      primaryAction={{
        label: "Explore products",
        href: routes.products,
      }}
      secondaryAction={{
        label: "Back to home",
        href: routes.home,
      }}
    />
  );
}