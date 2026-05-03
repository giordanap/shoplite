import type { Meta, StoryObj } from "@storybook/nextjs";

import { CommerceStoreFixture } from "@/shared/storybook/commerce-store-fixtures";

import {
  mockLowStockProduct,
  mockOutOfStockProduct,
  mockPremiumProduct,
} from "../testing";

import { ProductDetail } from "./product-detail";

const meta = {
  title: "Commerce/Products/ProductDetail",
  component: ProductDetail,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  args: {
    product: mockPremiumProduct,
  },
  decorators: [
    (Story) => (
      <CommerceStoreFixture product={mockPremiumProduct}>
        <Story />
      </CommerceStoreFixture>
    ),
  ],
} satisfies Meta<typeof ProductDetail>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SavedAndInCart: Story = {
  decorators: [
    (Story) => (
      <CommerceStoreFixture
        product={mockPremiumProduct}
        cart="with-product"
        favorite="saved"
      >
        <Story />
      </CommerceStoreFixture>
    ),
  ],
};

export const LowStock: Story = {
  args: {
    product: mockLowStockProduct,
  },
  decorators: [
    (Story) => (
      <CommerceStoreFixture product={mockLowStockProduct}>
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