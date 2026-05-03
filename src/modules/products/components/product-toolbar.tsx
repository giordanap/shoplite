"use client";

import { useEffect, useRef } from "react";

import { Badge, Button, Input } from "@/shared/components/ui";

type ProductToolbarProps = {
  total: number;
  showing: number;
  page: number;
  totalPages: number;
  search: string;
  selectedCategoryName: string | null;
  onSearchChange: (value: string) => void;
  onClearSearch: () => void;
};

export function ProductToolbar({
  total,
  showing,
  page,
  totalPages,
  search,
  selectedCategoryName,
  onSearchChange,
  onClearSearch,
}: ProductToolbarProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceTimeoutRef = useRef<number | null>(null);
  const hasSearch = search.trim().length > 0;

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
            Search and category filters are synchronized with the URL.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto_180px] xl:w-[640px]">
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