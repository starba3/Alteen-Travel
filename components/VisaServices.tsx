import { cookies } from "next/headers";
import { getTranslations } from "@/lib/i18n/server";
import { FeaturedCountries } from "./visa/FeaturedCountries";
import { SeeAllCountriesButton } from "./visa/SeeAllCountriesButton";
import { VisaServicesTitle } from "./visa/VisaServicesTitle";

export default async function VisaServices() {
  const locale = cookies().get("locale")?.value || "en";

  return (
    <section className="py-20" dir={locale === "ar" ? "rtl" : "ltr"}>
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