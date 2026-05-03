import { routes } from "@/core/router/routes";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#080d1d] text-white">
      <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col items-start justify-center px-6 py-20">
        <p className="mb-4 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">
          Frontend-only commerce demo
        </p>

        <h1 className="max-w-3xl text-5xl font-bold tracking-tight sm:text-6xl">
          ShopLite
          <span className="block bg-gradient-to-r from-violet-300 via-cyan-300 to-violet-400 bg-clip-text text-transparent">
            Premium e-commerce experience.
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
          A modern frontend-only store built with Next.js, Tailwind CSS and
          real product data. This commit adds the frontend architecture folders
          that will support products, cart, checkout, auth and account flows.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="#next"
            className="rounded-xl bg-violet-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-violet-300"
          >
            View architecture
          </a>

          <a
            href={routes.external.dummyJson}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border border-cyan-300/40 px-6 py-3 text-sm font-semibold text-cyan-200 transition hover:border-cyan-200 hover:bg-cyan-300/10"
          >
            DummyJSON API
          </a>
        </div>

        <div
          id="next"
          className="mt-16 grid w-full gap-4 border-t border-white/10 pt-8 sm:grid-cols-3"
        >
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <h2 className="font-semibold text-cyan-200">Commit 3</h2>
            <p className="mt-2 text-sm text-slate-400">
              Frontend architecture folders.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <h2 className="font-semibold text-violet-200">Structure</h2>
            <p className="mt-2 text-sm text-slate-400">
              Core, modules and shared layers are now defined.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <h2 className="font-semibold text-cyan-200">Next step</h2>
            <p className="mt-2 text-sm text-slate-400">
              Add visual design tokens inspired by the premium Stitch UI.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}