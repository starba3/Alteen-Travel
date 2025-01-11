"use client";

import { useTranslations } from "@/lib/i18n/hooks";
import { useParams } from "next/navigation";
import { HeroSearch } from "./HeroSearch";

export function HeroContent() {
  const params = useParams();
  const { t } = useTranslations(params.locale as string);

  return (
    <div className="relative z-10 text-center max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
        {t('hero.title')}
      </h1>
      <p className="text-xl sm:text-2xl text-white/80 mb-8 max-w-3xl mx-auto">
        {t('hero.description')}
      </p>
      <HeroSearch />
    </div>
  );
}