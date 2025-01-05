import { Country } from "@/lib/countries";
import { CountryGrid } from "./CountryGrid";
import { VisaApplicationForm } from "./VisaApplicationForm";

interface VisaServicesLayoutProps {
  countries: Country[];
  selectedCountry: Country;
  onCountrySelect: (country: Country) => void;
}

export function VisaServicesLayout({
  countries,
  selectedCountry,
  onCountrySelect,
}: VisaServicesLayoutProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div>
        <h2 className="text-2xl font-semibold mb-6">Available Countries</h2>
        <CountryGrid
          countries={countries}
          selectedCountry={selectedCountry}
          onCountrySelect={onCountrySelect}
        />
      </div>
      <div className="lg:sticky lg:top-24">
        <VisaApplicationForm selectedCountry={selectedCountry} />
      </div>
    </div>
  );
}