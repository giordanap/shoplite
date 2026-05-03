export type DummyJsonProductReviewDto = {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
};

export type DummyJsonProductDimensionsDto = {
  width: number;
  height: number;
  depth: number;
};

export type DummyJsonProductMetaDto = {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
};

export type DummyJsonProductDto = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags?: string[];
  brand?: string;
  sku?: string;
  weight?: number;
  dimensions?: DummyJsonProductDimensionsDto;
  warrantyInformation?: string;
  shippingInformation?: string;
  availabilityStatus?: string;
  reviews?: DummyJsonProductReviewDto[];
  returnPolicy?: string;
  minimumOrderQuantity?: number;
  meta?: DummyJsonProductMetaDto;
  thumbnail: string;
  images: string[];
};

export type DummyJsonProductsResponseDto = {
  products: DummyJsonProductDto[];
  total: number;
  skip: number;
  limit: number;
};

export type DummyJsonProductCategoryDto = {
  slug: string;
  name: string;
  url: string;
};