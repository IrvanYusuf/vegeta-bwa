export const BASE_URL_ENDPOINT = "/api";

export const ENDPOINTS = {
  auth: {
    signIn: "/auth/sign-in",
    signUp: "/auth/sign-up",
  },
  products: {
    root: "/products",
    productFavorites: "/product-favorites",
  },
  transactions: {
    root: "/transaction/checkouts",
    payments: "/transaction/payments",
    historys: "/transaction/historys",
  },
};
