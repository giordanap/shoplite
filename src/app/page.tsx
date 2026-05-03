import { routes } from "@/core/router/routes";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-aetheric text-foreground">
      <div className="aetheric-grid pointer-events-none absolute inset-0 opacity-40" />

      <section className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col items-start justify-center px-6 py-20">
        <p className="mb-5 rounded-full border border-secondary/30 bg-secondary/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] text-secondary shadow-cyan">
          Aetheric commerce foundation
        </p>

        <h1 className="max-w-4xl font-display text-5xl font-bold tracking-tight text-balance sm:text-6xl lg:text-7xl">
          ShopLite
          <span className="block bg-primary-gradient bg-clip-text text-transparent">
            Premium e-commerce experience.
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
          A modern frontend-only store built with Next.js, Tailwind CSS and
          real product data. This commit introduces the visual foundation:
          design tokens, premium fonts, gradients, surfaces and reusable visual
          utilities.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="#tokens"
            className="rounded-button bg-primary-gradient px-6 py-3 text-sm font800 font-bold text-primary-foreground shadow-aetheric transition hover:scale-[1.02]"
          >
            View design tokens
          </a>

          <a
            href={routes.external.dummyJson}
            target="_blank"
            rel="noreferrer"
            className="rounded-button border border-secondary/40 bg-secondary/10 px-6 py-3 text-sm font-bold text-secondary transition hover:border-secondary hover:bg-secondary/15"
          >
            DummyJSON API
          </a>
        </div>

        <div
          id="tokens"
          className="mt-16 grid w-full gap-4 border-t border-border-subtle pt-8 sm:grid-cols-3"
        >
          <div className="glass-panel rounded-card p-5">
            <h2 className="font-display text-lg font-semibold text-secondary">
              Commit 4
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Aetheric design tokens.
            </p>
          </div>

          <div className="glass-panel rounded-card p-5">
            <h2 className="font-display text-lg font-semibold text-primary">
              Visual system
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Colors, typography, gradients, surfaces, radius and glow shadows.
            </p>
          </div>

          <div className="glass-panel rounded-card p-5">
            <h2 className="font-display text-lg font-semibold text-accent">
              Next step
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Add shared UI primitives using these tokens.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}