import { routes } from "@/core/router/routes";
import { Container, SectionHeader } from "@/shared/components/layout";
import {
  Badge,
  ButtonLink,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui";

const featuredCategories = [
  {
    name: "Smart tech",
    description: "Phones, laptops and everyday devices.",
    icon: "⚡",
    tone: "text-secondary",
  },
  {
    name: "Beauty essentials",
    description: "Personal care products with premium details.",
    icon: "✨",
    tone: "text-accent",
  },
  {
    name: "Home upgrades",
    description: "Functional products for modern spaces.",
    icon: "🏠",
    tone: "text-primary",
  },
];

const benefits = [
  {
    title: "Frontend-only",
    description:
      "Built for static hosting with no backend, no secrets and no payment risk.",
  },
  {
    title: "Real API ready",
    description:
      "Prepared to consume DummyJSON products with a clean frontend architecture.",
  },
  {
    title: "Premium UI system",
    description:
      "Dark aetheric style, reusable components, design tokens and polished layout.",
  },
];

const previewProducts = [
  {
    name: "Aether Phone",
    category: "Smartphones",
    price: "$799",
    badge: "New",
  },
  {
    name: "Glow Serum",
    category: "Beauty",
    price: "$29",
    badge: "-18%",
  },
  {
    name: "Nebula Chair",
    category: "Furniture",
    price: "$249",
    badge: "Hot",
  },
];

export function HomePage() {
  return (
    <div className="relative overflow-hidden bg-aetheric text-foreground">
      <div className="aetheric-grid pointer-events-none absolute inset-0 opacity-40" />

      <HeroSection />
      <CategorySection />
      <ProductPreviewSection />
      <BenefitsSection />
      <NewsletterSection />
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative">
      <Container className="grid min-h-[calc(100vh-5rem)] items-center gap-12 py-20 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <Badge className="mb-5 shadow-cyan">Premium storefront</Badge>

          <SectionHeader
            title={
              <>
                Discover products with a
                <span className="block text-gradient-primary">
                  smarter shopping experience.
                </span>
              </>
            }
            description="ShopLite is a frontend-only e-commerce demo with a premium visual system, reusable UI primitives and a static deployment strategy for GitHub Pages."
          />

          <div className="mt-10 flex flex-wrap gap-4">
            <ButtonLink href={routes.products}>Explore products</ButtonLink>

            <ButtonLink href="#featured" variant="secondary">
              View highlights
            </ButtonLink>
          </div>

          <div className="mt-12 grid max-w-2xl gap-4 sm:grid-cols-3">
            <StatCard value="100%" label="Static deploy" />
            <StatCard value="0" label="Secrets exposed" />
            <StatCard value="API" label="DummyJSON ready" />
          </div>
        </div>

        <div className="relative">
          <div className="absolute -left-8 top-10 size-40 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -right-8 bottom-10 size-48 rounded-full bg-secondary/20 blur-3xl" />

          <Card className="relative overflow-hidden p-6">
            <div className="flex items-center justify-between">
              <Badge variant="primary">Live preview</Badge>
              <span className="text-sm font-bold text-success">In stock</span>
            </div>

            <div className="mt-8 rounded-card border border-border-subtle bg-card-gradient p-6">
              <div className="grid aspect-[4/3] place-items-center rounded-card bg-primary-gradient text-7xl shadow-aetheric">
                🛍️
              </div>

              <div className="mt-6">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-secondary">
                  Featured product
                </p>
                <h2 className="mt-2 font-display text-3xl font-bold">
                  Aetheric Commerce Kit
                </h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  A visual-first commerce interface prepared for products,
                  filters, cart and checkout.
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Starting at</p>
                  <p className="font-display text-3xl font-bold text-foreground">
                    $129
                  </p>
                </div>

                <ButtonLink href={routes.products} size="sm">
                  Explore
                </ButtonLink>
              </div>
            </div>
          </Card>
        </div>
      </Container>
    </section>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-card border border-border-subtle bg-white/[0.04] p-4">
      <p className="font-display text-2xl font-bold text-foreground">{value}</p>
      <p className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </p>
    </div>
  );
}

function CategorySection() {
  return (
    <section id="featured" className="relative border-t border-border-subtle">
      <Container className="py-20">
        <SectionHeader
          eyebrow="Featured categories"
          title="A storefront designed for modern product discovery."
          description="These sections are static for now, but they prepare the visual direction for the upcoming DummyJSON catalog."
        />

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {featuredCategories.map((category) => (
            <Card key={category.name} className="group overflow-hidden">
              <CardHeader>
                <div
                  className={`mb-5 grid size-14 place-items-center rounded-button border border-border-subtle bg-white/[0.05] text-3xl ${category.tone}`}
                >
                  {category.icon}
                </div>
                <CardTitle>{category.name}</CardTitle>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ButtonLink
                  href={routes.products}
                  variant="outline"
                  size="sm"
                  className="group-hover:border-secondary/60"
                >
                  Browse category
                </ButtonLink>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ProductPreviewSection() {
  return (
    <section className="relative border-t border-border-subtle bg-background/55">
      <Container className="py-20">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            eyebrow="Product experience"
            title="Premium product cards before the catalog is connected."
            description="The next catalog steps will replace these showcase cards with real products from DummyJSON."
          />

          <ButtonLink href={routes.products} variant="secondary">
            Catalog coming soon
          </ButtonLink>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {previewProducts.map((product, index) => (
            <Card key={product.name} className="overflow-hidden p-4">
              <div className="grid aspect-[4/3] place-items-center rounded-card border border-border-subtle bg-card-gradient text-6xl">
                {index === 0 ? "📱" : index === 1 ? "💎" : "🪑"}
              </div>

              <div className="mt-5 flex items-start justify-between gap-4">
                <div>
                  <Badge variant={index === 1 ? "accent" : "secondary"}>
                    {product.category}
                  </Badge>
                  <h3 className="mt-4 font-display text-xl font-bold">
                    {product.name}
                  </h3>
                </div>

                <Badge variant="primary">{product.badge}</Badge>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <p className="font-display text-2xl font-bold">
                  {product.price}
                </p>
                <ButtonLink href={routes.products} variant="outline" size="sm">
                  Preview
                </ButtonLink>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}

function BenefitsSection() {
  return (
    <section className="relative border-t border-border-subtle">
      <Container className="py-20">
        <SectionHeader
          eyebrow="Why this project matters"
          title="A portfolio project that shows design, architecture and deployment discipline."
          description="ShopLite is being built step by step, with each commit adding a visible, testable and deployable improvement."
        />

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {benefits.map((benefit) => (
            <Card key={benefit.title} variant="subtle">
              <CardHeader>
                <CardTitle>{benefit.title}</CardTitle>
                <CardDescription>{benefit.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}

function NewsletterSection() {
  return (
    <section className="relative border-t border-border-subtle">
      <Container className="py-20">
        <Card className="overflow-hidden p-8 md:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <Badge variant="accent">Next milestone</Badge>
              <h2 className="mt-5 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Next up: app routes, catalog and real products.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
                The home page is now ready to support a complete commerce flow:
                product listing, product detail, cart, checkout and account.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <ButtonLink href={routes.products}>Explore products</ButtonLink>
              <ButtonLink href={routes.external.dummyJson} variant="outline">
                API docs
              </ButtonLink>
            </div>
          </div>
        </Card>
      </Container>
    </section>
  );
}