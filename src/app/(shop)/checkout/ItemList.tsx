"use client";

import React, { FC, useState } from "react";

// components
import ProductCheckout from "@/components/product-checkout/product-checkout";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import ProductCheckoutSkeleton from "@/components/product-checkout/product-checkout-skeleton";
import NoData from "@/app/(shop)/product/no-data";

// utils
import { CheckoutResponse } from "@/types/transaction";
import { Loader, Trash2 } from "lucide-react";
import { useDeleteBulkMutation } from "@/service/transaction.service";

interface IItemListProps {
  dataCheckoutProducts: CheckoutResponse;
  isLoadCheckout?: boolean;
}

function ItemList({ dataCheckoutProducts, isLoadCheckout }: IItemListProps) {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const { toast } = useToast();

  // service
  const [mutateDeleteBulkProducts, { isLoading, error }] =
    useDeleteBulkMutation();
  // function
  const handleToggleSelect = (checkoutId: string) => {
    setSelectedItems((prev) =>
      prev.includes(checkoutId)
        ? prev.filter((id) => id !== checkoutId)
        : [...prev, checkoutId]
    );
  };

  const handleBulkDelete = async () => {
    if (selectedItems.length === 0) return;

    // TODO: Panggil API delete di sini
    try {
      console.log("Menghapus item dengan ID:", selectedItems);
      await mutateDeleteBulkProducts({ ids: selectedItems });
      // Setelah berhasil
      setSelectedItems([]);
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
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold">Barang yang dibeli</div>
        {selectedItems.length > 0 && (
          <Button
            onClick={handleBulkDelete}
            disabled={isLoading}
            variant={"destructive"}
          >
            {isLoading ? (
              <Loader className="animate-spin mr-2" />
            ) : (
              <Trash2 className="mr-2" />
            )}
            Hapus ({selectedItems.length})
          </Button>
        )}
      </div>

      {isLoadCheckout ? (
        <div className="flex flex-col gap-6 mt-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <ProductCheckoutSkeleton key={i} />
          ))}
        </div>
      ) : dataCheckoutProducts?.data?.length ? (
        dataCheckoutProducts.data.map((product) => (
          <ProductCheckout
            key={`productCheckout${product.id}`}
            productDetails={product}
            isChecked={selectedItems.includes(product.id!)}
            onCheckedChange={() => handleToggleSelect(product.id!)}
          />
        ))
      ) : (
        <NoData
          desc="Hmm, sepertinya kamu belum memilih produk apa pun.
Jelajahi katalog kami dan temukan sesuatu yang menarik!"
        />
      )}
    </>
  );
}

export default ItemList;
