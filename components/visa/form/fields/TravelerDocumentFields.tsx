"use client";

import { UseFormReturn } from "react-hook-form";
import { TravelerFormData } from "@/lib/validations/traveler";
import { useTranslations } from "@/lib/i18n/hooks";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Camera, FileImage } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useParams } from "next/navigation";

interface TravelerDocumentFieldsProps {
  form: UseFormReturn<TravelerFormData>;
  index: number;
}

export function TravelerDocumentFields({ form, index }: TravelerDocumentFieldsProps) {
  const params = useParams();
  const { t } = useTranslations(params.locale as string);

  return (
    <div className={`space-y-4 ${params.locale === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name={`travelers.${index}.personalPhoto` as const}
          render={({ field: { value, onChange, ...field } }) => (
            <FormItem>
              <FormLabel>{t('form.traveler.personalPhoto')}</FormLabel>
              <FormControl>
                <div className="relative">
                  <Camera className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const files = e.target.files;
                      if (files?.length) {
                        onChange(files);
                      }
                    }}
                    {...field}
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
              <FormLabel>{t('form.traveler.passportPhoto')}</FormLabel>
              <FormControl>
                <div className="relative">
                  <FileImage className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const files = e.target.files;
                      if (files?.length) {
                        onChange(files);
                      }
                    }}
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
    </div>
  );
}