import Link from "next/link";

import { routes } from "@/core/router/routes";
import { cn } from "@/shared/utils";

type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  return (
    <Link
      href={routes.home}
      className={cn("group inline-flex items-center gap-3", className)}
      aria-label="Go to ShopLite home"
    >
      <span className="grid size-10 place-items-center rounded-button border border-secondary/30 bg-secondary/10 text-sm font-black text-secondary shadow-cyan transition group-hover:border-secondary">
        SL
      </span>

      <span className="flex flex-col leading-none">
        <span className="font-display text-lg font-bold tracking-tight text-foreground">
          ShopLite
        </span>
        <span className="mt-1 text-[0.65rem] font-bold uppercase tracking-[0.24em] text-muted-foreground">
          Aetheric commerce
        </span>
      </span>
    </Link>
  );
}