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
import { User } from "lucide-react";
import type { TravelerFormData } from "@/lib/validations/traveler";

interface TravelerNameFieldsProps {
  form: UseFormReturn<TravelerFormData>;
  index: number;
}

export function TravelerNameFields({ form, index }: TravelerNameFieldsProps) {
  const fieldBase = `travelers.${index}`;

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name={`travelers.${index}.givenName` as const}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Given Name (as shown in passport)</FormLabel>
            <FormControl>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input 
                  {...field}
                  maxLength={50}
                  placeholder="Enter your given name"
                  className="pl-10 h-12 rounded-lg border-gray-200"
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name={`travelers.${index}.fatherName` as const}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Father's Name</FormLabel>
            <FormControl>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input 
                  {...field}
                  maxLength={50}
                  placeholder="Enter your father's name"
                  className="pl-10 h-12 rounded-lg border-gray-200"
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name={`travelers.${index}.surname` as const}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Surname (as shown in passport)</FormLabel>
            <FormControl>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input 
                  {...field}
                  maxLength={50}
                  placeholder="Enter your surname"
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