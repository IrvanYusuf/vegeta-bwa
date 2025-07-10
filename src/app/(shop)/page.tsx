"use client";

import Image from "next/legacy/image";
import Link from "next/link";

// components
import ProductCategory from "@/components/product/product-category";
import { ProductShowcase } from "@/components/product/product-showcase";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";

// assets
import ProductCategoryJSON from "@/assets/json/product-category.json";
import ImageBanner from "@/assets/images/image-banner.png";

// service
import { useGetAllProductsQuery } from "@/service/product.service";

export default function Home() {
  const {
    data: products,
    isLoading,
    refetch,
  } = useGetAllProductsQuery({
    limit: 6,
  });
  return (
    <main className="flex flex-col lg:px-0 px-2 w-full min-h-screen max-w-full items-center pb-8">
      <div className="lg:w-content w-[100%]">
        <div className="flex justify-center">
          <div className="lg:w-content w-[100%] mx-auto relative image-banner">
            <AspectRatio ratio={936 / 294}>
              <Image
                src={ImageBanner}
                layout="fill"
                alt=""
                objectFit="cover"
                className="rounded-lg"
                priority
              />
            </AspectRatio>
          </div>
        </div>

        <div className="pt-8 flex flex-col">
          <div className="flex justify-between mb-6">
            <div className="text-leaf md:text-3xl font-semibold">
              Produk Unggulan
            </div>
            <Link
              href="/product"
              className="text-base p-0 h-auto bg-white text-neutral-600"
            >
              Lihat Selengkapnya {">"}
            </Link>
          </div>
          {isLoading ? (
            <div className="grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <Skeleton
                  className="h-[340px] w-[100%] rounded-xl"
                  key={index}
                />
              ))}
            </div>
          ) : (
            <ProductShowcase
              gridConfig={"grid-cols-2 md:grid-cols-3 lg:grid-cols-4"}
              products={products?.data || []}
            />
          )}
        </div>

        <div className="mt-8">
          <div className="text-leaf md:text-3xl font-semibold">
            Produk berdasarkan kategori
          </div>

          <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-6">
            {ProductCategoryJSON.map((category) => (
              <ProductCategory
                key={`productCategory${category.id}`}
                id={category.id}
                title={category.title}
                icon={category.icon}
                color={category.color}
              />
            ))}
          </div>
        </div>

        <div className="mt-8">
          <div className="text-leaf md:text-3xl font-semibold">
            Tentang Kami
          </div>
          <div className="flex flex-col mt-6 text-justify gap-8 text-gray-400">
            <p>
              Selamat datang di Vegeta, destinasi terbaik untuk aneka sayuran
              dan buah segar siap kirim ke seluruh Indonesia! Kami dengan bangga
              mempersembahkan diri sebagai tim yang berdedikasi untuk memberikan
              kualitas terbaik dan pilihan yang beragam untuk kebutuhan sayuran
              dan buah segar Anda.
            </p>
            <p>
              Kami berusaha untuk selalu memberikan pelayanan terbaik kepada
              pelanggan kami. Tim kami selalu siap membantu Anda dalam memilih
              aneka sayuran dan buah yang sesuai dengan kebutuhan dan preferensi
              Anda. Dengan sistem pengiriman yang efisien, produk-produk segar
              dari Vegeta akan tiba di depan pintu Anda dalam kondisi prima,
              siap untuk melengkapi hidangan sehat dan lezat Anda.
            </p>
            <p>
              Terima kasih atas kepercayaan Anda pada kami. Kami berharap Anda
              menikmati pengalaman berbelanja di situs kami dan menemukan
              produk-produk berkualitas tinggi yang akan melengkapi kehidupan
              sehat dan bahagia Anda. Jangan ragu untuk menghubungi tim kami
              jika Anda memerlukan bantuan atau memiliki pertanyaan. Bersama,
              mari kita jaga kesehatan dan kelezatan hidup dengan produk-produk
              berkualitas dari kami.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
