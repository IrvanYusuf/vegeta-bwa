import Response from "@/lib/api.response";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, params: Params) {
  try {
    const session = await getServerSession(authOptions);

    // Jika user belum login
    const userId = session?.user?.id;
    const id = params.params.id;
    console.log("id", id);

    const product = await prisma.product.findUnique({ where: { id } });

    if (!product) {
      return Response({
        message: "Produk tidak ditemukan",
        data: null,
        status: 404,
        isSuccess: false,
      });
    }

    const recommended = await prisma.product.findMany({
      where: {
        category: product.category,
        NOT: { id: product.id },
      },
      take: 4,
      include: {
        ProductFavorite: userId
          ? {
              where: { userId },
              select: { id: true }, // atau kosong juga bisa
            }
          : false,
      },
    });
    return Response({
      message: "success get detail product",
      data: {
        product,
        recommended: recommended.map((product) => ({
          ...product,
          isFavorite: userId ? product.ProductFavorite.length > 0 : false,
        })),
      },
      status: 200,
    });
  } catch (error: any) {
    console.log("error api in api/products/[id]/route.ts", error.message);
    return Response({
      message: "failed sign in",
      data: error.message || "Internal server error",
      status: 500,
      isSuccess: false,
    });
  }
}
