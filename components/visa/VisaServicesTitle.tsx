"use client";

import { useTranslations } from "@/lib/i18n/hooks";
import { useParams } from "next/navigation";

export function VisaServicesTitle() {
  const params = useParams();
  const { t } = useTranslations(params.locale as string);

  return (
    <h2 className="text-4xl font-bold">
      {t('visaServices.title')}
    </h2>
  );
} 