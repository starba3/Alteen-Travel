import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { VisaApplicationForm } from "./VisaApplicationForm";
import { CountryCard } from "./CountryCard";

const FEATURED_COUNTRIES = [
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
];

const VisaServices = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-bold">
            Hassle-Free Online Visa Services
          </h2>
          <Link href="/visa-services">
            <Button variant="outline" className="gap-2">
              See All Countries <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 h-fit">
            {FEATURED_COUNTRIES.map((country) => (
              <CountryCard key={country.name} country={country} />
            ))}
          </div>

          <VisaApplicationForm />
        </div>
      </div>
    </section>
  );
};

export default VisaServices;