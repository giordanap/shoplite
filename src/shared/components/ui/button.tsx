import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/shared/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "danger";
type ButtonSize = "sm" | "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-primary-gradient text-primary-foreground shadow-aetheric hover:scale-[1.02]",
  secondary:
    "border border-secondary/40 bg-secondary/10 text-secondary hover:border-secondary hover:bg-secondary/15",
  ghost: "text-muted-foreground hover:bg-white/5 hover:text-foreground",
  outline:
    "border border-border-subtle bg-white/[0.03] text-foreground hover:border-border-strong hover:bg-white/[0.06]",
  danger:
    "border border-danger/40 bg-danger/10 text-danger hover:border-danger hover:bg-danger/15",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-xs",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-sm",
};

export function buttonVariants({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-button font-bold transition duration-200",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );
}

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonVariants({ variant, size, className })}
      {...props}
    />
  );
}

type ButtonLinkProps = ComponentPropsWithoutRef<"a"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function ButtonLink({
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonLinkProps) {
  return (
    <a className={buttonVariants({ variant, size, className })} {...props} />
  );
}