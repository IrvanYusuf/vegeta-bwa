import { ProductUnit } from "@prisma/client";
import { BaseResponse, PaginatedResponse } from "./response";

export interface Product {
  id: string;
  name: string;
  image: string;
  description: string;
  price: number;
  itemSold: number;
  rating: number;
  category: string;
  unit: ProductUnit;
  createdAt: string;
  updatedAt: string;
  ProductFavorite?: ProductFavorite[];
  qty?: number;
}

export interface ProductFavorite {
  id: string;
  userId: string;
  productId: string;
  createdAt: string;
  updatedAt: string;
  product: Product;
}

export interface ProductFavoritePayload {
  productId: string;
}

export interface ProductResponse extends PaginatedResponse<Product[]> {}

export interface ProductFavoriteResponse
  extends PaginatedResponse<ProductFavorite[]> {}

export interface ProductSingleResponse
  extends BaseResponse<{
    product: Product;
    recommended: Product[];
  }> {}
