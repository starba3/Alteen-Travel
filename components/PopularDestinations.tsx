import { SectionHeader } from "./destinations/SectionHeader";
import { DestinationGrid } from "./destinations/DestinationGrid";

export default function PopularDestinations() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader />
        <DestinationGrid />
      </div>
    </section>
  );
}