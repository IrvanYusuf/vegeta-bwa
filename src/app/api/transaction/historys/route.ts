import Response from "@/lib/api.response";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    const { searchParams } = new URL(req.url);
    const limitParam = searchParams.get("limit");
    const limit = limitParam ? parseInt(limitParam) : 10;
    const page = parseInt(searchParams.get("page") || "1");
    const orderByCreatedAt: "asc" | "desc" =
      searchParams.get("createdAt") === "asc" ? "asc" : "desc";
    const skip = (page - 1) * limit;

    const [transactions, total] = await prisma.$transaction([
      prisma.transaction.findMany({
        skip,
        take: limit,
        where: {
          userId,
        },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
        orderBy: {
          createdAt: orderByCreatedAt,
        },
      }),
      prisma.transaction.count(),
    ]);

    return Response({
      message: "success get transactions",
      data: transactions,
      meta: {
        total,
        page,
        totalPage: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    console.log(
      "error api in api/transaction/historys/route.ts",
      error.message
    );
    return Response({
      message: "failed get historys transaction",
      data: error.message || "Internal server error",
      status: 500,
      isSuccess: false,
    });
  }
}
