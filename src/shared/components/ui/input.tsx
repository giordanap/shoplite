import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/shared/utils";

type InputProps = ComponentPropsWithoutRef<"input">;

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-button border border-border-subtle bg-white/[0.04] px-4 text-sm text-foreground",
        "placeholder:text-muted-foreground",
        "transition focus:border-secondary/60 focus:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-ring",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}