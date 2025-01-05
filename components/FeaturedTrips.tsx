import { SectionHeader } from "./trips/SectionHeader";
import { TripFilters } from "./trips/TripFilters";
import { TripGrid } from "./trips/TripGrid";

export default function FeaturedTrips() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
          <SectionHeader />
          <TripFilters />
        </div>
        <TripGrid />
      </div>
    </section>
  );
}