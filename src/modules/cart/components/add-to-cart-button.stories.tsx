import type { Meta, StoryObj } from "@storybook/nextjs";

import { mockLowStockProduct, mockOutOfStockProduct, mockPremiumProduct } from "@/modules/products/testing";
import { CommerceStoreFixture } from "@/shared/storybook/commerce-store-fixtures";

import { AddToCartButton } from "./add-to-cart-button";

const meta = {
  title: "Commerce/Cart/AddToCartButton",
  component: AddToCartButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    compact: {
      control: "boolean",
    },
  },
  args: {
    product: mockPremiumProduct,
    size: "md",
    compact: false,
  },
} satisfies Meta<typeof AddToCartButton>;

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

export const Compact: Story = {
  args: {
    compact: true,
    size: "sm",
  },
  decorators: [
    (Story) => (
      <CommerceStoreFixture product={mockPremiumProduct}>
        <Story />
      </CommerceStoreFixture>
    ),
  ],
};

export const AlreadyInCart: Story = {
  decorators: [
    (Story) => (
      <CommerceStoreFixture product={mockPremiumProduct} cart="with-product">
        <Story />
      </CommerceStoreFixture>
    ),
  ],
};

export const StockLimitReached: Story = {
  args: {
    product: mockLowStockProduct,
  },
  decorators: [
    (Story) => (
      <CommerceStoreFixture product={mockLowStockProduct} cart="maxed">
        <Story />
      </CommerceStoreFixture>
    ),
  ],
};

export const OutOfStock: Story = {
  args: {
    product: mockOutOfStockProduct,
  },
  decorators: [
    (Story) => (
      <CommerceStoreFixture product={mockOutOfStockProduct}>
        <Story />
      </CommerceStoreFixture>
    ),
  ],
};