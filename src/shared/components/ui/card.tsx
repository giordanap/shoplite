import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/shared/utils";

type CardVariant = "glass" | "solid" | "subtle";

const variantClasses: Record<CardVariant, string> = {
  glass: "glass-panel",
  solid: "border border-border-subtle bg-surface-elevated shadow-aetheric",
  subtle: "border border-border-subtle bg-white/[0.03]",
};

type CardProps = ComponentPropsWithoutRef<"div"> & {
  variant?: CardVariant;
};

export function Card({ className, variant = "glass", ...props }: CardProps) {
  return (
    <div
      className={cn("rounded-card p-5", variantClasses[variant], className)}
      {...props}
    />
  );
}

export function CardHeader({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return <div className={cn("space-y-2", className)} {...props} />;
}

export function CardTitle({
  className,
  ...props
}: ComponentPropsWithoutRef<"h2">) {
  return (
    <h2
      className={cn(
        "font-display text-lg font-semibold tracking-tight text-foreground",
        className,
      )}
      {...props}
    />
  );
}

export function CardDescription({
  className,
  ...props
}: ComponentPropsWithoutRef<"p">) {
  return (
    <p
      className={cn("text-sm leading-6 text-muted-foreground", className)}
      {...props}
    />
  );
}

export function CardContent({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return <div className={cn("mt-4", className)} {...props} />;
}