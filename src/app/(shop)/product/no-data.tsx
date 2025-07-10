import Image from "next/image";

// assets
import Illustration from "@/assets/images/no-data-image.jpg";
import { FC } from "react";

interface INodataProps {
  desc?: string;
}
const NoData: FC<INodataProps> = ({ desc }) => {
  return (
    <>
      <div className="flex w-full h-full items-center justify-center">
        <div className="w-auto h-auto flex flex-col items-center">
          <div className="w-[331px] h-[203px] relative">
            <Image
              src={Illustration}
              layout="fill"
              alt=""
              objectFit="contain"
            />
          </div>
          <div className="text-2xl font-semibold">Uuuupps..</div>
          <div className="w-[390px] mt-2 text-center">
            {!desc
              ? `Produk yang kamu cari tidak bisa kami temukan, cobalah menggunakan
            kata kunci, filter lainnya atau cek produk rekomendasi kami dibawah
            ini.`
              : desc}
          </div>
        </div>
      </div>
    </>
  );
};
export default NoData;
