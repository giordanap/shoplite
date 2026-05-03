import Link from "next/link";

import { Badge, ButtonLink, IconButton } from "@/shared/components/ui";
import { CartLink } from "@/modules/cart/components";
import { Logo } from "./logo";
import { mainNavigationItems } from "@/shared/constants";
import { routes } from "@/core/router/routes";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border-subtle bg-background/75 backdrop-blur-xl">
      <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-6">
        <Logo />

        <nav
          className="hidden items-center gap-1 rounded-full border border-border-subtle bg-white/[0.03] p-1 md:flex"
          aria-label="Main navigation"
        >
          {mainNavigationItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-semibold text-muted-foreground transition hover:bg-white/[0.06] hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink
            href={routes.products}
            variant="secondary"
            size="sm"
            className="hidden sm:inline-flex"
          >
            Explore
          </ButtonLink>

          <CartLink />

          <Link
            href={routes.account}
            className="hidden size-10 items-center justify-center rounded-button border border-border-subtle bg-white/[0.03] text-foreground transition hover:border-border-strong hover:bg-white/[0.06] sm:inline-flex"
            aria-label="Open account"
          >
            <span aria-hidden="true">👤</span>
          </Link>

          <IconButton
            className="md:hidden"
            variant="outline"
            aria-label="Open mobile menu"
          >
            <span aria-hidden="true">☰</span>
          </IconButton>
        </div>
      </div>

      <div className="border-t border-border-subtle px-6 py-3 md:hidden">
        <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto">
          {mainNavigationItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="shrink-0 rounded-full border border-border-subtle bg-white/[0.03] px-3 py-2 text-xs font-bold text-muted-foreground"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="hidden border-t border-border-subtle px-6 py-2 lg:block">
        <div className="mx-auto flex max-w-6xl items-center justify-between text-xs text-muted-foreground">
          <p>Frontend-only portfolio commerce demo.</p>
          <Badge variant="muted" className="tracking-[0.14em]">
            No backend · No payments · No secrets
          </Badge>
        </div>
      </div>
    </header>
  );
}