import { routes } from "@/core/router/routes";

type NavigationLink = {
  label: string;
  href: string;
  external?: boolean;
};

type NavigationGroup = {
  title: string;
  links: NavigationLink[];
};

export const mainNavigationItems: NavigationLink[] = [
  {
    label: "Home",
    href: routes.home,
  },
  {
    label: "Products",
    href: routes.products,
  },
  {
    label: "Categories",
    href: routes.products,
  },
  {
    label: "Deals",
    href: routes.products,
  },
];

export const footerNavigationGroups: NavigationGroup[] = [
  {
    title: "Shop",
    links: [
      {
        label: "Products",
        href: routes.products,
      },
      {
        label: "Categories",
        href: routes.products,
      },
      {
        label: "Deals",
        href: routes.products,
      },
    ],
  },
  {
    title: "Project",
    links: [
      {
        label: "DummyJSON API",
        href: routes.external.dummyJson,
        external: true,
      },
      {
        label: "GitHub Pages",
        href: routes.home,
      },
    ],
  },
];