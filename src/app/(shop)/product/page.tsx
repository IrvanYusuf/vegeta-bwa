"use client";
import Link from "next/link";
import React, { useState } from "react";

// components
import FilterCategory from "@/components/filter/filter-category";
import FilterPrice from "@/components/filter/filter-price";
import FilterRating from "@/components/filter/filter-rating";
import NoData from "./no-data";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductShowcase } from "@/components/product/product-showcase";
import CommonPagination from "@/components/common/common-pagination";
import ProductSkeleton from "@/components/product/product-skeleton";

// utils
import { cn } from "@/lib/utils";
import { hover } from "@/lib/hover";
import { LIMIT } from "@/lib/constants";

// service
import { useGetAllProductsQuery } from "@/service/product.service";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import FilterMobileDevice from "@/components/filter/filter-mobile-device";

export default function Products() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pageFromUrl = parseInt(searchParams.get("page") || "1");
  const [activePage, setActivePage] = useState(pageFromUrl);

  // categories state
  const categories = searchParams.get("categories") || undefined;
  const selectedCategories = categories?.split(",") || [];

  // ratings state
  const ratings = searchParams.get("ratings") || undefined;
  const selectedratings = ratings?.split(",") || [];

  // price state
  const min_price = searchParams.get("min_price") || undefined;
  const max_price = searchParams.get("max_price") || undefined;

  const {
    data: productsResponse,
    isLoading,
    isFetching,
  } = useGetAllProductsQuery({
    page: activePage,
    limit: LIMIT,
    categories,
    ratings,
    min_price,
    max_price,
  });

  const products = productsResponse?.data || [];
  const totalPage = productsResponse?.meta?.totalPage || 1;

  // recommend product (no filter)
  const {
    data: productRecommendation,
    isLoading: isLoadingProductRecommendation,
  } = useGetAllProductsQuery({});

  const handlePageChange = (page: number) => {
    setActivePage(page);

    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("page", page.toString());
    router.push(`?${newParams.toString()}`);
  };

  // function to filter category
  const handleFilterCategory = (category: string) => {
    const newParams = new URLSearchParams(searchParams.toString());

    // Ambil semua kategori yang sudah dipilih
    const existing = newParams.get("categories")?.split(",") || [];

    let updated: string[] = [];

    if (existing.includes(category)) {
      // Hapus jika sudah ada (toggle)
      updated = existing.filter((item) => item !== category);
    } else {
      // Tambah kategori baru
      updated = [...existing, category];
    }

    if (updated.length > 0) {
      newParams.set("categories", updated.join(","));
    } else {
      newParams.delete("categories");
    }

    // Reset page ke 1 kalau filter berubah
    newParams.set("page", "1");

    const rawParams = newParams.toString().replaceAll("%2C", ",");
    router.push(`${pathname}?${rawParams}`);
  };

  // function to filter rating
  const handleFilterRating = (rating: number) => {
    const newParams = new URLSearchParams(searchParams.toString());

    // Ambil semua kategori yang sudah dipilih
    const existing = newParams.get("ratings")?.split(",") || [];

    let updated: string[] = [];

    if (existing.includes(rating.toString())) {
      updated = existing.filter((item) => item !== rating.toString());
    } else {
      updated = [...existing, rating.toString()];
    }

    if (updated.length > 0) {
      newParams.set("ratings", updated.join(","));
    } else {
      newParams.delete("ratings");
    }

    // Reset page ke 1 kalau filter berubah
    newParams.set("page", "1");

    const rawParams = newParams.toString().replaceAll("%2C", ",");
    router.push(`${pathname}?${rawParams}`);
  };

  // function to filter max price and min price
  const handleFilterPrice = (min?: number, max?: number) => {
    const newParams = new URLSearchParams(searchParams.toString());

    if (min !== undefined) {
      newParams.set("min_price", min.toString());
    } else {
      newParams.delete("min_price");
    }

    if (max !== undefined) {
      newParams.set("max_price", max.toString());
    } else {
      newParams.delete("max_price");
    }

    if (max === 0) {
      newParams.delete("max_price");
    }
    if (min === 0) {
      newParams.delete("min_price");
    }

    newParams.set("page", "1");

    const rawParams = newParams.toString().replaceAll("%2C", ",");
    router.push(`${pathname}?${rawParams}`);
  };

  return (
    <main className="flex flex-col w-full min-h-screen items-center pb-8 lg:px-0 px-2">
      <div className="lg:w-content w-[100%] flex pt-5 gap-6">
        <div className="flex-[1] hidden lg:block border border-gray-300 rounded-xl py-6 px-4 h-fit">
          <div className="text-2xl font-semibold">Filter</div>
          <div className="w-full separator my-4" />
          <FilterCategory
            handleFilterCategory={handleFilterCategory}
            selectedCategories={selectedCategories}
          />
          <div className="w-full separator my-4" />
          <FilterPrice
            onPriceChange={handleFilterPrice}
            maxPrice={max_price}
            minPrice={min_price}
          />
          <div className="w-full separator my-4" />
          <FilterRating
            handleFilterRating={handleFilterRating}
            selectedRatings={selectedratings}
          />
        </div>

        <div className="flex-[3]">
          <>
            <div className="flex justify-between items-center mb-6">
              <div className="text-leaf md:text-3xl font-semibold">
                Daftar Produk
              </div>
              {/* laptop breakpoints */}
              <div className="hidden lg:flex items-center gap-2">
                <div className="hidden md:block">Urut Berdasarkan</div>
                <Select defaultValue={"harga-terendah"}>
                  <SelectTrigger
                    className={cn("w-[234px] bg-white", hover.shadow)}
                  >
                    <SelectValue placeholder="Urut Berdasarkan" />
                  </SelectTrigger>
                  <SelectContent className="w-[234px]">
                    <SelectGroup>
                      <SelectItem value="harga-terendah">
                        Harga Terendah
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              {/* mobile breakpoints */}
              <div className="flex lg:hidden">
                <FilterMobileDevice
                  handleFilterCategory={handleFilterCategory}
                  selectedCategories={selectedCategories}
                  onPriceChange={handleFilterPrice}
                  maxPrice={max_price}
                  minPrice={min_price}
                  handleFilterRating={handleFilterRating}
                  selectedRatings={selectedratings}
                />
              </div>
            </div>
            {products.length === 0 && !isLoading ? (
              <NoData />
            ) : isLoading || isFetching ? (
              <ProductSkeleton
                gridConfig={"grid-cols-2 md:grid-cols-3"}
                length={10}
              />
            ) : (
              <>
                <ProductShowcase
                  gridConfig={"grid-cols-2 md:grid-cols-3"}
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
          </>
        </div>
      </div>

      <div className="w-[100%] lg:w-content separator lg:mt-14 mt-12 lg:my-6 mb-8" />

      <div className="w-[100%] lg:w-content">
        <div className="flex justify-between mb-6 items-center">
          <div className="text-leaf md:text-3xl font-semibold">
            Kamu mungkin sukai
          </div>
          <Link
            href={"/product"}
            className="text-base p-0 h-auto bg-white text-neutral-600"
          >
            Lihat Selengkapnya {">"}
          </Link>
        </div>
        {isLoadingProductRecommendation ? (
          <ProductSkeleton
            gridConfig={"grid-cols-2 md:grid-cols-3 lg:grid-cols-4"}
            length={10}
          />
        ) : (
          <ProductShowcase
            gridConfig={"grid-cols-2 md:grid-cols-3 lg:grid-cols-4"}
            products={productRecommendation?.data || []}
          />
        )}
      </div>
    </main>
  );
}
