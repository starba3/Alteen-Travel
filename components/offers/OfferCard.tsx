import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import type { Offer } from "@/lib/offers";

interface OfferCardProps {
  offer: Offer;
}

export function OfferCard({ offer }: OfferCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
      <div className="relative h-48">
        <img
          src={offer.image}
          alt={offer.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-primary text-white px-4 py-2 rounded-full">
          {offer.discount}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{offer.title}</h3>
        <p className="text-gray-600 mb-4">{offer.description}</p>
        <div className="flex items-center text-gray-500 mb-4">
          <Calendar className="h-4 w-4 mr-2" />
          <span>Valid until {offer.validUntil}</span>
        </div>
        <Button className="w-full">Claim Offer</Button>
      </div>
    </div>
  );
}