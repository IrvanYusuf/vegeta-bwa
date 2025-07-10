"use client";
import { use, useState } from "react";
import Image from "next/legacy/image";

// components
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import CommonStepper from "@/components/common/common-stepper";
import { useToast } from "@/components/ui/use-toast";

// utils
import { formatNumber } from "@/lib/utils";
import { Checkout } from "@/types/transaction";
import {
  useDeleteBulkMutation,
  useUpdateQtyMutation,
} from "@/service/transaction.service";

interface CheckoutProps {
  isChecked?: boolean;
  productDetails: Checkout;
  onCheckedChange?: () => void;
}

const ProductCheckout: React.FC<CheckoutProps> = ({
  isChecked,
  productDetails,
  onCheckedChange,
}: CheckoutProps) => {
  const { toast } = useToast();
  const [updateQty, { isLoading, error }] = useUpdateQtyMutation();
  const [qty, setQty] = useState(productDetails.qty);
  const handleUpdateQty = async (newQty: number) => {
    setQty(newQty);
    await updateQty({
      productId: productDetails.productId,
      qty: newQty,
    }).unwrap();
  };

  const [mutateDeleteSingleProduct] = useDeleteBulkMutation();

  const handleDelete = async () => {
    // TODO: Panggil API delete di sini
    try {
      console.log("Menghapus item dengan ID:", productDetails.id);
      await mutateDeleteSingleProduct({ id: productDetails.id });
      // Setelah berhasil
      toast({
        title: "Berhasil",
        description: "Berhasil hapus produk",
      });
    } catch (error) {
      console.log("error delete bulk in itemlist", error);
      toast({
        title: "Gagal",
        description: "Terjadi kesalahan saat menghapus.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <div className="w-[100%]">
        <div className="flex gap-6 w-[100%] lg:items-center items-start">
          <Checkbox
            className="w-6 h-6 border-2 border-leaf data-[state=checked]:bg-leaf data-[state=checked]:text-primary-foreground"
            id={"product-1"}
            checked={isChecked}
            onCheckedChange={onCheckedChange}
          />
          <div className="p-1 border rounded-lg">
            <div className="w-[80px] h-[80px] relative">
              <Image
                src={productDetails.product.image}
                layout="fill"
                alt=""
                objectFit="contain"
              />
            </div>
          </div>
          <div className="flex w-[100%] lg:flex-row flex-col">
            <div className="flex flex-2 w-[100%] flex-col justify-center gap-2">
              <div>{productDetails.product.name}</div>
              <div className="font-semibold">
                Rp {formatNumber(productDetails.product.price)}
              </div>
            </div>
            <div className="lg:mt-0 mt-2">
              <CommonStepper
                count={qty}
                onChange={async (count) => {
                  await handleUpdateQty(count);
                }}
                isLoading={isLoading}
              />

              <Button
                className="lg:text-red-400 lg:mt-0 mt-4 border-0 w-[100%] lg:bg-white font-regular"
                onClick={handleDelete}
                variant={"destructive"}
              >
                Hapus
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCheckout;
