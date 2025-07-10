"use client";
import Link from "next/link";

// components
import { Button } from "@/components/ui/button";
import {
  IconBeans,
  IconFruit,
  IconFungi,
  IconGinger,
  IconOnion,
  IconVegetable,
} from "@/components/icons";

// utils
import { cn } from "@/lib/utils";
import { hover } from "@/lib/hover";

interface CategoryProps {
  id: string;
  icon: string;
  color: string;
  title: string;
}

const _renderIcon = (identifier: string) => {
  const iconDimension = "w-[40px] md:w-[80px] h-[40px] md:h-[80px]";

  switch (identifier) {
    case "IconFungi":
      return <IconFungi className={cn(iconDimension)} fill="carrot" />;
    case "IconFruit":
      return <IconFruit className={cn(iconDimension)} fill="carrot" />;
    case "IconVegetable":
      return <IconVegetable className={cn(iconDimension)} fill="carrot" />;
    case "IconOnion":
      return <IconOnion className={cn(iconDimension)} fill="carrot" />;
    case "IconBeans":
      return <IconBeans className={cn(iconDimension)} fill="carrot" />;
    case "IconGinger":
      return <IconGinger className={cn(iconDimension)} fill="carrot" />;
    default:
      return <IconFungi className={cn(iconDimension)} fill="carrot" />;
  }
};

const ProductCategory: React.FC<CategoryProps> = ({
  id,
  icon,
  color,
  title,
}: CategoryProps) => {
  return (
    <div className="w-[100%]">
      <Link href={`/product?category=${id}`} style={{ width: "100%" }}>
        <Button
          className={cn(
            "h-[100%] w-[100%] border rounded-xl",
            color,
            hover.shadow
          )}
        >
          <div className="flex md:flex-row flex-col flex-1 items-center rounded-xl py-6 px-4 gap-4">
            {_renderIcon(icon)}
            <div className="flex flex-1 text-gray-600 text-lg md:text-xl font-semibold">
              {title}
            </div>
          </div>
        </Button>
      </Link>
    </div>
  );
};

export default ProductCategory;
