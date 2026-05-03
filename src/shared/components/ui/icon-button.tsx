import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/shared/utils";

type IconButtonVariant = "ghost" | "outline" | "danger";

const variantClasses: Record<IconButtonVariant, string> = {
  ghost: "text-muted-foreground hover:bg-white/5 hover:text-foreground",
  outline:
    "border border-border-subtle bg-white/[0.03] text-foreground hover:border-border-strong hover:bg-white/[0.06]",
  danger:
    "border border-danger/30 bg-danger/10 text-danger hover:border-danger hover:bg-danger/15",
};

type IconButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: IconButtonVariant;
};

export function IconButton({
  className,
  variant = "ghost",
  type = "button",
  ...props
}: IconButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex size-10 items-center justify-center rounded-button transition",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  );
}