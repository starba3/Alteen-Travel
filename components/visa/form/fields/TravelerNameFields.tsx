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
import { useTranslations } from "@/lib/i18n/hooks";
import { useParams } from 'next/navigation';

interface TravelerNameFieldsProps {
  form: UseFormReturn<TravelerFormData>;
  index: number;
}

export function TravelerNameFields({ form, index }: TravelerNameFieldsProps) {
  const params = useParams();
  const { t } = useTranslations(params.locale as string);

  return (
    <div className={`space-y-4 ${params.locale === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name={`travelers.${index}.givenName` as const}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('form.traveler.firstName')}</FormLabel>
              <FormControl>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input 
                    {...field}
                    maxLength={50}
                    placeholder={t('form.traveler.firstNamePlaceholder')}
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
              <FormLabel>{t('form.traveler.fatherName')}</FormLabel>
              <FormControl>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input 
                    {...field}
                    maxLength={50}
                    placeholder={t('form.traveler.fatherNamePlaceholder')}
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