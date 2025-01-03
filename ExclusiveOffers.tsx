import { OfferCard } from "./offers/OfferCard";

const offers = [
  {
    title: "Early Bird Summer Special",
    discount: "25% OFF",
    description: "Book your summer vacation early and save big on selected destinations.",
    validUntil: "May 31, 2024",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  },
  {
    title: "Family Package Deal",
    discount: "Kids Go Free",
    description: "Children under 12 stay and eat free when sharing with parents.",
    validUntil: "December 31, 2024",
    image: "https://images.unsplash.com/photo-1602002418082-a4443e081dd1",
  },
  {
    title: "Luxury Retreat Discount",
    discount: "30% OFF",
    description: "Premium accommodations at participating 5-star resorts.",
    validUntil: "September 30, 2024",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d",
  },
];

const ExclusiveOffers = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-12">
          Special Offers Just for You
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.map((offer) => (
            <OfferCard key={offer.title} {...offer} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExclusiveOffers;