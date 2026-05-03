import type { Meta, StoryObj } from "@storybook/nextjs";

import { Badge } from "./badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";

const meta = {
  title: "Shared/UI/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["glass", "solid", "subtle"],
    },
  },
  args: {
    variant: "glass",
  },
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const PremiumCard: Story = {
  render: (args) => (
    <Card {...args} className="max-w-md">
      <Badge variant="primary">Aetheric commerce</Badge>

      <CardHeader className="mt-5">
        <CardTitle>Premium product surface</CardTitle>
        <CardDescription>
          A reusable card primitive for ShopLite&apos;s dark luxury UI system.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="rounded-card border border-border-subtle bg-card-gradient p-5 text-sm leading-6 text-muted-foreground">
          Designed for product cards, order summaries, account sections and
          portfolio-ready commerce states.
        </div>
      </CardContent>
    </Card>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="grid max-w-4xl gap-4 md:grid-cols-3">
      <Card variant="glass">
        <Badge variant="primary">Glass</Badge>
        <p className="mt-4 text-sm text-muted-foreground">
          Default premium glass panel.
        </p>
      </Card>

      <Card variant="solid">
        <Badge variant="secondary">Solid</Badge>
        <p className="mt-4 text-sm text-muted-foreground">
          Elevated surface for stronger emphasis.
        </p>
      </Card>

      <Card variant="subtle">
        <Badge variant="muted">Subtle</Badge>
        <p className="mt-4 text-sm text-muted-foreground">
          Lightweight surface for nested content.
        </p>
      </Card>
    </div>
  ),
};