"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useParams } from 'next/navigation';
import { useTranslations } from "@/lib/i18n/hooks";

interface VisaServicesHeaderProps {
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function VisaServicesHeader({ searchQuery, onSearchChange }: VisaServicesHeaderProps) {

  const params = useParams();
  const locale = params.locale as string;
  const { t } = useTranslations(params.locale as string);

  return (
    <div className="mb-12" dir={locale === "ar" ? "rtl" : "ltr"}>
      <h1 className="text-4xl font-bold mb-6">{t('visaServices.title')}</h1>
      <p className="text-lg text-gray-600 mb-8">
      {t('visaServices.description')}
      </p>
      
      {/* <div className="relative max-w-xl">
        <Input
          placeholder={t('form.availableCountries')}
          className="pl-12"
          value={searchQuery}
          onChange={onSearchChange}
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
      </div> */}
    </div>
  );
}