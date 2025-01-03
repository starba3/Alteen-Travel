import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PopularDestinations from "@/components/destinations/PopularDestinations";
import FeaturedTrips from "@/components/trips/FeaturedTrips";
import ExclusiveOffers from "@/components/offers/ExclusiveOffers";
import VisaServices from "@/components/visa/VisaServices";
import WhyChooseUs from "@/components/WhyChooseUs";
import CustomerReviews from "@/components/reviews/CustomerReviews";
import SalesRepresentatives from "@/components/sales/SalesRepresentatives";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <PopularDestinations />
      <FeaturedTrips />
      <ExclusiveOffers />
      <VisaServices />
      <WhyChooseUs />
      <CustomerReviews />
      <SalesRepresentatives />
      <Footer />
    </main>
  );
}