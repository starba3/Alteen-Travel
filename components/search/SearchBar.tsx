"use client";

import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { SearchFilters } from "./SearchFilters";
import { useTranslations } from "@/lib/i18n/hooks";
import { useParams } from "next/navigation";

export function SearchBar() {
  const [showFilters, setShowFilters] = useState(false);
  const params = useParams();
  const { t } = useTranslations(params.locale as string);

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className="flex items-center bg-white rounded-full overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl">
        <div className="flex-1 px-6 py-4">
          <Input
            type="text"
            placeholder={t('search.placeholder')}
            className="border-0 text-lg bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-400"
            aria-label={t('search.placeholder')}
          />
        </div>
        <div className="flex items-center gap-2 pr-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-500 hover:text-gray-900"
            onClick={() => setShowFilters(!showFilters)}
            aria-expanded={showFilters}
            aria-controls="search-filters"
          >
            {t('search.filtersButton')}
          </Button>
          <Button size="lg" className="rounded-full px-8">
            <Search className="h-5 w-5" />
            <span className="sr-only">{t('search.searchButton')}</span>
          </Button>
        </div>
      </div>
      
      {showFilters && (
        <div
          id="search-filters"
          className="absolute w-full mt-4 bg-white rounded-lg shadow-lg p-4 animate-in fade-in slide-in-from-top-2 duration-200"
        >
          <SearchFilters />
        </div>
      )}
    </div>
  );
}