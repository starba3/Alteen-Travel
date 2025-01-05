"use client";

import { forwardRef } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface ExpiryInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const ExpiryInput = forwardRef<HTMLInputElement, ExpiryInputProps>(
  ({ className, error, onChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.replace(/\D/g, "");
      let formatted = value;
      
      if (value.length >= 2) {
        formatted = value.slice(0, 2) + "/" + value.slice(2, 4);
      }
      
      e.target.value = formatted;
      onChange?.(e);
    };

    return (
      <Input
        {...props}
        ref={ref}
        onChange={handleChange}
        className={cn(error && "border-red-500", className)}
        maxLength={5}
        inputMode="numeric"
        autoComplete="cc-exp"
        placeholder="MM/YY"
      />
    );
  }
);

ExpiryInput.displayName = "ExpiryInput";