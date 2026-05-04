"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { routes } from "@/core/router";
import { EmptyPageState } from "@/shared/components/feedback";
import { Container, SectionHeader } from "@/shared/components/layout";
import { Badge, Button, ButtonLink, Card, Input } from "@/shared/components/ui";

import { useAuthStore } from "../store";

type LoginFormState = {
  email: string;
  password: string;
};

const initialFormState: LoginFormState = {
  email: "demo@shoplite.dev",
  password: "shoplite-demo",
};

function formatSessionDate(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Active now";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function getSafeLoginRedirectPath(): string {
  if (typeof window === "undefined") {
    return routes.account;
  }

  const nextPath = new URLSearchParams(window.location.search).get("next");

  if (!nextPath || !nextPath.startsWith("/") || nextPath.startsWith("//")) {
    return routes.account;
  }

  return nextPath;
}

export function DemoLoginPageClient() {
  const router = useRouter();
  const session = useAuthStore((state) => state.session);
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);

  const [formState, setFormState] = useState<LoginFormState>(initialFormState);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const canSubmit = useMemo(() => {
    return (
      formState.email.trim().length > 0 &&
      formState.password.trim().length >= 4
    );
  }, [formState.email, formState.password]);

  function updateFormField<Key extends keyof LoginFormState>(
    key: Key,
    value: LoginFormState[Key],
  ) {
    setFormState((currentState) => ({
      ...currentState,
      [key]: value,
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setHasSubmitted(true);

    if (!canSubmit) return;

    login({
      email: formState.email,
      password: formState.password,
    });

    router.push(getSafeLoginRedirectPath());
  }

  if (session) {
    return (
        <EmptyPageState
        eyebrow="Demo login"
        title="You are already signed in."
        description={`Active demo session for ${session.user.email}. Created ${formatSessionDate(session.createdAt)}. This session is persisted locally and does not use a backend.`}
        primaryAction={{
            label: "Open account",
            href: routes.account,
        }}
        secondaryAction={{
            label: "Explore products",
            href: routes.products,
        }}
        />
    );
  }

  return (
    <div className="relative min-h-[calc(100vh-5rem)] overflow-hidden bg-aetheric">
      <div className="aetheric-grid pointer-events-none absolute inset-0 opacity-30" />

      <Container className="relative py-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(360px,0.75fr)] lg:items-start">
          <div>
            <SectionHeader
              eyebrow="Demo login"
              title="Sign in to a frontend-only account."
              description="This login page simulates an authenticated commerce experience using localStorage. No credentials are sent to a backend."
            />

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <Card variant="subtle">
                <Badge variant="secondary">01</Badge>

                <h2 className="mt-4 font-display text-lg font-bold text-foreground">
                  Local session
                </h2>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  The session is stored locally with Zustand persistence.
                </p>
              </Card>

              <Card variant="subtle">
                <Badge variant="secondary">02</Badge>

                <h2 className="mt-4 font-display text-lg font-bold text-foreground">
                  Demo identity
                </h2>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Any email and a short password can create a demo profile.
                </p>
              </Card>

              <Card variant="subtle">
                <Badge variant="secondary">03</Badge>

                <h2 className="mt-4 font-display text-lg font-bold text-foreground">
                  No secrets
                </h2>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  No real auth provider, API key or password storage is used.
                </p>
              </Card>
            </div>
          </div>

          <Card className="overflow-hidden p-0">
            <div className="relative overflow-hidden border-b border-border-subtle bg-card-gradient p-6">
              <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-secondary/20 blur-3xl" />
              <div className="absolute bottom-0 left-0 h-24 w-24 rounded-full bg-primary/20 blur-3xl" />

              <div className="relative">
                <Badge variant="primary">ShopLite access</Badge>

                <h1 className="mt-4 font-display text-3xl font-bold text-foreground">
                  Welcome back.
                </h1>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Use the demo credentials or enter your own fake customer email.
                </p>
              </div>
            </div>

            <form className="p-6" onSubmit={handleSubmit}>
              <div className="grid gap-4">
                <label className="grid gap-2">
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                    Email
                  </span>

                  <Input
                    type="email"
                    value={formState.email}
                    onChange={(event) =>
                      updateFormField("email", event.target.value)
                    }
                    placeholder="demo@shoplite.dev"
                    autoComplete="email"
                    aria-invalid={hasSubmitted && formState.email.trim().length === 0}
                  />

                  {hasSubmitted && formState.email.trim().length === 0 ? (
                    <span className="text-xs font-semibold text-danger">
                      Email is required.
                    </span>
                  ) : null}
                </label>

                <label className="grid gap-2">
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                    Password
                  </span>

                  <Input
                    type="password"
                    value={formState.password}
                    onChange={(event) =>
                      updateFormField("password", event.target.value)
                    }
                    placeholder="shoplite-demo"
                    autoComplete="current-password"
                    aria-invalid={hasSubmitted && formState.password.trim().length < 4}
                  />

                  {hasSubmitted && formState.password.trim().length < 4 ? (
                    <span className="text-xs font-semibold text-danger">
                      Use at least 4 characters for the demo password.
                    </span>
                  ) : null}
                </label>
              </div>

              <div className="mt-6 rounded-card border border-border-subtle bg-white/[0.03] p-4">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                  Demo credentials
                </p>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Email:{" "}
                  <span className="font-bold text-foreground">
                    demo@shoplite.dev
                  </span>
                </p>

                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  Password:{" "}
                  <span className="font-bold text-foreground">
                    shoplite-demo
                  </span>
                </p>
              </div>

              <div className="mt-8 grid gap-3">
                <Button type="submit" disabled={!canSubmit} className="w-full">
                  Sign in demo account
                </Button>

                <ButtonLink href={routes.products} variant="outline" className="w-full">
                  Explore without login
                </ButtonLink>
              </div>
            </form>
          </Card>
        </div>

        <Card variant="subtle" className="mt-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <Badge variant="muted">Frontend-only auth</Badge>

              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                This login creates a local demo session only. It is useful for portfolio flow, but it is not real authentication.
              </p>
            </div>

            <Button variant="outline" size="sm" disabled onClick={logout}>
              Logout available after login
            </Button>
          </div>
        </Card>
      </Container>
    </div>
  );
}