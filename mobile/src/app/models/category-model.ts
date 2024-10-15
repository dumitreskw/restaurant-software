import { Product } from "./product-model";

export interface Category {
    category: string;
    type: string;
    products: Product[];
  }