"use client";

// components
import { ProductCard } from "@/components/product/product-card";

// utils
import { cn } from "@/lib/utils";
import { Product, ProductFavorite } from "@/types/product";

interface ShowcaseProps {
  gridConfig?: string;
  products: Product[] | ProductFavorite[];
}

const ProductShowcase: React.FC<ShowcaseProps> = ({
  gridConfig,
  products,
}: ShowcaseProps) => {
  const normalizedProducts = products.map((item) =>
    "product" in item ? item.product : item
  );
  return (
    <>
      <div className="w-full">
        <div className={cn("grid gap-6", gridConfig)}>
          {normalizedProducts?.map((product, index) => (
            <ProductCard details={product} key={index} />
          ))}
        </div>
      </div>
    </>
  );
};

export { ProductShowcase };
