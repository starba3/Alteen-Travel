"use client";

import { Country } from "@/lib/countries";
import { CountryCard } from "./CountryCard";

interface CountryGridProps {
  countries: Country[];
  selectedCountry: Country;
  onCountrySelect: (country: Country) => void;
}

export function CountryGrid({
  countries,
  selectedCountry,
  onCountrySelect,
}: CountryGridProps) {
  return (
    <div className="max-h-[600px] overflow-y-auto pr-4 -mr-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {countries.map((country) => (
          <div 
            key={country.code}
            className="opacity-0 animate-[fadeIn_0.5s_ease-out_forwards]"
            style={{
              animationDelay: `${countries.indexOf(country) * 100}ms`
            }}
          >
            <CountryCard
              country={country}
              selected={selectedCountry.code === country.code}
              onSelect={() => onCountrySelect(country)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}