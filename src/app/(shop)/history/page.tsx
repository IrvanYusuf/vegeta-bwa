"use client";
import { useState } from "react";
import Image from "next/legacy/image";

// components
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProductHistory from "@/components/product-history/product-history";
import CommonPagination from "@/components/common/common-pagination";
import ProductHistorySkeleton from "@/components/product-history/product-history-skeleton";
import NoData from "../product/no-data";

// utils
import { hover } from "@/lib/hover";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";

// assets
import GoldBadge from "@/assets/images/badge-gold.png";

// services
import { useGetHistorysQuery } from "@/service/transaction.service";
import { useRouter, useSearchParams } from "next/navigation";

export default function History() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const createdAt = searchParams.get("orderBy") || "desc";
  const pageFromUrl = parseInt(searchParams.get("page") || "1");
  const [activePage, setActivePage] = useState(pageFromUrl);

  const {
    data: historyTransactions,
    isLoading,
    isFetching,
  } = useGetHistorysQuery({ createdAt, page: activePage });
  const router = useRouter();

  const handleFilterOrderBy = (orderBy: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("orderBy", orderBy.toString());
    router.push(`?${newParams.toString()}`);
  };

  const handlePageChange = (page: number) => {
    setActivePage(page);

    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("page", page.toString());
    router.push(`?${newParams.toString()}`);
  };
  return (
    <main className="flex flex-col w-full min-h-screen items-center pb-8">
      <div className="w-[100%] lg:w-content flex lg:flex-row flex-col gap-6">
        <div className="m-5 p-5 flex flex-col flex-[1] border rounded-xl items-center gap-2 ">
          <div className="flex justify-center pt-3 pb-2">
            <div className="w-[71px] h-[71px] rounded-[20px] relative overflow-hidden">
              <Image
                src={`https://ui-avatars.com/api/?name=${session?.user.name}&background=random`}
                layout="fill"
                alt=""
                objectFit="cover"
              />
            </div>
          </div>
          <div className="font-semibold">{session?.user.name}</div>
          <div className="flex items-center justify-center">
            <div className="w-[14px] h-[20px] relative mr-2">
              <Image src={GoldBadge} layout="fill" alt="" objectFit="cover" />
            </div>
            <span>Member Gold</span>
          </div>
          <div className="w-[100%] separator mt-3" />
          <div className="w-[100%] gap-3 flex flex-col">
            <div className="mt-6">
              <div>Transaksi bulan ini</div>
              <div className="text-[20px] font-bold">120 x</div>
            </div>
            <div className="">
              <div>Belanja bulan ini</div>
              <div className="text-[20px] font-bold text-leaf">
                Rp 1.300.000
              </div>
            </div>
            <div className="mt-3">
              <div>Saldo saat ini</div>
              <div className="text-[20px] font-bold text-carrot">
                Rp 300.000
              </div>
            </div>
          </div>
          <div className="w-[100%] separator mt-6 mb-3" />
        </div>
        <div className="m-5 flex-[3]">
          <div className="flex lg:flex-row flex-col justify-between">
            <div className="text-leaf text-3xl font-semibold">
              Riwayat Belanja
            </div>
            <div className="flex items-center gap-2 lg:mt-0 mt-3">
              <div>Urut Berdasarkan</div>
              <Select
                defaultValue={createdAt}
                onValueChange={handleFilterOrderBy}
              >
                <SelectTrigger
                  className={cn("w-[234px] bg-white", hover.shadow)}
                >
                  <SelectValue placeholder="Urut Berdasarkan" />
                </SelectTrigger>
                <SelectContent className="w-[234px]">
                  <SelectGroup>
                    <SelectItem value="desc">Transaksi terbaru</SelectItem>
                    <SelectItem value="asc">Transaksi lama</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          {isLoading || isFetching ? (
            Array.from({ length: 5 }).map((_, index) => (
              <ProductHistorySkeleton key={index} />
            ))
          ) : historyTransactions?.data &&
            historyTransactions.data.length > 0 ? (
            historyTransactions.data.map((transaction) => (
              <ProductHistory
                key={`productHistory${transaction.id}`}
                items={transaction}
              />
            ))
          ) : (
            <NoData desc="Belum ada transaksi yang dilakukan." />
          )}

          <div className="pt-4">
            {historyTransactions?.meta.totalPage! > 1 && (
              <CommonPagination
                page={activePage}
                total={historyTransactions?.meta.totalPage}
                onChange={handlePageChange}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
