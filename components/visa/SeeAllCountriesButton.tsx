"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useTranslations } from "@/lib/i18n/hooks";
import { useParams } from "next/navigation";

export function SeeAllCountriesButton() {
  const params = useParams();
  const { t } = useTranslations(params.locale as string);

  return (
    <Link href="/visa-services">
      <Button variant="outline" className="gap-2">
        {t('seeAllCountries')} <ChevronRight className="h-4 w-4" />
      </Button>
    </Link>
  );
} 