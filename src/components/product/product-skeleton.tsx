import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface ProductSkeletonProps {
  length: number;
  gridConfig?: string;
}

const ProductSkeleton: React.FC<ProductSkeletonProps> = ({
  length,
  gridConfig,
}: ProductSkeletonProps) => {
  return (
    <div className={cn("grid gap-6", gridConfig)}>
      {Array.from({ length }).map((_, index) => (
        <Skeleton className="h-[340px] w-[100%] rounded-xl" key={index} />
      ))}
    </div>
  );
};

export default ProductSkeleton;
