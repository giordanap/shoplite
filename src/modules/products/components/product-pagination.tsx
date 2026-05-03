import type { PaginationMeta } from "@/core/pagination";
import { Button, Card } from "@/shared/components/ui";

type ProductPaginationProps = {
  pagination: PaginationMeta;
};

export function ProductPagination({ pagination }: ProductPaginationProps) {
  return (
    <Card variant="subtle" className="mt-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="font-display text-lg font-bold text-foreground">
            Pagination preview
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Page {pagination.page} of {pagination.totalPages}. Full pagination
            behavior will be added after search and filters.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>

          <span className="grid size-9 place-items-center rounded-button border border-secondary/30 bg-secondary/10 text-sm font-bold text-secondary">
            {pagination.page}
          </span>

          <Button variant="outline" size="sm" disabled>
            Next
          </Button>
        </div>
      </div>
    </Card>
  );
}