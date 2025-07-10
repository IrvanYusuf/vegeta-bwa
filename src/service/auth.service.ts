import { SignUpForm } from "@/app/auth/signup/sign-up-form";
import { BASE_URL_ENDPOINT, ENDPOINTS } from "@/lib/endpoints";
import { BaseResponse } from "@/types/response";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

interface AuthResponse
  extends BaseResponse<{
    name: string;
    email: string;
    password: string;
  }> {}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL_ENDPOINT,
  }),
  endpoints: (builder) => ({
    register: builder.mutation<AuthResponse, SignUpForm>({
      query: (body) => ({
        url: ENDPOINTS.auth.signUp,
        method: "POST",
        body,
      }),
    }),
  }),
  tagTypes: ["auth"],
});

export const { useRegisterMutation } = authApi;
