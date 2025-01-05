"use client";

import { Country } from "@/lib/countries";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface CountrySelectionProps {
  country: Country;
  isSelected?: boolean;
  onSelect: () => void;
}

export function CountrySelection({
  country,
  isSelected,
  onSelect,
}: CountrySelectionProps) {
  return (
    <Card
      className={cn(
        "p-4 cursor-pointer hover:shadow-lg transition-all",
        isSelected ? "ring-2 ring-primary" : "hover:border-gray-300"
      )}
      onClick={onSelect}
    >
      <div className="flex items-center gap-3">
        <span className="text-3xl">{country.flag}</span>
        <div className="flex-1">
          <h3 className="font-semibold">{country.name}</h3>
          <p className="text-sm text-muted-foreground">
            Processing: {country.processingTime}
          </p>
          <p className="text-sm font-medium text-primary mt-1">
            ${country.price} USD
          </p>
        </div>
      </div>
    </Card>
  );
}