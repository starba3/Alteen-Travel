"use client";

import { useEffect, useState } from "react";
import { type Country } from "@/lib/countries";
import { CountrySelection } from "./CountrySelection";
import { VisaApplicationForm } from "./VisaApplicationForm";

// Create a function to fetch countries that runs on the client
async function fetchCountries() {
  const response = await fetch('/api/countries'); // You'll need to create this API route
  return response.json();
}

export function FeaturedCountries() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  useEffect(() => {
    fetchCountries().then(data => {
      setCountries(data);
      console.log("countries", data);
      setSelectedCountry(data.filter((country: Country) => country.serviceAvailable)[0]);
    });
  }, []);

  if (!selectedCountry) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      {/* <div className="space-y-6">
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
      </div> */}
      <div className="lg:sticky lg:top-24">
        <VisaApplicationForm selectedCountry={selectedCountry} preview />
      </div>
    </div>
  );
}