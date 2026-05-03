import { Badge, Button, Card, Input } from "@/shared/components/ui";

import type { ProductCategory } from "../types";

type ProductFiltersProps = {
  categories: ProductCategory[];
};

export function ProductFilters({ categories }: ProductFiltersProps) {
  return (
    <aside className="space-y-4">
      <Card variant="subtle">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-lg font-bold text-foreground">
              Filters
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Visual foundation for upcoming filtering.
            </p>
          </div>

          <Badge variant="muted">Soon</Badge>
        </div>

        <div className="mt-6 space-y-5">
          <div>
            <label
              htmlFor="catalog-search-preview"
              className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground"
            >
              Search
            </label>
            <Input
              id="catalog-search-preview"
              className="mt-2"
              placeholder="Search products..."
              disabled
            />
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
              Categories
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {categories.slice(0, 8).map((category) => (
                <Badge key={category.slug} variant="muted">
                  {category.name}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
              Price range
            </p>

            <div className="mt-3 grid grid-cols-2 gap-3">
              <Input placeholder="Min" disabled />
              <Input placeholder="Max" disabled />
            </div>
          </div>

          <Button variant="outline" className="w-full" disabled>
            Apply filters soon
          </Button>
        </div>
      </Card>

      <Card variant="subtle">
        <h2 className="font-display text-lg font-bold text-foreground">
          Catalog status
        </h2>

        <div className="mt-4 space-y-3 text-sm text-muted-foreground">
          <p>Real products: enabled</p>
          <p>Search: next commit</p>
          <p>Filters: upcoming</p>
          <p>Pagination: upcoming</p>
        </div>
      </Card>
    </aside>
  );
}