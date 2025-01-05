"use client";

import { forwardRef } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface CardNumberInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const CardNumberInput = forwardRef<HTMLInputElement, CardNumberInputProps>(
  ({ className, error, onChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      // Only allow numbers and format with spaces every 4 digits
      const value = e.target.value.replace(/\D/g, "");
      const formatted = value.replace(/(\d{4})/g, "$1 ").trim();
      e.target.value = formatted;
      onChange?.(e);
    };

    return (
      <Input
        {...props}
        ref={ref}
        onChange={handleChange}
        className={cn(error && "border-red-500", className)}
        maxLength={19}
        inputMode="numeric"
        autoComplete="cc-number"
        placeholder="1234 5678 9012 3456"
      />
    );
  }
);

CardNumberInput.displayName = "CardNumberInput";