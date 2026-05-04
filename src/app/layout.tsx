import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";

import { AppShell } from "@/shared/components/layout";

import { AppProviders } from "./providers";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ShopLite | Premium Frontend Commerce Demo",
    template: "%s | ShopLite",
  },
  description:
    "Frontend-only premium e-commerce portfolio demo built with Next.js, TypeScript, Tailwind CSS, TanStack Query, Zustand, Storybook and DummyJSON.",
  applicationName: "ShopLite",
  authors: [
    {
      name: "Giordan Apaza",
      url: "https://github.com/giordanap",
    },
  ],
  creator: "Giordan Apaza",
  keywords: [
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Zustand",
    "TanStack Query",
    "Storybook",
    "Frontend Portfolio",
    "E-commerce Demo",
  ],
  openGraph: {
    title: "ShopLite | Premium Frontend Commerce Demo",
    description:
      "A premium frontend-only commerce portfolio project with catalog, cart, checkout, local orders, demo auth, wishlist, accessibility and Storybook.",
    url: "https://giordanap.github.io/shoplite",
    siteName: "ShopLite",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://dummyjson.com" />
        <link rel="dns-prefetch" href="https://dummyjson.com" />
      </head>

      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <AppProviders>
          <AppShell>{children}</AppShell>
        </AppProviders>
      </body>
    </html>
  );
}