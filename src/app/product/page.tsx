import { routes } from "@/core/router/routes";
import { EmptyPageState } from "@/shared/components/feedback";

export default function ProductDetailPage() {
  return (
    <EmptyPageState
      eyebrow="Product detail"
      title="Product detail route is ready."
      description="This page will later read the product id from the URL and render a premium product detail experience with gallery, price, rating, stock and add-to-cart actions."
      primaryAction={{
        label: "Back to products",
        href: routes.products,
      }}
      secondaryAction={{
        label: "Back to home",
        href: routes.home,
      }}
    />
  );
}