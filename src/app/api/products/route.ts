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

    // filter
    // parse multiple category values from query: ?categories=FRUIT,VEGETABLE
    const categoryParam = searchParams.get("categories"); // "FRUIT,VEGETABLE"
    const categories = categoryParam
      ? categoryParam
          .split(",")
          .map((c) => c.trim())
          .filter((c) => c)
      : [];

    // parse multiple ratings values from query: ?ratings=5,4,3
    const ratingParam = searchParams.get("ratings");
    const ratings = ratingParam
      ? ratingParam
          .split(",")
          .map((c) => c.trim())
          .filter((c) => c)
      : [];

    // price filter: max_price=100000&min_price=10000
    const minPrice = parseInt(searchParams.get("min_price") || "0");
    const maxPrice = parseInt(searchParams.get("max_price") || "0");

    const where: any = {};

    if (categories.length > 0) {
      where.category = { in: categories };
    }

    if (ratings.length > 0) {
      where.rating = { in: ratings.map(Number) };
    }

    if (minPrice > 0 || maxPrice > 0) {
      where.price = {};
      if (minPrice > 0) where.price.gte = minPrice;
      if (maxPrice > 0) where.price.lte = maxPrice;
    }

    const [products, total] = await prisma.$transaction([
      prisma.product.findMany({
        skip,
        take: limit,
        where,
        include: {
          ProductFavorite: userId
            ? {
                where: { userId },
                select: { id: true }, // atau kosong juga bisa
              }
            : false,
        },
      }),
      prisma.product.count({ where }),
    ]);

    return Response({
      message: "success get products",
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
