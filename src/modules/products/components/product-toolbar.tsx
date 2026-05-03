"use client";

import { useEffect, useId, useRef, useState } from "react";

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

function getSortOptionLabel(value: SortOptionValue): string {
  return (
    sortOptions.find((option) => option.value === value)?.label ?? "Recommended"
  );
}

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
  const sortMenuId = useId();
  const sortMenuRef = useRef<HTMLDivElement>(null);
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);

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

  useEffect(() => {
    function handleDocumentClick(event: MouseEvent) {
      if (!sortMenuRef.current?.contains(event.target as Node)) {
        setIsSortMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleDocumentClick);

    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
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
            Search, category, sorting and pagination are synchronized with the
            URL.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] lg:grid-cols-[minmax(0,1fr)_auto_220px] xl:w-[700px]">
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

          <div ref={sortMenuRef} className="relative sm:col-span-2 lg:col-span-1">
            <button
              type="button"
              className="flex h-11 w-full items-center justify-between gap-3 rounded-button border border-border-subtle bg-white/[0.04] px-4 text-left text-sm font-bold text-foreground shadow-[0_0_24px_rgba(0,229,255,0.08)] outline-none transition duration-200 hover:border-secondary/50 hover:bg-secondary/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
              aria-haspopup="listbox"
              aria-expanded={isSortMenuOpen}
              aria-controls={sortMenuId}
              aria-label="Sort products"
              onClick={() => setIsSortMenuOpen((isOpen) => !isOpen)}
              onKeyDown={(event) => {
                if (event.key === "Escape") {
                  setIsSortMenuOpen(false);
                }
              }}
            >
              <span>{getSortOptionLabel(selectedSortValue)}</span>

              <span
                aria-hidden="true"
                className={`text-secondary transition duration-200 ${
                  isSortMenuOpen ? "rotate-180" : ""
                }`}
              >
                ⌄
              </span>
            </button>

            {isSortMenuOpen ? (
              <div
                id={sortMenuId}
                role="listbox"
                className="absolute right-0 z-40 mt-2 w-full overflow-hidden rounded-card border border-border-subtle bg-surface-elevated/95 p-1 shadow-aetheric backdrop-blur-xl"
              >
                {sortOptions.map((option) => {
                  const isSelected = option.value === selectedSortValue;

                  return (
                    <button
                      key={option.value}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      className={`flex w-full items-center justify-between rounded-button px-3 py-2.5 text-left text-sm font-semibold transition duration-200 ${
                        isSelected
                          ? "bg-secondary/15 text-secondary"
                          : "text-muted-foreground hover:bg-white/[0.06] hover:text-foreground"
                      }`}
                      onClick={() => {
                        handleSortChange(option.value);
                        setIsSortMenuOpen(false);
                      }}
                    >
                      <span>{option.label}</span>

                      {isSelected ? (
                        <span className="text-xs font-black text-secondary">
                          ✓
                        </span>
                      ) : null}
                    </button>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}