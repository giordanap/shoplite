import type { Meta, StoryObj } from "@storybook/nextjs";

import { PageLoadingState } from "./page-loading-state";

const meta = {
  title: "Shared/Feedback/PageLoadingState",
  component: PageLoadingState,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["dashboard", "catalog", "detail", "form", "default"],
    },
  },
  args: {
    eyebrow: "Loading",
    title: "Preparing ShopLite experience.",
    description: "Reusable premium skeleton state for route-level loading.",
    variant: "default",
  },
} satisfies Meta<typeof PageLoadingState>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Catalog: Story = {
  args: {
    eyebrow: "Products",
    title: "Loading premium catalog.",
    description: "Fetching products, filters, sorting and pagination.",
    variant: "catalog",
  },
};

export const Dashboard: Story = {
  args: {
    eyebrow: "Account",
    title: "Loading account dashboard.",
    description: "Preparing local session, cart stats and order history.",
    variant: "dashboard",
  },
};