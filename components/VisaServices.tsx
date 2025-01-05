import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { FeaturedCountries } from "./visa/FeaturedCountries";

export default function VisaServices() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
          <h2 className="text-4xl font-bold">
            Hassle-Free Online Visa Services
          </h2>
          <Link href="/visa-services">
            <Button variant="outline" className="gap-2">
              See All Countries <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        
        <FeaturedCountries />
      </div>
    </section>
  );
}