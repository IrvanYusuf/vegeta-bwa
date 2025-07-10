"use client";
import Image from "next/legacy/image";
import Link from "next/link";

// components
import { Button } from "@/components/ui/button";
import { IconCart } from "@/components/icons";
import LogoBCA from "@/assets/images/logo-bca.png";

// utils
import { cn, copyToClipboard, formatDate, formatNumber } from "@/lib/utils";
import { hover } from "@/lib/hover";
import { useSearchParams } from "next/navigation";
import { useGetPaymentQuery } from "@/service/transaction.service";
import Countdown from "react-countdown";
import { useState } from "react";

const Completionist = () => <span>You payment expired!</span>;
const renderer = ({
  hours,
  minutes,
  seconds,
  completed,
}: {
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}) => {
  if (completed) {
    // Render a completed state
    return <Completionist />;
  } else {
    // Render a countdown
    return (
      <span>
        {hours}:{minutes}:{seconds}
      </span>
    );
  }
};

export default function Checkout() {
  const searchParams = useSearchParams();
  const trxId = searchParams.get("trx_id");

  const { data, isLoading } = useGetPaymentQuery({ id: trxId as string });
  const [copiedAmount, setCopiedAmount] = useState(false);
  const [copiedVA, setCopiedVA] = useState(false);

  const handleCopyClipboardAmount = (payload: any, type: string = "amount") => {
    if (type === "amount") {
      setCopiedAmount(true);
      copyToClipboard(payload || 0);
      setTimeout(() => setCopiedAmount(false), 1500);
      return;
    }
    setCopiedVA(true);
    copyToClipboard(payload || 0);
    setTimeout(() => setCopiedVA(false), 1500);
  };

  return (
    <main className="flex flex-col w-full items-center pb-16 pt-5">
      <div className="lg:w-content w-[100%] flex flex-col items-center">
        <div className="lg:w-[776px] w-[100%] flex flex-col items-center">
          <div className="lg:w-[658px] w-[100%] my-4 font-medium text-xl text-leaf text-center">
            Silahkan lakukan pembayaran dengan detail sebagai berikut
          </div>
          <div className="lg:p-14 p-4 border rounded-xl w-[100%] flex flex-col gap-6">
            <div className="flex gap-3 items-center">
              <div className="w-[77px] h-[62px] relative">
                <Image src={LogoBCA} layout="fill" alt="" objectFit="contain" />
              </div>
              <div className="font-medium text-xl">Bank Central Asia</div>
            </div>
            <div className="flex flex-col gap-2">
              <div>No. Virtual Account</div>
              <div className="p-6 bg-gray-100 rounded-lg text-lg text-medium flex justify-between items-center">
                1234 • 1234 • 12345 • 12345
                <Button
                  className={cn(
                    "bg-white border border-leaf text-leaf",
                    hover.shadow
                  )}
                  onClick={() =>
                    handleCopyClipboardAmount(
                      "1234 • 1234 • 12345 • 12345",
                      "va"
                    )
                  }
                >
                  {copiedVA ? "Disalin!" : "Salin"}
                </Button>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div>Nominal Transfer</div>
              <div className="p-6 bg-gray-100 rounded-lg text-lg text-medium flex justify-between items-center">
                Rp {formatNumber(data?.data?.totalAmount || 0)}
                <Button
                  className={cn(
                    "bg-white border border-leaf text-leaf",
                    hover.shadow
                  )}
                  onClick={() =>
                    handleCopyClipboardAmount(data?.data?.totalAmount)
                  }
                >
                  {copiedAmount ? "Disalin!" : "Salin"}
                </Button>
              </div>
            </div>
            <div className="text-sm">
              <p className="font-medium mb-1">ID Transaksi</p>
              <p>#{data?.data?.id || ""}</p>
            </div>
            <div className="w-[100%] flex flex-col items-center">
              <div>Batas Pembayaran</div>
              {data?.data?.paymentDue ? (
                <div className="text-4xl font-semibold my-4 text-red-400">
                  <Countdown date={data.data.paymentDue} renderer={renderer} />
                </div>
              ) : (
                <div className="text-sm text-gray-500">
                  Menunggu data pembayaran...
                </div>
              )}
              {data?.data?.paymentDue ? (
                <div className="text-lg">
                  {formatDate({ date: data.data.paymentDue })}
                </div>
              ) : (
                <div className="text-sm text-gray-500">
                  Menunggu data pembayaran...
                </div>
              )}

              <Link className="w-[100%] mt-16" href={"/product"}>
                <Button className={cn("w-[100%] h-12 bg-leaf", hover.shadow)}>
                  <IconCart className="w-6 h-6" />
                  <div className="ml-4 text-base">Lanjut berbelanja</div>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
