import type { Meta, StoryObj } from "@storybook/nextjs";

import { mockPremiumProduct } from "@/modules/products/testing";
import { CommerceStoreFixture } from "@/shared/storybook/commerce-store-fixtures";

import { FavoriteToggleButton } from "./favorite-toggle-button";

const meta = {
  title: "Commerce/Favorites/FavoriteToggleButton",
  component: FavoriteToggleButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    compact: {
      control: "boolean",
    },
  },
  args: {
    product: mockPremiumProduct,
    compact: false,
  },
} satisfies Meta<typeof FavoriteToggleButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [
    (Story) => (
      <CommerceStoreFixture product={mockPremiumProduct}>
        <Story />
      </CommerceStoreFixture>
    ),
  ],
};

export const Saved: Story = {
  decorators: [
    (Story) => (
      <CommerceStoreFixture product={mockPremiumProduct} favorite="saved">
        <Story />
      </CommerceStoreFixture>
    ),
  ],
};

export const Compact: Story = {
  args: {
    compact: true,
  },
  decorators: [
    (Story) => (
      <CommerceStoreFixture product={mockPremiumProduct}>
        <Story />
      </CommerceStoreFixture>
    ),
  ],
};

export const CompactSaved: Story = {
  args: {
    compact: true,
  },
  decorators: [
    (Story) => (
      <CommerceStoreFixture product={mockPremiumProduct} favorite="saved">
        <Story />
      </CommerceStoreFixture>
    ),
  ],
};