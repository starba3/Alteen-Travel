import { Search, Star, Phone, Mail, MapPin, ChevronRight } from "lucide-react";
import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PopularDestinations from "@/components/PopularDestinations";
import FeaturedTrips from "@/components/FeaturedTrips";
import ExclusiveOffers from "@/components/ExclusiveOffers";
import VisaServices from "@/components/VisaServices";
import WhyChooseUs from "@/components/WhyChooseUs";
import CustomerReviews from "@/components/CustomerReviews";
import SalesRepresentatives from "@/components/SalesRepresentatives";
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
      {/* <CustomerReviews />
      <SalesRepresentatives /> */}
      <Footer />
    </main>
  );
}