"use client";

import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Country } from "@/lib/countries";

interface NationalityTriggerProps {
  selectedCountry?: Country;
  onClick: () => void;
  disabled?: boolean;
}

export function NationalityTrigger({ selectedCountry, onClick, disabled }: NationalityTriggerProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "flex items-center justify-between w-full px-3 py-2",
        "text-left bg-background border rounded-md",
        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        disabled && "opacity-50 cursor-not-allowed",
        !disabled && "hover:bg-accent hover:text-accent-foreground"
      )}
    >
      {selectedCountry ? (
        <span className="flex items-center gap-2">
          <span className="text-xl">{selectedCountry.flag}</span>
          <span>{selectedCountry.name}</span>
        </span>
      ) : (
        <span className="text-muted-foreground">Select nationality</span>
      )}
      <ChevronDown className="h-4 w-4 opacity-50" />
    </button>
  );
}