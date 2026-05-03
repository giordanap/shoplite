"use client";

import Link from "next/link";

import { routes } from "@/core/router/routes";

import { selectCartItemCount, useCartStore } from "../store";

function formatCartCount(count: number): string {
  if (count > 99) return "99+";

  return String(count);
}

export function CartLink() {
  const itemCount = useCartStore(selectCartItemCount);

  return (
    <Link
      href={routes.cart}
      className="relative inline-flex size-10 items-center justify-center rounded-button border border-border-subtle bg-white/[0.03] text-foreground transition hover:border-border-strong hover:bg-white/[0.06]"
      aria-label={`Open cart with ${itemCount} items`}
    >
      <span aria-hidden="true">🛒</span>

      <span className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-primary text-[0.65rem] font-black text-primary-foreground">
        {formatCartCount(itemCount)}
      </span>
    </Link>
  );
}