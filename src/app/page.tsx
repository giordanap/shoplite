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

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-aetheric text-foreground">
      <div className="aetheric-grid pointer-events-none absolute inset-0 opacity-40" />

      <Container className="relative flex min-h-screen flex-col items-start justify-center py-20">
        <Badge className="mb-5 shadow-cyan">Shared UI primitives</Badge>

        <SectionHeader
          title={
            <>
              ShopLite
              <span className="block bg-primary-gradient bg-clip-text text-transparent">
                Premium e-commerce experience.
              </span>
            </>
          }
          description="A modern frontend-only store built with Next.js, Tailwind CSS and real product data. This commit adds reusable UI primitives for buttons, cards, badges, inputs, icon buttons and skeleton blocks."
        />

        <div className="mt-10 flex flex-wrap gap-4">
          <ButtonLink href="#primitives">View primitives</ButtonLink>

          <ButtonLink
            href={routes.external.dummyJson}
            target="_blank"
            rel="noreferrer"
            variant="secondary"
          >
            DummyJSON API
          </ButtonLink>
        </div>

        <div
          id="primitives"
          className="mt-16 grid w-full gap-4 border-t border-border-subtle pt-8 sm:grid-cols-3"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-secondary">Commit 5</CardTitle>
              <CardDescription>Shared UI primitives.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-6 text-muted-foreground">
                The app now has reusable building blocks for the premium
                commerce interface.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-primary">Reusable UI</CardTitle>
              <CardDescription>
                Buttons, cards, badges, inputs and skeletons.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge variant="primary">Primary</Badge>
                <Badge variant="secondary">Neon</Badge>
                <Badge variant="accent">Accent</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-accent">Next step</CardTitle>
              <CardDescription>
                Add the premium app shell with header and footer.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ButtonLink href={routes.products} variant="outline" size="sm">
                Products route soon
              </ButtonLink>
            </CardContent>
          </Card>
        </div>
      </Container>
    </main>
  );
}