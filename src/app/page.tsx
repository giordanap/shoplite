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
    <div className="relative overflow-hidden bg-aetheric text-foreground">
      <div className="aetheric-grid pointer-events-none absolute inset-0 opacity-40" />

      <Container className="relative flex min-h-[calc(100vh-5rem)] flex-col items-start justify-center py-20">
        <Badge className="mb-5 shadow-cyan">Premium app shell</Badge>

        <SectionHeader
          title={
            <>
              ShopLite
              <span className="block bg-primary-gradient bg-clip-text text-transparent">
                A complete commerce shell.
              </span>
            </>
          }
          description="A modern frontend-only store built with Next.js, Tailwind CSS and real product data. This commit adds the global navigation, sticky header, cart/account actions and footer."
        />

        <div className="mt-10 flex flex-wrap gap-4">
          <ButtonLink href={routes.products}>Explore products</ButtonLink>

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
          id="shell"
          className="mt-16 grid w-full gap-4 border-t border-border-subtle pt-8 sm:grid-cols-3"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-secondary">Commit 6</CardTitle>
              <CardDescription>App shell navigation.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-6 text-muted-foreground">
                The app now has a reusable global shell with header, navigation,
                cart placeholder, account action and footer.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-primary">Global layout</CardTitle>
              <CardDescription>
                Header and footer wrap all future routes.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge variant="primary">Sticky header</Badge>
                <Badge variant="secondary">Footer</Badge>
                <Badge variant="accent">Navigation</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-accent">Next step</CardTitle>
              <CardDescription>
                Build the premium home page from the Stitch direction.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ButtonLink href="#shell" variant="outline" size="sm">
                View shell
              </ButtonLink>
            </CardContent>
          </Card>
        </div>
      </Container>
    </div>
  );
}