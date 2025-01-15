import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PopularDestinations from "@/components/PopularDestinations";
import FeaturedTrips from "@/components/FeaturedTrips";
import VisaServices from "@/components/VisaServices";
import Footer from "./components/footer/Footer";

// Mark the page as a Server Component
export default async function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <VisaServices />
      <PopularDestinations />
      <FeaturedTrips />
      <Footer />
    </main>
  );
}