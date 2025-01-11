"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useTranslations } from "@/lib/i18n/hooks";
import { useParams } from "next/navigation";

export function SearchFilters() {
  const params = useParams();
  const { t } = useTranslations(params.locale as string);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={t('search.filterTitle.destination')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="europe">{t('search.filterOptions.destinations.europe')}</SelectItem>
            <SelectItem value="asia">{t('search.filterOptions.destinations.asia')}</SelectItem>
            <SelectItem value="americas">{t('search.filterOptions.destinations.americas')}</SelectItem>
            <SelectItem value="africa">{t('search.filterOptions.destinations.africa')}</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={t('search.filterTitle.duration')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="short">{t('search.filterOptions.durations.short')}</SelectItem>
            <SelectItem value="medium">{t('search.filterOptions.durations.medium')}</SelectItem>
            <SelectItem value="long">{t('search.filterOptions.durations.long')}</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={t('search.filterTitle.budget')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="budget">{t('search.filterOptions.budgets.low')}</SelectItem>
            <SelectItem value="mid">{t('search.filterOptions.budgets.medium')}</SelectItem>
            <SelectItem value="luxury">{t('search.filterOptions.budgets.high')}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button variant="outline" size="sm">{t('search.filterActions.reset')}</Button>
        <Button size="sm">{t('search.filterActions.apply')}</Button>
      </div>
    </div>
  );
}