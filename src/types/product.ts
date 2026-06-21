export type ProductType = 'sun' | 'optical' | 'limited';

export interface Product {
  id: string;
  no: string;
  name: string;
  category: string;
  /** numeric for cart math */
  price: number;
  colors: string[];
  image: string;
  /** gallery images for Quick View; falls back to [image] */
  images?: string[];
  tag?: string;
  type: ProductType;
  sizes?: string[];
  description?: string;
}

export interface CartLine {
  /** unique per product + chosen variant */
  lineId: string;
  product: Product;
  qty: number;
  color: string;
  size: string;
}

export const formatPrice = (n: number) =>
  `$${n.toLocaleString('en-US', { minimumFractionDigits: 0 })}`;
