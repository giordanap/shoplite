import { routes } from "@/core/router/routes";
import { EmptyPageState } from "@/shared/components/feedback";
import { PageLoadingState } from "@/shared/components/feedback";

export function ProductDetailLoadingState() {
  return (
    <PageLoadingState
      eyebrow="Product detail"
      title="Loading product signal."
      description="Fetching product gallery, pricing, stock and review information from DummyJSON."
      variant="detail"
    />
  );
}

export function ProductDetailMissingState() {
  return (
    <EmptyPageState
      eyebrow="Product detail"
      title="Product id is missing."
      description="Open a product from the catalog so the detail page can read the product id from the URL."
      primaryAction={{
        label: "Browse products",
        href: routes.products,
      }}
      secondaryAction={{
        label: "Back to home",
        href: routes.home,
      }}
    />
  );
}

export function ProductDetailErrorState() {
  return (
    <EmptyPageState
      eyebrow="Product detail"
      title="Product could not be loaded."
      description="The product may not exist or DummyJSON may be unavailable. Go back to the catalog and try another item."
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