"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslations } from "@/lib/i18n/hooks";
import { useParams } from "next/navigation";



export function TripFilters() {
  const params = useParams();
  const locale = params.locale as string || "en";
  const { t } = useTranslations(locale);

  return (
    <div className="flex gap-4">
      <Select>
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder={t("search.filterTitle.destination")} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="europe">{t("search.filterOptions.destinations.europe")}</SelectItem>
          <SelectItem value="asia">{t("search.filterOptions.destinations.asia")}</SelectItem>
          <SelectItem value="americas">{t("search.filterOptions.destinations.americas")}</SelectItem>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder={t("search.filterTitle.duration")} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="short">{t("search.filterOptions.durations.short")}</SelectItem>
          <SelectItem value="medium">{t("search.filterOptions.durations.medium")}</SelectItem>
          <SelectItem value="long">{t("search.filterOptions.durations.long")}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}