"use client";

import { UseFormReturn } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Camera, FileImage } from "lucide-react";
import type { TravelerFormData } from "@/lib/validations/traveler";

interface TravelerDocumentFieldsProps {
  form: UseFormReturn<TravelerFormData>;
  index: number;
}

export function TravelerDocumentFields({ form, index }: TravelerDocumentFieldsProps) {
  const fieldBase = `travelers.${index}`;

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name={`travelers.${index}.personalPhoto`}
        render={({ field: { value, onChange, ...field } }) => (
          <FormItem>
            <FormLabel>Personal Photo</FormLabel>
            <FormDescription>
              Clear headshot taken within last 6 months. White background, neutral expression.
            </FormDescription>
            <FormControl>
              <div className="relative">
                <Camera className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  {...field}
                  type="file"
                  accept="image/jpeg,image/jpg,image/png"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) onChange(file);
                  }}
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
        name={`travelers.${index}.passportPhoto` as const}
        render={({ field: { value, onChange, ...field } }) => (
          <FormItem>
            <FormLabel>Passport Photo Page</FormLabel>
            <FormDescription>
              Clear, color scan or photo of the main passport page. All text must be legible.
            </FormDescription>
            <FormControl>
              <div className="relative">
                <FileImage className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  {...field}
                  type="file"
                  accept="image/jpeg,image/jpg,image/png"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) onChange(file);
                  }}
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