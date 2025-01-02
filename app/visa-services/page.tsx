"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { CountryCard } from "@/components/visa/CountryCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ALL_COUNTRIES = [
  {
    name: "United States",
    flag: "🇺🇸",
    processingTime: "3-5 business days",
  },
  {
    name: "Schengen Area",
    flag: "🇪🇺",
    processingTime: "10-15 business days",
  },
  {
    name: "United Kingdom",
    flag: "🇬🇧",
    processingTime: "5-7 business days",
  },
  {
    name: "Australia",
    flag: "🇦🇺",
    processingTime: "5-10 business days",
  },
  {
    name: "Canada",
    flag: "🇨🇦",
    processingTime: "7-10 business days",
  },
  {
    name: "Japan",
    flag: "🇯🇵",
    processingTime: "5-7 business days",
  },
  {
    name: "Singapore",
    flag: "🇸🇬",
    processingTime: "3-5 business days",
  },
  {
    name: "UAE",
    flag: "🇦🇪",
    processingTime: "4-6 business days",
  },
  {
    name: "New Zealand",
    flag: "🇳🇿",
    processingTime: "8-10 business days",
  },
  {
    name: "Brazil",
    flag: "🇧🇷",
    processingTime: "10-15 business days",
  },
  {
    name: "South Africa",
    flag: "🇿🇦",
    processingTime: "7-10 business days",
  },
  {
    name: "Thailand",
    flag: "🇹🇭",
    processingTime: "4-6 business days",
  },
];

export default function VisaServicesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCountries = ALL_COUNTRIES.filter((country) =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-6">Visa Services</h1>
            <p className="text-lg text-gray-600 mb-8">
              Explore our comprehensive visa services for countries worldwide. We provide hassle-free visa processing with expert guidance throughout your application.
            </p>
            
            <div className="relative max-w-xl">
              <Input
                placeholder="Search countries..."
                className="pl-12"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {filteredCountries.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">No countries found matching your search.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCountries.map((country) => (
                <CountryCard key={country.name} country={country} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}