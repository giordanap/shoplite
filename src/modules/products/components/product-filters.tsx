import { Badge, Button, Card } from "@/shared/components/ui";

import type { ProductCategory } from "../types";

type ProductFiltersProps = {
  categories: ProductCategory[];
  selectedCategorySlug: string | null;
  isLoadingCategories?: boolean;
  onCategoryChange: (categorySlug: string | null) => void;
  onClearFilters: () => void;
};

export function ProductFilters({
  categories,
  selectedCategorySlug,
  isLoadingCategories = false,
  onCategoryChange,
  onClearFilters,
}: ProductFiltersProps) {
  const hasCategory = selectedCategorySlug !== null;

  return (
    <aside className="space-y-4">
      <Card variant="subtle">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-lg font-bold text-foreground">
              Filters
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Filter real DummyJSON products by category.
            </p>
          </div>

          <Badge variant={hasCategory ? "primary" : "muted"}>
            {hasCategory ? "Active" : "Ready"}
          </Badge>
        </div>

        <div className="mt-6 space-y-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
              Categories
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {isLoadingCategories ? (
                <Badge variant="muted">Loading categories...</Badge>
              ) : null}

              {!isLoadingCategories && categories.length === 0 ? (
                <Badge variant="muted">No categories</Badge>
              ) : null}

              {categories.map((category) => {
                const isSelected = category.slug === selectedCategorySlug;

                return (
                  <button
                    key={category.slug}
                    type="button"
                    onClick={() =>
                      onCategoryChange(isSelected ? null : category.slug)
                    }
                    className="rounded-full"
                    aria-pressed={isSelected}
                  >
                    <Badge variant={isSelected ? "secondary" : "muted"}>
                      {category.name}
                    </Badge>
                  </button>
                );
              })}
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full"
            disabled={!hasCategory}
            onClick={onClearFilters}
          >
            Clear filters
          </Button>
        </div>
      </Card>

      <Card variant="subtle">
        <h2 className="font-display text-lg font-bold text-foreground">
          Catalog status
        </h2>

        <div className="mt-4 space-y-3 text-sm text-muted-foreground">
          <p>Real products: enabled</p>
          <p>Search: enabled</p>
          <p>Category filters: enabled</p>
          <p>Sorting: upcoming</p>
          <p>Pagination: upcoming</p>
        </div>
      </Card>
    </aside>
  );
}