"use client";
import { useRouter } from "next/navigation";

// components
import { Button } from "@/components/ui/button";

// utils
import { cn, copyToClipboard, formatDate, formatNumber } from "@/lib/utils";
import { hover } from "@/lib/hover";
import { History } from "@/types/transaction";
import CommonStatus from "../common/status/common-status";
import Link from "next/link";
import { useState } from "react";

interface ProductHistoryProps {
  items: History;
}

const ProductHistory: React.FC<ProductHistoryProps> = ({
  items,
}: ProductHistoryProps) => {
  const router = useRouter();
  const mainProduct = items;
  const [copiedTrxId, setCopiedTrxId] = useState(false);

  const handleCopyClipboardTrxId = (payload: string) => {
    setCopiedTrxId(true);
    copyToClipboard(payload);
    setTimeout(() => setCopiedTrxId(false), 1500);
  };

  return (
    <>
      <div className="w-[100%]">
        <div className="mt-6">
          <div className="border rounded-xl p-4 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3>
                #<span>{mainProduct.id}</span>
                <Button
                  size={"sm"}
                  className={cn(
                    "bg-white border border-leaf text-leaf ml-2 h-6",
                    hover.shadow
                  )}
                  onClick={() => handleCopyClipboardTrxId(mainProduct.id)}
                >
                  {copiedTrxId ? "Disalin!" : "Salin"}
                </Button>
              </h3>
              <Link
                href={`/payment?trx_id=${mainProduct.id}`}
                className="hidden lg:block"
              >
                <Button size={"sm"} variant={"outline"}>
                  Bayar Sekarang
                </Button>
              </Link>
            </div>
            <div className="flex lg:flex-row flex-col gap-6">
              <div className="flex-1 flex flex-col gap-1">
                <div className="text-lg font-semibold text-text-black">
                  {mainProduct.receiverName}
                </div>
                <div className="text-sm text-text-black">
                  Total Produk: {mainProduct.items.length}
                </div>
              </div>
              <div className="flex lg:flex-row flex-col w-auto">
                <div className="lg:w-[226px] w-[100%] flex flex-col gap-2 lg:border-r">
                  <div className="flex gap-4 items-baseline">
                    <div className="text-sm">
                      {formatDate({
                        date: mainProduct.createdAt,
                        show: "dateOnly",
                      })}
                    </div>
                    <CommonStatus status={mainProduct.status} />
                  </div>
                  <div>Pengiriman: {mainProduct.method}</div>
                </div>
                <div className="lg:w-[172px] w-[100%] lg:pl-[22px] lg:pr-[13px] flex flex-col gap-1">
                  <div className="font-medium">Total Belanja</div>
                  <div className="font-semibold">
                    Rp {formatNumber(mainProduct.totalAmount)}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="lg:w-[172px] w-[100%] flex lg:flex-row flex-col-reverse gap-y-3">
                <Link
                  href={`/history/${mainProduct.id}/detail`}
                  className="w-[100%]"
                >
                  <Button
                    className={cn(
                      "flex-1 lg:ml-[9px] lg:mr-4 bg-leaf w-[100%]",
                      hover.shadow
                    )}
                  >
                    Lihat Detail
                  </Button>
                </Link>
                <Link
                  href={`/payment?trx_id=${mainProduct.id}`}
                  className="block lg:hidden w-[100%]"
                >
                  <Button size={"sm"} variant={"outline"} className="w-[100%]">
                    Bayar Sekarang
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductHistory;
