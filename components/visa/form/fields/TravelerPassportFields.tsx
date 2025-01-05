"use client";

import { UseFormReturn } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Hash, MapPin } from "lucide-react";
import { NationalitySelect } from "../inputs/NationalitySelect";
import type { TravelerFormData } from "@/lib/validations/traveler";

interface TravelerPassportFieldsProps {
  form: UseFormReturn<TravelerFormData>;
  index: number;
}

export function TravelerPassportFields({ form, index }: TravelerPassportFieldsProps) {
  const fieldBase = `travelers.${index}`;

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name={`travelers.${index}.passportNumber` as const}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Passport Number</FormLabel>
            <FormControl>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input 
                  {...field}
                  minLength={6}
                  maxLength={15}
                  placeholder="Enter your passport number"
                  className="pl-10 h-12 rounded-lg border-gray-200"
                  pattern="[A-Za-z0-9]+"
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name={`travelers.${index}.nationality` as const}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nationality (as shown in passport)</FormLabel>
            <FormControl>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <NationalitySelect 
                  {...field}
                  className="pl-10 h-12 rounded-lg border-gray-200"
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}