import { BASE_URL_ENDPOINT, ENDPOINTS } from "@/lib/endpoints";
import {
  ProductFavoritePayload,
  ProductFavoriteResponse,
  ProductResponse,
  ProductSingleResponse,
} from "@/types/product";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL_ENDPOINT }),
  endpoints: (builder) => ({
    getAllProducts: builder.query<
      ProductResponse,
      Partial<{
        page: number;
        limit: number;
        categories: string;
        ratings: string;
        min_price: string;
        max_price: string;
      }>
    >({
      query: (params) => {
        const query = new URLSearchParams();

        if (params?.limit) query.append("limit", params.limit.toString());
        if (params?.page) query.append("page", params.page.toString());
        if (params?.categories) query.append("categories", params.categories);
        if (params?.ratings) query.append("ratings", params.ratings);
        if (params?.min_price) query.append("min_price", params.min_price);
        if (params?.max_price) query.append("max_price", params.max_price);

        return {
          url: `${ENDPOINTS.products.root}?${query.toString()}`,
          method: "GET",
        };
      },
    }),

    // get detail product with id
    getDetailProduct: builder.query<
      ProductSingleResponse,
      Partial<{ id: string }>
    >({
      query: ({ id }) => {
        return {
          url: `${ENDPOINTS.products.root}/${id}`,
          method: "GET",
        };
      },
    }),

    // product favorite
    productFavorite: builder.mutation<
      ProductFavoriteResponse,
      ProductFavoritePayload
    >({
      query: (body) => ({
        url: ENDPOINTS.products.productFavorites,
        method: "POST",
        body,
      }),
      invalidatesTags: ["products"],
    }),

    // get product favorite
    getProductFavorite: builder.query<
      ProductFavoriteResponse,
      Partial<{ page: number; limit: number; createdAt: string }>
    >({
      query: (params) => {
        const query = new URLSearchParams();

        if (params?.limit) query.append("limit", params.limit.toString());
        if (params?.page) query.append("page", params.page.toString());
        if (params?.createdAt)
          query.append("createdAt", params.createdAt.toString());
        return {
          url: `${ENDPOINTS.products.productFavorites}?${query.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["products"],
    }),
  }),
  tagTypes: ["products"],
});

export const {
  useGetAllProductsQuery,
  useGetDetailProductQuery,
  useProductFavoriteMutation,
  useGetProductFavoriteQuery,
} = productApi;
