"use client";

import { useEffect, useRef } from "react";

import { Badge, Button, Input } from "@/shared/components/ui";

import type { ProductSortField, ProductSortOrder } from "../types";

type SortOptionValue = `${ProductSortField}:${ProductSortOrder}`;

const sortOptions: Array<{
  label: string;
  value: SortOptionValue;
}> = [
  {
    label: "Recommended",
    value: "title:asc",
  },
  {
    label: "Name Z-A",
    value: "title:desc",
  },
  {
    label: "Price low to high",
    value: "price:asc",
  },
  {
    label: "Price high to low",
    value: "price:desc",
  },
  {
    label: "Rating high to low",
    value: "rating:desc",
  },
  {
    label: "Rating low to high",
    value: "rating:asc",
  },
];

type ProductToolbarProps = {
  total: number;
  showing: number;
  page: number;
  totalPages: number;
  search: string;
  selectedCategoryName: string | null;
  sortBy: ProductSortField;
  order: ProductSortOrder;
  onSearchChange: (value: string) => void;
  onClearSearch: () => void;
  onSortChange: (sortBy: ProductSortField, order: ProductSortOrder) => void;
};

export function ProductToolbar({
  total,
  showing,
  page,
  totalPages,
  search,
  selectedCategoryName,
  sortBy,
  order,
  onSearchChange,
  onClearSearch,
  onSortChange,
}: ProductToolbarProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceTimeoutRef = useRef<number | null>(null);
  const hasSearch = search.trim().length > 0;
  const selectedSortValue: SortOptionValue = `${sortBy}:${order}`;

  function handleSearchChange(value: string) {
    if (debounceTimeoutRef.current) {
      window.clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = window.setTimeout(() => {
      onSearchChange(value);
    }, 450);
  }

  function handleClearSearch() {
    if (debounceTimeoutRef.current) {
      window.clearTimeout(debounceTimeoutRef.current);
    }

    if (inputRef.current) {
      inputRef.current.value = "";
    }

    onClearSearch();
  }

  function handleSortChange(value: SortOptionValue) {
    const [nextSortBy, nextOrder] = value.split(":") as [
      ProductSortField,
      ProductSortOrder,
    ];

    onSortChange(nextSortBy, nextOrder);
  }

  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        window.clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

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

            {hasSearch ? <Badge variant="primary">Search: {search}</Badge> : null}

            {selectedCategoryName ? (
              <Badge variant="accent">Category: {selectedCategoryName}</Badge>
            ) : null}
          </div>

          <p className="mt-3 text-sm text-muted-foreground">
            Search, category, sorting and pagination are synchronized with the URL.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto_220px] xl:w-[700px]">
          <Input
            ref={inputRef}
            key={search}
            defaultValue={search}
            onChange={(event) => handleSearchChange(event.target.value)}
            placeholder="Search products..."
            aria-label="Search products"
          />

          <Button
            variant="outline"
            size="md"
            disabled={!hasSearch}
            onClick={handleClearSearch}
          >
            Clear
          </Button>

          <select
            value={selectedSortValue}
            onChange={(event) =>
              handleSortChange(event.target.value as SortOptionValue)
            }
            className="h-11 rounded-button border border-border-subtle bg-white/[0.04] px-4 text-sm font-semibold text-foreground outline-none transition duration-200 hover:border-border-strong focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
            aria-label="Sort products"
          >
            {sortOptions.map((option) => (
              <option
                key={option.value}
                value={option.value}
                className="bg-white text-slate-950"
              >
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}