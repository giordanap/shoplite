import { routes } from "@/core/router/routes";
import { Container, SectionHeader } from "@/shared/components/layout";
import {
  Badge,
  ButtonLink,
  Card,
  SkeletonBlock,
} from "@/shared/components/ui";

export function ProductCatalogLoadingState() {
  return (
    <div className="relative min-h-[calc(100vh-5rem)] overflow-hidden bg-aetheric">
      <div className="aetheric-grid pointer-events-none absolute inset-0 opacity-30" />

      <Container className="relative py-20">
        <SectionHeader
          eyebrow="Products"
          title="Loading premium catalog."
          description="Fetching real product data from DummyJSON."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          <SkeletonBlock className="hidden h-[560px] lg:block" />

          <div>
            <SkeletonBlock className="h-28" />

            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 9 }).map((_, index) => (
                <SkeletonBlock key={index} className="h-[430px]" />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export function ProductCatalogErrorState() {
  return (
    <div className="relative min-h-[calc(100vh-5rem)] overflow-hidden bg-aetheric">
      <div className="aetheric-grid pointer-events-none absolute inset-0 opacity-30" />

      <Container className="relative flex min-h-[calc(100vh-5rem)] items-center py-20">
        <Card className="w-full p-8 md:p-10">
          <Badge variant="danger">API error</Badge>

          <h1 className="mt-6 font-display text-4xl font-bold tracking-tight text-foreground">
            Products could not be loaded.
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground">
            DummyJSON may be unavailable or the network request failed. Try
            refreshing the page.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <ButtonLink href={routes.products}>Retry route</ButtonLink>
            <ButtonLink href={routes.home} variant="outline">
              Back to home
            </ButtonLink>
          </div>
        </Card>
      </Container>
    </div>
  );
}

export function ProductCatalogEmptyState() {
  return (
    <div className="relative min-h-[calc(100vh-5rem)] overflow-hidden bg-aetheric">
      <div className="aetheric-grid pointer-events-none absolute inset-0 opacity-30" />

      <Container className="relative flex min-h-[calc(100vh-5rem)] items-center py-20">
        <Card className="w-full p-8 md:p-10">
          <Badge variant="muted">Empty catalog</Badge>

          <h1 className="mt-6 font-display text-4xl font-bold tracking-tight text-foreground">
            No products were found.
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground">
            The current search returned no products. Try another keyword or
            clear the search query from the URL.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <ButtonLink href={routes.products}>Clear search</ButtonLink>
            <ButtonLink href={routes.home} variant="outline">
              Back to home
            </ButtonLink>
          </div>
        </Card>
      </Container>
    </div>
  );
}