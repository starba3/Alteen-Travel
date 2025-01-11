"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { getTranslations } from "@/lib/i18n/server";
interface BreadcrumbsProps {
  currentStep?: number;
}

export async function Breadcrumbs({ currentStep }: BreadcrumbsProps) {
  const { t } = await getTranslations();
  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
      <Link href="/" className="flex items-center hover:text-primary">
        <Home className="h-4 w-4 mr-1" />
        {t('home')}
      </Link>
      <ChevronRight className="h-4 w-4" />
      <Link href="/visa-services" className="hover:text-primary">
        {t('visaServices.title')}
      </Link>
      {currentStep && (
        <>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">Application Step {currentStep}</span>
        </>
      )}
    </nav>
  );
}