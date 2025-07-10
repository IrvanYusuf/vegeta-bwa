import { TransactionStatus } from "@prisma/client";
import { Product } from "./product";
import { BaseResponse, PaginatedResponse } from "./response";
import { User } from "./user";

export interface Checkout {
  id?: string;
  userId?: string;
  productId: string;
  qty: number;
  pricePerItem: number;
  product: Product;
}
export interface CheckoutPayload {
  userId?: string;
  productId: string;
  qty: number;
}

export interface CheckoutResponse extends BaseResponse<Checkout[]> {}

export type DELIVERY_METHOD = "HOME_DELIVERY" | "STORE_PICKUP";

export interface TransactionItem {
  id: string;
  transactionId: string;
  productId: string;
  qty: number;
  pricePerItem: number;
  product?: Product | null;
}

export interface TransactionItemPayload {
  productId: string;
  qty: number;
  pricePerItem: number;
}

export interface CreateTransactionPayload {
  id?: string;
  deliveryFee: number;
  insuranceFee: number;
  applicationFee: number;
  totalAmount?: number;
  method: DELIVERY_METHOD;
  paymentDue?: Date;
  receiverName?: string;
  phoneNumber?: string;
  address?: string;
  province?: string;
  city?: string;
  district?: string;
  postalCode?: string;
  items: TransactionItemPayload[];
}

export interface SingleTransactionResponse
  extends BaseResponse<CreateTransactionPayload> {}

export interface History {
  id: string;
  userId: string;
  totalAmount: number;
  deliveryFee?: number;
  insuranceFee?: number;
  applicationFee?: number;
  status: TransactionStatus;
  method: DELIVERY_METHOD;
  receiverName?: string;
  phoneNumber?: string;
  address?: string;
  province?: string;
  city?: string;
  district?: string;
  postalCode?: string;
  paymentDue?: string;
  createdAt: string;
  updatedAt: string;
  items: TransactionItem[];
  user?: User;
}

export interface HistorysResponse extends PaginatedResponse<History[]> {}

export interface SingleHistoryResponse extends BaseResponse<History> {}
