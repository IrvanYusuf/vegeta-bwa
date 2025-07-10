import Response from "@/lib/api.response";
import { prisma } from "@/lib/prisma";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, params: Params) {
  try {
    const transactionId = params.params.id;
    const transaction = await prisma.transaction.findUnique({
      where: { id: transactionId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        user: { select: { name: true, email: true } },
      },
    });

    return Response({
      message: "success get history transaction",
      data: transaction,
    });
  } catch (error: any) {
    console.log(
      "error api in api/transaction/historys/[id]/route.ts",
      error.message
    );
    return Response({
      message: "failed get history transaction",
      data: error.message || "Internal server error",
      status: 500,
      isSuccess: false,
    });
  }
}
