import { Badge, Input } from "@/shared/components/ui";

type ProductToolbarProps = {
  total: number;
  showing: number;
  page: number;
  totalPages: number;
};

export function ProductToolbar({
  total,
  showing,
  page,
  totalPages,
}: ProductToolbarProps) {
  return (
    <div className="rounded-card border border-border-subtle bg-white/[0.03] p-4">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">Catalog</Badge>
            <Badge variant="muted">
              Showing {showing} of {total}
            </Badge>
            <Badge variant="muted">
              Page {page} of {totalPages}
            </Badge>
          </div>

          <p className="mt-3 text-sm text-muted-foreground">
            Premium catalog layout connected to real DummyJSON products.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_180px] xl:w-[520px]">
          <Input
            placeholder="Search products..."
            aria-label="Search products preview"
            disabled
          />

          <select
            className="h-11 rounded-button border border-border-subtle bg-white/[0.04] px-4 text-sm font-semibold text-muted-foreground outline-none"
            disabled
            aria-label="Sort products preview"
          >
            <option>Recommended</option>
          </select>
        </div>
      </div>
    </div>
  );
}