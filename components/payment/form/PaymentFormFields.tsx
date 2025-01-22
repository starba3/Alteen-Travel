"use client";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { CardNumberInput } from "../inputs/CardNumberInput";
import { ExpiryInput } from "../inputs/ExpiryInput";
import type { UseFormReturn } from "react-hook-form";
import type { PaymentFormData } from "@/lib/types/payment";

interface PaymentFormFieldsProps {
  form: UseFormReturn<PaymentFormData>;
}

export function PaymentFormFields({ form }: PaymentFormFieldsProps) {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="cardNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Card Number</FormLabel>
            <FormControl>
              <CardNumberInput 
                {...field} 
                placeholder="1234 5678 9012 3456"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="cardHolderName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Cardholder Name</FormLabel>
            <FormControl>
              <Input 
                {...field} 
                placeholder="John Doe"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="expiry"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Expiry Date</FormLabel>
              <FormControl>
                <ExpiryInput 
                  {...field} 
                  placeholder="MM/YY"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cvv"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CVV</FormLabel>
              <FormControl>
                <Input 
                  {...field}
                  type="password"
                  maxLength={4}
                  placeholder="•••"
                  inputMode="numeric"
                  autoComplete="cc-csc"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* <FormField
        control={form.control}
        name="acceptTerms"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>
                I accept the terms and conditions
              </FormLabel>
            </div>
          </FormItem>
        )}
      /> */}
    </div>
  );
}