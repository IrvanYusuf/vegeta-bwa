import Response from "@/lib/api.response";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { CreateTransactionPayload } from "@/types/transaction";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

const paymentDue = new Date();
paymentDue.setHours(paymentDue.getHours() + 24);
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    const body = (await req.json()) as CreateTransactionPayload;

    if (!userId) {
      return Response({ message: "Unauthorized", status: 401 });
    }

    if (!body.items || !Array.isArray(body.items) || body.items.length === 0) {
      return Response({ message: "No items provided", status: 400 });
    }

    const totalAmount =
      body.items.reduce(
        (total: number, item: any) => total + item.qty * item.pricePerItem,
        0
      ) +
      body.deliveryFee +
      body.insuranceFee +
      body.applicationFee;

    const transaction = await prisma.transaction.create({
      data: {
        userId,
        deliveryFee: body.deliveryFee,
        insuranceFee: body.insuranceFee,
        applicationFee: body.applicationFee,
        totalAmount,
        method: body.method,
        receiverName: body.receiverName ?? session.user.name,
        phoneNumber: body.phoneNumber,
        address: body.address,
        province: body.province,
        city: body.city,
        district: body.district,
        postalCode: body.postalCode,
        paymentDue,
        items: {
          create: body.items.map((item) => ({
            productId: item.productId,
            qty: item.qty,
            pricePerItem: item.pricePerItem,
          })),
        },
      },
    });

    await Promise.all(
      body.items.map((item) =>
        prisma.product.update({
          where: { id: item.productId },
          data: {
            itemSold: {
              increment: item.qty,
            },
          },
        })
      )
    );

    await prisma.checkout.deleteMany({
      where: {
        userId,
        productId: {
          in: body.items.map((item) => item.productId),
        },
      },
    });

    return Response({
      message: "Transaksi berhasil dibuat",
      data: transaction,
    });
  } catch (error: any) {
    console.error(
      "Gagal create payment in api/transaction/payments method:POST:",
      error.message
    );
    return Response({
      message: "Gagal menghapus item",
      status: 500,
      isSuccess: false,
    });
  }
}
