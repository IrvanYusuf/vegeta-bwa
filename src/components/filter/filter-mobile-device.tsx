"use client";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import { FC } from "react";

// components
import FilterCategory from "./filter-category";
import FilterPrice from "./filter-price";
import FilterRating from "./filter-rating";

// utils
import ProductCategoryJSON from "@/assets/json/product-category.json";

interface FilterMobileDeviceProps {
  handleFilterCategory: (category: string) => void;
  selectedCategories?: string[];
  onPriceChange: (min?: number, max?: number) => void;
  minPrice?: string;
  maxPrice?: string;
  handleFilterRating: (rating: number) => void;
  selectedRatings?: string[];
}

const FilterMobileDevice: FC<FilterMobileDeviceProps> = ({
  handleFilterCategory,
  selectedCategories,
  onPriceChange,
  minPrice,
  maxPrice,
  handleFilterRating,
  selectedRatings,
}) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Filter</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="text-start">Filter</DrawerTitle>
        </DrawerHeader>
        <div className="overflow-y-auto max-h-[calc(100dvh-150px)] px-4 space-y-4">
          <div>
            <div className="font-semibold mb-2">Category</div>
            <div className="flex flex-col gap-2">
              <FilterCategory
                handleFilterCategory={handleFilterCategory}
                selectedCategories={selectedCategories}
                isShowTitle={false}
              />
            </div>
          </div>

          {/* price filter */}
          <div>
            <div className="font-semibold mb-2">Price</div>
            <FilterPrice
              onPriceChange={onPriceChange}
              maxPrice={maxPrice}
              minPrice={minPrice}
            />
          </div>

          {/* filter rating */}
          <div>
            <div className="font-semibold mb-2">Rating</div>
            <FilterRating
              handleFilterRating={handleFilterRating}
              selectedRatings={selectedRatings}
              isShowTitle={false}
            />
          </div>
        </div>

        {/* <DrawerFooter>
          <Button onClick={() => {}}>Terapkan</Button>
          <DrawerClose>
            <Button variant="outline">Batal</Button>
          </DrawerClose>
        </DrawerFooter> */}
      </DrawerContent>
    </Drawer>
  );
};

export default FilterMobileDevice;
