import type { Metadata } from "next";
import CheckoutPage from "./CheckoutPage";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Checkout Page - Vegeta",
    description: "Checkout Page produk Vegeta",
    icons: "/logo.svg",
  };
}
export default function Checkout() {
  return <CheckoutPage />;
}
