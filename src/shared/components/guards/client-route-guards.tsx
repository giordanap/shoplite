"use client";

import { ReactNode, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { routes } from "@/core/router";
import { useAuthStore } from "@/modules/auth/store";
import { useCartStore } from "@/modules/cart/store";
import { PageLoadingState } from "@/shared/components/feedback";

type GuardProps = {
  children: ReactNode;
};

function getSafeNextPath(fallback: string): string {
  if (typeof window === "undefined") {
    return fallback;
  }

  const nextPath = new URLSearchParams(window.location.search).get("next");

  if (!nextPath || !nextPath.startsWith("/") || nextPath.startsWith("//")) {
    return fallback;
  }

  return nextPath;
}

function useHasMounted(): boolean {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setHasMounted(true);
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  return hasMounted;
}

function GuardLoadingState({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <PageLoadingState
      eyebrow={eyebrow}
      title={title}
      description={description}
      variant="dashboard"
    />
  );
}

export function ClientAuthGuard({ children }: GuardProps) {
  const router = useRouter();
  const pathname = usePathname();

  const hasMounted = useHasMounted();
  const session = useAuthStore((state) => state.session);

  useEffect(() => {
    if (!hasMounted || session) return;

    const nextPath = pathname ? `?next=${encodeURIComponent(pathname)}` : "";

    router.replace(`${routes.login}${nextPath}`);
  }, [hasMounted, pathname, router, session]);

  if (!hasMounted) {
    return (
      <GuardLoadingState
        eyebrow="Account guard"
        title="Restoring your demo session."
        description="Checking localStorage before opening this protected page."
      />
    );
  }

  if (!session) {
    return (
      <GuardLoadingState
        eyebrow="Account guard"
        title="Redirecting to demo login."
        description="This route requires a local demo session."
      />
    );
  }

  return children;
}

export function ClientGuestGuard({ children }: GuardProps) {
  const router = useRouter();

  const hasMounted = useHasMounted();
  const session = useAuthStore((state) => state.session);

  useEffect(() => {
    if (!hasMounted || !session) return;

    router.replace(getSafeNextPath(routes.account));
  }, [hasMounted, router, session]);

  if (!hasMounted) {
    return (
      <GuardLoadingState
        eyebrow="Guest guard"
        title="Checking your demo session."
        description="Preparing the right destination for this route."
      />
    );
  }

  if (session) {
    return (
      <GuardLoadingState
        eyebrow="Guest guard"
        title="Redirecting to your dashboard."
        description="You already have an active local demo session."
      />
    );
  }

  return children;
}

const CHECKOUT_IN_PROGRESS_KEY = "shoplite-checkout-in-progress";

export function ClientCartGuard({ children }: GuardProps) {
  const router = useRouter();

  const hasMounted = useHasMounted();
  const itemCount = useCartStore((state) => state.items.length);

  useEffect(() => {
    if (!hasMounted || itemCount > 0) return;

    const isCheckoutInProgress =
      window.sessionStorage.getItem(CHECKOUT_IN_PROGRESS_KEY) === "true";

    if (isCheckoutInProgress) {
      window.sessionStorage.removeItem(CHECKOUT_IN_PROGRESS_KEY);
      return;
    }

    router.replace(routes.cart);
  }, [hasMounted, itemCount, router]);

  if (!hasMounted) {
    return (
      <GuardLoadingState
        eyebrow="Cart guard"
        title="Restoring your cart."
        description="Checking persisted cart items before opening checkout."
      />
    );
  }

  if (itemCount === 0) {
    return (
      <GuardLoadingState
        eyebrow="Cart guard"
        title="Redirecting to cart."
        description="Checkout requires at least one product in your cart."
      />
    );
  }

  return children;
}