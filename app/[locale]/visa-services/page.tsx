import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getAllCountries } from "@/lib/countries";
import { VisaServicesContent } from "@/components/visa/VisaServicesContent";

export default async function VisaServicesPage() {
  const countries = await getAllCountries();
  
  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <VisaServicesContent initialCountries={countries} />
        </div>
      </main>
      <Footer />
    </>
  );
}