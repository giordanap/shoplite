import type { ReactNode } from "react";

import { cn } from "@/shared/utils";

type SectionHeaderProps = {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("max-w-3xl", className)}>
      {eyebrow ? (
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-secondary">
          {eyebrow}
        </p>
      ) : null}

      <h1 className="font-display text-4xl font-bold tracking-tight text-balance text-foreground sm:text-5xl lg:text-6xl">
        {title}
      </h1>

      {description ? (
        <p className="mt-5 text-base leading-8 text-muted-foreground sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}