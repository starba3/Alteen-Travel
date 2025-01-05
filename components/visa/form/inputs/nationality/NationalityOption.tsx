"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Country } from "@/lib/countries";

interface NationalityOptionProps {
  country: Country;
  isSelected: boolean;
  onSelect: (code: string) => void;
}

export function NationalityOption({ country, isSelected, onSelect }: NationalityOptionProps) {
  return (
    <div
      role="option"
      aria-selected={isSelected}
      onClick={() => onSelect(country.code)}
      className={cn(
        "flex items-center gap-2 px-3 py-2 cursor-pointer",
        "text-sm rounded-sm outline-none",
        "hover:bg-accent hover:text-accent-foreground",
        "focus:bg-accent focus:text-accent-foreground",
        isSelected && "bg-accent text-accent-foreground"
      )}
      tabIndex={0}
    >
      <span className="text-xl">{country.flag}</span>
      <span className="flex-1">{country.name}</span>
      {isSelected && <Check className="h-4 w-4 shrink-0" />}
    </div>
  );
}