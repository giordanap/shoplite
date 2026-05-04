import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/shared/utils";

type SkeletonBlockProps = ComponentPropsWithoutRef<"div">;

export function SkeletonBlock({ className, ...props }: SkeletonBlockProps) {
  return (
    <div
      className={cn(
        "skeleton-shimmer animate-pulse rounded-card border border-border-subtle bg-white/[0.06]",
        className,
      )}
      aria-hidden="true"
      {...props}
    />
  );
}