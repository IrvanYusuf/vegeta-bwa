"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { hover } from "@/lib/hover";
import { cn } from "@/lib/utils";
import {
  useGetAllProductsQuery,
  useGetProductFavoriteQuery,
} from "@/service/product.service";
import { useState } from "react";
import NoData from "../product/no-data";
import ProductSkeleton from "@/components/product/product-skeleton";
import { ProductShowcase } from "@/components/product/product-showcase";
import CommonPagination from "@/components/common/common-pagination";
import { useRouter, useSearchParams } from "next/navigation";

const WishlistPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageFromUrl = parseInt(searchParams.get("page") || "1");
  const createdAt = searchParams.get("orderBy") || "desc";
  const [activePage, setActivePage] = useState(pageFromUrl);
  const {
    data: wishlistResponse,
    isLoading,
    isFetching,
  } = useGetProductFavoriteQuery({ createdAt, page: activePage });

  const products = wishlistResponse?.data || [];
  const totalPage = wishlistResponse?.meta?.totalPage || 1;

  const handlePageChange = (page: number) => {
    setActivePage(page);

    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("page", page.toString());
    router.push(`?${newParams.toString()}`);
  };

  const handleFilterOrderBy = (orderBy: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("orderBy", orderBy.toString());
    router.push(`?${newParams.toString()}`);
  };
  return (
    <main className="flex flex-col w-[100%] min-h-screen items-center pb-8 lg:px-0 px-2">
      <div className="lg:w-content w-[100%] flex flex-col pt-5">
        <div className="flex justify-between w-[100%] items-center mb-6">
          <div className="text-leaf md:text-3xl font-semibold">
            Daftar Wishlist
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden lg:block">Urut Berdasarkan</div>
            <Select defaultValue={"desc"} onValueChange={handleFilterOrderBy}>
              <SelectTrigger className={cn("w-[234px] bg-white", hover.shadow)}>
                <SelectValue placeholder="Urut Berdasarkan" />
              </SelectTrigger>
              <SelectContent className="w-[234px]">
                <SelectGroup>
                  <SelectItem value="desc">Terbaru Disimpan</SelectItem>
                  <SelectItem value="asc">Terlama Disimpan</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        {products.length === 0 && !isLoading ? (
          <NoData />
        ) : isLoading || isFetching ? (
          <ProductSkeleton
            gridConfig={"grid-cols-2 lg:grid-cols-4"}
            length={10}
          />
        ) : (
          <>
            <ProductShowcase
              gridConfig={"grid-cols-2 lg:grid-cols-4"}
              products={products || []}
            />
            <div className="py-12">
              <CommonPagination
                page={activePage}
                total={totalPage}
                onChange={handlePageChange}
              />
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default WishlistPage;
