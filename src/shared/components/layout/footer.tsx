import Link from "next/link";

import { footerNavigationGroups } from "@/shared/constants";
import { Logo } from "./logo";

export function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-background">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-12 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <Logo />

          <p className="mt-5 max-w-md text-sm leading-7 text-muted-foreground">
            ShopLite is a premium frontend-only e-commerce demo built to
            showcase modern UI architecture, static deployment, reusable
            components and external API integration.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-primary">
              Next.js
            </span>
            <span className="rounded-full border border-secondary/30 bg-secondary/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-secondary">
              Tailwind
            </span>
            <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-accent">
              DummyJSON
            </span>
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          {footerNavigationGroups.map((group) => (
            <div key={group.title}>
              <h2 className="font-display text-sm font-bold uppercase tracking-[0.2em] text-foreground">
                {group.title}
              </h2>

              <ul className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-muted-foreground transition hover:text-secondary"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition hover:text-secondary"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-border-subtle px-6 py-5">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 ShopLite. Portfolio demo project.</p>
          <p>Static export ready for GitHub Pages.</p>
        </div>
      </div>
    </footer>
  );
}