"use client";

import Link from "next/link";
import { useState } from "react";

import { routes } from "@/core/router/routes";
import { CartLink } from "@/modules/cart/components";
import { Badge, ButtonLink, IconButton } from "@/shared/components/ui";
import { mainNavigationItems } from "@/shared/constants";

import { Logo } from "./logo";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  function closeMobileMenu() {
    setIsMobileMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border-subtle bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:h-20 sm:px-6">
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
            aria-label={isMobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
          >
            <span aria-hidden="true">{isMobileMenuOpen ? "✕" : "☰"}</span>
          </IconButton>
        </div>
      </div>

      {isMobileMenuOpen ? (
        <div className="border-t border-border-subtle bg-background/95 px-4 py-4 shadow-aetheric backdrop-blur-xl md:hidden">
          <nav className="mx-auto grid max-w-6xl gap-2" aria-label="Mobile navigation">
            {mainNavigationItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={closeMobileMenu}
                className="flex items-center justify-between rounded-card border border-border-subtle bg-white/[0.03] px-4 py-3 text-sm font-bold text-foreground transition hover:border-secondary/40 hover:bg-secondary/10"
              >
                <span>{item.label}</span>
                <span className="text-secondary" aria-hidden="true">
                  →
                </span>
              </Link>
            ))}

            <div className="mt-2 grid grid-cols-2 gap-2">
              <ButtonLink
                href={routes.products}
                variant="secondary"
                size="sm"
                className="w-full"
                onClick={closeMobileMenu}
              >
                Explore
              </ButtonLink>

              <ButtonLink
                href={routes.account}
                variant="outline"
                size="sm"
                className="w-full"
                onClick={closeMobileMenu}
              >
                Account
              </ButtonLink>
            </div>
          </nav>
        </div>
      ) : null}

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