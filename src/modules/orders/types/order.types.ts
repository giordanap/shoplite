import type { CartItem } from "@/modules/cart/types";

export type LocalOrderStatus = "confirmed-demo";

export type LocalOrderDeliveryMethod = "standard" | "express";

export type LocalOrderCustomer = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
};

export type LocalOrderDelivery = {
  method: LocalOrderDeliveryMethod;
  label: string;
  fee: number;
};

export type LocalOrderPayment = {
  method: "demo-token";
  status: "authorized-demo";
};

export type LocalOrderItem = CartItem & {
  lineTotal: number;
};

export type LocalOrderTotals = {
  subtotal: number;
  discountTotal: number;
  deliveryFee: number;
  taxTotal: number;
  total: number;
};

export type LocalOrder = {
  id: string;
  status: LocalOrderStatus;
  createdAt: string;
  customer: LocalOrderCustomer;
  delivery: LocalOrderDelivery;
  payment: LocalOrderPayment;
  items: LocalOrderItem[];
  totals: LocalOrderTotals;
};

export type CreateLocalOrderInput = {
  customer: LocalOrderCustomer;
  delivery: LocalOrderDelivery;
  items: CartItem[];
  totals: LocalOrderTotals;
};