import { routes } from "@/core/router/routes";
import { EmptyPageState } from "@/shared/components/feedback";

export default function CheckoutPage() {
  return (
    <EmptyPageState
      eyebrow="Checkout"
      title="Checkout route is ready."
      description="This page will later include contact information, shipping details, a simulated payment section and an order summary. No real payment will be processed."
      primaryAction={{
        label: "Back to cart",
        href: routes.cart,
      }}
      secondaryAction={{
        label: "Back to home",
        href: routes.home,
      }}
    />
  );
}