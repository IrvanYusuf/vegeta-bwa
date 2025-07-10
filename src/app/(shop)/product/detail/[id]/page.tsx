import type { Metadata } from "next";
import ProductDetailPage from "./ProductDetailPage";
import { prisma } from "@/lib/prisma";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const product = await prisma.product.findUnique({ where: { id: params.id } });
  return {
    title: product
      ? `Detail ${product.name} - Vegeta`
      : "Produk tidak ditemukan",
    description: "Detail produk Vegeta",
  };
}

export default function Products({ params }: { params: { id: string } }) {
  const { id } = params;

  return <ProductDetailPage id={id} />;
}
