"use client";
import { useState } from "react";
import Image from "next/legacy/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

// components
import { Button } from "@/components/ui/button";
import { IconBag, IconCart, IconStar } from "@/components/icons";
import { ProductShowcase } from "@/components/product/product-showcase";
import CommonStepper from "@/components/common/common-stepper";
import { Skeleton } from "@/components/ui/skeleton";
import ProductSkeleton from "@/components/product/product-skeleton";
import { useToast } from "@/components/ui/use-toast";
import NoData from "@/app/(shop)/product/no-data";

// utils
import { cn, formatNumber, truncate } from "@/lib/utils";
import { hover } from "@/lib/hover";
import { CheckoutPayload } from "@/types/transaction";

// services
import { useGetDetailProductQuery } from "@/service/product.service";
import { useCheckoutMutation } from "@/service/transaction.service";
import { Loader } from "lucide-react";

const ProductDetailPage = ({ id }: { id: string }) => {
  const [showMore, setShowMore] = useState<boolean>(false);
  const router = useRouter();
  const [itemCount, setItemCount] = useState(1);

  const { toast } = useToast();

  const { data: productDetails, isLoading } = useGetDetailProductQuery({
    id: id,
  });

  const { data: session } = useSession();

  // mutate add to cart/checkout
  const [mutateCheckout, { isLoading: isLoadingMutateCheckout, error }] =
    useCheckoutMutation();

  const handleAddToCart = async () => {
    if (!session) {
      router.push("/auth/signin");
      return;
    }

    try {
      const payload: CheckoutPayload = {
        productId: id,
        qty: itemCount,
      };

      await mutateCheckout(payload);
      toast({
        title: "Berhasil",
        description: "Produk ditambahkan ke checkout!",
        variant: "success",
      });
    } catch (error: any) {
      console.log(error);
      toast({
        title: "Gagal",
        description: "Terjadi kesalahan saat menambahkan ke favorit.",
        variant: "destructive",
      });
    }
  };

  return (
    <main className="flex flex-col w-[100%] min-h-screen lg:px-0 px-2 items-center pb-8">
      <div className="w-[100%] lg:w-content flex flex-col lg:flex-row pt-5 gap-12">
        <div className="border p-2 rounded-xl">
          <div className="w-[100%] lg:w-[376px] h-[376px] relative">
            {isLoading || !productDetails?.data.product ? (
              <Skeleton className="h-[100%] w-[100%] rounded-xl" />
            ) : (
              <Image
                src={productDetails.data.product.image}
                layout="fill"
                alt={productDetails.data.product.name}
                objectFit="contain"
              />
            )}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="text-leaf font-semibold">
            {isLoading ? (
              <Skeleton className="h-4 w-[100px]" />
            ) : (
              productDetails?.data?.product.category || ""
            )}
          </div>
          <div className="text-4xl font-semibold">
            {isLoading ? (
              <Skeleton className="h-8 w-[150px]" />
            ) : (
              productDetails?.data?.product.name || ""
            )}
          </div>
          <div className="flex gap-2">
            <IconStar className="w-5 h-5" stroke="carrot" fill="carrot" />
            <span>{productDetails?.data?.product.rating || 0}</span>
            <span>|</span>
            <span>{productDetails?.data?.product.itemSold || 0} terjual</span>
          </div>
          <div className="text-4xl font-semibold">
            Rp {formatNumber(productDetails?.data?.product.price || 0)} /{" "}
            <span className="text-2xl">
              {productDetails?.data.product.unit}
            </span>
          </div>
          <div className="text-gray-400 text-justify">
            {isLoading ? (
              <Skeleton className="h-28 w-[100%]" />
            ) : (
              <>
                <div className="lg:block hidden">
                  {showMore
                    ? (productDetails?.data.product.description as string)
                    : truncate(
                        productDetails?.data.product.description as string,
                        500
                      )}
                  <div
                    onClick={() => setShowMore(!showMore)}
                    className="cursor-pointer"
                  >
                    show {showMore ? "less" : "more"}
                  </div>
                </div>
                <div className="lg:hidden block">
                  {showMore
                    ? (productDetails?.data.product.description as string)
                    : truncate(
                        productDetails?.data.product.description as string,
                        100
                      )}
                  <div
                    onClick={() => setShowMore(!showMore)}
                    className="cursor-pointer"
                  >
                    show {showMore ? "less" : "more"}
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="flex md:flex-row flex-col gap-4 items-center">
            <CommonStepper
              count={itemCount}
              onChange={(count) => setItemCount(count)}
            />
            <Button
              onClick={handleAddToCart}
              className={cn(
                "py-1 px-4 bg-leaf text-white leading-4",
                hover.shadow
              )}
              disabled={isLoadingMutateCheckout || isLoading}
            >
              {isLoading || isLoadingMutateCheckout ? (
                <>
                  <Loader className="animate-spin mr-2" />
                  Masukkan Keranjang
                </>
              ) : (
                <>
                  <IconCart className="w-5 h-5 mr-2" />
                  Masukkan Keranjang
                </>
              )}
            </Button>
            <Button
              className={cn(
                "py-1 px-4 bg-carrot text-white leading-4",
                hover.shadow
              )}
              onClick={handleAddToCart}
              disabled={isLoadingMutateCheckout || isLoading}
            >
              {isLoadingMutateCheckout || isLoading ? (
                <>
                  <Loader className="animate-spin mr-2" />
                  Beli Sekarang
                </>
              ) : (
                <>
                  <IconBag className="w-5 h-5 mr-2" />
                  Beli Sekarang
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
      <div className="w-[100%] lg:w-content separator my-6" />
      <div className="w-[100%] lg:w-content">
        <div className="flex justify-between mb-6 items-center">
          <div className="text-leaf md:text-3xl font-semibold">
            Rekomendasi buat kamu
          </div>
          <Link
            href={"/product"}
            className="text-base p-0 h-auto bg-white text-neutral-600"
          >
            Lihat Selengkapnya {">"}
          </Link>
        </div>
        {isLoading ? (
          <ProductSkeleton
            gridConfig="grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            length={4}
          />
        ) : productDetails?.data &&
          productDetails.data.recommended.length > 0 ? (
          <ProductShowcase
            gridConfig="grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            products={productDetails.data.recommended}
          />
        ) : (
          <NoData desc="Tidak ada produk rekomendasi" />
        )}
      </div>
    </main>
  );
};

export default ProductDetailPage;
