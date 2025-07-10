import Response from "@/lib/api.response";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    // Jika user belum login
    const userId = session?.user?.id;
    const { searchParams } = new URL(req.url);
    const limitParam = searchParams.get("limit");
    const limit = limitParam ? parseInt(limitParam) : 15;
    const page = parseInt(searchParams.get("page") || "1");
    const skip = (page - 1) * limit;

    const orderByCreatedAt: "asc" | "desc" =
      searchParams.get("createdAt") === "asc" ? "asc" : "desc";

    const [products, total] = await prisma.$transaction([
      prisma.productFavorite.findMany({
        where: { userId },
        skip,
        take: limit,
        include: {
          product: {
            include: {
              ProductFavorite: {
                where: { userId },
              },
            },
          },
        },
        orderBy: {
          createdAt: orderByCreatedAt,
        },
      }),
      prisma.productFavorite.count(),
    ]);

    return Response({
      message: "success get product favorites",
      data: products,
      meta: {
        total,
        page,
        totalPage: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    console.log("error api in api/products/route.ts", error.message);
    return Response({
      message: "failed sign in",
      data: error.message || "Internal server error",
      status: 500,
      isSuccess: false,
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    // Cek apakah user sudah login
    if (!session?.user?.id) {
      return Response({
        message: "Unauthorized",
        data: null,
        status: 401,
        isSuccess: false,
      });
    }

    const { productId } = await req.json();
    const userId = session.user.id;
    // Validasi: productId wajib string
    if (typeof productId !== "string") {
      return Response({
        message: "Invalid productId",
        data: null,
        status: 400,
        isSuccess: false,
      });
    }
    // Cek apakah favorit sudah ada
    const existing = await prisma.productFavorite.findFirst({
      where: {
        userId,
        productId,
      },
    });

    if (existing) {
      // Jika sudah ada, hapus
      await prisma.productFavorite.delete({
        where: {
          id: existing.id,
        },
      });

      return Response({
        message: "success remove product from favorites",
        data: null,
        status: 200,
      });
    } else {
      // Jika belum ada, tambahkan
      const addProductFavorite = await prisma.productFavorite.create({
        data: { userId, productId },
      });

      return Response({
        message: "success add product to favorites",
        data: addProductFavorite,
        status: 201,
      });
    }
  } catch (error: any) {
    console.log("error api in api/product-favorites/route.ts", error.message);
    return Response({
      message: "failed add product favorite",
      data: error.message || "Internal server error",
      status: 500,
      isSuccess: false,
    });
  }
}
