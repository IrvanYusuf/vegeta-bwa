"use client";
import Link from "next/link";

// components
import { Button } from "@/components/ui/button";
import DeliveryOptions from "@/components/product-checkout/delivery-options";
import ItemList from "./ItemList";

// utils
import { cn, formatNumber } from "@/lib/utils";
import { hover } from "@/lib/hover";
import {
  useCreatePaymentMutation,
  useGetAllCheckoutQuery,
} from "@/service/transaction.service";
import { useState } from "react";
import { CreateTransactionPayload, DELIVERY_METHOD } from "@/types/transaction";
import { HOME_DELIVERY_COST, INSURANCE_DELIVERY_COST } from "@/lib/constants";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Loader } from "lucide-react";

export const deliverySchema = yup.object({
  receiverName: yup.string().required("Nama penerima wajib diisi"),
  phoneNumber: yup
    .string()
    .matches(/^[0-9]{10,15}$/, "Nomor telepon tidak valid")
    .required("Nomor telepon wajib diisi"),
  address: yup.string().required("Alamat wajib diisi"),
  province: yup.string().required("Provinsi wajib diisi"),
  city: yup.string().required("Kota/Kabupaten wajib diisi"),
  district: yup.string().required("Kecamatan wajib diisi"),
  postalCode: yup
    .string()
    .matches(/^[0-9]{5}$/, "Kode pos harus 5 digit angka")
    .required("Kode pos wajib diisi"),
});

export type DeliverySchema = yup.InferType<typeof deliverySchema>;

const CheckoutPage = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [deliveryMethod, setDeliveryMethod] =
    useState<DELIVERY_METHOD>("HOME_DELIVERY");

  const { data: dataCheckoutProducts, isLoading } = useGetAllCheckoutQuery();
  const [createPayment, { isLoading: isLoadingPayment }] =
    useCreatePaymentMutation();

  const totalItem =
    dataCheckoutProducts?.data?.reduce(
      (sum, item) => sum + (item.qty || 1),
      0
    ) || 0;
  const totalPrice =
    dataCheckoutProducts?.data?.reduce(
      (sum, item) => sum + item.pricePerItem * (item.qty || 1),
      0
    ) || 0;

  const applicationFee = 1000;
  const deliveryFee =
    deliveryMethod === "HOME_DELIVERY" ? HOME_DELIVERY_COST : 0;
  const insurance =
    deliveryMethod === "HOME_DELIVERY" ? INSURANCE_DELIVERY_COST : 0;

  const subtotal = dataCheckoutProducts?.data?.length
    ? totalPrice + deliveryFee + insurance + applicationFee
    : totalPrice + insurance + applicationFee;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DeliverySchema>({ resolver: yupResolver(deliverySchema) });

  const showErrorToast = () =>
    toast({
      title: "Gagal",
      description: "Produk checkout masih kosong",
      variant: "destructive",
    });

  const showSuccessToast = () =>
    toast({ title: "Berhasil", description: "Berhasil checkout" });

  const handleSubmitTransaction = async (formData?: DeliverySchema) => {
    const products = dataCheckoutProducts?.data;
    if (!products || products.length === 0) return showErrorToast();

    const payload: CreateTransactionPayload = {
      deliveryFee,
      insuranceFee: insurance,
      applicationFee,
      method: deliveryMethod,
      items: products,
      ...(deliveryMethod === "HOME_DELIVERY" ? formData : {}),
    };

    const response = await createPayment(payload).unwrap();
    showSuccessToast();
    router.push(`/payment?trx_id=${response.data.id}`);
  };

  const renderSummary = () => (
    <div className="flex flex-col gap-3 border p-3 rounded-xl">
      <div className="text-lg font-semibold">Ringkasan Belanja</div>
      <div className="font-semibold">Total Belanja</div>

      <SummaryRow
        label={`Total Harga (${totalItem} barang)`}
        value={totalPrice}
      />
      <SummaryRow
        label="Total Ongkos Kirim"
        value={dataCheckoutProducts?.data?.length ? deliveryFee : 0}
      />
      <SummaryRow label="Asuransi Pengiriman" value={insurance} />

      <div className="w-full separator" />
      <div className="font-semibold">Biaya Transaksi</div>
      <SummaryRow label="Biaya Jasa Aplikasi" value={applicationFee} />

      <div className="w-full separator" />
      <SummaryRow label="Total Tagihan" value={subtotal} bold />
    </div>
  );

  return (
    <main className="flex flex-col w-[100%] items-center pb-16 pt-5 px-2">
      <div className="lg:w-content w-[100%] flex lg:flex-row flex-col gap-8">
        <div className="flex-[2] flex flex-col gap-8">
          <ItemList
            dataCheckoutProducts={dataCheckoutProducts!}
            isLoadCheckout={isLoading}
          />
          <div className="separator" />
          <DeliveryOptions
            deliveryMethod={deliveryMethod}
            setDeliveryMethod={setDeliveryMethod}
            register={register}
            errors={errors}
          />
        </div>

        <div className="flex-1">
          {renderSummary()}
          <Button
            onClick={
              deliveryMethod === "HOME_DELIVERY"
                ? handleSubmit(handleSubmitTransaction)
                : () => handleSubmitTransaction()
            }
            className={cn("w-[100%] mt-6 bg-leaf", hover.shadow)}
            disabled={isLoadingPayment}
          >
            {isLoadingPayment ? (
              <>
                <Loader className="animate-spin mr-2" />
                Lanjutkan Pembayaran
              </>
            ) : (
              "Lanjutkan Pembayaran"
            )}
          </Button>
        </div>
      </div>
    </main>
  );
};

const SummaryRow = ({
  label,
  value,
  bold = false,
}: {
  label: string;
  value: number;
  bold?: boolean;
}) => (
  <div className="flex justify-between">
    <div className={bold ? "text-lg font-semibold" : undefined}>{label}</div>
    <div className={bold ? "text-lg font-semibold" : undefined}>
      Rp {formatNumber(value)}
    </div>
  </div>
);

export default CheckoutPage;
