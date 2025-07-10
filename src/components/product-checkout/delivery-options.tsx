"use client";
import { Dispatch } from "react";

//components
import { IconCheckCircle } from "../icons";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

// utils
import { cn } from "@/lib/utils";
import { hover } from "@/lib/hover";
import { DELIVERY_METHOD } from "@/types/transaction";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import type { DeliverySchema } from "@/app/(shop)/checkout/CheckoutPage";

interface IDeliveryOptionsProps {
  deliveryMethod: string;
  setDeliveryMethod: Dispatch<DELIVERY_METHOD>;
  register: UseFormRegister<DeliverySchema>;
  errors: FieldErrors<DeliverySchema>;
}

const DeliveryOptions: React.FC<IDeliveryOptionsProps> = ({
  deliveryMethod,
  setDeliveryMethod,
  register,
  errors,
}) => {
  return (
    <>
      <div className="text-lg font-semibold">Pilihan Pengiriman</div>
      <div className="flex gap-6">
        <div
          className={cn(
            "p-4 flex-1 border rounded-md flex flex-col gap-2 relative cursor-pointer bg-white",
            deliveryMethod === "HOME_DELIVERY" ? "border-leaf" : "",
            hover.shadow
          )}
          onClick={() => setDeliveryMethod("HOME_DELIVERY")}
        >
          <div>Home Delivery</div>
          <div className="text-sm text-gray-400">
            Akan tiba maksimal pukul 17.00 WIB
          </div>
          {deliveryMethod === "HOME_DELIVERY" && (
            <div className="absolute top-4 right-4">
              <IconCheckCircle className="w-5 h-5" stroke="leaf" />
            </div>
          )}
        </div>
        <div
          className={cn(
            "p-4 flex-1 border rounded-md flex flex-col gap-2 relative cursor-pointer bg-white",
            deliveryMethod === "STORE_PICKUP" ? "border-leaf" : "",
            hover.shadow
          )}
          onClick={() => setDeliveryMethod("STORE_PICKUP")}
        >
          <div>Ambil di toko</div>
          <div className="text-sm text-gray-400">
            Ambil pesanan anda secara mandiri di store
          </div>
          {deliveryMethod === "STORE_PICKUP" && (
            <div className="absolute top-4 right-4">
              <IconCheckCircle className="w-5 h-5" stroke="leaf" />
            </div>
          )}
        </div>
      </div>

      {deliveryMethod === "HOME_DELIVERY" && (
        <>
          <div className="text-lg font-semibold">Alamat Pengiriman</div>
          <div className="w-[100%] flex flex-col gap-4">
            <div className="w-[100%] flex flex-col">
              <Input
                type="text"
                placeholder="Nama Lengkap"
                className={`w-[100%] ${
                  errors?.receiverName?.message && "border border-red-400"
                }`}
                {...register("receiverName")}
                error={errors?.receiverName?.message}
              />
            </div>
            <div className="w-[100%] flex flex-col">
              <Input
                type="text"
                placeholder="Nomor Telepon"
                className={`w-[100%] ${
                  errors?.phoneNumber?.message && "border border-red-400"
                }`}
                {...register("phoneNumber")}
                error={errors?.phoneNumber?.message}
              />
            </div>
            <Textarea
              placeholder="Alamat Lengkap"
              className={`w-[100%] ${
                errors?.address?.message && "border border-red-400"
              }`}
              {...register("address")}
            />
            {errors?.address?.message && (
              <p className="text-red-500 text-sm -mt-2">
                {errors.address.message}
              </p>
            )}
            <div className="flex flex-col w-[100%]">
              <Input
                className={`w-[100%] ${
                  errors?.province?.message && "border border-red-400"
                }`}
                {...register("province")}
                error={errors?.province?.message}
                type="text"
                placeholder="Provinsi"
              />
            </div>
            <div>
              <div className="grid lg:grid-cols-4 grid-cols-2 lg:gap-x-2 gap-y-4">
                <div className="col-span-2">
                  <Input
                    className={`w-[100%] ${
                      errors?.city?.message && "border border-red-400"
                    }`}
                    {...register("city")}
                    error={errors?.city?.message}
                    type="text"
                    placeholder="Kota/Kabupaten"
                  />
                </div>
                <div className="col-span-2">
                  <Input
                    className={`w-[100%] ${
                      errors?.district?.message && "border border-red-400"
                    }`}
                    {...register("district")}
                    error={errors?.district?.message}
                    type="text"
                    placeholder="Kecamatan"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col w-[100%] gap-4">
              <Input
                className={`w-[100%] ${
                  errors?.postalCode?.message && "border border-red-400"
                }`}
                {...register("postalCode")}
                error={errors?.postalCode?.message}
                type="text"
                placeholder="Kodepos"
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default DeliveryOptions;
