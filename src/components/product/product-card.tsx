"use client";
import { useEffect, useState } from "react";
import Image from "next/legacy/image";

// components
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { IconCart, IconStar } from "@/components/icons";
import FavoriteButton from "@/components/common/buttons/favorite-button";
import { useToast } from "@/components/ui/use-toast";

// utils
import { cn, formatNumber } from "@/lib/utils";
import Link from "next/link";
import { Product, ProductFavoritePayload } from "@/types/product";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

// service
import { useProductFavoriteMutation } from "@/service/product.service";
import { Loader, Loader2 } from "lucide-react";
import { useCheckoutMutation } from "@/service/transaction.service";
import { CheckoutPayload } from "@/types/transaction";

interface CardProps {
  details: Product;
  className?: string;
}

const ProductCard: React.FC<CardProps> = ({
  details,
  className,
}: CardProps) => {
  const { data: session } = useSession();
  const router = useRouter();

  const [isFavorite, setIsFavorite] = useState(false);
  const [isFavoriting, setIsFavoriting] = useState(false);

  const { toast } = useToast();

  const [addProductFavorite] = useProductFavoriteMutation();

  // mutate add to cart/checkout
  const [mutateCheckout, { isLoading: isLoadingMutateCheckout, error }] =
    useCheckoutMutation();

  const handleAddToCart = async (payload: CheckoutPayload) => {
    if (!session) {
      router.push("/auth/signin");
    }

    try {
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

  const handleAddProductFavorite = async (
    payload: ProductFavoritePayload,
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (!session) {
      router.push("/auth/signin");
      return;
    }
    try {
      setIsFavoriting(true);
      await addProductFavorite(payload).unwrap();
      toast({
        title: "Berhasil",
        description: isFavorite
          ? "Produk dihapus dari favorit!"
          : "Produk ditambahkan ke favorit!",
        variant: "success",
      });
      setIsFavorite(!isFavorite);
    } catch (error: any) {
      toast({
        title: "Gagal",
        description: "Terjadi kesalahan saat menambahkan ke favorit.",
        variant: "destructive",
      });
    } finally {
      setIsFavoriting(false);
    }
  };

  useEffect(() => {
    setIsFavorite(
      (details.ProductFavorite && details.ProductFavorite.length > 0) || false
    );
  }, [details.ProductFavorite]);
  return (
    <>
      <div
        className={cn(
          "w-full flex flex-col gap-2 p-4 border border-gray rounded-xl hover:transition-all hover:ease-in hover:duration-200 hover:drop-shadow-lg bg-white relative",
          className
        )}
      >
        <div
          className="absolute top-4 right-4 cursor-pointer z-10 hover:drop-shadow-lg"
          onClick={(e) =>
            handleAddProductFavorite({ productId: details.id }, e)
          }
        >
          {isFavoriting ? (
            <Loader2 className="animate-spin text-gray-400 w-5 h-5" />
          ) : (
            <FavoriteButton isFavorite={isFavorite} />
          )}
        </div>

        <Link
          href={`/product/detail/${details.id}`}
          className="flex flex-col gap-2"
        >
          <div className="w-full relative">
            <AspectRatio ratio={1 / 1}>
              <Image
                src={details.image}
                layout="fill"
                alt=""
                objectFit="contain"
              />
            </AspectRatio>
          </div>
          <div className="text-leaf text-xl font-medium">{details.name}</div>
          <div className="font-semibold">
            Rp {formatNumber(details.price)} /
            <span className="text-sm">{details.unit}</span>
          </div>
          <div className="flex gap-2">
            <IconStar className="w-5 h-5" fill="carrot" stroke="carrot" />
            <span>{details.rating}</span>
            <span>|</span>
            <span>{details.itemSold} terjual</span>
          </div>
        </Link>
        <Button
          className="py-1 px-7 bg-leaf hover:transition-all hover:ease-in hover:duration-200 hover:opacity-80 leading-4"
          onClick={(e) => handleAddToCart({ productId: details.id, qty: 1 })}
          disabled={isLoadingMutateCheckout}
        >
          {isLoadingMutateCheckout ? (
            <>
              <Loader className="animate-spin lg:mr-2" />
              {/* <IconCart
                  className="w-[18px] h-[18px] md:block hidden mr-2"
                  stroke="background"
                /> */}
              <div className="lg:block hidden">Masukkan Keranjang</div>
            </>
          ) : (
            <>
              <IconCart
                className="w-[18px] h-[18px] md:block hidden mr-2"
                stroke="background"
              />
              Masukkan Keranjang
            </>
          )}
        </Button>
      </div>
    </>
  );
};

export { ProductCard };
