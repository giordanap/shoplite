import type { PaginationMeta } from "@/core/pagination";
import { Button, Card } from "@/shared/components/ui";

const MAX_VISIBLE_PAGES = 5;

type ProductPaginationProps = {
  pagination: PaginationMeta;
  onPageChange: (page: number) => void;
};

function getVisiblePages(currentPage: number, totalPages: number): number[] {
  const visibleCount = Math.min(MAX_VISIBLE_PAGES, totalPages);
  const offset = Math.floor(visibleCount / 2);

  let startPage = Math.max(currentPage - offset, 1);
  const endPage = Math.min(startPage + visibleCount - 1, totalPages);

  startPage = Math.max(endPage - visibleCount + 1, 1);

  return Array.from(
    {
      length: endPage - startPage + 1,
    },
    (_, index) => startPage + index,
  );
}

export function ProductPagination({
  pagination,
  onPageChange,
}: ProductPaginationProps) {
  const visiblePages = getVisiblePages(pagination.page, pagination.totalPages);

  return (
    <Card variant="subtle" className="mt-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="font-display text-lg font-bold text-foreground">
            Catalog pagination
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Page {pagination.page} of {pagination.totalPages}. Showing up to{" "}
            {pagination.limit} products per page.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={!pagination.hasPreviousPage}
            onClick={() => onPageChange(pagination.page - 1)}
          >
            Previous
          </Button>

          {visiblePages.map((page) => {
            const isActive = page === pagination.page;

            return (
              <Button
                key={page}
                variant={isActive ? "secondary" : "outline"}
                size="sm"
                aria-current={isActive ? "page" : undefined}
                onClick={() => onPageChange(page)}
              >
                {page}
              </Button>
            );
          })}

          <Button
            variant="outline"
            size="sm"
            disabled={!pagination.hasNextPage}
            onClick={() => onPageChange(pagination.page + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </Card>
  );
}