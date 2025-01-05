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
import { Calendar } from "lucide-react";
import type { TravelerFormData } from "@/lib/validations/traveler";

interface TravelerDateFieldsProps {
  form: UseFormReturn<TravelerFormData>;
  index: number;
}

export function TravelerDateFields({ form, index }: TravelerDateFieldsProps) {
  const fieldBase = `travelers.${index}`;

  return (
    <FormField
      control={form.control}
      name={`travelers.${index}.dateOfBirth` as const}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Date of Birth</FormLabel>
          <FormControl>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input 
                {...field}
                type="date"
                max={new Date().toISOString().split('T')[0]}
                className="pl-10 h-12 rounded-lg border-gray-200"
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}