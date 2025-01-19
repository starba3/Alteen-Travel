"use client";

import { useState } from "react";
import { type Country } from "@/lib/countries";
import { VisaServicesHeader } from "./VisaServicesHeader";
import { VisaServicesLayout } from "./VisaServicesLayout";

interface VisaServicesContentProps {
  initialCountries: Country[];
}

export function VisaServicesContent({ initialCountries }: VisaServicesContentProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<Country>(initialCountries[0]);

  const filteredCountries = initialCountries.filter((country) =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <VisaServicesHeader 
        searchQuery={searchQuery}
        onSearchChange={(e) => setSearchQuery(e.target.value)}
      />
      <VisaServicesLayout
        countries={filteredCountries}
        selectedCountry={selectedCountry}
        onCountrySelect={setSelectedCountry}
      />
    </>
  );
} 