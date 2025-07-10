import Response from "@/lib/api.response";
import { prisma } from "@/lib/prisma";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, params: Params) {
  try {
    const id = params.params.id;
    const transactions = await prisma.transaction.findUnique({ where: { id } });

    return Response({
      data: transactions,
      message: "success get transactions",
      status: 200,
    });
  } catch (error: any) {
    console.error(
      "Gagal get payment in api/transaction/payments method:GET:",
      error.message
    );
    return Response({
      message: "Gagal get single payment item",
      status: 500,
      isSuccess: false,
    });
  }
}
