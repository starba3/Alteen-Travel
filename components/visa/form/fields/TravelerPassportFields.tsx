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
import { Hash, User, MapPin, Calendar } from "lucide-react";
import { NationalitySelect } from "../inputs/NationalitySelect";
import type { TravelerFormData } from "@/lib/validations/traveler";
import { useTranslations } from "@/lib/i18n/hooks";
import { useParams } from "next/navigation";

interface TravelerPassportFieldsProps {
  form: UseFormReturn<TravelerFormData>;
  index: number;
}

export function TravelerPassportFields({ form, index }: TravelerPassportFieldsProps) {
  const params = useParams();
  const { t } = useTranslations(params.locale as string);

  return (
    <div className={`space-y-4 ${params.locale === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name={`travelers.${index}.surname` as const}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('form.traveler.surname')}</FormLabel>
              <FormControl>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input 
                    {...field}
                    maxLength={50}
                    placeholder={t('form.traveler.surnamePlaceholder')}
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
          name={`travelers.${index}.passportNumber` as const}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('form.traveler.passportNumber')}</FormLabel>
              <FormControl>
                <div className="relative">
                  <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input 
                    {...field}
                    minLength={6}
                    maxLength={15}
                    placeholder={t('form.traveler.passportNumberPlaceholder')}
                    className="pl-10 h-12 rounded-lg border-gray-200"
                    pattern="[A-Za-z0-9]+"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name={`travelers.${index}.dateOfBirth` as const}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('form.traveler.dateOfBirth')}</FormLabel>
              <FormControl>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input 
                    {...field}
                    type="date"
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
          name={`travelers.${index}.nationality` as const}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('form.traveler.nationality')}</FormLabel>
              <FormControl>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <NationalitySelect 
                    {...field}
                    className="pl-10 h-12 rounded-lg border-gray-200"
                    placeholder={t('form.traveler.nationalityPlaceholder')}
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