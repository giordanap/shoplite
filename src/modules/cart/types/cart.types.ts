import type {
  Product,
  ProductAvailabilityStatus,
  ProductImage,
} from "@/modules/products/types";

export type CartProductSnapshot = {
  id: number;
  name: string;
  categoryName: string;
  price: number;
  discountedPrice: number;
  stock: number;
  availabilityStatus: ProductAvailabilityStatus;
  thumbnail: ProductImage;
};

export type CartItem = {
  product: CartProductSnapshot;
  quantity: number;
};

export type CartTotals = {
  uniqueItemsCount: number;
  itemCount: number;
  subtotal: number;
  discountTotal: number;
  total: number;
};

export type CartState = {
  items: CartItem[];
};

export type CartActions = {
  addProduct: (product: Product, quantity?: number) => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  removeItem: (productId: number) => void;
  clearCart: () => void;
};

export type CartStore = CartState & CartActions;