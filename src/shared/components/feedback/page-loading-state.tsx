import { Container, SectionHeader } from "@/shared/components/layout";
import { Badge, Card, SkeletonBlock } from "@/shared/components/ui";

type PageLoadingStateProps = {
  eyebrow: string;
  title: string;
  description: string;
  variant?: "dashboard" | "catalog" | "detail" | "form" | "default";
};

function DefaultSkeleton() {
  return (
    <Card className="mt-10 p-6">
      <SkeletonBlock className="h-8 w-40" />
      <SkeletonBlock className="mt-6 h-24" />
      <SkeletonBlock className="mt-4 h-24" />
    </Card>
  );
}

function DashboardSkeleton() {
  return (
    <div className="mt-8 grid gap-6 lg:mt-10 lg:grid-cols-[360px_minmax(0,1fr)]">
      <Card className="p-6">
        <SkeletonBlock className="size-16 rounded-full" />
        <SkeletonBlock className="mt-6 h-8 w-48" />
        <SkeletonBlock className="mt-4 h-5 w-64" />
        <SkeletonBlock className="mt-8 h-36" />
      </Card>

      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <SkeletonBlock key={index} className="h-36" />
          ))}
        </div>

        <SkeletonBlock className="h-80" />
        <SkeletonBlock className="h-72" />
      </div>
    </div>
  );
}

function CatalogSkeleton() {
  return (
    <div className="mt-10 grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
      <SkeletonBlock className="hidden h-[560px] lg:block" />

      <div>
        <SkeletonBlock className="h-32" />

        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 9 }).map((_, index) => (
            <SkeletonBlock key={index} className="h-[430px]" />
          ))}
        </div>
      </div>
    </div>
  );
}

function DetailSkeleton() {
  return (
    <div className="mt-8 grid gap-8 lg:mt-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)]">
      <div>
        <SkeletonBlock className="h-[520px]" />

        <div className="mt-4 grid grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <SkeletonBlock key={index} className="aspect-square" />
          ))}
        </div>
      </div>

      <Card className="p-6">
        <SkeletonBlock className="h-7 w-32" />
        <SkeletonBlock className="mt-6 h-16" />
        <SkeletonBlock className="mt-6 h-28" />
        <SkeletonBlock className="mt-8 h-14 w-52" />
        <SkeletonBlock className="mt-8 h-32" />
      </Card>
    </div>
  );
}

function FormSkeleton() {
  return (
    <div className="mt-8 grid gap-6 lg:mt-10 lg:grid-cols-[minmax(0,1fr)_390px]">
      <div className="space-y-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <Card key={index} className="p-6">
            <SkeletonBlock className="h-7 w-32" />
            <SkeletonBlock className="mt-6 h-12" />
            <SkeletonBlock className="mt-4 h-12" />
          </Card>
        ))}
      </div>

      <SkeletonBlock className="h-[520px]" />
    </div>
  );
}

function renderSkeleton(variant: PageLoadingStateProps["variant"]) {
  if (variant === "dashboard") return <DashboardSkeleton />;
  if (variant === "catalog") return <CatalogSkeleton />;
  if (variant === "detail") return <DetailSkeleton />;
  if (variant === "form") return <FormSkeleton />;

  return <DefaultSkeleton />;
}

export function PageLoadingState({
  eyebrow,
  title,
  description,
  variant = "default",
}: PageLoadingStateProps) {
  return (
    <div className="relative min-h-[calc(100vh-5rem)] overflow-hidden bg-aetheric">
      <div className="aetheric-grid pointer-events-none absolute inset-0 opacity-30" />

      <Container className="relative py-20">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            eyebrow={eyebrow}
            title={title}
            description={description}
          />

          <Badge variant="primary">Loading</Badge>
        </div>

        {renderSkeleton(variant)}
      </Container>
    </div>
  );
}