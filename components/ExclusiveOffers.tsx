import { SectionHeader } from "./offers/SectionHeader";
import { OfferGrid } from "./offers/OfferGrid";

export default function ExclusiveOffers() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader />
        <OfferGrid />
      </div>
    </section>
  );
}