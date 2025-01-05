"use client";

import { useState } from "react";
import { ALL_COUNTRIES } from "@/lib/countries";
import { CountrySelection } from "./CountrySelection";
import { VisaApplicationForm } from "./VisaApplicationForm";

export function FeaturedCountries() {
  const [selectedCountry, setSelectedCountry] = useState(ALL_COUNTRIES[0]);
  const featuredCountries = ALL_COUNTRIES.slice(0, 4);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {featuredCountries.map((country) => (
            <CountrySelection
              key={country.code}
              country={country}
              isSelected={selectedCountry.code === country.code}
              onSelect={() => setSelectedCountry(country)}
            />
          ))}
        </div>
      </div>
      <div className="lg:sticky lg:top-24">
        <VisaApplicationForm selectedCountry={selectedCountry} preview />
      </div>
    </div>
  );
}