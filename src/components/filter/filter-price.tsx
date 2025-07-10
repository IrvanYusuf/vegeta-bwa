"use client";

// components
import { Input } from "@/components/ui/input";
import { FC } from "react";
import { NumericFormat } from "react-number-format";

interface FilterPriceProps {
  onPriceChange: (min?: number, max?: number) => void;
  minPrice?: string;
  maxPrice?: string;
}
const FilterPrice: FC<FilterPriceProps> = ({
  onPriceChange,
  minPrice,
  maxPrice,
}) => {
  const handleMinChange = (values: any) => {
    onPriceChange(
      Number(values.value),
      maxPrice ? Number(maxPrice) : undefined
    );
  };

  const handleMaxChange = (values: any) => {
    onPriceChange(
      minPrice ? Number(minPrice) : undefined,
      Number(values.value)
    );
  };
  return (
    <>
      <div className="text-base">Harga Minimum</div>
      <div className="my-4 relative w-[100%]">
        <NumericFormat
          className="w-[100%]"
          customInput={Input}
          // fullWidth
          // label="Target Amount"
          name="target_amount"
          placeholder="Rp100.000"
          thousandSeparator="."
          decimalSeparator=","
          prefix="Rp"
          allowNegative={false}
          value={minPrice}
          onValueChange={handleMinChange}
          // value={form.target_amount}
          // onValueChange={(values) => handleInputAmount("target_amount", values)}
          // error={errors.target_amount ? true : false}
          // helperText={errors.target_amount}
        />
      </div>
      <div className="text-base">Harga Maksimum</div>
      <div className="my-4 relative w-[100%]">
        <NumericFormat
          className="w-[100%]"
          customInput={Input}
          // fullWidth
          // label="Target Amount"
          name="target_amount"
          placeholder="Rp100.000"
          thousandSeparator="."
          decimalSeparator=","
          prefix="Rp"
          allowNegative={false}
          value={maxPrice}
          onValueChange={handleMaxChange}
          // value={form.target_amount}
          // onValueChange={(values) => handleInputAmount("target_amount", values)}
          // error={errors.target_amount ? true : false}
          // helperText={errors.target_amount}
        />
      </div>
    </>
  );
};

export default FilterPrice;
