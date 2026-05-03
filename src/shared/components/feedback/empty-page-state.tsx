import type { ReactNode } from "react";

import { Container } from "@/shared/components/layout";
import { Badge, ButtonLink, Card } from "@/shared/components/ui";

type EmptyPageAction = {
  label: string;
  href: string;
};

type EmptyPageStateProps = {
  eyebrow: string;
  title: string;
  description: string;
  primaryAction?: EmptyPageAction;
  secondaryAction?: EmptyPageAction;
  children?: ReactNode;
};

export function EmptyPageState({
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
  children,
}: EmptyPageStateProps) {
  return (
    <div className="relative min-h-[calc(100vh-5rem)] overflow-hidden bg-aetheric">
      <div className="aetheric-grid pointer-events-none absolute inset-0 opacity-30" />

      <Container className="relative flex min-h-[calc(100vh-5rem)] items-center py-20">
        <Card className="w-full overflow-hidden p-8 md:p-10">
          <Badge className="mb-6">{eyebrow}</Badge>

          <h1 className="max-w-3xl font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {title}
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground">
            {description}
          </p>

          {children ? <div className="mt-8">{children}</div> : null}

          {(primaryAction || secondaryAction) && (
            <div className="mt-10 flex flex-wrap gap-4">
              {primaryAction ? (
                <ButtonLink href={primaryAction.href}>
                  {primaryAction.label}
                </ButtonLink>
              ) : null}

              {secondaryAction ? (
                <ButtonLink href={secondaryAction.href} variant="outline">
                  {secondaryAction.label}
                </ButtonLink>
              ) : null}
            </div>
          )}
        </Card>
      </Container>
    </div>
  );
}