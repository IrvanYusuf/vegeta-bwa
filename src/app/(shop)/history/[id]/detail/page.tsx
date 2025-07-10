"use client";
import CommonStatus from "@/components/common/status/common-status";
import {
  CardCustomerInformationSkeleton,
  CardProductHistorySkeleton,
} from "@/components/history/card-history-skeleton";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { formatNumber } from "@/lib/utils";
import { useGetDetailHistoryQuery } from "@/service/transaction.service";
import {
  Building,
  Globe,
  Landmark,
  Mail,
  MapPin,
  Phone,
  ShoppingBag,
  User,
} from "lucide-react";
import Image from "next/image";

const DetailHistoryPage = ({ params }: { params: { id: string } }) => {
  const { data: detailTransaction, isLoading } = useGetDetailHistoryQuery({
    id: params.id,
  });

  const subTotal = detailTransaction?.data.items.reduce(
    (total: number, item: any) => total + item.qty * item.pricePerItem,
    0
  );
  return (
    <main className="flex flex-col w-[100%] pb-16 px-2">
      <div className="lg:w-content w-[100%] flex flex-col">
        <div className="lg:p-5">
          <div className="flex lg:flex-row flex-col-reverse lg:items-center justify-between">
            <h3 className="text-2xl font-bold">Your Detail Order</h3>
            <div className="flex items-center gap-x-3 mb-3 lg:mb-0">
              {isLoading ? (
                <Skeleton className="w-[100px] h-[20px]" />
              ) : (
                <Badge variant={"outline"} className="py-1">
                  {detailTransaction?.data.method}
                </Badge>
              )}

              {isLoading ? (
                <Skeleton className="w-[100px] h-[20px]" />
              ) : (
                <CommonStatus
                  status={detailTransaction?.data.status!}
                  className="py-1"
                />
              )}
            </div>
          </div>
          <div className="mt-2">
            <h4>Order ID: {params.id}</h4>
            <span className="text-slate-400">
              Terimakasih. Pesanan anda telah dikonfirmasi
            </span>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-6 mt-8 w-[100%]">
              <div className="lg:col-span-2 col-span-1 border p-4 rounded-lg">
                {isLoading
                  ? Array.from({ length: 3 }).map((_, index) => (
                      <CardProductHistorySkeleton key={index} />
                    ))
                  : detailTransaction?.data.items.map((transaction) => (
                      <div
                        className="flex lg:flex-row flex-col lg:items-center justify-between"
                        key={transaction.id}
                      >
                        <div className="flex items-center gap-4">
                          {/* Gambar */}
                          <div className="w-[80px] h-[80px] flex items-center justify-center">
                            <Image
                              src="/vegetables.jpeg"
                              width={80}
                              height={80}
                              alt="produk"
                              className="object-contain"
                            />
                          </div>

                          {/* Teks (category + name) */}
                          <div className="flex flex-col items-start">
                            <span className="text-sm text-muted-foreground uppercase">
                              {transaction.product?.category || "-"}
                            </span>
                            <span className="text-base font-semibold">
                              {transaction.product?.name || "-"}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-x-10">
                          <div className="flex items-center gap-x-2">
                            <h5>Rp {formatNumber(transaction.pricePerItem)}</h5>
                            <h3>x {transaction.qty}</h3>
                          </div>
                          <h3 className="textxl">
                            Rp{" "}
                            {formatNumber(
                              transaction.pricePerItem * transaction.qty
                            )}
                          </h3>
                        </div>
                      </div>
                    ))}
              </div>
              <div className="lg:col-span-1 mt-6 lg:mt-0 col-span-1 border p-4 rounded-lg">
                <h3 className="text-xl font-bold">Customer</h3>
                {isLoading ? (
                  <CardCustomerInformationSkeleton length={5} />
                ) : (
                  <div className="mt-3">
                    <div className="flex items-center gap-x-2">
                      <User />
                      <span>{detailTransaction?.data.user?.name || "-"}</span>
                    </div>
                    <div className="flex items-center gap-x-2 mt-3">
                      <ShoppingBag />
                      <span>{detailTransaction?.data.items.length || []}</span>
                    </div>
                    <div className="flex items-center gap-x-2 mt-3">
                      <Mail />
                      <span>{detailTransaction?.data.user?.email || "-"}</span>
                    </div>
                    <div className="flex items-center gap-x-2 mt-3">
                      <Phone />
                      <span>{detailTransaction?.data.phoneNumber || "-"}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-6 mt-6 w-[100%]">
              <div className="lg:col-span-2 order-3 lg:order-1 mt-6 lg:mt-0 col-span-1 border p-4 rounded-lg">
                <h3 className="text-xl font-bold">Ringkasan Belanja</h3>
                {isLoading ? (
                  <CardCustomerInformationSkeleton
                    length={6}
                    className="justify-between"
                  />
                ) : (
                  <div className="mt-3 flex flex-col gap-y-4">
                    <div className="flex items-center justify-between">
                      <h5>Subtotal</h5>
                      <h5 className="font-semibold">
                        Rp {formatNumber(subTotal || 0)}
                      </h5>
                    </div>
                    <div className="flex items-center justify-between">
                      <h5>Biaya Asuransi</h5>
                      <h5 className="font-semibold">
                        Rp{" "}
                        {formatNumber(
                          detailTransaction?.data.insuranceFee || 0
                        )}
                      </h5>
                    </div>
                    <div className="flex items-center justify-between">
                      <h5>Biaya Pengiriman</h5>
                      <h5 className="font-semibold">
                        Rp{" "}
                        {formatNumber(detailTransaction?.data.deliveryFee || 0)}
                      </h5>
                    </div>
                    <div className="flex items-center justify-between">
                      <h5>Biaya Aplikasi</h5>
                      <h5 className="font-semibold">
                        Rp{" "}
                        {formatNumber(
                          detailTransaction?.data.applicationFee || 0
                        )}
                      </h5>
                    </div>
                    <hr className="h-[2px] w-full bg-slate-200" />
                    <div className="flex items-center justify-between">
                      <h5 className="text-lg font-bold">Total</h5>
                      <h5 className="font-semibold text-lg">
                        Rp{" "}
                        {formatNumber(detailTransaction?.data.totalAmount || 0)}
                      </h5>
                    </div>
                  </div>
                )}
              </div>
              <div className="lg:col-span-1 order-2 col-span-1 border p-4 rounded-lg">
                <h3 className="text-xl font-bold">Alamat Pengiriman</h3>
                <div className="mt-3">
                  {isLoading ? (
                    <CardCustomerInformationSkeleton length={6} />
                  ) : (
                    <div>
                      <div className="flex items-center gap-x-2">
                        <User />
                        <span>
                          {detailTransaction?.data.receiverName || "-"}
                        </span>
                      </div>
                      <div className="flex items-center gap-x-2 mt-3">
                        <Globe />
                        <span>{detailTransaction?.data.province || "-"}</span>
                      </div>
                      <div className="flex items-center gap-x-2 mt-3">
                        <Building />
                        <span>{detailTransaction?.data.city || "-"}</span>
                      </div>
                      <div className="flex items-center gap-x-2 mt-3">
                        <Landmark />
                        <span>{detailTransaction?.data.district || "-"}</span>
                      </div>
                      <div className="flex items-center gap-x-2 mt-3">
                        <Mail />
                        <span>{detailTransaction?.data.postalCode || "-"}</span>
                      </div>
                      <div className="flex items-center gap-x-2 mt-3">
                        <MapPin />
                        <span>{detailTransaction?.data.address || "-"}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DetailHistoryPage;
