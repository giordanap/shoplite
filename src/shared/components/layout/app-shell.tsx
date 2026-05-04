import dynamic from "next/dynamic";
import type { ReactNode } from "react";

import { Header } from "./header";

const Footer = dynamic(() => import("./footer").then((module) => module.Footer));

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <Header />

      <main id="main-content" className="flex-1" tabIndex={-1}>
        {children}
      </main>

      <Footer />
    </>
  );
}