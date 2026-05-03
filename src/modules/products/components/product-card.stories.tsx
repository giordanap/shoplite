import type { Meta, StoryObj } from "@storybook/nextjs";

import { CommerceStoreFixture } from "@/shared/storybook/commerce-store-fixtures";

import {
  mockLowStockProduct,
  mockOutOfStockProduct,
  mockPremiumProduct,
} from "../testing";

import { ProductCard } from "./product-card";

const meta = {
  title: "Commerce/Products/ProductCard",
  component: ProductCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    product: mockPremiumProduct,
  },
  decorators: [
    (Story) => (
      <div className="w-[340px]">
        <CommerceStoreFixture product={mockPremiumProduct}>
          <Story />
        </CommerceStoreFixture>
      </div>
    ),
  ],
} satisfies Meta<typeof ProductCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SavedAsFavorite: Story = {
  decorators: [
    (Story) => (
      <div className="w-[340px]">
        <CommerceStoreFixture product={mockPremiumProduct} favorite="saved">
          <Story />
        </CommerceStoreFixture>
      </div>
    ),
  ],
};

export const AlreadyInCart: Story = {
  decorators: [
    (Story) => (
      <div className="w-[340px]">
        <CommerceStoreFixture product={mockPremiumProduct} cart="with-product">
          <Story />
        </CommerceStoreFixture>
      </div>
    ),
  ],
};

export const LowStock: Story = {
  args: {
    product: mockLowStockProduct,
  },
  decorators: [
    (Story) => (
      <div className="w-[340px]">
        <CommerceStoreFixture product={mockLowStockProduct}>
          <Story />
        </CommerceStoreFixture>
      </div>
    ),
  ],
};

export const OutOfStock: Story = {
  args: {
    product: mockOutOfStockProduct,
  },
  decorators: [
    (Story) => (
      <div className="w-[340px]">
        <CommerceStoreFixture product={mockOutOfStockProduct}>
          <Story />
        </CommerceStoreFixture>
      </div>
    ),
  ],
};