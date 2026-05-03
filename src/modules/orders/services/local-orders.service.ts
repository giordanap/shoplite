import type {
  CreateLocalOrderInput,
  LocalOrder,
  LocalOrderItem,
} from "../types";

const LOCAL_ORDERS_STORAGE_KEY = "shoplite-orders-v1";
const LOCAL_LATEST_ORDER_ID_STORAGE_KEY = "shoplite-latest-order-id-v1";

export const LOCAL_ORDERS_SERVER_SNAPSHOT = "__SHOPLITE_ORDERS_PENDING__";
const EMPTY_ORDERS_SNAPSHOT = "[]";
const LOCAL_ORDERS_CHANGED_EVENT = "shoplite:orders-changed";

function createOrderId(): string {
  return `SL-${Date.now().toString(36).toUpperCase()}`;
}

function mapOrderItems(items: CreateLocalOrderInput["items"]): LocalOrderItem[] {
  return items.map((item) => ({
    ...item,
    lineTotal: item.product.discountedPrice * item.quantity,
  }));
}

function safeParseOrders(value: string | null): LocalOrder[] {
  if (!value) return [];

  try {
    const parsedValue = JSON.parse(value);

    if (!Array.isArray(parsedValue)) {
      return [];
    }

    return parsedValue as LocalOrder[];
  } catch {
    return [];
  }
}

function notifyLocalOrdersChanged() {
  window.dispatchEvent(new Event(LOCAL_ORDERS_CHANGED_EVENT));
}

export function getLocalOrders(): LocalOrder[] {
  if (typeof window === "undefined") {
    return [];
  }

  return safeParseOrders(window.localStorage.getItem(LOCAL_ORDERS_STORAGE_KEY));
}

export function getLocalOrdersSnapshot(): string {
  if (typeof window === "undefined") {
    return EMPTY_ORDERS_SNAPSHOT;
  }

  return (
    window.localStorage.getItem(LOCAL_ORDERS_STORAGE_KEY) ??
    EMPTY_ORDERS_SNAPSHOT
  );
}

export function getLocalOrdersServerSnapshot(): string {
  return LOCAL_ORDERS_SERVER_SNAPSHOT;
}

export function getLocalOrdersFromSnapshot(snapshot: string): LocalOrder[] {
  if (snapshot === LOCAL_ORDERS_SERVER_SNAPSHOT) {
    return [];
  }

  return safeParseOrders(snapshot);
}

export function findLocalOrderFromSnapshot(
  snapshot: string,
  orderId: string | null,
): LocalOrder | null {
  const orders = getLocalOrdersFromSnapshot(snapshot);

  if (orders.length === 0) {
    return null;
  }

  if (orderId) {
    return orders.find((order) => order.id === orderId) ?? null;
  }

  return orders[0] ?? null;
}

export function createLocalOrder(input: CreateLocalOrderInput): LocalOrder {
  const order: LocalOrder = {
    id: createOrderId(),
    status: "confirmed-demo",
    createdAt: new Date().toISOString(),
    customer: input.customer,
    delivery: input.delivery,
    payment: {
      method: "demo-token",
      status: "authorized-demo",
    },
    items: mapOrderItems(input.items),
    totals: input.totals,
  };

  const orders = getLocalOrders();

  window.localStorage.setItem(
    LOCAL_ORDERS_STORAGE_KEY,
    JSON.stringify([order, ...orders]),
  );

  window.localStorage.setItem(LOCAL_LATEST_ORDER_ID_STORAGE_KEY, order.id);
  notifyLocalOrdersChanged();

  return order;
}

export function subscribeToLocalOrders(listener: () => void) {
  function handleStorage(event: StorageEvent) {
    if (
      event.key === LOCAL_ORDERS_STORAGE_KEY ||
      event.key === LOCAL_LATEST_ORDER_ID_STORAGE_KEY
    ) {
      listener();
    }
  }

  window.addEventListener("storage", handleStorage);
  window.addEventListener(LOCAL_ORDERS_CHANGED_EVENT, listener);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(LOCAL_ORDERS_CHANGED_EVENT, listener);
  };
}