"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ALL_COUNTRIES } from "@/lib/countries";
import { VisaServicesHeader } from "@/components/visa/VisaServicesHeader";
import { VisaServicesLayout } from "@/components/visa/VisaServicesLayout";

export default function VisaServicesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(ALL_COUNTRIES[0]);

  const filteredCountries = ALL_COUNTRIES.filter((country) =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <VisaServicesHeader 
            searchQuery={searchQuery}
            onSearchChange={(e) => setSearchQuery(e.target.value)}
          />
          <VisaServicesLayout
            countries={filteredCountries}
            selectedCountry={selectedCountry}
            onCountrySelect={setSelectedCountry}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}