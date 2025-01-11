import { FeaturedCountries } from "./visa/FeaturedCountries";
import { SeeAllCountriesButton } from "./visa/SeeAllCountriesButton";
import { VisaServicesTitle } from "./visa/VisaServicesTitle";

export default function VisaServices() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
          <VisaServicesTitle />
          <SeeAllCountriesButton />
        </div>
        
        <FeaturedCountries />
      </div>
    </section>
  );
}