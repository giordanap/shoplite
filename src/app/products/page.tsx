import { routes } from "@/core/router/routes";
import { EmptyPageState } from "@/shared/components/feedback";

export default function ProductsPage() {
  return (
    <EmptyPageState
      eyebrow="Products"
      title="Product catalog route is ready."
      description="This page is prepared for the upcoming DummyJSON product catalog with search, filters, sorting, product cards and pagination."
      primaryAction={{
        label: "Back to home",
        href: routes.home,
      }}
      secondaryAction={{
        label: "Product detail placeholder",
        href: routes.productDetail(1),
      }}
    />
  );
}