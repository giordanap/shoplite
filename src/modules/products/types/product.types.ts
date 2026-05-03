export type ProductAvailabilityStatus =
  | "in-stock"
  | "low-stock"
  | "out-of-stock";

export type ProductCategory = {
  slug: string;
  name: string;
};

export type ProductImage = {
  url: string;
  alt: string;
};

export type ProductReview = {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
};

export type Product = {
  id: number;
  name: string;
  description: string;
  category: ProductCategory;
  price: number;
  discountPercent: number;
  discountedPrice: number;
  rating: number;
  stock: number;
  availabilityStatus: ProductAvailabilityStatus;
  brandName: string | null;
  sku: string | null;
  tags: string[];
  thumbnail: ProductImage;
  images: ProductImage[];
  reviews: ProductReview[];
  warrantyInformation: string | null;
  shippingInformation: string | null;
  returnPolicy: string | null;
  minimumOrderQuantity: number | null;
};