import { TripCard } from "./TripCard";
import { TripFilters } from "./TripFilters";
import { getTranslations } from "@/lib/i18n/server";
import { cookies } from "next/headers";

const trips = [
  {
    name: "Greek Islands Explorer",
    image: "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a",
    price: "$1,299",
    duration: "7 Days",
    highlights: ["Island Hopping", "Ancient Ruins", "Local Cuisine"],
  },
  {
    name: "Japanese Culture Tour",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e",
    price: "$2,499",
    duration: "10 Days",
    highlights: ["Temple Visits", "Tea Ceremony", "Mount Fuji"],
  },
  {
    name: "Costa Rica Adventure",
    image: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f",
    price: "$1,799",
    duration: "8 Days",
    highlights: ["Rainforest Trek", "Volcano Tour", "Beach Time"],
  },
];

export async function FeaturedTrips() {
  const locale = cookies().get("locale")?.value || "en"; // Default to "en" if no cookie is set
  const { t } = await getTranslations(locale);

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-bold">{t("ourFeaturedTrips")}</h2>
          <TripFilters />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trips.map((trip) => (
            <TripCard key={trip.name} {...trip} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedTrips;