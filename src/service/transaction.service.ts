import { BASE_URL_ENDPOINT, ENDPOINTS } from "@/lib/endpoints";
import {
  CheckoutPayload,
  CheckoutResponse,
  CreateTransactionPayload,
  HistorysResponse,
  SingleHistoryResponse,
  SingleTransactionResponse,
} from "@/types/transaction";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { url } from "inspector";

export const transactionApi = createApi({
  reducerPath: "transactionApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL_ENDPOINT }),
  endpoints: (builder) => ({
    checkout: builder.mutation<CheckoutResponse, CheckoutPayload>({
      query: (body) => ({
        url: ENDPOINTS.transactions.root,
        method: "POST",
        body,
      }),
      invalidatesTags: ["transactions"],
    }),
    getAllCheckout: builder.query<CheckoutResponse, void>({
      query: (body) => ({
        url: ENDPOINTS.transactions.root,
        method: "GET",
      }),
      providesTags: ["transactions"],
    }),
    deleteBulk: builder.mutation<any, { ids?: string[]; id?: string }>({
      query: (body) => ({
        url: ENDPOINTS.transactions.root,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["transactions"],
    }),
    updateQty: builder.mutation<CheckoutResponse, CheckoutPayload>({
      query: (body) => ({
        url: ENDPOINTS.transactions.root,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["transactions"],
    }),

    // payment
    createPayment: builder.mutation<
      SingleTransactionResponse,
      CreateTransactionPayload
    >({
      query: (body) => ({
        url: ENDPOINTS.transactions.payments,
        method: "POST",
        body,
      }),
      invalidatesTags: ["transactions"],
    }),

    getPayment: builder.query<
      SingleTransactionResponse,
      Partial<{ id: string }>
    >({
      query: ({ id }) => ({
        url: `${ENDPOINTS.transactions.payments}/${id}`,
        method: "GET",
      }),
    }),

    getHistorys: builder.query<
      HistorysResponse,
      Partial<{
        page: number;
        limit: number;
        createdAt: string;
      }>
    >({
      query: (params) => {
        const query = new URLSearchParams();

        if (params?.limit) query.append("limit", params.limit.toString());
        if (params?.page) query.append("page", params.page.toString());
        if (params?.createdAt)
          query.append("createdAt", params.createdAt.toString());
        return {
          url: `${ENDPOINTS.transactions.historys}?${query.toString()}`,
          method: "GET",
        };
      },
    }),

    getDetailHistory: builder.query<
      SingleHistoryResponse,
      Partial<{ id: string }>
    >({
      query: ({ id }) => ({
        url: `${ENDPOINTS.transactions.historys}/${id}`,
        method: "GET",
      }),
    }),
  }),
  tagTypes: ["transactions"],
});

export const {
  useCheckoutMutation,
  useGetAllCheckoutQuery,
  useDeleteBulkMutation,
  useUpdateQtyMutation,
  useCreatePaymentMutation,
  useGetPaymentQuery,
  useGetHistorysQuery,
  useGetDetailHistoryQuery,
} = transactionApi;
