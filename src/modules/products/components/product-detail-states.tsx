import { routes } from "@/core/router/routes";
import { EmptyPageState } from "@/shared/components/feedback";
import { Container, SectionHeader } from "@/shared/components/layout";
import { Card, SkeletonBlock } from "@/shared/components/ui";

export function ProductDetailLoadingState() {
  return (
    <div className="relative min-h-[calc(100vh-5rem)] overflow-hidden bg-aetheric">
      <div className="aetheric-grid pointer-events-none absolute inset-0 opacity-30" />

      <Container className="relative py-20">
        <SectionHeader
          eyebrow="Product detail"
          title="Loading product signal."
          description="Fetching real product information from DummyJSON."
        />

        <Card className="mt-10 grid gap-8 p-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)]">
          <SkeletonBlock className="h-[520px]" />

          <div>
            <SkeletonBlock className="h-10 w-40" />
            <SkeletonBlock className="mt-6 h-20" />
            <SkeletonBlock className="mt-6 h-24" />
            <SkeletonBlock className="mt-6 h-12 w-56" />
            <SkeletonBlock className="mt-8 h-32" />
          </div>
        </Card>
      </Container>
    </div>
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