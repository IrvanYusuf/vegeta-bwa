import Response from "@/lib/api.response";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { CheckoutPayload } from "@/types/transaction";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    // Jika user belum login
    const userId = session?.user?.id;

    if (!userId) {
      return Response({
        message: "Unauthorized",
        data: null,
        status: 401,
        isSuccess: false,
      });
    }
    const checkouts = await prisma.checkout.findMany({
      where: { userId },
      include: {
        product: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    return Response({
      data: checkouts,
      message: "Success get checkouts transaction data",
    });
  } catch (error: any) {
    console.log(
      "error api in api/transaction/checkouts/route.ts method: GET",
      error.message
    );
    return Response({
      message: "failed add checkout transaction",
      data: error.message || "Internal server error",
      status: 500,
      isSuccess: false,
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    // Jika user belum login
    const userId = session?.user?.id as string;
    const payload = (await req.json()) as CheckoutPayload;
    const product = await prisma.product.findUnique({
      where: { id: payload.productId },
    });

    if (!product) {
      return Response({
        message: "Produk tidak ditemukan",
        status: 404,
        isSuccess: false,
      });
    }

    // Cek apakah sudah ada entry checkout untuk produk ini oleh user ini
    const existingCheckout = await prisma.checkout.findFirst({
      where: {
        productId: payload.productId,
        userId,
      },
    });

    if (existingCheckout) {
      // Update qty
      await prisma.checkout.update({
        where: { id: existingCheckout.id },
        data: {
          qty: existingCheckout.qty + payload.qty,
        },
      });
    } else {
      // Tambahkan entry baru
      await prisma.checkout.create({
        data: {
          productId: payload.productId,
          userId,
          qty: payload.qty,
          pricePerItem: product.price,
        },
      });
    }

    return Response({
      message: "success add checkout transaction",
      isSuccess: true,
      status: 201,
    });
  } catch (error: any) {
    console.log(
      "error api in api/transaction/checkouts/route.ts method: POST",
      error.message
    );
    return Response({
      message: "failed add checkout transaction",
      data: error.message || "Internal server error",
      status: 500,
      isSuccess: false,
    });
  }
}

export async function PATCH(req: NextRequest) {
  const { qty, productId } = (await req.json()) as CheckoutPayload;
  const session = await getServerSession(authOptions);
  // Jika user belum login
  const userId = session?.user?.id as string;
  const checkout = await prisma.checkout.update({
    where: {
      userId_productId: {
        userId: userId!,
        productId: productId!,
      },
    },
    data: {
      qty,
    },
  });

  return Response({
    data: checkout,
    message: "Berhasil update jumlah checkout",
    isSuccess: true,
  });
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    const body = await req.json();
    const { ids, id } = body as { ids?: string[]; id?: string };

    if (!ids && !id) {
      return Response({
        message: "ID tidak ditemukan di body request",
        isSuccess: false,
      });
    }

    // Single delete
    if (id) {
      await prisma.checkout.deleteMany({
        where: {
          id,
          userId,
        },
      });
    }

    // Bulk delete
    if (ids && Array.isArray(ids)) {
      await prisma.checkout.deleteMany({
        where: {
          id: { in: ids },
          userId,
        },
      });
    }

    return Response({
      message: "Berhasil menghapus item checkout",
      isSuccess: true,
    });
  } catch (error: any) {
    console.error("Gagal bulk delete checkout:", error.message);
    return Response({
      message: "Gagal menghapus item",
      status: 500,
      isSuccess: false,
    });
  }
}
